// scripts/check-redirects.mjs
//
// Fails if the generated host redirects have drifted from the app's own routes.
//
// The failure this guards against is silent and expensive: someone adds a <Navigate> in App.tsx,
// it works in dev and in the SPA, and the deployed host never learns about it — so the old URL
// returns a soft 200 and passes no equity, or 404s outright before the app ever loads.
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const fail = [];

for (const f of ["public/_redirects", "vercel.json"]) {
  if (!existsSync(resolve(root, f))) fail.push(`${f} missing — run: npm run gen:redirects`);
}
if (fail.length) {
  console.error("✗ redirect checks failed:\n" + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}

const netlify = read("public/_redirects");
const vercel = JSON.parse(read("vercel.json"));
const app = read("src/App.tsx");

// 1. The SPA fallback must exist, and on Netlify it must be the LAST rule (first match wins).
const lines = netlify.split("\n").filter((l) => l.trim() && !l.trim().startsWith("#"));
const last = lines[lines.length - 1] ?? "";
if (!/^\/\*\s+\/index\.html\s+200$/.test(last.trim())) {
  fail.push(`_redirects: SPA fallback must be the LAST rule, found: "${last.trim()}"`);
}
if (lines.slice(0, -1).some((l) => l.trim().startsWith("/*"))) {
  fail.push("_redirects: a catch-all appears before the end — it would swallow every redirect below it");
}
if (!vercel.rewrites?.some((r) => r.destination === "/index.html")) {
  fail.push("vercel.json: missing SPA rewrite to /index.html");
}

// 2. Every literal <Navigate> in App.tsx must be mirrored at the host, with the SAME destination.
const appRedirects = [...app.matchAll(/path="([^"]+)"\s+element=\{<Navigate to="([^"]+)"/g)].map(
  (m) => [m[1], m[2]],
);
const hostMap = new Map(vercel.redirects.map((r) => [r.source, r.destination]));
for (const [from, to] of appRedirects) {
  if (from.includes(":")) continue; // dynamic routes are expanded by the generator
  if (!hostMap.has(from)) fail.push(`App.tsx redirects ${from} → ${to}, but the host config does not`);
  else if (hostMap.get(from) !== to)
    fail.push(`${from}: app → ${to}, host → ${hostMap.get(from)} (destinations disagree)`);
}

// 3. No redirect may point at another redirect — a chain leaks equity and breaks when a hop is cut.
for (const [source, destination] of hostMap) {
  if (hostMap.has(destination)) {
    fail.push(`redirect chain: ${source} → ${destination} → ${hostMap.get(destination)}`);
  }
}

// 4. Nothing in the sitemap may be a redirect: a sitemap must list canonical pages only.
if (existsSync(resolve(root, "public/sitemap.xml"))) {
  const sitemap = read("public/sitemap.xml");
  for (const source of hostMap.keys()) {
    if (sitemap.includes(`<loc>https://elan1.ai${source}</loc>`)) {
      fail.push(`sitemap lists ${source}, which is a redirect`);
    }
  }
}

if (fail.length) {
  console.error("✗ redirect checks failed:\n" + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(
  `✓ redirect checks passed (${hostMap.size} permanent redirects, SPA fallback last, no chains, none in sitemap).`,
);
