// content/site.ts
// Global site content: brand constants, navigation, layer metadata, and home-page copy.
// Offering copy lives in products.ts / solutions.ts / services.ts.
// The Products mega-menu derives from categories.ts — see productCategoryColumns below.

import { categories, appsOf, categorizedAppSlugs, numberWord, sentenceCase } from "./categories";
import { platformPillars, resourcePillars, servicePath } from "./services";
import { primarySolutions, secondarySolutions } from "./solutions";

export const BRAND = {
  name: "elan1",
  tagline: "Add 1. Become the one.",
  promise: "The agentic transformation company.",
  oneLiner:
    "elan1 turns startups, scaleups, and enterprises into agentic organizations — number one in their field, one customer at a time.",
  founder: "Elango",
  email: "hello@elan1.ai",
  sales: "sales@elan1.ai",
};

// The control-plane console URL ("Log in"). Override per-environment with VITE_APP_URL
// (e.g. https://app.elan1.ai in production); defaults to the local dev console.
export const APP_URL =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_APP_URL ||
  "http://localhost:5189";

// Social links — only entries with a non-empty `href` are rendered (no dead "#" links).
// TODO(launch): confirm/replace these handles with the real official profiles before go-live.
export const SOCIALS: { key: string; label: string; href: string }[] = [
  { key: "in", label: "LinkedIn", href: "https://www.linkedin.com/company/elan1" },
  { key: "x", label: "X", href: "https://x.com/elan1ai" },
  { key: "yt", label: "YouTube", href: "https://www.youtube.com/@elan1ai" },
].filter((s) => s.href.trim().length > 0);

export type LayerKey = "products" | "solutions" | "platform";

export const LAYERS: Record<
  LayerKey,
  { label: string; tag: string; blurb: string; accent: string; href: string }
> = {
  platform: {
    label: "Platform",
    tag: "What it runs on",
    blurb: "One control plane, plus the pillars that build, prove and operate your agents.",
    accent: "#b9603f",
    href: "/platform",
  },
  products: {
    label: "Products",
    tag: "What we deploy",
    blurb: "The 1 Suite — ten agentic apps in five categories, unified on enterprise1.",
    accent: "#2f6df0",
    href: "/products",
  },
  solutions: {
    label: "Solutions",
    tag: "Who we serve",
    blurb: "Ten industry solutions that compose the suite with sector skills and the governance your regulator expects.",
    accent: "#d39a3a",
    href: "/solutions",
  },
};

// ——— Navigation model (drives the mega-menus) ———

/**
 * "The approach" — the narrative set that has always lived under Platform. Declared once here and
 * consumed by BOTH the Platform mega-menu and the /platform hub page, so the two can never diverge.
 */
export const APPROACH_LINKS: NavLink[] = [
  { label: "What is agentic transformation?", href: "/what-is-agentic-transformation", desc: "The category, the shift, the maturity curve, why now" },
  { label: "Why elan1 vs builders", href: "/platform/why-elan1", desc: "Run your business on agents — not just build one" },
  { label: "The \u201C1\u201D philosophy", href: "/platform/the-1-philosophy", desc: "Number one \u00B7 one-to-one \u00B7 all-as-one" },
  { label: "The flywheel", href: "/platform/flywheel", desc: "How value compounds across the layers" },
  { label: "Governance \u2014 three layers", href: "/platform/governance", desc: "Defense-in-depth, provable & exportable" },
  { label: "Trust, safety & governance", href: "/trust", desc: "How every agent is built, approved and audited" },
  { label: "Built on Claude", href: "/platform/built-on-claude", desc: "Why Claude-native depth wins" },
  { label: "Security & compliance", href: "/trust", desc: "Data handling, residency, certifications" },
];
export interface NavLink {
  label: string;
  href: string;
  desc?: string;
  tag?: string;
  accent?: string;
}
export interface NavColumn {
  heading: string;
  links: NavLink[];
}
export interface NavItem {
  label: string;
  href: string;
  mega?: NavColumn[];
  featured?: { title: string; body: string; href: string; cta: string };
}

