// content/about.ts — the Company · About surface.
//
// 🚨 WHY THIS FILE EXISTS, AND WHY IT IS THE MOST CONSTRAINED FILE ON THE SITE.
//
// An About page is where a company invents its own history. It is the one surface where nobody
// expects a citation, which is exactly why it is the surface most likely to carry a fabrication —
// and a fabrication here poisons the fifty pages that were written honestly, because a reader who
// catches one invented sentence stops believing the sourced ones.
//
// SO: THE WHOLE OF THE SOURCED RECORD ABOUT THIS COMPANY IS A NAME AND TWO EMAIL ADDRESSES.
// `BRAND.founder` is "Elango"; `BRAND.email` and `BRAND.sales` are the addresses. That is it.
// This page therefore may NOT state or imply, in copy, in a stat strip, in an image or in alt text:
//   · a founding date, a company age, or "since ..."
//   · a headcount, a team size, "our engineers", or a photograph presented as the team
//   · funding, investors, valuation
//   · offices, locations, regions served, or "from X, for the world"
//   · years of experience, a track record, or a founder biography
//   · a customer count, a customer name, a logo, a testimonial or a case study
//   · an award, a ranking or an analyst mention
//   · a certification not held
// The previous version of this page carried a founding claim in its headline, five regions in its
// mission, a stock photograph captioned as "the elan1 team", and a value that read "we ship in
// weeks" — a timeline promise. All four are gone, and none of them may come back as a softer
// sentence. `NOT_PUBLISHED` below renders the refusal on the page rather than keeping it in a
// comment, so a future editor has to delete a visible commitment to break it.
//
// WHAT AN ABOUT PAGE CAN HONESTLY BE, AND WHAT MAKES THIS ONE WORTH READING: THE ARGUMENT.
// This company has one unusually specific belief — that the interesting problem in agentic software
// is not whether an agent can act but what happens at the moment it writes, and that governance
// therefore belongs ON the write path rather than in a review layer beside it. That belief is
// visible in the platform's code and in every product, solution and platform page on this site. So
// the page is built on the belief, the mechanisms the belief forces, and the things the belief
// stops us from saying. Biography is not required to make a company legible. An argument is.
//
// SOURCES. Nothing in this file is authored from memory:
//   · the descriptor and boilerplate are IMPORTED from content/newsroom.ts, not re-typed, so the
//     press kit and the About page cannot describe the company differently
//   · the naming rules are IMPORTED from the same place, for the same reason
//   · every platform count comes from content/platform-facts.ts (rule 1: a page never hand-types one)
//   · the refusal strings are DERIVED from content/categories.ts → content/products.ts, so the page
//     quotes the same guardrails the product pages quote and cannot drift from them
//   · the three-layer model is DERIVED from `LAYERS` in content/site.ts
//   · the mechanism claims restate content already sourced on /platform/governance,
//     /platform/engineering, /platform/agent1, /platform/assure1 and /platform/run1
//   · the "what we cannot provide" list EXTENDS newsroom's, rather than forking it
//
// One consequence of that sourcing worth stating plainly: this file authors almost no new facts. It
// authors an argument over facts other files already carry. If a fact below looks new, it is a bug.

import { BRAND, LAYERS } from "./site";
import { BOILERPLATE, SHORT_DESCRIPTOR, NAME_RULES, WHAT_WE_CANNOT_PROVIDE } from "./newsroom";
import { categories, categoryRefusals, numberWord, sentenceCase } from "./categories";
import { factLine, factValue, PLATFORM_FACTS_COUNTED_ON } from "./platform-facts";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE HEAD OF THE PAGE.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const ABOUT_SEO = {
  title: "About elan1 — the gate belongs on the write path | elan1",
  description:
    "elan1 builds governed agentic business applications. The hard part is not whether an agent can act — it is the instant a proposal becomes a record, so the gate belongs on the write path rather than in a review layer beside it. The mechanisms that follow, and what is not true yet.",
};

