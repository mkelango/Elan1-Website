// content/roi.ts — the typed content behind the value worksheet on the band pages.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS, AND WHY IT READS LIKE A SET OF WARNINGS
//
// The panel this file feeds is the single most dangerous surface on the site. It prints a large
// number in a display face next to the word ROI, and a reader's eye treats a large number in a
// display face as a FINDING. It is not a finding. It is four sliders multiplied together, and one
// of the four is a guess about work nobody has automated yet.
//
// Nothing on this platform has been measured in a customer environment. There is no pilot result,
// no benchmark, no reference figure, and no removal rate. An earlier version of the panel supplied
// one anyway — it multiplied by a per-band automation rate and printed "a governed agent removes
// ~50% of this toil" as an elan1 claim, on a public page, beside a currency figure. That rate is
// gone and must not come back: the share is now the visitor's own input, it starts at zero, and
// the result stays blank until they set it.
//
// This file goes one step further than that fix, because that fix left a deeper problem standing.
//
// 🚨 THE PANEL COMPUTES A GROSS FIGURE AND THE WORD "ROI" PROMISES A RATIO.
// A return needs an investment term. There is no cost side in this arithmetic — no licence, no
// build, no connector work, no change and training, and no run cost for the agents themselves.
// The platform's own estimator will not name a ratio without a cost input; handed a zero cost it
// returns no ratio at all rather than dividing by nothing. The website widget had no cost term to
// begin with and named itself a calculator of returns regardless. So the copy below calls the
// output what it is — a gross annual figure — and says plainly that a return needs the other half,
// which is a quote and a scope, not a slider.
//
// THE RULES FOR EDITING THIS FILE:
//   1. Never add a default, a benchmark, a typical, or a "customers usually see" to `share`.
//   2. Never add a cost slider to manufacture a ratio. A cost you invent is worse than a cost you
//      omit, because it makes the omission invisible.
//   3. Every limit below stays. They are not hedges; they are the reason the number is publishable
//      at all. A model that states its assumptions is defensible. One that implies measurement is
//      not.
//   4. No currency symbol anywhere. The visitor types a rate; the output is in whatever currency
//      they typed. Printing a symbol picks a market and implies a price we have not quoted.
//   5. Nothing in here describes a control more strongly than the control behaves. The kill-switch
//      note below says "stops the agent fleet" and stops there, because that is what it does.
// ─────────────────────────────────────────────────────────────────────────────────────────────

/** One slider. Defaults for the first three come from the band; `share` deliberately has none. */
export interface RoiInput {
  id: "people" | "hours" | "cost" | "share";
  label: string;
  /** Short suffix rendered beside the live value. */
  unit: string;
  min: number;
  max: number;
  step: number;
  /** Why this number is the visitor's to state rather than ours to supply. */
  yours: string;
}

/** One line of the arithmetic. The panel substitutes the live numbers; this is the label. */
export interface RoiStep {
  id: "weekly" | "share" | "annual" | "value";
  label: string;
  /** The operation, in words, so the expression is readable without doing the multiplication. */
  note: string;
}

/** A titled paragraph — used for both limits lists. */
export interface RoiNote {
  title: string;
  body: string;
}

export const ROI_FRAME = {
  /** Never "ROI calculator". The panel does not compute a return; see the header note. */
  panelLabel: "Value worksheet",
  /** Sits in the panel header at all times, in both the blank and the computed state. */
  standingTag: "illustrative · your assumptions, our arithmetic",
  heading: "Your assumptions, multiplied out.",
  lede:
    "Four numbers. Three of them you already know about your own organisation. The fourth is a prediction, it starts at zero, and we do not fill it in for you.",
  /** Shown in place of the figure until the share is set. */
  blankState:
    "Set the last slider to your own view of how much of this work an agent could take on. We deliberately suggest nothing — no removal rate has been measured, so there is none to offer.",
  /** Shown beside the figure once it is set. */
  computedState:
    "This is multiplication on the numbers you entered. The share is your assumption and it drives the whole result; change it and watch how much of the figure it was carrying.",
  outputLabel: "Gross annual figure",
  outputUnitNote: "in the currency you typed into the cost slider",
  hoursLabel: "Hours a year the arithmetic returns",
} as const;

export const ROI_INPUTS: RoiInput[] = [
  {
    id: "people",
    label: "People doing the task",
    unit: "people",
    min: 1,
    max: 200,
    step: 1,
    yours:
      "A headcount you can check against a rota. Pick one task, not a department — the arithmetic has no way to tell a well-scoped estimate from a hopeful one.",
  },
  {
    id: "hours",
    label: "Hours each, per week, on it",
    unit: "hrs",
    min: 1,
    max: 40,
    step: 1,
    yours:
      "The honest average, including the waiting and the re-work. If this number came from asking people how long something feels, treat everything downstream of it the same way.",
  },
  {
    id: "cost",
    label: "Loaded cost per hour",
    unit: "per hr",
    min: 5,
    max: 120,
    step: 1,
    yours:
      "Your own loaded rate, in your own currency — the starting value is a placeholder, not a market figure. Note that a loaded rate is an accounting average: it converts hours into money for planning, and it does not follow that removing an hour removes an hour of payroll.",
  },
  {
    id: "share",
    label: "Share you think an agent could take on",
    unit: "%",
    min: 0,
    max: 90,
    step: 5,
    yours:
      "The only speculative input, and the one carrying the whole result. It starts at zero and stays there until you move it. We have not measured a removal rate in any customer environment, so we will not supply one — not as a default, not as a benchmark, not as a hint.",
  },
];

