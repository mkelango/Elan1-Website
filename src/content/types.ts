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
}

/** Industry solutions — compose products + service pillars with industry skills & governance. */
export interface Solution {
  slug: string;
  layer: "solution";
  name: string;
  industry: string;
  tagline: string;
  challenge: string;
  /** Slugs of the products + pillars this vertical composes. */
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
   * GTM-focus, not product scope: "active" verticals get featured placement and are where outbound
   * effort goes this year; "parked" verticals (bank1/insure1/gov1 — regulatory-intensity or
   * public-sector procurement doesn't fit a promoter-led motion yet) are still fully built, still
   * live at their own URL, still indexed — just shown in a secondary group. Defaults to "active"
   * when omitted so existing entries don't need touching.
   */
  focus?: "active" | "parked";
}

/** Service pillars — how elan1 delivers. */
export interface Service {
  slug: string;
  layer: "service";
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
