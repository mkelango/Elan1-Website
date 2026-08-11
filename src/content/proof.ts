// content/proof.ts — GOVERNED PATTERNS. The status quo, the governed path, and the guarantee —
// stated as a property of a named mechanism, and wherever there is one, quoted from the refusal
// the write path actually raises.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// 🚨 THIS FILE USED TO CARRY OUTCOME METRICS ("~70% screening toil removed", "100% clinician
// sign-off", "faster first-response"). They were labelled "illustrative", but a number on a page
// beside a named industry reads as a result — and nobody measured them, because there are no
// customers yet. Every `metric` field was deleted rather than softened. Do not reintroduce one
// without a measurement somebody actually took, in a customer environment, that we can name.
//
// 🚨 A TRUST MARK IS NOT A BADGE WE HAND OUT PER CARD. An earlier draft of this file put nine
// AGENT ids in `trustMark` (finance1.ap, supply1.procurement, market1.social_publisher,
// market1.campaign, people1.engagement_pulse, people1.screening, service1.resolution,
// commerce1.refund_agent, insight1.dashboard_publisher) plus one control-plane agent id
// (rollout.advisor). None of the ten is a workflow, and a mark is issued against a governed
// workflow — so every one of them was a fabricated citation wearing a green pill. `trustMark` is
// now OPTIONAL and carries only ids that resolve to a workflow in a shipped pack. An agent id goes
// in `registeredAgent`, which the page must label differently. See TRUST_MARK_NOTE and
// REGISTERED_AGENT_NOTE below — both are exported so the distinction renders rather than sitting
// in a comment nobody reads.
//
// 🚨 SCOPE EVERY COVERAGE CLAIM TO THE GOVERNED PATH. An earlier draft said the money gate "holds
// for a UI action, an API call and an agent alike" on card one, and then published, on card ten,
// a standing guard that counts the request handlers still writing to a system of record without
// passing the governed writer. The second card was the disproof of the first. The count is real
// and it is not zero, so the honest form of every coverage sentence here is "on the governed write
// path", with GOVERNED_PATH_SCOPE stating the limit once rather than a hedge on every card stating
// it badly. Do not write "every path" in this file.
//
// 🚨 WHY THE REFUSAL STRING LIVES INSIDE `guarantee`. The page (pages/Proof.tsx) renders a fixed
// set of fields per card, and `guarantee` is the only prose slot left after before/after, so the
// mechanism AND its verbatim refusal go there. If the card template later grows a dedicated
// refusal slot, MOVE the quoted string into it — never copy it. Two copies of a quote drift, and
// the copy that drifts is the one that stops being a quote and starts being a paraphrase we
// invented.
//
// 🚨 QUOTE EXACTLY, NEVER STRENGTHEN, AND QUOTE FROM A PATH THAT RUNS. Every string inside double
// quotes in a `guarantee` below was read out of the platform tree, with its lowercase first
// letter, its `{placeholders}` and its punctuation intact — and, after the review that rewrote
// this file, re-checked to confirm the module it lives in has a production caller. The money card's
// original five quotes were CUT for failing that second test: they are real strings in a real
// module whose only callers are its own unit tests, which would have made the most persuasive
// material on the page the least true part of it. A sixth was cut for the adjacent reason — the
// data-layer suspension refusal exists, but the policy carrying it is registered without the
// reference the clause reads, so nothing in the shipped configuration raises it. A refusal is
// persuasive precisely because a regulated buyer can ask to see it raised; a refusal nothing raises
// is the opposite. If a refusal changes upstream, change it here or delete it.
//
// 🚨 NO ADJECTIVE STANDS IN FOR A MECHANISM. "Enterprise-grade governance" is not a guarantee.
// The test for a `guarantee` field: could a sceptical engineer, holding the platform source, point
// at the thing it names, and is that thing on a path a request actually takes?
//
// WHY `domain` EXISTS ALONGSIDE `industry`. Most of what this page proves is not industry-specific
// — it is the same money / personal-data / publishing / procurement / autonomy gate reused
// everywhere, which is the whole argument for one core. So most of these carry the industry
// "Across the suite", which makes an industry chip row a weak index of the page. `domain` is the
// facet that actually discriminates ("Money", "Personal data", "Physical control"), and `DOMAINS`
// is exported ready for it. The page still filters on `industry` today; switching the chip row to
// DOMAINS/`c.domain` is a two-line change in pages/Proof.tsx and is the recommended next edit.
// Both fields stay populated honestly either way — neither is a label of convenience.
//
// COUNTS AND COLOURS COME FROM ONE PLACE EACH. Platform counts import from platform-facts.ts (a
// hand-typed count has shipped stale three times); accents import from the ACCENT tokens so a card
// and its owning app cannot drift to two different colours.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { ACCENT } from "./types";
import { factValue } from "./platform-facts";