/**
 * The Products mega-menu is DERIVED from content/categories.ts — one column per category, the
 * category heading linking to its page and the member apps beneath (the Dynamics 365 pattern).
 * Never hardcode the app list here: the previous hardcoded version silently lost goal1 while the
 * featured blurb beside it still claimed "Ten agentic apps".
 */
const productCategoryColumns: NavColumn[] = categories.map((c) => ({
  heading: `${c.name} — ${c.positioning.replace(/\.$/, "")}`,
  links: [
    // No `accent` on the overview, matching "Platform overview" in the Platform column: a dot marks
    // a THING YOU RUN (an app, a pillar). An overview is navigation to the parent, not a peer of the
    // apps beneath it — an identical dot flattened that hierarchy.
    {
      label: `${c.name} overview`,
      href: `/products/category/${c.slug}`,
      desc: `${c.apps.length} ${c.apps.length === 1 ? "app" : "apps"} · gate: ${c.gate.kind.toLowerCase()}`,
    },
    ...appsOf(c).map((p) => ({
      label: p.name,
      href: `/products/${p.slug}`,
      desc: p.businessFunction,
      tag: p.status === "live" ? "live" : undefined,
      accent: p.accent,
    })),
  ],
}));

/**
 * TOP-LEVEL ORDER IS AN ARGUMENT, NOT AN ALPHABET.
 *
 * Platform leads. The wedge is architectural — elan1 owns the system of record and governs the
 * WRITE, where a comparator sits on top of someone else's record and governs the CALL. A visitor
 * who understands the governed write path then understands why the apps differ. Leading with
 * Products invites "so it's another CRM", which is the one reading that makes the rest of the site
 * unnecessary.
 *
 * Proof replaces the Customers menu every comparator runs. elan1 has no nameable customers, and a
 * Customers menu with no customers advertises the absence. Proof is the stronger play in a trust
 * sale anyway, and it converts into Customers later by adding one row — never before a named,
 * consented partner exists.
 *
 * Pricing is a top-level plain link (no mega). It was buried inside the Products mega, three
 * hovers from the homepage, which is where a buyer looks first and finds nothing.
 */
