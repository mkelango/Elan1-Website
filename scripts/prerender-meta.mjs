// scripts/prerender-meta.mjs — inject per-route <title>, <meta>, <link rel="canonical"> and
// BreadcrumbList JSON-LD into the built dist/index.html so that non-JS crawlers (Googlebot's
// initial pass, LinkedIn, Slack, WhatsApp) see the correct metadata without executing React.
//
// THE PROBLEM: useSeo() runs in a useEffect, so the static HTML ships the homepage's title,
// description, canonical, and OG tags on EVERY URL. A crawler that doesn't run JS sees 92 pages
// all declaring themselves as duplicates of the homepage.
//
// THE FIX: at build time, read the sitemap, derive the per-route metadata from the typed content
// layer (same source useSeo reads at runtime), and stamp each route's correct values into a copy
// of index.html written to the matching path (e.g. dist/products/finance1/index.html). When a
// crawler requests /products/finance1, the static server finds that file and returns it with the
// correct <title> and canonical — no JS needed. React hydrates on top and useSeo takes over for
// client-side navigation.
//
// Runs as a postbuild step: `node scripts/prerender-meta.mjs` after `vite build`.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dist = resolve(root, "dist");
const SITE_URL = "https://elan1.ai";

// ——— Route metadata registry ———
// Each entry: { path, title, description, breadcrumbs?: [{name, href}] }
// Breadcrumbs are the BreadcrumbList chain EXCLUDING the current page (it's added automatically).

function loadContent(file) {
  const src = readFileSync(resolve(root, "src/content", file), "utf8");
  return src;
}

