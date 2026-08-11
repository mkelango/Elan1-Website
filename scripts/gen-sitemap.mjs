// scripts/gen-sitemap.mjs — generate public/sitemap.xml from the static routes + the typed content
// slugs. Runs on `prebuild` so the sitemap always matches what ships. No deps (parses slugs by regex).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SITE_URL = "https://elan1.ai";

/** Static, content-independent routes (mirrors src/App.tsx). */
const STATIC_ROUTES = [
  "/",
  "/what-is-agentic-transformation",
  "/products",
  "/solutions",
  "/solutions/initiatives",
  "/platform",
  "/platform/assistant1",
  "/platform/engineering",
  "/platform/connectors",
  "/platform/verticals-are-config",
  "/platform/the-1-philosophy",
  "/platform/flywheel",
  "/platform/built-on-claude",
  "/platform/why-elan1",
  "/platform/governance",
  "/platform/enterprise-ontology",
  "/trust",
  "/what-elan1-is-not",
  "/developers",
  "/resources/academy/learn",
  "/resources",
  "/resources/diagrams",
  "/resources/proof",
  "/resources/glossary",
  "/resources/playbooks",
  "/resources/insights",
  "/agentic",
  // "/partners" is NOT listed: it redirects to /company/partners. A URL that 301s must never
  // appear in the sitemap — check:redirects fails the build on exactly that, which is how this was
  // caught rather than shipped as a self-contradicting signal to a crawler.
  "/company/about",
  "/company/careers",
  "/company/newsroom",
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

/**
 * Pillars, paired with the section that owns them. Reads `slug` and the `home` declared two lines
 * below it in content/services.ts, so a pillar moved between Platform and Academy re-homes its
 * sitemap URL automatically. Throws rather than emitting a wrong URL if the pair can't be read.
 */
function servicesWithHome() {
  const src = readFileSync(resolve(root, "src/content/services.ts"), "utf8");
  const found = [...src.matchAll(/slug:\s*"([a-z0-9-]+)",\s*\n\s*layer:\s*"service",\s*\n\s*home:\s*"(platform|resources)"/g)]
    .map((m) => ({ slug: m[1], home: m[2] }));
  const declared = [...src.matchAll(/^    slug:\s*"([a-z0-9-]+)"/gm)].length;
  if (found.length !== declared) {
    throw new Error(
      `gen-sitemap: read ${found.length} pillar home(s) but services.ts declares ${declared} pillar(s). ` +
        `A pillar without a readable \`home\` would be silently dropped from the sitemap.`,
    );
  }
  return found;
}

const routes = new Set(STATIC_ROUTES);
for (const s of slugsFrom("categories.ts")) routes.add(`/products/category/${s}`);
// enterprise1 is the control plane and lives under Platform; /products/enterprise1 redirects.
for (const s of slugsFrom("products.ts")) {
  routes.add(s === "enterprise1" ? "/platform/enterprise1" : `/products/${s}`);
}
for (const s of slugsFrom("solutions.ts")) routes.add(`/solutions/${s}`);
// Pillars live under whichever section owns them, so the sitemap derives the path from each
// entry's own `home` field rather than assuming a /services prefix that no longer exists.
for (const { slug, home } of servicesWithHome()) routes.add(`/${home}/${slug}`);
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
