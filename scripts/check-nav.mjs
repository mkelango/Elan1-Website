// scripts/check-nav.mjs — the two-way navigation check.
//
// WHY THIS EXISTS. A link with no page and a page with no link are BOTH defects, and only one of
// them is visible. A dead nav href 404s the moment somebody clicks it, so it gets found. An
// orphaned route renders perfectly forever and is simply never reached — no build step fails, no
// type is violated, nothing errors. That is the more expensive of the two, because the page was
// written, reviewed and paid for and then quietly removed from the site.
//
// It has already happened twice on this property: goal1 fell out of a hardcoded nav roster while
// the blurb beside it still said "ten agentic apps", and the Resources footer column shipped 7 of
// its 9 destinations. Both were invisible to tsc, to vite build and to every existing gate,
// because a short array is not a type error.
//
// This checks BOTH directions:
//   FORWARD  — every href reachable from the nav or the footer resolves to a route in App.tsx.
//   BACKWARD — every indexable route in App.tsx is reachable from the nav or the footer.
//
// Deliberately dependency-free and regex-based, like the sibling scripts: it must run before the
// TypeScript build, on a tree that may not compile.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

const fail = [];

// ——— 1. Routes declared in App.tsx ———

const app = read("src/App.tsx");

/** Every `path="…"` on a <Route>, with whether it is a redirect (<Navigate>) or a real page. */
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<([A-Za-z]+)/g)].map((m) => ({
  path: m[1],
  element: m[2],
  isRedirect: m[2] === "Navigate",
}));

if (routes.length < 40) {
  fail.push(`check-nav: parsed only ${routes.length} routes from App.tsx — the regex has drifted from the file.`);
}

/** A route that should be reachable: a real page, not a redirect, not a param route, not the 404. */
const indexable = routes.filter(
  (r) => !r.isRedirect && !r.path.includes(":") && r.path !== "*" && r.element !== "NotFound",
);

/** Static paths, plus the prefixes that param routes legitimately cover. */
const staticPaths = new Set(routes.map((r) => r.path));
const paramPrefixes = routes
  .filter((r) => r.path.includes(":"))
  .map((r) => r.path.slice(0, r.path.indexOf(":")));

const resolves = (href) => {
  const path = href.split(/[?#]/)[0];
  if (staticPaths.has(path)) return true;
  return paramPrefixes.some((p) => path.startsWith(p) && path.length > p.length);
};

// ——— 2. Hrefs reachable from the nav and the footer ———
//
// Read as TEXT rather than imported: this script runs before the TypeScript build, and the whole
// point is to catch a tree that type-checks but navigates wrong.

const site = read("src/content/site.ts");
const footer = read("src/components/Footer.tsx");

const linked = new Set();
for (const src of [site, footer]) {
  for (const m of src.matchAll(/href:\s*"(\/[^"]*)"/g)) linked.add(m[1]);
  for (const m of src.matchAll(/to="(\/[^"]*)"/g)) linked.add(m[1]);
}

// Templated hrefs — `/products/${p.slug}` — are derived from the typed content layer and are
// covered by their param route. Record the prefix so the backward pass does not report every
// derived page as an orphan.
const derivedPrefixes = [];
for (const src of [site, footer]) {
  for (const m of src.matchAll(/href:\s*`(\/[^`$]*)\$\{/g)) derivedPrefixes.push(m[1]);
  for (const m of src.matchAll(/to=\{`(\/[^`$]*)\$\{/g)) derivedPrefixes.push(m[1]);
}

// A pillar's href in the nav is `servicePath(s)` — a FUNCTION CALL, not a literal and not a
// template, so the two scans above cannot see it. Left unhandled, that reads as an orphan and the
// obvious "fix" is an ORPHAN_OK entry, which would launder a real check into a rubber stamp for
// every pillar forever. Resolve the calls instead: read the same slug/home pairs out of
// services.ts that gen-sitemap.mjs reads, and count them as linked only when site.ts actually
// calls servicePath. If the roster is unreadable, FAIL rather than silently linking nothing.
if (/href:\s*servicePath\(/.test(site)) {
  const services = read("src/content/services.ts");
  const pillars = [
    ...services.matchAll(
      /slug:\s*"([a-z0-9-]+)",\s*\n\s*layer:\s*"service",\s*\n\s*home:\s*"(platform|resources)"/g,
    ),
  ];
  const declared = [...services.matchAll(/^    slug:\s*"([a-z0-9-]+)"/gm)].length;
  if (pillars.length !== declared) {
    fail.push(
      `check-nav: read ${pillars.length} pillar home(s) but services.ts declares ${declared}. ` +
        `A pillar whose home cannot be read would be reported as an orphan it is not.`,
    );
  }
  for (const [, slug, home] of pillars) linked.add(`/${home}/${slug}`);
}

const isLinked = (path) =>
  linked.has(path) || derivedPrefixes.some((p) => path.startsWith(p) && path.length > p.length);

// ——— 3. FORWARD: every nav/footer href must resolve ———

for (const href of [...linked].sort()) {
  if (!resolves(href)) {
    fail.push(`DEAD LINK: nav/footer points at "${href}" — no route in App.tsx matches it.`);
  }
}

// ——— 4. BACKWARD: every indexable route must be reachable ———
//
// A small allowlist for pages that are deliberately reachable by URL only. Each entry must carry a
// reason: an unexplained exemption is how an orphan gets laundered into "intentional".
const ORPHAN_OK = {
  "/": "the home page — the logo links here from every page, in Nav.tsx",
  "/get-started": "a conversion endpoint, linked from CTAs across the site rather than from the nav",
  "/demo": "linked from CTAs and the hero rather than from the nav",
  "/resources/academy/learn": "reached from the Academy pillar page, one level down",
  "/products/category/revenue": "derived — the Products mega builds these from categories.ts",
  "/products/category/service": "derived from categories.ts",
  "/products/category/trade": "derived from categories.ts",
  "/products/category/works": "derived from categories.ts",
  "/products/category/compass": "derived from categories.ts",
};

for (const r of indexable) {
  if (isLinked(r.path)) continue;
  if (ORPHAN_OK[r.path]) continue;
  fail.push(
    `ORPHAN PAGE: route "${r.path}" (<${r.element}/>) renders but nothing in the nav or footer links to it. ` +
      `Link it, or add it to ORPHAN_OK in this script WITH a reason.`,
  );
}

// ——— Report ———

if (fail.length) {
  console.error("✗ nav checks failed:\n" + fail.map((f) => "  - " + f).join("\n"));
  process.exit(1);
}
console.log(
  `✓ nav checks passed (${routes.length} routes, ${indexable.length} indexable, ${linked.size} nav/footer links — both directions).`,
);
