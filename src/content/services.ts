// content/services.ts
// Service pillars — how elan1 delivers. Source: offering catalog + service playbooks (Vols. 1–6).

import { Service, ACCENT } from "./types";

export const services: Service[] = [
  {
    slug: "strategy1",
    layer: "service",
    name: "strategy1",
    tagline: "Agentic strategy that ships.",
    promise:
      "We turn 'we should use AI' into a prioritized, costed roadmap of agentic opportunities — and the first shipped proof to back it.",
    whoFor: "Leaders who need a clear, credible plan for agentic transformation, not another slide deck.",
    accent: ACCENT.clay,
    offerings: [
      { title: "Opportunity mapping", description: "Identify and size the highest-value agentic use cases across the business." },
      { title: "Prioritized roadmap", description: "A sequenced, costed plan with clear ROI hypotheses and owners." },
      { title: "Proof of value", description: "Ship one quick, real proof to de-risk the plan and build momentum." },
      { title: "Operating model", description: "Define governance, roles, and the path to scale." },
    ],
    engagementModel:
      "A fixed-scope discovery-to-roadmap engagement, optionally followed by a proof-of-value sprint.",
    deliverables: [
      "Opportunity map and prioritization",
      "Costed, sequenced roadmap with ROI hypotheses",
      "An operating model and governance outline",
      "A shipped proof of value (if scoped)",
    ],
    whyElan1:
      "We pair strategy with delivery — every recommendation is grounded in what we can actually build on Claude, and we prove it.",
    outcomes: [
      "A clear, prioritized agentic roadmap",
      "Executive alignment and confidence",
      "A de-risked first win",
      "A credible path to scale",
    ],
    pricingModel: "Fixed-scope engagement fee. Illustrative; not financial advice.",
    connectsTo:
      "Feeds agent1 (build), the 1 Suite products, and the vertical Launchpads. Hands off to assure1 for governance and run1 for operations.",
    seo: {
      title: "strategy1 — agentic strategy that ships | elan1",
      description:
        "strategy1 turns AI ambition into a prioritized, costed roadmap and a shipped proof of value. Strategy paired with delivery.",
    },
  },

  {
    slug: "agent1",
    layer: "service",
    name: "agent1",
    tagline: "We build your agents.",
    promise:
      "Our build studio designs, builds, and ships production-grade agents and agentic workflows on Claude — tailored to your systems and your rules.",
    whoFor: "Teams that need custom agents built right, integrated with their stack, and ready for production.",
    accent: ACCENT.green,
    offerings: [
      { title: "Custom agent builds", description: "Bespoke agents and multi-step workflows designed for your processes." },
      { title: "Skills & connectors", description: "Encode your rules as Skills and integrate your systems via MCP." },
      { title: "Systems integration", description: "Wire agents into your real stack, safely and observably." },
      { title: "Production hardening", description: "Evals, guardrails, and the handoff to run1 for operations." },
    ],
    engagementModel:
      "Scoped build sprints — from prototype to production — with clear acceptance criteria and quality gates.",
    deliverables: [
      "Production-grade agents and workflows",
      "Custom Skills and MCP connectors",
      "Integration with your systems",
      "Evals, guardrails, and operational handoff",
    ],
    whyElan1:
      "Claude-native engineering with trust built in — agents that work in production, not just in a demo.",
    outcomes: [
      "Working agents in production",
      "Integrated with your real systems",
      "Governed and observable",
      "Ready to scale on enterprise1",
    ],
    pricingModel: "Scoped build-sprint fees. Illustrative; not financial advice.",
    connectsTo:
      "The build engine behind the 1 Suite and the vertical Launchpads. Hands off to assure1 (validation) and run1 (operations).",
    seo: {
      title: "agent1 — the agent build studio | elan1",
      description:
        "agent1 designs, builds, and ships production-grade agents and agentic workflows on Claude, integrated with your systems.",
    },
  },

  {
    slug: "assure1",
    layer: "service",
    name: "assure1",
    tagline: "Trust, proven.",
    promise:
      "We make agentic systems safe to trust — governance, evaluations, audits, and a Trust Mark that proves it to your regulator, board, and customers.",
    whoFor: "Regulated and risk-aware organizations that need to deploy agents with confidence and evidence.",
    accent: ACCENT.rose,
    offerings: [
      { title: "Governance frameworks", description: "Policy, human-in-the-loop, and audit design for agentic systems." },
      { title: "Evaluations", description: "Accuracy, safety, bias, and fairness testing against your standards." },
      { title: "Audits & assurance", description: "Independent review and audit-ready evidence packs." },
      { title: "Trust Mark", description: "A validation that signals governed, trustworthy agentic systems." },
    ],
    engagementModel:
      "Project-based assurance plus an ongoing governance retainer for systems in production.",
    deliverables: [
      "A governance framework and controls",
      "Evaluation and bias-test results",
      "Audit-ready evidence and reports",
      "The assure1 Trust Mark (where validated)",
    ],
    whyElan1:
      "Governance-first by design — the discipline that turns regulated industries into customers.",
    outcomes: [
      "Confidence to deploy in regulated settings",
      "Regulator-, board-, and customer-ready evidence",
      "Fairness and safety validated",
      "Ongoing governance at scale",
    ],
    pricingModel: "Project fees plus a governance retainer. Illustrative; not legal or compliance advice.",
    connectsTo:
      "Validates every product and solution; central to health1, bank1, gov1, and energy1. Pairs with run1 in operations.",
    seo: {
      title: "assure1 — governance, evals, and trust for agents | elan1",
      description:
        "assure1 makes agentic systems safe to trust — governance, evaluations, audits, and a Trust Mark that proves it.",
    },
  },

  {
    slug: "academy1",
    layer: "service",
    name: "academy1",
    tagline: "We make your people agentic.",
    promise:
      "Training, certification, and talent that turn your workforce into confident, capable users and builders of agentic systems.",
    whoFor: "Organizations that need their people — and their talent pipeline — ready for the agentic era.",
    accent: ACCENT.violet,
    offerings: [
      { title: "Workforce training", description: "Role-based programs that build practical agentic skills." },
      { title: "Certification", description: "Credentialed paths that validate capability." },
      { title: "Enterprise enablement", description: "Change and adoption programs for agentic transformation." },
      { title: "Talent marketplace", description: "Access to certified agentic talent when you need to hire or augment." },
    ],
    engagementModel:
      "Cohort programs, enterprise enablement engagements, and ongoing certification — for teams and individuals.",
    deliverables: [
      "Role-based training programs",
      "Certifications and credentials",
      "Adoption and change-management support",
      "Access to certified talent",
    ],
    whyElan1:
      "We teach what we build — practical, Claude-native skills grounded in real delivery, not theory.",
    outcomes: [
      "Confident, capable teams",
      "Higher adoption of agentic systems",
      "A pipeline of certified talent",
      "Durable internal capability",
    ],
    pricingModel: "Per-seat / per-cohort and enterprise programs. Illustrative; not financial advice.",
    connectsTo:
      "Drives adoption for every product and solution; pairs with people1 and powers edu1.",
    seo: {
      title: "academy1 — agentic training, certification & talent | elan1",
      description:
        "academy1 turns your workforce into confident users and builders of agentic systems, with training, certification, and a talent marketplace.",
    },
  },

  {
    slug: "run1",
    layer: "service",
    name: "run1",
    tagline: "Your agents, run for you.",
    promise:
      "Managed AgentOps — we operate, monitor, and continuously improve your agentic systems in production, with reliability and cost under control.",
    whoFor: "Organizations running agents in production that want them operated reliably without building an internal ops team.",
    accent: ACCENT.cyan,
    offerings: [
      { title: "Managed AgentOps", description: "Operate and monitor agents in production against SLAs." },
      { title: "Reliability & evals", description: "Continuous evaluation and eval-gated model migrations." },
      { title: "FinOps", description: "Manage and optimize the cost of running agents." },
      { title: "Continuous improvement", description: "Tune prompts, skills, and workflows as the business changes." },
    ],
    engagementModel:
      "An ongoing operations retainer, scoped to your systems, volume, and SLAs.",
    deliverables: [
      "Operated, monitored agents in production",
      "Reliability and evaluation reporting",
      "Cost (FinOps) management",
      "Ongoing tuning and improvement",
    ],
    whyElan1:
      "We keep agents dependable as models and needs change — eval-gated, observable, and cost-managed.",
    outcomes: [
      "Reliable agents in production",
      "Controlled, optimized cost",
      "Safe model migrations",
      "Continuous improvement over time",
    ],
    pricingModel: "Ongoing operations retainer. Illustrative; not financial advice.",
    connectsTo:
      "Operates every product and solution at scale; central to insure1, telco1, manufacture1, and energy1. Runs on enterprise1.",
    seo: {
      title: "run1 — managed AgentOps & FinOps | elan1",
      description:
        "run1 operates, monitors, and improves your agentic systems in production — reliability, evals, and cost under control.",
    },
  },

  {
    slug: "agency1",
    layer: "service",
    name: "agency1",
    tagline: "Creative at agent speed.",
    promise:
      "An agentic creative and marketing service — we produce more on-brand content, faster and cheaper, and build the brand-voice system that keeps it consistent.",
    whoFor: "Brands and marketing teams that need creative output at scale without losing their voice.",
    accent: ACCENT.gold,
    offerings: [
      { title: "Brand-voice systems", description: "Encode tone, terminology, and rules as Skills for on-brand output by default." },
      { title: "Content production", description: "Repurpose and produce assets across channels at volume." },
      { title: "Campaign creative", description: "Concept and produce campaign creative, fast." },
      { title: "Localization", description: "Adapt content across markets and languages, on-brand." },
    ],
    engagementModel:
      "Project and retainer engagements — which can graduate into the market1 product for standing, in-house production.",
    deliverables: [
      "A brand-voice system",
      "Produced, on-brand content and campaigns",
      "Localized content across markets",
      "A path to the market1 product",
    ],
    whyElan1:
      "Taste plus speed — a brand-voice system and review gates keep agent-speed output genuinely on-brand. Creative production, not ad placement (Claude products are ad-free).",
    outcomes: [
      "More on-brand output",
      "Lower cost-per-asset",
      "Faster campaigns",
      "Consistent brand across markets",
    ],
    pricingModel: "Project and retainer fees; graduates to market1 pricing. Illustrative; not financial advice.",
    connectsTo:
      "Graduates into the market1 product; closes the growth loop with sales1; powers retail1 and edu1.",
    seo: {
      title: "agency1 — agentic creative & marketing | elan1",
      description:
        "agency1 produces more on-brand content faster and cheaper, with a brand-voice system that keeps it consistent. Creative at agent speed.",
    },
  },
];

export default services;
