// content/categories.ts
// The five product categories of the 1 Suite — the SINGLE SOURCE of the category→app mapping.
//
// Why five categories and not ten tiles: ten equal tiles is an app-marketplace shape. A suite that
// governs the write path is an enterprise product, and enterprises buy by outcome area.
//
// The split is by WHAT THE APPROVAL GATE PROTECTS, not by org chart:
//   revenue1 + service1 — records about an outside party   → consent, PII, refunds
//   trade1              — records about goods in motion    → approved-vendor, stock truth, margin floor
//   works1              — records about money and people   → segregation of duties, statutory, safety
//   compass1            — claims *about* the other three   → grounding. It publishes; it never pays.
//
// Nav, footer, the products index, product breadcrumbs and the sitemap all DERIVE from this file.
// Do not re-list apps in a component: that is exactly how goal1 fell out of the nav and the footer.

import { Category, ACCENT } from "./types";
import { products } from "./products";

export const categories: Category[] = [
  {
    slug: "revenue1",
    name: "revenue1",
    positioning: "Win the customer — pipeline, demand, campaigns.",
    apps: ["sales1", "market1"],
    accent: ACCENT.clay,
    hero: {
      headline: "Demand and pipeline, on one record.",
      subhead:
        "revenue1 is where the customer relationship starts: market1 creates the demand, sales1 converts it. Two apps, one record of the outside party — so a campaign, a lead and a closed deal are the same story, not three systems telling it differently.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Consent, PII and the outbound moment",
      body:
        "Everything in revenue1 is a record about someone outside your company, so the gate protects them, not you. Agents research, draft and score; a person approves the moment anything leaves the building. Outreach is drafted, never auto-sent. A publish in market1 is review-on-publish, with banned claims blocked before a human ever sees the draft. Personal data is handled by shape — the write path refuses what it should never hold, rather than trusting a reviewer to catch it.",
    },
    composition:
      "market1 turns one asset into on-brand pieces across channels and hands the resulting demand to sales1, which researches the account, drafts the outreach and keeps the record clean. The loop closes back the other way: what actually converts in sales1 is the signal market1 plans against. Both write into the same customer record, so nobody reconciles a lead list against a CRM export again.",
    compassNote:
      "insight1 answers “which channel actually produced revenue” from the live pipeline rather than a spreadsheet, and goal1 keeps the growth target live between check-ins as a mission with a daily pulse — a signal against it carries a suggested move for a human to triage and apply.",
    seo: {
      title: "revenue1 — agentic demand and pipeline | elan1",
      description:
        "revenue1 groups market1 and sales1 on one customer record: campaigns create demand, agents research and draft, and a human approves every outbound moment.",
    },
  },

  {
    slug: "service1",
    name: "service1",
    positioning: "Keep the customer — cases, SLAs, knowledge.",
    apps: ["service1"],
    accent: ACCENT.gold,
    hero: {
      headline: "One app, its own category — because almost every vertical reaches for it.",
      subhead:
        "service1 is agentic customer service: it understands the customer, acts across your systems to resolve the issue, and escalates to a human when judgment or policy requires it. It stands alone because nine of the ten industry packs open a service1 case.",
    },
    gate: {
      kind: "Refunds, account changes and the close",
      body:
        "A resolution agent that can act is only safe if the consequential end of the action is held. In service1 the refund, the account change and the case close are human decisions, and answers are grounded in your knowledge and account data with citations — a cited answer or none, never an invented one. The agent does the diagnosis and the legwork; a person owns anything the customer would feel.",
    },
    composition:
      "service1 is one app, and that is the honest shape of it: elan1 has customer service, not a contact centre suite. It takes the handoff from revenue1 when a won deal becomes a customer, and it is the flow almost every industry pack lands in — a grievance in gov1, an outage in energy1, a dispute in bank1, a return in retail1, a breakdown in manufacture1. Nine of the ten packs open a service1 case; health1 is the one that does not.",
    compassNote:
      "insight1 reads the case system of record to show what is actually driving contact volume, so the fix can move upstream into the product or the campaign instead of being absorbed by headcount.",
    seo: {
      title: "service1 — agentic customer service that resolves | elan1",
      description:
        "service1 diagnoses and acts across your systems to resolve customer issues, with refunds and account changes always human-approved. Nine of ten industry packs open a service1 case.",
    },
  },

  {
    slug: "trade1",
    name: "trade1",
    positioning: "Move the goods — source, stock, sell, fulfil.",
    apps: ["supply1", "commerce1"],
    accent: ACCENT.green,
    hero: {
      headline: "One order book, one stock truth.",
      subhead:
        "trade1 is goods in motion: supply1 sources and stocks, commerce1 sells online and in store. They are one category because they are one order book — commerce1 reads supply1 as the source of stock truth, so a storefront cannot sell what the warehouse does not have.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Approved vendor, stock truth and the margin floor",
      body:
        "Goods in motion fail in three specific ways, so trade1 gates all three by construction. A purchase order can only go to an approved supplier, and approving or blocking a vendor is a human decision backed by a recorded risk review. A sale cannot be built from a phantom SKU — totals derive from price times quantity against real stock. Promotions plan inside margin guardrails rather than below them. Capturing or refunding money is human-reviewed, and card data is never handled in-house.",
    },
    composition:
      "commerce1 reconciles catalog availability against supply1 rather than keeping a second stock number, which is what stops the oversell. When stock falls below its reorder point, commerce1 drafts a replenishment purchase order against an approved supply1 vendor — the draft is the agent's work, the commitment stays a human's. Source, stock, sell and fulfil sit in one category because splitting them is what creates the reconciliation problem in the first place.",
    compassNote:
      "insight1 reads both systems of record at once, so stock cover and sell-through are the same number for the merchandiser and the planner. When a goal1 mission is blocked on throughput, the lever it names is supply1 replenishment — proposed with its approval gate, never committed by goal1 itself.",
    seo: {
      title: "trade1 — agentic supply chain and commerce | elan1",
      description:
        "trade1 groups supply1 and commerce1 on one order book: approved-vendor purchasing, stock truth that prevents oversells, and human review on every money move.",
    },
  },

  {
    slug: "works1",
    name: "works1",
    positioning: "Run the company — money, people, delivery.",
    apps: ["finance1", "people1", "project1"],
    accent: ACCENT.cyan,
    hero: {
      headline: "The back office, with the consequential end held.",
      subhead:
        "works1 runs the company itself: finance1 closes the books, people1 moves the workforce, project1 delivers the work and bills for it. These are the records where a mistake is a statutory problem, not a customer-experience one — so the gate is tighter here than anywhere else in the suite.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Segregation of duties, statutory obligation and fairness",
      body:
        "works1 holds money and people, so the agent never closes the loop alone. Every payment and commitment in finance1 is human-approved with a full audit trail. people1 is fair by construction — only job-relevant data is used, protected attributes are never stored, and lifecycle decisions are human-gated with a recorded review; it assists, it never decides. In project1 time cannot be logged against a project that does not exist, and billing a client is never autonomous. The person who drafts is not the person who approves.",
    },
    composition:
      "project1 hands approved billable time to finance1 for invoicing, so the invoice traces back to a timesheet a human signed off rather than a spreadsheet. people1 supplies the workforce that project1 schedules against capacity. finance1 is the app the rest of the suite ends at: procurement from trade1, billing from project1, and payroll from people1 all land in the same ledger, each behind its own approval.",
    compassNote:
      "insight1 serves finance and HR analytics directly — the same governed metric definition the CFO reads is the one the agent answers from. When a goal1 mission is short on revenue, the lever it names is finance1 collections, proposed with its approval gate attached; goal1 commits nothing itself.",
    seo: {
      title: "works1 — agentic finance, HR and delivery | elan1",
      description:
        "works1 groups finance1, people1 and project1: the records where a mistake is statutory. Payments, people decisions and client billing are always human-approved.",
    },
  },

  {
    slug: "compass1",
    name: "compass1",
    positioning: "Know where you are, and where you're pointed.",
    apps: ["insight1", "goal1"],
    accent: ACCENT.blue,
    hero: {
      headline: "It reads the other four. It never pays.",
      subhead:
        "compass1 is the only category that makes claims *about* the rest of the suite: insight1 tells you where you are, goal1 tells you where you're pointed. It is also the category that refuses to stay in its own box — insight1 and goal1 are inside revenue1, service1, trade1 and works1 too.",
      primaryCta: "Book a demo",
    },
    gate: {
      kind: "Grounding, and autonomy that is granted rather than seized",
      body:
        "The other four categories move money, goods and people. compass1 moves belief, so its gate is a different kind: a metric must name a real system of record, which is what stops a number being invented. Forecasts are labelled as forecasts. The consequential action here is not a payment — it is publishing a number to an audience that will act on it, and changing the plan, both of which are human-approved. Where goal1 is allowed to act on its own, the permission is granted by a person and bounded: an agent cannot widen its own envelope, the envelope carries a per-cycle budget that spends down, and a critical signal always escalates to a human. compass1 publishes; it never pays.",
    },
    composition:
      "insight1 is a thin semantic layer over every other app's system of record: one governed definition per metric, so the dashboard, the board pack and the agent's answer all tie to the same source. goal1 sits above that as a live cadence — Mission, Sprint, Pulse — where a signal carries severity, the affected mission, a quantified impact and a suggested move into a triage queue. It proposes rather than commits: when a mission needs a lever goal1 doesn't own, it names the target app and the approval gate — collections in finance1, replenishment in supply1 — and writes nothing into a sibling itself.",
    seo: {
      title: "compass1 — agentic analytics and goal intelligence | elan1",
      description:
        "compass1 groups insight1 and goal1: grounded answers over every app's system of record, and a live goal cadence that raises signals for a human to act on. It publishes; it never pays.",
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

if (import.meta.env?.DEV && uncategorizedAppSlugs.length > 0) {
  console.warn(
    `[categories] ${uncategorizedAppSlugs.length} app(s) in products.ts belong to no category: ` +
      `${uncategorizedAppSlugs.join(", ")}. Add them to content/categories.ts.`,
  );
}

export default categories;