export const ROI_STEPS: RoiStep[] = [
  { id: "weekly", label: "Hours a week the task takes today", note: "people × hours each" },
  {
    id: "share",
    label: "Hours a week you assume an agent takes on",
    note: "× your share — the speculative step",
  },
  { id: "annual", label: "Hours a year", note: "× 52 weeks" },
  { id: "value", label: "Gross annual figure", note: "× loaded cost per hour" },
];

/**
 * The headline caveat, rendered immediately under the figure rather than in a footnote.
 * This is the one that stops the panel being a claim.
 */
export const ROI_NOT_A_RETURN: RoiNote = {
  title: "This is a gross figure, not a return.",
  body:
    "A return needs what you spend against it: licence, build, connector work, change and training, and the run cost of the agents themselves. None of that is in this box, and none of it is a slider we could set honestly — it depends on scope, on which systems you connect, and on how much of your policy has to be encoded before anything can run. Treat this as one side of the arithmetic. The other side is a quote.",
};

/**
 * What the model cannot tell you. Rendered in full, never collapsed behind a link.
 *
 * These are not legal hedging. Each one names a specific way the arithmetic parts company with
 * reality, so a reader can decide how much of the number to believe — which is a more useful thing
 * to hand a buyer than a figure they have to discount by an unknown amount.
 */
export const ROI_CANNOT: RoiNote[] = [
  {
    title: "The share is the model, and the share is your guess.",
    body:
      "Headcount, hours and cost are facts about your organisation. The fourth input is a prediction about work that has not been automated yet, and it multiplies everything else. Two reasonable people will put it forty points apart and the arithmetic will agree with both of them.",
  },
  {
    title: "Hours removed are not hours recovered.",
    body:
      "Multiplication returns hours to a total. Whether they become capacity, or cost, or simply disappear into the day is an operating decision, and the model cannot make it. The number is an upper bound on a benefit, not the benefit.",
  },
  {
    title: "It assumes the task survives contact.",
    body:
      "Most work that an agent touches gets re-shaped rather than removed. An approval that took an hour still takes a person; what changes is how long it takes them to be ready to decide. This model has one lever and it is all-or-nothing per hour, so it cannot represent the common case.",
  },
  {
    title: "It cannot see your approval gates — and the gates are the product.",
    body:
      "Consequential actions here stop at a person by design: a revenue commitment, a payout, a refund. The time a person spends at that gate is real, it is deliberate, and it is exactly the time the arithmetic above is busy removing. A model that scores the gate as waste is scoring the safest part of the system as the most expensive one.",
  },
  {
    title: "Staged enablement means less is on than the roster suggests.",
    body:
      "Agent enablement is staged per tenant. A function outside the enabled set is refused before it acts, and an incident kill-switch stops that app's agent fleet outright. Whatever share you set, the wave you actually start on is smaller than the catalogue — that is the control working, and the arithmetic has no term for it.",
  },
  {
    title: "Nothing behind this has been measured with a customer.",
    body:
      "No pilot result, no benchmark, no reference figure and no case study sits behind any number on this page. If you have seen a vendor's ROI calculator that produced a suspiciously specific multiple, this is the part it was quiet about.",
  },
];

/**
 * What a real number would take. Grounded in machinery that exists — the metering side — and
 * honest that the value side is the hard half and is not built into anything a website can run.
 */
export const ROI_WOULD_MAKE_IT_REAL: RoiNote[] = [
  {
    title: "A baseline taken before anything runs.",
    body:
      "The volume and the handling time of one named task, counted the same way twice — once before, once after. Without the first count there is nothing to attribute a change to, and the first count is the step that gets skipped.",
  },
  {
    title: "A scope small enough to attribute.",
    body:
      "If four things change at once, no arithmetic can say which one moved the number. One task, one team, one quarter is a measurable claim. A transformation programme is not.",
  },
  {
    title: "The cost side, metered rather than estimated.",
    body:
      "On the governed runtime, agent run cost is computed from a rate card against recorded runs rather than taken from a model's self-report, and a run's trace and its audit entry are the same record. So the spend half of a return can be an actual figure rather than an assumption, per tenant and per app — which is the half most calculators leave out and this platform happens to hold. Two limits, stated because anyone building a commercial model on it will hit them: the rate card labels itself illustrative and is not a price, and work that does not run through that runtime never reaches the meter.",
  },
  {
    title: "The value side, recorded as outcomes against real runs.",
    body:
      "This is the hard half and we will not pretend otherwise. It has to be captured in your environment, against your baseline, on work you agreed in advance would count. Nobody has captured it yet. That is what a first engagement measures — it is not something a website can hand you.",
  },
];

/** The standing sentence. Rendered on the panel in both states. */
export const ROI_DISCLOSURE =
  "Illustrative planning arithmetic on inputs you supply. Not a forecast, not a quote, and not financial advice.";


