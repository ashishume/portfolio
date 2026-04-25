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