export const ABOUT_HERO = {
  kicker: "Company · About",
  title: "The hard part is the moment it writes.",
  subtitle:
    "Getting an agent to act stopped being the difficult half. elan1 exists for the instant afterwards — where a draft becomes a payment, a payslip, a message a customer has already read. We put the gate in that path rather than beside it. Everything else on this site follows from that.",
  /** Rendered as the hero's meta line. Three states, no adjectives. */
  meta: "One belief · the mechanisms it forces · what is not true yet",
} as const;

/**
 * What the company is, in the words the press kit already uses.
 *
 * IMPORTED, NOT RE-WRITTEN. A company that describes itself one way to a journalist and another way
 * on its own About page has two descriptions, and the second one is marketing. Change newsroom.ts
 * and this changes with it.
 */
export const ABOUT_DESCRIPTOR = SHORT_DESCRIPTOR;
export const ABOUT_BOILERPLATE = BOILERPLATE;

/**
 * The stat strip. Every entry resolves through `factLine`, so the number and its label travel
 * together and neither can be typed here. The date is published beside them because a count with no
 * as-of date is a claim about today that was true on some other day.
 */
export const ABOUT_FACT_KEYS = [
  "suiteApps",
  "verticalPacks",
  "systemsOfRecord",
  "crossAppSagas",
  "connectors",
  "skills",
] as const;

export const ABOUT_FACTS: string[] = ABOUT_FACT_KEYS.map((k) => factLine(k));

