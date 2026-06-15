// content/demos.ts — governed agent demo scenarios (WS1.6 + WS3.3). Each is illustrative, uses no real
// data, and mirrors the platform's run path (K2→K3→K4→K7→K5 approval→act→K6 audit→T2 Trust Mark).
export type Tone = "dim" | "tool" | "skill" | "out" | "govern" | "ok" | "mark";

export interface DemoStep {
  surface: string;
  text: string;
  tone: Tone;
  cost?: number; // illustrative tokens
}

export interface Scenario {
  id: string;
  label: string; // selector label
  title: string; // terminal title bar
  intro: string; // idle-state pitch
  gate: { title: string; body: string; approve: string };
  pre: DemoStep[]; // auto-stream → gate
  post: DemoStep[]; // after approval → done
}

export const DEMOS: Scenario[] = [
  {
    id: "customer1",
    label: "customer1 · outreach",
    title: "agent · customer1 · governed run",
    intro:
      "Watch a governed sales agent research an account, draft an on-brand renewal note, and stop for your approval before sending — every step audited.",
    gate: { title: "Approval required before the send", body: "The agent will not act on its own. A human decides.", approve: "Approve & send" },
    pre: [
      { surface: "K2", text: "run.started — customer1.outreach_drafting", tone: "dim", cost: 40 },
      { surface: "K3", text: "mcp.crm.get_account(“Acme Corp”) → renewal due, 14 signals", tone: "tool", cost: 120 },
      { surface: "K4", text: "skill resolved — brand_voice.acme", tone: "skill", cost: 30 },
      { surface: "K2", text: "drafted a renewal note, grounded in the account record", tone: "out", cost: 210 },
      { surface: "K7", text: "governance: consent not verified → human approval required", tone: "govern", cost: 20 },
    ],
    post: [
      { surface: "K3", text: "mcp.email.send → executed", tone: "ok", cost: 25 },
      { surface: "K6", text: "audit: hash-chained trail appended + verified", tone: "ok" },
      { surface: "T2", text: "assure1: eval passed → Trust Mark issued", tone: "mark" },
      { surface: "K2", text: "completed", tone: "ok" },
    ],
  },
  {
    id: "service1",
    label: "service1 · resolution",
    title: "agent · service1 · governed run",
    intro:
      "A support agent grounds a customer issue in the record, drafts a resolution, and routes the reply for human review before it goes out.",
    gate: { title: "Review before reply", body: "Customer-facing replies are human-reviewed. Nothing sends unsupervised.", approve: "Approve reply" },
    pre: [
      { surface: "K2", text: "run.started — service1.resolution", tone: "dim", cost: 38 },
      { surface: "K3", text: "mcp.helpdesk.get_ticket(#4821) + mcp.kb.search → policy found", tone: "tool", cost: 140 },
      { surface: "K2", text: "drafted a resolution, grounded in the KB + account", tone: "out", cost: 190 },
      { surface: "K7", text: "governance: customer-facing → human review required", tone: "govern", cost: 18 },
    ],
    post: [
      { surface: "K3", text: "mcp.helpdesk.reply → sent", tone: "ok", cost: 22 },
      { surface: "K6", text: "audit: chain appended + verified", tone: "ok" },
      { surface: "T2", text: "assure1: eval passed → Trust Mark", tone: "mark" },
      { surface: "K2", text: "completed", tone: "ok" },
    ],
  },
  {
    id: "finance1",
    label: "finance1 · payment",
    title: "agent · finance1 · governed run",
    intro:
      "A finance agent prepares a supplier payment grounded in the ledger — money never moves without a human, and the action is idempotent.",
    gate: { title: "A human decides the money", body: "Payments are human-approved and idempotent — no double-posting, ever.", approve: "Approve payment" },
    pre: [
      { surface: "K2", text: "run.started — finance1.ap_ar", tone: "dim", cost: 36 },
      { surface: "K3", text: "mcp.erp.list_open_items → invoice INV-2207 matched", tone: "tool", cost: 130 },
      { surface: "K2", text: "prepared a payment (idempotency_key set)", tone: "out", cost: 150 },
      { surface: "K7", text: "governance: money action → human approval required", tone: "govern", cost: 20 },
    ],
    post: [
      { surface: "K3", text: "mcp.erp.post_payment → executed (duplicate-safe)", tone: "ok", cost: 24 },
      { surface: "K6", text: "audit: chain appended + verified", tone: "ok" },
      { surface: "T2", text: "assure1: eval passed → Trust Mark", tone: "mark" },
      { surface: "K2", text: "completed", tone: "ok" },
    ],
  },
  {
    id: "bank1",
    label: "bank1 · KYC triage",
    title: "agent · bank1 · governed run",
    intro:
      "A banking agent triages a KYC case grounded in the system of record. Fraud signals are flagged for a human — never auto-denied.",
    gate: { title: "A human decides the account", body: "AML/KYC hits are flagged, never auto-acted. The decision stays human.", approve: "Acknowledge & route to officer" },
    pre: [
      { surface: "K2", text: "run.started — bank1.kyc_aml_triage", tone: "dim", cost: 42 },
      { surface: "K3", text: "mcp.kyc.verify + mcp.core_banking.lookup → 1 risk signal", tone: "tool", cost: 160 },
      { surface: "K2", text: "summarized the case, grounded in the record", tone: "out", cost: 180 },
      { surface: "K7", text: "governance: fraud flagged — NOT auto-denied → human decides", tone: "govern", cost: 22 },
    ],
    post: [
      { surface: "K5", text: "routed to a human officer with the evidence", tone: "ok", cost: 10 },
      { surface: "K6", text: "audit: chain appended + verified", tone: "ok" },
      { surface: "T2", text: "assure1: eval passed → Trust Mark", tone: "mark" },
      { surface: "K2", text: "completed", tone: "ok" },
    ],
  },
];

export const DEFAULT_SCENARIO = DEMOS[0];