export interface CaseStudy {
  id: string;
  title: string;
  /**
   * Industry facet — the current filter chip row. "Across the suite" is the honest label for a
   * pattern the shared core enforces regardless of vertical; do not relabel one of those with a
   * sector name to balance the chips, because that would imply the gate is industry-specific.
   */
  industry: string;
  /**
   * What the gate protects — the facet that actually discriminates on this page. See the note at
   * the head of the file: this is the recommended filter, and `DOMAINS` is exported for it.
   */
  domain: string;
  /** The app / pack at the core of the pattern, and what it composes. */
  app: string;
  /** How it fails today — the status quo, described as a mechanism, not as a mood. */
  before: string;
  /** What the governed path does instead. */
  after: string;
  /**
   * The governance property this pattern guarantees: the NAMED MECHANISM that enforces it, plus
   * the verbatim refusal the write path raises, plus the stated limit where one exists.
   * Never an outcome — nothing on this page has been measured in a customer environment.
   */
  guarantee: string;
  /**
   * OPTIONAL, and the rule is strict: a WORKFLOW id declared in a shipped pack, against which an
   * assure1 Trust Mark is issued. A mark is issued against a governed workflow, never against an
   * agent — so an agent id in this field is a fabricated citation, which is how the previous draft
   * of this file came to assert ten marks that do not exist. Every value present below resolves to
   * a `workflows:` entry in a pack that ships. If you cannot point at that entry, leave the field
   * unset and use `registeredAgent`. See TRUST_MARK_NOTE for what the mark does and does not say.
   */
  trustMark?: string;
  /**
   * OPTIONAL. The agent id registered in the owning app's roster — a different and weaker fact
   * than a Trust Mark, and it must be labelled differently on the page. Registration is not
   * enablement and it is not certification. See REGISTERED_AGENT_NOTE.
   */
  registeredAgent?: string;
  accent: string;
}

/** One badge per card, correctly labelled — or none. The page must not render a mark it was not given. */
export type ProofBadge = { label: "Trust Mark" | "Registered agent"; value: string };

export const proofBadge = (c: CaseStudy): ProofBadge | null =>
  c.trustMark
    ? { label: "Trust Mark", value: c.trustMark }
    : c.registeredAgent
      ? { label: "Registered agent", value: c.registeredAgent }
      : null;

