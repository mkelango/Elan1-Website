// content/initiatives.ts — cross-industry initiatives (the "By initiative" way to browse Solutions).
// Each frames a business need that spans verticals, the elan1 approach, the offerings it composes, and outcomes.

export interface Initiative {
  slug: string;
  name: string;
  tag: string;
  accent: string;
  headline: string;
  challenge: string;
  approach: { title: string; description: string }[];
  composedOf: string[];
  outcomes: string[];
  seo: { title: string; description: string };
}

export const initiatives: Initiative[] = [
  {
    slug: "agentic-transformation",
    name: "Agentic transformation",
    tag: "The flagship initiative",
    accent: "#df8c64",
    headline: "Move from “we use AI” to “we run on agents.”",
    challenge:
      "Most organizations are stuck between slow strategy decks that never ship and generic AI tools that aren't grounded, governed, or owned. Becoming an agentic organization needs a sequenced path — not another pilot that stalls.",
    approach: [
      { title: "Map & prioritize", description: "strategy1 sizes the highest-value agentic opportunities and sequences a costed roadmap." },
      { title: "Ship the first proof", description: "agent1 builds a working, production-grade agent in weeks — not a slide." },
      { title: "Prove it's safe", description: "assure1 validates accuracy, safety, and fairness, and issues the Trust Mark." },
      { title: "Operate & expand", description: "run1 operates it reliably while the flywheel sequences the next function onto enterprise1." },
    ],
    composedOf: ["strategy1", "agent1", "assure1", "run1", "enterprise1"],
    outcomes: [
      "A working, certified agent in weeks",
      "A costed, sequenced transformation roadmap",
      "Governance and audit built in from day one",
      "A compounding flywheel across functions",
    ],
    seo: {
      title: "Agentic transformation initiative | elan1",
      description: "The flagship path from AI ambition to an agentic organization — mapped, built, assured, operated, and scaled on enterprise1.",
    },
  },
  {
    slug: "customer-experience",
    name: "Customer experience",
    tag: "Initiative",
    accent: "#2f6df0",
    headline: "Resolve, personalize, and grow — at agent speed.",
    challenge:
      "Customers expect instant, personal, accurate service across every channel. Deflection bots frustrate; headcount can't scale; and experience data sits unused in silos. The gap between expectation and delivery is where loyalty is lost.",
    approach: [
      { title: "Resolve, don't deflect", description: "service1 understands the customer and acts across your systems to fix the issue — escalating to a human when judgment requires." },
      { title: "Sell with context", description: "customer1 researches accounts and drafts personalized, on-brand outreach grounded in your data." },
      { title: "Create on-brand", description: "market1 ships consistent, on-brand experiences across channels and markets, with review on publish." },
    ],
    composedOf: ["service1", "customer1", "market1"],
    outcomes: [
      "Higher first-contact resolution",
      "Personalization at scale, with oversight",
      "Lower cost-to-serve",
      "Consistent brand across every touchpoint",
    ],
    seo: {
      title: "Customer experience initiative | elan1",
      description: "Agentic CX that resolves, personalizes, and grows — composing service1, customer1, and market1 with human-in-the-loop.",
    },
  },
  {
    slug: "cost-finops",
    name: "Cost & FinOps",
    tag: "Initiative",
    accent: "#3fae6b",
    headline: "Do more, for less — with cost under control.",
    challenge:
      "Manual back-office work is expensive and slow, and the cost of running AI itself can spiral without discipline. Leaders need both: automate the rote work, and keep the unit economics of agents predictable.",
    approach: [
      { title: "Automate the rote work", description: "finance1 accelerates close, AP/AR, reporting, and analysis — with human approval on every commitment." },
      { title: "Run agents efficiently", description: "run1 manages FinOps — token cost optimization, eval-gated model migrations, and reliability under SLA." },
      { title: "Sequence on proof", description: "strategy1 prioritizes the use cases with the clearest ROI first, so spend follows proven value." },
    ],
    composedOf: ["finance1", "run1", "strategy1"],
    outcomes: [
      "Lower processing cost and error rates",
      "Predictable, optimized cost of running agents",
      "Faster month-end close",
      "Spend that follows proven value",
    ],
    seo: {
      title: "Cost & FinOps initiative | elan1",
      description: "Automate the back office and keep the cost of running agents predictable — composing finance1, run1, and strategy1. Illustrative; not financial advice.",
    },
  },
  {
    slug: "compliance",
    name: "Compliance & governance",
    tag: "Initiative",
    accent: "#e0656d",
    headline: "Deploy with confidence — and evidence.",
    challenge:
      "Regulated organizations can't adopt AI on trust alone. They need grounded, auditable systems with human sign-off, model-risk governance, and evidence their regulator, board, and customers will accept.",
    approach: [
      { title: "Govern by design", description: "assure1 builds the governance framework — policy, human-in-the-loop, and audit — for every agentic system." },
      { title: "Prove it", description: "Evaluations for accuracy, safety, bias, and fairness, plus audit-ready evidence packs and the Trust Mark." },
      { title: "Keep it safe in production", description: "run1 maintains reliability and eval-gated model migrations so governance holds as models change." },
    ],
    composedOf: ["assure1", "run1", "enterprise1"],
    outcomes: [
      "Regulator-, board-, and customer-ready evidence",
      "Human sign-off on every consequential action",
      "Fairness and safety validated",
      "Governance that holds as models change",
    ],
    seo: {
      title: "Compliance & governance initiative | elan1",
      description: "Governance-first agentic deployment — frameworks, evals, audit-ready evidence, and the Trust Mark. Composes assure1, run1, and enterprise1.",
    },
  },
  {
    slug: "legacy-modernization",
    name: "Legacy modernization",
    tag: "Initiative",
    accent: "#7c6cf0",
    headline: "Turn legacy drag into agentic speed.",
    challenge:
      "Critical work is trapped in legacy systems and document-heavy manual processes. Rip-and-replace is too risky and too slow — the need is to modernize the workflow without re-platforming the business overnight.",
    approach: [
      { title: "Wrap, don't rip", description: "agent1 builds agents and MCP connectors that work with your existing stack — modernizing the workflow, not the platform." },
      { title: "Free the data", description: "Document-heavy processes (leases, claims, records, specs) become structured, searchable, and fast." },
      { title: "Scale safely", description: "assure1 validates and run1 operates, so modernization compounds without new risk." },
    ],
    composedOf: ["agent1", "assure1", "run1"],
    outcomes: [
      "Modernized workflows without re-platforming",
      "Document drudgery turned into structured speed",
      "Lower operational risk",
      "A path that compounds, not a big-bang gamble",
    ],
    seo: {
      title: "Legacy modernization initiative | elan1",
      description: "Modernize workflows on top of legacy systems with agents and MCP connectors — composing agent1, assure1, and run1.",
    },
  },
];
