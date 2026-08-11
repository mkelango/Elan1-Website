// content/products.ts
// The 1 Suite — ten agentic apps on one core, plus enterprise1, the backbone.
// Grouped into five categories in content/categories.ts, which is the single source of that mapping.
// All built, governed (human approval on consequential actions), and durable. Horizontal by function, reused across verticals.
// Source: elan1 offering catalog + product playbooks (Vols. 7–13).

import { Product, ACCENT } from "./types";
// A platform count is NEVER hand-typed into copy — see content/platform-facts.ts, rule 1.
// insight1's source-app count lives there with its derivation, so this file cannot drift from it.
//
// 🚨 DO NOT IMPORT FROM ./categories HERE. categories.ts imports THIS file, so adding the reverse
// edge closes a cycle — and a cycle here is not a lint warning, it is a blank site. An earlier
// version of this block imported `numberWord` from categories.ts to spell the count. `tsc` passed,
// `vite build` passed, and every page rendered EMPTY at runtime with
// "ReferenceError: Cannot access 'NUMBER_WORDS' before initialization": categories.ts had not
// finished initialising when this module read from it. platform-facts.ts imports nothing, so it is
// always safe to read here; the spelling is done locally instead.
import { PLATFORM_FACTS } from "./platform-facts";

const INSIGHT_SOURCES = PLATFORM_FACTS.insightSourceApps.value;
/** Spelled locally — see the cycle warning above. Falls back to digits outside the small range. */
const SPELLED = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const INSIGHT_SOURCES_WORD = SPELLED[INSIGHT_SOURCES] ?? String(INSIGHT_SOURCES);