export const PROOF: CaseStudy[] = [
  // ——— The horizontal gates: the same mechanism, whatever the industry ———
  {
    id: "money-release",
    title: "Money that cannot leave on a schedule",
    industry: "Across the suite",
    domain: "Money",
    app: "finance1 · the approval gate in enterprise1",
    before: "Automation holds credentials; money leaves on rule match.",
    after: "Release routes to approval, binds to payload hash, consumed once.",
    guarantee: "\"segregation of duties — {principal} requested approval and cannot also approve it; a different approver is required\" · \"money action requires idempotency_key\" · coverage is not universal.",
    registeredAgent: "finance1.ap",
    accent: ACCENT.cyan,
  },
  {
    id: "procurement-commitment",
    title: "A commitment to a supplier nobody approved",
    industry: "Across the suite",
    domain: "Procurement",
    app: "supply1 · finance1",
    before: "Agent orders from cheaper supplier; no vendor approval or idempotency.",
    after: "Approved-vendor-only write. Idempotent. Measured cumulatively. No overreceipt.",
    guarantee: "\"supplier not on approved-vendor list — PO refused\" · \"commitment requires idempotency_key (no double-ordering)\" · coverage governed path only.",
    registeredAgent: "supply1.procurement",
    accent: ACCENT.green,
  },
  {
    id: "publish-asset",
    title: "Copy that publishes itself",
    industry: "Across the suite",
    domain: "Publishing",
    app: "market1",
    before: "Generated copy auto-publishes on schedule; no ban-check; duplicates possible.",
    after: "Human-approved only. Record reads body not flags. Idempotent. Ad-free.",
    guarantee: "\"banned/misleading claim(s) in post: {claims}\" · \"social post already published\" · \"ad placement not permitted\". Limit: lexical check catches phrasing not implications.",
    registeredAgent: "market1.social_publisher",
    accent: ACCENT.violet,
  },
  {
    id: "consent-send",
    title: "A send to someone who asked you to stop",
    industry: "Across the suite",
    domain: "Personal data",
    app: "market1 · sales1 · the core channel gate",
    before:
      "The opt-out is recorded in one system, the sequence runs from another, and the unsubscribe is honoured on the next sync. Consent gets checked when the list is built — the one moment it is guaranteed to be stale by the time the message goes.",
    after:
      "Consent is a hard gate evaluated at dispatch, against the recipient being written to rather than against the segment they were in. A broadcast to a contact who opted out of email is not dispatched, and the refusal names the recipient instead of silently dropping them. A do-not-contact recipient is blocked before the channel is reached at all, and a cadence unenrols anyone who has already replied.",
    guarantee:
      "The consent policy lives in the core's native-channel gate, so it applies to the channels rather than to one app's send button: \"recipient is do-not-contact / opted out\". At the send site itself, verbatim: \"blocked — {target_type} '{target_id}' has opted out of email; the send was not dispatched\". A send still waits for a one-tap human confirm on top of that — the gate narrows what reaches the confirm, it does not replace it.",
    registeredAgent: "market1.campaign",
    accent: ACCENT.violet,
  },
  {
    id: "pulse-anonymity",
    title: "The anonymous survey that carries a name",
    industry: "Across the suite",
    domain: "Personal data",
    app: "people1",
    before:
      "The engagement survey promises anonymity, and the promise is a checkbox on a settings screen. Somewhere downstream a payload still carries an employee identifier, and the first person to find out is the employee who answered honestly.",
    after:
      "A pulse response carrying an employee identifier is refused at the data layer, and the refusal names the identifiers it found rather than failing vaguely. Because the check sits on the governed write rather than on the form, the form, a bulk import and an agent all arrive at the same rule instead of at three copies of it — for anything that reaches the store through that writer, which is the scope this whole page is held to.",
    guarantee:
      "A refusal by shape: it inspects what the record actually carries instead of trusting a field that says the record is anonymous. Verbatim: \"a pulse response must be ANONYMOUS — it cannot carry an employee identifier ({identifiers}); data-minimisation refusal (grounded)\". The check reads the record rather than a setting, which is what makes the promise printed on the survey and the rule enforced at the store the same promise.",
    registeredAgent: "people1.engagement_pulse",
    accent: ACCENT.rose,
  },
  {
    id: "protected-attributes",
    title: "A rejection reason that rests on a protected attribute",
    industry: "Across the suite",
    domain: "Personal data",
    app: "people1",
    before:
      "The fairness control asks the actor being judged for the verdict about itself: one boolean on the request, did this decision use protected attributes? Nothing reads the decision, the basis or the reasons text — so a rejection whose stated basis is that the candidate is pregnant passes the bias check, and the test written to prove the control works reads the same single field the control does.",
    after:
      "The payload is inspected rather than asked: keys and string values, at any depth, against the platform's protected-attribute list. The match runs in the vocabulary a rejection actually uses rather than the schema's — the attribute is recorded as pregnancy, and the words in a basis are maternity, or expecting. A hit refuses and names the attributes it found. The self-declared flag is kept as an additional trigger, never as the only signal.",
    guarantee:
      "Two independent mechanisms, and the weaker one is not the last line: people1's bias control refuses the write, and people1's registered decision policy answers every action it governs with \"a human decides this people action\", so what the classifier narrows still arrives at a person. Stated limit, because it matters: the guard is lexical. It cannot catch a proxy — a graduation year standing in for age, a postcode standing in for something else. It is stronger than a self-declared flag and weaker than a human reviewer, and both are in the path.",
    registeredAgent: "people1.screening",
    accent: ACCENT.rose,
  },
  {
    id: "service-draft",
    title: "The reply the agent drafts and a person sends",
    industry: "Across the suite",
    domain: "Service",
    app: "service1 · finance1",
    before:
      "A deflection bot answers confidently when it has no source, and the customer pays the difference. Worse, it can close the case — so the record of what went wrong is a resolved ticket, and the pattern never reaches anyone who could fix it upstream.",
    after:
      "The answering agent's entire tool grant is the knowledge seam: it can retrieve, and it cannot act on a record. Below a confidence floor the endpoint routes to a human and says why. Above it, the agent returns a cited draft and a proposed status of resolved — a proposal. The draft lands on the case marked as needing a send, and a person sends it.",
    guarantee:
      "The sensitive-action refusal lives in the core service-desk module rather than in one route, so a refund, an account change and a case close each meet it wherever they are called from: \"'{action}' is a sensitive action — requires human approval (K5)\". Also verbatim: \"no confident KB match — a human takes this\" · \"a PROPOSED resolution — a human confirms the resolve + send (K5); the agent never auto-closes\" · \"a refund needs a positive amount — service1 never posts an unspecified amount\".",
    registeredAgent: "service1.resolution",
    accent: ACCENT.gold,
  },
  {
    id: "refund-capture",
    title: "A refund larger than the payment it refunds",
    industry: "Across the suite",
    domain: "Money",
    app: "commerce1 · finance1",
    before: "Refund amount typed; unchecked. Stock promised unavailable. Shipped unpaid.",
    after: "Refund bounded by captured. Order must be paid before ship. Stock reserved available.",
    guarantee: "\"refund {refund} exceeds captured {captured} — blocked\" · \"order must be paid before ship\" · \"reserved cannot exceed on_hand\".",
    registeredAgent: "commerce1.refund_agent",
    accent: ACCENT.magenta,
  },
  {
    id: "publish-number",
    title: "A dashboard that publishes a rate over nothing",
    industry: "Across the suite",
    domain: "Publishing",
    app: "insight1",
    before: "Stored counter persists; nothing-matched and unread arrive identical.",
    after: `Computes at read, read-only to sibling SoRs. Proposes, never acts. No money moves.`,
    guarantee: "\"human approval required to publish dashboard\" · \"metric not grounded ({reason})\" · empty result distinguished from unread source.",
    registeredAgent: "insight1.dashboard_publisher",
    accent: ACCENT.blue,
  },
  {
    id: "agent-enablement",
    title: "The agent nobody turned on",
    industry: "Across the suite",
    domain: "Agent autonomy",
    app: "enterprise1 · the wave gate",
    before: "All-or-nothing rollout; incident stop requires product halt.",
    after: "Per-tenant per-function enablement. Incident stop preserves prior wave.",
    guarantee: "\"{app}.{function} not enabled for tenant {tenant}\" · \"{app} is SUSPENDED (incident)\" · enabling requires human approval.",
    registeredAgent: "rollout.advisor",
    accent: ACCENT.clayDeep,
  },

  // ——— The vertical gates: the same core, with a rule the industry cannot do without ———
  {
    id: "clinical-signature",
    title: "The note that quietly asserts a diagnosis",
    industry: "Healthcare",
    domain: "Clinical & regulated writes",
    app: "health1 · finance1 + project1 + insight1",
    before: "Scribe drafts; nothing stops auto-sign. Consent taken once upstream.",
    after: "Status recomputed per write. Negation-aware classifier. Active consent required.",
    guarantee: "\"decision-support only — note asserts diagnosis, cannot be signed\" · \"no active patient consent — clinical record requires consent\".",
    trustMark: "health1.patient_access_support",
    accent: ACCENT.green,
  },
  {
    id: "scheduled-bypass",
    title: "The standing instruction that pays itself",
    industry: "Banking",
    domain: "Money",
    app: "bank1 · finance1 + service1",
    before: "Mandate auto-approved once; balance checked against stale stored field.",
    after: "Mandate drafts only, never executes. Balance recomputed from ledger.",
    guarantee: "\"sanctions/AML: human never moves to blocked beneficiary\" · \"payment may not exceed grounded balance\" · \"KYC-verified required\".",
    trustMark: "bank1.kyc_aml_triage",
    accent: ACCENT.clay,
  },
  {
    id: "lapsed-coverage",
    title: "A claim paid against a policy that lapsed",
    industry: "Insurance",
    domain: "Money",
    app: "insure1 · service1 + finance1",
    before: "Coverage on different screen; sum insured consumed unknown.",
    after: "Claim approved only while policy active. Coverage computed from prior claims.",
    guarantee: "\"claim approved against ACTIVE policy only\" · \"claim cannot be paid unless pre-approved by human\" · \"coverage exhausted\".",
    trustMark: "insure1.claims_triage",
    accent: ACCENT.cyan,
  },
  {
    id: "lot-genealogy",
    title: "A batch completed with material that was never issued",
    industry: "Manufacturing",
    domain: "Physical control",
    app: "manufacture1 · supply1",
    before:
      "Lot genealogy is assembled after the fact from spreadsheets, so a recall traces to a guess. A predictive-maintenance agent that can also act closes a loop nobody asked it to close. And the certificate of analysis gets signed off an inspection that passed before the non-conformance was raised, because nothing reconciles the certificate against what happened after it.",
    after:
      "Completing a batch is refused when material was never issued against it, and consuming more of a lot than was received is refused. A certificate of analysis is refused over an open non-conformance and over a later failed inspection — an earlier pass survives neither. An inspection criterion must carry a verdict a person reached, because the write path refuses to infer from a measurement whether it is in spec. On the machine side, a command against a locked-out asset is refused outright.",
    guarantee:
      "Verbatim, and worth reading in full because the code says why: \"cannot complete this batch: no material issued for {materials}. A produced unit without lot genealogy cannot be recalled — traceability is this vertical's promise, and it is kept here or nowhere.\" · \"cannot issue a certificate of analysis for a batch with {n} OPEN non-conformance(s) — an earlier pass does not survive an unresolved NCR. Close it (a human's decision) first.\" · \"machine safety: no command may be issued against a LOCKED-OUT machine (LOTO)\". Advisory is enforced at build time too: the agent studio refuses to compile an agent marked advisory that holds a control-system connector — \"advisory agent '{name}' may not hold control-system connectors {connectors} — OT actions are taken by humans\".",
    trustMark: "manufacture1.predictive_maintenance",
    accent: ACCENT.cyan,
  },
  {
    id: "price-ceiling",
    title: "A live price above the printed maximum",
    industry: "Retail & D2C",
    domain: "Regulated pricing",
    app: "retail1 · commerce1 + supply1",
    before:
      "The maximum retail price is a field on the product; the promotion engine is a different system. The illegal price is discovered at the till, or by a regulator, and the correction is a support ticket. Two overlapping promotions on the same item mean the price depends on which rule the query happened to read first.",
    after:
      "The cap is refused from both directions. A sale price above the printed maximum is refused — and lowering that maximum under a price the store is already selling at is refused too, naming the active rules to reprice first, because the alternative is a platform that knows a live price is illegal and leaves it selling. Two active price windows for the same item cannot overlap: one item, one price, at any instant.",
    guarantee:
      "Verbatim: \"pricing integrity: sale price {sale} exceeds MRP {mrp} (Legal Metrology)\" · \"pricing integrity: MRP {new} is below {n} ACTIVE price rule(s) selling at {prices} — lowering it would put a live price above MRP (Legal Metrology). Reprice those rules first.\" · \"this window overlaps ACTIVE price rule {id} ({window}) for the same sku — one sku, one price, at any instant. End or re-window that rule first.\" The same check is recomputed on the price that actually crossed into the storefront, so the guard is not only on the record a merchandiser edits.",
    trustMark: "retail1.merchandising_review",
    accent: ACCENT.gold,
  },
  {
    id: "resource-integrity",
    title: "The number allocated twice",
    industry: "Telecom",
    domain: "Physical control",
    app: "telco1 · service1 + project1",
    before:
      "Provisioning runs across three systems that each believe they own the inventory. The same SIM, number or address ends up assigned twice, and the conflict surfaces as an outage on somebody's live service. Meanwhile the agent that triages the alarm is one permission away from being the thing that changes the network.",
    after:
      "On the governed write, a network resource can only be assigned from available, so a second allocation has no path through — and the refusal names the state it actually found rather than saying the request was invalid. A circuit activates only for a KYC-verified enterprise account, and only while it is genuinely allocatable: endpoints set, not already active, not decommissioned. The agent plans, triages and correlates; a person provisions, suspends and decides every flag.",
    guarantee:
      "Verbatim: \"a network resource can only be assigned from 'available' (it is '{current}') — a number / IP / SIM is never double-allocated (resource integrity)\" · \"humans act on the network: the agent plans and triages, but a human provisions, suspends and decides every flag (refused: {marker})\" · \"a circuit may only be activated for a KYC-verified enterprise account (DoT CAF)\" · \"cannot publish a network metric with no underlying records (ungrounded)\".",
    trustMark: "telco1.high_volume_care",
    accent: ACCENT.violet,
  },
];

