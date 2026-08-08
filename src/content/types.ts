// content/types.ts
// Shared types for the elan1 content layer.
// The Product / Solution / Service page templates render from these structures.

export type Layer = "service" | "product" | "solution";

export interface SEO {
  title: string;
  description: string;
}

/** A capability, agent, offering, or use case — a titled item with a short description. */
export interface Feature {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  description: string;
}

export interface Hero {
  headline: string;
  subhead: string;
  /** Defaults to "Book a demo" in the template if omitted. */
  primaryCta?: string;
  secondaryCta?: string;
}

/**
 * The agent workforce an app ships, and how much of it is ON.
 *
 * WHY BOTH NUMBERS. Enablement is staged per tenant by the wave gate: a function that is not in
 * the tenant's enabled set is refused BEFORE it acts. Publishing only the roster size would imply
 * the whole workforce runs on day one, which is the single most common overstatement across these
 * pages — and it gives away the control. Publishing only the wave size would undersell the app.
 * Both, with the reason, is the honest and the stronger read.
 *
 * Counted from apps/<app>/agents.py (AgentSpec call sites) and BASELINE_WAVE in
 * apps/enterprise1/enterprise1/platform.py. See content/platform-facts.ts for the platform totals.
 */
export interface AgentWorkforce {
  /** AgentSpecs declared by the app. */
  registered: number;
  /** Of those, how many the launch wave enables. */
  launchWave: number;
  /** What the remainder are waiting on, in the site's own words. */
  note: string;
}

/**
 * An assist surface — a panel inside a screen, not a background agent.
 *
 * `mode` is the load-bearing field and must match the endpoint:
 *   advisory            → read-only. It computes and returns; a person acts.
 *   acts-through-a-gate → it proposes, and the owning app's approval gate applies before any write.
 * There is deliberately no third value: an assist that wrote unguarded would not belong on a page
 * that sells the gate.
 */
export interface Copilot {
  name: string;
  does: string;
  mode: "advisory" | "acts-through-a-gate";
}

/** A scheduled or event-triggered agent run. `trigger` is quoted from the AgentSpec. */
export interface Automation {
  name: string;
  /** e.g. "cron:nightly", "event:lead.created" — as declared in code. */
  trigger: string;
  does: string;
}

/**
 * A tool seam the app's agents are granted.
 *
 * `status` exists so the site never implies a live integration it does not have:
 *   live     → a real connection to an external system.
 *   modelled → a deterministic adapter behind the uniform interface. Real shape, not real data.
 *   declared → named and scoped, but needs credentials and a grant before it does anything.
 * Every seam on these pages is one of the latter two today. Saying so is the point.
 */
export interface McpSeam {
  name: string;
  status: "live" | "modelled" | "declared";
  note: string;
}

/** Functional agentic apps — the "1 Suite". Horizontal by function, reused across verticals. */
export interface Product {
  slug: string;
  layer: "product";
  name: string;
  tagline: string;
  businessFunction: string;
  status: "live" | "pipeline" | "planned";
  /** Set only for products that run on their own domain (e.g. enterprise1.in). Suite apps run natively. */
  externalUrl?: string;
  hero: Hero;
  /** Pains of the status quo this product removes. */
  problem: string[];
  /** The agents / key capabilities. */
  capabilities: Feature[];
  outcomes: string[];
  integrations: string[];
  /** How it fits the rest of the 1 Suite / enterprise1. */
  suiteFit: string;
  /** Trust & governance note. */
  trust: string;
  pricingTiers: PricingTier[];
  seo: SEO;
  /** Wayfinding accent color token (hex). */
  accent: string;

  // ——— The capability surface, derived from platform code (see docs/ and platform-facts.ts) ———
  // All optional so a product entry stays valid without them; the page renders each section only
  // when its data is present, so nothing renders an empty shell.

