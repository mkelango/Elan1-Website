// content/crossapp.ts — the cross-app workflows.
//
// These are the paths where one app's decision becomes another app's work: a case becomes a refund,
// a stockout becomes a replenishment, approved time becomes an invoice. They are the reason a suite
// on one core is different from several products that integrate.
//
// SOURCE: the 21 flows registered in the platform (`_CROSS_FLOWS` / `SPINE_FLOWS`, live import,
// len 21), with step builders in crossapp/crossapp/flows.py.
//
// 🚨 HONESTY NOTE — read before editing. These 21 are DECLARED and loadable. Which of them run in a
// given tenant is a wave decision: agents are enabled deliberately, in stages, and most consequential
// agents are off by default. Under the current baseline wave, one of the 21 runs end-to-end. So this
// file says "declared" and "which run in your tenant is a rollout decision" — it must never say all
// 21 are running, and must never imply a number of live flows. Staged enablement is the product
// behaviour, not a shortfall; describe it as the control it is.

export interface CrossAppFlow {
  /** The registered flow id in the platform. */
  id: string;
  /** How a buyer would name it. */
  name: string;
  /** The handoff, in one line — what crosses the boundary. */
  handoff: string;
}

export const CROSS_APP_FLOWS: CrossAppFlow[] = [
  { id: "order_to_cash", name: "Order → Cash", handoff: "A confirmed order becomes an invoice and a receivable, without a re-key." },
  { id: "procure_to_ap", name: "Procure → Pay", handoff: "An approved purchase order becomes a matched, payable invoice." },
  { id: "case_to_refund", name: "Case → Refund", handoff: "A resolved service case becomes a refund that finance still has to approve." },
  { id: "stockout_to_replenish", name: "Stockout → Replenish", handoff: "A shortfall in the order book becomes a purchase order against an approved vendor." },
  { id: "quote_to_cash", name: "Quote → Cash", handoff: "An accepted quote becomes an order, then a bill." },
  { id: "deal_to_delivery", name: "Deal → Delivery", handoff: "A won deal becomes a staffed, scheduled project." },
  { id: "project_to_cash", name: "Project → Cash", handoff: "Approved billable time becomes a client invoice." },
  { id: "hire_to_provision", name: "Hire → Provision", handoff: "An accepted offer becomes accounts, access and an onboarding plan." },
  { id: "comp_to_payroll", name: "Comp → Payroll", handoff: "An approved compensation change reaches payroll as a governed write." },
  { id: "campaign_to_pipeline", name: "Campaign → Pipeline", handoff: "Demand generated becomes qualified pipeline in the CRM." },
  { id: "campaign_to_spend", name: "Campaign → Spend", handoff: "Committed campaign spend lands in the finance ledger." },
  { id: "return_to_refund", name: "Return → Refund", handoff: "A received return becomes a refund within what was captured." },
  { id: "insight_to_replenish", name: "Insight → Replenish", handoff: "A demand signal becomes a replenishment proposal." },
  { id: "insight_to_collections", name: "Insight → Collections", handoff: "An ageing signal becomes a collections action for review." },
  { id: "quality_recall_to_service", name: "Recall → Service", handoff: "A quality hold becomes proactive customer outreach." },
  { id: "voc_to_retention", name: "Feedback → Retention", handoff: "A satisfaction signal becomes a retention play." },
  { id: "resource_gap_to_hire", name: "Resource gap → Hire", handoff: "An unfillable delivery gap becomes an approved requisition." },
  { id: "expense_to_reimburse", name: "Expense → Reimburse", handoff: "An approved expense becomes a reimbursement." },
  { id: "event_to_pipeline", name: "Event → Pipeline", handoff: "Event attendance becomes attributed pipeline." },
  { id: "case_to_fieldwork", name: "Case → Fieldwork", handoff: "A case that needs someone on site becomes scheduled work." },
  { id: "onboarding", name: "Customer onboarding", handoff: "A won customer becomes a sequenced onboarding across service and delivery." },
];
