// content/solutions.ts
// Industry solutions — compose products + service pillars with industry skills & governance.
// Each lands via a fixed-scope 4–6 week Launchpad. Source: offering catalog + vertical playbooks (Vols. 14–23).

import { Solution, ACCENT } from "./types";

export const solutions: Solution[] = [
  {
    slug: "health1",
    layer: "solution",
    name: "health1",
    industry: "Healthcare & life sciences",
    tagline: "Less paperwork. More care.",
    challenge:
      "Healthcare's bottleneck isn't care — it's the administrative load around it: documentation, prior-auth, and claims, all under strict privacy rules.",
    composedOf: ["service1", "finance1", "assure1"],
    accent: ACCENT.green,
    useCases: [
      { title: "Prior-authorization automation", description: "Drafts requests grounded in payer criteria for clinician review." },
      { title: "Clinical documentation", description: "Turns encounters into structured notes for clinician sign-off." },
      { title: "Claims & revenue cycle", description: "Analyzes denials and drafts appeals to recover revenue." },
      { title: "Patient communications", description: "Handles routine patient queries with human oversight." },
    ],
    compliance:
      "HIPAA-class privacy by design, clinician sign-off on every clinical action, and immutable audit trails — validated by assure1.",
    outcomes: [
      "Faster prior-auth turnaround",
      "Lower denial rates and recovered revenue",
      "Reduced documentation burden on clinicians",
      "Audit-ready governance",
    ],
    starterEngagement:
      "The health1 Launchpad: one flagship workflow (typically prior-authorization) live and governance-validated in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/volume product pricing plus an assure1 governance retainer. Illustrative; not medical, legal, or financial advice.",
    seo: {
      title: "health1 — agentic transformation for healthcare | elan1",
      description:
        "health1 automates healthcare admin — prior-auth, documentation, claims — with HIPAA-class privacy and clinician sign-off. Composes service1, finance1, and assure1.",
    },
  },

  {
    slug: "bank1",
    focus: "parked",
    layer: "solution",
    name: "bank1",
    industry: "Banking & capital markets",
    tagline: "Speed, with the controls your regulator expects.",
    challenge:
      "Banks need faster research, underwriting, and compliance — but only on verified data, with audit trails and model-risk governance.",
    composedOf: ["finance1", "sales1", "assure1"],
    accent: ACCENT.clay,
    useCases: [
      { title: "KYC / AML triage", description: "Triages cases against policy and flags risk and required checks for review." },
      { title: "Investment-memo automation", description: "Drafts memos from verified sources, with citations and assumptions." },
      { title: "Compliance reporting", description: "Generates reports and flags exceptions against the rule set." },
      { title: "Loan underwriting", description: "Summarizes risk grounded in submitted documents for review." },
    ],
    compliance:
      "Verified-data sourcing, immutable audit trails, model-risk governance, and human sign-off — validated by assure1.",
    outcomes: [
      "Faster KYC/AML and underwriting cycles",
      "Higher-quality, cited research",
      "Lower compliance-reporting effort",
      "Regulator-ready evidence",
    ],
    starterEngagement:
      "The bank1 Launchpad: one flagship workflow (often KYC/AML triage) live and governance-validated in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat product pricing plus an assure1 model-risk retainer. Illustrative; not financial, investment, or compliance advice.",
    seo: {
      title: "bank1 — agentic transformation for banking | elan1",
      description:
        "bank1 accelerates research, underwriting, and compliance on verified data with audit trails and model-risk governance. Composes finance1, sales1, and assure1.",
    },
  },

  {
    slug: "insure1",
    focus: "parked",
    layer: "solution",
    name: "insure1",
    industry: "Insurance",
    tagline: "Faster claims. Fairer decisions.",
    challenge:
      "Insurers need to speed claims and service without sacrificing fairness — triage, FNOL, coverage answers, and fraud signals, with humans deciding outcomes.",
    composedOf: ["service1", "finance1", "run1"],
    accent: ACCENT.cyan,
    useCases: [
      { title: "Claims triage & FNOL", description: "Classifies, routes, and captures first-notice-of-loss into structured data." },
      { title: "Coverage Q&A", description: "Explains coverage for a policy and scenario, with citations to terms." },
      { title: "Fraud signals", description: "Surfaces potential fraud evidence for investigator review — never auto-denies." },
      { title: "Policy administration", description: "Automates routine policy-admin tasks with oversight." },
    ],
    compliance:
      "Fair-decision governance, human review on every adjudication, and full audit trails — validated by assure1.",
    outcomes: [
      "Faster claims handling at equal accuracy",
      "Lower leakage and cost-per-claim",
      "Better claims-experience CX",
      "Fairness-checked, auditable decisions",
    ],
    starterEngagement:
      "The insure1 Launchpad: claims triage & FNOL live and fairness-validated in 4–6 weeks, then operated on a run1 retainer.",
    pricingNote:
      "Fixed Launchpad fee, then per-claim/seat pricing plus a run1 retainer. Illustrative; not insurance, financial, or compliance advice.",
    seo: {
      title: "insure1 — agentic transformation for insurance | elan1",
      description:
        "insure1 speeds claims and service with fair-decision governance and human review on adjudication. Composes service1, finance1, and run1.",
    },
  },

  {
    slug: "retail1",
    layer: "solution",
    name: "retail1",
    industry: "Retail & e-commerce",
    tagline: "More conversion. Fewer stockouts. Lower cost-to-serve.",
    challenge:
      "Retailers fight thin margins, SKU sprawl, stockouts, and rising support cost — across listings, demand, and customer ops.",
    composedOf: ["supply1", "sales1", "market1", "commerce1"],
    accent: ACCENT.gold,
    useCases: [
      { title: "Unified online + POS", description: "One order book across storefront and store via commerce1 — totals grounded in real SKUs (UPI/GST-native)." },
      { title: "Product-listing factory", description: "Generates optimized, on-brand listings and variants at volume." },
      { title: "Demand-insight dashboards", description: "Senses demand and flags stockout / overstock risk." },
      { title: "Support automation", description: "Resolves tickets grounded in order data via service1." },
    ],
    compliance:
      "Consumer-data privacy, brand-voice consistency, and human review on published content.",
    outcomes: [
      "Higher conversion",
      "Fewer stockouts and less overstock",
      "Lower support cost-per-ticket",
      "Faster listing and campaign throughput",
    ],
    starterEngagement:
      "The retail1 Launchpad: a fast flagship (listing factory or demand dashboard) live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/usage product pricing. Illustrative; not financial advice.",
    seo: {
      title: "retail1 — agentic transformation for retail & e-commerce | elan1",
      description:
        "retail1 turns catalog, demand, commerce, and customer ops agentic — more conversion, fewer stockouts, lower support cost. Composes supply1, sales1, market1, and commerce1.",
    },
  },

  {
    slug: "telco1",
    layer: "solution",
    name: "telco1",
    industry: "Telecommunications",
    tagline: "Lower churn. Lower cost-to-serve.",
    challenge:
      "Operators carry high call volume, churn, and network-ops complexity on legacy OSS/BSS systems.",
    composedOf: ["service1", "run1", "agent1"],
    accent: ACCENT.violet,
    useCases: [
      { title: "Customer-lifecycle management", description: "Recommends next-best-actions to reduce churn risk." },
      { title: "Service-delivery automation", description: "Automates provisioning steps from the order, flagging exceptions." },
      { title: "Network-ops modernization", description: "Triages incidents and recommends resolution for engineer review (graduated)." },
      { title: "Support resolution", description: "Resolves billing and service tickets grounded in account data." },
    ],
    compliance:
      "Customer-data privacy, telecom regulation, human review, and audit — with mission-critical network ops graduated only after assure1 validation.",
    outcomes: [
      "Reduced churn",
      "Lower cost-to-serve",
      "Faster service delivery",
      "Faster incident resolution",
    ],
    starterEngagement:
      "The telco1 Launchpad: customer-lifecycle / service automation live in 4–6 weeks, then operated at scale on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/usage pricing plus a run1 retainer. Illustrative; not financial advice.",
    seo: {
      title: "telco1 — agentic transformation for telecom | elan1",
      description:
        "telco1 modernizes customer lifecycle, service delivery, and network ops, wired to your OSS/BSS. Composes service1, run1, and agent1.",
    },
  },

  {
    slug: "gov1",
    focus: "parked",
    layer: "solution",
    name: "gov1",
    industry: "Public sector",
    tagline: "Faster public service. Full accountability.",
    challenge:
      "Agencies face records/FOIA backlogs and slow citizen services on legacy systems — under transparency, sovereignty, and accountability mandates.",
    composedOf: ["assure1", "service1"],
    accent: ACCENT.rose,
    useCases: [
      { title: "Records / FOIA processing", description: "Extracts, redacts per the rules, and routes requests for review." },
      { title: "Citizen-services Q&A", description: "Answers citizen queries from official sources, with citations." },
      { title: "Policy analysis", description: "Summarizes policy and likely impacts for reviewer analysis." },
    ],
    compliance:
      "Sovereignty and data residency, full auditability, transparency and explainability, and human oversight — governance-first, led by assure1.",
    outcomes: [
      "Reduced backlogs",
      "Faster turnaround",
      "Higher citizen-service satisfaction",
      "Full auditability and transparency",
    ],
    starterEngagement:
      "The gov1 Launchpad: a flagship (records/FOIA or citizen Q&A) live and sovereignty-validated in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee aligned to public-sector procurement, then a government contract plus an assure1 governance retainer. Illustrative; not legal or compliance advice.",
    seo: {
      title: "gov1 — agentic transformation for the public sector | elan1",
      description:
        "gov1 speeds citizen services and back-office processing with sovereignty, transparency, and full auditability. Composes assure1 and service1.",
    },
  },

  {
    slug: "manufacture1",
    layer: "solution",
    name: "manufacture1",
    industry: "Manufacturing & engineering",
    tagline: "Less downtime. Faster R&D. Fewer errors.",
    challenge:
      "Manufacturers lose to unplanned downtime, slow R&D, and error-prone manual SOPs on legacy MES/PLM systems.",
    composedOf: ["supply1", "agent1", "run1"],
    accent: ACCENT.cyan,
    useCases: [
      { title: "Maintenance & SOP assistant", description: "Guides procedures from SOPs and equipment data; flags safety steps." },
      { title: "Spec / BoM analysis", description: "Analyzes specs and bills of materials for issues and discrepancies." },
      { title: "Design acceleration", description: "Explores design options within engineering constraints for review." },
      { title: "Fault diagnosis", description: "Diagnoses faults and recommends steps for technician review." },
    ],
    compliance:
      "Safety and quality standards, human-in-the-loop (assist, never actuate), IP protection, and audit — validated by assure1.",
    outcomes: [
      "Less unplanned downtime",
      "Lower error and defect rates",
      "Faster R&D cycles",
      "Higher OEE",
    ],
    starterEngagement:
      "The manufacture1 Launchpad: a maintenance/SOP assistant live at one site in 4–6 weeks, then operated on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-site/seat pricing plus agent1 builds and a run1 retainer. Illustrative; not engineering, safety, or financial advice.",
    seo: {
      title: "manufacture1 — agentic transformation for manufacturing | elan1",
      description:
        "manufacture1 puts an expert assistant on the floor and in engineering — maintenance, SOPs, spec/BoM, design — with safety controls. Composes supply1, agent1, and run1.",
    },
  },

  {
    slug: "realestate1",
    layer: "solution",
    name: "realestate1",
    industry: "Real estate & construction",
    tagline: "Faster deals. Cleaner data.",
    challenge:
      "Real estate and construction run on document-heavy, fragmented manual workflows — leases, listings, comps, and RFIs.",
    composedOf: ["finance1", "service1", "agent1"],
    accent: ACCENT.gold,
    useCases: [
      { title: "Lease abstraction", description: "Abstracts key terms into structured data, flagging ambiguities for review." },
      { title: "Listings & comps", description: "Generates listings and comparable analysis from property and market data." },
      { title: "RFI / submittal processing", description: "Summarizes the ask and routes for response (construction)." },
    ],
    compliance:
      "Legal and financial accuracy with human review on key terms, source grounding, and audit trails.",
    outcomes: [
      "Faster document processing",
      "Higher extraction accuracy",
      "Shorter deal cycles",
      "Cleaner, more complete data",
    ],
    starterEngagement:
      "The realestate1 Launchpad: lease abstraction live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-lease/seat pricing plus agent1 builds. Illustrative; not legal, real-estate, or financial advice.",
    seo: {
      title: "realestate1 — agentic transformation for real estate | elan1",
      description:
        "realestate1 turns document drudgery into structured speed — leases, listings, comps, RFIs — with human review. Composes finance1, service1, and agent1.",
    },
  },

  {
    slug: "edu1",
    layer: "solution",
    name: "edu1",
    industry: "Education",
    tagline: "More teaching time. Better personalization.",
    challenge:
      "Educators are overloaded with content creation, admin, and learner support, and need personalization at scale under student-data privacy rules.",
    composedOf: ["academy1", "service1", "market1"],
    accent: ACCENT.green,
    useCases: [
      { title: "Curriculum & lesson generation", description: "Produces standards-aligned lesson plans with objectives and activities." },
      { title: "Learner-support agent", description: "Answers learner questions at an age-appropriate level." },
      { title: "Admin automation", description: "Automates administrative tasks from the SIS, flagging exceptions." },
      { title: "Study tools", description: "Builds interactive study tools for a topic and level." },
    ],
    compliance:
      "Student-data privacy (FERPA-class), age-appropriateness, educator oversight, and standards grounding — validated by assure1.",
    outcomes: [
      "Educator time saved",
      "Higher learner engagement",
      "More admin automation",
      "Personalization at scale, with oversight",
    ],
    starterEngagement:
      "The edu1 Launchpad: curriculum/lesson generation or a learner-support agent live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-teacher/subscription pricing. Illustrative; not educational or compliance advice.",
    seo: {
      title: "edu1 — agentic transformation for education | elan1",
      description:
        "edu1 gives educators time back — standards-aligned content, admin automation, learner support — with student-data privacy. Composes academy1, service1, and market1.",
    },
  },

  {
    slug: "energy1",
    layer: "solution",
    name: "energy1",
    industry: "Energy & utilities",
    tagline: "Fewer outages. Tighter compliance.",
    challenge:
      "Utilities run safety-critical, asset-heavy operations under heavy regulation, fighting unplanned outages and compliance burden.",
    composedOf: ["run1", "assure1", "supply1"],
    accent: ACCENT.clayDeep,
    useCases: [
      { title: "Predictive asset maintenance", description: "Predicts maintenance needs from asset data and recommends for engineer review." },
      { title: "Compliance reporting", description: "Generates regulatory reports and flags gaps against requirements." },
      { title: "Operations optimization", description: "Optimizes operations against demand and constraints for operator review." },
    ],
    compliance:
      "Safety-critical controls (assist, never actuate), regulatory compliance, reliability, audit, and human control — validated by assure1.",
    outcomes: [
      "Fewer unplanned outages",
      "Higher asset reliability and OEE",
      "Fewer compliance findings",
      "More efficient operations",
    ],
    starterEngagement:
      "The energy1 Launchpad: a predictive asset-maintenance agent live at one site in 4–6 weeks, then operated on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-asset/site pricing plus an assure1 retainer and run1 operations. Illustrative; not engineering, safety, or financial advice.",
    seo: {
      title: "energy1 — agentic transformation for energy & utilities | elan1",
      description:
        "energy1 keeps critical infrastructure reliable and compliant — predictive maintenance, compliance reporting, operations — with safety governance. Composes run1, assure1, and supply1.",
    },
  },
];

/**
 * FY1 GTM-focus ordering, not a product ranking — every solution here is equally built and certified.
 * "Active" verticals (7: health1 · retail1 · manufacture1 · realestate1 · edu1 · telco1 · energy1) get
 * featured placement because that's where outbound effort goes this year. "Parked" verticals (bank1 ·
 * insure1 · gov1) stay live at their own URL, indexed, and fully described — just shown second, since a
 * regulatory-intensity or public-sector procurement motion doesn't fit our promoter-led sales cycle yet.
 * Never used to hide, noindex, or delete a route — see the `focus` field's doc comment in types.ts.
 */
export const activeSolutions = solutions.filter((s) => s.focus !== "parked");
export const parkedSolutions = solutions.filter((s) => s.focus === "parked");
/** Active first, parked last — the ordering every listing surface (nav, footer, homepage, index) should use. */
export const solutionsByFocus = [...activeSolutions, ...parkedSolutions];

export default solutions;
