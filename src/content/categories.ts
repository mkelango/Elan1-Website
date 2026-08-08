// content/categories.ts
// The five product categories of the 1 Suite — the SINGLE SOURCE of the category→app mapping.
//
// Why five categories and not ten tiles: ten equal tiles is an app-marketplace shape. A suite that
// governs the write path is an enterprise product, and enterprises buy by outcome area.
//
// The split is by WHAT THE APPROVAL GATE PROTECTS, not by org chart:
//   Revenue + Service — records about an outside party   → consent, PII, refunds
//   Trade              — records about goods in motion    → approved-vendor, stock truth, margin floor
//   Works              — records about money and people   → segregation of duties, statutory, safety
//   Compass            — claims *about* the other three   → grounding. It publishes; it never pays.
//
// Nav, footer, the products index, product breadcrumbs and the sitemap all DERIVE from this file.
// Do not re-list apps in a component: that is exactly how goal1 fell out of the nav and the footer.

import { Category, ACCENT } from "./types";
import { products } from "./products";

export const categories: Category[] = [
  {
    slug: "revenue",
    name: "Revenue",
    positioning: "Win the customer — pipeline, demand, campaigns.",
    apps: ["sales1", "market1"],
    accent: ACCENT.clay,
    hero: {
      headline: "Demand and pipeline, on one record.",
      subhead:
        "Revenue is where the customer relationship starts: market1 creates the demand, sales1 converts it. Two apps, one record of the outside party — so a campaign, a lead and a closed deal are the same story, not three systems telling it differently.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Consent, PII and the outbound moment",
      body:
        "Everything in Revenue is a record about someone outside your company, so the gate protects them, not you. Agents research, draft and score; a person approves the moment anything leaves the building. Outreach is drafted, never auto-sent. A publish in market1 is review-on-publish, with banned claims blocked before a human ever sees the draft. Personal data is handled by shape — the write path refuses what it should never hold, rather than trusting a reviewer to catch it.",
    },
    composition:
      "market1 turns one asset into on-brand pieces across channels and hands the resulting demand to sales1, which researches the account, drafts the outreach and keeps the record clean. The loop closes back the other way: what actually converts in sales1 is the signal market1 plans against. Both write into the same customer record, so nobody reconciles a lead list against a CRM export again.",
    compassNote:
      "insight1 answers “which channel actually produced revenue” from the live pipeline rather than a spreadsheet, and goal1 keeps the growth target live between check-ins as a mission with a daily pulse — a signal against it carries a suggested move for a human to triage and apply.",
    seo: {
      title: "Revenue — agentic demand and pipeline | elan1",
      description:
        "Revenue groups market1 and sales1 on one customer record: campaigns create demand, agents research and draft, and a human approves every outbound moment.",
    },
  },

  {
    slug: "service",
    name: "Service",
    positioning: "Keep the customer — cases, SLAs, knowledge.",
    apps: ["service1"],
    accent: ACCENT.gold,
    hero: {
      headline: "One app, its own category — because keeping a customer is its own discipline.",
      subhead:
        "service1 is agentic customer service: it reads the case, triages it, scores it and drafts the reply against your own knowledge — and a person sends it. It stands alone because the record it writes, and the gate over it, belong to neither winning the customer nor running the company.",
    },
    gate: {
      kind: "Refunds, account changes and the close",
      body:
        "A resolution agent that can act is only safe if the consequential end of the action is held. In service1 the refund, the account change and the case close are refused at the data layer without a human approval — a refund with no amount is refused outright, because service1 never posts an unspecified figure. A drafted reply is stored for a person to send rather than dispatched. And self-service answers only above a confidence floor: below it the customer gets a human, not a guess. The agent does the diagnosis and the legwork; a person owns anything the customer would feel.",
    },
    composition:
      "service1 is one app, and that is the honest shape of it: elan1 has customer service, not a contact centre suite. It takes the handoff from revenue when a won deal becomes a customer, and it is the app the industry packs reach for whenever a person outside your company needs something put right — a grievance, an inquiry, a claim, a dispute.",
    verticalReach: "service1",
    compassNote:
      "insight1 reads the case system of record to show what is actually driving contact volume, so the fix can move upstream into the product or the campaign instead of being absorbed by headcount.",
    seo: {
      // The category is "service" and the app is "service1", so these titles can no longer collide.
      // Kept distinct anyway, because they answer different questions: the
      // only slug that is both a category and an app, so identical titles on two indexable URLs
      // would be straight keyword cannibalisation.
      title: "Service — the keep-the-customer category of the 1 Suite | elan1",
      description:
        "Why customer service holds its own category in the 1 Suite: the record is about an outside party, and refunds, account changes and case closes stay human-approved.",
    },
  },

  {
    slug: "trade",
    name: "Trade",
    positioning: "Move the goods — source, stock, sell, fulfil.",
    apps: ["supply1", "commerce1"],
    accent: ACCENT.green,
    hero: {
      headline: "Two ledgers that agree, because neither one guesses.",
      subhead:
        "Trade is goods in motion: supply1 sources and stocks, commerce1 sells online, in store and through marketplaces. They are one category because a shortfall on one side has to become a commitment on the other — and that hand-off is exactly where a suite usually grows a second, disagreeing stock number.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Approved vendor, stock truth and the margin floor",
      body:
        "Goods in motion fail in three specific ways, so Trade gates all three on the write path. A purchase order can only name a supplier on the approved-vendor list, and submitting one is refused without a human approval and an idempotency key — so a replay orders nothing. A sale cannot be built from a product this tenant does not have, and a line discounted past the store's best active offer is refused unless someone records an override. Capturing or refunding money is a consequential write, a refund beyond what was captured is blocked outright rather than queued, and there is no card field on the payment record to lose.",
    },
    composition:
      "Each app owns its own number, and the seam between them is a proposal rather than a sync. commerce1 keeps the availability ledger its order book actually sells against — available is on-hand minus reserved, per product per selling location — and supply1 keeps the warehouse stock ledger with its valued movements. When a commerce1 row falls below its reorder point, commerce1 drafts a purchase order to a vendor already on supply1's approved list; the draft is the agent's work, and the commitment stays supply1's human-approved step. That is the honest version of “one order book”: not one table both apps write, but a hand-off that terminates at the other app's own gate.",
    compassNote:
      "insight1 reads both systems of record at once, so stock cover and sell-through are the same number for the merchandiser and the planner. When a goal1 mission is blocked on throughput, the lever it names is supply1 replenishment — proposed with its approval gate, never committed by goal1 itself.",
    seo: {
      title: "Trade — agentic supply chain and commerce | elan1",
      description:
        "Trade groups supply1 and commerce1 on one order book: approved-vendor purchasing, stock truth that prevents oversells, and human review on every money move.",
    },
  },

  {
    slug: "works",
    name: "Works",
    positioning: "Run the company — money, people, delivery.",
    apps: ["finance1", "people1", "project1"],
    accent: ACCENT.cyan,
    hero: {
      headline: "The back office, with the consequential end held.",
      subhead:
        "Works runs the company itself: finance1 closes the books, people1 moves the workforce, project1 delivers the work and bills for it. These are the records where a mistake is a statutory problem, not a customer-experience one — so the gate is tighter here than anywhere else in the suite.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Segregation of duties, statutory obligation and fairness",
      body:
        "Works holds money and people, so the agent does not close the loop alone. In finance1 a money action without an idempotency key is blocked outright, releasing a payment is refused without a human approval, an unbalanced journal is refused with its own totals, and the drafter cannot approve their own entry. people1 is fair by construction rather than by setting: the fourteen protected attributes are not fields on the candidate or employee model, and a test fails if one appears — a payslip with no salary structure behind it cannot be approved, and a raise is refused without a written justification on record. In project1 time cannot be logged against a project that does not exist, and billing a client is refused without an explicit approval. The person who drafts is not the person who approves.",
    },
    composition:
      "project1 hands approved billable time to finance1 for invoicing, so the invoice traces back to a timesheet a human signed off rather than a spreadsheet. people1 supplies the workforce that project1 schedules against capacity. finance1 is the app the rest of the suite ends at: procurement from trade, billing from project1, and payroll from people1 all land in the same ledger, each behind its own approval.",
    compassNote:
      "insight1 serves finance and HR analytics directly — the same governed metric definition the CFO reads is the one the agent answers from. When a goal1 mission is short on revenue, the lever it names is finance1 collections, proposed with its approval gate attached; goal1 commits nothing itself.",
    seo: {
      title: "Works — agentic finance, HR and delivery | elan1",
      description:
        "Works groups finance1, people1 and project1: the records where a mistake is statutory. Payments, people decisions and client billing are always human-approved.",
    },
  },

  {
    slug: "compass",
    name: "Compass",
    positioning: "Know where you are, and where you're pointed.",
    apps: ["insight1", "goal1"],
    accent: ACCENT.blue,
    hero: {
      headline: "It reads the other four. It never pays.",
      subhead:
        "Compass is the only category that makes claims *about* the rest of the suite: insight1 tells you where you are, goal1 tells you where you're pointed. It is also the category that refuses to stay in its own box — insight1 and goal1 sit inside Revenue, Service, Trade and Works too.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Grounding, and autonomy that is granted rather than seized",
      body:
        "The other four categories move money, goods and people. Compass moves belief, so its gate is a different kind: a figure that cannot be computed comes back as no value and a stated reason rather than as a plausible number, and an alert on a metric that will not compute records itself ungrounded and notifies nobody. Forecasts are labelled projections, and refuse under three periods of history. The consequential action here is not a payment — it is publishing a number to an audience that will act on it, and changing the plan, both of which are human-approved. Where goal1 is allowed to act on its own, the permission is granted by a person and bounded: an agent cannot widen its own envelope, the envelope carries a per-cycle budget that spends down, and a critical signal always escalates to a human. compass publishes; it never pays.",
    },
    composition:
      "insight1 is a semantic layer over eight of the suite's systems of record — sales1, service1, finance1, supply1, people1, market1, project1 and commerce1 — holding one governed definition per metric, so the dashboard, the board pack and the agent's answer all tie to the same source. goal1 sits above that as a live cadence — Mission, Sprint, Pulse — where a signal carries severity, the affected mission, a quantified impact and a suggested move into a triage queue. It proposes rather than commits: when a mission needs a lever goal1 doesn't own, it names the target app and the approval gate — collections in finance1, replenishment in supply1 — and writes nothing into a sibling itself.",
    seo: {
      title: "Compass — agentic analytics and goal intelligence | elan1",
      description:
        "Compass groups insight1 and goal1: grounded answers over every app's system of record, and a live goal cadence that raises signals for a human to act on. It publishes; it never pays.",
    },
  },
];

