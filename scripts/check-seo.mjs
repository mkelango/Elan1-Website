// scripts/check-seo.mjs — fast, dependency-free SEO/build assertions for CI (and local).
// Verifies the built `dist/` ships the SEO essentials: robots.txt, a non-empty sitemap.xml, and an
// index.html with title, meta description, canonical, OpenGraph, Twitter card, and Organization JSON-LD.
import { readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const fail = [];
const ok = (cond, msg) => (cond ? null : fail.push(msg));

ok(existsSync(resolve(dist, "robots.txt")), "dist/robots.txt missing");

const sitemapPath = resolve(dist, "sitemap.xml");
ok(existsSync(sitemapPath), "dist/sitemap.xml missing");
if (existsSync(sitemapPath)) {
  const sm = readFileSync(sitemapPath, "utf8");
  const count = (sm.match(/<loc>/g) || []).length;
  ok(count >= 20, `sitemap.xml has too few URLs (${count})`);
  ok(sm.includes("https://elan1.in/"), "sitemap.xml missing canonical origin");
}

const indexPath = resolve(dist, "index.html");
ok(existsSync(indexPath), "dist/index.html missing");
if (existsSync(indexPath)) {
  const html = readFileSync(indexPath, "utf8");
  const checks = {
    "<title>": /<title>[^<]+<\/title>/,
    'meta name="description"': /name="description"\s+content="[^"]+"/,
    'link rel="canonical"': /rel="canonical"/,
    'og:title': /property="og:title"/,
    'og:image': /property="og:image"/,
    'twitter:card': /name="twitter:card"/,
    'JSON-LD Organization': /application\/ld\+json[\s\S]*"Organization"/,
    'JSON-LD WebSite': /application\/ld\+json[\s\S]*"WebSite"/,
    'html lang': /<html[^>]*\slang="/,
  };
  for (const [label, re] of Object.entries(checks)) ok(re.test(html), `index.html missing ${label}`);
}

if (fail.length) {
  console.error("✗ SEO checks failed:\n" + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log("✓ SEO checks passed (robots, sitemap, meta, OG/Twitter, JSON-LD).");
