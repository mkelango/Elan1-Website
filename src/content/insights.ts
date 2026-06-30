// content/insights.ts — the insights/content engine (WS4.1). On-brand articles, REVIEWED before
// publish, ad-free, illustrative-flagged. Authored via agency1's reviewed workflow (modelled here as
// typed, review-stamped entries).
export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  reviewedBy: string; // editorial review-on-publish
  date: string; // ISO
  readMins: number;
  tag: string;
  body: { h: string; p: string }[];
  accent: string;
}

export const INSIGHTS: Insight[] = [
  {
    slug: "agents-not-features",
    title: "Agentic transformation is not an AI feature",
    excerpt: "Why bolting a copilot onto your CRM isn't transformation — and what a new operating layer actually means.",
    author: "elan1",
    reviewedBy: "assure1 editorial",
    date: "2026-05-12",
    readMins: 6,
    tag: "Strategy",
    accent: "#df8c64",
    body: [
      { h: "The feature trap", p: "Most 'AI strategies' are a list of features — a chatbot here, a summarizer there. They help, but they don't change how the work gets done. The work still flows through people and forms." },
      { h: "An operating layer", p: "Agentic transformation puts a layer of governed agents under the business: systems that reason, use tools, and complete work end to end, with a human deciding the consequential steps." },
      { h: "Where to start", p: "Pick one high-value, well-bounded workflow. Ship a governed agent against it in weeks. Earn a Trust Mark. Then sequence the next. (Illustrative; not advice.)" },
    ],
  },
  {
    slug: "governance-is-the-moat",
    title: "Governance is the moat, not the brake",
    excerpt: "Human-in-the-loop, evals, Trust Marks and immutable audit aren't friction — they're why agents get deployed at all.",
    author: "elan1",
    reviewedBy: "assure1 editorial",
    date: "2026-05-26",
    readMins: 7,
    tag: "Governance",
    accent: "#e0656d",
    body: [
      { h: "Trust is the deployment blocker", p: "The reason agents stall in pilots is rarely capability — it's trust. Boards, regulators and customers need evidence before an agent touches a real decision." },
      { h: "Make trust legible", p: "A governance signature per vertical, human approval on consequential actions, eval-gated Trust Marks, and an immutable audit make trust something you can show, not just claim." },
      { h: "Speed through safety", p: "Counter-intuitively, the governed path is faster to production — because it's the only path that clears review." },
    ],
  },
  {
    slug: "one-core-many-apps",
    title: "One core, many apps: the composable advantage",
    excerpt: "Why a thin shared core with modular apps and config packs beats stitching point tools together.",
    author: "elan1",
    reviewedBy: "assure1 editorial",
    date: "2026-06-09",
    readMins: 5,
    tag: "Platform",
    accent: "#2f6df0",
    body: [
      { h: "The integration tax", p: "Best-of-breed point tools each bring their own identity, data model and governance. The integration tax compounds with every tool you add." },
      { h: "Composable instead", p: "A thin shared core (identity, governance, audit, runtime) with modular apps and config-only vertical packs means one trust story, no forks, and verticals shipped in days." },
      { h: "Distributed front, unified core", p: "Each app can wear its own brand, but they all run on one governed core — the whole business operating as one." },
    ],
  },
];

export const insightBySlug = (slug: string) => INSIGHTS.find((i) => i.slug === slug);
