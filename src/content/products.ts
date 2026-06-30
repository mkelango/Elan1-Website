// content/products.ts
// The 1 Suite — ten agentic apps (9 functional + goal1) on one core, plus enterprise1, the backbone.
// All built, governed (HITL on every consequential action), and durable. Horizontal by function, reused across verticals.
// Source: elan1 offering catalog + product playbooks (Vols. 7–13).

import { Product, ACCENT } from "./types";

export const products: Product[] = [
  {
    slug: "sales1",
    layer: "product",
    name: "sales1",
    tagline: "The agentic CRM that sells with you.",
    businessFunction: "Sales & CRM",
    status: "live",
    accent: ACCENT.clay,
    hero: {
      headline: "Your CRM should sell, not just store.",
      subhead:
        "sales1 is the agentic CRM that researches accounts, drafts outreach, keeps records clean, and forecasts with you — so your team spends time closing, not updating fields.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Reps lose hours to manual data entry and CRM hygiene.",
      "Account research and personalized outreach don't scale.",
      "Pipeline data is stale, so forecasts are guesswork.",
      "Insights sit in the CRM instead of driving the next action.",
    ],
    capabilities: [
      { title: "Account research agent", description: "Builds a live brief on any account and contact from across your data and the web." },
      { title: "Outreach drafting agent", description: "Drafts personalized, on-brand emails and follow-ups grounded in account context." },
      { title: "CRM hygiene agent", description: "Keeps records clean and current automatically, with updates logged for review." },
      { title: "Pipeline & forecast agent", description: "Surfaces risk, next-best-actions, and a grounded forecast view." },
    ],
    outcomes: [
      "More selling time per rep",
      "Higher-quality, personalized outreach at scale",
      "Cleaner pipeline data and more reliable forecasts",
      "Faster ramp for new reps",
    ],
    integrations: ["CRM systems", "Email & calendar", "Data enrichment sources", "via MCP connectors"],
    suiteFit:
      "A native app on the shared core — no separate tool to manage. Closes the growth loop with market1 (content → leads), hands won deals to service1 for onboarding, and runs on enterprise1 like every other app.",
    trust:
      "Agents research and draft; a person approves any outreach or commitment. Records, stage moves, and conversions are governed writes — logged and reviewable on the immutable audit (K6).",
    pricingTiers: [
      { name: "Per seat", description: "For teams adopting agentic selling, billed per rep." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "sales1 — the agentic CRM that sells with you | elan1",
      description:
        "sales1 researches accounts, drafts personalized outreach, keeps records clean, and forecasts with you. The agentic CRM from elan1.",
    },
  },

  {
    slug: "service1",
    layer: "product",
    name: "service1",
    tagline: "Resolve, don't deflect.",
    businessFunction: "Customer Service",
    status: "live",
    accent: ACCENT.gold,
    hero: {
      headline: "Support that actually resolves.",
      subhead:
        "service1 is the agentic customer-service app that understands the customer, acts across your systems to fix the issue, and escalates to a human when it should — grounded in your knowledge and your data.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Deflection bots frustrate customers without solving anything.",
      "Agents copy-paste across systems to resolve simple issues.",
      "Knowledge is scattered, so answers are inconsistent.",
      "Volume scales faster than headcount.",
    ],
    capabilities: [
      { title: "Resolution agent", description: "Diagnoses the issue and acts across connected systems to resolve it, not just answer." },
      { title: "Knowledge-grounded answers", description: "Responds from your knowledge base and account data, with citations." },
      { title: "Smart escalation", description: "Hands off to a human with full context when judgment or policy requires it." },
      { title: "Quality & insight agent", description: "Summarizes drivers of contact volume and surfaces fixes upstream." },
    ],
    outcomes: [
      "Higher first-contact resolution",
      "Lower cost-to-serve",
      "Faster handling at consistent quality",
      "Better CSAT through real resolution",
    ],
    integrations: ["Helpdesk & ticketing", "Knowledge bases", "Order / account systems", "via MCP connectors"],
    suiteFit:
      "Pairs with sales1 (handing won deals into onboarding) and feeds market1 with messaging insights. The core of insure1 and telco1 solutions.",
    trust:
      "Grounded and cited — never a hallucinated answer. Every refund, account-change, or case-close is a human decision (K5), with recorded quality reviews and a full, immutable audit.",
    pricingTiers: [
      { name: "Per seat / per resolution", description: "Scales with your support volume." },
      { name: "Enterprise", description: "Governance, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "service1 — agentic customer service that resolves | elan1",
      description:
        "service1 understands the customer, acts across your systems to resolve issues, and escalates to humans when needed. Resolve, don't deflect.",
    },
  },

  {
    slug: "finance1",
    layer: "product",
    name: "finance1",
    tagline: "Close faster. See clearer.",
    businessFunction: "Finance & Accounting",
    status: "live",
    accent: ACCENT.cyan,
    hero: {
      headline: "The finance function, accelerated.",
      subhead:
        "finance1 automates the manual work in close, AP/AR, reporting, and analysis — grounded in your numbers, with human approval on every commitment.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Month-end close is slow and manual.",
      "AP/AR and reconciliations consume the team.",
      "Reporting and variance analysis lag the business.",
      "Insights arrive too late to act on.",
    ],
    capabilities: [
      { title: "Close & reconciliation agent", description: "Drafts reconciliations and flags exceptions for review to speed the close." },
      { title: "AP/AR agent", description: "Processes invoices and matches transactions, routing approvals to humans." },
      { title: "Reporting agent", description: "Generates reports and variance commentary grounded in your data." },
      { title: "Analysis agent", description: "Answers finance questions and models scenarios with cited sources." },
    ],
    outcomes: [
      "Faster month-end close",
      "Lower processing cost and error rates",
      "Reporting that keeps pace with the business",
      "Earlier, clearer insight",
    ],
    integrations: ["ERP & accounting systems", "Banking / payments data", "BI tools", "via MCP connectors"],
    suiteFit:
      "The procurement→AP loop with supply1; the engine inside bank1, insure1, and realestate1. Standardizes on enterprise1.",
    trust:
      "Grounded in verified data; human approval on every payment and commitment, with a full audit trail. Not financial advice.",
    pricingTiers: [
      { name: "Per seat", description: "For finance teams, billed per user." },
      { name: "Enterprise", description: "Controls, audit, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "finance1 — agentic finance & accounting | elan1",
      description:
        "finance1 accelerates close, AP/AR, reporting, and analysis — grounded in your numbers with human approval on every commitment.",
    },
  },

  {
    slug: "supply1",
    layer: "product",
    name: "supply1",
    tagline: "A supply chain that thinks.",
    businessFunction: "Supply Chain & Procurement",
    status: "live",
    accent: ACCENT.green,
    hero: {
      headline: "Anticipate, don't react.",
      subhead:
        "supply1 senses demand, drafts purchase orders, optimizes inventory, and resolves shipment exceptions — with a human approving every commitment.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Stockouts and overstock tie up cash.",
      "Procurement cycles are slow and manual.",
      "Shipment exceptions consume the team.",
      "Demand visibility is poor and forecasts miss.",
    ],
    capabilities: [
      { title: "Demand-sensing agent", description: "Reads signals to anticipate demand and flag stockout / overstock risk." },
      { title: "Procurement agent", description: "Drafts purchase orders matched to approved suppliers, routed for approval." },
      { title: "Inventory optimization agent", description: "Recommends levels to hit service targets given lead times." },
      { title: "Exception-resolution agent", description: "Diagnoses shipment exceptions and recommends next steps." },
    ],
    outcomes: [
      "Fewer stockouts and less overstock",
      "Faster procurement cycles",
      "Fewer unresolved exceptions",
      "Better forecast accuracy",
    ],
    integrations: ["ERP & WMS", "Supplier portals", "Logistics APIs", "via MCP connectors"],
    suiteFit:
      "The operations engine behind retail1, manufacture1, and energy1; the procurement→AP loop with finance1. Standardizes on enterprise1.",
    trust:
      "Approved-vendor by construction: a PO only goes to an approved supplier, and approving or blocking a vendor is a human decision (K5) backed by a recorded risk review. No autonomous commitment; every action audited.",
    pricingTiers: [
      { name: "Per seat / per site", description: "Scales across users and locations." },
      { name: "Enterprise", description: "Governance, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "supply1 — an agentic supply chain that thinks | elan1",
      description:
        "supply1 senses demand, drafts POs, optimizes inventory, and resolves exceptions — with human approval on every commitment.",
    },
  },

  {
    slug: "people1",
    layer: "product",
    name: "people1",
    tagline: "From hire to high-performance.",
    businessFunction: "HR & Talent",
    status: "live",
    accent: ACCENT.rose,
    hero: {
      headline: "Take the rote work out of HR.",
      subhead:
        "people1 speeds hiring, onboarding, policy answers, and review prep — with bias controls built in and humans making every consequential people decision.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Hiring is slow and admin-heavy.",
      "Onboarding is inconsistent.",
      "HR is buried in repetitive policy questions.",
      "Review season overwhelms managers.",
    ],
    capabilities: [
      { title: "Recruiting agent", description: "Drafts JDs and screens candidates against structured, job-relevant criteria for human decision." },
      { title: "Onboarding agent", description: "Generates role-specific onboarding plans and checklists." },
      { title: "Policy Q&A agent", description: "Answers policy questions instantly from the handbook, with citations." },
      { title: "Review-prep agent", description: "Drafts performance-review materials for manager review." },
    ],
    outcomes: [
      "Shorter time-to-hire with fairness checks",
      "Smoother, standardized onboarding",
      "Instant, consistent policy answers",
      "More time for the human work of HR",
    ],
    integrations: ["ATS", "HRIS", "Knowledge bases", "via MCP connectors"],
    suiteFit:
      "Pairs with academy1 for talent development and powers the people function inside edu1. Standardizes on enterprise1.",
    trust:
      "Fairness by design: only job-relevant data — protected attributes are never stored. Offboarding and other lifecycle decisions are human-gated (K5), each with a recorded review. people1 assists — it never decides.",
    pricingTiers: [
      { name: "Per employee / per req", description: "Scales with your workforce and hiring." },
      { name: "Enterprise", description: "Governance, audit, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "people1 — agentic HR & talent | elan1",
      description:
        "people1 speeds hiring, onboarding, policy answers, and review prep — with bias controls and humans making every people decision.",
    },
  },

  {
    slug: "market1",
    layer: "product",
    name: "market1",
    tagline: "Campaigns at agent speed.",
    businessFunction: "Marketing & Growth",
    status: "live",
    accent: ACCENT.violet,
    hero: {
      headline: "Your team's taste, at agent speed.",
      subhead:
        "market1 is a content engine and brand-voice system that ships more on-brand assets, faster and cheaper — with a human approving every publish.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Content production is the bottleneck.",
      "Creative costs rise as output demand grows.",
      "Brand voice drifts across teams and markets.",
      "Campaigns are slow to launch.",
    ],
    capabilities: [
      { title: "Content-repurposing agent", description: "Turns one asset into on-brand pieces across channels and formats." },
      { title: "Brand-voice governance", description: "Encodes tone and rules as Skills so output is on-brand by default." },
      { title: "Ad-variation factory", description: "Generates platform-spec variants at volume for testing." },
      { title: "SEO & social agent", description: "Drafts optimized content and schedules on-brand social." },
    ],
    outcomes: [
      "Higher output volume",
      "Lower cost-per-asset",
      "Faster time-to-campaign",
      "Consistent brand across channels and markets",
    ],
    integrations: ["CMS", "Ad platforms", "Analytics", "Claude Design", "via MCP connectors"],
    suiteFit:
      "The product graduation of the agency1 service; closes the growth loop with sales1 (content → leads → CRM). Standardizes on enterprise1.",
    trust:
      "Brand-safe by construction: publishing is review-on-publish (K5), banned claims are blocked, and every publish carries a recorded brand review. Creative production, never ad placement — Claude products are ad-free.",
    pricingTiers: [
      { name: "Per seat / usage", description: "Scales with your content operation." },
      { name: "Enterprise", description: "Governance, brand systems, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "market1 — agentic marketing & growth | elan1",
      description:
        "market1 is a content engine and brand-voice system that ships more on-brand assets, faster and cheaper, with review on every publish.",
    },
  },

  {
    slug: "insight1",
    layer: "product",
    name: "insight1",
    tagline: "Ask your data. Get a grounded answer.",
    businessFunction: "Analytics & Intelligence",
    status: "live",
    accent: ACCENT.blue,
    hero: {
      headline: "Analytics that answers, and watches for you.",
      subhead:
        "insight1 is the agent-native analytics app: a thin semantic layer over every app's system-of-record that you query in plain English and that proactively surfaces what needs a human — grounded in real numbers, never invented.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Dashboards pile up, but the answer you need is never on one.",
      "Every team defines the same metric differently, so numbers don't agree.",
      "By the time a report flags a problem, it's already old.",
      "Self-serve BI still needs an analyst to be trustworthy.",
    ],
    capabilities: [
      { title: "Ask-your-data agent", description: "Resolves a plain-English question to a governed metric over a real SoR and answers from the live numbers." },
      { title: "Proactive insight watch", description: "Always-on anomaly and trend detection that surfaces findings by severity — it flags, a human decides." },
      { title: "Semantic metric layer", description: "One governed definition per metric, so every dashboard and agent answer ties to the same source of truth." },
      { title: "Grounded narration & forecasts", description: "Plain-English narratives and clearly-labelled forecasts — every figure traces to a metric; nothing is invented." },
    ],
    outcomes: [
      "Answers in seconds, grounded in real data",
      "One agreed definition per metric across teams",
      "Problems surfaced proactively, not weeks later",
      "Less analyst time spent assembling reports",
    ],
    integrations: ["Every 1 Suite SoR (crm/finance/supply/people/service/project/commerce)", "Warehouses & BI", "via MCP connectors"],
    suiteFit:
      "Reads across every other app's system-of-record — the intelligence layer for the whole suite. Publishing a board pack to an audience is human-reviewed, like every consequential action.",
    trust:
      "Grounded by construction: a metric must name a real source-of-record, so insight1 never invents a number. Shipping numbers to leadership is human-approved.",
    pricingTiers: [
      { name: "Per workspace", description: "For teams adopting agent-native analytics across the suite." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "insight1 — agent-native analytics & intelligence | elan1",
      description:
        "insight1 lets you ask your data in plain English and watches the numbers for you — grounded in every app's system-of-record, never invented. Agent-native analytics from elan1.",
    },
  },

  {
    slug: "project1",
    layer: "product",
    name: "project1",
    tagline: "Plan, deliver, and bill — with agents.",
    businessFunction: "Project & Services Delivery",
    status: "live",
    accent: ACCENT.teal,
    hero: {
      headline: "Services delivery that runs itself, safely.",
      subhead:
        "project1 is the agent-native project app: it plans the work, schedules the team, tracks progress, captures time, and drafts client status — with the one money-touching step, billing a client, always human-reviewed.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Plans go stale the moment the project starts.",
      "Time gets logged late, to the wrong project, or not at all.",
      "Slippage and budget overrun surface after they've already hurt.",
      "Billing from logged time is manual, slow, and error-prone.",
    ],
    capabilities: [
      { title: "Planner & scheduler agents", description: "Break a brief into tasks, milestones and estimates, and allocate people within capacity." },
      { title: "Tracker & risk watch", description: "Always-on progress and budget-burn tracking that flags at-risk milestones before they slip." },
      { title: "Timesheet agent", description: "Captures time against the right project; time lands unapproved until a human signs off." },
      { title: "Billing agent (human-gated)", description: "Turns approved billable time into a client bill — reviewed by a human, handed to finance1." },
    ],
    outcomes: [
      "Plans that stay current as work moves",
      "Clean, project-linked time capture",
      "Slippage and overrun caught early",
      "Faster, accurate billing from approved time",
    ],
    integrations: ["finance1 (billing hand-off)", "Calendars & PSA tools", "via MCP connectors"],
    suiteFit:
      "Hands approved billable time to finance1 for invoicing and feeds delivery signals to sales1. The services-delivery engine inside any vertical that ships projects.",
    trust:
      "Safe by construction: time can't be logged to a project that doesn't exist, and billing a client is never autonomous — a human approves before money moves.",
    pricingTiers: [
      { name: "Per seat", description: "For services teams adopting agentic delivery." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "project1 — agent-native project & services delivery | elan1",
      description:
        "project1 plans the work, schedules the team, tracks progress, captures time and drafts client status — with client billing always human-reviewed. Agentic services delivery from elan1.",
    },
  },

  {
    slug: "commerce1",
    layer: "product",
    name: "commerce1",
    tagline: "One order book. Online and in-store.",
    businessFunction: "eCommerce + POS",
    status: "live",
    accent: ACCENT.magenta,
    hero: {
      headline: "Unified commerce, India-first and agent-native.",
      subhead:
        "commerce1 is one order book across your online storefront and your in-store point-of-sale — agents merchandise, sell, reconcile and support, with every total grounded in real SKUs and every money move human-reviewed.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Online and in-store run on separate systems, so a sale is never one truth.",
      "Catalogs drift from real stock, and oversells follow.",
      "Manual pricing, promos and refunds are slow and error-prone.",
      "Indian retail needs UPI and GST handled natively, not bolted on.",
    ],
    capabilities: [
      { title: "Merchandiser & promo agents", description: "Draft catalog listings and plan offers within margin guardrails — publishing is human-reviewed." },
      { title: "Cashier & order concierge", description: "Build sales from real SKUs (total = price × qty) and answer shopper questions from the live order book." },
      { title: "Inventory sync", description: "Reconciles catalog availability against supply1 — the source of stock truth — so you don't oversell." },
      { title: "Refund agent (human-gated)", description: "Processes refunds within what was captured — reviewed by a human, settled via a PCI provider." },
    ],
    outcomes: [
      "One unified order book across channels",
      "Totals and refunds that always reconcile",
      "UPI/GST-native, India-first commerce",
      "No oversells, no autonomous money moves",
    ],
    integrations: ["supply1 (stock truth)", "PCI payment providers (UPI/cards)", "Storefront & POS", "via MCP connectors"],
    suiteFit:
      "References supply1 for stock and hands settlement to a PCI provider — the storefront/POS engine of the retail1 solution. Card data is never handled in-house.",
    trust:
      "Safe by construction: you can't sell a phantom SKU, totals derive from price × qty, and capturing or refunding money is human-reviewed — commerce1 never stores card data.",
    pricingTiers: [
      { name: "Per store / per channel", description: "Scales with your storefronts and registers." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "commerce1 — agent-native eCommerce + POS, India-first | elan1",
      description:
        "commerce1 unifies your online storefront and in-store POS into one agent-native order book — UPI/GST-native, totals grounded in real SKUs, money moves human-reviewed. From elan1.",
    },
  },

  {
    slug: "goal1",
    layer: "product",
    name: "goal1",
    tagline: "The anti-OKR. Goals that run themselves.",
    businessFunction: "Agentic Goal Intelligence",
    status: "live",
    accent: ACCENT.indigo,
    hero: {
      headline: "OKRs were built for a world without agents.",
      subhead:
        "goal1 replaces the static quarterly OKR with a live, agent-co-owned operating cadence — Mission → Sprint → Pulse, with real-time Signals the agents detect and a human governs. Applying a signal changes the plan, so it's a human decision (K5) — the moat OKR tools don't have.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "OKRs are authored once a quarter and stale by week two.",
      "Progress lives in spreadsheets no one updates between check-ins.",
      "Nothing connects a goal to the daily work — or to the agents doing it.",
      "When a metric moves, no one's watching, and no one decides.",
    ],
    capabilities: [
      { title: "Mission architect", description: "Turns an ambition into a 10x mission with a measurable target, grounded in real metrics — drafting only." },
      { title: "Signal scout (always-on)", description: "Watches the metric stream and surfaces grounded signals — severity, the affected mission, quantified impact, a suggested move. It flags; a human decides." },
      { title: "Governed apply (K5)", description: "Applying a signal's suggestion changes the plan / can trigger an outbound move — so it's human-approved, every time, with the decision audited." },
      { title: "Pulse & cadence", description: "The daily beat OKR has no answer for: what moved, who moved it (agent or human), and the momentum streak — all on the live portfolio." },
    ],
    outcomes: [
      "Goals that react in real time, not once a quarter",
      "Agents drive execution while a human stays in the loop",
      "Every plan change human-approved and audited",
      "One live cadence from ambition to the daily move",
    ],
    integrations: ["The full 1 Suite (cross-app signals)", "insight1 metrics", "Metric & event streams", "via MCP connectors"],
    suiteFit:
      "Sits above the suite: it reads signals from every app (insight1 metrics, market1 demand, commerce1 GMV) and routes governed moves back through them. Runs in-process on enterprise1.",
    trust:
      "Agents drive and a human stays in control: applying a signal is a consequential action — human-approved (K5) and appended to the immutable audit. Every triage decision is recorded; figures are illustrative, not advice.",
    pricingTiers: [
      { name: "Per workspace", description: "For teams running their goals on an agentic cadence." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "goal1 — agentic goal intelligence, the anti-OKR | elan1",
      description:
        "goal1 replaces static OKRs with a live, agent-co-owned cadence — Mission, Sprint, Pulse, and governed real-time Signals. Applying a signal is a human decision (K5). From elan1.",
    },
  },

  {
    slug: "enterprise1",
    layer: "product",
    name: "enterprise1",
    tagline: "One agentic platform. Every function. Total control.",
    businessFunction: "Platform backbone",
    status: "live",
    externalUrl: "https://enterprise1.in",
    accent: ACCENT.clayDeep,
    hero: {
      headline: "The platform that unifies your agents.",
      subhead:
        "enterprise1 is the backbone that runs the whole 1 Suite as one — shared governance, identity, data, skills, and observability across every function, rolled out in waves.",
      primaryCta: "Talk to sales",
    },
    problem: [
      "Point agents sprawl without shared governance.",
      "Identity, data access, and audit are inconsistent across tools.",
      "There's no single place to observe and control agent behavior.",
      "Scaling from a pilot to the enterprise stalls.",
    ],
    capabilities: [
      { title: "Unified governance", description: "One policy, audit, and human-in-the-loop framework across every agent." },
      { title: "Identity & access", description: "SSO and consistent, least-privilege data access across functions." },
      { title: "Shared skills & connectors", description: "Reusable Skills and MCP connectors available to the whole suite." },
      { title: "Observability & control", description: "A single pane to monitor, evaluate, and manage agents in production." },
      { title: "Wave rollout", description: "A staged adoption model that scales function by function." },
    ],
    outcomes: [
      "Consistent governance and audit at scale",
      "Faster, safer expansion across functions",
      "Lower total cost of running agents",
      "One control plane for the agentic enterprise",
    ],
    integrations: ["Identity providers", "Enterprise data sources", "The full 1 Suite", "via MCP connectors"],
    suiteFit:
      "The backbone every product and solution standardizes on; the destination of every land-and-expand motion.",
    trust:
      "Governance, audit, and human-in-the-loop are first-class platform primitives — not bolt-ons. Operated with run1.",
    pricingTiers: [
      { name: "Platform", description: "Enterprise licensing across functions and seats." },
      { name: "Wave program", description: "Phased rollout with run1 operations and assure1 governance." },
    ],
    seo: {
      title: "enterprise1 — the unified agentic platform | elan1",
      description:
        "enterprise1 runs the whole 1 Suite as one — shared governance, identity, data, skills, and observability across every function.",
    },
  },
];

export default products;