  /** The agent roster and how much of it the launch wave turns on. */
  workforce?: AgentWorkforce;
  /** The app's own store: how many object types, and what makes it a system of record. */
  systemOfRecord?: { objectTypes: number; note: string };
  /** In-screen assist panels. */
  copilots?: Copilot[];
  /** Scheduled / event-triggered runs, with their real triggers. */
  automations?: Automation[];
  /** Versioned, reusable skill manifests under skills/<namespace>/. */
  skills?: { count: number; note: string };
  /** Tool seams the agents are granted — each labelled live / modelled / declared. */
  mcpSeams?: McpSeam[];
  /** The analytics surfaces the app ships, described by what they compute. */
  dashboards?: string[];
  /**
   * VERBATIM refusal strings from the write path.
   *
   * These are the most persuasive material on the page and the hardest to fake: a refusal quoted
   * from the code proves a guard exists in a way no adjective does. Quote exactly — never
   * paraphrase into something stronger than what the guard actually blocks.
   */
  refusals?: string[];
  /** Governed cross-app workflows this app is a source of, in plain English. */
  crossAppFlows?: string[];
}

/**
 * Product categories — the five groupings the 1 Suite is presented in.
 * The split is by *what the approval gate protects*, not by org chart.
 *
 * This is the SINGLE SOURCE of the category→app mapping. Nav, footer, the products index,
 * product breadcrumbs and the sitemap all derive from `content/categories.ts` — never
 * re-list apps in a component (that is exactly how goal1 fell out of the nav and footer).
 */
export interface Category {
  slug: string;
  name: string;
  /** One-line positioning — "Win the customer", "Move the goods"… */
  positioning: string;
  /** Product slugs in this category, in display order. Must exist in products.ts. */
  apps: string[];
  hero: Hero;
  /** What the approval gate is protecting for this category — the reason the grouping exists. */
  gate: { kind: string; body: string };
  /** How the member apps compose with each other. */
  composition: string;
  /**
   * How compass (insight1 · goal1) serves THIS category. Compass is cross-cutting: it is its own
   * category *and* present inside the other four. Omitted on compass itself.
   */
  compassNote?: string;
  /**
   * Set to an app slug to render a DERIVED "which industry packs compose this app" line on the
   * category page. Never hand-write that count in `composition` — see `solutionsComposing()` in
   * solutions.ts for why (a hand-written count contradicted the site's own /solutions pages).
   */
  verticalReach?: string;
  seo: SEO;
  accent: string;
}

/** Industry solutions — compose products + platform pillars with industry skills & governance. */
export interface Solution {
  slug: string;
  layer: "solution";
  name: string;
  industry: string;
  tagline: string;
  challenge: string;
  /**
   * The suite apps this pack composes — mirroring the `composes:` field in the platform's
   * packs/<slug>/pack.yaml, and nothing else.
   *
   * 🚨 THIS FIELD WAS WRONG ON ALL TEN VERTICALS. It previously mixed delivery pillars
   * (assure1, run1, agent1, academy) into what reads as an app list, and understated the real
   * composition — bank1 showed three where the pack composes five. Two lessons worth keeping:
   *   1. A pillar is HOW elan1 delivers, not WHAT the pack composes. Pillars belong on the
   *      Platform pages, not in this array.
   *   2. The authority is the pack's own manifest. This was previously validated against the
   *      site's other content files, which is how ten wrong lists agreed with each other.
   */
  composedOf: string[];
  useCases: Feature[];
  /** The governance / compliance angle specific to this industry. */
  compliance: string;
  outcomes: string[];
  /** The fixed-scope Launchpad on-ramp. */
  starterEngagement: string;
  pricingNote: string;
  seo: SEO;
  accent: string;
  /**
   * GTM PLACEMENT ONLY — never a statement about product scope or availability.
   * `primary` verticals lead the nav, the footer and the homepage; `secondary` sit behind a
   * "More industries" group. Every vertical is fully built, live at its own URL and indexed.
   * Defaults to "primary" when omitted.
   */
  focus?: "primary" | "secondary";
  /**
   * Sold by inquiry rather than the self-serve motion (regulatory intensity or public-sector
   * procurement). SEPARATE from `focus`: a vertical can sit in the secondary nav group and still
   * be sold normally. Only set this where it is actually true — it renders as a visible label.
   */
  byInquiry?: boolean;

