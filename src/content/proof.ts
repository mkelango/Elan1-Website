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
    before:
      "A finance automation holds ledger credentials, so the moment a rule matches, the money is gone. The evidence that anyone intended it is a chat thread and somebody's memory of saying yes. A retry after a timeout pays twice. And the person who drafted the entry is often the person who released it, because the four-eyes rule lives in a policy document rather than in the call that posts.",
    after:
      "Releasing a payment is classified as a consequential write by the platform's governed system-of-record writer, not by the screen that asked for it: on that path the same predicate evaluates policy, routes the release to a second human, and writes the audit entry whether the request arrives from the console, from the API or from an agent. The same writer holds segregation of duties, so the principal who requested the release cannot be the one who approves it — and the approver's own role does not lift it, because it is a control rather than a permission. The approval is bound to the exact action and to a content hash of the payload the reviewer saw, and is consumed on use, so a yes given for one operation cannot be spent on another.",
    guarantee:
      "Verbatim, from the approval gate: \"segregation of duties — {principal} requested approval '{id}' and cannot also approve it; a different approver is required\". From finance1's own registered money policy, which returns no allowance at all without a key: \"money action requires an idempotency_key (no double-posting)\" · \"every payment/commitment requires human approval\". Stated limit, and it is the one that matters most on this card: coverage of the governed path is not universal. A build-time check derived from the router tree counts the mutating handlers that still write to a system of record directly, and holds that count as a ceiling that may only fall. A fully governed write is a direction with a ratchet on it, not a finished claim, and we publish the ratchet rather than the slogan.",
    registeredAgent: "finance1.ap",
    accent: ACCENT.cyan,
  },
  {
    id: "procurement-commitment",
    title: "A commitment to a supplier nobody approved",
    industry: "Across the suite",
    domain: "Procurement",
    app: "supply1 · finance1",
    before:
      "An agent finds a cheaper supplier and raises the order. The approved-vendor list is a spreadsheet somebody maintains, the blanket agreement's ceiling lives in a contract PDF, and a second click during a slow response creates a second order. Over-receipt is caught, if it is caught, by the person matching the invoice weeks later.",
    after:
      "supply1's registered commitment policy answers the same way every time it is consulted: allowed, and a human approves it. Beneath that, the governed write path checks who the money is going to — a supplier off the approved-vendor list is refused by name, on a purchase order and on a blanket release alike, so a standing agreement cannot be used to route future spend to a vendor you have blocked. A release is measured against the quantity already released cumulatively, not against the line in front of you, and receiving more than was ordered is refused.",
    guarantee:
      "The idempotency requirement and the approval both come from supply1's registered commitment policy, which returns no allowance at all without a key: \"a commitment requires an idempotency_key (no double-ordering)\". Then, on the write itself, verbatim: \"supplier '{name}' is not on the approved-vendor list (approved={approved}, status={status}) — PO refused\" · \"releasing {qty} against blanket_order '{id}' would bring total released to {total}, exceeding its cap_qty ({cap})\" · \"receiving {qty} would bring total received to {total}, exceeding the PO's ordered qty ({ordered})\" · \"cannot publish a procurement metric with no underlying committed POs (ungrounded)\".",
    registeredAgent: "supply1.procurement",
    accent: ACCENT.green,
  },
  {
    id: "publish-asset",
    title: "Copy that publishes itself",
    industry: "Across the suite",
    domain: "Publishing",
    app: "market1",
    before:
      "Generated copy goes live on a schedule. The superlative that broke an advertising rule is found by a customer; the broadcast that went out twice is found by the audience; and paid placement sits one integration away from being the default answer to a slow quarter.",
    after:
      "Publishing an asset is a human's action by policy. The truthfulness check reads the record's own title and body rather than a flag on the request, so an asset cannot declare itself compliant. A post that has already published cannot publish again, and a broadcast that has already sent cannot send again — both are refused before the approval gate, because re-sending is not a decision anyone should be asked to make. Paid media is refused as a category by market1's own registered policy rather than switched off in configuration.",
    guarantee:
      "market1's publish policy allows and requires a person — \"a human reviews this asset before publish\" — and the governed write refuses independently of it: \"blocked — banned/misleading claim(s) in the post: {claims}\" · \"social post already published — a post publishes once\" · \"broadcast already sent — a broadcast can only be sent once\" · \"ad placement / paid media is not permitted (ad-free)\". Stated limit: the claim check is lexical over the record's text. It catches the banned phrasing, not every way of implying it — which is why the human review sits above it rather than behind it.",
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
    before:
      "The refund amount is a number typed into a field, and the only thing comparing it to what was actually captured is the person typing. The same shape shows up on the other side of the order: stock is promised that the location does not hold, and a parcel ships against a payment that never cleared.",
    after:
      "The refund is bounded by what the payment record shows was captured — computed from the record, not accepted from the request. An order cannot reach shipped before it is paid. A line cannot take more of a product than is available at the location it is being taken from, and the reserved quantity cannot exceed what is on hand, so the order book cannot commit stock it does not have.",
    guarantee:
      "Each of these is a refusal on the governed write, phrased as what the record could not support: \"refund {refund} exceeds captured {captured} — blocked (not grounded)\" · \"commerce: an order must be paid before it can be shipped\" · \"commerce: line for product {id} wants {qty} but only {available} is available at {location} — the order book can't oversell\" · \"commerce: reserved ({reserved}) cannot exceed on_hand ({on_hand}) — the order book would be committing stock it doesn't have\". Card handling itself is delegated: commerce1 records the capture and gates the money against it, and does not hold the card.",
    registeredAgent: "commerce1.refund_agent",
    accent: ACCENT.magenta,
  },
  {
    id: "publish-number",
    title: "A dashboard that publishes a rate over nothing",
    industry: "Across the suite",
    domain: "Publishing",
    app: "insight1",
    before:
      "The tile reads a stored counter. When the rows underneath it are filtered, archived, or never arrived, the number stays where it was and keeps being reported. \"Nothing matched\" and \"we could not look\" arrive on the screen as the same figure, and only one of them is a finding.",
    after: `insight1 computes at read and stores no metric of its own. It holds no write access to another app's system of record: its only connector grants are its own analytics store and a send-only email connector, and every record it writes is its own — a metric, a report, a dashboard, an insight. It reads ${factValue(
      "insightSourceApps",
    )} sibling systems of record, which is a named set and deliberately not every app. Where a finding needs an action, insight1 proposes rather than acts: a grounded receivables anomaly routes to finance1's payables, a demand projection routes to supply1's reorder, and in both cases the record lands in that app, written by that app, through that app's own human approval gate. insight1 moves no money and commits no purchase.`,
    guarantee:
      "Grounding is a refusal, not a caveat printed under the chart: \"human approval required to publish a dashboard\" · \"metric not grounded ({reason})\" · \"report not grounded ({reason}) — nothing to export\" · \"could not ground the ask — a human rephrases; the copilot never guesses a query\". The pattern this closes is the one where an empty result and an unread source produce the same green number. Stated limit: what keeps insight1 out of a sibling's record is its grant scope, not a test that fails if it wrote one — and what it does ship on its own authority is a draft. Publishing numbers to an audience is human-reviewed.",
    registeredAgent: "insight1.dashboard_publisher",
    accent: ACCENT.blue,
  },
  {
    id: "agent-enablement",
    title: "The agent nobody turned on",
    industry: "Across the suite",
    domain: "Agent autonomy",
    app: "enterprise1 · the wave gate",
    before:
      "An AI rollout that ships as one switch is all-or-nothing: the assistant is live for everyone the day it ships, and the only way to stop a misbehaving one is to stop the product — which is why, in practice, it does not get stopped. Turning the capability back on afterwards means reconstructing by hand what was enabled before the incident.",
    after: `Enablement is per tenant and per function, and the gate runs before an agent acts rather than after it decides — a function outside the tenant's enabled set is refused first, and the refusal is audited. Platform-wide, ${factValue(
      "agentsRegistered",
    )} agents are registered and ${factValue(
      "agentsEnabled",
    )} are enabled in the current wave: the remainder are deliberately off, not missing. One admin action suspends an app's whole agent fleet immediately — an incident stop does not wait in an approval queue — and preserves the enabled set, so resuming restores the exact prior wave. It survives a restart. Lifting it expands access again, so lifting it is the part that needs a human approval. Reading the same wave state, enterprise1's rollout advisor flags agents registered but enabled nowhere, enabled functions naming no agent, and apps left suspended after an incident. It flags and never acts.`,
    guarantee:
      "The gate refuses by name and distinguishes an incident stop from a configuration gap, so an operator reading the log can tell them apart: \"{app}.{function} not enabled for tenant {tenant}\" · \"{app} is SUSPENDED (incident kill-switch) for tenant {tenant}\". Stated limits, both load-bearing. First, the stop halts that app's agent fleet; it does not, as the control plane is wired today, also refuse the app's direct system-of-record writes — the generic write policy carrying that clause is registered without the rollout reference the clause reads, so the clause cannot fire in the shipped configuration, and only a test wires it. Second, enabling a function and lifting a stop are a human's approval, and the advisor carries no assure1 Trust Mark: certifying a registered agent writes a lifecycle record bound to a content hash of its definition, which is the generic structural declaration check, and no behaviour battery is registered for it.",
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
    before:
      "An ambient scribe drafts well, and nothing between the draft and the record stops a generated line being signed as a clinical decision. Consent lives upstream as a checkbox taken once, rather than as a condition re-evaluated at the moment a clinical row is created — or amended, months later, after the patient withdrew it.",
    after:
      "The note's safety status is recomputed from its effective text on every write, so supplying the status in the payload changes nothing, and amending an already-signed note into a diagnosis meets the same refusal. The classifier reads intent and is negation-aware, so declining to diagnose is not diagnosing, and it matches the verb rather than the noun, so a scribe documenting the prescription a clinician actually issued is not blocked. A write to a record type declared as protected health information is refused without an active consent for the resolved patient — on create and on update — and the read side refuses before it reads anything.",
    guarantee:
      "Two refusals sit between a draft and the record, both on the governed write path, so they hold for a human typist, for the pack's own advisor and for a live model: \"decision-support only — this note asserts a diagnosis or prescription, so it cannot be signed into the record. A clinician writes the clinical decision; the scribe drafts.\" · \"no active patient consent — a clinical record requires consent (DPDP/ABDM/HIPAA)\". Stated limits: health1 is provider-side decision support and does not adjudicate as a payer; the interoperability layer says which mode it is in — the FHIR gateway reads a live endpoint when one is configured, while the consent manager and the eligibility, claim and prior-authorisation flows are modelled adapters over health1's own record until credentials are wired, with no external call; none of this is a regulatory certification, and nothing here is medical advice.",
    trustMark: "health1.patient_access_support",
    accent: ACCENT.green,
  },
  {
    id: "scheduled-bypass",
    title: "The standing instruction that pays itself",
    industry: "Banking",
    domain: "Money",
    app: "bank1 · finance1 + service1",
    before:
      "Automating the paperwork quietly automates the authorization. A mandate that runs on a schedule becomes the route around the signature, and because it was approved once as a policy it is never approved again as a payment. The available balance the debit is checked against is a stored field that something else is responsible for keeping true.",
    after:
      "Running a mandate creates a payment fixed to draft through bank1's own governed writer, and the audit row records that nothing executed. The payments desk then shows those machine-drafted rows rather than filtering them out — hiding them from the human's queue would rebuild the same bypass on the read side. The gates run at execute, not at draft, and the balance they check is recomputed from the transaction ledger rather than read from a field.",
    guarantee:
      "Three refusals stand in front of the money, verbatim: \"sanctions / AML: a human never moves money to a sanctioned / blocked beneficiary (refused: {marker})\" · \"a payment may not exceed the account's grounded available balance\" · \"a payment can't execute from an account whose customer is not KYC-verified\". A related refusal guards the input rather than the output: a loan disbursement with a zero tenor is refused because it would generate an empty repayment schedule, leaving its outstanding, days-past-due and classification all at a structural zero. Stated limit: what is enforced here is the authorization, on bank1's own banking record. This is not a connection to a settlement network.",
    trustMark: "bank1.kyc_aml_triage",
    accent: ACCENT.clay,
  },
  {
    id: "lapsed-coverage",
    title: "A claim paid against a policy that lapsed",
    industry: "Insurance",
    domain: "Money",
    app: "insure1 · service1 + finance1",
    before:
      "Coverage state lives on a different screen from the payout button. The sum insured that three earlier claims already consumed is a number somebody is expected to remember, and the approval that authorised the payment is a field on the same request that asks for it.",
    after:
      "A claim can only be approved while its policy is in force; a lapsed or cancelled policy is refused, and the refusal says which. What remains of the coverage is computed from the prior claims against the sum insured, so an exhausted policy has nothing left to pay against. Paying requires that a human already approved the claim on the record — an approval read from the request would be the caller supplying its own permission.",
    guarantee:
      "Verbatim: \"a claim can only be approved against an ACTIVE policy (coverage grounding — a lapsed / cancelled policy is not in force)\" · \"a claim cannot be paid unless it has been approved by a human first\" · \"policy coverage is exhausted — prior claims have consumed the sum insured (nothing remains to pay against)\". insure1 holds no ledger of its own: a payout posts as a finance1 invoice through the finance record, downstream of that approval, so the adjudication and the money cannot be recorded in two places that disagree. A grievance opens through service1's own governed writer, and insure1 raises an error rather than bypass it if service1 refuses.",
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