export const ABOUT_FACTS_NOTE = `Counted on ${PLATFORM_FACTS_COUNTED_ON} against the platform tree. Each figure carries its derivation in this site's source, so it can be re-run rather than trusted — including the ones that got smaller when we re-ran them.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE ARGUMENT. This is the page.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface ThesisMovement {
  n: string;
  title: string;
  body: string;
}

/**
 * The four movements of the belief, in order. The order is the argument and should not be re-sorted
 * into "most impressive first": movement 04 is the one that makes 01–03 believable, and a page that
 * drops it has published a boast.
 */
export const THESIS: ThesisMovement[] = [
  {
    n: "01",
    title: "Getting an agent to act is no longer the difficult half.",
    body: "Frontier models, an agent SDK, tool protocols and reusable skills turned “can it plan, call a tool and finish the job” into ordinary engineering. A demonstration that drafts, reconciles or reorders is now a short piece of work. That shift is real, and it is not what this company is about.",
  },
  {
    n: "02",
    title: "The difficult half is the instant a proposal becomes a record.",
    body: "Up to that instant an agent is producing a draft, and a wrong draft costs nothing. One instant later the same output is a payment, a payslip, a reply the customer has already read. Everything that makes agentic software frightening to a regulated business lives inside that transition, and none of it is fixed by the model reasoning better.",
  },
  {
    n: "03",
    title: "So we put the gate on the write path rather than beside it.",
    body: "The comfortable place for governance is beside the agent: a review queue, a monitoring pane, a policy document builders are asked to honour. We put it in the path the write itself has to travel. A consequential action is evaluated before it executes, routed to a named human where the policy says so, and the approval that releases it is bound to that action and to a content hash of that exact payload, then spent. Allowed, refused or routed, the decision lands on an append-only chain. A control standing beside the write only governs the traffic that goes through it.",
  },
  {
    n: "04",
    title: "Which makes the honest claim a direction with a ratchet on it.",
    body: "We do not claim that every write in an estate passes the governed writer. A standing guard holds a ceiling over the mutating handlers that still reach a system of record outside it; that ceiling is not zero, and it may only fall. Governed-everywhere is the direction, the ratchet is the mechanism, and we would rather hand you the ratchet than claim the destination.",
  },
];

/**
 * The one-line version, for the section head. Kept as an export so the page renders the thesis
 * rather than authoring a second, slightly different one in JSX.
 */
export const THESIS_ONE_LINE =
  "The interesting question in agentic software is not whether an agent can act. It is what happens at the moment it writes.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT THE BELIEF FORCES. The mechanisms that exist because of movement 03 — each one a design
 * decision that could have gone the other way, which is what makes it worth publishing. The heading
 * over this list counts it rather than asserting a number; see WHAT_FOLLOWS_TITLE.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface Consequence {
  title: string;
  body: string;
}

export const WHAT_FOLLOWS: Consequence[] = [
  {
    title: "An approval is spent, not displayed",
    body: "The token is bound to the action and to a content hash of the exact payload, and it is consumed on use — so an approval granted for one operation cannot be spent on another, and a re-post with the same idempotency key returns the stored result rather than executing twice. Where segregation of duties applies, the requester cannot resolve their own request, and the administrator role does not bypass it: it is a control, not a permission.",
  },
  {
    title: "Consequence is derived from what an agent holds",
    body: "Whether an action needs a person is not a box an author remembers to tick. An agent holding a money or commit tool is raised to a human gate by what its blueprint carries, live, as it is authored. An advisory blueprint holding a control-system connector does not compile: the build raises rather than warns, and three industry packs run through that guard every time they import.",
  },
  {
    title: "Nothing is on because it exists",
    // ⚠️ `factValue`, not `factLine`, and the reason is grammatical rather than cosmetic: factLine
    // welds each number to its own label ("69 enabled in the current wave"), which reads correctly
    // in a stat strip and turns into nonsense inside a sentence that already supplies the nouns.
    // Composing two factLines here produced "69 enabled in the current wave of 155 agents
    // registered" — a sentence nobody wrote and nobody proof-read, because it only exists at render.
    body: `Enablement is staged per tenant, function by function, and a run outside the enabled set is refused before it acts, with the app and the tenant named in the refusal. Across the platform, ${factValue("agentsEnabled")} of the ${factValue("agentsRegistered")} registered agent functions are switched on in the current wave; the rest are deliberately off, which is the control rather than a gap. A rollout order becomes a state the control plane holds rather than a promise in a deck.`,
  },
  {
    title: "The record is append-only in the database, not in the API",
    body: "Each tenant's audit trail is hash-chained, and reading it recomputes the chain rather than displaying a stored verdict. Update and delete are blocked by a database trigger that applies to the table owner too, and a unique constraint on the predecessor stops the chain forking into a second, friendlier history. Where damage could not be repaired — the trigger applies to us as well — it is declared with a signed marker and a frozen digest rather than quietly rewritten.",
  },
  {
    title: "No eval, no mark",
    body: "A Trust Mark is minted by one function, and that function refuses four ways: an eval run it cannot find, one that scored zero cases, one that did not pass, and one belonging to another tenant. The scope belongs in the same paragraph as the claim: the default certification for an agent is a structural declaration check — it reads what an agent declares, not how it behaves — and the behaviour battery covers a named set of six agents rather than the whole roster.",
  },
  {
    title: "A mark is evidence about the model it was earned on",
    body: "Move the runtime to a different model and every agent's behaviour changes on unchanged code, so a mark reads stale rather than certified. A sweep re-runs each certified agent's battery against the model the runtime would actually use; a lower score revokes the mark and demotes that agent's autonomy, both on the record. An agent with no battery comes back not measurable — an absent test is not read as a pass.",
  },
];

/** Counted from the list it heads. See REFUSALS_TITLE for why no heading here carries a numeral. */
export const WHAT_FOLLOWS_TITLE = `${sentenceCase(
  numberWord(WHAT_FOLLOWS.length),
)} decisions that would look different if we believed something else.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE REFUSALS. The shortest possible version of the argument, and the hardest thing to fake.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface CategoryRefusal {
  /** The grouping, in Title Case plain English — Revenue, Service, Trade, Works, Compass. */
  category: string;
  /** The app whose write path carries it. */
  app: string;
  /** Quoted from the platform, via the product entry. Braces are the code's own placeholders. */
  refusal: string;
  /** What that category's gate is protecting, in the category's own words. */
  gate: string;
}