/** How many patterns carry a real Trust Mark, and how many carry only an agent id. DERIVED — the
 * previous draft of this page hand-typed both a "sixteen" and a "six" into copy describing itself,
 * and both were wrong. A page that miscounts itself has no standing to publish a platform count. */
export const MARKED_PATTERNS = PROOF.filter((c) => c.trustMark).length;
export const AGENT_ONLY_PATTERNS = PROOF.filter((c) => !c.trustMark && c.registeredAgent).length;

/**
 * What a Trust Mark on this page means — and what it does not. Render this near the marks; the
 * badge without it is the strongest-looking and least-supported thing on the page.
 */
export const TRUST_MARK_NOTE =
  `${MARKED_PATTERNS} of the patterns here name the workflow id that carries its assure1 Trust ` +
  "Mark. On this platform a Trust Mark is issued only by a governed call that refuses an eval run " +
  "scoring zero cases, one that did not pass, or one belonging to another tenant — and a mark " +
  "whose evals later fail is revoked as drift. The badge says the pattern is built to be certified " +
  "that way. It is not a live read of a mark in a customer environment: there are no customer " +
  "environments yet, and nothing on this page queries one.";

/**
 * What an agent id on this page means. These are roster entries, not workflows, and none of them
 * carries a mark — which is precisely why they are not in `trustMark`.
 */
