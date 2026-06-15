// content/usecases.ts — programmatic vertical × use-case pages (WS4.2). Mirrors the platform's
// programmatic packs (X5): each is a focused, high-intent landing surface generated from config.
export interface UseCase {
  slug: string; // <vertical>-<usecase>
  vertical: string; // solution slug for internal linking
  verticalLabel: string;
  useCase: string;
  audience: string;
  title: string;
  summary: string;
  signature: string; // the inherited governance signature
  accent: string;
}

export const USE_CASES: UseCase[] = [
  { slug: "insure1-claims-triage", vertical: "insure1", verticalLabel: "Insurance", useCase: "claims triage", audience: "insurers", title: "Agentic claims triage for insurers", summary: "Triage claims grounded in the policy document; a human decides every claim; fraud is flagged, never auto-denied.", signature: "human-decides-claims · fraud-flagged · IRDAI", accent: "#46cdd6" },
  { slug: "retail1-demand-forecasting", vertical: "retail1", verticalLabel: "Retail", useCase: "demand forecasting", audience: "grocery retail", title: "Demand forecasting for grocery retail", summary: "Sense demand and recommend replenishment grounded in the inventory record; a human approves any commitment.", signature: "truthful-marketing · human-approved commitments", accent: "#e3b25c" },
  { slug: "health1-patient-followup", vertical: "health1", verticalLabel: "Healthcare", useCase: "patient follow-up", audience: "clinics", title: "Patient follow-up coordination for clinics", summary: "Coordinate follow-ups as decision-support only; a clinician signs every clinical-adjacent action.", signature: "decision-support-only · clinician sign-off · DPDP", accent: "#3fae6b" },
  { slug: "bank1-kyc-onboarding", vertical: "bank1", verticalLabel: "Banking", useCase: "KYC onboarding", audience: "banks", title: "Agentic KYC onboarding for banks", summary: "Ground each case in the system of record; a human decides every account; AML/KYC hits are flagged, never auto-acted.", signature: "human-decides-money · verified-data · RBI/AML", accent: "#df8c64" },
  { slug: "telco1-noc-triage", vertical: "telco1", verticalLabel: "Telecom", useCase: "NOC triage", audience: "operators", title: "Agentic NOC triage for telecom", summary: "Correlate alarms and recommend remediation; a human engineer acts on the network — agents advise, never auto-act.", signature: "humans-act-on-network · TRAI/DoT", accent: "#a394ff" },
  { slug: "manufacture1-predictive-maintenance", vertical: "manufacture1", verticalLabel: "Manufacturing", useCase: "predictive maintenance", audience: "plants", title: "Predictive maintenance for manufacturing", summary: "Predict failures and recommend; a technician acts — advisory only, never writing to OT/control systems.", signature: "humans-control-machines · OT/IT separation · traceability", accent: "#46cdd6" },
];

export const useCaseBySlug = (slug: string) => USE_CASES.find((u) => u.slug === slug);
