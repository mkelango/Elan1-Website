// content/products.ts
// The 1 Suite — seven functional agentic apps. Horizontal by function, reused across verticals.
// Source: elan1 offering catalog + product playbooks (Vols. 7–13).

import { Product, ACCENT } from "./types";

export const products: Product[] = [
  {
    slug: "customer1",
    layer: "product",
    name: "customer1",
    tagline: "The agentic CRM that sells with you.",
    businessFunction: "Sales & CRM",
    status: "live",
    externalUrl: "https://customer1.in",
    accent: ACCENT.clay,
    hero: {
      headline: "Your CRM should sell, not just store.",
      subhead:
        "customer1 is the agentic CRM that researches accounts, drafts outreach, keeps records clean, and forecasts with you — so your team spends time closing, not updating fields.",
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
      "Closes the growth loop with market1 (content → leads) and hands won deals to service1 for onboarding. Standardizes on enterprise1 at scale.",
    trust:
      "Agents recommend and draft; reps approve outreach before it sends. Every action is logged and auditable.",
    pricingTiers: [
      { name: "Per seat", description: "For teams adopting agentic selling, billed per rep." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "customer1 — the agentic CRM that sells with you | elan1",
      description:
        "customer1 researches accounts, drafts personalized outreach, keeps records clean, and forecasts with you. The agentic CRM from elan1.",
    },
  },

  {
    slug: "service1",
    layer: "product",
    name: "service1",
    tagline: "Resolve, don't deflect.",
    businessFunction: "Customer Service",
    status: "pipeline",
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
      "Pairs with customer1 (handing won deals into onboarding) and feeds market1 with messaging insights. The core of insure1 and telco1 solutions.",
    trust:
      "Grounded in your knowledge; human review on sensitive actions and escalation paths by design.",
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
    status: "pipeline",
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
    status: "pipeline",
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
      "Purchase orders and supplier actions are never autonomous — a human approves every commitment, and all actions are audited.",
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
    status: "pipeline",
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
      "Bias-checked screening surfaces only job-relevant signals; a human makes every consequential people decision. people1 assists — it never decides.",
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
    status: "pipeline",
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
      "The product graduation of the agency1 service; closes the growth loop with customer1 (content → leads → CRM). Standardizes on enterprise1.",
    trust:
      "Brand-voice guardrails plus review gates on publish — no auto-publishing of unreviewed content. This is creative production, not ad placement (Claude products are ad-free).",
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
    slug: "enterprise1",
    layer: "product",
    name: "enterprise1",
    tagline: "One agentic platform. Every function. Total control.",
    businessFunction: "Platform backbone",
    status: "pipeline",
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
