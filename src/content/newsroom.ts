// content/newsroom.ts — the press kit.
//
// 🚨 WHAT THIS PAGE MAY NOT CONTAIN, EVER:
//   · press releases that were never issued
//   · media coverage, logos of publications, or "as seen in"
//   · awards, rankings, analyst mentions or funding announcements
//   · customer names, quotes or case studies — there are none yet, and a newsroom is the single
//     most damaging place to imply otherwise, because journalists check.
//
// What a newsroom is actually FOR is the boring, useful stuff a writer needs at 5pm on deadline:
// a boilerplate they can paste, the correct spelling of the brand, colours and type that will not
// get redrawn wrongly, facts they can attribute, and a person to email. All of that is real.
//
// ——— WHAT CHANGED, AND WHY (the verification pass, 2026-08-08) ———
//
// Fifty pages of this site were rewritten to describe mechanisms rather than benefits. This page was
// re-checked against the result rather than left alone, and four things came out of it.
//
//   1. THE DENOMINATOR PROBLEM — the reason COUNT_GUIDE exists.
//      As counted on 2026-08-08 the product pages publish 132 agents across the ten suite apps, and
//      platform-facts publishes 155 registered across the platform. Both are true and they are
//      DIFFERENT DENOMINATORS: the suite apps' rosters, versus every roster the runtime registers
//      (the control-plane surfaces and the industry packs carry advisors of their own). Same for
//      enablement — 47 of the suite's agents are in the launch wave, out of 69 wave entries
//      platform-wide. Those four figures are quoted here to explain the shape; the page itself
//      renders them, so this comment going stale cannot make the page wrong.
//      A newsroom is the one surface where publishing one of those without the other produces a
//      printed correction, so both are published, each labelled with what it counts. Neither is
//      typed here: the suite figures are SUMMED FROM content/products.ts through categoryStats — the
//      same per-app numbers the product pages render — and the platform figures come from
//      platform-facts.ts. A count on this page must render from the surface it describes.
//
//   2. THE BOILERPLATE gained the mechanism the rewrite made central (staged, per-tenant enablement)
//      and lost "for customers worldwide", which sat one section above "we have no customers to
//      name". Its two counts are now interpolated from platform-facts rather than spelled by hand.
//
//   3. NAMING_TABLE and CORRECTIONS are new. They are the deadline-shaped gap the old page still
//      had: a writer who has the boilerplate and the hex codes can still call enterprise1 an app,
//      call the Trust Mark a security certification, or write that the kill-switch stops everything.
//      Each correction states the accurate version in the platform's own terms.
//
//   4. MEDIA_CONTACT publishes an actual address. The old page linked to a contact form, which is
//      not a media contact — it is a lead form with a deadline behind it.
//
// Every platform figure here comes from content/platform-facts.ts or is summed from the typed
// content the rest of the site renders. Nothing on this page is hand-typed.

import { PLATFORM_FACTS } from "./platform-facts";
import { categories, categoryStats, categorizedAppSlugs, numberWord } from "./categories";
import { solutions } from "./solutions";
import { BRAND } from "./site";

export interface BrandColour {
  name: string;
  hex: string;
  use: string;
}

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * DERIVED TOTALS — never typed.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * The ten suite apps, summed from the five categories — which sum from products.ts, which is what
 * the product pages themselves render. Going through `categoryStats` rather than filtering
 * `products` directly is deliberate: it makes the denominator "apps that sit in a category", so a
 * backbone entry like enterprise1 can never drift into a figure captioned "the ten suite apps".
 */
const SUITE = categories.reduce(
  (acc, c) => {
    const s = categoryStats(c.slug);
    return {
      apps: acc.apps + s.apps,
      agents: acc.agents + s.agents,
      launchWave: acc.launchWave + s.launchWave,
    };
  },
  { apps: 0, agents: 0, launchWave: 0 },
);

/** Agents registered outside the ten suite apps — the control plane and the industry packs. */
const OUTSIDE_SUITE = Math.max(0, PLATFORM_FACTS.agentsRegistered.value - SUITE.agents);
/** Wave entries enabled outside the ten suite apps. */
const OUTSIDE_SUITE_ENABLED = Math.max(0, PLATFORM_FACTS.agentsEnabled.value - SUITE.launchWave);

const DEV = Boolean((import.meta as unknown as { env?: Record<string, unknown> }).env?.DEV);

