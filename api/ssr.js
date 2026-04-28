import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const templatePath = join(rootDir, "dist", "client", "index.html");
const rendererPath = join(rootDir, "dist", "server", "entry-server.js");

let templatePromise;
let rendererPromise;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function getSiteOrigin(req) {
  const configuredSiteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;

  if (configuredSiteUrl) {
    return configuredSiteUrl.replace(/\/+$/, "");
  }

  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "ashishdebnath.in";
  return `${proto}://${host}`;
}

const primaryNavItems = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

function buildSiteUrl(siteOrigin, path) {
  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildStructuredData(ssrData, siteOrigin, canonicalUrl) {
  const seo = ssrData.seo || {};
  const personId = `${siteOrigin}/#person`;
  const websiteId = `${siteOrigin}/#website`;
  const navigationId = `${siteOrigin}/#site-navigation`;
  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: "Ashish Debnath",
      url: siteOrigin,
      sameAs: [
        "https://github.com/ashishume",
        "https://www.linkedin.com/in/ashishume",
        "https://twitter.com/ashishume",
        "https://leetcode.com/ashishume/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteOrigin}/`,
      name: "Ashish Debnath",
      alternateName: "Ashish Debnath Portfolio",
      description: "Ashish Debnath portfolio and technical blog",
      publisher: {
        "@id": personId,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteOrigin}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "ItemList",
      "@id": navigationId,
      name: "Primary navigation",
      itemListElement: primaryNavItems.map((item, index) => ({
        "@type": "SiteNavigationElement",
        position: index + 1,
        name: item.name,
        url: buildSiteUrl(siteOrigin, item.path),
      })),
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: seo.title || "Ashish Debnath | Portfolio | Blog",
      description: seo.description || "Ashish Debnath portfolio and technical blog",
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": personId,
      },
    },
  ];

  if (seo.type === "article") {
    const blog = ssrData.blogPosts?.find(
      (post) => `/blog/${post.slug}` === seo.canonicalPath
    );

    if (blog) {
      graph.push({
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#blog-posting`,
        headline: blog.title,
        description: blog.excerpt,
        datePublished: blog.date,
        dateModified: blog.date,
        url: canonicalUrl,
        mainEntityOfPage: {
          "@id": `${canonicalUrl}#webpage`,
        },
        author: {
          "@id": personId,
        },
        publisher: {
          "@id": personId,
        },
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function renderHead(ssrData, req) {
  const seo = ssrData.seo || {};
  const siteOrigin = getSiteOrigin(req);
  const canonicalPath = seo.canonicalPath || req.url || "/";
  const canonicalUrl = `${siteOrigin}${canonicalPath}`;
  const title = escapeHtml(seo.title || "Ashish Debnath | Portfolio | Blog");
  const description = escapeHtml(
    seo.description || "Ashish Debnath portfolio and technical blog"
  );
  const type = escapeHtml(seo.type || "website");

  return {
    title,
    description,
    tags: [
      `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:title" content="${title}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
      `<meta property="og:type" content="${type}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<script type="application/ld+json">${safeJson(
        buildStructuredData(ssrData, siteOrigin, canonicalUrl)
      )}</script>`,
    ].join("\n    "),
  };
}

async function getTemplate() {
  if (!templatePromise) {
    templatePromise = readFile(templatePath, "utf-8");
  }

  return templatePromise;
}

async function getRenderer() {
  if (!rendererPromise) {
    rendererPromise = import(rendererPath);
  }

  return rendererPromise;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET, HEAD");
    res.end("Method Not Allowed");
    return;
  }

  try {
    const [{ render }, template] = await Promise.all([
      getRenderer(),
      getTemplate(),
    ]);
    const { appHtml, ssrData, statusCode } = await render(req.url || "/");
    const head = renderHead(ssrData, req);
    const html = template
      .replace("<!--ssr-title-->", head.title)
      .replace("<!--ssr-description-->", head.description)
      .replace("<!--ssr-head-->", head.tags)
      .replace(
        '<div id="root"></div>',
        `<script>window.__SSR_DATA__=${safeJson(
          ssrData
        )}</script><div id="root">${appHtml}</div>`
      );

    res.statusCode = statusCode;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      statusCode === 200
        ? "public, s-maxage=600, stale-while-revalidate=86400"
        : "no-store"
    );

    if (req.method === "HEAD") {
      res.end();
      return;
    }

    res.end(html);
  } catch (error) {
    console.error("SSR render failed:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end("Internal Server Error");
  }
}