export const REGISTERED_AGENT_NOTE =
  `The other ${AGENT_ONLY_PATTERNS} name an agent id registered in its app's roster. Registration ` +
  "is not enablement and not certification. Enablement is staged per tenant by wave, and the " +
  "rollout gate refuses a run of a function a tenant has not enabled. An assure1 Trust Mark is " +
  "issued against a governed workflow backed by a passing, non-empty eval run in that tenant; an " +
  "agent id is not a workflow, so none of these ids carries a mark. Certifying a registered agent " +
  "writes a lifecycle record bound to a content hash of its definition — the default check is a " +
  "structural declaration check, and a behaviour battery is registered only for specific named " +
  "agents, not for the roster at large.";

/**
 * The limit that scopes every coverage sentence on this page. Stated once, here, so no card has to
 * choose between hedging badly and overclaiming.
 */
export const GOVERNED_PATH_SCOPE =
  "Every pattern here describes the governed write path — the one that evaluates policy, routes a " +
  "consequential change to a human, and writes the audit entry. Coverage of that path is not " +
  "universal and we do not claim it is. A build-time check derived from the router tree, not from " +
  "a hand-kept list, counts the mutating request handlers that still write to a system of record " +
  "directly, and holds that count as a ceiling: it may never rise, and every fix lowers it. We " +
  "would rather publish the mechanism and the ratchet than an unqualified \"every path\".";

/**
 * The current filter chip row (pages/Proof.tsx). Derived — never hand-list these, or a new pattern
 * with a new industry silently gets no chip and becomes unreachable behind any filter but "All".
 */
export const INDUSTRIES = ["All", ...Array.from(new Set(PROOF.map((c) => c.industry)))];

/**
 * The recommended facet: what the gate protects. Most patterns here are industry-agnostic, so this
 * discriminates where `INDUSTRIES` does not. Derived for the same reason.
 */
export const DOMAINS = ["All", ...Array.from(new Set(PROOF.map((c) => c.domain)))];