// The two sources are counted independently (products.ts per app; platform-facts.ts from the
// registry). If the suite ever sums HIGHER than the platform total, one of them is stale and the
// subtraction above would quietly floor at zero rather than showing the contradiction. Say so.
if (DEV && SUITE.agents > PLATFORM_FACTS.agentsRegistered.value) {
  console.warn(
    `[newsroom] the suite sums to ${SUITE.agents} agents but platform-facts says ` +
      `${PLATFORM_FACTS.agentsRegistered.value} are registered platform-wide. One is stale — ` +
      `re-count both before this page publishes either.`,
  );
}

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE PARAGRAPH A JOURNALIST PASTES
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/** Keep it plain, factual and short. The two counts interpolate; nothing here is typed. */
export const BOILERPLATE =
  "elan1 is an agentic transformation company. It builds a governed platform of agentic business " +
  "applications — a suite of apps for sales, service, finance, supply chain, people, marketing, " +
  "analytics, projects, commerce and goals — that run on one control plane, with a human approval " +
  "gate on consequential actions and an append-only, hash-chained audit of what happened. Agent " +
  "functions are switched on per tenant one at a time, and a function outside the enabled set is " +
  "refused before it acts. " +
  `${sentenceWord(PLATFORM_FACTS.verticalPacks.value)} industry configurations adapt the same suite ` +
  "to a sector's records, regulator and vocabulary — configuration over one core, not forked " +
  "application code. elan1 is built in India, for organisations worldwide.";

/** The one-line version, for a caption or a listing. */
export const SHORT_DESCRIPTOR =
  "elan1 builds governed agentic business applications: agents that do the work, with a person approving what matters.";

/** What it runs on — the question a technology desk asks before the second paragraph. */
export const TECHNOLOGY_LINE =
  "The agents are built on Anthropic's Claude models. One published through the build studio reaches the runtime the same way whether our engineers authored it or your admins did: a passing eval, a human's approval, a Trust Mark bound to a content hash of the agent's definition, then deploy.";