export const NAV: NavItem[] = [
  {
    label: "Platform",
    href: "/platform",
    mega: [
      {
        // Five columns. Every href below resolves to a route that exists in App.tsx today —
        // checked in both directions. Sub-capabilities that have no page of their own (the policy
        // engine, the approval gate, the audit chain, token metering, wave rollout) live in a
        // `desc` rather than as a link to nowhere: a nav entry is a promise that a page exists.
        heading: "The control plane",
        links: [
          { label: "enterprise1", href: "/platform/enterprise1", desc: "Governance, identity, audit and wave rollout for every app", accent: "#b9603f" },
          { label: "assistant1", href: "/platform/assistant1", desc: "The governed central assistant — it proposes, the app decides", accent: "#5ad1c0" },
          { label: "agent1", href: "/platform/agent1", desc: "The studio where a governed agent is built, evaluated and compiled", accent: "#7c6cf0" },
        ],
      },
      {
        // NEW. Context is what an agent READS; an ontology is the typed structure a WRITE is
        // validated against. A retrieval graph makes answers better — an ontology makes writes
        // refusable. Deliberately NOT "Enterprise Context": that is a competitor's term, and
        // second place in someone else's word is worth nothing.
        heading: "Enterprise Ontology",
        links: [
          { label: "The record model", href: "/platform/enterprise-ontology", desc: "Typed objects across the systems of record — what a write is validated against", accent: "#2f6df0" },
          { label: "Connectors — MCP-native", href: "/platform/connectors", desc: "Typed, least-privilege seams; credential-gated, never pre-connected" },
          { label: "Verticals are config, not forks", href: "/platform/verticals-are-config", desc: "Ten industries, zero forked application code" },
        ],
      },
      {
        heading: "Trust & governance",
        links: [
          { label: "assure1", href: "/platform/assure1", desc: "Evals, evidence packs and the Trust Mark", accent: "#e0656d" },
          { label: "Governance — three layers", href: "/platform/governance", desc: "The policy engine, the approval gate, and the hash-chained audit" },
          { label: "Trust Center", href: "/trust", desc: "Principles, governance signatures, security and certification posture" },
        ],
      },
      {
        heading: "Operate",
        links: [
          { label: "run1", href: "/platform/run1", desc: "Operations, token metering and FinOps, eval-gated model migration", accent: "#3fae6b" },
          { label: "Engineering & readiness", href: "/platform/engineering", desc: "Identity, isolation, audit, retention, DR — and the limits, stated" },
          { label: "Platform overview", href: "/platform", desc: "How the control plane and the pillars fit" },
        ],
      },
      {
        heading: "Build & prove",
        links: [
          { label: "strategy1", href: "/platform/strategy1", desc: "The fixed-scope engagement that plans and lands the work", accent: "#df8c64" },
          { label: "Built on Claude", href: "/platform/built-on-claude", desc: "Why Claude-native depth wins" },
          { label: "Why elan1 vs builders", href: "/platform/why-elan1", desc: "Run your business on agents — not just build one" },
        ],
      },
    ],
    featured: {
      title: "Everyone audits the call. elan1 audits the record.",
      body: "A comparator's agent sits on top of your system of record and logs that it called an API. elan1 owns the record — so the audit shows the row before, the policy that fired, the person who approved, and the hash chain proving nothing was edited after.",
      href: "/platform/governance",
      cta: "See how governance works",
    },
  },
  {
    label: "Products",
    href: "/products",
    mega: [
      ...productCategoryColumns,
      {
        heading: "The suite, end to end",
        links: [
          { label: "The 1 Suite overview", href: "/products", desc: "Five categories, one platform" },
          { label: "Agentic apps vs. copilots", href: "/what-is-agentic-transformation", desc: "Why apps that act beat tools that wait" },
          { label: "The record model", href: "/platform/enterprise-ontology", desc: "The typed structure every app writes through" },
        ],
      },
    ],
    featured: {
      title: "See the full 1 Suite",
      body: `${sentenceCase(numberWord(categorizedAppSlugs.length))} agentic apps in five categories, on one control plane. Explore how they compose into a single agentic enterprise.`,
      href: "/products",
      cta: "Explore the suite",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    mega: [
      {
        // DERIVED — the five focus verticals, then ONE link to the rest. The menu used to hardcode
        // all ten, and the hardcoded split had already drifted from the `focus` field it was
        // supposed to mirror. Never re-list a vertical here.
        heading: "By industry",
        links: [
          ...primarySolutions.map((s) => ({
            label: s.name,
            href: `/solutions/${s.slug}`,
            desc: s.industry,
            accent: s.accent,
          })),
          {
            label: "More industries",
            href: "/solutions",
            desc: `${secondarySolutions.map((s) => s.name).join(", ")}`,
          },
        ],
      },
      {
        heading: "By initiative",
        links: [
          { label: "Agentic transformation", href: "/solutions/initiatives/agentic-transformation", desc: "From AI to an agentic org", accent: "#df8c64" },
          { label: "Customer experience", href: "/solutions/initiatives/customer-experience", desc: "Resolve, personalize, grow", accent: "#2f6df0" },
          { label: "Cost & FinOps", href: "/solutions/initiatives/cost-finops", desc: "More, for less", accent: "#3fae6b" },
          { label: "Compliance & governance", href: "/solutions/initiatives/compliance", desc: "Deploy with evidence", accent: "#e0656d" },
          { label: "Legacy modernization", href: "/solutions/initiatives/legacy-modernization", desc: "Wrap, don't rip", accent: "#7c6cf0" },
        ],
      },
    ],
    featured: {
      title: "Agentic transformation, tuned to your world",
      body: "Browse by industry for your sector's governance signature, or by initiative for a cross-industry outcome.",
      href: "/solutions/initiatives",
      cta: "Browse initiatives",
    },
  },
  {
    label: "Platform",
    href: "/platform",
    mega: [
      {
        // DERIVED — enterprise1 (the control plane) plus every platform pillar from services.ts, in
        // LIFECYCLE order: plan it (strategy1) → build it (agent1) → prove it (assure1) →
        // operate it (run1). Everything under Platform is something you run, so every pillar here
        // carries the "1"; Resources is content and learning, and uses plain English.
        heading: "The platform — what it runs on",
        links: [
          { label: "enterprise1", href: "/platform/enterprise1", desc: "The control plane: governance, identity, audit, rollout", accent: "#b9603f" },
          { label: "assistant1", href: "/platform/assistant1", desc: "The governed central assistant — it proposes, the app decides", accent: "#5ad1c0" },
          ...platformPillars.map((s) => ({
            label: s.name,
            href: servicePath(s),
            desc: s.tagline,
            accent: s.accent,
          })),
          { label: "Platform overview", href: "/platform", desc: "How the control plane and the pillars fit" },
        ],
      },
      {
        heading: "How it holds up",
        links: [
          { label: "Engineering & readiness", href: "/platform/engineering", desc: "Identity, isolation, audit, retention, DR — and the limits, stated" },
          { label: "Connectors", href: "/platform/connectors", desc: "Typed, least-privilege seams — credential-gated, never pre-connected" },
          { label: "Verticals are config", href: "/platform/verticals-are-config", desc: "Ten industries, zero forked application code" },
          { label: "Governance — three layers", href: "/platform/governance", desc: "Defense-in-depth, provable & exportable" },
        ],
      },
      { heading: "The approach", links: APPROACH_LINKS.slice(0, 4) },
    ],
    featured: {
      title: "Plan it. Build it. Prove it. Operate it.",
      body: "Products are the five categories you run your business on. The platform is what they run on — one control plane, the engagement that plans the work, and the pillars that build, prove and operate it.",
      href: "/platform",
      cta: "Explore the platform",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    mega: [
      {
        heading: "Learn",
        links: [
          { label: "Insights", href: "/resources/insights", desc: "Agentic transformation, per layer & vertical" },
          { label: "Diagram library", href: "/resources/diagrams", desc: "See the systems we build" },
          { label: "Playbooks", href: "/resources/playbooks", desc: "Gated guides & roadmaps" },
        ],
      },
      {
        heading: "Prove",
        links: [
          { label: "Governed patterns", href: "/resources/proof", desc: "Before / after, and the guarantee each one carries" },
          { label: "ROI calculator", href: "/for/scaleup", desc: "Size the value, lite" },
          { label: "Glossary", href: "/resources/glossary", desc: "The agentic vocabulary" },
        ],
      },
      {
        // DERIVED — the learn-surface pillars from services.ts (Academy). The top-level Academy menu
        // is gone; training is something you come to Resources to do.
        heading: "Academy",
        links: [
          // No `accent` here on purpose. In the Platform menu every pillar carries one, so the dots
          // read as a set. Here Academy is the only pillar among plain content links, so a lone dot
          // reads as an accident rather than emphasis.
          ...resourcePillars.map((s) => ({
            label: s.name,
            href: servicePath(s),
            desc: s.tagline,
          })),
          { label: "Learning hub", href: "/resources/academy/learn", desc: "Courses and certification levels" },
          { label: "Certified talent", href: "/company/partners", desc: "Hire or augment with certified people" },
        ],
      },
    ],
    featured: {
      title: "Start with a Discovery Sprint",
      body: "Fixed-scope, low-risk and fully credited: a costed opportunity map and a working proof. It is the strategy1 engagement that gets a first agent into production.",
      href: "/platform/strategy1",
      cta: "See how strategy1 works",
    },
  },
  {
    label: "Company",
    href: "/company/about",
    mega: [
      {
        heading: "elan1",
        links: [
          { label: "About", href: "/company/about", desc: "Why the gate belongs on the write path" },
          { label: "Careers", href: "/company/careers", desc: "What the work is, and how we build" },
        ],
      },
      {
        heading: " ",
        links: [
          { label: "Partners", href: "/company/partners", desc: "Build on the core, certify before you list" },
          { label: "Newsroom", href: "/company/newsroom", desc: "Boilerplate, brand assets, attributable facts" },
          { label: "Contact", href: "/contact", desc: "Talk to an expert" },
        ],
      },
    ],
  },
];

// ——— Home page copy ———
export const SHIFT = {
  kicker: "The shift",
  headline: "Software answered questions. Agents do the work.",
  body: "For forty years, software waited for instructions. Agentic systems act — they reason, use tools, and complete work end to end, under human control. This is not a feature. It's a new operating layer for the enterprise.",
  points: [
    {
      title: "The old way",
      body: "Slow, expensive strategy decks that never ship — or generic AI tools that aren't grounded, governed, or owned.",
    },
    {
      title: "The elan1 way",
      body: "A working agent that reached production through a passing eval, a named approver and a Trust Mark — then operated, and widened one enabled function at a time.",
    },
    {
      title: "Why now",
      body: "Frontier models, the Agent SDK, MCP connectors, and Skills have made production agents real. What changed is not the ambition but the substrate: production agents are buildable, and governable, now.",
    },
  ],
};

export const METHOD = [
  { step: "01", name: "Discover", body: "Map the highest-value agentic opportunities across your business.", gate: "Scope agreed" },
  { step: "02", name: "Design", body: "Architect the agent, its skills, connectors, and governance.", gate: "" },
  { step: "03", name: "Deliver", body: "Ship a production-grade agent in weeks, integrated with your stack.", gate: "In production" },
  { step: "04", name: "Assure", body: "Evaluate accuracy, safety, and fairness — earn the Trust Mark.", gate: "Trust Mark" },
  { step: "05", name: "Handoff", body: "Operate reliably with run1, or hand the keys to your team.", gate: "Operating" },
  { step: "06", name: "Expand", body: "Sequence the next function. The flywheel turns.", gate: "" },
];

// The motion is unchanged; only the first label was tied to the retired "Services" section.
// A first engagement is strategy1, the pillar that plans and lands the work under Platform.
export const FLYWHEEL = [
  { label: "A sprint lands", body: "A fixed-scope strategy1 engagement ships the first proof.", accent: "#7c6cf0" },
  { label: "Products expand", body: "The win graduates into a 1 Suite app.", accent: "#2f6df0" },
  { label: "Solutions deepen", body: "Industry skills + governance compound value.", accent: "#d39a3a" },
  { label: "Trust carries forward", body: "The control plane, the connector grants and the governance signature are reused rather than rebuilt.", accent: "#e0656d" },
];

export const WHY_WIN = [
  { metric: "Eval-gated", label: "an agent reaches production through a passing eval, a named approver and a Trust Mark." },
  { metric: "Human-in-the-loop", label: "on consequential actions — single-use, fingerprinted approvals." },
  { metric: "Built on Claude", label: "frontier depth, safety, and reasoning — not multi-model generalism." },
  { metric: "Outcome-priced", label: "we land on a fixed-scope wedge, then expand on proof." },
];

export const REGIONS = ["India", "Singapore", "United States", "Middle East", "Europe"];

/**
 * How we work — five commitments, stated about elan1 only.
 *
 * 🚨 THIS REPLACED A COMPETITOR TABLE, AND MUST NOT BECOME ONE AGAIN.
 *
 * It was `VS_LEGACY`: three columns — dimension, "Legacy consulting", "elan1" — with the middle
 * column rendered STRUCK THROUGH. Its five rows asserted that legacy consulting delivers "a slide
 * deck and a recommendation", takes "quarters", prices "time & materials, open-ended", treats
 * governance as "a separate risk workstream", and that after delivery "they leave".
 *
 * Three things were wrong with it. It asserted what a competitor category does, which we never do
 * and cannot source. It carried a timeline promise ("Weeks") that no one had sized. And it rendered
 * on BOTH the home page and /what-is-agentic-transformation from this one constant — so removing it
 * from a page would not have removed it from the site. That last part is the reason it lives here
 * with this comment rather than being fixed twice in two components.
 *
 * The replacement keeps the persuasive job — telling a buyer what working with us is actually like —
 * and does it by naming OUR mechanisms precisely enough that a reader can make the comparison
 * themselves. That is the stronger move anyway: a specific claim about us beats a vague one about
 * someone else, and it survives being read by the people it used to be about.
 */
export const HOW_WE_WORK = [
  {
    dim: "What you get",
    body: "A working agent in production, or a written reason it is not ready. Reaching production means a passing eval, a named approver and a Trust Mark — a mark is refused on an eval run that scored zero cases, one that did not pass, or one from another tenant.",
  },
  {
    dim: "How it is scoped",
    body: "A fixed-scope engagement first, then expansion on what shipped. The rollout order is not a promise in a deck: agents are enabled per tenant one function at a time, and a function outside the enabled set is refused before it runs.",
  },
  {
    dim: "Where governance sits",
    body: "On the write path, not in a parallel risk workstream. A consequential action routes to a named human, and the approval token is bound to both the action and a content hash of the exact payload, then spent — so it cannot be reused on anything else.",
  },
  {
    dim: "What you can audit",
    body: "An append-only, hash-chained record per tenant, with updates and deletes blocked by a database trigger rather than by convention. Where damage cannot be repaired it is declared with a frozen digest instead of quietly rewritten.",
  },
  {
    dim: "After it ships",
    body: "We operate it and widen it one enabled function at a time — which is also the only way to roll one back. A suspend switch overrides an enabled set immediately, because reducing capability is the wrong thing to queue for approval.",
  },
];

/**
 * Every link under a top-level nav item, flattened in the order the header's mega-menu shows them.
 *
 * 🚨 WHY THIS EXISTS. The footer used to hand-list its Platform and Resources columns. Both drifted
 * from the header, in both of the ways a duplicated list can:
 *   · ORDER — the footer put "Platform overview" first and buried the four pillars after the
 *     engineering links, while the header runs enterprise1 → assistant1 → the pillars in lifecycle
 *     order (plan it → build it → prove it → operate it) → overview.
 *   · COMPLETENESS — Resources showed 7 of its 9 destinations. "ROI calculator" and "Certified
 *     talent" were simply absent, and nothing failed: a missing row in a hand-written array is
 *     invisible to the type-checker and to every gate.
 *
 * This is the same defect the Products column already had — a hardcoded list that silently lost
 * goal1 while the blurb beside it still said "ten agentic apps". The fix is the same one: derive.
 *
 * `dedupeByHref` matters because a mega-menu legitimately repeats a destination across columns
 * (Trust appears under both "Trust, safety & governance" and "Security & compliance"). The header
 * wants both labels; a footer column wants one row per destination.
 */
export function navColumnLinks(
  label: string,
  opts: { dedupeByHref?: boolean } = { dedupeByHref: true },
): NavLink[] {
  const item = NAV.find((n) => n.label === label);
  if (!item?.mega) return [];
  const flat = item.mega.flatMap((c) => c.links);
  if (!opts.dedupeByHref) return flat;
  const seen = new Set<string>();
  return flat.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)));
}
