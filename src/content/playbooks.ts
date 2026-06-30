// content/playbooks.ts — gated, high-intent assets (lead capture). Delivered after a consent-respecting form.
export interface Playbook {
  slug: string;
  title: string;
  desc: string;
  audience: string;
  inside: string[];
  accent: string;
}

export const PLAYBOOKS: Playbook[] = [
  {
    slug: "agentic-transformation-roadmap",
    title: "The Agentic Transformation Roadmap",
    desc: "From AI-curious to agentic organization — the maturity curve, the sequencing, and the gates at each step.",
    audience: "CEOs, CIOs, transformation leads",
    inside: ["The 5-stage maturity model", "How to pick the first high-value agent", "The Discover→Expand method with gates", "A 90-day starting plan"],
    accent: "#df8c64",
  },
  {
    slug: "governance-playbook",
    title: "The Governance Playbook",
    desc: "How to deploy agents your regulator, board, and customers trust — human-in-the-loop, evals, Trust Marks, audit.",
    audience: "Risk, compliance, security leaders",
    inside: ["The governance signature pattern", "Human-in-the-loop on consequential actions", "Eval-gated Trust Marks", "Immutable audit + residency (DPDP/GDPR)"],
    accent: "#e0656d",
  },
  {
    slug: "vertical-guides",
    title: "Vertical Guides (by industry)",
    desc: "Per-industry agentic blueprints — the use cases, the governance signature, and the first Launchpad.",
    audience: "Industry & function owners",
    inside: ["Banking, retail, healthcare, insurance, telecom…", "The signature your sector requires", "Reference architectures", "Where to start (and what to avoid)"],
    accent: "#2f6df0",
  },
  {
    slug: "finops-playbook",
    title: "The Agent FinOps Playbook",
    desc: "Run agents affordably — model routing, token metering, eval-gated migrations, and per-app cost control.",
    audience: "Finance, platform, operations",
    inside: ["Opus/Sonnet/Haiku routing by task", "Per-tenant/app/model metering", "Eval-gated cost-down migrations", "Illustrative ROI modelling"],
    accent: "#3fae6b",
  },
];
