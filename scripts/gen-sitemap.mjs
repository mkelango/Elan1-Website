// scripts/gen-sitemap.mjs — generate public/sitemap.xml from the static routes + the typed content
// slugs. Runs on `prebuild` so the sitemap always matches what ships. No deps (parses slugs by regex).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE_URL = "https://elan1.in";

/** Static, content-independent routes (mirrors src/App.tsx). */
const STATIC_ROUTES = [
  "/",
  "/what-is-agentic-transformation",
  "/products",
  "/solutions",
  "/solutions/initiatives",
  "/services",
  "/platform/the-1-philosophy",
  "/platform/flywheel",
  "/platform/built-on-claude",
  "/trust",
  "/academy",
  "/academy/learn",
  "/resources",
  "/resources/diagrams",
  "/resources/proof",
  "/resources/glossary",
  "/resources/playbooks",
  "/resources/insights",
  "/agentic",
  "/partners",
  "/company/about",
  "/company/careers",
  "/company/partners",
  "/pricing",
  "/for/growth",
  "/for/scaleup",
  "/for/enterprise",
  "/get-started",
  "/contact",
  "/demo",
];

/** Pull `slug: "..."` values out of a content module (avoids a TS build step here). */
function slugsFrom(file) {
  const src = readFileSync(resolve(root, "src/content", file), "utf8");
  return [...src.matchAll(/slug:\s*["'`]([a-z0-9-]+)["'`]/gi)].map((m) => m[1]);
}

const routes = new Set(STATIC_ROUTES);
for (const s of slugsFrom("products.ts")) routes.add(`/products/${s}`);
for (const s of slugsFrom("solutions.ts")) routes.add(`/solutions/${s}`);
for (const s of slugsFrom("services.ts")) routes.add(`/services/${s}`);
for (const s of slugsFrom("initiatives.ts")) routes.add(`/solutions/initiatives/${s}`);
for (const s of slugsFrom("insights.ts")) routes.add(`/resources/insights/${s}`);
for (const s of slugsFrom("usecases.ts")) routes.add(`/agentic/${s}`);

const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === "/" ? "1.0" : p.split("/").length <= 2 ? "0.8" : "0.6");

const body = [...routes]
  .sort()
  .map(
    (p) =>
      `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(p)}</priority>\n  </url>`,
  )
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(resolve(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml written — ${routes.size} URLs`);
