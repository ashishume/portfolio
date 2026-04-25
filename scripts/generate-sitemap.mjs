import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL || process.env.VITE_SITE_URL || "https://ashishdebnath.in"
);

const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/skills", priority: "0.8", changefreq: "monthly" },
  { path: "/projects", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.3", changefreq: "yearly" },
];

const blogSources = [
  {
    owner: "ashishume",
    repo: "Front-end-Javascript-Interview-Topics",
    branch: "master",
    path: "frontend-blog-content/frontend",
  },
  {
    owner: "ashishume",
    repo: "backend-engineering-by-ashish",
    branch: "main",
    path: "backend-notes",
  },
];

function normalizeSiteUrl(url) {
  return url.replace(/\/+$/, "");
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeLastmod(dateValue, fallbackDate) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return fallbackDate;
  }

  return date.toISOString().slice(0, 10);
}

function buildMetadataUrl(source) {
  return `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${source.branch}/${source.path}/metadata.json`;
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function getBlogRoutes(generatedDate) {
  const metadataBySource = await Promise.all(
    blogSources.map(async (source) => {
      const metadata = await fetchJson(buildMetadataUrl(source));
      return Object.entries(metadata);
    })
  );

  return metadataBySource.flat().map(([filename, data]) => {
    const filenameSlug = filename.replace(/\.md$/i, "");
    const slug = data.slug || toSlug(data.title || filenameSlug);

    return {
      path: `/blog/${slug}`,
      lastmod: normalizeLastmod(data.date, generatedDate),
      priority: "0.8",
      changefreq: "monthly",
    };
  });
}

function dedupeRoutes(routes) {
  const routesByPath = new Map();

  for (const route of routes) {
    const existingRoute = routesByPath.get(route.path);

    if (!existingRoute || route.lastmod > existingRoute.lastmod) {
      routesByPath.set(route.path, route);
    }
  }

  return Array.from(routesByPath.values());
}

function toUrlEntry({ path, lastmod, priority, changefreq }) {
  const location = `${siteUrl}${path === "/" ? "" : path}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(location)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function main() {
  const generatedDate = new Date().toISOString().slice(0, 10);
  const blogRoutes = await getBlogRoutes(generatedDate);
  const routes = dedupeRoutes([
    ...staticRoutes.map((route) => ({ ...route, lastmod: generatedDate })),
    ...blogRoutes,
  ]);

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    routes.map(toUrlEntry).join("\n"),
    "</urlset>",
    "",
  ].join("\n");

  const outputPath = join(rootDir, "public", "sitemap.xml");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, sitemap);

  console.log(`Generated ${outputPath} with ${routes.length} URLs.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