// ——— Derivations. Everything downstream uses these; nothing re-lists apps. ———

/** Category slug → Category. */
export const categoryBySlug: Record<string, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
);

/** App slug → the category it belongs to (undefined for enterprise1, which is not in a category). */
export const categoryOfApp: Record<string, Category | undefined> = Object.fromEntries(
  categories.flatMap((c) => c.apps.map((a) => [a, c])),
);

/** The Product records for a category, in the category's declared order. */
export function appsOf(category: Category) {
  return category.apps
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is (typeof products)[number] => Boolean(p));
}

/** Every app slug that sits in a category (i.e. the ten functional apps). */
export const categorizedAppSlugs: string[] = categories.flatMap((c) => c.apps);

/**
 * Apps that exist in products.ts but are in no category, excluding the backbone.
 * Should always be empty — a non-empty result means a new app was added to products.ts
 * and never placed. Surfaced in dev so the roster can't silently drift again.
 */
export const uncategorizedAppSlugs: string[] = products
  .filter((p) => p.slug !== "enterprise1" && !categorizedAppSlugs.includes(p.slug))
  .map((p) => p.slug);

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

/**
 * Spell a small derived count for prose, so headline copy reads "five categories, ten agentic apps"
 * instead of mixing a word and a numeral. Falls back to digits past twelve.
 */
