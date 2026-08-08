// scripts/check-seo.mjs — fast, dependency-free SEO/build assertions for CI (and local).
// Verifies the built `dist/` ships the SEO essentials AND catches the canonical collapse:
// no two route HTML files should declare the same canonical URL.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const fail = [];
const warn = [];
const ok = (cond, msg) => (cond ? null : fail.push(msg));

// ——— 1. Static file checks ———

ok(existsSync(resolve(dist, "robots.txt")), "dist/robots.txt missing");
ok(existsSync(resolve(dist, "llms.txt")), "dist/llms.txt missing");

const sitemapPath = resolve(dist, "sitemap.xml");
ok(existsSync(sitemapPath), "dist/sitemap.xml missing");
if (existsSync(sitemapPath)) {
  const sm = readFileSync(sitemapPath, "utf8");
  const count = (sm.match(/<loc>/g) || []).length;
  ok(count >= 20, `sitemap.xml has too few URLs (${count})`);
  ok(sm.includes("https://elan1.ai/"), "sitemap.xml missing canonical origin");
}

// ——— 2. Root index.html checks ———

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

// ——— 3. Canonical collapse guard ———
// Walk dist/ for index.html files, extract canonical from each, verify no two non-root routes
// point to the same canonical. This is THE guard that prevents the defect from recurring.

function walkHtml(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...walkHtml(full));
    } else if (entry === "index.html") {
      files.push(full);
    }
  }
  return files;
}

const canonicalMap = new Map(); // canonical URL → [file paths]
const htmlFiles = walkHtml(dist);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  // Redirect pages (meta http-equiv="refresh") are SUPPOSED to declare the target's canonical.
  // They are not content pages — exclude them from the uniqueness check.
  if (html.includes('http-equiv="refresh"')) continue;
  const match = html.match(/rel="canonical"\s+href="([^"]+)"/);
  if (!match) continue;
  const canonical = match[1];
  const rel = relative(dist, file);
  if (!canonicalMap.has(canonical)) canonicalMap.set(canonical, []);
  canonicalMap.get(canonical).push(rel);
}

for (const [canonical, files] of canonicalMap) {
  if (files.length > 1) {
    fail.push(
      `CANONICAL COLLAPSE: ${files.length} files declare canonical="${canonical}":\n` +
      files.map(f => `    ${f}`).join("\n"),
    );
  }
}

// ——— 4. Prerendered route count check ———
// The prerender script should have created per-route HTML. Verify a minimum count.
const prerenderCount = htmlFiles.length;
if (prerenderCount < 30) {
  warn.push(`Only ${prerenderCount} HTML files in dist/ — expected 80+. Prerendering may have failed.`);
}

// ——— 5. Spot-check: a product page should NOT have the homepage title ———
const finance1 = resolve(dist, "products/finance1/index.html");
if (existsSync(finance1)) {
  const html = readFileSync(finance1, "utf8");
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || "";
  ok(
    !title.includes("The Agentic Transformation Company"),
    `products/finance1/index.html still has the homepage title ("${title}") — prerender-meta may not have run`,
  );
}

// ——— Report ———

if (warn.length) {
  console.warn("⚠ SEO warnings:\n" + warn.map(w => "  - " + w).join("\n"));
}

if (fail.length) {
  console.error("✗ SEO checks failed:\n" + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(`✓ SEO checks passed (robots, llms.txt, sitemap, meta, OG/Twitter, JSON-LD, canonical uniqueness, ${prerenderCount} prerendered routes).`);