/**
 * One refusal per category, DERIVED rather than chosen.
 *
 * 🎯 A CROSS-SURFACE COUNT MUST RENDER FROM THE SURFACE IT DESCRIBES. Hand-picking five refusals
 * into this file would create a second, stale copy of the product pages' evidence — and the first
 * time an app's guardrails changed, the About page would be quoting a string the platform no longer
 * emits. Reading the first refusal of each category's first app means this section can only ever say
 * what /products already says. If a category ever ships with no refusal at all, it drops out of the
 * list rather than being back-filled with an invented one.
 */
export const REFUSALS_BY_CATEGORY: CategoryRefusal[] = categories
  .map((c) => {
    const first = categoryRefusals(c.slug)[0];
    return first
      ? { category: c.name, app: first.app, refusal: first.refusal, gate: c.gate.kind }
      : null;
  })
  .filter((r): r is CategoryRefusal => r !== null);

/**
 * 🎯 THE HEADING IS RENDERED FROM THE LIST, NOT TYPED BESIDE IT.
 *
 * The JSX first read "The argument, in five sentences the platform says itself." The list beneath it
 * is derived and can legitimately return four — a category whose first app quotes no refusal drops
 * out by design. A numeral typed into a heading over a derived list is the exact defect this site
 * has already shipped twice: the sentence and the thing it counts had no mechanical link, so nothing
 * would have failed when they diverged. Same rule for the two headings below.
 */
export const REFUSALS_TITLE = `The argument, in ${numberWord(
  REFUSALS_BY_CATEGORY.length,
)} sentences the platform says itself.`;

// "one from each of the five groupings" was the first draft of this sentence, and it carried the
// same defect the heading did — a numeral in prose over a list that computes its own length. The
// sentence now describes the rule rather than counting the output.
export const REFUSALS_NOTE =
  "A refusal proves a guard exists in a way no adjective does. These are quoted from the platform's own code, one from each grouping of the suite, and the braces are its placeholders rather than ours. They are also the shortest description of what this company believes: the most interesting sentence an agentic system can produce is the one where it declines.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE SHAPE OF THE COMPANY — derived from site.ts, so the About page and the navigation agree.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const LAYER_ORDER = ["platform", "products", "solutions"] as const;

export const LAYERS_IN_ORDER = LAYER_ORDER.map((k) => LAYERS[k]);

export const LAYERS_LEDE =
  "One control plane, the apps that run on it, and the industry configurations that tune them. The order matters more than the count: the platform is what holds the gate, and an app or an industry pack is configuration over one core rather than a fork of it. That is a claim about where the code lives, not about how well it behaves — the approval gate, the audit chain and the rollout gate an industry pack runs against are the same code the suite runs against, because there is no second copy to diverge.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE STANDARD WE HOLD THIS WEBSITE TO. This is the values section, written as rules with
 * consequences rather than as adjectives. Each one is checkable on a page you can open.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface EditorialRule {
  title: string;
  body: string;
  /** Where a reader can go and check that the rule is actually kept. */
  href: string;
  linkLabel: string;
}

