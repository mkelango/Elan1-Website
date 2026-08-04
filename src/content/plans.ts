// content/plans.ts — what a subscription actually includes, and what is metered.
//
// WHY THIS FILE EXISTS (Phase 2.2). The pricing page published a commercial MOTION (sprint →
// launchpad → subscription) and four pricing MODELS by layer, but a buyer could not learn from it:
//   · which apps a plan unlocks,
//   · what usage is measured,
//   · whether LLM tokens are included or billed on top.
// All three are real, typed facts in the platform. They were simply never published.
//
// 🚨 THE RULE THIS FILE IS BUILT ON: every figure here is either a REAL product fact or absent.
// The platform's own `COMMERCIALS` (core/elan1_core/commerce.py:38) and `PLANS`
// (core/elan1_core/billing.py) carry rupee amounts and unit allowances that are explicitly commented
// **illustrative** — `growth` is deliberately set to 2 agent runs so a demo tenant shows overage on
// its first call. Those are demo fixtures, not commercial terms, and publishing them as a price
// sheet would be a fabricated claim on a public page. So: structure is published, figures are not,
// until a real number is set in PRICE_FLOOR below.

/** A plan's real entitlement — mirrors `PlanCommercials.entitlements`, core/elan1_core/commerce.py:38. */
export type PlanShape = {
  id: "growth" | "scaleup" | "enterprise";
  name: string;
  /** Brand names. NB the technical app id is `customer1`; the product is **sales1** (ADR-0100). */
  apps: string[];
  who: string;
};

export const PLAN_SHAPES: PlanShape[] = [
  {
    id: "growth",
    name: "Growth",
    apps: ["sales1"],
    who: "One function, one team — prove the governed-agent motion where revenue is closest.",
  },
  {
    id: "scaleup",
    name: "Scale-up",
    apps: ["sales1", "service1", "finance1"],
    who: "The revenue-to-cash spine: sell it, serve it, bill it — on one governed core.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    apps: [
      "sales1",
      "service1",
      "finance1",
      "supply1",
      "people1",
      "market1",
      "insight1",
      "project1",
      "commerce1",
    ],
    who: "The full 1 Suite on enterprise1, with residency, wave rollout and the governance spine.",
  },
];

/** What is actually measured. Mirrors the platform's billable metrics (core/elan1_core/billing.py). */
export const METERED = [
  {
    metric: "Agent runs",
    what: "One governed agent execution, start to finish — including the eval, the approval round-trip and the audit write.",
  },
  {
    metric: "Input tokens",
    what: "What the model reads: your prompt, the retrieved context, the skills and the tool results.",
  },
  {
    metric: "Output tokens",
    what: "What the model writes: the draft, the reasoning it shows you, and the structured result.",
  },
];

/**
 * The structural difference worth stating, and the one we can state honestly.
 *
 * A per-agent-run price with the model billed separately looks cheaper on a pricing page and is not
 * the number you pay — the tokens land on a different invoice, and on self-hosted deployments so does
 * the compute. Here, token usage is metered INSIDE the plan against an included allowance, with
 * per-unit overage beyond it.
 *
 * ⚠️ HONEST LIMIT, and the reason this stops short of an "all-in" claim: elan1 meters LLM usage, not
 * infrastructure. There is no compute/infra cost meter in the platform today (scouted 2026-08-04), so
 * "all-in" in the sense a buyer means — model + compute — is NOT something we can currently compute,
 * and the page must not imply it. What is true: the model cost is inside the plan, not beside it.
 */
export const INCLUDED_VS_EXTRA = [
  { item: "The nine suite apps your plan unlocks", included: true },
  { item: "Model tokens, up to your plan's allowance", included: true },
  { item: "Governance — evals, approval gates, the hash-chained audit", included: true },
  { item: "Connectors and least-privilege grants", included: true },
  { item: "Usage beyond the allowance", included: false, note: "metered per unit, at your plan's rate" },
  { item: "Deployment infrastructure, if you self-host", included: false, note: "your cloud bill, billed by your cloud" },
];

/**
 * 🚧 THE ONE FIGURE THAT IS NOT MINE TO SET.
 *
 * Leave `null` and the page says "talk to us" — honest, and what it says today. Set it to a real
 * monthly rupee amount that has been decided commercially and the page publishes a floor.
 *
 * Do NOT copy `COMMERCIALS["growth"].subscription_micros` (₹25,000/mo) in here. That constant is
 * marked `# (illustrative)` in the source: it is a seed value chosen so the demo tenant produces
 * interesting numbers, not a price anyone has agreed to sell at.
 */
export const PRICE_FLOOR: { amountInr: number; period: "month" } | null = null;

/** Currency posture: India-first, ₹ only. One number a buyer can budget, in the currency they budget in. */
export const CURRENCY = { code: "INR", symbol: "₹" } as const;
