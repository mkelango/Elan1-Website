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
        "sales1 is a CRM system of record — 29 object types, lead through opportunity, quote, sales order, subscription and commission — with thirteen sales agents and a verification judge working on top of it. They research, score, draft and propose. Marking a deal Closed Won, paying a commission, renewing a subscription and releasing an order to fulfilment each stop at a human approval.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Reps retype what the CRM already knows, and the record still drifts from what was said on the call.",
      "Quote totals, discounts and commission figures get typed by hand, so no number traces back to the record it came from.",
      "The forecast rolls up from the same fields the rep edits — the roll-up and the commitment are the same guess twice.",
      "Drafting outreach with AI is easy. Letting AI near a discount, a renewal or a payout is a different problem.",
    ],
    capabilities: [
      {
        title: "deal_closer — the close motion",
        description:
          "Reads each open deal and proposes the next move: advance the stage, set a next step, or mark Closed Won. Advancing is an immediate governed write; Closed Won is a revenue commitment and routes to a human approval. Self-verifying, one-tap autonomy. Its instruction is explicit — the number a deal carries is the record's amount, never invented.",
      },
      {
        title: "quote_proposal — catalog-grounded quotes and CPQ",
        description:
          "Drafts a proposal with line prices drawn from the product master and its price books; a quote line naming a product but no price inherits the effective book price. Declared human-led, so pricing and contracts wait for a person. A discount at or under the rep's authority applies immediately; a deeper one escalates to the deal desk.",
      },
      {
        title: "outbound_sdr — the single outreach path",
        description:
          "Researches, drafts the sequence and handles replies, carrying the brand-voice and cadence skills. Declared requires-approval with a consent policy tag: a send waits for a one-tap human confirm, a do-not-contact recipient is blocked outright, and a cadence auto-unenrols anyone who has already replied.",
      },
      {
        title: "forecast — the grounded roll-up",
        description:
          "Rolls open opportunities up by category (commit, best-case, pipeline) with a stage-weighted figure and gap-to-quota, computed live from the records. A rep's committed number sits beside the roll-up, never as its source. Read-only — its tool list is the CRM seam and nothing else.",
      },
      {
        title: "o2c_fulfil — order to cash as one governed move",
        description:
          "Releasing a confirmed sales order drives a supply1 shipment and a finance1 receivable as a single compensating transaction. If invoicing fails after the shipment exists, the shipment is voided and the order reverts to confirmed. The human approval is what executes the saga, not a note filed after it.",
      },
      {
        title: "crm_hygiene — duplicates, proposed not merged",
        description:
          "Runs daily, detects duplicate records and proposes merges. The merge itself is a consequential operation and waits for a person — the agent finds the duplicates, it does not resolve them.",
      },
    ],
    outcomes: [
      "Less field-keeping, more selling time",
      "Quotes, discounts and commissions that tie back to a record",
      "A forecast assembled from open deals rather than from optimism",
      "An approval trail an auditor can follow end to end",
    ],
    integrations: [
      "The CRM seam — sales1's own system of record, not a connector to someone else's CRM",
      "Email and calendar — outreach and meeting seams; a send is consent-checked and one-tap confirmed",
      "Voice and meeting capture — declared seams for recording and transcription, not a live integration",
      "LinkedIn and WhatsApp — a sequence step routes its draft to the channel's seam with its own send-confirm",
      "Web research — public firmographic and news context for the account brief",
      "Enrichment providers — a priority-ordered waterfall; each merged value cites its provider, and a human-set field is never overwritten",
      "finance1, supply1, project1, service1 and market1 — in-platform, through governed cross-app sagas rather than external APIs",
    ],
    suiteFit:
      "sales1 is the demand hub of the suite, and it composes in both directions. Outbound: a won deal feeds finance1's receivable, charters a delivery engagement in project1, and releasing a confirmed order runs the supply1 shipment and the finance1 invoice as one compensating move. A commission payout composes finance1's payables, a subscription renewal its receivables, and account context hands to service1 at onboarding. Inbound: market1 passes a qualified lead or an event registration to the inbound SDR, and service1 passes a churn signal to the retention agent. The apps stay decoupled — the core orchestrates each saga, and every step keeps its own approval gate rather than inheriting the caller's.",
    trust:
      "sales1's governance signature is written down as \"the agent proposes, a human commits\", and its Trust Mark is gated on six eval sets. Eight named actions carry their own approval: Closed Won, order-to-cash fulfilment, commission payout, subscription renewal, blanket release, a bulk import commit, any agent move on a record, and a discount only when it exceeds the rep's ceiling. An approval token is bound to both the action and a content hash of the exact payload and is consumed on use, so a token approved for one operation cannot be spent on another. Some writes are immediate rather than gated, and we name them: a stage move below Closed Won, a next step, a risk flag, a note, a lead score or route, a sequence enrollment, and a discount within authority. Those still pass policy evaluation and land in the hash-chained audit — which stores field keys rather than raw values, so erasure requests can still be honoured.",
    workforce: {
      registered: 14,
      launchWave: 4,
      note: "Fourteen specs — thirteen working agents plus the pre-write verification judge. Four are enabled in the launch wave; the rest are turned on per tenant by an operator. A function outside a tenant's enabled set is refused before it acts, and a suspend switch overrides the whole set.",
    },
    systemOfRecord: {
      objectTypes: 29,
      note: "sales1 owns its records rather than syncing someone else's. Lead, contact, account and opportunity through quote, sales order, subscription, commission and quota, plus the machinery — sequences, scoring models, playbooks and assignment rules. A create against a type outside the 29 is rejected by name.",
    },
    copilots: [
      { name: "Conversation intelligence", mode: "acts-through-a-gate", does: "Paste a call transcript: it returns a computed rep-to-prospect talk ratio, extracted next steps, risk signals and MEDDIC coverage scored out of six — all derived from the transcript text. Linked to an opportunity, it logs the analysis through the governed writer." },
      { name: "Deal intelligence", mode: "advisory", does: "For one opportunity, computes a win probability from stage, engagement and age, and shows all three components rather than just the score. The recommendation is advisory; the rep acts." },
      { name: "RevOps analytics", mode: "advisory", does: "Win rate, open-stage distribution, average deal age as a velocity proxy, open and won value — computed at read from the opportunity book. Nothing is stored." },
      { name: "Lead score and enrich", mode: "acts-through-a-gate", does: "Scores a lead live against the active scoring model and returns which criteria matched, never a stored number. Enrichment runs a priority-ordered waterfall where the first provider holding a field wins, each value cites its provider, and a human-set value is never overwritten." },
      { name: "Guided playbook", mode: "advisory", does: "Returns the playbook matching the deal's current stage, carrying its own note: guidance for the rep, never an autonomous move." },
      { name: "Cadence worklist", mode: "advisory", does: "Sequence enrollments whose next step is due, sorted due-first, with status computed at read — an inbound reply after enrollment flips it to replied. A send step still waits for a one-tap confirm." },
    ],
    automations: [
      { name: "account_research", trigger: "cron:nightly", does: "Keeps a 360 brief on the account and its contacts current from the CRM and the web. Read and enrich only — nothing customer-facing is sent from this agent." },
      { name: "crm_hygiene", trigger: "cron:07:00", does: "Detects duplicates by exact-match key and proposes merges. The merge is human-confirmed." },
      { name: "forecast", trigger: "cron:weekly", does: "Roll-up by forecast category with a stage-weighted figure and gap-to-quota, plus sandbagging and pipeline-risk reads. Read-only." },
      { name: "deal_strategy", trigger: "event:stage.changed", does: "On a stage change, builds the stakeholder map, surfaces risk and drafts a battlecard, win plan and mutual action plan. Analyse and draft only." },
      { name: "inbound_sdr", trigger: "event:lead.created", does: "Enriches, scores against the ICP, routes and books. The first-touch email is one-tap confirmed." },
      { name: "meeting", trigger: "event:call.ended", does: "Transcribes, extracts MEDDIC, logs the activity, updates the stage and drafts follow-ups. The judge checks the update against the transcript before write-back." },
      { name: "cs_churn", trigger: "event:usage.dropped", does: "Health-scores the account, flags churn risk, runs the renewal playbook and drafts a QBR." },
      { name: "orchestrator", trigger: "event:*", does: "The always-on router: sequences specialists and runs the verification judge before commit-or-queue. It never acts unsupervised on a consequential step." },
    ],
    skills: {
      count: 6,
      note: "Versioned, git-tracked manifests reused by the agents that own them — cadence governance, brand voice, MEDDIC qualification, ICP scoring and territory rules among them.",
    },
    mcpSeams: [
      { name: "CRM", status: "live", note: "The native system-of-record seam, declared by 13 of the 14 specs. The grant is enumerated operation by operation, and four are consequential by declaration: merge, generate quote, accept quote, delete." },
      { name: "Email · calendar", status: "declared", note: "Outreach and scheduling. Every send is consent-checked at the send site and one-tap confirmed." },
      { name: "Voice · meet", status: "declared", note: "Call and meeting capture. Recording and transcription are declared seams pending credentials." },
      { name: "Web", status: "modelled", note: "Public firmographic and news research behind a deterministic adapter." },
    ],
    dashboards: [
      "Sales dashboard — weighted forecast, gross pipeline, open opportunities and lead conversion, with pipeline-by-stage and activity volume, as read models over the CRM.",
      "Pipeline — the live kanban over the opportunity records; a drag persists the stage as a governed write, and dragging into Closed Won routes to a human gate.",
      "Forecast — roll-up by category with the stage-weighted figure and gap-to-quota beside the rep's own commit.",
      "Engagement — the cadence worklist and conversation intelligence in one place.",
      "Agents and automation — every proposal an agent has made on a record, and what happened to it.",
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
      "order_to_cash — one confirmed order drives a supply1 shipment and a finance1 invoice as a single compensating move",
      "onboarding_handoff — account context passes to service1",
      "campaign_to_pipeline · event_to_pipeline — market1 hands in a qualified lead or registration",
      "voc_to_retention — service1 hands in a churn signal",
    ],
    pricingTiers: [
      { name: "Per seat", description: "For teams adopting agentic selling, billed per rep." },
      { name: "Enterprise", description: "SSO, governance, and platform integration via enterprise1." },
    ],
    seo: {
      title: "sales1 — the agentic CRM where a human still commits | elan1",
      description:
        "sales1 is a CRM system of record with 29 object types and thirteen sales agents plus a verification judge. Agents research, score, draft and propose; closing a deal Won, paying a commission and releasing an order to fulfilment each stop at a human approval.",
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
        "service1 runs on its own service-desk system of record — cases, messages, SLA policies, knowledge, surveys, quality reviews and thirteen more object types — with eleven agents that summarise, triage, score and draft against it. A reply is queued for sending, never sent; a refund, an account change or a case close is refused at the data layer without a human approval.",
      primaryCta: "Book a demo",
    },
    problem: [
      "A deflection bot answers confidently when it has no source, and the customer pays for the difference.",
      "Support numbers are stored counters, so the figure on the dashboard slowly stops matching the case book it claims to summarise.",
      "An AI reply that can send itself leaves you nowhere to stand when it says the wrong thing.",
      "The complaint queue gets rebuilt inside every other system — disputes, grievances, breakdowns, returns — each one half a service desk with its own rules.",
    ],
    capabilities: [
      {
        title: "answer — grounded, cited answers",
        description:
          "Answers only from retrieved knowledge and cites every claim; where the knowledge base does not support an answer it says so. Its entire tool grant is the knowledge seam, so it can retrieve and cannot act on a record. One of the four functions enabled in the launch wave.",
      },
      {
        title: "resolution — the case owner",
        description:
          "Owns the conversation across the helpdesk, CRM and knowledge seams, in the case's own language. It drafts: the draft lands on the case marked as needing a send, and a person sends it. Declared requires-approval with a sensitive-action tag, and consequential agents are off by default until an operator enables them.",
      },
      {
        title: "triage_routing and escalation — the SLA spine",
        description:
          "Triage classifies intent, urgency and sentiment, routes to a team that is actually available and under capacity, and starts the SLA clock — read and route only. Escalation fires on an SLA breach and opens a ticket assigned to a human carrying the account, the history and what was tried. Its instruction is: flag, never act on money.",
      },
      {
        title: "Deflection and governed resolution",
        description:
          "Self-service answers only above a confidence floor. Below it the endpoint routes to a human with the reason \"no confident KB match\". Above it, auto-resolve returns a cited draft and a proposed status of resolved — a proposal. The agent never closes the case.",
      },
      {
        title: "quality and insight_voc — scorecards and upstream fixes",
        description:
          "Both read-only and both in the launch wave: one scores resolutions, the other clusters cases into upstream fixes. CSAT, effort and NPS live on one survey record, and per-agent scorecards are derived by joining a survey to the case's assignee — computed at read, never stored.",
      },
      {
        title: "knowledge_author — the corpus, kept honest",
        description:
          "Sweeps weekly for knowledge gaps and drafts articles from resolved cases. It refuses to invent one: only a resolved case seeds an article, and a case with no outbound message has no resolution to distil. Publishing is a separate human decision, because the corpus is what the answer agent cites.",
      },
    ],
    outcomes: [
      "An answer you can trace back to a document — and an uncited one that is visible as uncited",
      "A refund, an account change and a close that each carry an approver's name and an audit row",
      "Support figures you can defend in a review, computed from the case book at read time and disclosing their own sample",
      "One desk behind the rest of the suite, so a dispute, a grievance or a breakdown lands in a queue that already has a governance signature",
    ],
    integrations: [
      "The helpdesk seam — tickets, customer 360, orders, SLA status, notes and status changes (modelled adapter)",
      "The knowledge seam — retrieval that returns citations; vector-backed in a full deployment, in-memory locally",
      "The CRM seam — read the account, update the record",
      "Email and WhatsApp — send and receive, both modelled adapters",
      "service1 declares no connectors of its own: it consumes the shared fabric under named, least-privilege scopes",
      "In-suite rather than external: an approved refund posts a finance1 credit note, a churn signal reaches sales1, and a case needing field work charters a project1 engagement",
    ],
    suiteFit:
      "service1 is the post-sale hub, and the hand-offs are named sagas rather than a description. Outbound: an approved refund posts to finance1, where the money leg terminates at finance1's own maker-checker gate — service1 never moves money; a voice-of-customer churn signal reaches sales1; a case needing field work charters a project1 engagement. Inbound: sales1 hands over account context at onboarding, people1 provisioning runs through the service queue rather than autonomously, and supply1 hands over a batch defect or recall — supply1 detects and drafts it, service1 owns the customer outcome. Vertical packs open cases here rather than building a second desk: bank1 disputes, insure1 grievances, gov1 citizen grievances, telco1 complaints, manufacture1 breakdowns, retail1 returns, realestate1 snags, energy1 outages, edu1 student support. That migration is per-vertical and is not uniform — edu1's support route still writes its case record directly.",
    trust:
      "The refusal is in the data layer, not only in the prompt. A sensitive action — refund, account change, close — or any move into a consequential status is refused without an explicit human approval. A refund with no amount is refused outright: service1 never posts an unspecified amount, and on approval it posts a finance1 credit note idempotently rather than moving money itself. Publishing a knowledge article is a separate human decision, because the corpus the answer agent cites is the thing being grounded on. The Trust Mark is eval-gated across six named sets, and a mark that outlives its evals is auto-revoked. Two limits stated plainly: the grounding eval measures lexical support and the absence of invented figures, not entailment; and an honest \"I don't have a documented answer for that\" currently scores as uncited, which is recorded in the source rather than papered over.",
    workforce: {
      registered: 11,
      launchWave: 4,
      note: "Eleven agents including the pre-write verification judge. Four are enabled at launch — the read-and-analyse ones. The consequential agents stay off until an operator enables them for that tenant through a gated rollout.",
    },
    systemOfRecord: {
      objectTypes: 19,
      note: "The service desk itself: cases and messages, SLA policies and business hours, knowledge articles and macros, surveys and quality reviews, routing rules, entitlements, service contracts and covered assets, organisations, contacts, teams and agent profiles.",
    },
    copilots: [
      { name: "Case copilot", mode: "acts-through-a-gate", does: "Sits in the channel inbox: summarises the thread, suggests a cited reply and drafts it onto the case. The send is a separate human action." },
      { name: "Resolution copilot", mode: "acts-through-a-gate", does: "On a case, proposes the resolution and the reply together, with the proposed status shown as proposed rather than applied." },
      { name: "Escalation risk", mode: "advisory", does: "Scores which open cases are heading for a breach, from the SLA clock and the thread — computed live, not a stored flag." },
      { name: "Deflection assistant", mode: "advisory", does: "Tests a question against the knowledge base and shows the confidence and the matched articles, so you can see why it would or would not deflect." },
      { name: "Service analytics", mode: "advisory", does: "First-response time, resolution time, reopen rate and deflection rate — each computed at read and each reporting the denominator it rests on." },
      { name: "At-risk worklist", mode: "advisory", does: "The queue that needs attention now, ranked by breach proximity and customer effort." },
    ],
    automations: [
      { name: "SLA-breach escalation", trigger: "event:case.sla_breached", does: "Emitted from the service record's own write path when a case flips to breached, bound to the escalation agent. Seeded disabled and gated." },
      { name: "triage_routing", trigger: "event:ticket.created", does: "Classifies intent, urgency and sentiment, routes to an available team and starts the SLA clock." },
      { name: "resolution", trigger: "event:message.received", does: "Picks up an inbound message and drafts the next reply onto the case." },
      { name: "escalation", trigger: "event:sla.breaching", does: "Opens a human-assigned ticket carrying the account, the history and what was tried." },
      { name: "knowledge_author", trigger: "cron:weekly", does: "Sweeps for knowledge gaps and drafts articles from resolved cases. Publishing stays a human decision." },
      { name: "quality", trigger: "cron:weekly", does: "Auto-QA over resolutions, writing quality reviews." },
      { name: "insight_voc", trigger: "cron:weekly", does: "Clusters cases into upstream fixes and surfaces the drivers of contact volume." },
      { name: "workforce", trigger: "cron:weekly", does: "Forecasts capacity against the queue." },
      { name: "orchestrator", trigger: "event:*", does: "The always-on router across every topic the desk emits." },
    ],
    skills: {
      count: 10,
      note: "Case triage and sentiment scoring, the cited-reply copilot, escalation rules, quality rubrics and voice-of-customer clustering — each owned by the agent that uses it.",
    },
    mcpSeams: [
      { name: "Helpdesk", status: "modelled", note: "Declared by nine of the eleven agents, under least-privilege scopes: read tickets, customer 360, orders and SLA status; write notes, status and tags." },
      { name: "Knowledge", status: "modelled", note: "Retrieval that returns citations. Vector-backed in a full deployment; an in-memory retriever locally." },
      { name: "CRM", status: "live", note: "Read the account and update the record — the same sales1 system of record, not a copy." },
      { name: "Email · WhatsApp", status: "modelled", note: "Send and receive. A drafted reply is stored for a human to send, not dispatched." },
    ],
    dashboards: [
      "Service dashboard — open cases, SLA at risk, urgent count and CSAT, with cases-by-status and volume-by-channel over the case record.",
      "Channel inbox — one omnichannel queue across email, WhatsApp, voice and web, with the full thread; a reply records a real outbound message, and refund and close are human-gated.",
      "Cases — every case with its fields, custom fields, worklogs and entitlement.",
      "Knowledge and macros — the corpus the answer agent cites, with the deflection assistant beside it.",
      "Scorecards — per-agent quality derived by joining a survey to the case's assignee, computed at read.",
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
        "service1 runs a customer-service desk on its own system of record. Agents triage, score and draft cited replies; a refund, an account change or a close is refused without a human approval. Resolve, don't deflect.",
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
        "finance1 is a double-entry system of record — 33 object types, 19 console screens, 15 declared agents — that drafts journals, matches statements, captures payables documents, chases receivables and assembles GST returns from the posted ledger. Nothing here pays: releasing a payment is refused without an explicit human approval, and the drafter can never approve their own entry.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Month-end close is a checklist worked by hand, and nobody can prove the period ties out before it is locked.",
      "Payables invoices are keyed twice and coded from memory; the second copy is found after it has been paid.",
      "Reports are rebuilt in a spreadsheet, so the number in the board deck and the number in the ledger drift apart.",
      "Finance automation is all-or-nothing: trust it with the payment run, or leave it switched off.",
    ],
    capabilities: [
      {
        title: "close — month-end close, drafted",
        description:
          "Runs on the period-close event: checklist, accruals, journal drafts and grounded period-over-period flux narratives. Close tasks form a dependency graph — a task naming an incomplete dependency cannot complete — and locking the period is refused while any gating task or account reconciliation is still open. The agent drafts; a different human posts.",
      },
      {
        title: "ap — capture, three-way match, payment run",
        description:
          "Document in, deterministic extraction out — the record is stamped as deterministic, because there is no OCR or vision model in this path and a document-AI connector is a declared future seam, not a shipped one. Ledger coding is suggested from the vendor's own prior bills with the basis cited. A bill carrying a vendor invoice number already on file is refused at the write, and a bill cannot advance to matched or approved without a three-way match against its supply1 purchase order.",
      },
      {
        title: "ar and credit_control — cash in",
        description:
          "Cash application allocates a remittance against open receivables down a labelled ladder — reference match, exact amount, then oldest first — and each proposed receipt is a draft. Collections stage overdue receivables into a dunning ladder grounded in the aging, with promises-to-pay and computed overdue interest. An invoice that would push a customer past their credit limit is refused at the ledger, against an open balance derived as invoiced minus released payments.",
      },
      {
        title: "treasury and reconciliation — the cash position, computed",
        description:
          "Per bank account, the book balance from statement movements shown against the ledger balance of the linked cash account, plus a 13-week direct cash forecast where an invoice with an open promise-to-pay moves to the promised date. Statement lines auto-match by rule, and auto-certification is limited to a spotless account: with any unmatched line it returns uncertified and hands the exceptions to a human. Read-only throughout — it never moves money.",
      },
      {
        title: "compliance — India statutory, assembled from the ledger",
        description:
          "GSTR-1 and GSTR-3B built from the ledger's GST invoices rather than keyed in, GSTR-2B reconciliation to surface input-credit mismatches before filing, e-invoice IRN and signed QR, e-way bills, and TDS withholding entries whose journal posts through the ordinary maker-checker gate. Filing is human-approved and residency-bound to India. Each statutory provider reports its own mode, modelled or live, so the console can badge which rail is which.",
      },
      {
        title: "Assets and depreciation — a finance1 module, not a second app",
        description:
          "The fixed asset lives in finance1's own ledger, depreciation runs on finance1's ledger engine with a tie-out register, and disposal and impairment are human-gated. It was folded in deliberately: an asset that depreciates into a different ledger than the one it is reported from is how the two stop agreeing.",
      },
    ],
    outcomes: [
      "A close you can defend: the period cannot be locked while a gating task or an account reconciliation is still open",
      "The duplicate vendor invoice is refused at the write, not discovered on the bank statement",
      "Statements that cannot disagree with the ledger, because they are computed from it at read time and never stored on a report",
      "Automation you enable one function at a time, and disable the same way",
    ],
    integrations: [
      "The ERP seam — the shared accounting connector on the core fabric. finance1 declares no connector of its own; it is granted least-privilege scopes on this one, and the default adapter is modelled.",
      "India statutory gateways — a port with two adapters: modelled by default, and a live adapter selected by configuration. Each provider's mode is surfaced so the console can show which rail is live.",
      "Bank feed — statement lines pulled into transaction rows through a modelled feed; a line already ingested for that account is skipped, so re-pulling is safe.",
      "supply1 purchase orders — read cross-app for the three-way match before a vendor bill can be approved.",
      "A governed tool surface — finance1's audit-prep runs as an MCP tool through the same runtime, gates and audit as the console.",
    ],
    suiteFit:
      "finance1 is where the suite settles. A service1 refund posts a credit note; project1 revenue events, retainers and expenses post receivables; people1 payroll and comp decisions post payables; sales1 subscriptions and commissions and commerce1 orders and returns post their own legs — each tagged with its source and each landing through finance1's governed writer, never a forked ledger. All ten industry packs settle into that same ledger, and a guard test fails structurally if a pack posts a finance leg without declaring the dependency in its contract. Governance, identity, approvals and the hash-chained audit come from enterprise1.",
    trust:
      "Money does not move on an agent's say-so, and the refusals are in code rather than in a policy document. A money action with no idempotency key is blocked outright — no double-posting — and otherwise always requires approval. The store refuses the rest: no autonomous money, a payment is human-approved; segregation of duties, the drafter cannot approve their own entry; an unbalanced journal is refused with its own debit and credit totals. The write path also refuses a payment allocation above the invoice, a credit note above the invoice's remaining value, a duplicate vendor invoice number, a bill approved without a three-way match, a journal that would push an account over its period budget, an invoice that would breach a customer's credit limit, and a period lock while reconciliations are open. A defined set of actions is human-gated: releasing a payment, issuing a credit or debit note, posting to the ledger, closing a reconciliation, completing a close task, filing a GST return, writing off a receivable, approving an expense claim, disposing an asset, and any delete. Drafting is immediate and audited. Every tool-using agent carries the not-financial-advice disclosure skill, and the safety eval scores advice by shape rather than by a list of phrases — an output carrying no prose is reported as not measurable rather than as passed.",
    workforce: {
      registered: 15,
      launchWave: 6,
      note: "Fifteen agents including the pre-write judge. Six ship enabled; the rest are turned on one function at a time by an operator, and a run of a disabled function is blocked before it acts.",
    },
    systemOfRecord: {
      objectTypes: 33,
      note: "The ledger itself and everything that posts to it: accounts and journal entries, invoices, payments, credit and debit notes, bills, bank accounts and transactions, reconciliations, close tasks, budgets and FX rates, the India statutory set — GST returns, e-invoices, e-way bills, TDS entries — dunning, and fixed assets.",
    },
    copilots: [
      { name: "Action copilot", mode: "acts-through-a-gate", does: "Takes a finance instruction and returns the drafted action with its ledger effect shown. The draft is immediate; anything consequential queues for approval." },
      { name: "Controller copilot", mode: "advisory", does: "Answers a controller's question from the posted ledger, citing the records the answer was computed from rather than asserting a figure." },
      { name: "Conversational finance in assistant1", mode: "acts-through-a-gate", does: "Finance intents asked in the central assistant route here — assistant1 holds no writer of its own, so the proposal lands at finance1's own gate." },
    ],
    automations: [
      { name: "Overdue-AR dunning", trigger: "event:invoice.overdue", does: "Emitted by the governed write path when an invoice's folded status becomes overdue, bound to the receivables agent." },
      { name: "Month-end close prep", trigger: "event:period.close", does: "Emitted when a close run is kicked off, bound to the close agent." },
      { name: "controls_audit", trigger: "cron:nightly", does: "Sweeps the controls and reports exceptions." },
      { name: "fx", trigger: "cron:monthly", does: "Proposes the FX revaluation. A proposal — the journal still posts through maker-checker." },
      { name: "compliance", trigger: "cron:monthly", does: "Runs the statutory and GST checks against the ledger." },
      { name: "ap · credit_control", trigger: "event:invoice.received", does: "Two agents on one event: capture and code the bill, and check the counterparty's credit exposure." },
      { name: "reconciliation · treasury", trigger: "event:statement.imported", does: "Auto-match the statement, then recompute the cash position. Both read-only." },
      { name: "expense_audit", trigger: "event:expense.submitted", does: "Screens the claim against policy before a human approves it." },
      { name: "orchestrator", trigger: "event:*", does: "The always-on router across every finance topic." },
    ],
    skills: {
      count: 12,
      note: "Accounting method rules that require every entry to balance and every figure to be grounded, the payables capture pipeline, three-way match rules, dunning ladders, GST assembly and the not-financial-advice disclosure carried by every tool-using agent.",
    },
    mcpSeams: [
      { name: "ERP", status: "modelled", note: "The only connector finance1 declares, used by 14 of its 15 specs. A modelled adapter on the shared fabric, not a live integration." },
      { name: "India statutory", status: "declared", note: "GSTN, IRP and NIC rails behind one port with modelled and live adapters. Each provider reports its own mode so the console can badge it." },
      { name: "Bank feed", status: "modelled", note: "Statement ingestion, idempotent per line per account." },
    ],
    dashboards: [
      "Finance dashboard — cash net change, trial-balance tie-out shown tri-state, net income, receivable and payable overdue exposure, and open draft journals. It reads the same live report endpoints as the statements screen, so the two cannot disagree.",
      "Financial statements — P&L, balance sheet and cash flow, computed from the posted ledger at read time.",
      "Payables — capture, three-way match, and the payment run that stops at a human.",
      "Receivables and collections — aging, the dunning ladder and promises-to-pay.",
      "Banking and reconciliation — statement matching, with certification limited to a spotless account.",
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
      "procure_to_ap — supply1 hands a proposed reorder's value to finance1's payables gate",
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
        "finance1 is a double-entry system of record with 15 declared agents that draft the close, capture payables, match statements and assemble GST returns from the posted ledger. Releasing a payment is refused without a human approval.",
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
        "supply1 runs demand planning, replenishment, procurement, inventory, quality and supply analytics on its own system of record — 32 object types, from purchase orders and receipts through batches, serials and the stock ledger. Nine agents compute and draft; a purchase order can only name a supplier on the approved-vendor list, and submitting one is a human decision that carries an idempotency key.",
      primaryCta: "Book a demo",
    },
    problem: [
      "On-hand, on-order and available-to-promise disagree, because stock truth lives in spreadsheets beside the system that holds the orders.",
      "The approved-vendor rule is a policy document rather than a check on the write, so off-list spend is found afterwards.",
      "Replenishment quantities are typed by hand, and nobody can reconstruct what they were derived from.",
      "Receipts, returns, batches and serials are tracked apart from valuation, so the ledger and the goods drift out of agreement.",
    ],
    capabilities: [
      {
        title: "demand_planner — demand planning",
        description:
          "Forecasts per-SKU demand over a horizon from that SKU's own committed-order history. A SKU with too little history comes back ungrounded — \"no committed-PO history for sku\" — never as an invented number. Read-only; the projected gap is what replenishment plans against.",
      },
      {
        title: "reorder — replenishment",
        description:
          "Compares projected availability, on-hand plus committed on-order, against each reorder rule's minimum and maximum, and drafts consolidated purchase orders by preferred supplier. Drafts only: the spec is declared requires-approval at the human-led tier, and each drafted order still meets the approved-vendor check.",
      },
      {
        title: "procurement — the buying surface",
        description:
          "Purchase orders, RFQ comparison ranked from the real quotations, requisitions, goods receipts with the three-way match and partial receipts, blanket orders with a computed cap, and supplier comms. Human-led and self-verifying: the judge runs before the write.",
      },
      {
        title: "supplier_risk — the approved-vendor registry",
        description:
          "Keeps the registry and the scorecards, and scores delivery, quality and single-source concentration exposure. Read and analyse only — approving, blocking or awarding is a human decision recorded as a supplier review, and an unapproved supplier is never returned as recommended.",
      },
      {
        title: "inventory — warehouses, transfers and valuation",
        description:
          "Per-warehouse, per-SKU stock with computed available-to-promise, governed transfers, and a stock ledger where every valued movement carries a moving-average or FIFO running cost replayed from the ledger rather than typed. Handing the value to finance1 drafts an inventory journal a finance human posts.",
      },
      {
        title: "quality — incoming QC, recalls and returns",
        description:
          "Inspects receipts, holds batches, drives first-expiry-first-out and return-to-vendor, and fires on a shipment exception. A defect quantity above the inspected sample is refused, and a recall hands to service1, which owns the customer outcome.",
      },
    ],
    outcomes: [
      "Buying you can reconstruct: every committed purchase order names an approved supplier, an approver and an idempotency key",
      "Replenishment quantities that trace to a computed projection instead of a typed one — and an honest \"not enough history\" when there is none",
      "One stock truth across warehouses, because the write refuses the states that would break it rather than recording them",
      "Inventory value that can be re-derived by replaying the ledger — the same record finance1's three-way match reads",
    ],
    integrations: [
      "The inventory seam — stock, demand signals, draft orders and reorder points. Modelled adapter.",
      "The supplier seam — supplier reads plus idempotent, human-approved order commitments and supplier comms. Modelled adapter.",
      "E-procurement — supplier-portal catalog and price-list fetch. Modelled by default; it calls a live portal only when an endpoint is configured, and a fetched row becomes real pricing only through the governed writer.",
      "WMS / 3PL — an external stock feed, same shape: modelled by default, live only when configured, and a fetched count becomes a real record only through the governed reconciliation writer.",
      "In-suite seams: finance1 for payables and the three-way match, service1 for recall handover, commerce1 for stock truth, insight1 for published procurement metrics.",
    ],
    suiteFit:
      "supply1 is the stock-truth system the rest of the suite reads against. Two governed flows start here: a proposed reorder's value hands to finance1's payables writer, where the money leg terminates at finance1's own approval — supply1 never moves money around it; and a batch defect or supplier recall hands to service1's resolution queue. finance1's three-way match runs against the supply1 purchase order and its receipt. commerce1 reconciles catalog availability against supply1's inventory and flags mismatches, and a commerce1 replenishment lands as a draft order against a vendor already on supply1's approved list — submitting it stays supply1's human-approved step. The retail1, manufacture1 and energy1 packs compose supply1's own agents as configuration, not forks.",
    trust:
      "Approved-vendor-only is a check on the write. Creating a purchase order against a supplier that is not approved, or is blocked or suspended, is refused at the system of record. The same check guards subcontract orders and blanket orders, so neither can route spend around it, and awarding an RFQ or sourcing a requisition passes through the identical gate. Submitting is a separate decision: the store refuses with \"no autonomous commitment — a PO is human-approved\", and refuses again without an idempotency key — a replay returns the original receipt and orders nothing. The write path also refuses a blanket release beyond its cap, a receipt beyond the ordered quantity, a transfer beyond the source warehouse's available-to-promise, reserved above on-hand, a return beyond the net received, a defect quantity above the inspected sample, a second allocation of a serial, an expired batch, and publishing a procurement metric with no committed orders behind it. The Trust Mark is gated on an eight-set eval battery scored against live records, and drift auto-revokes it on re-verification. Figures are decision support, not advice.",
    workforce: {
      registered: 9,
      launchWave: 3,
      note: "Nine agents including the pre-write judge. The launch wave enables the read-and-analyse three — inventory, supplier risk and analytics. The two commitment agents are deliberately not in it; a run of a disabled function is refused by name.",
    },
    systemOfRecord: {
      objectTypes: 32,
      note: "The deepest record in the suite: purchase orders, requisitions, RFQs, quotations and supplier prices; receipts, subcontracting, blanket orders; warehouses and warehouse stock, transfers, serials and batches; landed-cost vouchers, stock reconciliations and the valued stock ledger.",
    },
    copilots: [
      { name: "Replenishment copilot", mode: "acts-through-a-gate", does: "Shows the projected gap per SKU against its reorder rule and drafts the consolidated orders — with the projection's inputs visible, not just its output." },
      { name: "Sourcing copilot", mode: "advisory", does: "Ranks live supplier quotations for a requisition and shows the comparison, including which suppliers are on the approved list and which are not." },
      { name: "Supplier-risk copilot", mode: "advisory", does: "Scores delivery, quality and concentration exposure from recorded history, and names the single-source dependencies." },
      { name: "Control-tower copilot", mode: "advisory", does: "Triages open exceptions across shipments, orders and stock into a worked priority order. It scores and prioritises; resolving stays a person's move." },
    ],
    automations: [
      { name: "reorder", trigger: "event:stock.low", does: "Drafts replenishment orders when projected availability falls under the rule. Drafts only." },
      { name: "procurement", trigger: "event:po.due", does: "Works the buying surface as orders come due." },
      { name: "inventory", trigger: "cron:nightly", does: "Recomputes availability and valuation across warehouses." },
      { name: "supplier_risk", trigger: "cron:weekly", does: "Rescores the supplier base and refreshes the scorecards." },
      { name: "demand_planner", trigger: "cron:weekly", does: "Refreshes the per-SKU forecast, refusing SKUs with too little history." },
      { name: "analytics", trigger: "cron:weekly", does: "Recomputes procurement metrics; publishing one with no committed orders behind it is refused." },
      { name: "quality", trigger: "event:shipment.exception", does: "Inspects, holds and drafts the recall path when a shipment throws an exception." },
      { name: "orchestrator", trigger: "event:*", does: "Consumes demand signals, low stock, shipment exceptions, orders due and supplier replies, and routes each to its specialist." },
      { name: "Operator-run sweeps", trigger: "manual", does: "A low-stock sweep, an e-procurement catalog sync and a WMS stock-feed sync — all operator-initiated, none of them background jobs." },
    ],
    skills: {
      count: 15,
      note: "The most of any suite app: demand forecasting, supplier-risk scoring, reorder-point maths, three-way match rules, landed-cost allocation and FEFO handling among them — each a procedure with a named owner agent.",
    },
    mcpSeams: [
      { name: "Inventory", status: "modelled", note: "Stock, demand signals, draft orders and reorder points, under enumerated read, capability and judge-verified-draft scopes." },
      { name: "Supplier", status: "modelled", note: "Supplier reads plus idempotent, human-approved commitments. The idempotency key is enforced on the seam, not just in the app." },
      { name: "E-procurement", status: "declared", note: "Supplier-portal catalog and price lists. Empty-but-shaped by default; live only when an endpoint is configured." },
      { name: "WMS · 3PL", status: "declared", note: "External stock feeds. Same shape — a fetched count becomes a record only through the governed reconciliation writer." },
    ],
    dashboards: [
      "Control tower — live demand, low stock, exceptions and reorder suggestions, with exception triage and the control-tower copilot.",
      "Purchase orders — the commitment book, each order carrying its approver and idempotency key.",
      "Suppliers and risk — the approved-vendor registry, risk scores, in-transit shipments and exceptions.",
      "Requisitions and RFQs — sourcing with quotations ranked from the real submissions.",
      "Warehouses and stock — per-warehouse availability with computed available-to-promise and governed transfers.",
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
        "supply1 runs demand planning, replenishment, procurement, inventory and quality on its own system of record. A purchase order can only name an approved vendor, and submitting one is a human, idempotent decision.",
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
        "people1 runs hiring, time, payroll, performance and compensation on one HR system of record of 40 object types, with 22 declared agents that draft, score and assemble. The consequential moves — extending an offer, approving a payslip, approving a raise — queue for a named human and land in the hash-chained audit.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Hiring decisions are made on unstructured notes, and the reasoning behind a rejection is nowhere on record.",
      "Payroll, leave, attendance and timesheets sit in separate systems, so hours and pay figures get retyped and then disagree.",
      "Comp rounds run in spreadsheets, with no budget check and no justification attached to the raise.",
      "Fairness is asserted in a policy document and never measured against what the system actually did.",
    ],
    capabilities: [
      {
        title: "screening — structured, job-relevant scoring",
        description:
          "Scores a candidate against a structured rubric — the overlap of their skills with the position's required skills, plus years against the minimum — and returns a fit band with what matched and what is missing. It is a recommendation: the agent runs human-led and never auto-rejects. Protected attributes are not inputs, because the screening function reads only those job-relevant keys.",
      },
      {
        title: "payroll_runner — India statutory, computed",
        description:
          "Assembles a payroll run with the statutory breakdown — provident fund against the wage ceiling, state insurance within the wage limit, professional tax, and withholding on the new-regime slabs — all computed from each employee's salary structure rather than supplied. Running the payroll and paying it are two separate human gates, and paying posts a payable in finance1. Money never moves inside people1.",
      },
      {
        title: "comp_planner — raises with a written basis",
        description:
          "Drafts merit and bonus recommendations inside a cycle's budget, each carrying current pay read from the salary structure and a written justification. Approving one is the money-and-fairness decision and stays human: it is refused without a justification, and refused if it would push the cycle's committed spend — summed live from the already-approved recommendations — over budget.",
      },
      {
        title: "policy_qa — cited handbook answers",
        description:
          "Answers handbook questions with citations, and says so and routes to HR when the handbook does not cover the question. Retrieval runs over the knowledge seam with two granted operations. The agent is scoped never to profile the person asking.",
      },
      {
        title: "fairness_bias_audit — fairness measured, not assumed",
        description:
          "A weekly, read-only adverse-impact check on screen and advance rates, aggregate and privacy-safe. Its instruction is the point: fairness is measured, not assumed. It analyses; it writes nothing back.",
      },
      {
        title: "Leave, attendance and timesheets — one record",
        description:
          "Leave balances are computed at write time from approved requests rather than trusted from the caller, attendance refuses a check-out before its check-in, and an approved timesheet's billable lines hand into project1, where project1's own gate invoices them.",
      },
    ],
    outcomes: [
      "A rejection, a raise or a headcount approval carries a written basis an auditor can read back months later",
      "The pay figures a manager approves are derived from the salary structure, not typed into a form",
      "The consequential move reaches a person with the record already assembled — balance, budget, scorecard, statutory breakdown",
      "HR spends its time on the cases that need judgment rather than on handbook lookups and timesheet chasing",
    ],
    integrations: [
      "The HRIS seam — granted read and draft operations only; most action and admin operations are deliberately not granted, so a people decision is made through the governed record rather than queued inside the connector. The shipped adapter is modelled.",
      "The knowledge seam — handbook retrieval behind cited policy answers. Modelled adapter.",
      "finance1 — a paid payslip or payroll run posts a payable for the net; an approved bonus posts one that gates at finance1's own approval.",
      "project1 — approving a timesheet hands its billable lines over, where project1's gate invoices them.",
      "service1 — a new hire's onboarding hands provisioning to the service queue; an offboarding opens a logistics case there.",
      "goal1 — finalising an appraisal composes a linked development mission rather than forking a second goal store.",
    ],
    suiteFit:
      "people1 is the workforce source of the suite, and each hand-off terminates at the receiving app's own gate rather than bypassing it. An approved compensation change flows to finance1's payables, and the money leg waits for finance1's approver. A new hire's provisioning flows to service1's queue. An approved timesheet's billable lines land in project1, where project1 bills them. A paid payslip posts a payable in finance1; a finalised appraisal composes a goal1 mission; an offboarding opens a service1 case alongside the auto-created clearance checklist. people1 never forks a ledger, a goal store or a service queue — and it never moves money.",
    trust:
      "Fairness here is structural, not a setting. Protected attributes are not fields on the candidate or employee model, and a test walks the SDK's fourteen and fails if one appears; the conformity battery separately scans live records and fails the Trust Mark if a protected key is present. The write path refuses rather than warns: an ungrounded payslip cannot be approved; a requisition cannot be approved without a justification on record, because headcount is a reasoned decision; a pulse response must be anonymous and cannot carry an employee identifier; a competency cannot be marked verified without a completed training behind it. The bias-control policy blocks a decision whose payload references a protected attribute at any depth and names the one it hit — and the code states its own limit, that it is a lexical guard which cannot catch a proxy variable, so it narrows what reaches a human rather than replacing the human. An eight-set eval battery gates the Trust Mark and drift revokes it, with a not-measurable third state so an empty sample is never reported as a pass. And there are no diversity analytics — that is a recorded boundary, not a roadmap item.",
    workforce: {
      registered: 22,
      launchWave: 4,
      note: "The largest roster in the suite. Four ship enabled, and the three seeded automations ship switched off and gated — a new-hire onboarding plan, a monthly leave accrual and a probation review.",
    },
    systemOfRecord: {
      objectTypes: 40,
      note: "The deepest people record in the suite: employees and candidates through requisitions, offers and interview scorecards; salary structures, payslips and payroll runs; leave, attendance and timesheets; appraisals, competencies and training; pulse responses and compensation recommendations.",
    },
    copilots: [
      { name: "Recruiting copilot", mode: "acts-through-a-gate", does: "Drafts the role, screens the pipeline against the structured rubric and assembles the shortlist with each score's matched and missing skills shown." },
      { name: "Comp-review copilot", mode: "acts-through-a-gate", does: "Walks a compensation cycle manager by manager, showing current pay from the salary structure, the committed spend so far and the budget left." },
      { name: "Candidate screening view", mode: "advisory", does: "The read model behind screening: fit band, matched skills, missing skills — recomputed on read, never a stored verdict." },
      { name: "Flight-risk signal", mode: "advisory", does: "An attrition signal computed from recorded factors, surfaced aggregate-first." },
      { name: "Skills inference and gap", mode: "advisory", does: "Infers a skills matrix from training and role history and shows the gap against a target. A competency only becomes verified with a completed training behind it." },
      { name: "Workforce-planning analytics", mode: "advisory", does: "Headcount, span of control, open requisitions and their age, and tenure bands — computed from the live record." },
      { name: "Onboarding-plan copilot", mode: "acts-through-a-gate", does: "Generates a role-specific plan and checklist, handing provisioning to service1's queue." },
      { name: "Policy Q&A", mode: "advisory", does: "Cited handbook answers that route to HR when the handbook does not cover the question." },
    ],
    automations: [
      { name: "New-hire onboarding", trigger: "event:hire.started", does: "Fires right after the employee record is created. Seeded disabled." },
      { name: "Leave accrual", trigger: "schedule:monthly", does: "Accrues balances that the write path then treats as computed, not supplied. Seeded disabled." },
      { name: "Probation review", trigger: "schedule:monthly", does: "Raises probation reviews as they come due. Seeded disabled." },
      { name: "jd_sourcing", trigger: "event:req.opened", does: "Drafts the role and opens sourcing when a requisition is approved." },
      { name: "screening", trigger: "event:candidate.applied", does: "Scores the applicant against the structured rubric. Never auto-rejects." },
      { name: "policy_qa", trigger: "event:policy.question", does: "Answers with citations, or routes to HR." },
      { name: "review_prep", trigger: "event:review.cycle", does: "Assembles appraisal materials for the manager." },
      { name: "fairness_bias_audit", trigger: "cron:weekly", does: "Read-only adverse-impact check on screen and advance rates." },
      { name: "payroll_runner", trigger: "schedule:monthly", does: "Assembles the run with the statutory breakdown computed from each salary structure." },
      { name: "time_attendance · timesheet_steward", trigger: "schedule:daily · weekly", does: "Chase and reconcile attendance and timesheets against the record." },
    ],
    skills: {
      count: 12,
      note: "Candidate screening as decision support that never auto-rejects, fixed-rubric structured interviews with cited evidence, statutory payroll rules, leave-accrual policy, appraisal rubrics and the fairness constraints carried across them.",
    },
    mcpSeams: [
      { name: "HRIS", status: "modelled", note: "Declared by 20 of the 22 agents, granted read and draft operations only — the action and admin operations are deliberately withheld." },
      { name: "Knowledge", status: "modelled", note: "Handbook retrieval, two operations, behind cited policy answers." },
    ],
    dashboards: [
      "People dashboard — active headcount, open positions, applications in pipeline and onboarding completion, with headcount by department, the hiring funnel and a workforce-planning panel.",
      "Hiring pipeline — the kanban; a drag moves the stage, and offer and hire are human-gated.",
      "Recruitment — requisitions, offers and interview scorecards on a fixed rubric.",
      "Payroll — runs with the statutory breakdown computed per employee; running and paying are separate gates.",
      "Leave and attendance — balances computed at write time, with the time-integrity refusals visible.",
      "Performance and comp — appraisal cycles, and a comp round showing committed spend against budget.",
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
        "people1 runs hiring, time, payroll, appraisals and comp on one HR system of record. Pay figures are derived from the salary structure, protected attributes are not fields on the model, and the consequential moves queue for a person.",
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
        "market1 runs sixteen marketing agents over its own marketing system of record — campaigns, content, journeys, segments, landing pages, events, attribution and budgets in one place. Publishing is the one thing the agents cannot do alone: publish, schedule-social and send-newsletter are declared consequential, so the runtime routes them to a person even when the agent never asked for approval.",
      primaryCta: "Book a demo",
    },
    problem: [
      "Drafting got fast. Review did not — it is a spreadsheet, a chat thread and someone's memory.",
      "Brand voice lives in a PDF, so tone drifts across teams, markets and languages.",
      "Tracing a campaign to won revenue means exporting four systems into a sheet and trusting the joins.",
      "An opt-out is recorded in one system and honoured in another — if the send path checks at all.",
    ],
    capabilities: [
      {
        title: "content — the content studio",
        description:
          "One agent writes the assets, long and short form, per channel. It self-verifies before write-back and runs human-led, so the runtime gates every terminal action it takes. Its draft reaches an audience only after a named person approves the publish.",
      },
      {
        title: "brand_compliance_judge — the pre-publish pass",
        description:
          "Runs before write-back for every self-verifying agent and asks three questions: on-brand, within the compliance lines, truthful and original. A pass queues the work for human approval; a fail regenerates with the critique, twice, then escalates. It declares no tools at all — it can judge, and it cannot act.",
      },
      {
        title: "Journeys, broadcasts and organic social",
        description:
          "Multi-step journeys with wait, send and branch steps, one-to-many broadcasts to a segment, and posts to social channels you own. At the send site the platform re-checks the copy for banned claims, skips anyone with an explicit opt-out on that channel, and records the sent count as the number actually dispatched — never a number supplied to it.",
      },
      {
        title: "audience_builder — segments and lead scoring",
        description:
          "Named, criteria-defined audiences over your real sales1 lead and contact fields, and lead scores built from four recorded signals: form submissions, event registrations, active journeys, completed journeys. Both are computed live on every read, and a score is never written back onto the lead.",
      },
      {
        title: "growth_analyst — attribution, funnels, budgets, experiments",
        description:
          "Reads the grounded chain: a campaign's form or event stamps its id on the lead it creates, that lead converts, that opportunity wins. Pipeline, won revenue, return, drop-off by journey step, budget against recorded production cost, and A/B winners picked on submissions or on won deals. Read and analyse only — it writes nothing.",
      },
      {
        title: "creative_variants — variants without the ad buy",
        description:
          "Generates channel-spec creative variants at volume for testing. It was renamed from its original ad-oriented name deliberately: market1 will write the creative, and there is no ad-placement operation for it to call.",
      },
    ],
    outcomes: [
      "Nothing reaches an audience without a named person approving it",
      "Brand voice becomes configuration you edit, not a document you circulate",
      "Every campaign figure on screen is recomputed from the records it came from",
      "An opt-out is honoured at the send site, not corrected later in a report",
    ],
    integrations: [
      "The content seam — the single tool nearly every market1 agent declares: read the brand system, assets, campaigns and performance; write brand-checked drafts; publish only on approval. The platform ships a modelled adapter, not a live CMS connection.",
      "Email — the transport behind a journey send and a broadcast. Real SMTP when configured; recorded in-process otherwise.",
      "sales1 — a lead-capture form submit and an event registration compose a CRM lead through the governed writer, idempotent by email. Segments, scoring and attribution read sales1 records live.",
      "finance1 — a campaign's recorded production and event cost is handed to finance1's payables gate. market1 moves no money.",
    ],
    suiteFit:
      "market1 is the demand source on three governed cross-app sagas. A campaign's qualified audience hands to sales1's inbound SDR; an event registration does the same; and a campaign's production spend goes to finance1's payables — where the money leg terminates, at finance1's maker-checker gate, never inside market1. Day to day the same seam runs beneath the screens: a form submit or an event registration composes a sales1 lead, idempotent by email, and attribution reads that lead's opportunity back out of sales1 to answer whether the campaign produced revenue. The apps stay decoupled; the core orchestrates.",
    trust:
      "Three policies sit on market1's write path and they are short enough to read. Review-on-publish returns approval unconditionally — a human reviews this asset before publish. Ad-free refuses outright, with no approver to appeal to, when a payload carries an ad placement or paid media. Truthful refuses a body containing any marker in a fixed list — best, #1, guaranteed, world-class, revolutionary, miracle, risk-free, no.1 — matched case-insensitively. That last one is a word list, not a semantic classifier, and we describe it as one. Below those, the runtime does not depend on an agent asking nicely: publish, schedule-social and send-newsletter are declared consequential, and a consequential action is forced to a human even when neither the agent's spec nor the policy requested it. On the connector, ad-free is structural rather than promised: there is no ad-placement operation to call, and a test asserts the live operation set matches a reviewed list, so a new operation fails until a person reviews it.",
    workforce: {
      registered: 16,
      launchWave: 4,
      note: "Sixteen agents across create, engage, audiences, intelligence and governance. Four are enabled in the launch wave; the other twelve are refused by the rollout gate until an operator turns them on for that tenant.",
    },
    systemOfRecord: {
      objectTypes: 20,
      note: "market1 owns the marketing record: brand systems, assets, campaigns, channels and performance, plus journeys, enrollments, segments, landing pages, forms and submissions, consent, events and registrations, scoring models, broadcasts, experiments, budgets and social posts.",
    },
    copilots: [
      { name: "Plan copilot", mode: "acts-through-a-gate", does: "Turns a campaign brief into a plan — channels, assets and a calendar, each item tracing back to the brief it came from." },
      { name: "Content studio", mode: "acts-through-a-gate", does: "Drafts an on-brand asset in place, scored against the brand system before it can be queued for approval." },
      { name: "Creative variants", mode: "acts-through-a-gate", does: "Generates A/B variants to channel spec from an approved asset." },
      { name: "Brand-voice check", mode: "advisory", does: "Checks copy live against the brand system the client owns — tone, terms, dos and don'ts — plus the platform's banned-claim floor underneath it." },
      { name: "Send-time window", mode: "advisory", does: "Computes the best send window from recorded engagement rather than a channel-wide rule of thumb." },
      { name: "Lead propensity", mode: "advisory", does: "Ranks leads by a score computed at read from four recorded signals, showing which ones fired." },
      { name: "Attribution models", mode: "advisory", does: "Multi-touch attribution over the stamped campaign chain — first touch, last touch and linear, side by side rather than one blessed number." },
    ],
    automations: [
      { name: "journey_scheduler", trigger: "schedule:daily", does: "Advances journey wait-steps. The one automation the platform seeds — created disabled and gated, so it does nothing until an operator enables it." },
      { name: "strategy_brief", trigger: "event:brief.created", does: "Turns a new brief into a campaign strategy and channel plan." },
      { name: "content · creative_variants · repurposing", trigger: "event:asset.requested", does: "Three agents draft against one request — the asset, its channel variants, and its repurposed forms." },
      { name: "seo_channel", trigger: "event:campaign.scheduled", does: "Drafts optimised copy and channel metadata as a campaign is scheduled." },
      { name: "social_publisher", trigger: "event:social.requested", does: "Prepares a post for a channel you own. Publishing waits for a person, and a post publishes once." },
      { name: "web_conversion", trigger: "event:page.requested", does: "Builds landing pages and forms; a submission composes a sales1 lead through the governed writer." },
      { name: "growth_analyst", trigger: "event:perf.signal", does: "Reads performance and recomputes attribution, funnels and experiment winners." },
      { name: "orchestrator", trigger: "event:*", does: "Routes any dispatched topic to the right specialist, once an operator has enabled a binding for it." },
    ],
    skills: {
      count: 12,
      note: "Policy and craft skills attached to the agents that need them — brand safety, compliance lines, channel specs and localisation rules among them. Brand safety is attached to every market1 agent.",
    },
    mcpSeams: [
      { name: "Content", status: "modelled", note: "Declared by 15 of the 16 specs. The grant is enumerated: read the brand system and assets, write brand-checked drafts, publish only on approval. A modelled adapter, not a live CMS." },
      { name: "Email", status: "declared", note: "Journey sends and broadcasts. Real SMTP when a host is configured; recorded in-process otherwise." },
    ],
    dashboards: [
      "Campaigns — campaigns, on-brand assets and a grounded calendar, each asset tracing to a brief.",
      "Content — assets with an on-brand score; publishing is human-reviewed.",
      "Brand Voice studio — the brand voice as configuration the client owns, with a live check against it and the banned-claim floor beneath.",
      "Journeys — multi-step flows with per-step drop-off computed from enrollments.",
      "Audiences and scoring — criteria-defined segments and live lead scores over sales1 records.",
      "Attribution and funnels — pipeline and won revenue traced through the stamped campaign chain.",
      "Budgets and experiments — recorded production cost against budget, and A/B winners decided on submissions or won deals.",
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
        "market1 runs 16 marketing agents over its own marketing system of record — campaigns, journeys, segments, pages, events, attribution. Publishing and sending route to a person, and there is no ad-placement operation to call.",
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
        `insight1 is the suite's analytics reader: metrics, reports and dashboards whose values are computed live from ${INSIGHT_SOURCES_WORD} sibling systems of record at the moment you run them. It keeps no business records of its own and holds no write access to another app's system of record — it asks, detects, projects and drafts, and a human reviews every publish to an audience.`,
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
          "A plain-English ask is mapped to a known source app and aggregation, then run live against that system of record. An ask it cannot ground comes back as \"could not ground the question to a known source app\" rather than as a guessed query.",
      },
      {
        title: "data_steward — the semantic metric layer",
        description:
          "One governed definition per metric — source app, aggregation, field, filter, optional target — so a dashboard tile and an agent answer resolve to the same thing. The value is read from the source rows on every run; where it cannot be computed you get no value and a stated reason, such as an unknown object type or an empty denominator.",
      },
      {
        title: "anomaly_watch and narrator — findings with evidence",
        description:
          "An hourly baseline over a metric's real period series, banded and ranked by severity, with a plain-English note and the evidence attached. It flags; a person decides. An alert on a metric that will not compute records itself as ungrounded and sends nothing.",
      },
      {
        title: "forecast — a projection, labelled as one",
        description:
          "A least-squares trend with optional seasonality, a residual-based band and an in-sample error figure over real history. The output is labelled a projection, never actual data, and the function refuses with fewer than three periods of history.",
      },
      {
        title: "Reports, dashboards and scheduled delivery",
        description:
          "The report author and dashboard builder draft; the digest scheduler and dashboard publisher require approval before anything reaches an audience. Reports run grouped and measured over a system of record with period comparison, drill-through and spreadsheet or PDF export — and an ungrounded report is refused at export with nothing to export.",
      },
      {
        title: "grounded_truth_judge — the pre-publish check",
        description:
          "Before an output ships, it checks that each figure ties to a governed metric over a real system of record, that a forecast is labelled a projection, and that a share's row-level scope — a real filter merged into the query, not a display toggle — has not been widened. A failure flags for review instead of publishing.",
      },
    ],
    outcomes: [
      "One governed definition per metric, shared by the dashboards and the agents",
      "A figure that cannot be computed arrives as a stated reason, not as a plausible number",
      "Anomalies and projections arrive as findings with evidence, and stay findings until a person acts",
      "What was published, who approved it and what it was computed from is on the audit chain",
    ],
    integrations: [
      "Eight sibling systems of record, read in place: sales1, service1, finance1, supply1, people1, market1, project1 and commerce1",
      "The analytics seam — insight1's own connector, a modelled adapter with read and compute verbs plus three consequential operations",
      "Email — send-only scope for scheduled digests; recorded until a mail host is configured",
      "Report export as spreadsheet and PDF; a digest can attach the grounded report",
      "Governed flows into finance1 and supply1 through the platform orchestrator",
    ],
    suiteFit:
      `insight1 reads ${INSIGHT_SOURCES_WORD} sibling systems of record and holds no write access to any of them — its only connector grants are its own analytics store and a send-only email seam, so every record it writes is its own. Where a finding needs an action it proposes into the owning app's own approval queue: a grounded receivables or cash anomaly routes to finance1's payables, and a demand projection routes to supply1's reorder. Both legs gate at the owning app — insight1 moves no money and commits no purchase. Industry packs such as health1, retail1, bank1, energy1 and gov1 push their published, computed measures back as insight1 records rather than keeping analytics of their own. It is the one app every industry pack composes.`,
    trust:
      "Publishing is the governed action. Publishing a dashboard is refused without an explicit human approval, and arming a digest, an alert or a share counts as consequential too. Raising an agent's autonomy level does not change that: a consequential action still resolves to a human approval at every level. The Trust Mark is scored against a six-set battery — grounding, no fabrication, publish review, data-scope safety, forecast honesty, and the engine never acting for the human. One scope limit stated plainly: a metric naming a source app outside the eight known systems of record is refused on save, but a metric saved with no source app at all passes that particular check — the grounding refusal that matters happens at compute time, where a value that cannot be derived returns no number and a reason.",
    workforce: {
      registered: 11,
      launchWave: 4,
      note: "Eleven agents including the pre-publish judge. The launch wave turns on four — analyst, narrator, anomaly watch and forecast — all of them read-only.",
    },
    systemOfRecord: {
      objectTypes: 9,
      note: `insight1 holds the analytics objects and no business records: metrics, dashboards, reports, questions, alerts, shares, insights, digests and reviews. The values on them are computed from the ${INSIGHT_SOURCES_WORD} sibling systems of record on every run rather than stored.`,
    },
    copilots: [
      { name: "Analyst copilot", mode: "advisory", does: "Takes the question, shows the governed metric it resolved to and the rows it computed over — the working, not just the answer." },
      { name: "Digest copilot", mode: "acts-through-a-gate", does: "Assembles a scheduled digest from grounded reports. Arming it to send is a consequential action, and an ungrounded report will not ship." },
      { name: "Forecast copilot", mode: "advisory", does: "Projects a metric forward with its band and in-sample error shown, labelled a projection and refusing under three periods." },
      { name: "Root-cause copilot", mode: "advisory", does: "For a flagged anomaly, decomposes the metric along its dimensions to show where the movement came from." },
    ],
    automations: [
      { name: "anomaly_watch", trigger: "cron:hourly", does: "Baselines each metric's real period series and ranks deviations by severity. Read-only." },
      { name: "forecast", trigger: "cron:nightly", does: "Refreshes projections, refusing metrics with too little history." },
      { name: "analyst", trigger: "event:question.asked", does: "Grounds and runs an asked question against a real system of record." },
      { name: "report_author", trigger: "cron:weekly", does: "Drafts the recurring reports. Drafts only." },
      { name: "digest_scheduler · dashboard_publisher", trigger: "event:report.due", does: "Prepare delivery and publication — both requiring approval before anything reaches an audience." },
      { name: "orchestrator", trigger: "event:*", does: "Routes questions asked, metric breaches and reports due to their specialists." },
      { name: "Armed alert check · scheduled digest send", trigger: "manual", does: "Run against a saved alert or digest record. An alert on a metric that will not compute records ungrounded and notifies nobody." },
    ],
    skills: {
      count: 9,
      note: "Natural-language query parsing that refuses an ask it cannot ground, anomaly baselining over a real series, forecasting with a labelled projection, narrative generation tied to cited metrics, and the row-level scope rules behind a share.",
    },
    mcpSeams: [
      { name: "Analytics", status: "modelled", note: "The single seam all eleven agents declare and nothing else. Banded scopes: reads, read-and-compute capability verbs, and three consequential operations." },
      { name: "Email", status: "declared", note: "Send-only, for scheduled digests. Recorded until a mail host is configured." },
    ],
    dashboards: [
      "Intelligence — cross-suite KPIs and the proactive insights feed, grounded in the live systems of record.",
      "Ask your data — conversational analytics, where an answer resolves to a governed metric over a real record.",
      "Metrics — the semantic layer, one governed definition per metric, with scorecards showing target, attainment and trend.",
      "Explore — ad-hoc pivot, cross-tab and drill-down over any system of record.",
      "Reports — the library, with period comparison, drill-through and export; an ungrounded report is refused at export.",
      "Dashboards — the canvas, where publishing to an audience is human-approved.",
      "Alerts and digests — arming either is a consequential action, and neither fires on a number it cannot compute.",
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
        "insight1 computes every metric, report and dashboard tile live from the system of record that owns the data. Ungrounded figures are refused; publishing to an audience is human-reviewed.",
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
        "project1 runs plans, resourcing, timesheets, RAID, Earned Value and the per-project P&L on its own work system of record — 22 object types, one append-only trail. Twelve agents plan, resource, track and draft; the moves that touch a client or the ledger stop for a named human.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "The plan is a spreadsheet nobody re-baselines, so there is nothing to measure delivery against.",
      "Time is logged late, to the wrong project, or to no project at all — and the bill inherits the error.",
      "Overrun and slippage surface at the month-end review, after the margin has gone.",
      "Billing is a manual reconciliation between timesheets, rate cards and the ledger, done under deadline.",
    ],
    capabilities: [
      {
        title: "planner — the plan of record",
        description:
          "Breaks a brief into tasks, milestones, estimates and a computed critical path, instantiates a reusable template, and freezes a baseline as the plan of record. Drafts only — a human accepts the plan, and locking the baseline is a separate approval. A dependency that would close a cycle is refused outright, within a project and across a program.",
      },
      {
        title: "scheduler — resourcing against real capacity",
        description:
          "Allocates people within capacity, staffs skills-based resource requests, and keeps the supply-versus-demand workbench honest: per-person utilisation is computed from live allocations, never supplied. An allocation that pushes someone past full capacity is flagged by a derived fact and sent to a human rather than silently written.",
      },
      {
        title: "timesheet_clerk — time that belongs to something",
        description:
          "Captures time against a real project and task. The store refuses an entry that names no project, names a project outside this tenant, or books zero, negative or more than 24 hours in a day — and the same check runs in the store and in the governed writer. Time lands unapproved; a human approves before it can be billed.",
      },
      {
        title: "biller — the client bill",
        description:
          "Turns a project's approved billable time into a client bill and hands it to finance1 — the amount derives from approved hours and the project's rate, never from a typed figure. Human-gated with self-verification: it refuses unapproved time, refuses a project that is not on a billable mode, and refuses to bill at all without an explicit approval.",
      },
      {
        title: "controller — the engagement money view",
        description:
          "Rate cards, governed change orders, non-labour costing and the per-project P&L, plus Earned Value where schedule variance is omitted rather than invented when no schedule baseline exists. Recognising revenue posts a real finance1 receivable, so it is human-reviewed and refused when there is nothing new to recognise.",
      },
      {
        title: "risk_watch and portfolio — RAID and the grounded metric",
        description:
          "Risks, issues, decisions and actions carried as records with named owners, where severity is recomputed from probability × impact on every write rather than accepted as a label. Publishing a portfolio metric with no records under it is refused as ungrounded.",
      },
    ],
    outcomes: [
      "Hours that tie to a real engagement, because the store refuses anything else",
      "Client bills a named human signed off on, assembled from approved time and a rate card",
      "Slippage, overrun and blockers carried as records with owners and computed severity, not as adjectives in a status call",
      "One reviewable trail from won quote to charter to bill, on the append-only audit",
    ],
    integrations: [
      "finance1 — a delivered milestone reaches the ledger through finance1's own approval, never around it",
      "people1 — an unstaffable skills gap surfaces here; the headcount decision terminates at people1's approval",
      "sales1 — charters a delivery project from an accepted quote, with contract value read from the quote's own subtotal, and reads the open pipeline for a labelled resource-demand projection",
      "insight1 — publishing a grounded portfolio metric writes a real insight1 record carrying the numerator and denominator it was computed from",
      "The project-ops seam — repo, issue tracker and calendar. A modelled adapter by default, calling a live endpoint only when one is configured",
      "The project-management seam — project1's own least-privilege scope set: reads, drafts, six compute verbs and four consequential actions",
    ],
    suiteFit:
      "project1 is the delivery hub of the suite. It receives demand — a won sales1 deal hands into it, a service1 case needing field work hands into it — and it is the source of two governed flows: a delivered milestone into finance1's receivables, and an unstaffable skills gap into people1's recruiting. Both legs terminate at the other app's own approval gate: project1 never posts to the ledger and never hires. The originator charters an engagement from an accepted sales1 quote with the contract value read from the deal, and the portfolio lead publishes a grounded metric into insight1. Industry packs reuse it as the delivery engine — a manufacture1 corrective action, a bank1 fraud investigation, an edu1 remediation plan and a health1 care-delivery project all open as project1 projects.",
    trust:
      "Safe on the write path, not by policy prose. The store refuses a timesheet that names no project, names a project outside this tenant, or books zero, negative or more than 24 hours in a day. A client bill is refused without an explicit human approval; recognising revenue is refused when there is nothing new to recognise; publishing a portfolio metric with no records under it is refused as ungrounded. A risk's severity is recomputed from probability × impact on every write, never accepted as a supplied label, and a task dependency that would close a cycle is a hard refusal. The client portal is read-only and token-scoped: it returns status, milestones and the latest update, and never rate cards, budget, currency or risk level. And the app refuses to boot at all if it would ask a human to approve an action it cannot actually execute.",
    workforce: {
      registered: 12,
      launchWave: 4,
      note: "Twelve agents. The launch wave enables the four read-and-draft functions — planner, resourcing, tracker and status reporter. The biller, controller, originator, timesheet clerk, RAID watch and coordinator stay off until an operator enables them for that tenant.",
    },
    systemOfRecord: {
      objectTypes: 22,
      note: "The work itself: projects, tasks, timesheets, milestones and allocations; rate cards, change orders, expenses, revenue events and retainers; baselines, risks, issues, decisions and action items; programs, resource requests and delivery reviews.",
    },
    copilots: [
      { name: "Delivery-planning copilot", mode: "acts-through-a-gate", does: "Expands a brief into a draft work breakdown with milestones and a computed critical path. It refuses a blank brief or an unknown methodology rather than fabricate a plan." },
      { name: "Project-recovery copilot", mode: "advisory", does: "For a project that is slipping, shows what is driving it — burn, slippage and blocked tasks — and proposes the recovery levers, with their effect on the baseline shown." },
      { name: "Status-report copilot", mode: "acts-through-a-gate", does: "Drafts the client status from the live record: milestones hit, what moved, what is at risk. Drafts only." },
      { name: "Staffing copilot", mode: "advisory", does: "Matches open resource requests to people by skill and real availability, showing utilisation computed from live allocations." },
    ],
    automations: [
      { name: "planner", trigger: "event:project.created", does: "Drafts the plan when a project is chartered." },
      { name: "tracker", trigger: "cron:daily", does: "Tracks progress and budget burn, flagging milestones before they slip." },
      { name: "risk_watch", trigger: "cron:hourly", does: "The RAID watch — the most frequent cadence in the app." },
      { name: "timesheet_clerk", trigger: "event:time.logged", does: "Validates and files time as it is logged. Time lands unapproved." },
      { name: "portfolio", trigger: "cron:daily", does: "Recomputes the portfolio view and publishes grounded metrics into insight1." },
      { name: "biller", trigger: "event:billing.due", does: "Assembles the client bill from approved time and the rate card. Refuses without an approval." },
      { name: "controller", trigger: "event:revenue.recognizable", does: "Proposes recognition, refusing when there is nothing new to recognise." },
      { name: "originator", trigger: "event:quote.won", does: "Charters the engagement from an accepted sales1 quote — and refuses one that is un-won or already chartered." },
      { name: "coordinator", trigger: "event:*", does: "The always-on router across blocked tasks, due milestones, logged time, won quotes and recognisable revenue." },
    ],
    skills: {
      count: 9,
      note: "Plan generation that refuses a blank brief, delivery-risk scoring over live cost and schedule indices, estimation rules, change-order governance, Earned Value maths and the status-report rubric.",
    },
    mcpSeams: [
      { name: "Project management", status: "modelled", note: "The seam all twelve agents declare, with 24 banded scopes: reads, drafts, six compute verbs and four consequential actions." },
      { name: "Project ops", status: "declared", note: "Repo, issue tracker and calendar. A modelled adapter returning a deterministic empty result until an endpoint is configured." },
    ],
    dashboards: [
      "Portfolio — every project with status, logged against budgeted hours and billing mode, over the live work record.",
      "Tasks and milestones — the work broken down and dated, with the tracker flagging slippage.",
      "Timesheets and billing — time logged against a real project; billing runs only on human-approved time.",
      "Delivery health and risk — RAG health, budget burn, milestone slippage and utilisation, with severity computed rather than labelled.",
      "Financials — rate cards, change orders, the per-project P&L and Earned Value with schedule variance omitted when there is no baseline for it.",
      "Resourcing — the supply-versus-demand workbench with utilisation computed from live allocations.",
      "Client portal — read-only and token-scoped: status, milestones and the latest update, and never rate cards, budget or risk level.",
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
      "project_to_cash — a delivered milestone reaches finance1's receivables through finance1's own approval",
      "resource_gap_to_hire — an unstaffable skills gap reaches people1's recruiting, where the headcount decision terminates",
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
        "project1 runs plans, resourcing, timesheets, RAID, Earned Value and the per-project P&L on one governed work record. Time can't be logged to a project that doesn't exist, and a client bill waits for a human.",
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
        "commerce1 runs the online storefront, the POS register, imported marketplace orders and subscription renewals against one commerce system of record — 19 object types covering catalog, availability, shipments, returns, tills, loyalty and coupons. Setting an order to paid or refunded is classified consequential on the write path, so it queues for a human approval before it lands.",
      primaryCta: "Book a demo",
      secondaryCta: "See it live",
    },
    problem: [
      "Online and in-store keep separate books, so the same sale gets reconciled twice and neither number is the one.",
      "Availability is asserted in one system and read in another, so the shelf and the storefront disagree until a customer finds out.",
      "Refunds, markdowns and promo exceptions get decided in chat; the record of who approved what lives nowhere.",
      "Automation that could charge a card is automation nobody is willing to switch on.",
    ],
    capabilities: [
      {
        title: "One order book — cashier, channel_sync, subscription_manager",
        description:
          "Four ways a sale enters the book — storefront checkout, a POS register, an imported marketplace order, a subscription renewal — and all four run the same check before it lands: at least one line, each naming a product this tenant actually has, quantity above zero. The cashier's total derives from price × quantity, and a marketplace import is idempotent per external order reference. A sale lands as placed; capturing the money is a separate, governed write.",
      },
      {
        title: "fulfilment_planner and the returns queue",
        description:
          "Paid orders become drafted shipments through pick, pack, ship and deliver, partials included; the order flips to fulfilled when its own lines are covered, computed rather than asserted. The record refuses two things outright — an order must be paid before it can be shipped, and a shipment cannot carry more than the order has left. A return can never claim more than the order billed, and approving one is the money step.",
      },
      {
        title: "inventory_sync — replenishment that drafts, never buys",
        description:
          "Runs hourly over commerce1's own availability ledger — available equals on-hand minus reserved, per product per selling location — and drafts a supply1 purchase order for the computed shortfall, to a vendor that is both approved and active. It writes no stock movement of its own and the order lands as a draft: the purchase commitment belongs to supply1, and the flow terminates at supply1's approval gate.",
      },
      {
        title: "refund_agent — the only money-out agent, and it is gated",
        description:
          "Declared requires-approval with self-verification on. A refund larger than what was captured is blocked outright rather than sent for review. When the captured amount is missing or unparseable, the policy refuses to certify either way and routes to a human. Settlement is handed to the delegated gateway seam, which only ever executes an already-approved decision.",
      },
      {
        title: "The proposal layer — five computed capabilities, none of which decides",
        description:
          "Sales forecasting, product recommendation, price optimisation, fraud scoring and recovery scoring are granted as read-and-compute verbs. Price optimisation carries a hard floor — never below cost — and a markdown deeper than the store's own live-offer cap comes back flagged as needing a human override. The merchandiser drafts listings and does not publish; the fraud judge screens and does not block.",
      },
      {
        title: "Tills, loyalty and gift cards",
        description:
          "Register sessions with their own close-out review, a loyalty ledger where a redemption above the balance is refused, and gift cards that can only be issued against an already-paid order. Closing a till and redeeming either balance are consequential writes.",
      },
    ],
    outcomes: [
      "A sale reconciles the same way whether it was rung at a till, placed online, imported from a marketplace or renewed on a subscription",
      "Money movement carries an approval record and a hash-chained audit event instead of a chat thread",
      "Pricing, fraud and merchandising work arrives as a proposal with its floor stated, for a person to accept or drop",
      "A stock shortfall becomes a drafted purchase order that procurement owns, not a silent auto-buy",
    ],
    integrations: [
      "The commerce seam — catalog and order-book reads, record and draft writes, and five compute verbs. Capture, refund, void, storefront publish and price override are declared consequential on the connector itself, so the runtime forces a human approval and refuses them mid-loop.",
      "Payments — the delegated capture and refund seam. A modelled adapter by default; it calls a live gateway when one is configured, and it takes an order id and an amount, nothing else.",
      "Marketplace — an external order feed with Amazon, Flipkart, ONDC and Meesho modelled as marketplace kinds. Modelled by default, returning an empty feed until an endpoint is configured; it fetches only, and an order becomes real through commerce1's own grounded writer.",
      "finance1 — an approved capture posts a receivable with the computed GST into finance1's ledger, idempotent per order, so a sale reaches the general ledger rather than a forked money path.",
      "supply1 — a below-reorder row drafts a purchase order to an approved, active vendor, idempotent per inventory row.",
    ],
    suiteFit:
      "commerce1 imports no other app; the core orchestrates, and commerce1 is the source on three governed flows. The sell side settles into finance1's receivables. An approved return runs into finance1's payables — commerce1 approves the return through its own gate, but the money leg terminates at finance1's. A stockout drafts into supply1's reorder — commerce1 flags the shortfall, supply1 owns the buy. Under the retail1 pack, retail1 publishes a governed price and mirrors the item into the commerce1 storefront; retail1 never re-owns the storefront and never moves the money.",
    trust:
      "The write path refuses before it reviews. A refund beyond what was captured is blocked, not queued. An order cannot ship unpaid, a shipment cannot exceed what is left to ship, a reserved quantity cannot exceed on-hand, a blocked customer gets no new orders, and a line discounted past the store's best active offer is refused unless someone sets a human-reviewed override. What is not refused outright is gated: setting an order to paid or refunded, approving a return, closing a till, redeeming loyalty points or gift-card balance, and any delete. The runtime holds the same line independently — a consequential connector operation cannot run mid-loop and is forced to a human even where an agent's spec did not ask for one. There is no card data to lose: the payment record carries an order id, an amount, a method and a kind, and the gateway seam accepts an order id and an amount. Two limits stated plainly. The oversell guard reads commerce1's availability ledger, so a product with no inventory row at that location is untracked and the guard does not apply there. And a fraud score flags an order when it is placed; because a capture is a human approval anyway, that flag is a signal on the review rather than a second automatic block.",
    workforce: {
      registered: 13,
      launchWave: 8,
      note: "The widest launch wave in the suite: eight of thirteen agents ship enabled, all of them read, draft or analyse. The cashier, promo planner, orchestrator, refund agent and fraud judge stay off until a tenant turns them on.",
    },
    systemOfRecord: {
      objectTypes: 19,
      note: "commerce1 owns its own availability ledger rather than reading stock from elsewhere: products, orders and payments, stores and promotions, tills and their reviews, loyalty accounts and ledger, gift cards, inventory, shipments, returns, customers, price lists, coupons, marketplaces and subscriptions.",
    },
    copilots: [
      { name: "Replenishment copilot", mode: "acts-through-a-gate", does: "Shows the computed shortfall per product per location and drafts the supply1 order for it — refusing when there is no approved vendor to draft to." },
      { name: "Merchandising copilot", mode: "acts-through-a-gate", does: "Drafts listings and category placement from real order history. It drafts; publishing to the storefront is a consequential write." },
      { name: "Pricing copilot", mode: "acts-through-a-gate", does: "Proposes a price with the cost floor shown alongside it. Below cost is refused, and past the best active offer it comes back needing an override." },
      { name: "Fraud and recovery copilot", mode: "advisory", does: "Scores an order for fraud risk and a failed payment for recovery likelihood, with the contributing signals listed. It screens; it does not block." },
    ],
    automations: [
      { name: "inventory_sync", trigger: "cron:hourly", does: "Recomputes availability and drafts replenishment for below-reorder rows." },
      { name: "merchandising_analyst", trigger: "cron:daily", does: "Refreshes forecasts, recommendations and category performance from the order book." },
      { name: "fulfilment_planner", trigger: "event:order.paid", does: "Turns a paid order into drafted shipments." },
      { name: "subscription_manager", trigger: "event:subscription.due", does: "Prepares a renewal as a sale entering the same order book, with the same validity check." },
      { name: "channel_sync", trigger: "event:marketplace.order", does: "Imports an external order idempotently by its marketplace reference." },
      { name: "order_concierge", trigger: "event:order.inquiry", does: "Answers shopper questions from the live order book." },
      { name: "cashier", trigger: "event:pos.sale", does: "Rings a register sale whose total derives from price × quantity." },
      { name: "refund_agent", trigger: "event:refund.requested", does: "Prepares a refund within what was captured. A refund over capture is blocked outright." },
      { name: "orchestrator", trigger: "event:*", does: "The always-on router across orders placed, payments due and refunds requested." },
    ],
    skills: {
      count: 9,
      note: "Sales forecasting that refuses under three periods of history, product recommendation, price optimisation with a cost floor, fraud and recovery scoring, and the POS close-out rules.",
    },
    mcpSeams: [
      { name: "Commerce", status: "live", note: "The single seam all thirteen agents declare, and nothing else. Least-privilege and enumerated, with capture, refund, void, publish and price override declared consequential on the connector itself." },
      { name: "Payments", status: "declared", note: "Delegated capture and refund. Modelled by default; live when a gateway is configured. It receives an order id and an amount." },
      { name: "Marketplace", status: "declared", note: "External order feed — Amazon, Flipkart, ONDC and Meesho modelled as kinds. Fetch-only, returning empty until configured." },
    ],
    dashboards: [
      "Analytics — the grounded commerce view: GMV, net revenue, average order value, GST, gross margin from cost × sold lines, fulfilment rate from shipments, return rate from RMAs, inventory health, channel mix and top products. Every figure computed live from the order book.",
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
        "commerce1 runs storefront, POS, marketplace imports and subscription renewals on one commerce record. Capture and refund are consequential writes — a person approves before money moves. From elan1.",
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
        "goal1 runs one operating cadence — a North Star, missions, weekly sprints, a daily pulse, and detected signals a human triages. Nine agents draft, project and propose; applying a signal changes the plan, so it needs a human approval unless a person has already armed that mission's Autopilot envelope.",
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
          "The scout is always-on and read-only: it surfaces a signal with a severity, the affected mission, a quantified impact and a suggested move. Applying that suggestion is a separate agent — the one declared requires-approval — and an apply stays gated at every autonomy level because it is registered consequential. It is not in the launch wave; you enable it deliberately.",
      },
      {
        title: "Autopilot — an autonomy envelope with a ceiling and a cap",
        description:
          "Per mission, a human arms an envelope with a severity ceiling and a per-cycle cap; that arming is the human-approved step. Inside it an agent applies without a per-move gate, immediate and audited. Arming refuses a critical ceiling outright — a critical signal always escalates to a human — and both the ceiling and the spent cap are re-checked on every move. Outside the envelope, the request falls back to the approval gate.",
      },
      {
        title: "foresight_analyst — trajectory, risk and a labelled what-if",
        description:
          "Projects each mission forward from its own baseline, current value, target and logged beats: the trajectory, an ETA, and what applying the next signal would buy. Projections are clamped to the target and labelled model estimates. If any projection escapes that clamp, the conformity check reports the portfolio as ungrounded.",
      },
      {
        title: "portfolio_strategist — breakthroughs, plays and bets",
        description:
          "Reads the portfolio: which missions are at a positive inflection, and how each high-variance bet is standing — computed from that mission's own foresight, never asserted. Capturing a breakthrough as a reusable play is refused unless the mission is a detected one, and a settled bet cannot be re-settled.",
      },
      {
        title: "Goal-to-action routing",
        description:
          "When foresight predicts a mission will miss, the routing endpoint names the app that owns the lever and the gate to use — a revenue mission to finance1, a scaling mission to supply1's own approval-gated reorder. goal1 hands over a proposal; it writes nothing into a sibling and commits nothing itself. Two of the six mission categories have a route today.",
      },
      {
        title: "pulse_coach — the daily beat",
        description:
          "A daily pulse and leader briefing composed from the mission numbers: what moved, and whether an agent or a human moved it, carried as a first-class field on every pulse rather than reconstructed later.",
      },
    ],
    outcomes: [
      "A portfolio that reads live between reviews, with a daily briefing composed from the mission numbers rather than assembled by hand",
      "Autonomy that is granted per mission with a ceiling and a spend-down cap, and can be withdrawn",
      "A recorded rationale behind each signal decision, appended to the hash-chained audit",
      "A clear split between what an agent may do immediately and what waits for a person",
    ],
    integrations: [
      "The knowledge seam — declared as a tool on all nine goal1 agents",
      "The analytics seam — declared by the signal scout, the foresight analyst and the portfolio strategist",
      "enterprise1 — approvals, the hash-chained audit, the autonomy ladder and the wave gate",
      "finance1 and supply1 — routing targets for an off-track mission; goal1 proposes, and the sibling's own gate acts",
      "The connectors goal1 declares are modelled adapters, not live integrations",
    ],
    suiteFit:
      "goal1 runs in-process inside enterprise1 — there is no separate goal1 service, and it deliberately does not cross the cross-app flows boundary. It has no system of record of its own: the portfolio is one governed key-value blob per tenant, bound to the caller's tenant on every read and write. Where a mission needs a lever goal1 does not own, the routing endpoint names the owning app and the gate — a revenue mission to finance1, a scaling mission to supply1's reorder, which itself requires approval. Those are the only two of six mission categories with a route today, and the route fires only for a mission foresight predicts will miss. goal1 writes nothing to a sibling and commits nothing; a launch-readiness test asserts it. The four copilots each carry the same limit: the planning copilot never creates, the briefing copilot never publishes, the alignment copilot never re-parents a mission.",
    trust:
      "Autonomy here is granted, not seized. Arming an envelope refuses a critical ceiling outright — a critical signal always escalates to a human — and eligibility re-checks that ceiling and the spent cap before every in-envelope move; outside the envelope the request falls back to the approval gate. Applying a signal out of envelope, retiring a mission or the North Star, arming or raising an envelope, disbanding a crew and cancelling a bet are registered consequential and wait for a person. Most other writes — creating a mission, logging a pulse, aligning to the North Star, running a play, placing a bet — are immediate: policy-evaluated and appended to the audit, but not human-approved. We would rather state that than claim more. The Trust Mark is checked against the live store rather than asserted: the conformity snapshot verifies that every envelope respects the ceiling, every projection is clamped to its target, and no mission pulls toward a North Star that does not exist; if any check fails, the mark is refused. Portfolio figures shown in the product are illustrative, and projections are labelled projections.",
    workforce: {
      registered: 9,
      launchWave: 6,
      note: "Nine agents, six enabled in the launch wave — the widest proportion in the suite, because most of goal1 reads and drafts. The apply agent, the alignment agent and the orchestrator are off by default.",
    },
    systemOfRecord: {
      objectTypes: 6,
      note: "goal1 has no system of record of its own. It declares six object types — mission, signal, action, envelope, ambition and bet — persisted as one governed key-value blob per tenant, bound to the caller's tenant on every read and write.",
    },
    copilots: [
      { name: "Planning copilot", mode: "advisory", does: "Turns an intent into a draft mission with a grounded baseline. Where it cannot ground one it returns nothing draftable and says so — it proposes nothing rather than invent a mission. It never creates." },
      { name: "Briefing copilot", mode: "advisory", does: "Composes the daily cross-portfolio situation report: what moved, what is at risk, what needs a decision today. It never publishes." },
      { name: "Foresight copilot", mode: "advisory", does: "Shows the trajectory, the ETA and the labelled what-if for applying the next signal, clamped to the target." },
      { name: "Alignment copilot", mode: "advisory", does: "Shows how missions pull toward the North Star, surfacing over-commitment and tension. It never re-parents a mission." },
    ],
    automations: [
      { name: "signal_scout", trigger: "event:metric.stream", does: "Always-on signal watch. Read-only — it surfaces, it does not apply." },
      { name: "pulse_coach", trigger: "event:day.start", does: "The daily pulse and leader briefing." },
      { name: "foresight_analyst", trigger: "event:day.start", does: "Daily drift detection across the portfolio." },
      { name: "mission_architect", trigger: "event:ambition.set", does: "Frames missions when an ambition is set. Drafting only." },
      { name: "orchestrator", trigger: "event:*", does: "Routes events to the right specialist. Off by default." },
      { name: "Autopilot envelope", trigger: "manual", does: "Inside the armed envelope an apply lands with no per-move gate; off, capped out, or above the ceiling, it falls back to the approval gate." },
    ],
    skills: {
      count: 8,
      note: "Mission framing that will not invent a baseline — it grounds it or marks it unknown — plus sprint decomposition, signal triage rules, foresight projection, play capture and the bet-settlement rules.",
    },
    mcpSeams: [
      { name: "Knowledge", status: "modelled", note: "Declared by all nine agents, and the declared tool on seven of the eight goal1 skills. Typed and least-privilege — an agent may only touch what its own spec declares." },
      { name: "Analytics", status: "modelled", note: "Declared by the signal scout, foresight analyst and portfolio strategist for the metric reads behind a signal." },
    ],
    dashboards: [
      "Mission control — the executive overview: hero stats, the momentum streak, the cadence ribbon and the alignment roll-up, live over the portfolio.",
      "North Star — the single ambition and the formation of missions pulling toward it, with over-commitment and tension surfaced.",
      "Briefing — the daily cross-portfolio situation report.",
      "Foresight — trajectory, ETA and the labelled what-if per mission.",
      "Signals — the triage queue, with severity, affected mission, quantified impact and suggested move.",
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
        "goal1 runs one live goal cadence — North Star, missions, sprints, a daily pulse, and detected signals a human triages. Applying a signal needs approval unless a mission's Autopilot envelope grants it, and the envelope refuses a critical ceiling.",
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
        "enterprise1 is the backbone that runs the whole 1 Suite as one — shared governance, identity, data, skills, and observability across every function, rolled out in waves.",
      primaryCta: "Talk to sales",
    },
    problem: [
      "Point agents sprawl without shared governance.",
      "Identity, data access, and audit are inconsistent across tools.",
      "There's no single place to observe and control agent behavior.",
      "Scaling from a pilot to the enterprise stalls.",
    ],
    capabilities: [
      { title: "Unified governance", description: "One policy, audit, and human-in-the-loop framework across every agent." },
      { title: "Identity & access", description: "SSO and consistent, least-privilege data access across functions." },
      { title: "Shared skills & connectors", description: "Reusable Skills and MCP connectors available to the whole suite." },
      { title: "Observability & control", description: "A single pane to monitor, evaluate, and manage agents in production." },
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