export const EDITORIAL_RULES: EditorialRule[] = [
  {
    title: "A number comes from one place, with its derivation attached",
    body: "No page hand-types a platform count. Every figure resolves from a single file that carries how it was counted and the date it was counted, because the alternative has already failed here: a page once ran wrong in both directions at once — understating the apps and the agents by roughly forty percent while overstating the connectors — on the very page meant to establish credibility. And where a count had no agreed definition, because three separate derivations produced three different answers, the number was removed rather than chosen.",
    href: "/company/newsroom",
    linkLabel: "The attributable facts",
  },
  {
    title: "A capability carries the state it is actually in",
    body: "Enforced, declared but not yet consulted, or built but not yet wired. Most readiness pages have one state, present, which is how a rule that is implemented and never called ends up reading as a rule that is enforced. Ours are labelled, the uncomfortable ones included, and the limits are collected in one section rather than scattered where they are easiest to miss.",
    href: "/platform/engineering",
    linkLabel: "The readiness checklist, including the gaps",
  },
  {
    title: "A seam says whether it is live, modelled or declared",
    body: "Connectors ship as deterministic modelled adapters — real interface, real governance, not real data — until credentials and a human grant are wired. That is a scope conversation to have before a contract rather than a discovery to make during a demo, so every seam on this site carries its state.",
    href: "/platform/connectors",
    linkLabel: "How the connector fabric is stated",
  },
  {
    title: "An absence is never rendered as a pass",
    body: "A case with nothing to score reports not measurable, and a battery in which nothing was measurable did not pass — it did not run. A control with no automated evidence reports unknown and is flagged for a human rather than filled in. An evidence row that was not measured carries no verdict, which means we did not measure it, not that it is fine.",
    href: "/platform/assure1",
    linkLabel: "The certification gate",
  },
  {
    title: "The limits are published before the capabilities",
    body: "No SOC 2 and no ISO 27001 certification is held today, and we say so on the page a buyer reads first rather than in a footnote. Data residency is declared and not enforced by routing. Several capabilities are built and not yet wired, and they are named individually so one of them appearing on your requirements list becomes scope to agree rather than a feature to switch on.",
    href: "/platform/engineering",
    linkLabel: "What is not true yet",
  },
  {
    title: "There are no outcome figures, because nothing has been measured with a customer",
    body: "No adoption number, no time saved, no accuracy rate, no latency or availability figure, and no currency amount presented as a result. There are also no customer names, logos, case studies or testimonials on this site — we have none to publish, and implying otherwise is the one error that would make every honest sentence around it worthless.",
    href: "/resources/proof",
    linkLabel: "What we show instead",
  },
];

