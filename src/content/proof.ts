// content/proof.ts — proof & case studies (before → after, with Trust Marks).
// All figures are ILLUSTRATIVE of the pattern, not guarantees — never financial/clinical/legal advice.
export interface CaseStudy {
  id: string;
  title: string;
  industry: string; // filter facet
  app: string; // the 1 Suite app / pack at the core
  before: string;
  after: string;
  metric: string; // headline outcome (illustrative)
  metricLabel: string;
  trustMark: string; // the workflow that earned the assure1 Trust Mark
  accent: string;
}

export const PROOF: CaseStudy[] = [
  {
    id: "bank-kyc",
    title: "KYC/AML triage that a human still decides",
    industry: "Banking",
    app: "bank1 · sales1 + finance1",
    before: "Analysts hand-screened every application; backlogs grew and decisions were inconsistent.",
    after: "An agent grounds each case in the system of record and flags risk; a human decides every account — fraud is flagged, never auto-denied.",
    metric: "~70%",
    metricLabel: "screening toil removed (illustrative)",
    trustMark: "bank1.kyc_aml_triage",
    accent: "#df8c64",
  },
  {
    id: "retail-winback",
    title: "On-brand, truthful win-back at scale",
    industry: "Retail / D2C",
    app: "retail1 · sales1 + supply1 + market1",
    before: "Generic blasts, off-brand copy, no grounding in the catalog or inventory.",
    after: "Catalog-grounded, on-brand outreach; a human approves every commitment; superlative claims are blocked.",
    metric: "weeks",
    metricLabel: "to a live, governed loop (not quarters)",
    trustMark: "retail1.customer_retention_engine",
    accent: "#e3b25c",
  },
  {
    id: "health-followup",
    title: "Patient follow-up as decision-support only",
    industry: "Healthcare",
    app: "health1 · service1 + finance1",
    before: "Manual follow-up coordination; clinicians buried in admin.",
    after: "An agent drafts follow-ups grounded in the record; a clinician signs every clinical-adjacent action — the agent never diagnoses.",
    metric: "100%",
    metricLabel: "clinician sign-off on clinical actions",
    trustMark: "health1.patient_followup",
    accent: "#3fae6b",
  },
  {
    id: "insure-claims",
    title: "Claims triage, fraud flagged not auto-denied",
    industry: "Insurance",
    app: "insure1 · service1 + finance1",
    before: "Slow first-response; inconsistent policy interpretation.",
    after: "Claims grounded in the policy document; a human decides every claim; fraud signals are flagged for review, never auto-acted.",
    metric: "faster",
    metricLabel: "first-response, fully audited (illustrative)",
    trustMark: "insure1.claims_triage",
    accent: "#46cdd6",
  },
  {
    id: "telco-care",
    title: "High-volume care that humans act on the network",
    industry: "Telecom",
    app: "telco1 · service1",
    before: "Tier-1 queues overflowing; risky manual network changes.",
    after: "Subscriber-grounded resolution; SIM-swap/fraud flagged; network changes stay human-made — agents assist, never auto-act.",
    metric: "↑ deflection",
    metricLabel: "with every step audited (illustrative)",
    trustMark: "telco1.high_volume_care",
    accent: "#a394ff",
  },
  {
    id: "mfg-maintenance",
    title: "Predictive maintenance — advisory, humans act",
    industry: "Manufacturing",
    app: "manufacture1 · supply1 + agent1",
    before: "Reactive breakdowns; no traceability across lot/batch/serial.",
    after: "An advisory agent predicts failures and recommends; a technician acts — it never writes to OT/control systems.",
    metric: "advisory",
    metricLabel: "by construction — humans control machines",
    trustMark: "manufacture1.predictive_maintenance",
    accent: "#46cdd6",
  },
];

export const INDUSTRIES = ["All", ...Array.from(new Set(PROOF.map((c) => c.industry)))];