export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

/** Capitalize the first letter — for a derived word that opens a sentence. */
export function sentenceCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * What a category adds up to, summed from its member apps in products.ts.
 *
 * DERIVED, NEVER TYPED. A category page that hand-wrote "30 agents" would be wrong the first time
 * an app's roster changed, and wrong silently — there is no build step that checks prose. Summing
 * from the same entries the product pages render means the two surfaces cannot disagree.
 *
 * `launchWave` is published beside `agents` for the same reason it is on the product pages: staged
 * enablement is the control, and quoting only the roster size would imply the whole workforce runs
 * on day one. An app missing the optional field contributes zero rather than breaking the sum.
 */
export interface CategoryStats {
  apps: number;
  agents: number;
  launchWave: number;
  objectTypes: number;
  skills: number;
}

export function categoryStats(slug: string): CategoryStats {
  const cat = categories.find((c) => c.slug === slug);
  const members = (cat?.apps ?? [])
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  return {
    apps: members.length,
    agents: members.reduce((n, p) => n + (p.workforce?.registered ?? 0), 0),
    launchWave: members.reduce((n, p) => n + (p.workforce?.launchWave ?? 0), 0),
    objectTypes: members.reduce((n, p) => n + (p.systemOfRecord?.objectTypes ?? 0), 0),
    skills: members.reduce((n, p) => n + (p.skills?.count ?? 0), 0),
  };
}

/** Every refusal quoted by the apps in a category — the category's guardrail, in its own words. */
export function categoryRefusals(slug: string): { app: string; refusal: string }[] {
  const cat = categories.find((c) => c.slug === slug);
  return (cat?.apps ?? []).flatMap((s) => {
    const p = products.find((x) => x.slug === s);
    return (p?.refusals ?? []).map((refusal) => ({ app: s, refusal }));
  });
}

const DEV = Boolean(
  (import.meta as unknown as { env?: Record<string, unknown> }).env?.DEV,
);

if (DEV && uncategorizedAppSlugs.length > 0) {
  console.warn(
    `[categories] ${uncategorizedAppSlugs.length} app(s) in products.ts belong to no category: ` +
      `${uncategorizedAppSlugs.join(", ")}. Add them to content/categories.ts.`,
  );
}

export default categories;