export const products: Product[] = [
  {
    slug: "sales1",
    layer: "product",
    name: "sales1",
    tagline: "The agentic CRM that sells with you.",
    businessFunction: "Sales & CRM",
    status: "live",
    accent: ACCENT.clay,
    hero: {
      headline: "From first touch to paid invoice. The commitments stop at a person.",
      subhead:
        "29 object types, 13 sales agents, a verification judge. Closed Won, commission payout, renewal, order release — all stop at human approval.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Reps retype, records drift from calls.",
      "Quote totals, discounts, commissions are typed by hand.",
      "Forecast rolled up from edited fields — the same guess twice.",
      "AI drafting easy. AI near discounts — not.",
    ],
    capabilities: [
      {
        title: "deal_closer — the close motion",
        description:
          "Proposes next move. Advancing a stage writes immediately; Closed Won stops for human.",
      },
      {
        title: "quote_proposal — catalog-grounded quotes and CPQ",
        description:
          "Prices from product master. Within-authority discounts apply; deeper ones escalate.",
      },
      {
        title: "outbound_sdr — the single outreach path",
        description:
          "Researches, drafts, handles replies. Send waits for one-tap confirm.",
      },
      {
        title: "forecast — the grounded roll-up",
        description:
          "Stage-weighted opportunities by category. Rep's commit beside, never sourcing it.",
      },
      {
        title: "o2c_fulfil — order to cash as one governed move",
        description:
          "Confirmed order triggers supply1 shipment and finance1 receivable as one compensating move.",
      },
      {
        title: "crm_hygiene — duplicates, proposed not merged",
        description:
          "Daily duplicate detection. Merge waits for human approval.",
      },
    ],
    outcomes: [
      "Less field-keeping, more selling",
      "Quotes, discounts, commissions tie to record",
      "Forecast from open deals, not optimism",
      "Auditable approval trail end-to-end",
    ],
    integrations: [
      "CRM seam — sales1's own system of record",
      "Email, calendar — send consent-checked, one-tap confirmed",
      "Voice, meeting capture — declared, not live",
      "LinkedIn, WhatsApp — own send-confirm each",
      "Web research — public context",
      "Enrichment — cites provider, never overwrites human-set field",
      "finance1, supply1, project1, service1, market1 — governed sagas",
    ],
    suiteFit:
      "Demand hub composing both ways: outbound to finance1, project1, supply1, service1; inbound from market1, service1. Each step keeps own approval gate.",
    trust:
      "Agent proposes, human commits. Eight actions require approval: Closed Won, order-to-cash, commission, renewal, blanket release, bulk import, any agent move, above-ceiling discount. Approval token bound to action and payload hash. Immediate writes named: stage move, next step, risk flag, note, score, route, enrollment, within-authority discount. All audit via hash-chained trail.",
    workforce: {
      registered: 14,
      launchWave: 4,
      note: "Thirteen agents plus the pre-write judge. Four ship enabled; a function outside a tenant's set is refused before it acts, and a suspend switch overrides the whole set.",
    },
    systemOfRecord: {
      objectTypes: 29,
      note: "sales1 owns its records rather than syncing someone else's — lead through quote, order, subscription and commission. A create outside the 29 is rejected by name.",
    },
    copilots: [
      { name: "Conversation intelligence", mode: "acts-through-a-gate", does: "Talk ratio, next steps, risk signals, MEDDIC from transcript." },
      { name: "Deal intelligence", mode: "advisory", does: "Win probability from stage, engagement, age." },
      { name: "RevOps analytics", mode: "advisory", does: "Win rate, stage mix, deal age, values. Computed, never stored." },
      { name: "Lead score and enrich", mode: "acts-through-a-gate", does: "Scores live, shows matched criteria. Never overwrites human value." },
      { name: "Guided playbook", mode: "advisory", does: "Stage playbook: guidance only." },
      { name: "Cadence worklist", mode: "advisory", does: "Due steps, due-first. Send needs confirm." },
    ],
    automations: [
      { name: "account_research", trigger: "cron:nightly", does: "Keeps the 360 account brief current. Read and enrich only." },
      { name: "crm_hygiene", trigger: "cron:07:00", does: "Detects duplicates. The merge is human-confirmed." },
      { name: "forecast", trigger: "cron:weekly", does: "Stage-weighted roll-up with gap-to-quota. Read-only." },
      { name: "deal_strategy", trigger: "event:stage.changed", does: "Maps stakeholders and drafts the battlecard and win plan. Analyse and draft only." },
      { name: "inbound_sdr", trigger: "event:lead.created", does: "Enriches, scores, routes and books. First touch is confirmed." },
      { name: "meeting", trigger: "event:call.ended", does: "Transcribes and drafts follow-ups. The judge checks them against the transcript." },
      { name: "cs_churn", trigger: "event:usage.dropped", does: "Health-scores the account, flags churn risk, drafts a QBR." },
      { name: "orchestrator", trigger: "event:*", does: "Sequences specialists and runs the judge before commit-or-queue. It never acts unsupervised on a consequential step." },
    ],
    skills: {
      count: 6,
      note: "Versioned, git-tracked manifests owned by the agents that use them — cadence governance, brand voice, MEDDIC, ICP scoring, territory rules.",
    },
    mcpSeams: [
      { name: "CRM", status: "live", note: "The native record seam, declared by 13 of 14 specs. Four operations are consequential: merge, generate quote, accept quote, delete." },
      { name: "Email · calendar", status: "declared", note: "Every send is consent-checked and one-tap confirmed." },
      { name: "Voice · meet", status: "declared", note: "Call and meeting capture — declared, pending credentials." },
      { name: "Web", status: "modelled", note: "Firmographic and news research behind a deterministic adapter." },
    ],
    dashboards: [
      "Sales dashboard — weighted forecast, pipeline, open opportunities, lead conversion.",
      "Pipeline — the live kanban; a drag is a governed write, Closed Won routes to a human gate.",
      "Forecast — the stage-weighted roll-up and gap-to-quota beside the rep's commit.",
      "Engagement — the cadence worklist and conversation intelligence.",
      "Agents and automation — every agent proposal, and what happened to it.",
    ],
    refusals: [
      "release {amount} exceeds the remaining commitment {remaining} — refusing to over-commit",
      "no list value to discount — refusing an ungrounded discount",
      "no grounded base to commission — refusing an ungrounded accrual",
      "order total must tie to the quote subtotal — refusing an ungrounded order",
      "recipient is do-not-contact / opted out",
      "a cancelled subscription cannot be renewed",
      "opportunity is already {status} — it cannot be re-closed",
    ],
    crossAppFlows: [
      "quote_to_cash — a won deal opens a finance1 receivable",
      "deal_to_delivery — a won deal charters a project1 engagement",
      "order_to_cash — one confirmed order drives a supply1 shipment and a finance1 invoice as one compensating move",
      "onboarding_handoff — account context passes to service1",
      "campaign_to_pipeline · event_to_pipeline — market1 hands in a lead or registration",
      "voc_to_retention — service1 hands in a churn signal",
    ],
    pricingTiers: [
      { name: "Per seat", description: "For teams adopting agentic selling, billed per rep." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "sales1 — the agentic CRM where a human still commits | elan1",
      description:
        "A CRM record with 29 object types, thirteen sales agents and a verification judge. Closed Won, a commission payout and an order release each stop at a human approval.",
    },
  },

  {
    slug: "service1",
    layer: "product",
    name: "service1",
    tagline: "Resolve, don't deflect.",
    businessFunction: "Customer Service",
    status: "live",
    accent: ACCENT.gold,
    hero: {
      headline: "The service desk where the agent drafts and a person sends.",
      subhead:
        "19 object types, 11 agents that summarise, triage, score, draft. Reply queued, never sent. Refund, account change, close require human approval.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Deflection bot answers confidently with no source.",
      "Support numbers stored as counters, dashboard drifts from case book.",
      "AI reply that sends itself — no recourse when wrong.",
      "Complaint queue rebuilt in every system.",
    ],
    capabilities: [
      {
        title: "answer — grounded, cited answers",
        description:
          "Answers from knowledge only, cites every claim. Says so if unsupported.",
      },
      {
        title: "resolution — the case owner",
        description:
          "Owns helpdesk, CRM, knowledge seams. Draft marked for send; person sends.",
      },
      {
        title: "triage_routing and escalation — the SLA spine",
        description:
          "Classifies intent, urgency, sentiment. Routes to available team, starts SLA clock.",
      },
      {
        title: "Deflection and governed resolution",
        description:
          "Self-service above confidence floor. Below: routes to human.",
      },
      {
        title: "quality and insight_voc — scorecards and upstream fixes",
        description:
          "Scores resolutions, clusters into upstream fixes. Scorecards join survey to assignee at read.",
      },
      {
        title: "knowledge_author — the corpus, kept honest",
        description:
          "Weekly sweep for gaps, drafts articles from resolved cases.",
      },
    ],
    outcomes: [
      "Answers traced to documents; uncited ones visible",
      "Refund, account change, close each carry approver and audit row",
      "Support figures computed from case book at read",
      "One desk across suite; disputes land in governed queue",
    ],
    integrations: [
      "Helpdesk seam — tickets, customer 360, orders, SLA, notes, status",
      "Knowledge seam — retrieval with citations",
      "CRM seam — read account, update record",
      "Email, WhatsApp — modelled adapters",
      "Approved refund posts finance1 credit note; churn reaches sales1",
    ],
    suiteFit:
      "Post-sale hub: outbound to finance1, sales1, project1; inbound from sales1, people1, supply1. Money legs terminate at finance1's gate. Vertical packs open cases here.",
    trust:
      "Refusal in data layer. Approved refund posts finance1 credit idempotently. Article publish is separate human decision. Trust Mark eval-gated, auto-revoked if evals expire.",
    workforce: {
      registered: 11,
      launchWave: 4,
      note: "Eleven agents including the pre-write judge. Four ship enabled — the read-and-analyse ones. The consequential agents stay off until an operator enables them.",
    },
    systemOfRecord: {
      objectTypes: 19,
      note: "The service desk itself: cases and messages, SLA policies and business hours, knowledge articles and macros, surveys and quality reviews, routing rules and entitlements.",
    },
    copilots: [
      { name: "Case copilot", mode: "acts-through-a-gate", does: "Summarises the thread and drafts a cited reply. The send is a separate human action." },
      { name: "Resolution copilot", mode: "acts-through-a-gate", does: "Proposes the resolution and reply together, the status shown as proposed, not applied." },
      { name: "Escalation risk", mode: "advisory", does: "Scores which open cases are heading for a breach, from the SLA clock and the thread." },
      { name: "Deflection assistant", mode: "advisory", does: "Shows the confidence and matched articles behind a would-be deflection." },
      { name: "Service analytics", mode: "advisory", does: "First response, resolution, reopen and deflection rates, each reporting its denominator." },
      { name: "At-risk worklist", mode: "advisory", does: "The queue that needs attention now, ranked by breach proximity." },
    ],
    automations: [
      { name: "SLA-breach escalation", trigger: "event:case.sla_breached", does: "Emitted by the record's own write path. Seeded disabled and gated." },
      { name: "triage_routing", trigger: "event:ticket.created", does: "Classifies, routes to an available team, starts the SLA clock." },
      { name: "resolution", trigger: "event:message.received", does: "Drafts the next reply onto the case." },
      { name: "escalation", trigger: "event:sla.breaching", does: "Opens a human ticket with the account and what was tried." },
      { name: "knowledge_author", trigger: "cron:weekly", does: "Drafts articles from resolved cases. Publishing stays human." },
      { name: "quality", trigger: "cron:weekly", does: "Auto-QA over resolutions, writing quality reviews." },
      { name: "insight_voc", trigger: "cron:weekly", does: "Clusters cases into upstream fixes and volume drivers." },
      { name: "workforce", trigger: "cron:weekly", does: "Forecasts capacity against the queue." },
      { name: "orchestrator", trigger: "event:*", does: "The router across every topic the desk emits." },
    ],
    skills: {
      count: 10,
      note: "Case triage and sentiment scoring, the cited-reply copilot, escalation rules, quality rubrics and voice-of-customer clustering.",
    },
    mcpSeams: [
      { name: "Helpdesk", status: "modelled", note: "Declared by nine of eleven agents: read tickets, 360 and SLA status; write notes and status." },
      { name: "Knowledge", status: "modelled", note: "Retrieval that returns citations. Vector-backed in a full deployment." },
      { name: "CRM", status: "live", note: "The same sales1 system of record, not a copy." },
      { name: "Email · WhatsApp", status: "modelled", note: "A drafted reply is stored for a human to send, not dispatched." },
    ],
    dashboards: [
      "Service dashboard — open cases, SLA at risk, urgent count, CSAT.",
      "Channel inbox — one queue across email, WhatsApp, voice and web; refund and close are human-gated.",
      "Cases — every case with its fields, worklogs and entitlement.",
      "Knowledge and macros — the corpus the answer agent cites.",
      "Scorecards — per-agent quality, joining a survey to the assignee at read.",
      "Voice of customer — case clusters and the upstream fixes they imply.",
    ],
    refusals: [
      "'{action}' is a sensitive action — requires human approval (K5)",
      "a refund needs a positive amount — service1 never posts an unspecified amount",
      "no confident KB match — a human takes this",
      "a PROPOSED resolution — a human confirms the resolve + send; the agent never auto-closes",
      "only a resolved case seeds a KB article",
      "no resolution message to distill",
    ],
    crossAppFlows: [
      "case_to_refund — an approved refund posts to finance1, where the money leg terminates",
      "voc_to_retention — a churn signal reaches sales1's retention agent",
      "case_to_fieldwork — a case needing field work charters a project1 engagement",
      "onboarding_handoff — sales1 hands over account context",
      "hire_to_provision — people1 provisioning runs through the service queue",
      "quality_recall_to_service — supply1 hands over a batch defect or recall",
    ],
    pricingTiers: [
      { name: "Per seat / per resolution", description: "Scales with your support volume." },
      { name: "Enterprise", description: "Governance, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "service1 — agentic customer service, human-gated | elan1",
      description:
        "Agents triage, score and draft cited replies on service1's own system of record. A refund, an account change or a close is refused without a human approval.",
    },
  },

  {
    slug: "finance1",
    layer: "product",
    name: "finance1",
    tagline: "Agents draft. A human releases the money.",
    businessFunction: "Finance & Accounting",
    status: "live",
    accent: ACCENT.cyan,
    hero: {
      headline: "The close runs on agents. The money runs through a human.",
      subhead:
        "33 object types, 15 agents draft journals, match statements, capture payables, assemble GST returns. Payment release requires human approval.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Month-end close by hand — nobody proves period ties out.",
      "Payables invoices keyed twice; duplicate found after paid.",
      "Reports rebuilt in spreadsheet — board deck drifts from ledger.",
      "Finance automation is all-or-nothing.",
    ],
    capabilities: [
      {
        title: "close — month-end close, drafted",
        description:
          "Checklist, accruals, journal drafts. Tasks form dependency graph. Agent drafts; human posts.",
      },
      {
        title: "ap — capture, three-way match, payment run",
        description:
          "Deterministic extraction. No bill matched without three-way match to supply1 order.",
      },
      {
        title: "ar and credit_control — cash in",
        description:
          "Cash allocation by reference, amount, oldest-first. Collections via dunning ladder.",
      },
      {
        title: "treasury and reconciliation — the cash position, computed",
        description:
          "Book balance from statement movements. 13-week forecast. Read-only.",
      },
      {
        title: "compliance — India statutory, assembled from the ledger",
        description:
          "GSTR-1, GSTR-3B from GST invoices. E-invoice, e-way bills, TDS.",
      },
      {
        title: "Assets and depreciation — a finance1 module, not a second app",
        description:
          "Asset lives in ledger, depreciates on engine. Tie-out register included.",
      },
    ],
    outcomes: [
      "A close you can defend: the period cannot lock while a gating task is open",
      "The duplicate vendor invoice is refused at the write, not found on the bank statement",
      "Statements that cannot disagree with the ledger, because they are computed from it",
      "Automation you enable one function at a time, and disable the same way",
    ],
    integrations: [
      "The ERP seam — the shared accounting connector. finance1 declares none of its own.",
      "India statutory gateways — one port, two adapters, each provider's mode surfaced.",
      "Bank feed — a line already ingested is skipped, so re-pulling is safe.",
      "supply1 purchase orders — read for the three-way match before a bill is approved.",
      "A governed tool surface — audit-prep runs through the same gates as the console.",
    ],
    suiteFit:
      "finance1 is where the suite settles. service1, project1, people1, sales1 and commerce1 each post their own legs, tagged with their source and landing through finance1's governed writer, never a forked ledger. All ten industry packs settle into the same ledger, and a guard test fails structurally if a pack posts a finance leg without declaring the dependency.",
    trust:
      "Money does not move on an agent's say-so, and the refusals are in code rather than in a policy document. Beyond those listed here, the write path also blocks a duplicate vendor invoice number, a bill approved without a three-way match, an invoice that would breach a customer's credit limit, and a period lock while reconciliations are open. Human-gated: releasing a payment, any credit or debit note, a ledger posting, a reconciliation close, a close task, a GST filing, a receivable write-off, an expense approval, an asset disposal, any delete. Drafting is immediate and audited. Every tool-using agent carries the not-financial-advice disclosure skill, and the safety eval scores advice by shape rather than by a phrase list — an output carrying no prose is reported as not measurable rather than as passed.",
    workforce: {
      registered: 15,
      launchWave: 6,
      note: "Fifteen agents including the pre-write judge. Six ship enabled; a disabled function is blocked before it acts.",
    },
    systemOfRecord: {
      objectTypes: 33,
      note: "The ledger and everything that posts to it: accounts and journals, invoices, payments, credit and debit notes, bills, bank transactions, reconciliations, close tasks, budgets, the India statutory set and fixed assets.",
    },
    copilots: [
      { name: "Action copilot", mode: "acts-through-a-gate", does: "Returns the drafted action with its ledger effect shown. Anything consequential queues." },
      { name: "Controller copilot", mode: "advisory", does: "Answers from the posted ledger, citing the records it computed from." },
      { name: "Conversational finance in assistant1", mode: "acts-through-a-gate", does: "assistant1 holds no writer, so a finance proposal lands at finance1's own gate." },
    ],
    automations: [
      { name: "Overdue-AR dunning", trigger: "event:invoice.overdue", does: "Emitted by the write path when an invoice folds to overdue." },
      { name: "Month-end close prep", trigger: "event:period.close", does: "Emitted when a close run is kicked off." },
      { name: "controls_audit", trigger: "cron:nightly", does: "Sweeps the controls and reports exceptions." },
      { name: "fx", trigger: "cron:monthly", does: "Proposes the revaluation. The journal still posts through maker-checker." },
      { name: "compliance", trigger: "cron:monthly", does: "Runs the statutory and GST checks against the ledger." },
      { name: "ap · credit_control", trigger: "event:invoice.received", does: "Capture and code the bill; check credit exposure." },
      { name: "reconciliation · treasury", trigger: "event:statement.imported", does: "Auto-match, then recompute the cash position. Both read-only." },
      { name: "expense_audit", trigger: "event:expense.submitted", does: "Screens the claim against policy before a human approves." },
      { name: "orchestrator", trigger: "event:*", does: "The router across every finance topic." },
    ],
    skills: {
      count: 12,
      note: "Accounting rules requiring every entry to balance and every figure to be grounded, payables capture, three-way match, dunning ladders, GST assembly and the not-financial-advice disclosure.",
    },
    mcpSeams: [
      { name: "ERP", status: "modelled", note: "The only connector finance1 declares, used by 14 of 15 specs. Modelled, not live." },
      { name: "India statutory", status: "declared", note: "GSTN, IRP and NIC rails behind one port. Each provider reports its own mode." },
      { name: "Bank feed", status: "modelled", note: "Statement ingestion, idempotent per line per account." },
    ],
    dashboards: [
      "Finance dashboard — cash net change, tri-state trial-balance tie-out, net income, overdue exposure and open draft journals, read from the same endpoints as the statements screen.",
      "Financial statements — P&L, balance sheet and cash flow, computed from the posted ledger.",
      "Payables — capture, three-way match, and the payment run that stops at a human.",
      "Receivables and collections — aging, the dunning ladder and promises-to-pay.",
      "Banking and reconciliation — certification limited to a spotless account.",
      "Close — the task graph, where the period will not lock while a gating task is open.",
      "India statutory — GSTR assembly, e-invoicing and e-way bills, each badged modelled or live.",
      "Assets — the register, depreciation schedule and tie-out.",
    ],
    refusals: [
      "money action requires an idempotency_key (no double-posting)",
      "no autonomous money — a payment is human-approved (Tier-3)",
      "entry does not balance (Σ debits != Σ credits)",
      "segregation of duties: the drafter cannot approve their own entry",
      "posting a journal entry is human-approved (maker-checker)",
      "journal entry would push account {code} over its {period} budget",
      "payment allocation ({total}) exceeds the invoice amount ({invoiced})",
      "credit note ({total}) exceeds the invoice amount ({invoiced})",
    ],
    crossAppFlows: [
      "procure_to_ap — supply1 hands a proposed reorder's value to the payables gate",
      "case_to_refund — a service1 refund posts a credit note",
      "project_to_cash — project1 revenue events, retainers and expenses post receivables",
      "quote_to_cash · order_to_cash — sales1 and commerce1 settle their sell side here",
      "campaign_to_spend — market1's recorded campaign cost lands at the payables gate",
      "All ten industry packs settle into this ledger; a pack posting a finance leg without declaring the dependency fails a guard test",
    ],
    pricingTiers: [
      { name: "Per seat", description: "For finance teams, billed per user." },
      { name: "Enterprise", description: "Controls, audit, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "finance1 — agentic finance with the money gate intact | elan1",
      description:
        "A double-entry record with 15 declared agents that draft the close, capture payables and assemble GST returns. Releasing a payment is refused without a human approval.",
    },
  },

  {
    slug: "supply1",
    layer: "product",
    name: "supply1",
    tagline: "Approved vendors only. No autonomous spend.",
    businessFunction: "Supply Chain & Procurement",
    status: "live",
    accent: ACCENT.green,
    hero: {
      headline: "The agents plan. A human commits.",
      subhead:
        "Demand planning, replenishment, procurement, inventory and quality on its own system of record — 32 object types. Nine agents compute and draft; a purchase order can only name an approved vendor, and submitting one is a human decision carrying an idempotency key.",
      primaryCta: "Book a demo",
    },
    problem: [
      "On-hand, on-order and available-to-promise disagree, because stock truth lives in spreadsheets.",
      "The approved-vendor rule is a policy document, not a check on the write.",
      "Replenishment quantities are typed by hand, and nobody can reconstruct them.",
      "Receipts, batches and serials are tracked apart from valuation, so ledger and goods drift.",
    ],
    capabilities: [
      {
        title: "demand_planner — demand planning",
        description:
          "Forecasts per-SKU demand from that SKU's committed-order history. Too little history comes back ungrounded — \"no committed-PO history for sku\" — never as an invented number. Read-only; the projected gap is what replenishment plans against.",
      },
      {
        title: "reorder — replenishment",
        description:
          "Compares projected availability against each reorder rule's minimum and maximum, and drafts consolidated orders by preferred supplier. Drafts only — the spec is declared requires-approval at the human-led tier, and each drafted order still meets the approved-vendor check.",
      },
      {
        title: "procurement — the buying surface",
        description:
          "Purchase orders, RFQs ranked from real quotations, requisitions, goods receipts with three-way match, blanket orders with a computed cap. The judge runs before the write.",
      },
      {
        title: "supplier_risk — the approved-vendor registry",
        description:
          "Keeps the registry and scorecards, scoring delivery, quality and single-source concentration. An unapproved supplier is never returned as recommended.",
      },
      {
        title: "inventory — warehouses, transfers and valuation",
        description:
          "Per-warehouse stock with computed available-to-promise, governed transfers, and a stock ledger where every valued movement carries a cost replayed rather than typed. Handing the value to finance1 drafts an inventory journal a finance1 human posts.",
      },
      {
        title: "quality — incoming QC, recalls and returns",
        description:
          "Inspects receipts, holds batches, drives first-expiry-first-out and return-to-vendor. A recall hands to service1, which owns the customer outcome.",
      },
    ],
    outcomes: [
      "Buying you can reconstruct: an approved supplier, an approver and an idempotency key",
      "Replenishment that traces to a computed projection — and an honest \"not enough history\" when there is none",
      "One stock truth across warehouses, because the write refuses what would break it",
      "Inventory value re-derivable by replaying the ledger — the record the match reads",
    ],
    integrations: [
      "The inventory seam — stock, demand signals, draft orders and reorder points",
      "The supplier seam — reads plus idempotent, human-approved commitments",
      "E-procurement — a fetched catalog row becomes real pricing only through the governed writer",
      "WMS / 3PL — a fetched count becomes a record only through the governed reconciliation writer",
      "In-suite: finance1 for the three-way match, service1 for recalls, commerce1 for stock truth",
    ],
    suiteFit:
      "supply1 is the stock-truth system the rest of the suite reads against. finance1's three-way match runs against the supply1 order and its receipt; a commerce1 replenishment lands as a draft against an already-approved vendor, and submitting stays supply1's human-approved step. The retail1, manufacture1 and energy1 packs compose supply1's own agents as configuration, not forks.",
    trust:
      "Approved-vendor-only is a check on the write: a purchase order naming a supplier that is not approved, or is blocked or suspended, is refused at the system of record. The same check guards subcontract and blanket orders, and awarding an RFQ or sourcing a requisition passes through it. Submitting is a separate decision — the store refuses with \"no autonomous commitment — a PO is human-approved\", and refuses again without an idempotency key; a replay returns the original receipt and orders nothing. Beyond the refusals listed here, the write path also blocks a transfer beyond available-to-promise, a return beyond the net received, a defect above the inspected sample, and a second allocation of a serial. The Trust Mark is gated on an eight-set eval battery scored against live records, and drift auto-revokes it. Figures are decision support, not advice.",
    workforce: {
      registered: 9,
      launchWave: 3,
      note: "Nine agents including the pre-write judge. The wave enables the read-and-analyse three — inventory, supplier risk and analytics; the two commitment agents are deliberately not in it, and a run of a disabled function is refused by name.",
    },
    systemOfRecord: {
      objectTypes: 32,
      note: "The deepest record in the suite: purchase orders, requisitions, RFQs and quotations; receipts, subcontracting and blanket orders; warehouses, transfers, serials and batches; landed cost and the valued stock ledger.",
    },
    copilots: [
      { name: "Replenishment copilot", mode: "acts-through-a-gate", does: "The projected gap per SKU with the projection's inputs visible, and the drafted orders." },
      { name: "Sourcing copilot", mode: "advisory", does: "Ranks live quotations, showing which suppliers are on the approved list." },
      { name: "Supplier-risk copilot", mode: "advisory", does: "Scores delivery, quality and concentration, naming the single-source dependencies." },
      { name: "Control-tower copilot", mode: "advisory", does: "Triages open exceptions into a priority order. Resolving stays a person's move." },
    ],
    automations: [
      { name: "reorder", trigger: "event:stock.low", does: "Drafts replenishment when projected availability falls under the rule." },
      { name: "procurement", trigger: "event:po.due", does: "Works the buying surface as orders come due." },
      { name: "inventory", trigger: "cron:nightly", does: "Recomputes availability and valuation across warehouses." },
      { name: "supplier_risk", trigger: "cron:weekly", does: "Rescores the supplier base and refreshes the scorecards." },
      { name: "demand_planner", trigger: "cron:weekly", does: "Refreshes the forecast, refusing SKUs with too little history." },
      { name: "analytics", trigger: "cron:weekly", does: "Recomputes procurement metrics; an ungrounded one is refused." },
      { name: "quality", trigger: "event:shipment.exception", does: "Inspects, holds and drafts the recall path." },
      { name: "orchestrator", trigger: "event:*", does: "Routes demand signals, low stock, exceptions and supplier replies." },
      { name: "Operator-run sweeps", trigger: "manual", does: "A low-stock sweep, a catalog sync and a WMS sync — no background jobs." },
    ],
    skills: {
      count: 15,
      note: "The most of any suite app: demand forecasting, supplier-risk scoring, reorder-point maths, three-way match, landed-cost allocation and FEFO, each with a named owner agent.",
    },
    mcpSeams: [
      { name: "Inventory", status: "modelled", note: "Stock, demand signals, draft orders and reorder points, under judge-verified-draft scopes." },
      { name: "Supplier", status: "modelled", note: "The idempotency key is enforced on the seam, not just in the app." },
      { name: "E-procurement", status: "declared", note: "Catalog and price lists. Empty-but-shaped until an endpoint is configured." },
      { name: "WMS · 3PL", status: "declared", note: "External stock feeds, landing only through the governed reconciliation writer." },
    ],
    dashboards: [
      "Control tower — live demand, low stock, exceptions and reorder suggestions.",
      "Purchase orders — the commitment book, each order with its approver and idempotency key.",
      "Suppliers and risk — the approved-vendor registry, risk scores, in-transit shipments.",
      "Requisitions and RFQs — sourcing with quotations ranked from the real submissions.",
      "Warehouses and stock — per-warehouse availability with computed available-to-promise.",
      "Quality and returns — incoming inspection, batch holds, FEFO and return-to-vendor.",
      "Stock ledger — every valued movement with its running cost, replayable end to end.",
    ],
    refusals: [
      "supplier '{name}' is not on the approved-vendor list — PO refused",
      "no autonomous commitment — a PO is human-approved (Tier-3)",
      "a commitment requires an idempotency_key (no double-order)",
      "releasing {qty} against blanket_order '{id}' would exceed its cap_qty ({cap})",
      "receiving {qty} would bring total received to {n}, exceeding the PO's ordered qty ({ordered})",
      "warehouse_stock reserved ({r}) cannot exceed on_hand ({o}) — refused",
      "batch '{id}' expired on {date} — you can't ship expired stock",
      "cannot publish a procurement metric with no underlying committed POs (ungrounded)",
    ],
    crossAppFlows: [
      "procure_to_ap — a proposed reorder's value hands to finance1's payables gate, where the money leg ends",
      "quality_recall_to_service — a batch defect or recall hands to service1, which owns the customer outcome",
      "finance1's three-way match reads the supply1 order and its receipt directly",
      "commerce1 reconciles catalog availability against supply1's inventory",
    ],
    pricingTiers: [
      { name: "Per seat / per site", description: "Scales across users and locations." },
      { name: "Enterprise", description: "Governance, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "supply1 — agentic supply chain & procurement | elan1",
      description:
        "Demand planning, replenishment, procurement, inventory and quality on one record. A purchase order can only name an approved vendor, and submitting one is a human, idempotent decision.",
    },
  },

  {
    slug: "people1",
    layer: "product",
    name: "people1",
    tagline: "Hire, pay and promote with the reasons on record.",
    businessFunction: "HR & Talent",
    status: "live",
    accent: ACCENT.rose,
    hero: {
      headline: "Offers, payslips and raises stop at a person.",
      subhead:
        "Hiring, time, payroll, performance and compensation on one HR system of record of 40 object types, with 22 declared agents that draft, score and assemble. Extending an offer, approving a payslip and approving a raise each queue for a named human.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Hiring runs on unstructured notes, and the reason for a rejection is nowhere on record.",
      "Payroll, leave, attendance and timesheets sit in separate systems, so the figures disagree.",
      "Comp rounds run in spreadsheets, with no budget check and no justification attached.",
      "Fairness is asserted in a policy document and never measured against what the system did.",
    ],
    capabilities: [
      {
        title: "screening — structured, job-relevant scoring",
        description:
          "Scores a candidate against a structured rubric and returns a fit band with what matched and what is missing. It never auto-rejects, and protected attributes are not inputs.",
      },
      {
        title: "payroll_runner — India statutory, computed",
        description:
          "Assembles a run with the statutory breakdown — provident fund, state insurance, professional tax, new-regime withholding — computed from each salary structure. Running and paying are separate human gates.",
      },
      {
        title: "comp_planner — raises with a written basis",
        description:
          "Drafts merit and bonus recommendations inside a cycle's budget, each with a written justification. Approval is refused if it would push committed spend, summed live, over budget.",
      },
      {
        title: "policy_qa — cited handbook answers",
        description:
          "Answers handbook questions with citations, and routes to HR where the handbook does not cover it. Scoped never to profile the person asking.",
      },
      {
        title: "fairness_bias_audit — fairness measured, not assumed",
        description:
          "A weekly, read-only adverse-impact check on screen and advance rates, aggregate and privacy-safe. Fairness is measured, not assumed.",
      },
      {
        title: "Leave, attendance and timesheets — one record",
        description:
          "Leave balances are computed at write time from approved requests, never trusted from the caller, and an approved timesheet's billable lines hand to project1's own gate.",
      },
    ],
    outcomes: [
      "A rejection, a raise or a headcount approval carries a written basis",
      "The pay figures a manager approves derive from the salary structure, not from a form",
      "The consequential move reaches a person with the record already assembled",
      "HR spends its time on judgment, not on handbook lookups and timesheet chasing",
    ],
    integrations: [
      "The HRIS seam — read and draft only; action and admin operations are not granted",
      "The knowledge seam — handbook retrieval behind cited policy answers",
      "finance1 — a paid payslip posts a payable; a bonus gates at finance1's approval",
      "project1 — approving a timesheet hands its billable lines over to be invoiced",
      "service1 — onboarding hands provisioning to the queue; offboarding opens a case",
      "goal1 — a finalised appraisal composes a mission rather than forking a goal store",
    ],
    suiteFit:
      "people1 is the workforce source, and each hand-off terminates at the receiving app's own gate: comp into finance1's payables, provisioning into service1's queue, billable lines into project1, an appraisal into a goal1 mission. people1 never forks a ledger or a service queue — and it never moves money.",
    trust:
      "Fairness here is structural, not a setting. Protected attributes are not fields on the candidate or employee model: a test walks the SDK's fourteen and fails if one appears, and the conformity battery scans live records and fails the Trust Mark if a protected key is present. The write path refuses rather than warns — the ungrounded-payslip, requisition-justification, anonymous-pulse and verified-competency refusals listed here are enforced at the record. The bias-control policy blocks a decision whose payload references a protected attribute at any depth and names the one it hit — and the code states its own limit, that it is a lexical guard which cannot catch a proxy variable, so it narrows what reaches a human rather than replacing the human. An eight-set eval battery gates the Trust Mark and drift revokes it, with a not-measurable third state so an empty sample is never reported as a pass. And there are no diversity analytics — a recorded boundary, not a roadmap item.",
    workforce: {
      registered: 22,
      launchWave: 4,
      note: "The largest roster in the suite. Four ship enabled, and the three seeded automations ship switched off and gated.",
    },
    systemOfRecord: {
      objectTypes: 40,
      note: "The deepest people record in the suite: employees and candidates, requisitions, offers and scorecards; salary structures, payslips and payroll runs; leave, attendance and timesheets; appraisals and pulse responses.",
    },
    copilots: [
      { name: "Recruiting copilot", mode: "acts-through-a-gate", does: "Drafts the role, screens against the rubric and shortlists, matched and missing skills shown." },
      { name: "Comp-review copilot", mode: "acts-through-a-gate", does: "Walks a cycle manager by manager: current pay, committed spend, budget left." },
      { name: "Candidate screening view", mode: "advisory", does: "Fit band, matched and missing skills — recomputed on read, never a stored verdict." },
      { name: "Flight-risk signal", mode: "advisory", does: "An attrition signal from recorded factors, surfaced aggregate-first." },
      { name: "Skills inference and gap", mode: "advisory", does: "Infers a skills matrix from training and role history, against a target." },
      { name: "Workforce-planning analytics", mode: "advisory", does: "Headcount, span of control, open requisitions and tenure bands." },
      { name: "Onboarding-plan copilot", mode: "acts-through-a-gate", does: "Generates a role-specific plan, handing provisioning to service1's queue." },
      { name: "Policy Q&A", mode: "advisory", does: "Cited handbook answers that route to HR where the handbook is silent." },
    ],
    automations: [
      { name: "New-hire onboarding", trigger: "event:hire.started", does: "Fires after the employee record is created. Seeded disabled." },
      { name: "Leave accrual", trigger: "schedule:monthly", does: "Accrues balances the write path treats as computed. Seeded disabled." },
      { name: "Probation review", trigger: "schedule:monthly", does: "Raises probation reviews as they come due. Seeded disabled." },
      { name: "jd_sourcing", trigger: "event:req.opened", does: "Drafts the role and opens sourcing on an approved requisition." },
      { name: "screening", trigger: "event:candidate.applied", does: "Scores the applicant against the rubric. Never auto-rejects." },
      { name: "policy_qa", trigger: "event:policy.question", does: "Answers with citations, or routes to HR." },
      { name: "review_prep", trigger: "event:review.cycle", does: "Assembles appraisal materials for the manager." },
      { name: "fairness_bias_audit", trigger: "cron:weekly", does: "Read-only adverse-impact check on screen and advance rates." },
      { name: "payroll_runner", trigger: "schedule:monthly", does: "Assembles the run, computed per salary structure." },
      { name: "time_attendance · timesheet_steward", trigger: "schedule:daily · weekly", does: "Chase and reconcile attendance and timesheets." },
    ],
    skills: {
      count: 12,
      note: "Screening as decision support that never auto-rejects, fixed-rubric interviews with cited evidence, statutory payroll rules, leave-accrual policy and appraisal rubrics.",
    },
    mcpSeams: [
      { name: "HRIS", status: "modelled", note: "Declared by 20 of the 22 agents, read and draft only — action and admin are withheld." },
      { name: "Knowledge", status: "modelled", note: "Handbook retrieval, two operations, behind cited policy answers." },
    ],
    dashboards: [
      "People dashboard — headcount, open positions, pipeline and onboarding completion.",
      "Hiring pipeline — the kanban; a drag moves the stage, and offer and hire are human-gated.",
      "Recruitment — requisitions, offers and interview scorecards on a fixed rubric.",
      "Payroll — runs computed per employee; running and paying are separate gates.",
      "Leave and attendance — balances computed at write time, the refusals visible.",
      "Performance and comp — appraisal cycles, and committed spend against budget.",
      "Fairness — the weekly adverse-impact read, aggregate and privacy-safe.",
    ],
    refusals: [
      "no salary_structure found for employee '{id}' — an ungrounded payslip cannot be approved",
      "a job_requisition cannot be approved without a justification on record — headcount is a reasoned decision",
      "cannot extend an offer for position '{id}' — it is not open; an offer requires an open role (grounded)",
      "a compensation recommendation cannot be approved without a justification on record — pay is a reasoned, auditable decision",
      "a pulse response must be ANONYMOUS — it cannot carry an employee identifier",
      "a competency cannot be marked verified without a COMPLETED training backing it",
      "approving {days} day(s) would exceed the available balance ({available}) — leave request refused",
      "check_out cannot be before check_in — attendance time-integrity refusal",
    ],
    crossAppFlows: [
      "comp_to_payroll — an approved compensation change reaches finance1's payables gate",
      "hire_to_provision — a new hire's provisioning runs through service1's queue",
      "An approved timesheet's billable lines land in project1, which bills them",
      "A finalised appraisal composes a linked goal1 mission",
    ],
    pricingTiers: [
      { name: "Per employee / per req", description: "Scales with your workforce and hiring." },
      { name: "Enterprise", description: "Governance, audit, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "people1 — governed HR, payroll and compensation | elan1",
      description:
        "Hiring, time, payroll, appraisals and comp on one HR record. Pay figures derive from the salary structure, protected attributes are not fields on the model, and the consequential moves queue.",
    },
  },

  {
    slug: "market1",
    layer: "product",
    name: "market1",
    tagline: "Drafts at agent speed. Publishing stays human.",
    businessFunction: "Marketing & Growth",
    status: "live",
    accent: ACCENT.violet,
    hero: {
      headline: "A marketing workforce that cannot publish on its own.",
      subhead:
        "Sixteen agents over market1's own marketing system of record — campaigns, content, journeys, segments, pages, events, attribution and budgets. Publish, schedule-social and send-newsletter are declared consequential, so the runtime routes them to a person even when the agent never asked.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Drafting got fast. Review did not — it is a spreadsheet and someone's memory.",
      "Brand voice lives in a PDF, so tone drifts across teams, markets and languages.",
      "Tracing a campaign to won revenue means exporting four systems and trusting the joins.",
      "An opt-out is recorded in one system and honoured in another — if the send path checks.",
    ],
    capabilities: [
      {
        title: "content — the content studio",
        description:
          "One agent writes the assets, long and short form, per channel. Its draft reaches an audience only after a named person approves the publish.",
      },
      {
        title: "brand_compliance_judge — the pre-publish pass",
        description:
          "Runs before write-back and asks three questions: on-brand, within the compliance lines, truthful and original. A pass queues the work for human approval; a fail regenerates twice, then escalates. It declares no tools at all.",
      },
      {
        title: "Journeys, broadcasts and organic social",
        description:
          "Journeys, broadcasts and posts to channels you own. At the send site the platform re-checks for banned claims, skips anyone opted out, and records the count actually dispatched.",
      },
      {
        title: "audience_builder — segments and lead scoring",
        description:
          "Criteria-defined audiences over real sales1 fields, and lead scores from four recorded signals. A score is never written back onto the lead.",
      },
      {
        title: "growth_analyst — attribution, funnels, budgets, experiments",
        description:
          "Reads the grounded chain: a campaign's form stamps its id on the lead, that lead converts, that opportunity wins. Pipeline, won revenue, drop-off and A/B winners on real deals. Read and analyse only — it writes nothing.",
      },
      {
        title: "creative_variants — variants without the ad buy",
        description:
          "Generates channel-spec creative variants at volume. Renamed from its ad-oriented original deliberately: there is no ad-placement operation for it to call.",
      },
    ],
    outcomes: [
      "Nothing reaches an audience without a named person approving it",
      "Brand voice becomes configuration you edit, not a document you circulate",
      "Every campaign figure on screen is recomputed from the records it came from",
      "An opt-out is honoured at the send site, not corrected later in a report",
    ],
    integrations: [
      "The content seam — read the brand system, write drafts, publish only on approval",
      "Email — real SMTP when configured; recorded in-process otherwise",
      "sales1 — a form submit composes a CRM lead, idempotent by email; attribution reads sales1 live",
      "finance1 — recorded campaign cost goes to the payables gate. market1 moves no money.",
    ],
    suiteFit:
      "market1 is the demand source: qualified audiences and event registrations into sales1, campaign spend into finance1's payables — where the money leg terminates, never inside market1. Attribution then reads that lead's opportunity back out of sales1.",
    trust:
      "Three policies sit on market1's write path. Review-on-publish returns approval unconditionally. Ad-free refuses outright, with no approver to appeal to, when a payload carries an ad placement or paid media. Truthful refuses a body containing any marker in a fixed list — best, #1, guaranteed, world-class, revolutionary, miracle, risk-free, no.1 — matched case-insensitively. That last one is a word list, not a semantic classifier, and we describe it as one. The runtime does not rely on an agent asking: publish, schedule-social and send-newsletter are declared consequential and forced to a human even when neither the spec nor the policy requested it. On the connector, ad-free is structural rather than promised — there is no ad-placement operation to call, and a test asserts the live operation set matches a reviewed list, so a new operation fails until a person reviews it.",
    workforce: {
      registered: 16,
      launchWave: 4,
      note: "Sixteen agents across create, engage, audiences, intelligence and governance. Four ship enabled; the other twelve are refused by the rollout gate.",
    },
    systemOfRecord: {
      objectTypes: 20,
      note: "market1 owns the marketing record: brand systems, assets, campaigns and performance, journeys and enrollments, segments, pages, forms and consent, events, broadcasts, experiments and budgets.",
    },
    copilots: [
      { name: "Plan copilot", mode: "acts-through-a-gate", does: "Turns a brief into channels, assets and a calendar, each item tracing back to it." },
      { name: "Content studio", mode: "acts-through-a-gate", does: "Drafts an on-brand asset in place, scored against the brand system before it queues." },
      { name: "Creative variants", mode: "acts-through-a-gate", does: "Generates A/B variants to channel spec from an approved asset." },
      { name: "Brand-voice check", mode: "advisory", does: "Checks copy against the brand system the client owns, over the banned-claim floor." },
      { name: "Send-time window", mode: "advisory", does: "Computes the send window from recorded engagement, not a rule of thumb." },
      { name: "Lead propensity", mode: "advisory", does: "Ranks leads by a score computed at read, showing which signals fired." },
      { name: "Attribution models", mode: "advisory", does: "First touch, last touch and linear side by side, not one blessed number." },
    ],
    automations: [
      { name: "journey_scheduler", trigger: "schedule:daily", does: "Advances wait-steps. The one seeded automation — created disabled." },
      { name: "strategy_brief", trigger: "event:brief.created", does: "Turns a new brief into a strategy and channel plan." },
      { name: "content · creative_variants · repurposing", trigger: "event:asset.requested", does: "Three agents on one request — the asset, its variants, its repurposed forms." },
      { name: "seo_channel", trigger: "event:campaign.scheduled", does: "Drafts optimised copy and channel metadata." },
      { name: "social_publisher", trigger: "event:social.requested", does: "Prepares a post for a channel you own. A post publishes once." },
      { name: "web_conversion", trigger: "event:page.requested", does: "Builds pages and forms; a submission composes a sales1 lead." },
      { name: "growth_analyst", trigger: "event:perf.signal", does: "Recomputes attribution, funnels and experiment winners." },
      { name: "orchestrator", trigger: "event:*", does: "Routes a topic to its specialist, once a binding is enabled." },
    ],
    skills: {
      count: 12,
      note: "Brand safety, compliance lines, channel specs and localisation rules. Brand safety is attached to every market1 agent.",
    },
    mcpSeams: [
      { name: "Content", status: "modelled", note: "Declared by 15 of 16 specs: read the brand system, write drafts, publish only on approval." },
      { name: "Email", status: "declared", note: "Journey sends and broadcasts. Real SMTP when a host is configured." },
    ],
    dashboards: [
      "Campaigns — campaigns, on-brand assets and a calendar, each asset tracing to a brief.",
      "Content — assets with an on-brand score; publishing is human-reviewed.",
      "Brand Voice studio — the brand voice as configuration, over the banned-claim floor.",
      "Journeys — multi-step flows with per-step drop-off computed from enrollments.",
      "Audiences and scoring — criteria-defined segments and live scores over sales1 records.",
      "Attribution and funnels — pipeline and won revenue through the stamped campaign chain.",
      "Budgets and experiments — recorded cost against budget, winners decided on real deals.",
    ],
    refusals: [
      "ad placement / paid media is not permitted (ad-free)",
      "a human reviews this asset before publish",
      "misleading / superlative claim",
      "blocked — {target} has opted out of email; the send was not dispatched",
      "broadcast already sent — a broadcast can only be sent once",
      "social post already published — a post publishes once",
      "event '{id}' is at capacity ({capacity}) — registration closed",
    ],
    crossAppFlows: [
      "campaign_to_pipeline — a qualified audience hands to sales1's inbound SDR",
      "event_to_pipeline — an event registration does the same",
      "campaign_to_spend — recorded campaign cost goes to finance1's payables gate, where the money leg ends",
    ],
    pricingTiers: [
      { name: "Per seat / usage", description: "Scales with your content operation." },
      { name: "Enterprise", description: "Governance, brand systems, SSO, and enterprise1 integration." },
    ],
    seo: {
      title: "market1 — agentic marketing with a human publish gate | elan1",
      description:
        "Sixteen agents over market1's own marketing record — campaigns, journeys, segments, pages, events, attribution. Publishing routes to a person, and there is no ad-placement operation to call.",
    },
  },

  {
    slug: "insight1",
    layer: "product",
    name: "insight1",
    tagline: "Computed on run. Published by a human.",
    businessFunction: "Analytics & Intelligence",
    status: "live",
    accent: ACCENT.blue,
    hero: {
      headline: "Analytics where the number is computed, not asserted.",
      subhead:
        `Metrics, reports and dashboards computed live from ${INSIGHT_SOURCES_WORD} sibling systems of record at the moment you run them. insight1 keeps no business records and holds no write access to another app's record — and a human reviews every publish.`,
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "The number in the deck was typed once and has been true ever since.",
      "Two teams answer the same question two ways, because each has its own definition.",
      "A dashboard reports a figure it cannot show you the working for.",
      "The alert fires on a metric nobody checked was still computable.",
    ],
    capabilities: [
      {
        title: "analyst — ask your data",
        description:
          "A plain-English ask is mapped to a known source app and aggregation, then run live. An ask it cannot ground comes back as \"could not ground the question to a known source app\".",
      },
      {
        title: "data_steward — the semantic metric layer",
        description:
          "One governed definition per metric — source app, aggregation, field, filter, target — so a dashboard tile and an agent answer resolve to the same thing. An uncomputable value returns a stated reason.",
      },
      {
        title: "anomaly_watch and narrator — findings with evidence",
        description:
          "An hourly baseline over a metric's real period series, banded by severity, with the evidence attached. An alert on a metric that will not compute sends nothing.",
      },
      {
        title: "forecast — a projection, labelled as one",
        description:
          "A least-squares trend with a residual band and an in-sample error figure. Labelled a projection, never actual data, and it refuses under three periods.",
      },
      {
        title: "Reports, dashboards and scheduled delivery",
        description:
          "The report author and dashboard builder draft; the digest scheduler and dashboard publisher require approval before anything reaches an audience.",
      },
      {
        title: "grounded_truth_judge — the pre-publish check",
        description:
          "Checks each figure ties to a governed metric over a real record, that a forecast is labelled a projection, and that a share's row-level scope — a real filter merged into the query, not a display toggle — has not been widened. A failure flags for review instead of publishing.",
      },
    ],
    outcomes: [
      "One governed definition per metric, shared by the dashboards and the agents",
      "A figure that cannot be computed arrives as a stated reason, not a plausible number",
      "Anomalies and projections arrive as findings, and stay findings until a person acts",
      "What was published, who approved it and what it was computed from is on the audit chain",
    ],
    integrations: [
      "Eight sibling systems of record, read in place: sales1, service1, finance1, supply1, people1, market1, project1 and commerce1",
      "The analytics seam — insight1's own connector, with three consequential operations",
      "Email — send-only scope for scheduled digests",
      "Report export as spreadsheet and PDF; a digest can attach the grounded report",
      "Governed flows into finance1 and supply1 through the platform orchestrator",
    ],
    suiteFit:
      `insight1 reads ${INSIGHT_SOURCES_WORD} sibling systems of record and holds no write access to any of them — every record it writes is its own. Where a finding needs an action it proposes into the owning app's queue, and both legs gate there: insight1 moves no money and commits no purchase. Industry packs push their published measures back as insight1 records rather than keeping analytics of their own.`,
    trust:
      "Publishing is the governed action. Publishing a dashboard is refused without an explicit human approval, and arming a digest, an alert or a share is consequential too. Raising an agent's autonomy level does not change that. The Trust Mark is scored against a six-set battery — grounding, no fabrication, publish review, data-scope safety, forecast honesty, and the engine never acting for the human. One scope limit stated plainly: a metric naming a source app outside the eight known systems of record is refused on save, but a metric saved with no source app at all passes that particular check — the grounding refusal that matters happens at compute time, where a value that cannot be derived returns no number and a reason.",
    workforce: {
      registered: 11,
      launchWave: 4,
      note: "Eleven agents including the pre-publish judge. The wave turns on four — analyst, narrator, anomaly watch and forecast — all read-only.",
    },
    systemOfRecord: {
      objectTypes: 9,
      note: `Analytics objects and no business records: metrics, dashboards, reports, questions, alerts, shares, insights, digests and reviews. Their values are computed from the ${INSIGHT_SOURCES_WORD} sibling systems of record on every run.`,
    },
    copilots: [
      { name: "Analyst copilot", mode: "advisory", does: "Shows the governed metric the question resolved to and the rows it computed over." },
      { name: "Digest copilot", mode: "acts-through-a-gate", does: "Assembles a digest from grounded reports. Arming it to send is consequential." },
      { name: "Forecast copilot", mode: "advisory", does: "Projects a metric forward with its band and error, labelled a projection." },
      { name: "Root-cause copilot", mode: "advisory", does: "Decomposes a flagged anomaly along its dimensions to show where it moved." },
    ],
    automations: [
      { name: "anomaly_watch", trigger: "cron:hourly", does: "Baselines each metric's real period series and ranks deviations. Read-only." },
      { name: "forecast", trigger: "cron:nightly", does: "Refreshes projections, refusing metrics with too little history." },
      { name: "analyst", trigger: "event:question.asked", does: "Grounds and runs an asked question against a real record." },
      { name: "report_author", trigger: "cron:weekly", does: "Drafts the recurring reports. Drafts only." },
      { name: "digest_scheduler · dashboard_publisher", trigger: "event:report.due", does: "Prepare delivery and publication — both requiring approval first." },
      { name: "orchestrator", trigger: "event:*", does: "Routes questions, metric breaches and reports due to their specialists." },
      { name: "Armed alert check · scheduled digest send", trigger: "manual", does: "An alert on a metric that will not compute records ungrounded and notifies nobody." },
    ],
    skills: {
      count: 9,
      note: "Query parsing that refuses an ask it cannot ground, anomaly baselining over a real series, forecasting with a labelled projection, and the row-level scope rules behind a share.",
    },
    mcpSeams: [
      { name: "Analytics", status: "modelled", note: "The single seam all eleven agents declare: reads, compute verbs, three consequential operations." },
      { name: "Email", status: "declared", note: "Send-only, for scheduled digests. Recorded until a mail host is configured." },
    ],
    dashboards: [
      "Intelligence — cross-suite KPIs and the proactive insights feed, over the live records.",
      "Ask your data — conversational analytics resolving to a governed metric.",
      "Metrics — the semantic layer, with target, attainment and trend.",
      "Explore — ad-hoc pivot, cross-tab and drill-down over any system of record.",
      "Reports — the library, with period comparison and export; an ungrounded report is refused.",
      "Dashboards — the canvas, where publishing to an audience is human-approved.",
      "Alerts and digests — arming either is consequential, and neither fires on an uncomputable number.",
    ],
    refusals: [
      "human approval required to publish a dashboard",
      "report not grounded ({reason}) — nothing to export",
      "metric not grounded ({reason})",
      "could not ground the question to a known source app (sales/finance/supply/people/marketing/service/project/commerce)",
      "could not ground the ask — a human rephrases; the copilot never guesses a query",
      "detectable: false — an anomaly baseline refuses below its minimum period count",
    ],
    crossAppFlows: [
      "insight_to_collections — a grounded receivables or cash anomaly routes to finance1's payables gate",
      "insight_to_replenish — a demand projection routes to supply1's reorder, which requires its own approval",
      "Every one of the ten industry packs composes insight1 — the only app in the suite that is universal",
    ],
    pricingTiers: [
      { name: "Per workspace", description: "For teams adopting agent-native analytics across the suite." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "insight1 — governed analytics for the elan1 suite | elan1",
      description:
        "Every metric, report and dashboard tile is computed live from the system of record that owns the data. Ungrounded figures are refused; publishing is human-reviewed.",
    },
  },

  {
    slug: "project1",
    layer: "product",
    name: "project1",
    tagline: "Plan the work, prove the hours, then bill.",
    businessFunction: "Project & Services Delivery",
    status: "live",
    accent: ACCENT.teal,
    hero: {
      headline: "A client bill you can trace back to an approved hour.",
      subhead:
        "Plans, resourcing, timesheets, RAID, Earned Value and the per-project P&L on its own work system of record — 22 object types, one append-only trail. Twelve agents plan, resource, track and draft; the moves that touch a client or the ledger stop for a named human.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "The plan is a spreadsheet nobody re-baselines, so there is nothing to measure against.",
      "Time is logged late, to the wrong project, or to none — and the bill inherits the error.",
      "Overrun and slippage surface at the month-end review, after the margin has gone.",
      "Billing is a manual reconciliation between timesheets, rate cards and the ledger.",
    ],
    capabilities: [
      {
        title: "planner — the plan of record",
        description:
          "Breaks a brief into tasks, milestones, estimates and a computed critical path, and freezes a baseline. A human accepts the plan; locking the baseline is a separate approval.",
      },
      {
        title: "scheduler — resourcing against real capacity",
        description:
          "Allocates people within capacity, with utilisation computed from live allocations, never supplied. An allocation past full capacity goes to a human rather than silently written.",
      },
      {
        title: "timesheet_clerk — time that belongs to something",
        description:
          "Captures time against a real project and task. The store refuses an entry that names no project, names a project outside this tenant, or books zero, negative or more than 24 hours in a day — and the same check runs in the store and in the governed writer. Time lands unapproved; a human approves before it can be billed.",
      },
      {
        title: "biller — the client bill",
        description:
          "Turns approved billable time into a client bill for finance1 — the amount derives from approved hours and the project's rate, never from a typed figure. It refuses unapproved time, refuses a project that is not on a billable mode, and refuses to bill at all without an explicit approval.",
      },
      {
        title: "controller — the engagement money view",
        description:
          "Rate cards, change orders, non-labour costing and the per-project P&L, plus Earned Value where schedule variance is omitted rather than invented without a baseline.",
      },
      {
        title: "risk_watch and portfolio — RAID and the grounded metric",
        description:
          "Risks, issues, decisions and actions as records with named owners, severity recomputed from probability × impact on every write rather than accepted as a label.",
      },
    ],
    outcomes: [
      "Hours that tie to a real engagement, because the store refuses anything else",
      "Client bills a named human signed off on, from approved time and a rate card",
      "Slippage and blockers carried as records with computed severity, not adjectives",
      "One reviewable trail from won quote to charter to bill, on the append-only audit",
    ],
    integrations: [
      "finance1 — a delivered milestone reaches the ledger through finance1's own approval",
      "people1 — an unstaffable skills gap surfaces here; the headcount decision terminates there",
      "sales1 — charters from an accepted quote, contract value read from its own subtotal",
      "insight1 — a published portfolio metric carries the numerator and denominator behind it",
      "The project-ops seam — repo, issue tracker and calendar, live only when configured",
      "The project-management seam — reads, drafts, six compute verbs, four consequential actions",
    ],
    suiteFit:
      "project1 is the delivery hub. It receives demand from sales1 and service1, and is the source of two governed flows into finance1's receivables and people1's recruiting — both terminating at the other app's own gate, because project1 never posts to the ledger and never hires. Industry packs reuse it as the delivery engine: a manufacture1 corrective action and a health1 care-delivery project both open as project1 projects.",
    trust:
      "Safe on the write path, not by policy prose: the timesheet, billing, revenue-recognition and grounded-metric refusals listed here are enforced in the store and again in the governed writer. A risk's severity is recomputed from probability × impact on every write, never accepted as a supplied label. The client portal is read-only and token-scoped: status, milestones and the latest update, never rate cards, budget, currency or risk level. And the app refuses to boot at all if it would ask a human to approve an action it cannot actually execute.",
    workforce: {
      registered: 12,
      launchWave: 4,
      note: "Twelve agents. The wave enables four read-and-draft functions; the biller, controller, originator, timesheet clerk, RAID watch and coordinator stay off until enabled.",
    },
    systemOfRecord: {
      objectTypes: 22,
      note: "The work itself: projects, tasks, timesheets, milestones and allocations; rate cards, change orders, expenses, revenue events and retainers; baselines, RAID items, programs and resource requests.",
    },
    copilots: [
      { name: "Delivery-planning copilot", mode: "acts-through-a-gate", does: "Expands a brief into a draft work breakdown. It refuses a blank brief rather than fabricate a plan." },
      { name: "Project-recovery copilot", mode: "advisory", does: "Burn, slippage and blocked tasks, with the recovery levers and their baseline effect." },
      { name: "Status-report copilot", mode: "acts-through-a-gate", does: "Drafts the client status from the live record — milestones hit, what is at risk. Drafts only." },
      { name: "Staffing copilot", mode: "advisory", does: "Matches open requests to people by skill and real availability." },
    ],
    automations: [
      { name: "planner", trigger: "event:project.created", does: "Drafts the plan when a project is chartered." },
      { name: "tracker", trigger: "cron:daily", does: "Tracks progress and burn, flagging milestones before they slip." },
      { name: "risk_watch", trigger: "cron:hourly", does: "The RAID watch — the most frequent cadence in the app." },
      { name: "timesheet_clerk", trigger: "event:time.logged", does: "Validates and files time as it is logged. Time lands unapproved." },
      { name: "portfolio", trigger: "cron:daily", does: "Recomputes the portfolio and publishes grounded metrics into insight1." },
      { name: "biller", trigger: "event:billing.due", does: "Assembles the bill from approved time and the rate card." },
      { name: "controller", trigger: "event:revenue.recognizable", does: "Proposes recognition, refusing when there is nothing new." },
      { name: "originator", trigger: "event:quote.won", does: "Charters from an accepted sales1 quote — refusing one already chartered." },
      { name: "coordinator", trigger: "event:*", does: "The router across blocked tasks, due milestones, logged time and won quotes." },
    ],
    skills: {
      count: 9,
      note: "Plan generation that refuses a blank brief, delivery-risk scoring over live cost and schedule indices, estimation rules, change-order governance and Earned Value maths.",
    },
    mcpSeams: [
      { name: "Project management", status: "modelled", note: "The seam all twelve agents declare, with 24 banded scopes and four consequential actions." },
      { name: "Project ops", status: "declared", note: "Repo, issue tracker and calendar. A deterministic empty result until configured." },
    ],
    dashboards: [
      "Portfolio — every project with status, logged against budgeted hours and billing mode.",
      "Tasks and milestones — the work broken down and dated, with slippage flagged.",
      "Timesheets and billing — billing runs only on human-approved time.",
      "Delivery health and risk — RAG health, burn, slippage and utilisation, severity computed.",
      "Financials — rate cards, change orders, the per-project P&L and Earned Value.",
      "Resourcing — the supply-versus-demand workbench, utilisation from live allocations.",
      "Client portal — read-only and token-scoped: status, milestones and the latest update.",
    ],
    refusals: [
      "timesheet must name a project_id (time belongs to a project)",
      "unknown project_id '{id}' for this tenant",
      "human approval required to bill a client",
      "cannot recognize revenue — nothing new to recognize (ungrounded)",
      "cannot publish a portfolio metric with no underlying records (ungrounded)",
      "this dependency would create a cycle in the task graph",
      "a project can only be chartered from an ACCEPTED (won) sales1 quote",
      "materializing a risk_item requires a named owner",
    ],
    crossAppFlows: [
      "project_to_cash — a delivered milestone reaches finance1's receivables through its own approval",
      "resource_gap_to_hire — an unstaffable skills gap reaches people1, where the headcount decision terminates",
      "deal_to_delivery — a won sales1 quote charters the engagement",
      "case_to_fieldwork — a service1 case needing field work opens here",
    ],
    pricingTiers: [
      { name: "Per seat", description: "For services teams adopting agentic delivery." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "project1 — agentic project & services delivery (PSA) | elan1",
      description:
        "Plans, resourcing, timesheets, RAID, Earned Value and the per-project P&L on one governed work record. Time can't be logged to a project that doesn't exist, and a client bill waits for a human.",
    },
  },

  {
    slug: "commerce1",
    layer: "product",
    name: "commerce1",
    tagline: "One order book. Online, in-store, marketplace.",
    businessFunction: "eCommerce + POS",
    status: "live",
    accent: ACCENT.magenta,
    hero: {
      headline: "Unified commerce where the money move stops at a person.",
      subhead:
        "Storefront, POS register, imported marketplace orders and subscription renewals against one commerce system of record — 19 object types. Setting an order paid or refunded is consequential on the write path, so it queues for a human before it lands.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Online and in-store keep separate books, so the same sale is reconciled twice.",
      "Availability is asserted in one system and read in another, so shelf and storefront disagree.",
      "Refunds and promo exceptions are decided in chat; who approved what lives nowhere.",
      "Automation that could charge a card is automation nobody will switch on.",
    ],
    capabilities: [
      {
        title: "One order book — cashier, channel_sync, subscription_manager",
        description:
          "Four ways a sale enters the book — storefront, POS, marketplace import, subscription renewal — and all four run the same check before it lands: at least one line, each naming a product this tenant actually has, quantity above zero. The cashier's total derives from price × quantity; capturing the money is a separate governed write.",
      },
      {
        title: "fulfilment_planner and the returns queue",
        description:
          "Paid orders become drafted shipments through pick, pack, ship and deliver; the order flips to fulfilled when its lines are covered, computed rather than asserted. The record refuses two things outright — an order must be paid before it can be shipped, and a shipment cannot carry more than the order has left. A return can never claim more than the order billed, and approving one is the money step.",
      },
      {
        title: "inventory_sync — replenishment that drafts, never buys",
        description:
          "Runs hourly over commerce1's own availability ledger and drafts a supply1 order for the computed shortfall, to a vendor both approved and active. It writes no stock movement of its own and the order lands as a draft: the commitment belongs to supply1, and the flow terminates at supply1's approval gate.",
      },
      {
        title: "refund_agent — the only money-out agent, and it is gated",
        description:
          "Declared requires-approval with self-verification on. A refund larger than what was captured is blocked outright, and an unparseable captured amount routes to a human. Settlement is handed to the delegated gateway seam, which only ever executes an already-approved decision.",
      },
      {
        title: "The proposal layer — five computed capabilities, none of which decides",
        description:
          "Forecasting, recommendation, price optimisation, fraud and recovery scoring are read-and-compute verbs. Price optimisation carries a hard floor — never below cost.",
      },
      {
        title: "Tills, loyalty and gift cards",
        description:
          "Register sessions with their own close-out review, a loyalty ledger where a redemption above the balance is refused, and gift cards issued only against a paid order.",
      },
    ],
    outcomes: [
      "A sale reconciles the same way whether rung at a till, placed online or imported",
      "Money movement carries an approval record and a hash-chained audit event, not a chat thread",
      "Pricing, fraud and merchandising work arrives as a proposal with its floor stated",
      "A stock shortfall becomes a drafted purchase order procurement owns, not an auto-buy",
    ],
    integrations: [
      "The commerce seam — capture, refund, void, publish and price override are consequential on the connector itself, so the runtime refuses them mid-loop",
      "Payments — the delegated capture and refund seam; it takes an order id and an amount",
      "Marketplace — Amazon, Flipkart, ONDC and Meesho modelled as kinds; fetch-only, and an order becomes real through commerce1's own grounded writer",
      "finance1 — an approved capture posts a receivable with computed GST, idempotent per order",
      "supply1 — a below-reorder row drafts a purchase order to an approved, active vendor",
    ],
    suiteFit:
      "commerce1 imports no other app; the core orchestrates. The sell side settles into finance1's receivables and an approved return into its payables — commerce1 approves the return at its own gate, but the money leg terminates at finance1's. A stockout drafts into supply1's reorder: commerce1 flags, supply1 owns the buy. Under the retail1 pack, retail1 mirrors a governed price into the storefront but never re-owns it.",
    trust:
      "The write path refuses before it reviews — the blocks listed here are enforced at the record, not asked of the agent. What is not refused outright is gated: setting an order paid or refunded, approving a return, closing a till, redeeming loyalty points or gift-card balance, any delete. The runtime holds the same line independently — a consequential connector operation cannot run mid-loop and is forced to a human even where an agent's spec did not ask for one. There is no card data to lose: the payment record carries an order id, an amount, a method and a kind. Two limits stated plainly. The oversell guard reads commerce1's availability ledger, so a product with no inventory row at that location is untracked and the guard does not apply there. And a fraud score flags an order when it is placed; because a capture is a human approval anyway, that flag is a signal on the review rather than a second automatic block.",
    workforce: {
      registered: 13,
      launchWave: 8,
      note: "The widest launch wave in the suite: eight of thirteen ship enabled, all read, draft or analyse. The cashier, promo planner, orchestrator, refund agent and fraud judge stay off.",
    },
    systemOfRecord: {
      objectTypes: 19,
      note: "commerce1 owns its own availability ledger rather than reading stock from elsewhere: products, orders and payments, stores and promotions, tills, loyalty and gift cards, inventory, shipments, returns and subscriptions.",
    },
    copilots: [
      { name: "Replenishment copilot", mode: "acts-through-a-gate", does: "The computed shortfall per location and the drafted order — refusing with no approved vendor." },
      { name: "Merchandising copilot", mode: "acts-through-a-gate", does: "Drafts listings from real order history. Publishing is a consequential write." },
      { name: "Pricing copilot", mode: "acts-through-a-gate", does: "Proposes a price with the cost floor shown. Below cost is refused, past the best offer needs an override." },
      { name: "Fraud and recovery copilot", mode: "advisory", does: "Scores fraud risk and recovery likelihood. It screens; it does not block." },
    ],
    automations: [
      { name: "inventory_sync", trigger: "cron:hourly", does: "Recomputes availability and drafts replenishment for below-reorder rows." },
      { name: "merchandising_analyst", trigger: "cron:daily", does: "Refreshes forecasts, recommendations and category performance." },
      { name: "fulfilment_planner", trigger: "event:order.paid", does: "Turns a paid order into drafted shipments." },
      { name: "subscription_manager", trigger: "event:subscription.due", does: "Prepares a renewal as a sale entering the same order book." },
      { name: "channel_sync", trigger: "event:marketplace.order", does: "Imports an external order idempotently by its reference." },
      { name: "order_concierge", trigger: "event:order.inquiry", does: "Answers shopper questions from the live order book." },
      { name: "cashier", trigger: "event:pos.sale", does: "Rings a register sale whose total derives from price × quantity." },
      { name: "refund_agent", trigger: "event:refund.requested", does: "Prepares a refund within what was captured. Over capture is blocked." },
      { name: "orchestrator", trigger: "event:*", does: "The router across orders placed, payments due and refunds requested." },
    ],
    skills: {
      count: 9,
      note: "Sales forecasting that refuses under three periods of history, recommendation, price optimisation with a cost floor, fraud and recovery scoring, and the POS close-out rules.",
    },
    mcpSeams: [
      { name: "Commerce", status: "live", note: "The single seam all thirteen agents declare, with five operations consequential on the connector itself." },
      { name: "Payments", status: "declared", note: "Delegated capture and refund. It receives an order id and an amount." },
      { name: "Marketplace", status: "declared", note: "External order feed. Fetch-only, empty until configured." },
    ],
    dashboards: [
      "Analytics — GMV, net revenue, average order value, GST, gross margin from cost × sold lines, fulfilment rate from shipments and return rate from RMAs, all computed live from the order book.",
      "Catalog — products, price lists and storefront listings; publishing is a consequential write.",
      "Orders — the unified book across storefront, POS, marketplace and subscription.",
      "Fulfilment — shipments through pick, pack, ship and deliver, with partials.",
      "Returns and refunds — the RMA queue, where approving is the money step.",
      "POS and tills — register sessions with their close-out reviews.",
      "Loyalty and gift cards — the ledger, with redemption refused above the balance.",
    ],
    refusals: [
      "refund {refund} exceeds captured {captured} — blocked (not grounded)",
      "commerce: an order must be paid before it can be shipped",
      "commerce: line for product {pid} wants {qty} but only {avail} is available at {location} — the order book can't oversell",
      "commerce: reserved ({reserved}) cannot exceed on_hand ({on_hand}) — the order book would be committing stock it doesn't have",
      "commerce: line {i} discounts {dp}% beyond the best active offer ({max}%) — set discount_override for a human-reviewed exception",
      "commerce: customer {id} is blocked — no new orders",
      "a redemption of {req} points exceeds the current balance of {balance}",
      "no approved supply1 vendor to draft a replenishment PO to",
    ],
    crossAppFlows: [
      "order_to_cash — the sell side settles into finance1's receivables",
      "return_to_refund — an approved return runs into finance1's payables, where the money leg ends",
      "stockout_to_replenish — a computed shortfall drafts into supply1's reorder",
    ],
    pricingTiers: [
      { name: "Per store / per channel", description: "Scales with your storefronts and registers." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "commerce1 — governed eCommerce + POS on one order book | elan1",
      description:
        "Storefront, POS, marketplace imports and subscription renewals on one commerce record. Capture and refund are consequential writes — a person approves before money moves.",
    },
  },

  {
    slug: "goal1",
    layer: "product",
    name: "goal1",
    tagline: "A live goal cadence, governed at the apply.",
    businessFunction: "Agentic Goal Intelligence",
    status: "live",
    accent: ACCENT.indigo,
    hero: {
      headline: "Goals that move on a daily beat, not a quarterly review.",
      subhead:
        "One operating cadence — a North Star, missions, weekly sprints, a daily pulse, and detected signals a human triages. Nine agents draft, project and propose; applying a signal needs a human approval unless a person has armed that mission's Autopilot envelope.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "The goal document is authored once and is stale before the quarter is out.",
      "Progress lives in slides and spreadsheets nobody updates between reviews.",
      "Nothing connects a goal to the agents and systems that would actually move it.",
      "When the plan changes, the decision and the reasoning behind it go unrecorded.",
    ],
    capabilities: [
      {
        title: "signal_scout and the governed apply",
        description:
          "The scout is always-on and read-only. Applying its suggestion is a separate agent, gated at every autonomy level because it is registered consequential, and not in the launch wave.",
      },
      {
        title: "Autopilot — an autonomy envelope with a ceiling and a cap",
        description:
          "A human arms an envelope per mission with a severity ceiling and a per-cycle cap. Inside it an agent applies with no per-move gate; ceiling and spent cap are re-checked every move.",
      },
      {
        title: "foresight_analyst — trajectory, risk and a labelled what-if",
        description:
          "Projects each mission forward from its own baseline, target and logged beats. Projections are clamped to the target and labelled model estimates; an escape reports the portfolio ungrounded.",
      },
      {
        title: "portfolio_strategist — breakthroughs, plays and bets",
        description:
          "Which missions are at a positive inflection, and how each bet stands — computed from that mission's own foresight, never asserted. A settled bet cannot be re-settled.",
      },
      {
        title: "Goal-to-action routing",
        description:
          "On a predicted miss, the routing endpoint names the app that owns the lever and the gate. goal1 hands over a proposal. Two of the six mission categories have a route today.",
      },
      {
        title: "pulse_coach — the daily beat",
        description:
          "A daily pulse and leader briefing from the mission numbers: what moved, and whether an agent or a human moved it, as a first-class field on every pulse.",
      },
    ],
    outcomes: [
      "A portfolio that reads live between reviews, briefed from the mission numbers",
      "Autonomy granted per mission with a ceiling and a spend-down cap, and withdrawable",
      "A recorded rationale behind each signal decision, on the hash-chained audit",
      "A clear split between what an agent may do immediately and what waits for a person",
    ],
    integrations: [
      "The knowledge seam — declared as a tool on all nine goal1 agents",
      "The analytics seam — declared by the scout, the foresight analyst and the strategist",
      "enterprise1 — approvals, the hash-chained audit, the autonomy ladder and the wave gate",
      "finance1 and supply1 — routing targets; goal1 proposes, the sibling's own gate acts",
      "The connectors goal1 declares are modelled adapters, not live integrations",
    ],
    suiteFit:
      "goal1 runs in-process inside enterprise1 — there is no separate goal1 service. It has no system of record of its own: the portfolio is one governed key-value blob per tenant, bound to the caller's tenant on every read and write. Where a mission needs a lever goal1 does not own, the routing endpoint names the owning app and its gate — the only two of six mission categories with a route today, firing only for a mission foresight predicts will miss. goal1 writes nothing to a sibling and commits nothing; a launch-readiness test asserts it.",
    trust:
      "Autonomy here is granted, not seized. Arming an envelope refuses a critical ceiling outright, and eligibility re-checks the ceiling and the spent cap before every in-envelope move; outside it, the request falls back to the approval gate. Applying a signal out of envelope, retiring a mission or the North Star, arming or raising an envelope, disbanding a crew and cancelling a bet are registered consequential. Most other writes — creating a mission, logging a pulse, aligning to the North Star, running a play, placing a bet — are immediate: policy-evaluated and audited, but not human-approved. We would rather state that than claim more. The Trust Mark is checked against the live store rather than asserted: the conformity snapshot verifies every envelope respects its ceiling, every projection is clamped to its target, and no mission pulls toward a North Star that does not exist; any failure refuses the mark. Portfolio figures shown in the product are illustrative, and projections are labelled projections.",
    workforce: {
      registered: 9,
      launchWave: 6,
      note: "Nine agents, six in the launch wave — the widest proportion in the suite, because most of goal1 reads and drafts. The apply agent, the alignment agent and the orchestrator are off by default.",
    },
    systemOfRecord: {
      objectTypes: 6,
      note: "goal1 has no system of record of its own. Six object types — mission, signal, action, envelope, ambition and bet — persist as one governed key-value blob per tenant.",
    },
    copilots: [
      { name: "Planning copilot", mode: "advisory", does: "Turns an intent into a draft mission with a grounded baseline, or returns nothing draftable. It never creates." },
      { name: "Briefing copilot", mode: "advisory", does: "The daily report: what moved, what is at risk, what needs a decision. It never publishes." },
      { name: "Foresight copilot", mode: "advisory", does: "Trajectory, ETA and the labelled what-if for the next signal, clamped to the target." },
      { name: "Alignment copilot", mode: "advisory", does: "How missions pull toward the North Star. It never re-parents a mission." },
    ],
    automations: [
      { name: "signal_scout", trigger: "event:metric.stream", does: "Always-on signal watch. Read-only — it surfaces, it does not apply." },
      { name: "pulse_coach", trigger: "event:day.start", does: "The daily pulse and leader briefing." },
      { name: "foresight_analyst", trigger: "event:day.start", does: "Daily drift detection across the portfolio." },
      { name: "mission_architect", trigger: "event:ambition.set", does: "Frames missions when an ambition is set. Drafting only." },
      { name: "orchestrator", trigger: "event:*", does: "Routes events to the right specialist. Off by default." },
      { name: "Autopilot envelope", trigger: "manual", does: "Inside the envelope an apply lands with no per-move gate; above the ceiling it falls back." },
    ],
    skills: {
      count: 8,
      note: "Mission framing that will not invent a baseline — it grounds it or marks it unknown — plus sprint decomposition, signal triage, foresight projection and bet settlement.",
    },
    mcpSeams: [
      { name: "Knowledge", status: "modelled", note: "Declared by all nine agents, and the declared tool on seven of the eight skills. Typed and least-privilege — an agent may only touch what its own spec declares." },
      { name: "Analytics", status: "modelled", note: "Declared by the scout, foresight analyst and strategist for the reads behind a signal." },
    ],
    dashboards: [
      "Mission control — hero stats, the momentum streak, the cadence ribbon, the alignment roll-up.",
      "North Star — the single ambition and the missions pulling toward it, with tension surfaced.",
      "Briefing — the daily cross-portfolio situation report.",
      "Foresight — trajectory, ETA and the labelled what-if per mission.",
      "Signals — the triage queue: severity, affected mission, quantified impact, suggested move.",
      "Plays and crews — captured breakthroughs as reusable motions, and who is running them.",
      "Bets — the high-variance book, each position computed from that mission's own foresight.",
    ],
    refusals: [
      "autopilot ceiling is 'warning' — a critical signal always escalates to a human",
      "'{mission}' is not a detected breakthrough — there's no proven motion to capture",
      "bet '{id}' is already settled ({status}) — a resolved wager can't be re-settled",
      "target must differ from baseline",
      "the copilot could not ground a mission from that intent — it proposes nothing rather than invent one",
    ],
    crossAppFlows: [
      "Revenue missions route to finance1's own gate; scaling missions route to supply1's approval-gated reorder",
      "Two of six mission categories have a route today, and only for a mission foresight predicts will miss",
      "goal1 writes nothing into a sibling app — a launch-readiness test asserts it",
    ],
    pricingTiers: [
      { name: "Per workspace", description: "For teams running their goals on an agentic cadence." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "goal1 — agentic goal intelligence with a governed apply | elan1",
      description:
        "One live goal cadence — North Star, missions, sprints, a daily pulse, and signals a human triages. Applying a signal needs approval unless a mission's Autopilot envelope grants it.",
    },
  },

  {
    slug: "enterprise1",
    layer: "product",
    name: "enterprise1",
    tagline: "One agentic platform. Every function. Total control.",
    businessFunction: "Platform backbone",
    status: "live",
    externalUrl: "https://enterprise1.in",
    accent: ACCENT.clayDeep,
    hero: {
      headline: "The platform that unifies your agents.",
      subhead:
        "enterprise1 runs the whole 1 Suite as one — shared governance, identity, data, skills and observability across every function, rolled out in waves.",
      primaryCta: "Talk to sales",
    },
    problem: [
      "Point agents sprawl without shared governance.",
      "Identity, data access, and audit are inconsistent across tools.",
      "There's no single place to observe and control agent behavior.",
      "Scaling from a pilot to the enterprise stalls.",
    ],
    capabilities: [
      { title: "Unified governance", description: "One policy, audit and human-in-the-loop framework across every agent." },
      { title: "Identity & access", description: "SSO and least-privilege data access across functions." },
      { title: "Shared skills & connectors", description: "Reusable Skills and MCP connectors available to the whole suite." },
      { title: "Observability & control", description: "A single pane to monitor, evaluate and manage agents in production." },
      { title: "Wave rollout", description: "A staged adoption model that scales function by function." },
    ],
    outcomes: [
      "One governance signature, one audit chain, across every app in the suite",
      "A new app inherits the identity, approval and audit posture rather than re-implementing it",
      "Agent enablement staged per tenant, with a suspend switch that overrides the enabled set",
      "One control plane for the agentic enterprise",
    ],
    integrations: ["Identity providers", "Enterprise data sources", "The full 1 Suite", "via MCP connectors"],
    suiteFit:
      "The backbone every product and solution standardizes on; the destination of every land-and-expand motion.",
    trust:
      "Governance, audit, and human-in-the-loop are first-class platform primitives — not bolt-ons. Operated with run1.",
    pricingTiers: [
      { name: "Platform", description: "Enterprise licensing across functions and seats." },
      { name: "Wave program", description: "Phased rollout with run1 operations and assure1 governance." },
    ],
    seo: {
      title: "enterprise1 — the unified agentic platform | elan1",
      description:
        "enterprise1 runs the whole 1 Suite as one — shared governance, identity, data, skills, and observability across every function.",
    },
  },
];

export default products;