  // ——— The vertical's real shape, derived from platform code ———
  // Optional, so a solution entry stays valid without them; each block renders only when present.

  /**
   * The ONE thing this pack enforces on the write path that the generic suite does not.
   *
   * This is the load-bearing claim of an industry pack, and the hardest to write honestly: it must
   * be a GUARD, not a posture. "Built for regulated lending" is a posture. "A disbursal against a
   * lapsed sanction is refused at the write" is a wedge.
   */
  wedge?: string;
  /** The pains of the status quo this pack removes — the industry's version of the problem. */
  problem?: string[];
  /** What the pack adds on top of what it composes. */
  composedOfNote?: string;
  /** Records this pack owns itself, beyond the apps it composes. */
  ownRecords?: string[];
  /** The pack's own agents. */
  agents?: { name: string; does: string; tier: string }[];
  /**
   * Regulatory rails, each carrying what the CODE actually does about it.
   *
   * `status` is the whole point of this field, and it is deliberately a closed set:
   *   enforced → a guard on the write path refuses the write.
   *   computed → derived at read as decision support. It informs a person; it blocks nothing.
   *   declared → recorded as configuration or an audited attestation, with no block of its own.
   *   modelled → a deterministic adapter or a constant table standing in for a live rail.
   *
   * A constant named after a regulation is not enforcement of it. Publishing this distinction is
   * what separates a compliance claim from a compliance lie — and a regulated buyer will check.
   */
  regulatoryRails?: {
    name: string;
    status: "enforced" | "computed" | "declared" | "modelled";
    note: string;
  }[];
  /** Verbatim refusal strings from this pack's write path. Quote exactly; never strengthen. */
  refusals?: string[];
  /** The eval battery: how many sets, what they score, and whether a set can actually fail. */
  evals?: string;
}

/**
 * The pillars — what elan1 ships, and who gets you there.
 *
 * There is no top-level "Services" or "Academy" section. Each pillar is filed by the JOB THE
 * VISITOR IS DOING when they need it, not by who delivers it:
 *   platform  → strategy1 · agent1 · assure1 · run1. The lifecycle reads: plan it (strategy1) →
 *               build it (agent1) → prove it (assure1) → operate it (run1), all on the
 *               enterprise1 control plane.
 *   resources → Academy. Training, certification and talent: a learn-surface, so it sits with the
 *               other learn-surfaces rather than beside the software.
 *
 * `home` is the SINGLE SOURCE of that split — nav, footer, routing, breadcrumbs, redirects, the
 * diagram-library grouping and the sitemap all derive from it. Never hardcode the grouping.
 *
 * NAMING: the trailing "1" marks WHAT YOU RUN — everything under Products, Solutions and Platform
 * (see /platform/the-1-philosophy). Resources is content and learning, so what lives there uses
 * plain English: Academy sits beside Insights and the Glossary, none of which carry a "1".
 */
export type ServiceHome = "platform" | "resources";

export interface Service {
  slug: string;
  layer: "service";
  /** Which section owns this pillar. Drives its canonical URL: /<home>/<slug>. */
  home: ServiceHome;
  name: string;
  tagline: string;
  promise: string;
  whoFor: string;
  offerings: Feature[];
  engagementModel: string;
  deliverables: string[];
  whyElan1: string;
  outcomes: string[];
  pricingModel: string;
  /** How it hands off / connects to other offerings. */
  connectsTo: string;
  seo: SEO;
  accent: string;
}

// Brand accent tokens (keep in sync with the design system).
export const ACCENT = {
  clay: "#df8c64",
  clayDeep: "#b9603f",
  cyan: "#5ad1c0",
  gold: "#e3b25c",
  violet: "#a394ff",
  green: "#7fd58f",
  rose: "#e87f86",
  blue: "#6c8cf0", // insight1
  teal: "#5aa9a0", // project1
  magenta: "#c46fb0", // commerce1
  indigo: "#7c6cf0", // goal1
} as const;
