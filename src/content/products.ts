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
      "Close defensible; period won't lock while gating task open",
      "Duplicate vendor invoice refused at write",
      "Statements cannot disagree with ledger",
      "Enable, disable automation one function at a time",
    ],
    integrations: [
      "ERP seam — shared accounting connector",
      "India statutory gateways — one port, two adapters",
      "Bank feed — idempotent, skips already-ingested lines",
      "supply1 purchase orders — read for three-way match",
      "Governed tool surface — audit-prep through same gates",
    ],
    suiteFit:
      "finance1 where suite settles. service1, project1, people1, sales1, commerce1 each post legs through finance1's governed writer. All ten industry packs settle here.",
    trust:
      "Money doesn't move on agent say-so. Refusals in code. Human-gated: payment release, credit/debit notes, ledger posting, reconciliation close, GST filing, write-off, expense approval, asset disposal. Drafting immediate and audited.",
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
        "32 object types. 9 agents compute and draft. PO names only approved vendor. Submitting requires human decision with idempotency key.",
      primaryCta: "Book a demo",
    },
    problem: [
      "On-hand, on-order, available-to-promise disagree.",
      "Approved-vendor rule in policy, not checked on write.",
      "Replenishment quantities typed by hand.",
      "Receipts, batches, serials tracked apart from valuation.",
    ],
    capabilities: [
      {
        title: "demand_planner — demand planning",
        description:
          "Forecasts per-SKU demand from history. Too little history: ungrounded, never invented.",
      },
      {
        title: "reorder — replenishment",
        description:
          "Compares availability to min/max rules, drafts orders to preferred supplier. Approved vendor check applied.",
      },
      {
        title: "procurement — the buying surface",
        description:
          "POs, RFQs, requisitions, goods receipts, blanket orders. Judge runs before write.",
      },
      {
        title: "supplier_risk — the approved-vendor registry",
        description:
          "Scores delivery, quality, concentration. Unapproved never recommended.",
      },
      {
        title: "inventory — warehouses, transfers and valuation",
        description:
          "Per-warehouse stock, computed available-to-promise. Cost replayed, never typed.",
      },
      {
        title: "quality — incoming QC, recalls and returns",
        description:
          "Inspects, holds batches, FEFO, return-to-vendor. Recall hands to service1.",
      },
    ],
    outcomes: [
      "Buying reconstructible: approved supplier, approver, idempotency key",
      "Replenishment traces to computed projection; honest \"not enough history\" when true",
      "One stock truth across warehouses",
      "Inventory value re-derivable by replaying ledger",
    ],
    integrations: [
      "Inventory seam — stock, demand signals, orders, reorder points",
      "Supplier seam — reads plus idempotent commitments",
      "E-procurement — catalog row becomes real only via governed writer",
      "WMS/3PL — count becomes record only via governed reconciliation",
      "finance1 three-way match, service1 recalls, commerce1 stock",
    ],
    suiteFit:
      "supply1 is stock-truth system. finance1's three-way match runs against supply1 order and receipt. commerce1 replenishment drafts to approved vendor; submitting stays supply1's human step.",
    trust:
      "Approved-vendor check on write. PO naming unapproved supplier refused. Submitting separate decision; requires idempotency key. Replay returns original receipt, orders nothing.",
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
        "40 object types, 22 agents draft, score, assemble. Offer, payslip approval, raise approval each queue for named human.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Hiring runs on unstructured notes — rejection reason not recorded.",
      "Payroll, leave, attendance, timesheets in separate systems — figures disagree.",
      "Comp rounds in spreadsheets — no budget check, no justification.",
      "Fairness asserted, never measured.",
    ],
    capabilities: [
      {
        title: "screening — structured, job-relevant scoring",
        description:
          "Scores against rubric, returns fit band. Never auto-rejects. Protected attributes not inputs.",
      },
      {
        title: "payroll_runner — India statutory, computed",
        description:
          "Assembles run with statutory breakdown from salary structure. Running and paying separate gates.",
      },
      {
        title: "comp_planner — raises with a written basis",
        description:
          "Drafts merit and bonus recommendations with written justification. Refused if over budget.",
      },
      {
        title: "policy_qa — cited handbook answers",
        description:
          "Answers handbook questions with citations. Routes to HR if uncovered.",
      },
      {
        title: "fairness_bias_audit — fairness measured, not assumed",
        description:
          "Weekly adverse-impact check on screen and advance rates. Aggregate, privacy-safe.",
      },
      {
        title: "Leave, attendance and timesheets — one record",
        description:
          "Balances computed at write from approved requests. Billable lines hand to project1.",
      },
    ],
    outcomes: [
      "Rejection, raise, headcount approval carries written basis",
      "Pay derives from salary structure",
      "Consequential move reaches person with record assembled",
      "HR spends time on judgment, not lookups or chasing",
    ],
    integrations: [
      "HRIS seam — read and draft only",
      "Knowledge seam — handbook retrieval with citations",
      "finance1 — payslip posts payable; bonus gates at finance1",
      "project1 — timesheet approval hands billable lines to invoice",
      "service1 — onboarding hands provisioning to queue",
      "goal1 — finalised appraisal composes mission",
    ],
    suiteFit:
      "people1 is workforce source. Each hand-off terminates at receiving app's gate: comp to finance1, provisioning to service1, billable lines to project1, appraisal to goal1. Never forks ledger or queue.",
    trust:
      "Fairness is structural. Protected attributes not model fields. Write path refuses rather than warns. Lexical guard on protected keys at any depth.",
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
        "16 agents over marketing system: campaigns, content, journeys, segments, pages, events, attribution, budgets. Publish, schedule-social, send-newsletter routed to person.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Drafting fast. Review slow — spreadsheet and memory.",
      "Brand voice in PDF — tone drifts across teams, markets, languages.",
      "Tracing campaign to revenue: export four systems, trust joins.",
      "Opt-out recorded one place, honoured another.",
    ],
    capabilities: [
      {
        title: "content — the content studio",
        description:
          "Writes assets per channel. Draft reaches audience only after person approves.",
      },
      {
        title: "brand_compliance_judge — the pre-publish pass",
        description:
          "Runs before write: on-brand, within compliance, truthful. Pass queues for approval; fail regenerates twice.",
      },
      {
        title: "Journeys, broadcasts and organic social",
        description:
          "Posts to owned channels. Platform re-checks banned claims, skips opted-out.",
      },
      {
        title: "audience_builder — segments and lead scoring",
        description:
          "Criteria-defined audiences over sales1 fields. Scores from four signals. Never written back.",
      },
      {
        title: "growth_analyst — attribution, funnels, budgets, experiments",
        description:
          "Grounded chain: campaign stamps id on lead, lead converts, opportunity wins.",
      },
      {
        title: "creative_variants — variants without the ad buy",
        description:
          "Generates channel-spec variants. No ad-placement operation available.",
      },
    ],
    outcomes: [
      "Nothing reaches audience without person approval",
      "Brand voice becomes editable configuration",
      "Campaign figures recomputed from records",
      "Opt-out honoured at send site",
    ],
    integrations: [
      "Content seam — brand system, drafts, publish-on-approval",
      "Email — real SMTP or recorded in-process",
      "sales1 — form submits compose CRM lead; attribution reads live",
      "finance1 — campaign cost to payables gate. market1 moves no money.",
    ],
    suiteFit:
      "Demand source: qualified audiences into sales1, campaign spend to finance1's payables. Attribution reads lead's opportunity back from sales1.",
    trust:
      "Three policies on write path. Review-on-publish, ad-free refusal, truthful-claim gate. No ad-placement operation available. Publish, schedule-social, send-newsletter forced to human.",
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
        `Metrics, reports, dashboards computed live from ${INSIGHT_SOURCES_WORD} sibling systems at run time. Holds no business records, no write access. Human reviews every publish.`,
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Deck number typed once, true ever since.",
      "Two teams answer same question two ways.",
      "Dashboard reports figure with no working shown.",
      "Alert fires on uncomputable metric.",
    ],
    capabilities: [
      {
        title: "analyst — ask your data",
        description:
          "Plain-English ask mapped to source app and aggregation, run live. Cannot ground: stated.",
      },
      {
        title: "data_steward — the semantic metric layer",
        description:
          "One definition per metric. Dashboard tile and agent answer resolve same.",
      },
      {
        title: "anomaly_watch and narrator — findings with evidence",
        description:
          "Hourly baseline over period series, banded by severity. Alert on uncomputable sends nothing.",
      },
      {
        title: "forecast — a projection, labelled as one",
        description:
          "Least-squares trend with residual band and error. Labelled projection. Refuses under three periods.",
      },
      {
        title: "Reports, dashboards and scheduled delivery",
        description:
          "Draft then approval before audience reach.",
      },
      {
        title: "grounded_truth_judge — the pre-publish check",
        description:
          "Figures tie to governed metric. Forecast labelled projection. Row-level scope not widened.",
      },
    ],
    outcomes: [
      "One definition per metric, shared by dashboards and agents",
      "Uncomputable figure arrives as stated reason",
      "Anomalies and projections stay findings until person acts",
      "Publish record, approver, computation on audit chain",
    ],
    integrations: [
      "Eight sibling systems read in place",
      "Analytics seam — insight1's own connector",
      "Email — send-only for digests",
      "Report export as spreadsheet and PDF",
      "Governed flows to finance1 and supply1",
    ],
    suiteFit:
      `Reads ${INSIGHT_SOURCES_WORD} siblings, holds no write access. Every record it writes is its own. Proposes into owning app's queue. Moves no money, commits no purchase.`,
    trust:
      "Publish is governed action, requires explicit approval. Arming digest, alert, share consequential. Metric with unknown source app refused on save.",
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
        "22 object types, append-only trail. 12 agents plan, resource, track, draft. Client-facing or ledger-touching moves stop for human.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Plan is spreadsheet, never re-baselined.",
      "Time logged late, wrong project, or not at all.",
      "Overrun and slippage found at month-end review.",
      "Billing is manual reconciliation.",
    ],
    capabilities: [
      {
        title: "planner — the plan of record",
        description:
          "Breaks brief into tasks, milestones, estimates, critical path. Freezes baseline.",
      },
      {
        title: "scheduler — resourcing against real capacity",
        description:
          "Allocates people within capacity. Over-capacity goes to human.",
      },
      {
        title: "timesheet_clerk — time that belongs to something",
        description:
          "Captures time to real project and task. Refuses no project, other tenant, zero/negative or >24h daily.",
      },
      {
        title: "biller — the client bill",
        description:
          "Approved billable time to client bill. Amount from hours and rate. Requires explicit approval.",
      },
      {
        title: "controller — the engagement money view",
        description:
          "Rate cards, change orders, non-labour cost, per-project P&L, Earned Value.",
      },
      {
        title: "risk_watch and portfolio — RAID and the grounded metric",
        description:
          "RAID as records with owners. Severity recomputed from probability × impact.",
      },
    ],
    outcomes: [
      "Hours tie to real engagement",
      "Client bills signed by human from approved time",
      "Slippage and blockers are records with computed severity",
      "Reviewable trail: won quote to charter to bill",
    ],
    integrations: [
      "finance1 — delivered milestone reaches ledger via finance1's approval",
      "people1 — skills gap surfaces; headcount decision terminates there",
      "sales1 — charters from accepted quote, value from quote subtotal",
      "insight1 — portfolio metric carries numerator and denominator",
      "project-ops seam — repo, tracker, calendar",
      "project-management seam — reads, drafts, compute verbs, consequential actions",
    ],
    suiteFit:
      "Delivery hub. Receives from sales1 and service1. Source of flows to finance1 receivables and people1 recruiting. Both terminate at other app's gate.",
    trust:
      "Write-path refusals enforced in store and governed writer. Risk severity recomputed each write. Client portal read-only and token-scoped.",
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
        "19 object types: storefront, POS, marketplace orders, subscriptions on one system. Setting order paid or refunded queues for human.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Online and in-store keep separate books.",
      "Availability asserted one system, read another.",
      "Refunds and promos decided in chat.",
      "Nobody will switch on automation that charges.",
    ],
    capabilities: [
      {
        title: "One order book — cashier, channel_sync, subscription_manager",
        description:
          "Four entry paths: storefront, POS, marketplace, subscription. Same check: product exists, quantity >0. Total from price × quantity.",
      },
      {
        title: "fulfilment_planner and the returns queue",
        description:
          "Paid orders to shipped via pick, pack, ship. Order must be paid before ship. Return cannot exceed billed.",
      },
      {
        title: "inventory_sync — replenishment that drafts, never buys",
        description:
          "Hourly sync over availability ledger. Drafts supply1 order for shortfall to approved vendor.",
      },
      {
        title: "refund_agent — the only money-out agent, and it is gated",
        description:
          "Refund larger than captured blocked. Unparseable amount routes to human.",
      },
      {
        title: "The proposal layer — five computed capabilities, none of which decides",
        description:
          "Forecasting, recommendation, optimisation, fraud, recovery scoring. Price has hard floor.",
      },
      {
        title: "Tills, loyalty and gift cards",
        description:
          "Register close-out review. Loyalty redemption refused above balance. Gift cards issued on paid order.",
      },
    ],
    outcomes: [
      "Sale reconciles same whether till, online, or imported",
      "Money movement carries approval record and audit event",
      "Pricing, fraud, merchandising work arrives as proposal with floor",
      "Stock shortfall drafts to supply1's reorder",
    ],
    integrations: [
      "Commerce seam — capture, refund, void, publish consequential on connector",
      "Payments — delegated capture and refund seam",
      "Marketplace — Amazon, Flipkart, ONDC, Meesho modelled",
      "finance1 — approved capture posts receivable with GST",
      "supply1 — below-reorder drafts to approved vendor",
    ],
    suiteFit:
      "Sells side settles to finance1 receivables. Approved return to payables. Stockout drafts to supply1 reorder.",
    trust:
      "Write path refuses before review. Blocks at record level. Set order paid/refunded, approve return, close till, redeem loyalty/gift-card: all gated.",
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
        "North Star, missions, sprints, daily pulse, signals. 9 agents draft, project, propose. Signal apply needs approval unless Autopilot armed.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Goal document authored once, stale before quarter out.",
      "Progress in slides and spreadsheets, not updated between reviews.",
      "Goal not connected to agents and systems that move it.",
      "Plan changes go unrecorded.",
    ],
    capabilities: [
      {
        title: "signal_scout and the governed apply",
        description:
          "Scout always-on, read-only. Apply is separate agent, gated, consequential.",
      },
      {
        title: "Autopilot — an autonomy envelope with a ceiling and a cap",
        description:
          "Envelope per mission with ceiling and cap. Ceiling and cap re-checked every move.",
      },
      {
        title: "foresight_analyst — trajectory, risk and a labelled what-if",
        description:
          "Projects each mission from baseline and target. Clamped, labelled estimates.",
      },
      {
        title: "portfolio_strategist — breakthroughs, plays and bets",
        description:
          "Which missions at inflection. Bet status computed from foresight.",
      },
      {
        title: "Goal-to-action routing",
        description:
          "On predicted miss, names owning app and gate. goal1 hands proposal.",
      },
      {
        title: "pulse_coach — the daily beat",
        description:
          "Daily pulse and briefing. What moved and who moved it.",
      },
    ],
    outcomes: [
      "Portfolio reads live between reviews",
      "Autonomy per mission with ceiling and cap",
      "Signal decision rationale on audit chain",
      "Clear split: immediate agent actions vs human-gated",
    ],
    integrations: [
      "Knowledge seam — declared on all 9 agents",
      "Analytics seam — scout, analyst, strategist",
      "enterprise1 — approvals, audit, autonomy, wave gate",
      "finance1 and supply1 — routing targets",
    ],
    suiteFit:
      "Runs in-process inside enterprise1. Portfolio is one governed blob per tenant. No separate goal1 service. Writes nothing to sibling.",
    trust:
      "Autonomy granted, not seized. Arming envelope refuses critical ceiling. Apply out-of-envelope, retire mission, disburse crew: consequential. Most writes immediate, policy-evaluated, audited.",
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