function extractSlugsAndNames(file, nameField = "name") {
  const src = loadContent(file);
  const entries = [];
  const slugRe = /slug:\s*["'`]([a-z0-9-]+)["'`]/g;
  const nameRe = new RegExp(`${nameField}:\\s*["'\`]([^"'\`]+)["'\`]`, "g");
  const slugs = [...src.matchAll(slugRe)].map(m => m[1]);
  const names = [...src.matchAll(nameRe)].map(m => m[1]);
  for (let i = 0; i < slugs.length; i++) {
    entries.push({ slug: slugs[i], name: names[i] || slugs[i] });
  }
  return entries;
}

function extractSlugsNamesAndField(file, field) {
  const src = loadContent(file);
  const blocks = src.split(/(?=\n  \{)/);
  const entries = [];
  for (const block of blocks) {
    const slugM = block.match(/slug:\s*["'`]([a-z0-9-]+)["'`]/);
    const nameM = block.match(/name:\s*["'`]([^"'`]+)["'`]/);
    const fieldM = block.match(new RegExp(`${field}:\\s*["'\`]([^"'\`]+)["'\`]`));
    if (slugM) {
      entries.push({ slug: slugM[1], name: nameM?.[1] || slugM[1], [field]: fieldM?.[1] || "" });
    }
  }
  return entries;
}

// Build the metadata map
const routes = new Map();

// Homepage
routes.set("/", {
  title: "elan1 — The Agentic Transformation Company | Built on Claude",
  description: "elan1 builds governed agentic business applications: ten agentic apps on one control plane, ten industry configurations, and a human approval gate on the actions that commit your business.",
});

// Static pages
const staticMeta = [
  { path: "/what-is-agentic-transformation", title: "What is agentic transformation? | elan1", description: "Agentic transformation is the shift from software that answers questions to software that does the work — under human governance, on a governed write path.", breadcrumbs: [] },
  { path: "/products", title: "The 1 Suite — ten agentic business apps | elan1", description: "The 1 Suite: ten agentic apps across five categories — Revenue, Service, Trade, Works, Compass — unified on enterprise1.", breadcrumbs: [] },
  { path: "/solutions", title: "Industry solutions — agentic transformation by sector | elan1", description: "Ten industry configurations that compose the 1 Suite with sector-specific skills, governance rails, and the compliance your regulator expects.", breadcrumbs: [] },
  { path: "/solutions/initiatives", title: "Agentic initiatives — transformation by outcome | elan1", description: "Five cross-industry initiatives: agentic transformation, customer experience, cost and FinOps, compliance and governance, legacy modernization.", breadcrumbs: [{ name: "Solutions", href: "/solutions" }] },
  { path: "/platform", title: "The elan1 platform — control plane, pillars, governance | elan1", description: "One control plane, the pillars that build, prove and operate your agents, and a governance layer that belongs on the write path.", breadcrumbs: [] },
  { path: "/platform/assistant1", title: "assistant1 — the governed central assistant | elan1", description: "assistant1 proposes; the owning app decides. A central assistant that holds no business writer and routes through the governed path.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/enterprise1", title: "enterprise1 — the control plane | elan1", description: "enterprise1 is the control plane: identity, governance, audit, rollout, and the admin console that operates the 1 Suite.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/engineering", title: "Engineering and readiness | elan1", description: "Identity, isolation, audit, retention, disaster recovery — and the limits, stated honestly.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/connectors", title: "Connectors — typed, least-privilege seams | elan1", description: "Typed, least-privilege integration seams — credential-gated, never pre-connected, with honest status labels.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/verticals-are-config", title: "Verticals are config, not code | elan1", description: "Ten industries, zero forked application code. Every vertical is a config pack that composes the same suite apps.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/the-1-philosophy", title: "The \"1\" philosophy | elan1", description: "Number one in your field. One-to-one precision. All-as-one on a single platform. What the 1 means.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/flywheel", title: "The elan1 flywheel | elan1", description: "How value compounds across the layers: a sprint lands, products expand, solutions deepen, trust carries forward.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/built-on-claude", title: "Built on Claude | elan1", description: "Why Claude-native depth wins: frontier reasoning, safety, and the Agent SDK — not multi-model generalism.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/why-elan1", title: "Why elan1 vs builders | elan1", description: "Run your business on agents — not just build one. Why a governed suite beats a framework.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/governance", title: "Governance — three layers | elan1", description: "Defense-in-depth governance: write-path gates, eval-gated rollout, and a hash-chained audit trail.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/platform/enterprise-ontology", title: "Enterprise Ontology — the typed record model | elan1", description: "Context is what an agent reads. An ontology is the typed structure a write is validated against — which is what makes a write refusable.", breadcrumbs: [{ name: "Platform", href: "/platform" }] },
  { path: "/trust", title: "Trust, safety and governance | elan1", description: "How every agent is built, approved and audited. Data handling, residency, and the governance architecture." },
  { path: "/what-elan1-is-not", title: "What elan1 is NOT | elan1", description: "The limits, published: what elan1 is not, what it deliberately refuses to automate, and where it does not yet hold a certification.", breadcrumbs: [{ name: "Trust", href: "/trust" }] },
  { path: "/developers", title: "Developers — SDK, MCP connectors, core surfaces | elan1", description: "elan1 is MCP-native: the SDK contract, the typed least-privilege connector fabric, and the control-plane surfaces a developer builds against.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources", title: "Resources — insights, playbooks, diagrams, glossary | elan1", description: "Learn, prove, and get certified: insights on agentic transformation, governed workflow patterns, playbooks, and the Academy.", breadcrumbs: [] },
  { path: "/resources/diagrams", title: "Diagram library | elan1", description: "Architecture and workflow diagrams for every layer of the elan1 platform.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources/proof", title: "Governed workflow patterns | elan1", description: "Before, after, and the guarantee each pattern carries — across banking, retail, healthcare, insurance, telecom and manufacturing.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources/glossary", title: "Agentic glossary | elan1", description: "The agentic vocabulary: every term the site uses, defined with what it means here and how it differs from the industry default.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources/playbooks", title: "Playbooks — gated guides and roadmaps | elan1", description: "Step-by-step playbooks for agentic transformation, each with decisions, traps, and honest coverage limits.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources/insights", title: "Insights — agentic transformation thinking | elan1", description: "Articles on agentic transformation across the platform, the suite, the verticals, and the approach.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/resources/academy/learn", title: "Learning hub — courses and certification | elan1", description: "Courses and certification levels for the elan1 platform, the 1 Suite, and agentic transformation.", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  { path: "/agentic", title: "Agentic use cases | elan1", description: "Explore agentic use cases by industry and function — governed agents that do the work, under human control.", breadcrumbs: [] },
  { path: "/company/about", title: "About elan1 | elan1", description: "Why the gate belongs on the write path. The agentic transformation company.", breadcrumbs: [] },
  { path: "/company/careers", title: "Careers at elan1 | elan1", description: "What the work is and how we build. Engineering roles at an agentic transformation company.", breadcrumbs: [] },
  { path: "/company/newsroom", title: "Newsroom — brand assets and attributable facts | elan1", description: "Press releases, brand assets, and the boilerplate. Every fact here is attributable.", breadcrumbs: [] },
  { path: "/company/partners", title: "Partners — build on the core | elan1", description: "Build on the platform, certify before you list. Partner tracks, the Academy pipeline, and how to get started.", breadcrumbs: [] },
  { path: "/pricing", title: "Pricing | elan1", description: "How the plans and the metered usage work for the 1 Suite.", breadcrumbs: [] },
  { path: "/for/growth", title: "elan1 for growth-stage companies | elan1", description: "The agentic platform sized for growth: what you get, what it costs, and when it pays back.", breadcrumbs: [] },
  { path: "/for/scaleup", title: "elan1 for scaleups | elan1", description: "The agentic platform sized for scaleups: ROI calculator, what you get, and when it pays back.", breadcrumbs: [] },
  { path: "/for/enterprise", title: "elan1 for enterprise | elan1", description: "The agentic platform for enterprises: governance at scale, the control plane, and the 1 Suite.", breadcrumbs: [] },
  { path: "/get-started", title: "Get started — talk to an expert | elan1", description: "Start a conversation about agentic transformation. Discovery Sprint, demo, or a question.", breadcrumbs: [] },
  { path: "/contact", title: "Contact elan1 | elan1", description: "Talk to an expert about agentic transformation for your organisation.", breadcrumbs: [] },
  { path: "/demo", title: "See a live demo | elan1", description: "See elan1 in action: a governed agent on your use case, running on your data.", breadcrumbs: [] },
];

for (const m of staticMeta) {
  routes.set(m.path, m);
}

// Products (dynamic)
const productEntries = extractSlugsAndNames("products.ts");
for (const p of productEntries) {
  if (p.slug === "enterprise1") continue; // handled as /platform/enterprise1
  routes.set(`/products/${p.slug}`, {
    title: `${p.name} — agentic ${p.name.replace(/1$/, "")} | elan1`,
    description: `${p.name}: a governed agentic business application in the 1 Suite.`,
    breadcrumbs: [{ name: "Products", href: "/products" }],
  });
}

// Categories
const categoryEntries = extractSlugsAndNames("categories.ts");
for (const c of categoryEntries) {
  routes.set(`/products/category/${c.slug}`, {
    title: `${c.name} — agentic ${c.name.toLowerCase()} apps | elan1`,
    description: `The ${c.name} category of the 1 Suite.`,
    breadcrumbs: [{ name: "Products", href: "/products" }],
  });
}

// Solutions
const solutionEntries = extractSlugsAndNames("solutions.ts");
for (const s of solutionEntries) {
  routes.set(`/solutions/${s.slug}`, {
    title: `${s.name} — agentic transformation for ${s.name.replace(/1$/, "")} | elan1`,
    description: `${s.name}: an industry solution that composes the 1 Suite with sector-specific governance.`,
    breadcrumbs: [{ name: "Solutions", href: "/solutions" }],
  });
}

// Initiatives
const initiativeEntries = extractSlugsAndNames("initiatives.ts");
for (const i of initiativeEntries) {
  routes.set(`/solutions/initiatives/${i.slug}`, {
    title: `${i.name} | elan1`,
    description: `${i.name}: a cross-industry agentic initiative.`,
    breadcrumbs: [{ name: "Solutions", href: "/solutions" }, { name: "Initiatives", href: "/solutions/initiatives" }],
  });
}

// Services/pillars
const serviceEntries = extractSlugsNamesAndField("services.ts", "home");
for (const s of serviceEntries) {
  const home = s.home || "platform";
  routes.set(`/${home}/${s.slug}`, {
    title: `${s.name} | elan1`,
    description: `${s.name}: a platform pillar in the elan1 lifecycle.`,
    breadcrumbs: [{ name: home === "platform" ? "Platform" : "Resources", href: `/${home}` }],
  });
}

// Insights
const insightEntries = extractSlugsAndNames("insights.ts", "title");
for (const a of insightEntries) {
  routes.set(`/resources/insights/${a.slug}`, {
    title: `${a.name} | elan1 Insights`,
    description: `${a.name} — an elan1 insight on agentic transformation.`,
    breadcrumbs: [{ name: "Resources", href: "/resources" }, { name: "Insights", href: "/resources/insights" }],
  });
}

// Use cases
const usecaseEntries = extractSlugsAndNames("usecases.ts");
for (const u of usecaseEntries) {
  routes.set(`/agentic/${u.slug}`, {
    title: `${u.name} — agentic use case | elan1`,
    description: `${u.name}: a governed agentic use case.`,
    breadcrumbs: [{ name: "Agentic use cases", href: "/agentic" }],
  });
}

// ——— HTML injection ———

const template = readFileSync(resolve(dist, "index.html"), "utf8");

function buildBreadcrumbLd(crumbs, currentName, currentPath) {
  const items = [
    { "@type": "ListItem", position: 1, name: "elan1", item: SITE_URL },
  ];
  let pos = 2;
  for (const c of crumbs) {
    items.push({ "@type": "ListItem", position: pos++, name: c.name, item: `${SITE_URL}${c.href}` });
  }
  items.push({ "@type": "ListItem", position: pos, name: currentName });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function injectMeta(html, meta, path) {
  let out = html;

  // Replace title
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);

  // Replace meta description
  out = out.replace(
    /name="description"\s+content="[^"]*"/,
    `name="description" content="${esc(meta.description)}"`,
  );

  // Replace canonical
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  out = out.replace(
    /rel="canonical"\s+href="[^"]*"/,
    `rel="canonical" href="${esc(canonical)}"`,
  );

  // Replace OG tags
  out = out.replace(/property="og:title"\s+content="[^"]*"/, `property="og:title" content="${esc(meta.title)}"`);
  out = out.replace(/property="og:description"\s+content="[^"]*"/, `property="og:description" content="${esc(meta.description)}"`);
  out = out.replace(/property="og:url"\s+content="[^"]*"/, `property="og:url" content="${esc(canonical)}"`);

  // Replace Twitter tags
  out = out.replace(/name="twitter:title"\s+content="[^"]*"/, `name="twitter:title" content="${esc(meta.title)}"`);
  out = out.replace(/name="twitter:description"\s+content="[^"]*"/, `name="twitter:description" content="${esc(meta.description)}"`);

  // Inject BreadcrumbList JSON-LD if breadcrumbs exist
  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    const shortTitle = meta.title.replace(/ \| elan1$/, "").replace(/ — .*$/, "") || meta.title;
    const bcLd = JSON.stringify(buildBreadcrumbLd(meta.breadcrumbs, shortTitle, path));
    out = out.replace(
      "</head>",
      `  <script type="application/ld+json">${bcLd}</script>\n  </head>`,
    );
  }

  return out;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ——— Write per-route HTML files ———
let written = 0;
let skipped = 0;

for (const [path, meta] of routes) {
  if (path === "/") {
    // Homepage is already the root index.html — just verify canonical is correct
    const homeHtml = injectMeta(template, meta, path);
    writeFileSync(resolve(dist, "index.html"), homeHtml);
    written++;
    continue;
  }

  const dir = resolve(dist, path.replace(/^\//, ""));
  const file = resolve(dir, "index.html");

  // Don't overwrite if a file already exists (shouldn't happen with SPA, but be safe)
  if (existsSync(file)) {
    skipped++;
    continue;
  }

  mkdirSync(dir, { recursive: true });
  writeFileSync(file, injectMeta(template, meta, path));
  written++;
}

console.log(`prerender-meta: ${written} route HTML files written, ${skipped} skipped (${routes.size} total routes).`);