/** Counted from the list it heads. See REFUSALS_TITLE. */
export const EDITORIAL_RULES_TITLE = `${sentenceCase(
  numberWord(EDITORIAL_RULES.length),
)} rules this website is written under.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT elan1 IS NOT. Written as limits because the limits are the half a reader cannot get anywhere
 * else, and because each one closes an inference a reader would otherwise make for free.
 *
 * ⚠️ Every entry states something about US. None of them says what another product, vendor or
 * category does or lacks — that rule holds on this page as it does on every other one, and it is the
 * reason this section reads as a disclosure rather than as a comparison.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const WHAT_WE_ARE_NOT: Consequence[] = [
  {
    title: "Not a model lab",
    body: "elan1 builds on Claude and does not train foundation models. What we build is the layer between a model's proposal and your system of record — the policy evaluation, the human gate, the writer, the evidence. A better model makes that layer more useful; it does not make it unnecessary.",
  },
  {
    title: "Not a certification body",
    body: "The Trust Mark is a credential elan1 issues against its own platform, gated on an eval run that passed and scored real cases. It is not accredited by anyone. Academy's certification is a syllabus and a completeness check we authored, learner-reported, with no exam behind it — and it is a different object from the agent Trust Mark. elan1 itself holds no third-party certification.",
  },
  {
    title: "strategy1 is a delivery motion, not software",
    body: "There is no strategy1 app to log into — no agent, no screen, no endpoint. It is a fixed-scope planning engagement run by people, and what leaves it is a document set and a rollout order rather than a running system. We name that because a pillar list that reads uniformly as product would imply otherwise.",
  },
  {
    title: "assure1 ships no package of its own",
    body: "The certification kernel lives in the core rather than in a separate installable thing, which is what makes the same gate apply in every app instead of being adopted per app. The engagement half — writing your governance signature, standing up the batteries, closing a readiness gap — is work people do alongside yours.",
  },
  {
    title: "run1 carries no service-level machinery",
    body: "There is no SLA engine and no on-call rotation in the operating layer: paging routes to your own tool and the rotation is a human responsibility, stated as a known-open inside our own incident runbook. One incident drill has been recorded, a tabletop. The platform runs single-region on a single primary today, so the resilience logic is real and the multi-node deployment is not.",
  },
  {
    title: "The incident stop halts the agent fleet, and that is its scope",
    body: "One admin action suspends an app's entire fleet immediately, non-destructively, and it survives a restart. The clause that would additionally refuse that app's direct system-of-record writes is registered in production without the rollout reference it needs, so it does not fire. We would rather publish the boundary of a safety control than let a diagram imply a wider one.",
  },
  {
    title: "Not a company with customers to name",
    body: "There are none to name yet, and a page that implied otherwise would be the single most damaging sentence on this site — because it is the one a journalist, an investor or a procurement team checks first. What we can show is the mechanism, running, with the refusals it produces.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE RECORD. The whole sourced biography, and an explicit list of what we decline to publish.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const FOUNDER_NAME = BRAND.founder;

export const THE_RECORD = {
  kicker: "The record",
  title: "What we publish about ourselves.",
  body: `elan1 was founded by ${BRAND.founder}. That name and the two addresses below are the whole of what this site says about the people behind it — not because there is nothing else to say, but because everything else would be written for effect rather than from a record, and this is the page where that temptation is strongest.`,
  /** Sourced from site.ts. Rendered as mailto links. */
  contacts: [
    { label: "General", address: BRAND.email },
    { label: "Sales", address: BRAND.sales },
  ],
} as const;

/**
 * What this site declines to publish about itself.
 *
 * 🚨 EXTENDS THE PRESS KIT'S LIST RATHER THAN FORKING IT. The first four entries are newsroom.ts's
 * own, so a journalist and a reader of this page get the same refusal in the same words. The two
 * added here are the About-page-specific ones — the biography claims a press kit has no occasion to
 * make and an About page has every occasion to make.
 *
 * This renders. It is not a comment. A future editor who wants to add a founding date has to delete
 * a visible commitment not to publish one, in front of the reader, which is the point.
 */
export const NOT_PUBLISHED: string[] = [
  ...WHAT_WE_CANNOT_PROVIDE,
  "A founding date, a company age, a team size, an office list, or years of experience. An About page is exactly where those get invented, and we hold no record on this site that would make one checkable.",
  "A founder biography. The sourced record is a name and two email addresses, and a paragraph of background beyond that would be composed for the reader rather than drawn from anything.",
];

export const NOT_PUBLISHED_NOTE =
  "This list is published rather than observed quietly, for the same reason the readiness page leads with its gaps: a reader who finds an omission themselves discounts everything around it, and a reader who is handed one has a reason to believe the rest.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE NAMES. Small, and the most-asked question about this company that has a real answer.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * ⚠️ THE GROUPING NAMES ARE READ FROM categories.ts, NOT LISTED HERE.
 *
 * A hand-typed list of the groupings is precisely how goal1 once fell out of the navigation and the
 * footer while the copy beside it still said "ten agentic apps". The two non-category surfaces —
 * Academy and Insights — are named after the derived list because they are content surfaces rather
 * than groupings of apps, and the rule they illustrate is the same one.
 */
export const NAMING_LEDE = `The trailing 1 is not decoration, and it is not applied evenly. It marks something you run — an app, a pillar, the control plane. Groupings and content surfaces are written in plain English instead, so ${categories
  .map((c) => c.name)
  .join(", ")}, Academy and Insights carry no digit. If a name ends in 1, there is something to log into or something that runs.`;

/** Imported from the press kit so the brand grammar has exactly one definition. */
export const NAMING_RULES = NAME_RULES;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE CLOSE.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const ABOUT_CTA = {
  kicker: "Check the argument",
  title: "Read the limits first.",
  body: "The fastest way to judge whether any of this is true is to open the page where we list what is not working yet, and then ask us to show you one of the mechanisms above doing what it says. If something behaves differently from how a page here describes it, that is a finding we want.",
  primary: { label: "What is not true yet", href: "/platform/engineering" },
  secondary: { label: "Talk to us", href: "/contact" },
} as const;