/** Spell a small count for prose, capitalised for the start of a sentence. */
function sentenceWord(n: number): string {
  const w = numberWord(n);
  return w.charAt(0).toUpperCase() + w.slice(1);
}

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE NAME
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/** How the name is written. Getting this wrong is the most common press error for a brand like this. */
export const NAME_RULES: string[] = [
  “elan1: one word, all lowercase, no space before the 1.”,
  “Lowercase even at the start of a sentence.”,
  'The suite is “the 1 Suite” - numeral, space, capital S.',
  “The trailing 1 marks something you run. Groupings are plain English.”,
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT TO CALL THINGS
 *
 * The taxonomy, because the deadline error this page could not previously prevent is a category
 * error rather than a spelling one. Each row is derived where a roster is involved, so a new app or
 * a new pack cannot leave a stale list behind on the one page that is quoted verbatim.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface NamingRow {
  term: string;
  /** What it is, in one sentence. */
  is: string;
  /** The thing a story most often turns it into. */
  isNot: string;
}

const APP_ROSTER = categorizedAppSlugs.join(" · ");
const CATEGORY_ROSTER = categories.map((c) => c.name).join(", ");
const PACK_ROSTER = solutions.map((s) => s.name).join(" · ");

export const NAMING_TABLE: NamingRow[] = [
  {
    term: “elan1”,
    is: “The company and platform.”,
    isNot: “Not a single product. You install the control plane, apps run on it.”,
  },
  {
    term: “the 1 Suite”,
    is: `${numberWord(SUITE.apps)} agentic apps — ${APP_ROSTER}.`,
    isNot: “Not independent tools. Apps compose through each other's gates.”,
  },
  {
    term: “enterprise1”,
    is: “The control plane: identity, policy, audit, rollout waves.”,
    isNot: “Not a suite app. Don't count it in app totals.”,
  },
  {
    term: “assistant1”,
    is: “The central assistant. Proposes; the app decides.”,
    isNot: “Not a chatbot bolted on. Routes to the owning app's gate.”,
  },
  {
    term: “the industry packs”,
    is: `${sentenceWord(solutions.length)} configurations for sector-specific records and regulators.`,
    isNot: “Not forked apps. Not separate products.”,
  },
  {
    term: “the platform pillars”,
    is: “strategy1 plans, agent1 builds, assure1 certifies, run1 operates, Academy teaches.”,
    isNot: “strategy1 and assure1 are not standalone software packages.”,
  },
  {
    term: “Academy”,
    is: “Curriculum and certification paths tied to roles.”,
    isNot: “Not a school with alumni. No hiring pool.”,
  },
  {
    term: “the Trust Mark”,
    is: “Cert of one agent: eval passed, case scored, bound to agent definition hash.”,
    isNot: "Not third-party or security cert. Default check is structural.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * BRAND ASSETS
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

// Verified against tailwind.config.js on 2026-08-08 — these five are the tokens the site renders
// from, not a palette written beside them.
export const BRAND_COLOURS: BrandColour[] = [
  { name: "Clay", hex: "#df8c64", use: "The primary accent, and the dot on the wordmark's 1." },
  { name: "Clay deep", hex: "#b9603f", use: "Links, and the accent on a light ground." },
  { name: "Obsidian", hex: "#0a1320", use: "The dark ground for feature sections and diagrams." },
  { name: "Paper", hex: "#fbfaf7", use: "The warm white canvas the site is built on." },
  { name: "Ink", hex: "#0b1220", use: "Body text on paper." },
];

export const TYPOGRAPHY: { role: string; face: string; note: string }[] = [
  { role: "Display", face: "Bricolage Grotesque", note: "Headlines and the wordmark." },
  { role: "Body", face: "Outfit", note: "Running text." },
  { role: "Mono", face: "JetBrains Mono", note: "Product names, labels and anything technical." },
];

export const WORDMARK_RULES: string[] = [
  “Clear space: at least the height of the “1”.”,
  “Use on paper or obsidian only.”,
  “Do not recolour, stretch, or rebuild.”,
  “The clay dot is part of the mark.”,
  “No separate icon — wordmark is the mark.”,
];

/** What we can actually send you, and what does not exist. */
export const ASSET_NOTES: string[] = [
  "Wordmark is typographic. Ask for vector files for print.",
  "Diagrams are ours. Ask for clean versions before reprinting.",
  "No stock images. Ask for interview portraits.",
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * FACTS YOU CAN ATTRIBUTE
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface AttributableFact {
  /** Typed against PLATFORM_FACTS, so a mistyped key is a build error rather than a blank tile. */
  key: keyof typeof PLATFORM_FACTS;
  gloss: string;
  /** The qualifier that has to travel with the number. Omitted where the number stands alone. */
  caveat?: string;
}

export const ATTRIBUTABLE_FACTS: AttributableFact[] = [
  { key: "suiteApps", gloss: "agentic business applications in the suite" },
  { key: "verticalPacks", gloss: "industry configurations of that suite" },
  {
    key: "agentsRegistered",
    gloss: "agents registered across the platform",
    caveat: "Registered, not running — and platform-wide, not the suite. See the note below before you print this one.",
  },
  { key: "systemsOfRecord", gloss: "systems of record the platform owns" },
  { key: "crossAppSagas", gloss: "workflows that cross from one application to another" },
  {
    key: "connectors",
    gloss: "connectors registered and callable",
    caveat: "Most ship as modelled adapters and become live only once credentials and an audited grant are configured.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHICH NUMBER TO PRINT
 *
 * The one thing this page can do that no other page can: put the two denominators beside each other
 * so the wrong one does not get quoted. Every figure below is rendered, never typed.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface CountRow {
  figure: string;
  counts: string;
  caution: string;
}

export const COUNT_GUIDE: CountRow[] = [
  {
    figure: String(PLATFORM_FACTS.agentsRegistered.value),
    counts: "agents registered across the whole platform",
    caution:
      "Includes the control plane's own advisors and the industry packs'. It is not the number in the business applications.",
  },
  {
    figure: String(SUITE.agents),
    counts: `of those, registered inside the ${numberWord(SUITE.apps)} suite apps`,
    caution:
      "This is what the product pages add up to, app by app. If your piece is about the business applications, this is the figure.",
  },
  {
    figure: String(PLATFORM_FACTS.agentsEnabled.value),
    counts: "agent functions enabled in the baseline wave",
    caution:
      "Registered is not running. Enablement is staged per tenant, and a function outside the enabled set is refused before it acts.",
  },
  {
    figure: String(SUITE.launchWave),
    counts: `of those, inside the ${numberWord(SUITE.apps)} suite apps`,
    caution:
      "The remainder are deliberately off. Staged enablement is the control, not a gap in the product.",
  },
];

/** The prose that stops the two columns above reading as a contradiction. */
export const COUNT_GUIDE_NOTE =
  `The gap is real rather than an error: ${OUTSIDE_SUITE} of the registered agents sit outside the suite — on the ` +
  `control plane, where the surfaces that govern something carry advisors of their own, and inside the industry ` +
  `packs, where a pack's advisory agent is part of the configuration. ${OUTSIDE_SUITE_ENABLED} of the enabled wave ` +
  `entries sit there too. Quote a figure with the denominator attached and both numbers stay true; quote one bare ` +
  `and one of them becomes a correction.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT WE MOST OFTEN HAVE TO CORRECT
 *
 * Written as heard/accurate rather than as a list of don'ts, because the useful thing on deadline is
 * the sentence you can actually run — not an instruction to go and find one.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface Correction {
  heard: string;
  accurate: string;
}

export const CORRECTIONS: Correction[] = [
  {
    heard: “”elan1 is SOC 2 and ISO 27001 certified.””,
    accurate:
      “Not certified today. Controls exist; certification mapping is underway.”,
  },
  {
    heard: “”One button stops everything.””,
    accurate:
      “Stops agent fleet. Direct writes through other paths are not stopped.”,
  },
  {
    heard: “”elan1 integrates with Salesforce, SAP and your ERP.””,
    accurate:
      “Connectors are modelled adapters until credentials are configured.”,
  },
  {
    heard: “”The agents run the business autonomously.””,
    accurate:
      “They propose; consequential actions route to named humans for approval.”,
  },
  {
    heard: “”Agents are certified, so they behave safely.””,
    accurate:
      “Default cert is structural. Behaviour batteries cover named agents only.”,
  },
  {
    heard: “”run1 guarantees uptime.””,
    accurate:
      “No SLA machinery. Availability is a contract term, not a platform promise.”,
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE HONEST LIMITS
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * Stated plainly, because a journalist will ask and the honest answer is better than a dodge.
 */
export const WHAT_WE_CANNOT_PROVIDE: string[] = [
  "Customer names, logos or case studies. None yet.",
  "Outcome statistics. Nothing measured in production.",
  "Performance figures. None would be reproducible.",
  "Funding, valuation or headcount.",
  "Analyst recognition or awards.",
  "Certification dates.",
];

/** Where the company actually is, so a piece is not written around an assumption. */
export const WHERE_THINGS_STAND: string[] = [
  “Site claims describe the software, not customer results.”,
  “Limits published: no cert, no pen test, single-region, explicit unwired features.”,
  “Gaps measured and frozen as ceilings. Aspirational features named.”,
  “Unwired capabilities are scope to agree before deployment.”,
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * HOW TO CHECK US
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface VerifyRoute {
  label: string;
  href: string;
  find: string;
}

export const VERIFY_ROUTES: VerifyRoute[] = [
  {
    label: "Engineering & readiness",
    href: "/platform/engineering",
    find: "Every control labelled with the state it is actually in — enforced, declared, or built-but-not-wired — and the named limits list.",
  },
  {
    label: "Trust, safety & governance",
    href: "/trust",
    find: "The certification posture in plain words, and the controls that exist behind it.",
  },
  {
    label: "The product pages",
    href: "/products",
    find: "Per app: agents registered, how many the launch wave enables, the object types in its system of record, and the refusals it quotes verbatim.",
  },
  {
    label: "Verticals are configuration",
    href: "/platform/verticals-are-config",
    find: "What an industry pack changes, and what it deliberately does not fork.",
  },
  {
    label: "Connectors",
    href: "/platform/connectors",
    find: "Which seams are registered and callable, which are credential-gated catalogue entries, and which are MCP.",
  },
  {
    label: "The glossary",
    href: "/resources/glossary",
    find: "The vocabulary, including the three pillar limits a story most often gets wrong.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE CONTACT
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const MEDIA_CONTACT = {
  email: BRAND.email,
  /** Said out loud, because a masthead expecting a press office should not have to guess. */
  note: "There is no separate press desk. This address reaches the team and a media request is routed by hand, so put the deadline in the subject line.",
  /** What to put in the mail, so the reply is useful the first time. */
  include: [
    "What you are writing and who it is for.",
    "Your deadline, in your timezone.",
    "The specific claim you want checked — we would rather correct a sentence before it runs than after.",
    "Whether you need the vector wordmark or a diagram at print resolution.",
  ],
  /** Topics we can put someone on the record for. Roles, not a roster. */
  onRecord: [
    {
      topic: "The company, the category and where it is going",
      who: `${BRAND.founder}, founder and chief executive`,
    },
    {
      topic: "How the governance works in practice — approvals, the audit chain, what the platform refuses and why",
      who: "an engineering or governance lead, with the mechanism on screen rather than described",
    },
    {
      topic: "What has not been built, and the limits as published",
      who: "the same people. It is a better interview than the one where you have to infer it.",
    },
  ],
  /** The thing we will not do, said before you ask. */
  cannot:
    "We cannot offer a customer reference, because there is not one to offer. If your piece needs one, that is a reason to come back to us later rather than to write around it.",
};

export const NEWSROOM_SEO = {
  title: "Newsroom — press kit and brand assets | elan1",
  description:
    "Boilerplate, how to write the elan1 name, what to call each part of the platform, brand colours and typography, attributable platform facts with their denominators, the corrections we most often have to make, and a media contact. No customer names or outcome statistics — we do not have them yet.",
};

