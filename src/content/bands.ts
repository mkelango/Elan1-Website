// content/bands.ts — the three revenue bands. Drives the band landing pages + the band-aware ROI
// calculator. All figures illustrative — planning constructs, not financial advice.
export type BandId = "growth" | "scaleup" | "enterprise";

export interface Band {
  id: BandId;
  name: string;
  range: string;
  tagline: string;
  who: string;
  mix: string[]; // the offering mix that fits this band
  pricing: string;
  accent: string;
  /** ROI calculator defaults for this band. */
  defaults: { people: number; hoursPerWeek: number; hourlyCost: number };
  /** Illustrative share of that effort a governed agent removes. */
  automation: number;
}

export const BANDS: Band[] = [
  {
    id: "growth",
    name: "Growth",
    range: "$1M–$10M",
    tagline: "One agent, one win — fast.",
    who: "Startups and small teams who need a number-one capability without a number-one budget.",
    mix: [
      "Start with a Discovery Sprint + one Launchpad (e.g. sales1 outreach)",
      "A single agentic app, governed and live in weeks",
      "run1 lite operations; pay as you grow",
    ],
    pricing: "Fixed-fee Launchpad, then light per-seat/usage. No open-ended retainers.",
    accent: "#3fae6b",
    defaults: { people: 3, hoursPerWeek: 8, hourlyCost: 18 },
    automation: 0.5,
  },
  {
    id: "scaleup",
    name: "Scale-up",
    range: "$10M–$100M",
    tagline: "Sequence functions into a flywheel.",
    who: "Scaleups ready to move from one win to several functions running on agents.",
    mix: [
      "Multiple 1 Suite apps composed on enterprise1",
      "A vertical pack with your industry's governance signature",
      "run1 managed operations + assure1 governance",
    ],
    pricing: "Per-seat/usage product pricing + a governance retainer; Launchpads per function.",
    accent: "#2f6df0",
    defaults: { people: 12, hoursPerWeek: 10, hourlyCost: 22 },
    automation: 0.55,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    range: "$100M–$1B",
    tagline: "The whole business, one control plane.",
    who: "Enterprises standardizing every function on one governed, multi-region agentic platform.",
    mix: [
      "The full 1 Suite on enterprise1 — one governance pane + wave rollout",
      "Multi-region residency + localized governance (DPDP/GDPR…)",
      "Partner ecosystem + academy1 enablement for your teams",
    ],
    pricing: "Enterprise licensing on enterprise1 + operations & governance retainers. Custom quote.",
    accent: "#b9603f",
    defaults: { people: 60, hoursPerWeek: 12, hourlyCost: 28 },
    automation: 0.6,
  },
];

export const bandById = (id: string): Band | undefined => BANDS.find((b) => b.id === id);
