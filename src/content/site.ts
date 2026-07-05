// content/site.ts
// Global site content: brand constants, navigation, layer metadata, and home-page copy.
// Offering copy lives in products.ts / solutions.ts / services.ts.

export const BRAND = {
  name: "elan1",
  tagline: "Add 1. Become the one.",
  promise: "The agentic transformation company.",
  oneLiner:
    "elan1 turns startups, scaleups, and enterprises into agentic organizations — number one in their field, one customer at a time.",
  founder: "Elango",
  email: "hello@elan1.in",
  sales: "sales@elan1.in",
};

// The control-plane console URL ("Log in"). Override per-environment with VITE_APP_URL
// (e.g. https://app.elan1.in in production); defaults to the local dev console.
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

export type LayerKey = "products" | "solutions" | "services";

export const LAYERS: Record<
  LayerKey,
  { label: string; tag: string; blurb: string; accent: string; href: string }
> = {
  services: {
    label: "Services",
    tag: "How we deliver",
    blurb: "Six pillars that take you from strategy to scale — start anywhere, we take you everywhere.",
    accent: "#7c6cf0",
    href: "/services",
  },
  products: {
    label: "Products",
    tag: "What we deploy",
    blurb: "The 1 Suite — ten agentic apps, one for every business function, unified on enterprise1.",
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

export const NAV: NavItem[] = [
  {
    label: "Products",
    href: "/products",
    mega: [
      {
        heading: "The 1 Suite — by function",
        links: [
          { label: "sales1", href: "/products/sales1", desc: "Sales & CRM", tag: "live", accent: "#df8c64" },
          { label: "service1", href: "/products/service1", desc: "Customer Service", accent: "#d39a3a" },
          { label: "finance1", href: "/products/finance1", desc: "Finance & Accounting", accent: "#22b8c4" },
          { label: "supply1", href: "/products/supply1", desc: "Supply Chain", accent: "#3fae6b" },
          { label: "people1", href: "/products/people1", desc: "HR & Talent", accent: "#e0656d" },
          { label: "market1", href: "/products/market1", desc: "Marketing & Growth", accent: "#7c6cf0" },
          { label: "insight1", href: "/products/insight1", desc: "Analytics & Intelligence", tag: "live", accent: "#6c8cf0" },
          { label: "project1", href: "/products/project1", desc: "Project & Services Delivery", tag: "live", accent: "#5aa9a0" },
          { label: "commerce1", href: "/products/commerce1", desc: "eCommerce + POS", tag: "live", accent: "#c46fb0" },
        ],
      },
      {
        heading: "The backbone",
        links: [
          { label: "enterprise1", href: "/products/enterprise1", desc: "The platform that unifies the suite", accent: "#b9603f" },
          { label: "The 1 Suite overview", href: "/products", desc: "One platform, every function" },
          { label: "Agentic apps vs. copilots", href: "/what-is-agentic-transformation", desc: "Why apps that act beat tools that wait" },
        ],
      },
    ],
    featured: {
      title: "See the full 1 Suite",
      body: "Ten agentic apps, one control plane. Explore how they compose into a single agentic enterprise.",
      href: "/products",
      cta: "Explore the suite",
    },
  },
  {
    label: "Solutions",
    href: "/solutions",
    mega: [
      {
        heading: "By industry",
        links: [
          { label: "health1", href: "/solutions/health1", desc: "Healthcare & life sciences", accent: "#3fae6b" },
          { label: "retail1", href: "/solutions/retail1", desc: "Retail & e-commerce", accent: "#d39a3a" },
          { label: "manufacture1", href: "/solutions/manufacture1", desc: "Manufacturing", accent: "#22b8c4" },
          { label: "realestate1", href: "/solutions/realestate1", desc: "Real estate & construction", accent: "#d39a3a" },
          { label: "edu1", href: "/solutions/edu1", desc: "Education", accent: "#3fae6b" },
        ],
      },
      {
        heading: " ",
        links: [
          { label: "telco1", href: "/solutions/telco1", desc: "Telecommunications", accent: "#7c6cf0" },
          { label: "energy1", href: "/solutions/energy1", desc: "Energy & utilities", accent: "#b9603f" },
          { label: "bank1", href: "/solutions/bank1", desc: "Banking & capital markets · by inquiry", accent: "#df8c64" },
          { label: "insure1", href: "/solutions/insure1", desc: "Insurance · by inquiry", accent: "#22b8c4" },
          { label: "gov1", href: "/solutions/gov1", desc: "Public sector · by inquiry", accent: "#e0656d" },
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
    label: "Services",
    href: "/services",
    mega: [
      {
        heading: "The six pillars — end-to-end delivery",
        links: [
          { label: "strategy1", href: "/services/strategy1", desc: "Agentic strategy that ships", accent: "#df8c64" },
          { label: "agent1", href: "/services/agent1", desc: "The agent build studio", accent: "#3fae6b" },
          { label: "assure1", href: "/services/assure1", desc: "Governance, evals & trust", accent: "#e0656d" },
        ],
      },
      {
        heading: " ",
        links: [
          { label: "academy1", href: "/services/academy1", desc: "Training, certification & talent", accent: "#7c6cf0" },
          { label: "run1", href: "/services/run1", desc: "Managed AgentOps & FinOps", accent: "#22b8c4" },
          { label: "agency1", href: "/services/agency1", desc: "Creative at agent speed", accent: "#d39a3a" },
        ],
      },
    ],
    featured: {
      title: "Strategy to scale, under one roof",
      body: "The six pillars are a flywheel: services land, products expand, solutions deepen, trust compounds.",
      href: "/services",
      cta: "See the method",
    },
  },
  {
    label: "Platform",
    href: "/what-is-agentic-transformation",
    mega: [
      {
        heading: "The approach",
        links: [
          { label: "What is agentic transformation?", href: "/what-is-agentic-transformation", desc: "The category, the shift, the maturity curve, why now" },
          { label: "Why elan1 vs builders", href: "/platform/why-elan1", desc: "Run your business on agents — not just build one", accent: "#df8c64" },
          { label: "The “1” philosophy", href: "/platform/the-1-philosophy", desc: "Number one · one-to-one · all-as-one" },
          { label: "The flywheel", href: "/platform/flywheel", desc: "How value compounds across the three layers" },
        ],
      },
      {
        heading: " ",
        links: [
          { label: "Governance — three layers", href: "/platform/governance", desc: "Defense-in-depth, provable & exportable", accent: "#e0656d" },
          { label: "Trust, safety & governance", href: "/trust", desc: "The differentiator legacy firms can't write" },
          { label: "Built on Claude", href: "/platform/built-on-claude", desc: "Why Claude-native depth wins" },
          { label: "Security & compliance", href: "/trust", desc: "Data handling, residency, certifications" },
        ],
      },
    ],
  },
  { label: "Academy", href: "/academy" },
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
          { label: "Proof & case studies", href: "/resources/proof", desc: "Before / after, with Trust Marks" },
          { label: "ROI calculator", href: "/resources", desc: "Size the value, lite" },
          { label: "Glossary", href: "/resources/glossary", desc: "The agentic vocabulary" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/company/about",
    mega: [
      {
        heading: "elan1",
        links: [
          { label: "About", href: "/company/about", desc: "Born in India to lead the agentic era" },
          { label: "Vision, mission & values", href: "/company/about", desc: "The “1” code" },
          { label: "Careers", href: "/company/careers", desc: "Join the #1 team" },
        ],
      },
      {
        heading: " ",
        links: [
          { label: "Partners", href: "/partners", desc: "Plug in and win together" },
          { label: "Newsroom", href: "/company/about", desc: "Press & brand assets" },
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
      body: "A working, certified agent deployed in weeks, operated reliably, then sequenced to scale across the whole business.",
    },
    {
      title: "Why now",
      body: "Frontier models, the Agent SDK, MCP connectors, and Skills have made production agents real. The window to lead is open — legacy consulting is structurally too slow to follow.",
    },
  ],
};

export const METHOD = [
  { step: "01", name: "Discover", body: "Map the highest-value agentic opportunities across your business.", gate: "G1" },
  { step: "02", name: "Design", body: "Architect the agent, its skills, connectors, and governance.", gate: "" },
  { step: "03", name: "Deliver", body: "Ship a production-grade agent in weeks, integrated with your stack.", gate: "G2" },
  { step: "04", name: "Assure", body: "Evaluate accuracy, safety, and fairness — earn the Trust Mark.", gate: "G3" },
  { step: "05", name: "Handoff", body: "Operate reliably with run1, or hand the keys to your team.", gate: "G4" },
  { step: "06", name: "Expand", body: "Sequence the next function. The flywheel turns.", gate: "" },
];

export const FLYWHEEL = [
  { label: "Services land", body: "A pillar engagement ships the first proof.", accent: "#7c6cf0" },
  { label: "Products expand", body: "The win graduates into a 1 Suite app.", accent: "#2f6df0" },
  { label: "Solutions deepen", body: "Industry skills + governance compound value.", accent: "#d39a3a" },
  { label: "Trust compounds", body: "Each certified result makes the next sale easier.", accent: "#e0656d" },
];

export const WHY_WIN = [
  { metric: "Weeks", label: "to a deployed, certified agent — not quarters to a deck." },
  { metric: "Human-in-the-loop", label: "on every consequential action, by design." },
  { metric: "Built on Claude", label: "frontier depth, safety, and reasoning — not multi-model generalism." },
  { metric: "Outcome-priced", label: "we land on a fixed-scope wedge, then expand on proof." },
];

export const REGIONS = ["India", "Singapore", "United States", "Middle East", "Europe"];

export const VS_LEGACY = [
  { dim: "What you get", legacy: "A slide deck and a recommendation", elan1: "A working, certified agent in production" },
  { dim: "Time to value", legacy: "Quarters", elan1: "Weeks" },
  { dim: "Pricing", legacy: "Time & materials, open-ended", elan1: "Fixed-scope wedge, then expand on proof" },
  { dim: "Governance", legacy: "A separate risk workstream", elan1: "Built in — human-in-the-loop, audited, Trust-Marked" },
  { dim: "After delivery", legacy: "They leave", elan1: "We operate it, and sequence the next win" },
];
