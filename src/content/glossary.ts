// content/glossary.ts — the agentic vocabulary, defined plainly. Anchors the SEO term cluster.
export interface Term {
  term: string;
  def: string;
  category: "Core" | "Governance" | "Platform" | "Go-to-market";
}

export const GLOSSARY: Term[] = [
  { term: "Agent", category: "Core", def: "Software that reasons over a goal, uses tools and connectors, and completes multi-step work end to end — under human control. Unlike a copilot, it acts." },
  { term: "Agentic transformation", category: "Core", def: "Adopting agents as a new operating layer for the business — not a feature bolted onto existing apps." },
  { term: "Copilot", category: "Core", def: "An assistant that suggests and waits; a human still does the work. The step before an agent." },
  { term: "Grounding", category: "Core", def: "Forcing an agent to act on the system of record (via connectors) rather than guessing — facts, with citations." },
  { term: "Skill (K4)", category: "Platform", def: "A reusable, versioned unit of know-how (e.g. a brand voice or an industry rule) an agent can resolve — shared, never forked." },
  { term: "MCP connector (K3)", category: "Platform", def: "A scoped, least-privilege, audited integration to a system (CRM, email, ERP…). Channels and apps are added as connectors, not rewrites." },
  { term: "The 1 Suite", category: "Platform", def: "elan1's ten agentic apps — sales1, service1, finance1, supply1, people1, market1, insight1, project1, commerce1, and goal1 — unified on enterprise1. All built, governed (human-in-the-loop on every consequential action), and durable." },
  { term: "enterprise1", category: "Platform", def: "The unified control plane over the shared core: one pane for governance, identity, observability, FinOps, and wave rollout." },
  { term: "Composable platform", category: "Platform", def: "A thin shared core plus modular apps and config packs — one core, many apps, every vertical; no forks." },
  { term: "Pack", category: "Platform", def: "A vertical or use-case delivered as configuration (skills + connectors + a governance signature + workflows), not a new codebase." },
  { term: "Human-in-the-loop (K5)", category: "Governance", def: "A required human approval on every consequential action. Nothing autonomous or unsupervised." },
  { term: "Governance signature (K7)", category: "Governance", def: "A vertical's enforceable policy set — e.g. clinical-safety, RBI/AML, OT/IT separation — applied by the core, not bolted on." },
  { term: "Eval (T2)", category: "Governance", def: "An automated accuracy/safety/fairness check on an agent's output. No eval, no Trust Mark." },
  { term: "Trust Mark (assure1)", category: "Governance", def: "An evidence-gated certification a workflow earns only after its evals pass — the visible proof of governed quality." },
  { term: "Immutable audit (K6)", category: "Governance", def: "An append-only, hash-chained, tamper-evident log of every agent action — verifiable and tenant-scoped." },
  { term: "Tenant isolation (K1)", category: "Governance", def: "Hard separation of every customer's data (row-level security) so nothing leaks across tenants." },
  { term: "Data residency (X3)", category: "Governance", def: "A tenant's data lives and stays in its region (India → Singapore → US → Middle East → Europe); cross-region movement is forbidden by design." },
  { term: "Wave rollout (X2)", category: "Platform", def: "Enabling apps/functions per tenant, in waves, function-by-function — safe enable/disable, all audited." },
  { term: "Model routing (K2)", category: "Platform", def: "Choosing the right model (Opus / Sonnet / Haiku) per task to balance quality and cost; changes are eval-gated." },
  { term: "Discovery Sprint", category: "Go-to-market", def: "The low-risk, fully-credited on-ramp: a costed opportunity map plus a working proof, in weeks." },
  { term: "Launchpad", category: "Go-to-market", def: "Your first production agent — deployed, governed, and Trust-Marked — after the Discovery Sprint." },
  { term: "Partner SDK (X4)", category: "Go-to-market", def: "A governed subset of the platform that lets partners build apps/packs/connectors — certified before listing, least-privilege, fully audited." },
];

export const CATEGORIES = ["Core", "Governance", "Platform", "Go-to-market"] as const;
