// content/insights.ts — Insights, the editorial library on agentic transformation.
//
// WHAT THIS SURFACE IS FOR. Every other content file on this site describes a thing you can buy.
// This one describes the ARGUMENT underneath those things — why the control sits where it sits, why
// a number is computed rather than typed, why a rollout is deliberately smaller than the catalogue.
// A reader arrives here to decide whether we have thought about the problem, not to compare features.
//
// 🚨 THE FAILURE MODE THIS FILE IS PRONE TO. Thought-leadership is the easiest place on a site to
// write something that is *true of nobody in particular*. A generic post about "AI governance" costs
// nothing to write, proves nothing, and reads identically whether or not a line of it is implemented.
// So the rule for this file is narrower than the rest of the site:
//
//   1. EVERY PIECE MUST NAME A MECHANISM THIS PLATFORM ACTUALLY HAS. If the argument would survive
//      unchanged with the product removed, it does not belong here. The test: could a competitor
//      paste this piece onto their own site without editing a word? If yes, rewrite it.
//   2. NO OUTCOME CLAIMS. Nothing has been measured in a customer environment. No faster, cheaper,
//      higher-accuracy, better-adoption, shorter-time-to-value. Use MECHANICAL outcomes only: what is
//      structurally impossible now, what is on the record, what is computed rather than typed.
//      (This is why the old “speed through safety / the governed path is faster to production” line
//      was deleted from `governance-is-the-moat` rather than softened. Do not restore it.)
//   3. NEVER DESCRIBE WHAT ANOTHER PRODUCT OR CATEGORY CANNOT DO. Several pieces here turn on a
//      distinction — governing a tool call versus governing a write, a stored counter versus a
//      computed one — and the tempting next sentence is always "which is what most platforms do".
//      We do not know that, we cannot show it, and the argument does not need it. Describe the two
//      shapes; let the reader place the products they are evaluating, including ours.
//   4. NO FABRICATED PROOF. No customer names, logos, case studies, testimonials, analyst quotes,
//      invented metrics or currency figures, and no certification we do not hold.
//   5. ANY PLATFORM COUNT COMES FROM `platform-facts.ts`, interpolated — never hand-typed. That is
//      rule 1 of that file, and it is not optional here: a number typed into prose is true on the day
//      it is typed. See `derived-not-typed`, which is about exactly this and would be embarrassing to
//      get wrong. Where a piece needs a figure that has no entry — a per-deployment reading, a count
//      with no agreed definition — it does not get typed instead; it gets attributed and dated, or it
//      is described rather than counted.
//   6. EVERY PIECE CARRIES ITS OWN LIMIT. A mechanism described without its boundary is marketing.
//      The limit goes IN the piece that makes the claim, not in a disclaimer at the bottom of the
//      page, because a reader who finds the limit themselves discounts everything above it.
//   7. A DEFECT IS DESCRIBED IN THE TENSE IT IS ACTUALLY IN. Writing a live limitation in the past
//      tense is the worst failure available to this file, because the correction-as-candour move
//      makes the sentence MORE persuasive at the same time as it makes it false. If it is not fixed
//      in the shipping application, it is present tense or it is not published.
//
// ⚠️ CORRECTIONS APPLIED — DO NOT RESTORE THE EARLIER WORDING. Five claims in the first draft of this
// library were refuted against the platform tree and rewritten. Each is now the conservative version,
// and each is easy to "improve" back into a false one:
//   · THE SUSPEND SWITCH stops the AGENT FLEET. It does not refuse a suspended app's direct writes to
//     its own system of record: the generic policy that would is registered in production WITHOUT the
//     rollout reference its clause reads, so the clause cannot fire outside a test. NO write path has
//     ever consulted it. Present tense, in `staged-enablement`. Do not restore any past-tense
//     "it did not always" framing — that sentence was false twice over.
//   · THE APPROVAL-ID LINE IS GONE. Routes forwarding a caller-supplied approval id are the intended
//     human-in-the-loop RESUME pattern, not a defect. The defect was a GATE that asked only whether an
//     approval was approved; it is closed. Do not reinstate the routes as a confession.
//   · CERTIFIED CONNECTORS are per-deployment runtime state re-read from a durable store, not a
//     property of a build. The zero is published as a dated, attributed observation — never as a
//     standing count, which is why no certified-connector entry exists in `platform-facts.ts`.
//   · THE AUDIT IS NOT KEY-ONLY BY CONSTRUCTION. Minimisation is a discipline applied at named
//     boundaries (a CRM write records field keys; a connector call records the operation and its
//     argument names). Other governed actions do record business values. Do not generalise it.
//   · "READS ARE FREE" IS A CLAIM ABOUT THE SPINE, NOT ABOUT ACCESS. It means a read is not routed
//     through policy evaluation, approval and an audited decision. Reads still pass identity and role,
//     stay tenant-scoped, and are withheld or redacted where a vertical requires it.
//
// AUTHORSHIP CONVENTION. The byline is the organisation, not a person, and it is a shared constant
// rather than a field repeated on each entry — we have no named authors to attribute and inventing
// one would be fabricated proof of a masthead that does not exist. Same for the review line.
//
// ⚠️ `reviewedBy` used to read "assure1 editorial". That was changed deliberately and should not be
// changed back: assure1 is the certification kernel that gates AGENT behaviour on eval evidence, and
// naming it as the reviewer of prose implies a certification of this text that does not exist. The
// article template renders this line beside a shield icon, which makes the overstatement worse.
//
// READ TIME IS DERIVED, NOT TYPED. `readMins` is computed from the words the article template
// actually renders TODAY — the dek (rendered as the hero subtitle via `excerpt`) and the body. A
// typed read-time is a claim that goes stale the moment somebody edits a paragraph, and this library
// contains a piece arguing precisely that. If the template starts rendering `abstract`, add it to
// `renderedText` in the SAME commit — one place, not fifteen.
//
// SOURCES FOR THE FACTUAL CLAIMS BELOW. Each piece is grounded in a mechanism described elsewhere on
// this site and traceable into the platform tree. Where two surfaces could disagree, this file defers
// to the surface that owns the fact:
//   · staged enablement, the wave gate and the suspend switch ............ initiatives.ts, services.ts (run1)
//   · the payload-bound approval token, maker-checker, idempotency ....... engineering.ts, initiatives.ts
//   · the hash-chained audit, the append-only trigger, declared damage ... engineering.ts (“The evidence layer”)
//   · erasure keeping the record shell, and where minimisation applies ... engineering.ts (“Data lifecycle”)
//   · the third eval verdict and Trust Mark refusals ..................... initiatives.ts, products.ts (people1, finance1)
//   · connector states: registered / modelled / declared ................. connectors.ts (all three tiers + caveats)
//   · composing through the target app's own governed writer ............. solutions.ts (bank1, gov1, insure1, retail1)
//   · insight1's sibling source set, computed at read .................... products.ts (insight1) + platform-facts (`insightSourceApps`)
//   · the derivation rule for every published count ...................... platform-facts.ts (its own header)
// Do NOT add a piece here whose central claim cannot be pointed at one of those files.

import { factValue } from "./platform-facts";

/**
 * The library's topic set, as a closed union. A free-text tag would let a fifteenth topic appear as a
 * typo of an existing one and quietly split a filter in two.
 */
export type InsightTopic =
  | "Strategy"
  | "Governance"
  | "Architecture"
  | "Assurance"
  | "Evidence"
  | "Operations"
  | "Data";

/** What each topic covers, for a filter bar or a topic index. */
export const INSIGHT_TOPICS: Record<InsightTopic, string> = {
  Strategy: "Where agentic work actually changes an operating model, and where it only looks like it does.",
  Governance: "Where the control sits, what it blocks, and who signs.",
  Architecture: "One core, thin apps, industry packs — and what composition costs when you do it honestly.",
  Assurance: "Evals, certification, and what a badge is allowed to mean.",
  Evidence: "The record: refusals, audit chains, and what survives a reviewer's questions.",
  Operations: "Running it — enablement, rollback, incident posture, cost.",
  Data: "Numbers that are computed rather than stored, and the ones we removed instead of publishing.",
};

export interface Insight {
  slug: string;
  title: string;
  /** The standfirst — one or two sentences carrying the argument, not a summary of it. */
  dek: string;
  /**
   * Mirror of `dek`, derived. The article template and the card both read `excerpt`; keeping it as a
   * second authored field would be two strings that must agree and eventually would not.
   */
  excerpt: string;
  /** Who this is written for. Named plainly, so a reader can skip a piece that is not theirs. */
  audience: string;
  /** 220–270 words: the piece's full argument in brief, expandable into the long form. */
  abstract: string;
  tag: InsightTopic;
  body: { h: string; p: string }[];
  author: string;
  reviewedBy: string;
  /**
   * ISO publication date. ⚠️ THE TWELVE NEW PIECES ARE ALL DATED THE DAY THE LIBRARY WAS WRITTEN,
   * and they should stay that way. The file's first three entries sat on a fortnightly-Tuesday
   * cadence, and the obvious move when expanding the library was to continue that cadence backwards
   * so the twelve new pieces looked like eight months of output. That is a manufactured publishing
   * history — the same class of thing as a fabricated case study, and on a page whose whole argument
   * is "do not assert what you cannot show", it would be the one falsifiable claim on it. Twelve
   * pieces sharing a date reads as a library published as a set, which is what happened.
   */
  date: string;
  /** Derived from the rendered text. Never typed. */
  readMins: number;
  accent: string;
}

/**
 * What an author writes. `excerpt`, `readMins`, `author` and `reviewedBy` are added below — three of
 * them are identical on every entry and the fourth is computed, so authoring them per-entry would be
 * fifteen chances to disagree with each other.
 */
type InsightSource = Omit<Insight, "excerpt" | "readMins" | "author" | "reviewedBy">;

/** The organisation is the byline. We have no named authors, and inventing one is fabricated proof. */
const BYLINE = "elan1";

/** See the header note on why this is not "assure1 editorial". */
const EDITORIAL_REVIEW = "elan1 editorial";

/**
 * The accents match the Resources hub's card palette so a card and the article it opens agree. These
 * are deliberately the paper-ground hexes rather than `types.ts` ACCENT, which is tuned for obsidian.
 */
const HUE = {
  clay: "#df8c64",
  clayDeep: "#b9603f",
  rose: "#e0656d",
  blue: "#2f6df0",
  green: "#3fae6b",
  gold: "#d39a3a",
  violet: "#7c6cf0",
  cyan: "#22b8c4",
} as const;

/**
 * ARRAY ORDER IS READING ORDER, NOT PUBLICATION ORDER. The hub renders this array as-is, and a card
 * shows the topic and the read time but not the date, so nothing on screen implies a feed. The
 * sequence below is an argument: what agentic work is → where the control goes → what counts as
 * evidence → how it is run → what the platform certifies → how it composes → how its numbers are
 * made → what is still open. A future editor adding a piece should place it in that argument rather
 * than at the top.
 */
const INSIGHT_SOURCES: InsightSource[] = [
  {
    slug: "agents-not-features",
    title: "Agentic transformation is not an AI feature",
    tag: "Strategy",
    accent: HUE.clay,
    date: "2026-05-12",
    audience: "Executives sponsoring an AI programme, and the operating leaders who will live with what it changes.",
    dek: "A copilot bolted onto a CRM leaves the work exactly where it was: in a form, typed by a person. An operating layer moves the work into the record.",
    abstract:
      "It is easy for an AI strategy to become a list of features — a summariser here, a chat box there, a drafting panel in the corner of a screen. Each is useful and none of them changes where the work happens: a person still reads, decides, and types into a form, and the record still changes only when they do. There is one question that separates a feature from an operating layer, and it is worth asking of every item on the list. After this ships, which record changes without a person typing into a form — and whose name is on that change? An operating layer is what makes that question answerable. Agents read your own records, propose the next move, and any change they cause travels one governed path: identity resolved, policy evaluated, consequential actions routed to a named human, the result appended to a hash-chained audit. The sequencing is a control rather than a schedule, because enablement is per tenant and per function, and a function outside the enabled set is refused before it acts. Two honest notes belong in the same breath. strategy1, the engagement that produces the sequence, is a delivery motion performed by people — there is no strategy1 app, agent or screen. And nothing here has been measured in a customer environment, so the claims are mechanical: what is now structurally impossible, what is on the record, what is computed rather than typed.",
    body: [
      {
        h: "The feature trap",
        p: "A summariser, a chat box, a drafting panel. Each of these is genuinely useful, and none of them changes the shape of the work. The person still gathers the context, still decides, and still types the decision into a form — the assistant simply made one of those steps pleasanter. That is a real improvement and it is not a transformation, and conflating the two is how a programme ends up two years in with a longer list of tools and an unchanged operating model.",
      },
      {
        h: "The question that separates the two",
        p: "Ask it of every item on the roadmap: after this ships, which record changes without a person typing into a form, and whose name is on that change? A feature usually cannot answer the first half. A system that can answer both halves is doing something structurally different, and it is also, not coincidentally, the only kind of system your risk function can assess — because the second half of the question is what an auditor was going to ask anyway.",
      },
      {
        h: "What an operating layer actually is",
        p: "Agents that read your own systems of record, propose the next move, and cause changes through one governed write path rather than through whatever integration was nearest. On that path identity is resolved, a policy is evaluated, a consequential action stops and routes to a named human, the write happens, and an entry is appended to a per-tenant hash-chained audit. The interesting property is not that an agent can act. It is that a person, an agent and a sibling application all reach the record through the same door, so there is one place to reason about what is allowed.",
      },
      {
        h: "Sequence is a control, not a schedule",
        p: "A roadmap in a deck is an intention. Enablement here is per tenant and per function: a function outside the tenant's enabled set is refused before it acts, and the refusal names the application, the function and the tenant so an operator sees a configuration gap rather than a mystery. A separate suspend switch stops a suspended application's agent fleet outright during an incident — what that switch reaches, and what it does not, is set out in the piece on staged enablement rather than implied here. Together they turn \"not this wave\" into a refused run rather than a line somebody has to remember.",
      },
      {
        h: "What we will not claim",
        p: "No outcome figures appear in this library, because nothing has been measured in a customer environment and a number we cannot reproduce on your data is worse than no number. And strategy1 — the engagement that produces the sequence — is a delivery motion performed by people. There is no strategy1 application, agent, screen or endpoint. We would rather say that than let a services line item look like software.",
      },
    ],
  },

  {
    slug: "who-sends-the-message",
    title: "The last inch: who presses send",
    tag: "Strategy",
    accent: HUE.gold,
    date: "2026-08-08",
    audience: "Service, marketing and sales leaders deciding how much of a customer conversation an agent may own.",
    dek: "Almost every argument about deploying agents is really an argument about one inch — the gap between a draft and a dispatch.",
    abstract:
      "Strip the abstraction out of most agent debates and what is left is a single question: may this thing send. Everything before the send is comparatively uncontroversial — reading the history, classifying the intent, retrieving the policy, scoring the risk, writing the words. The send is where a mistake becomes public, and it is the reason capable pilots sit unswitched-on for months. elan1's answer is to give agents the ninety-nine and hold the one. service1's resolution agent owns the case across the helpdesk, CRM and knowledge seams and lands its reply on the case marked as needing a send; a person sends it. Self-service answers only above a confidence floor, and below it the endpoint routes to a human with the reason recorded rather than producing a cheaper guess. In market1, publishing, scheduling a social post and sending a newsletter are consequential by declaration, so the runtime routes them to a person even when the agent never thought to ask. In sales1, a send is consent-checked where it happens: a do-not-contact recipient is blocked outright and a cadence unenrols anyone who has already replied. One limit worth stating plainly: the assistant's channel connectors are modelled sends in this build — recorded rather than dispatched — until channel credentials are configured. The design consequence is that the interesting engineering is not autonomy. It is making the human's inch cheap.",
    body: [
      {
        h: "Where the argument actually is",
        p: "Reading a case history, classifying intent, retrieving the right policy paragraph, scoring urgency, drafting a reply — none of these are what stalls a deployment. The send is. It is the moment a mistake stops being an internal artefact and becomes a customer's experience, and it is why systems that demonstrate beautifully in a pilot sit switched off afterwards. Naming the inch is more productive than arguing about autonomy in general, because the inch is a specific, movable engineering decision.",
      },
      {
        h: "Give the agent the ninety-nine",
        p: "Everything up to the send is where the leverage is, and it is work agents do well against grounded records: summarising the thread, extracting what was actually promised, pulling the clause that governs it, drafting in the customer's own language, citing what the draft rests on. A grounded, cited draft with the risk already flagged is a different object from a blank reply box — which is the whole point, because it is what makes the last step small.",
      },
      {
        h: "Hold the one",
        p: "service1's resolution agent drafts, and the draft lands on the case marked as needing a send; a person sends it. Deflection answers only above a confidence floor, and below that floor the endpoint routes to a human with the reason on the record — the customer gets a person, not a cheaper guess. A refund, an account change and a case close are declared consequential, so the write stops for a named human at the data layer rather than only in the interface that happened to request it.",
      },
      {
        h: "The gate travels with the action, not with the intention",
        p: "In market1, publishing, scheduling a social post and sending a newsletter are declared consequential, so the runtime routes them to a person even when the agent never asked for approval. That distinction matters more than it sounds: a gate the agent has to request is a gate an agent can fail to request. Attaching the gate to the action means a new agent, or a new caller, inherits it without anybody remembering to wire it.",
      },
      {
        h: "Make the inch cheap, and say what is modelled",
        p: "If the human step is expensive, people route around it; if it is a one-tap confirm on a draft that is already grounded, cited and consent-checked, it holds. In sales1 the consent check happens at the send site rather than at planning time — a do-not-contact recipient is blocked outright and a cadence unenrols anyone who has replied. And the limit: the assistant's Slack, Teams and WhatsApp connectors are modelled sends in this build, recorded rather than dispatched, until channel credentials are configured. The gates live in the platform rather than the chat window, so going live changes the transport and not the governance.",
      },
    ],
  },

  {
    slug: "govern-the-write",
    title: "Two places to put the control: the tool call, and the write",
    tag: "Governance",
    accent: HUE.rose,
    date: "2026-08-08",
    audience: "Enterprise architects and heads of platform choosing where the enforcement point goes.",
    dek: "You can govern what an agent is allowed to invoke, or what is allowed to land in the record. They are different controls, and only one of them is shared by every caller.",
    abstract:
      "There are two natural places to put a control on an agentic system, and they are not substitutes. The first is the call: may this agent invoke this operation on this connector. That control is real and elan1 enforces it — a grant resolves against the operations a connector actually declares and asking for one it does not expose raises rather than quietly widening the grant; scope is checked at call time; a consequential operation is classified and gated; and a connector call is audited by its operation and its argument names rather than its argument values. The second is the write: may this change land in this system of record. The difference that matters is arity. An agent's tool call is one path into a record; a person in a screen is another, and a sibling application composing a cross-application workflow is a third. A control at the write is the one all three share. So elan1 puts a governed writer in front of each system of record, and identity, policy evaluation, the human approval gate and the audit append happen there, in that order, whoever is calling. A read is not on that path at all — which is a statement about approval and audit, not about access, and the difference is worth a section of its own. And the honest part: a guard walks the tree for mutating handlers that still reach a store directly, and freezes that count as a ceiling that may fall and may never rise.",
    body: [
      {
        h: "Two doors into the same record",
        p: "An agent reaching a system through a connector is one door. A person editing the record in a screen is another. A sibling application composing a cross-application workflow — a vertical opening a service case, a won deal raising a receivable — is a third. Any control you build sits in front of one or more of these doors, and the useful question about a governance claim is not how strong the control is but how many of the doors it stands in front of.",
      },
      {
        h: "The control at the call",
        p: "elan1 enforces the call boundary properly. A connector grant is drawn from the operations the connector actually declares, and requesting one it does not expose raises instead of silently widening the grant. Scope is re-checked at call time and a block is audited with its refusal text. Dangerous verbs are classified so a consequential operation is gated for every caller — and the classifier's own limits are written down in the code rather than implied away. Credentials are held as references and unsealed only at the tool boundary, after the scope check, under their own connector's identity. The audit entry for such a call carries the operation and the names of its arguments, not their contents.",
      },
      {
        h: "The control at the write",
        p: "In front of each system of record sits a governed writer, and it is the same writer whether the change originated with a person, an agent or another application. Identity is resolved, the policy engine evaluates, a consequential action stops and routes to a human approval, the write happens, an audit entry is appended. Deletes are soft, so the immutable trail keeps its linkage while hard erasure runs on the data-subject path against the record itself. One door, one place to reason about what is allowed.",
      },
      {
        h: "\"Reads are free\" is a claim about the spine, not about access",
        p: "A read is not routed through the governance spine — no policy evaluation, no human approval, no audited decision. That is what the writer's own docstring means by \"reads are free\", and it is easy to misread on a marketing page, so: it is a statement about the spine, not about access. Reads still pass identity and role, stay scoped to the tenant, and are gated where a vertical requires it. health1's snapshot and query paths withhold the body of a patient-linked clinical row when there is no active consent, returning the row's identifiers and a consent-withheld marker rather than its contents; the knowledge fabric redacts a chunk carrying personal data at serve time, before a grounding agent can cite it. That consent gate covers rows carrying a patient reference, which a patient's own demographic record does not, so it is not the thing withheld there. Consent refuses the clinical write — that is where the refusal is absolute. telco1's field-shape rule is likewise a write control: a subscriber-identifying field name is refused before it is stored, and rescanned at the cross-application seam. Neither is a read refusal, and neither is claimed as one.",
      },
      {
        h: "Why the write boundary is the one that composes",
        p: "This is where the choice stops being architectural taste. When an industry pack needs a service case, it opens one through service1's own governed writer and raises an error if service1's gate refuses — it does not write a case row itself. When it needs money moved, it composes finance1's payable and inherits finance1's approval. Each hand-off keeps the target's gate rather than the caller's, which is the only version of composition that does not quietly rebuild a bypass on the far side of a boundary.",
      },
      {
        h: "The part we are still paying off",
        p: "\"Every write is governed\" is a direction with a ratchet on it, not a fact. A guard walks the mutating request handlers in the tree and finds the ones that reach a store directly, without passing policy evaluation, the approval gate and the audit append; the measured count is frozen as a ceiling that may decrease and may never rise. Its denominator is derived from the filesystem rather than typed, so a handler added tomorrow is scanned the day it lands. Publishing the ceiling is less comfortable than publishing the claim, and it is the only version of the claim that can be checked.",
      },
    ],
  },

  {
    slug: "the-approval-that-executes",
    title: "An approval that executes, not an approval that is filed",
    tag: "Governance",
    accent: HUE.clayDeep,
    date: "2026-08-08",
    audience: "Risk, compliance and internal audit — anyone who has to test whether an approval did anything.",
    dek: "A sign-off recorded next to an action is a document. A token bound to that action, and to its exact payload, and spent on use, is a control.",
    abstract:
      "Most approval workflows are attestation. Somebody clicks approve, a row is written, and the action proceeds down a separate code path that never reads the row again. The failure is quiet: the approval and the action drift apart, and nothing in the record shows it. elan1 binds them. A consequential action stops before it acts and requests an approval carrying its own arguments as the payload. When the caller resumes with the approval id, the gate re-checks three things before letting anything through: the token is approved, it belongs to the same action, and a content hash over the resumed payload matches the hash over the payload that was approved. Then it consumes the token. Because all three are checked together and the token is spent, one approved for one operation cannot be used on another, one for one record cannot authorise a different record, and a replayed token is already spent. The id itself comes from the caller — that is the intended human-in-the-loop resume, and it is precisely why the gate cannot treat the id as the check. The earlier defect was a gate that asked only whether an approval was approved; it is closed, and closed identically in both gates rather than in one and documented in the other. Where a writer flags maker-checker, the requester cannot approve their own request and the administrator role does not bypass it, because it is a control rather than a permission.",
    body: [
      {
        h: "The attestation failure",
        p: "The common shape is an approvals table beside an execution path. Someone approves, a row lands, and the code that actually performs the action reads its own parameters and proceeds. Nothing forces the two to describe the same thing. The approval says a payment of one amount to one beneficiary; the execution can carry another, and the record will show an approval and an action that merely happened nearby. Reviewers cannot detect this from the artefacts, which is what makes it worth engineering away rather than proceduralising around.",
      },
      {
        h: "Binding the token to the payload",
        p: "The gate computes a content hash over the action's arguments and stores it with the approval request. On resume it checks three conditions together — approved, same action, matching payload hash — and only then consumes the token. Each condition closes a specific hole: an approval granted for one action authorising another, an approval for one record authorising a different one, and a token being spent twice because nothing marked it used. Consumption is a status change on the durable store, so a consumed token reads as not-approved wherever the gate looks.",
      },
      {
        h: "The id comes from the caller, so the id is not the check",
        p: "A human-in-the-loop resume works the only way it can: the caller comes back holding the approval id it was given. That is the design, not a hole — and it is exactly the reason the gate has to test system state rather than the caller's assertion. An earlier version of one gate asked a single question, whether the token was approved, which is a question the caller's own input can answer. The three conditions now run identically in both gates, and the sameness is the fix: one of them being stricter than the other is how the weaker one survives a review.",
      },
      {
        h: "Maker is not checker",
        p: "On an approval tagged for maker-checker, the principal who requested it cannot approve it, and the refusal names both the principal and the approval rather than failing generically. The administrator role does not bypass this, because segregation of duties is a control and not a permission — a role that can override it has removed it. Untagged approvals are unaffected, so single-principal flows still resolve and the control does not become something teams route around.",
      },
      {
        h: "The approval is the transaction",
        p: "Approving is not a record of a decision taken elsewhere; it is what executes. Releasing a confirmed sales order drives a supply1 shipment and a finance1 receivable as a single compensating move on the approval — and if invoicing fails after the shipment exists, the shipment is voided and the order reverts to confirmed rather than leaving a half-landed saga. The same gate reads the wire-level idempotency key, so a client re-posting after a timeout gets the stored result rather than a second execution.",
      },
    ],
  },

  {
    slug: "a-refusal-is-evidence",
    title: "A refusal string is better evidence than a policy document",
    tag: "Evidence",
    accent: HUE.cyan,
    date: "2026-08-08",
    audience: "Auditors, risk officers and buyers who have been shown a control matrix and would like to see the control.",
    dek: "A policy says what should happen. A refusal is what happened — with the reason, the record and the timestamp attached.",
    abstract:
      "A written policy has no failure mode. It is equally true on the day it is enforced and the day the enforcement is removed, and it reads the same either way. That is not a criticism of writing policies; it is a statement about what they can be evidence of. A refusal has none of that slack. It exists because a live path declined a specific write, it names the reason in the language of the business rather than the schema, and it lands in the audit beside the record it protected. So elan1 writes its guards so that the refusal is the deliverable. A sale price above a product's maximum retail price is not persisted: the governed writer returns blocked with the reason, appends a refused event to the hash-chained log, and writes no record — on the same path whether the write arrived from a person, an agent or another application. An unbalanced journal is refused with its own debit and credit totals in the message. A discount with no list price behind it is refused as ungrounded rather than applied to a guess. A standing payment mandate is drafted for approval rather than executed. And a refusal is deliberately distinguishable from a failure: a governance denial returns the status that is true, because a control working must not look identical to a system breaking. The test to apply to any vendor, including this one: ask to see the refusal, not the policy.",
    body: [
      {
        h: "A policy has no failure mode",
        p: "A control matrix is a set of sentences that were true when somebody wrote them. Nothing in the document changes when the code behind a row is refactored, disabled or never written, which is why control matrices survive so cheerfully across releases. This is not an argument against writing them — regulators require them and they organise the work. It is an argument about what they prove on their own, which is that the organisation knows what it intended.",
      },
      {
        h: "What a refusal proves that a document cannot",
        p: "A refusal is a fact with a timestamp. It says that at this moment, on this record, in this tenant, a specific write was declined for a stated reason, and here is the audit entry. It cannot be produced by a system that does not have the control, and it cannot survive the control's removal — delete the guard and the demonstration stops working, immediately and visibly. That fragility is precisely its value as evidence.",
      },
      {
        h: "Refusals speak business, not schema",
        p: "The refusals worth showing are the ones a non-engineer can assess: a release that exceeds the remaining commitment, an order total that does not tie to its quote, a credit note above the invoice's remaining value, a duplicate vendor invoice number, a bill approved without a three-way match, a payment on a lapsed policy, a certificate that cannot be issued because a required result is missing. Each of those is a sentence a controller can agree or disagree with, which is what makes a demonstration into a conversation rather than a screenshot.",
      },
      {
        h: "A refusal is not a crash",
        p: "This is easy to get wrong and expensive when you do. If a governance denial is returned as a server error, then in every log, every alert and every reliability review the control working looks identical to the system breaking — and the pressure to make the errors go away eventually finds the control. Here a denial returns the status that is true, carries its reason, writes no record, and appends its own refused event to the trail.",
      },
      {
        h: "How to test the claim",
        p: "Ask for the refusal rather than the policy, and ask for the audit row beside it. Then ask the harder question, which is per-rail: for each control, does this block a write or only inform a person? Both are legitimate and they survive an audit very differently, so the answer should be published either way. Where our own answer is \"informs\", it is labelled as declared rather than enforced, and there is a list of those.",
      },
    ],
  },

  {
    slug: "staged-enablement",
    title: "Staged enablement is a control, not an unfinished rollout",
    tag: "Operations",
    accent: HUE.blue,
    date: "2026-08-08",
    audience: "Operating and platform owners who own the rollout, and the risk function that has to sign it.",
    dek: `${factValue("agentsRegistered")} agents are registered across the platform and ${factValue("agentsEnabled")} are enabled in the current wave. The gap is the mechanism working, not the product arriving late.`,
    abstract:
      "Registered, enabled and running are three different words, and a catalogue number that blurs them is doing a reader a disservice. Registered means the platform knows the function exists and what it declares. Enabled means an operator has switched it on for a specific tenant. Running means it was invoked and the gate let it through. elan1 publishes both of the first two rather than the larger one alone, because the difference is the control. The runtime checks enablement before a run acts, and a function outside the tenant's set is refused by name — the refusal carries the application, the function and the tenant, so an operator sees a configuration gap rather than a silent nothing. A separate suspend switch overrides the entire enabled set for an application and identifies itself as an incident kill-switch in its own refusal text, so a deliberate stop is never read as a config gap. What it stops is the agent fleet: it does not reach that application's direct writes to its own system of record, and this piece says why in the present tense rather than describing a fix that has not shipped. A reconciliation reports both directions: functions registered but not enabled here, and functions enabled here that are no longer registered. When the registry has not loaded, coverage reports as not measurable rather than as zero per cent. What this buys is a rollout reversible one function at a time.",
    body: [
      {
        h: "Three different words",
        p: `Registered: the platform holds the function's declaration — its tier, its tools, its gates. Enabled: an operator has turned it on for one tenant. Running: it was invoked and the gate allowed it. A single headline number usually means the first, which is the least interesting of the three. We publish ${factValue("agentsRegistered")} registered and ${factValue("agentsEnabled")} enabled in the current wave, because the second number is the one that describes what could actually happen in a tenant today.`,
      },
      {
        h: "The refusal names all three coordinates",
        p: "When a run reaches a function that is not enabled, it is refused before it acts, and the refusal names the application, the function and the tenant. That specificity is the difference between an operator diagnosing a rollout state in seconds and an engineer reading logs. It also means the wave plan is enforced rather than remembered: \"not this wave\" is a refused run, and adding a function to a wave is a deliberate, auditable act rather than the absence of an obstacle.",
      },
      {
        h: "The kill-switch stops the fleet — and here is what it does not stop",
        p: "Suspending an application overrides its whole enabled set immediately, and the refusal text identifies itself as an incident kill-switch so a deliberate stop does not read as a configuration gap to whoever is on the incident call at two in the morning. What it stops is the agent fleet. It does not stop that application's direct writes to its own system of record. The generic policy that would refuse those is written, and a test demonstrates it — suspend the application, attempt the write, watch the refusal name it — but the shipping composition root registers that policy without the rollout reference its clause reads, so outside that test the clause cannot fire. No write path has ever consulted the switch. That sentence is in the present tense on purpose: writing it as a fixed defect would make it more persuasive and less true, which is the trade this library exists to refuse.",
      },
      {
        h: "Reconciliation runs in both directions",
        p: "One direction is obvious: which registered functions are not enabled here. The other matters more and is usually missing: which functions are enabled here but no longer registered — an enablement holding a door open to something that does not exist. Both are reported. And where the registry itself did not load, coverage is reported as not measurable rather than as zero per cent, because a manufactured alarm from an absent input costs an operator the same night as a real one.",
      },
      {
        h: "Why the enabled number is smaller on purpose",
        p: "The baseline wave is deliberately advisory: read, research, draft and analyse functions across the applications, with money, sending and publishing staying human-gated regardless of what any agent proposes. Widening is the same gated move as the first enablement, which is also what makes it reversible one function at a time. A rollout you can only advance is not a rollout plan; it is a launch.",
      },
    ],
  },

  {
    slug: "governance-is-the-moat",
    title: "Governance is the deployment path, not the brake",
    tag: "Governance",
    accent: HUE.rose,
    date: "2026-05-26",
    audience: "Boards, risk committees and the executive sponsor who has to defend the deployment.",
    dek: "Agents rarely stall because they cannot do the work. They stall because nobody can show what happens when they get it wrong.",
    abstract:
      "The blocking question in an agent programme is almost never capability. It is evidence: what does a reviewer get to look at when they ask what happens if this is wrong. Governance is the machinery that turns an intention into something testable, and four mechanisms carry it here. A consequential action routes to a named human, and the approval token is bound to that action and to a content hash of its exact payload, then consumed on use. A Trust Mark is refused on an eval run that scored zero cases, one that did not pass, and one belonging to another tenant, and a re-verification sweep revokes marks that have drifted from what they certified. The audit is hash-chained per tenant, with updates and deletes blocked by a database trigger rather than by convention, and a unique constraint that prevents the chain forking. Enablement is staged per tenant, so scope is a set an operator holds rather than a promise in a document. Then the part that makes the rest credible: read the depth honestly. The default agent certification is a structural declaration check, and the behaviour battery that probes what a model actually says covers a named handful of agents rather than the whole roster. A mechanism described without its boundary is not evidence either — it is a better-written claim.",
    body: [
      {
        h: "The blocker is evidence, not capability",
        p: "Pilots stall at the review, not at the demo. The question that stops them is some version of \"and when it is wrong?\", and the honest answers a team can usually give — we watch it, we have a policy, we will roll back — are all about intention. Governance is what converts intention into artefacts: a named approver, a refusal with a reason, an audit row, an eval run with a case count. None of those are friction added to the work; they are the things that make the work reviewable at all.",
      },
      {
        h: "Four things a reviewer can test",
        p: "One: a consequential action routes to a named human and the approval is bound to the payload it approved, then spent. Two: a Trust Mark can be refused — on zero cases, on a failing run, on another tenant's evidence — and revoked when its subject changes. Three: the audit chain can be recomputed, and updates and deletes are blocked at the database rather than by the API remembering not to offer them. Four: enablement is a per-tenant set, and a suspend switch stops a suspended application's agent fleet, with the reach of that switch published rather than implied. Each is a demonstration rather than a paragraph.",
      },
      {
        h: "Which controls block a write, and which only inform a person",
        p: "This is the distinction a regulated buyer actually needs, because the two survive an audit very differently, and blurring them is what makes a vendor's claims come apart under questioning. So the answer is published per control, in three states: enforced, meaning code on the live path applies it and something breaks if you remove it; declared, meaning the rule is implemented and exercised but no production path consults it yet; and built-not-wired, meaning what is missing is a mount, an adapter or a credential rather than new engineering.",
      },
      {
        h: "A certification that names its own coverage",
        p: "Trust Marks are eval-gated and auto-revoked on drift, and the tier is published alongside the mark. The default agent certification is a structural declaration check: the agent declares its tier, its tools and its gates, and the check tests that declaration. A behaviour battery that probes what the model actually produces covers a named handful of agents. A vertical's safety dimension additionally has to survive an adversarial battery. Reading the tier rather than the badge is the entire skill.",
      },
      {
        h: "What governance is not",
        p: "It is not a claim about speed. This page used to end by asserting that the governed path reaches production faster, and that sentence was deleted rather than softened: nothing here has been measured in a customer environment, so it was an outcome claim wearing a mechanism's clothes. What governance is, mechanically, is the difference between a system whose behaviour you can characterise and one you can only hope about. Whether that is faster in your organisation is your measurement to make, not ours to assert.",
      },
    ],
  },

  {
    slug: "what-a-trust-mark-proves",
    title: "What a Trust Mark proves, and what it does not",
    tag: "Assurance",
    accent: HUE.green,
    date: "2026-08-08",
    audience: "Compliance leads and security reviewers assessing an assurance claim they will have to stand behind.",
    dek: "A badge that cannot be refused is decoration. This one is refused on an empty eval run, bound to a content hash, and revoked when the thing it certified changes.",
    abstract:
      "assure1 ships no package of its own — its code is the certification kernel inside the core. That is a deliberate placement: certification that sits beside the runtime as a separate service is certification a caller can forget to consult. Three refusals define the mark. An eval run that scored zero cases cannot mint one, because nothing was measured and an empty battery passing is the oldest bug in assurance. A run that did not pass cannot mint one. A run belonging to another tenant cannot mint one, which closes borrowed evidence at the source. The mark is then bound to a content hash of the definition it certifies, so editing the agent revokes the mark rather than letting it outlive its subject, and a scheduled sweep re-verifies certified skills, connectors and agents against their hashes, revoking anything that drifted and counting a check that raised as errored rather than aborting the sweep. Now the part usually left out: what a mark proves varies, and the platform publishes which. The assurance tier is reported as structural, behavioural or adversarial. The default agent certification is structural — the agent declares its tier, tools and gates, and the check tests the declaration. A behaviour battery that probes what the model actually says covers a named handful of agents. A vertical's safety dimension must additionally survive an adversarial battery measuring block rate and false-positive rate together. Read the tier, not the badge.",
    body: [
      {
        h: "Three ways to refuse a mark",
        p: "Zero cases: nothing was scored, so there is nothing to certify — and a battery that ran nothing returning no failures is the specific bug this closes. Not passing: the run happened and did not clear. Another tenant's run: evidence from elsewhere is not evidence here, and the borrowed-reproduction failure is closed at the gate rather than left to reviewer diligence. A badge that has no way to be refused carries no information, and these three are the ways this one can be.",
      },
      {
        h: "Bound to a hash, so it cannot outlive its subject",
        p: "The mark is bound to a content hash of the definition it certified. Change the agent and the mark does not quietly continue to describe the previous version — that is the difference between a certificate and a sticker. A scheduled sweep re-verifies certified skills, connectors and agents against their hashes and revokes what has drifted, returning one consolidated report; a check that raises is counted as errored rather than allowed to abort the sweep, so one broken subject does not hide the rest.",
      },
      {
        h: "The tier is the claim",
        p: "Structural: the agent's declaration is checked — its tier, its declared tools, its declared gates. Behavioural: a battery runs the agent and scores what it actually produced. Adversarial: paraphrase, synonym and obfuscation attacks are run through the live classifiers, and a dimension passes only if it blocks the attacks and lets legitimate inputs through — block rate and false-positive rate together, because a classifier that refuses everything scores perfectly on the first and is useless. The tier is published with the mark, so a badge says what it proves.",
      },
      {
        h: "Where the default sits, honestly",
        p: "The default agent certification is the structural check. That is a real control — it is how a declared advisory agent holding a control-system connector is caught — and it is not a claim about what the model says at runtime. A behaviour battery currently covers a named handful of agents rather than the whole roster. Anyone reading a roster of marks should assume structural unless the tier says otherwise, which is exactly why the tier is on the surface.",
      },
      {
        h: "Why the kernel lives in the core",
        p: "assure1 is a service line and a set of surfaces, and it ships no package of its own: the code is the certification kernel in the platform core. The reason is arity again. If certification is a service the runtime calls, it is a call somebody can omit; if it is the kernel the runtime is built on, the gate is in the path. The same reasoning puts the approval gate and the audit append inside the governed writer rather than beside it.",
      },
    ],
  },

  {
    slug: "the-third-state",
    title: "The third state: what a system says when it did not look",
    tag: "Assurance",
    accent: HUE.violet,
    date: "2026-08-08",
    audience: "Anyone who reads a green dashboard and has to decide what it is evidence of.",
    dek: "Passed and failed are not enough. Without a third state, “we did not measure this” renders as “we measured it and it was fine”.",
    abstract:
      "A two-valued verdict has a structural bug, and it is not a rare one: absence collapses into the good answer. A check that ran zero cases reports no failures. A boolean over an empty set is true. An application with no eval suite has never failed one. Every one of those renders green, and every one of them means nothing was examined. elan1 carries a third verdict — passed, failed, not measurable — and treats it as a refusal at a gate rather than as a skip to step over. An application with no eval suite reports not measurable. A suite that exists but has never run in this environment reports not measurable. A mistyped application id reports not measurable rather than clearing the gate, which it previously did — a test in the suite now asserts exactly that. The promotion gate names every blocking application, so an operator sees which one needs a suite instead of meeting a silent wall. The discipline has to reach the surfaces, too, or it is only a type: a safety evaluation whose output carries no prose is reported as not measurable rather than passed; a cross-application boundary scan that came back empty or partly unreadable is scored not measurable rather than clean; a resilience panel with no drill on record shows its fields null with the reason attached rather than showing zeros. This was paid for. A gate once returned a pass for an application that had no eval suite at all, and the comment beside it called that honest.",
    body: [
      {
        h: "Absence is not a result",
        p: "The bug is in the type, not in anyone's diligence. If a verdict can only be passed or failed, then a check that examined nothing must return one of them, and it will return the one that looks like success — no findings, no failures, nothing wrong. A reviewer sees green and reasonably concludes that something was inspected. The fix is not a more careful engineer; it is a third value that has somewhere to put \"we did not look\".",
      },
      {
        h: "Where the two-valued bug hides",
        p: "It has recognisable shapes. A count compared to zero, which is also what an empty scan returns. A universal quantifier over an empty collection, which is true by definition. A verdict derived from a missing key, where a flawless input and a malformed one produce the same answer. A coverage percentage over an empty registry, which reads as nought per cent enabled when the truth is that the registry did not load. Each looks like a check and behaves like a constant.",
      },
      {
        h: "Not measurable is a refusal, not a skip",
        p: "At a gate, the third state has to block. Treating it as a skip re-creates exactly the failure it was introduced to fix — a thing that was never measured proceeding because nothing objected. So a promotion is refused for an application with no suite, or a suite that never ran here, and the refusal names every blocking application by name so an operator can act on it. A mistyped application id lands in the same bucket rather than sliding through as an unknown that nobody defined a rule for, and that behaviour is asserted by a test rather than described in a comment.",
      },
      {
        h: "It has to reach the surfaces",
        p: "A third state in the type and a two-state badge on the screen is the same bug one layer up. So: a safety evaluation whose output carries no prose to score is reported as not measurable rather than passed. A boundary scan that came back empty or partly unreadable is scored not measurable rather than clean. A disaster-recovery panel with no drill on record shows null fields with the reason attached rather than zeros. The trust evidence pack marks an unmeasured source as unmeasured and returns no verdict for it, rather than a green tick.",
      },
      {
        h: "How to test this on any dashboard",
        p: "Take away the input and see what the tile says. Point a check at an empty collection, a missing source, a tenant with no data. If the answer is a confident pass, a zero, or a clean bill, you have found a two-valued verdict, and everything else that surface tells you inherits that ambiguity. It is a five-minute test and it is the single most productive question to ask of an assurance screen — ours included.",
      },
    ],
  },

  {
    slug: "erasure-and-the-immutable-log",
    title: "An immutable log and a right to erasure are not in conflict",
    tag: "Evidence",
    accent: HUE.cyan,
    date: "2026-08-08",
    audience: "Data protection officers, privacy counsel, and the engineers who have to satisfy both obligations at once.",
    dek: "They stop fighting when they act on different layers: erasure works on the record, the chain is never rewritten, and minimisation is a discipline at named boundaries rather than a property of every event.",
    abstract:
      "Two obligations that look contradictory: an audit trail that cannot be edited, and a data principal who can require erasure. They are reconciled by layer, not by wishful thinking. A data-subject erasure anonymises the personal fields on the business record, keeps the record shell and its id so referential integrity and audit linkage survive, marks the record erased, and appends its own erasure event. The hash-chained audit is deliberately retention-exempt and is never rewritten, so the chain still verifies. Alongside that, some paths are built to log a shape rather than a value: a CRM write records the field keys it touched and not their contents, and a connector call records the operation and its argument names. That is a discipline applied at specific boundaries, and it is not a property of every event on the trail — other governed actions do record business values, because the trail is also supposed to show what happened. A governed message send, for instance, records its recipient and subject line so the record shows what went out. So what reconciles the two rights is erasure at the record plus a trail that is minimised where it has been built to be, not an audit that is empty of content by construction. Immutability itself is enforced at the database rather than in the API: a trigger raises on update and delete including for the table owner, and a unique constraint on the tenant and the previous hash means the chain cannot fork.",
    body: [
      {
        h: "The conflict is an artefact of confusing two layers",
        p: "If you treat the audit log as a second copy of the business record, then erasing a person means editing the log, and an editable log is not evidence. Teams usually resolve this by weakening one of the two promises — a log with a delete path, or an erasure that quietly excludes the audit. Both are visible to a reviewer who asks one follow-up question. The resolution is to be clear about which layer each obligation acts on: erasure is a change to the record, and the trail records that change without being the record.",
      },
      {
        h: "Where minimisation applies, and where it does not",
        p: "Some boundaries are built to log a shape rather than a value. A CRM write records which field keys changed and not what they were changed to. A connector call is audited as its operation and the names of its arguments. Those are real controls at named places, and they are the honest extent of the claim: the trail is not key-only by construction, and other governed actions do put business values on it — a governed send, for example, records the recipient and the subject so the record shows what was actually sent. Anyone assessing this should ask which events on their own workload carry values, rather than accept a general assurance that none do.",
      },
      {
        h: "Erasure on the record, an event on the trail",
        p: "A data-subject erasure anonymises the personal fields, keeps the record shell and its id so referential integrity and audit linkage survive, marks the record erased, and appends an erasure event. The declared per-type field list is the floor an operator can see as a menu; above it a matcher works on the record's own shape, so a record on a type nobody declared is still erasable, while ambiguous names are admitted only on a data-principal shape — which is why a product name is not erased by accident.",
      },
      {
        h: "Append-only at the database, not in the API",
        p: "A trigger raises on update and delete against the audit table, and it applies to the table owner as well, so deletion is not a permission anyone can be granted. A unique constraint on the tenant and the previous hash means only one event may chain off a given predecessor: a concurrent writer that would have forked the chain gets a surfaced error instead of silently corrupting the record. Verification recomputes the chain and reports tampering rather than asserting integrity. That is also why the trail is retention-exempt — and why what is written onto it has to be a deliberate decision rather than a default.",
      },
      {
        h: "When you cannot repair, declare",
        p: "A defect once produced events chained off the wrong predecessor. The rows could not be fixed — that is what append-only means, and the alternative would have been to prove the trigger was not real. So the damage is declared: a signed, append-only marker naming the tenant, the first affected event, and a frozen digest over the exact observed break set. A break inside the declared window reads as declared; anything else still fails hard. Add damage, remove damage, or hide a real tamper inside the window, and the digest stops matching.",
      },
    ],
  },

  {
    slug: "one-core-many-apps",
    title: "One core, many apps: why an industry is configuration, not a fork",
    tag: "Architecture",
    accent: HUE.blue,
    date: "2026-06-09",
    audience: "CIOs and enterprise architects weighing a suite against a stack of point tools.",
    dek: `${factValue("suiteApps")} applications and ${factValue("verticalPacks")} industry packs run on one core. A pack adds records, refusals and a governance signature — it does not fork an application.`,
    abstract:
      "The integration tax is usually described as plumbing, but the expensive part is governance. Each additional tool arrives with its own identity model, its own idea of what an approval is, and its own audit, so any control that spans them has to be re-proved at every boundary — and the proof is the part that does not survive a release. elan1 puts identity, policy, approvals, audit, telemetry, the skills registry and the connector fabric in one core and builds thin applications on it. An industry is then a configuration pack: industry records, skills, connector configuration, a governance signature and prebuilt workflows, rather than a branch of an application's source. What makes that credible instead of a slogan is the composition rule. A pack that needs a service case opens one through service1's own governed writer and raises an error if service1's gate refuses; a pack that needs money composes finance1's payable and inherits finance1's approval. Each hand-off keeps the target's gate rather than the caller's. Cross-application workflows are compensating rather than optimistic: if invoicing fails after a shipment exists, the shipment is voided and the order reverts. And a pack adds only what no horizontal application owns — the entitlement record, whether coverage is still in force, the lot genealogy that answers a recall — while deliberately not rebuilding case resolution, receivables ageing or customer satisfaction scoring.",
    body: [
      {
        h: "The tax is governance, not plumbing",
        p: "Connectors are the visible cost of a best-of-breed stack and the cheap one. The expensive part is that each tool has its own identity model, its own notion of an approval, its own audit format and its own retention behaviour — so an end-to-end control has to be argued at every boundary, and the argument is re-done every time any of the tools ships a release. That is the compounding cost, and it is invisible in a feature comparison.",
      },
      {
        h: "Thin applications, one core",
        p: `The core holds the things every application inherits: identity and access, the agent runtime, the skills registry, the connector fabric, the human approval gate, the hash-chained audit, the governance and Trust Mark engine, and telemetry with per-tenant cost metering. An application adds its records, its agents and its screens — ${factValue("systemsOfRecord")} systems of record across the suite, each with a governed writer in front of it. Missing primitive goes into the core, never into the application.`,
      },
      {
        h: "A vertical is a pack, and a pack composes",
        p: `${factValue("verticalPacks")} industry packs run as configuration: industry records and skills, connector configuration, prebuilt workflows, and a governance signature that becomes policy rather than a document. The pack does not fork an application, which is what keeps one trust story instead of one per industry — and it is also what makes a fix in a shared application reach every industry that composes it, rather than reaching one branch and waiting.`,
      },
      {
        h: "The hand-off keeps the target's gate",
        p: `A cross-application move goes through the target's own governed writer. A grievance opens a real service case and the composing application raises an error rather than writing a case row itself when service1's gate refuses. A disbursement posts as a payable and inherits finance1's approval. There are ${factValue("crossAppSagas")} such workflows, and each step keeps its own gate rather than inheriting the caller's — otherwise composition becomes a way to launder an action past a control it would not have passed directly.`,
      },
      {
        h: "What a pack adds, and what it refuses to rebuild",
        p: "A pack earns its place by holding the record none of the horizontal applications owns: the public entitlement, whether an insurance policy is still in force, the lot genealogy behind a recall, the KYC state behind an account. What it does not do is rebuild case resolution, satisfaction scoring, receivables ageing or dunning — those already exist in the applications it composes. A vertical that rebuilds them is a fork wearing a pack's name.",
      },
    ],
  },

  {
    slug: "what-a-modelled-connector-is",
    title: "Modelled, declared, live: why we label every connector",
    tag: "Architecture",
    accent: HUE.gold,
    date: "2026-08-08",
    audience: "Integration architects and procurement teams scoping what is actually wired versus what is ready to be.",
    dek: `${factValue("connectors")} connectors are registered and callable. Several of them are not connected to anything yet, and the catalogue says which.`,
    abstract:
      "A connector can be in three quite different states, and a logo grid renders all three identically. Registered and callable means the runtime can invoke it: the call passes a scope check, a policy evaluation if the operation is consequential, and an audit entry. Modelled means that call reaches a deterministic adapter with the real interface and no external system behind it — several connectors read a base-URL setting and fall back to a modelled adapter when it is unset, the assistant's channel connectors are modelled sends in this build, and the web reference connector is a deterministic mock. Declared means a typed seam exists and nothing runs until credentials and an audited grant are in place. We label the state on each entry because the governance is identical across all three and the connection is not — and because the state is precisely what a project plan needs. A modelled adapter is not a mock in the dismissive sense: the interface, the scopes, the refusals, the least-privilege grant and the audit are all real, and the data is synthetic. Making one live is a wiring step — an endpoint, a credential, an adapter — rather than new engineering, which means it belongs in a scope document you can hold us to, not on a slide as a switch. The honest corollary: treat an unwired capability as scope to agree, not as a feature to enable.",
    body: [
      {
        h: "Three states, one logo grid",
        p: "Registered and callable: the runtime can invoke it and the call is scoped, gated and audited. Modelled: it is callable and the thing on the other end is a deterministic adapter rather than your system. Declared: a typed seam exists, and credentials plus an audited grant are the precondition for anything happening at all. A grid of logos communicates none of this, which is why the grid is the wrong artefact for an architecture conversation.",
      },
      {
        h: "What a modelled adapter actually is",
        p: "It is the real interface with synthetic data behind it. The operations are the ones the connector declares, the scope lattice refuses an operation the connector does not expose, a consequential operation still gates, the credential reference still resolves only at the tool boundary, and the call still lands in the audit as an operation and argument names. What is missing is the endpoint. That is a meaningful thing to have built — it is how the governance is verifiable offline — and it is not a connection.",
      },
      {
        h: "Why the label is the useful part",
        p: "Because the label is what a plan is made of. Several connectors read a base-URL setting and use a live endpoint when one is configured, falling back to a modelled adapter when it is not; the assistant's channel connectors are modelled sends in this build, recorded rather than dispatched; the web connector is a deterministic reference mock. Each of those is a line in a statement of work with a different owner and a different duration, and flattening them into \"integrated\" is how integration schedules go wrong.",
      },
      {
        h: "The grant is on the operation, not the system",
        p: "A connector grant is drawn from the operations the connector actually declares, and requesting one it does not expose raises rather than quietly widening the grant. A grant is a human approval, and revoking or disconnecting takes effect immediately. This is what keeps a connector from becoming a second, ungoverned way into a record that the governed writer is guarding on the other side — the failure mode that makes an integration layer worse than no integration layer.",
      },
      {
        h: "Certification is a reading, not a property of the build",
        p: `Per connector, ask which state it is in and what specifically "live" means for it — an endpoint, a credential, a native adapter, a certification. Then ask what is certified, and read the answer carefully. On 23 July 2026 the platform's own build log records a live read of the connector spine panel: ${factValue("connectors")} registered connectors, zero certified, on that deployment. That is a dated reading of runtime state rather than a property of a build — the certified set is re-read from a durable governed store on every access, so an operator certifying through the catalogue, or a partner listing passing marketplace certification, moves it with no change to the code. Certification is earned per connector and has to name what authorised it; it does not ship pre-granted. We publish that observation with its date and its source and never as a standing platform count, which is why no certified-connector figure appears in the site's platform-count module. Nothing in the site build re-checks the line — it is reviewed by hand.`,
      },
    ],
  },

  {
    slug: "computed-at-read",
    title: "A number computed at read cannot drift from the book it summarises",
    tag: "Data",
    accent: HUE.green,
    date: "2026-08-08",
    audience: "Finance and analytics leaders, and anyone who has watched a dashboard and a system of record disagree.",
    dek: "A stored counter is a claim about the past that nothing re-checks. A computed figure is an argument you can re-run in front of the person who doubts it.",
    abstract: `Stored aggregates drift for a boring reason: they are written once, by a path that can fail, and never re-derived. Two failure shapes recur. The first is slow divergence — a support figure that gradually stops matching the case book it claims to summarise, and disagrees quietly for months because nothing compares them. The second is faster and worse: a metric that reads a field nothing populates returns a confident zero, and a structural zero wearing a metric's name is indistinguishable on a dashboard from good news. elan1's answer is to compute at read and store almost nothing. insight1 holds analytics objects rather than a sibling's business records, and its values are computed from the ${factValue("insightSourceApps")} sibling source stores its semantic layer names, at the moment you run them. That set is a named list rather than "every application": goal1 is not in it, and all but one of the rest are among the platform's registered systems of record — the exception is customer1's CRM, which runs on its own core store. insight1 also holds no write access to another application's system of record; where a finding needs an action it proposes into the owning application's own queue. Per-agent service scorecards are derived by joining a survey to the case's assignee rather than stored on the agent. A win rate, an average deal age and an open-stage distribution are computed from the opportunity book at read. The discipline has a second half that matters as much: a computed figure must disclose the sample it rests on. A number computed from nothing is still a number, and it will be believed.`,
    body: [
      {
        h: "Two ways a stored number goes wrong",
        p: "The first is divergence. A counter is incremented on one path, that path changes or fails, and the counter and the underlying records part company — quietly, because nothing recomputes one from the other. The second is that a stored figure has no provenance at read time: it cannot tell you what it counted, when, or over which population, so a disagreement about the number becomes a disagreement about whose export is right.",
      },
      {
        h: "The structural zero",
        p: "The sharper failure is a metric that reads a field nothing writes. The arithmetic is correct, the pipeline is green, the tile shows nought, and nought is exactly what you would want that particular ratio to be. A number from a field nobody populates is a zero wearing a metric's name, and it survives review precisely because it looks like the good outcome. The only reliable defence is to derive the figure from records that exist for another reason.",
      },
      {
        h: "Compute at read, store the question",
        p: `insight1 holds analytics objects — metrics, dashboards, reports, questions, alerts and digests — rather than a copy of anybody else's business records. The values are computed on every run from the ${factValue("insightSourceApps")} sibling source stores named in its semantic layer, and the count in that sentence is imported from this site's platform-count module rather than typed here, which is the discipline the next piece is about. The set is named rather than rounded to "every application" — goal1 is not among them — and the unit is worth stating too: all but one of those stores are registered systems of record, the exception being customer1's CRM on its own core store. Elsewhere the same rule: service scorecards derived by joining a survey to the case's assignee, win rate and deal age computed from the opportunity book, a lead score computed live with the matched criteria returned beside it.`,
      },
      {
        h: "Disclose the sample, or the number is not evidence",
        p: "A computed figure inherits the two-valued bug unless it says what it rested on. So a support statistic discloses its sample, and a published insight has to be grounded by construction: it must cite its evidence and name a metric that actually exists in the semantic layer, and one that cannot is flagged for review rather than published as it stands. That refusal is more useful than the number would have been — it tells you the pipeline is empty, which is a fact about your operation, where a nought would have told you something false about your performance.",
      },
      {
        h: "What this costs",
        p: "Computing at read has a cost, and it is not free at every scale — which is why this page carries no latency or throughput figures. We will not publish a performance number we cannot reproduce on your shape of data and your deployment. Ask us to run the load profile you actually care about and read the result rather than our summary of it. That is a real limit, stated here rather than discovered later.",
      },
    ],
  },

  {
    slug: "derived-not-typed",
    title: "A number you type is true once. A number you derive stays true.",
    tag: "Data",
    accent: HUE.violet,
    date: "2026-08-08",
    audience: "Engineering and marketing leaders responsible for a claim that has to survive the next release.",
    dek: "A hand-typed roster is complete the day you write it and silently wrong the day something is added. The fix is structural, not more diligence.",
    abstract:
      "The most reliable way to ship a false statement is to type a true one and wait. This site has done it: a hand-typed figure on the page whose entire job was to establish credibility understated the product — in both directions at once, on different lines — for as long as nobody re-counted. Diligence does not fix that, because the statement was diligent when it was written. The remedy is structural. This site keeps one module of platform counts, each carrying its derivation — how it was counted — and the date it was counted; a page imports the number rather than typing it, and a count with no derivation does not belong in the file. Where three derivations of one count produced three different answers, the count was removed rather than published, and the pages quote refusals verbatim instead, on the reasoning that a quoted refusal proves more than a count of them. A figure that only a deployment can settle — how many connectors are certified right now — is not made into a fact either; it is published as a dated, attributed reading. The same rule runs inside the platform's guards: a denominator is derived from the tree rather than typed. And there is a trap on the other side worth naming, because it is subtler: a check derived from the very collection it describes cannot fail. A flag computed by asking whether an item appears in the list currently being iterated is a restatement wearing a check's name, and it is green forever.",
    body: [
      {
        h: "The failure is a schedule, not a mistake",
        p: "Someone counts carefully, writes the number down, and it is correct. Then the product changes. Nothing about the sentence changes, nothing flags it, and the moment of falsity has no event attached to it — which is why nobody catches it and why blame is the wrong frame. A typed number is a claim with an expiry date that is not printed on it. Treat every hand-typed figure in a codebase or a website as a scheduled defect.",
      },
      {
        h: "Every published number carries its derivation",
        p: "One module holds the platform counts this site is allowed to quote, and each entry carries how it was derived — a live import, a directory listing, a registry length — and the date it was counted, so a reader can re-run it rather than trust it. A page imports the value and never re-types it. The rule that does the most work is the smallest: a count with no derivation does not go in the file, which quietly removes the numbers nobody could reproduce.",
      },
      {
        h: "When the derivations disagree, publish nothing",
        p: "One count had three defensible derivations producing three different answers, which meant it had no agreed definition and therefore no business on a public page. It was deleted rather than averaged or footnoted, and the pages quote refusals verbatim instead. That trade is worth internalising: a specific artefact a reader can evaluate beats an aggregate they have to accept, and the aggregate was the part that could go quietly wrong.",
      },
      {
        h: "A reading is not a fact — say which one you have",
        p: "Some figures cannot be derived at all, because they are per-deployment state rather than properties of the product: how many connectors are certified in a given environment is re-read from a durable store on every access, and an operator can move it without a line of code changing. A number like that never becomes a standing count on this site. It is published as an observation with the date it was taken and the source it came from, so a reader knows they are holding a reading rather than a fact — and knows to ask for a fresh one.",
      },
      {
        h: "Derive the denominator, not just the numerator",
        p: "It is easy to derive the thing you are counting and hand-type the population you are counting it against — and the hand-typed half is where the rot is, because a roster is complete on the day it is written. The platform's own guards take route modules from the filesystem, handlers from decorator inspection and writes from syntax-tree nodes, so a router added tomorrow is scanned the day it lands. No roster to update, no allowlist to forget, no need for anyone to remember.",
      },
      {
        h: "The trap on the other side",
        p: "A derivation can also be circular. A flag computed by asking whether an item is in the collection currently being iterated is not a check; it is a restatement, and it is green forever regardless of the property it claims to test. The one-question test catches most of these: if I changed only the formatting, only the spelling, or only the sample size, would this answer change? If yes, it measures a proxy. Even the read time on these pieces is computed from their own rendered text — which is a small thing, and it is also the argument.",
      },
    ],
  },

  {
    slug: "publish-the-ratchet",
    title: "Publish the gap: what a known-open list is for",
    tag: "Assurance",
    accent: HUE.clayDeep,
    date: "2026-08-08",
    audience: "Procurement, security review, and anyone building a vendor assessment they will have to defend internally.",
    dek: "A clean bill of health is unfalsifiable. A list of what is still open is testable — and it is the version a buyer can actually act on.",
    abstract:
      "There are two ways to close an assessment and the comfortable one is worse. A clean bill is unfalsifiable, and it discounts everything above it the moment a reader finds one thing it missed — which they will, because they are reading adversarially and you were not. elan1 publishes the open items instead, in three forms. The first is state labelling: each engineering control is published as enforced, declared, or built-but-not-wired, and an entry is not promoted to enforced without a production caller to point at. The second is a named limits list — data residency is declared and not enforced by routing, no SOC 2 or ISO 27001 certification is held today, no third-party penetration-test report is on file, run1 ships no service-level-agreement machinery, the incident kill-switch stops an application's agent fleet and not its direct writes to its own system of record, the resilience logic is real while the multi-node deployment is not, and the capabilities implemented behind a port and called by nothing in production are named individually rather than implied absent. The third is the ratchet, which is the interesting one. Where a property is not yet true, the platform measures the gap and freezes the measurement as a ceiling that may fall and may never rise: a guard walks the tree for mutating handlers that reach a store directly, and that count is allowed only to decrease. So \"every write is governed\" is published as a direction with a ratchet on it rather than as a fact. Close with a list, not a clean bill.",
    body: [
      {
        h: "A clean bill is unfalsifiable",
        p: "\"We reviewed everything and found nothing\" cannot be checked, cannot be acted on, and collapses entirely the first time a reader finds something. The asymmetry is brutal: the vendor gets one sentence of comfort, and the buyer gets a reason to distrust every other sentence on the page. A list of open items is the opposite trade — slightly uncomfortable to publish, and it makes the rest of the document usable.",
      },
      {
        h: "Three honest states beat one confident one",
        p: "Enforced means code on the live path applies it and something breaks if you remove it. Declared means the rule is implemented and exercised, and no production path consults it yet. Built-but-not-wired means the logic exists behind a port and what is missing is a mount, an adapter or a credential rather than new engineering. Every control is published in one of those three, and the promotion rule is strict: no entry moves to enforced without a production caller somebody can point at.",
      },
      {
        h: "Name the limits individually",
        p: "A limits section written in generalities is a second clean bill. So each one is named: residency is declared and not enforced by routing, and the trust surface publishes that as data rather than prose, so a console cannot render the declaration as enforcement. No SOC 2 or ISO 27001 certification is held. No third-party penetration-test report is on file. run1 carries no service-level-agreement machinery. The incident kill-switch stops the agent fleet and does not reach an application's direct system-of-record writes, because the policy that would is registered without the rollout reference its clause reads. Several capabilities are built and called by nothing in production, and they are listed by name so a requirement can be matched against them.",
      },
      {
        h: "The ratchet: measure the gap and freeze it",
        p: "Where the property is not yet true, measure how untrue and stop it getting worse. A guard walks the mutating request handlers and finds the ones reaching a store directly, without policy evaluation, the approval gate and the audit append; the count is frozen as a ceiling that may decrease and may never increase, and its denominator is derived from the filesystem so tomorrow's handler is included automatically. That is why the claim reads as a direction with a ratchet rather than as an absolute.",
      },
      {
        h: "What this asks of you",
        p: "Hold the list in writing. If a capability on it is on your requirements, treat it as scope to agree with a name and a date rather than a feature to switch on, and ask for the same three states from every vendor you assess — including the ones whose documentation contains no limits section at all, which is information too. The useful closing artefact of any review is a list, not a verdict.",
      },
    ],
  },
];

// ————————————————————————————————————————————————————————————————————————————————
// Derivation. Nothing below is authored per-entry, which is the point of the pieces above.
// ————————————————————————————————————————————————————————————————————————————————

/** Average adult reading speed for expository prose. One constant, stated, rather than a fudge factor. */
const WORDS_PER_MINUTE = 220;

// ⚠️ At the time of writing every piece derives to a very similar read time, because they are written
// to a deliberately consistent depth. That makes the figure close to uninformative on a card — which
// is a rendering decision (drop it from the card) and NOT a reason to hand-type some variety into the
// entries. A typed spread of 4/6/9 minutes would be a fabricated signal, and this library contains a
// piece arguing against exactly that.

/**
 * The text a reader actually reads TODAY. `Insights.tsx` renders the dek as the hero subtitle (via
 * `excerpt`) and then the body; it does NOT render `abstract`. If the template starts rendering the
 * abstract — it reads well as the piece's opening paragraph — add `a.abstract` to this list in the
 * SAME commit, or every published read time understates the page by roughly a third. The read time is
 * derived from what is on the page, not from what is in the object.
 */
const renderedText = (a: InsightSource): string =>
  [a.dek, ...a.body.map((s) => `${s.h} ${s.p}`)].join(" ");

const readMinutes = (a: InsightSource): number =>
  Math.max(1, Math.round(renderedText(a).trim().split(/\s+/).length / WORDS_PER_MINUTE));

export const INSIGHTS: Insight[] = INSIGHT_SOURCES.map((a) => ({
  ...a,
  excerpt: a.dek,
  author: BYLINE,
  reviewedBy: EDITORIAL_REVIEW,
  readMins: readMinutes(a),
}));

export const insightBySlug = (slug: string): Insight | undefined =>
  INSIGHTS.find((i) => i.slug === slug);

/**
 * The topics actually in use, in the order they first appear — DERIVED from the library rather than
 * a second hand-maintained list that would go stale the moment a piece changed topic.
 */
export const insightTopicsInUse = (): InsightTopic[] => {
  const seen: InsightTopic[] = [];
  for (const i of INSIGHTS) if (!seen.includes(i.tag)) seen.push(i.tag);
  return seen;
};

export const insightsByTopic = (topic: InsightTopic): Insight[] =>
  INSIGHTS.filter((i) => i.tag === topic);

/**
 * The standing rules, published on the hub. These are the constraints the library is written under,
 * and stating them is part of the argument several of the pieces make — a claim without its boundary
 * is marketing. The hub currently renders a one-line version of this; this is the honest long form.
 */
export const INSIGHTS_POLICY: string[] = [
  "Reviewed before publish, and ad-free. Nothing here is a placement and nothing here is sponsored.",
  "No customer names, logos, case studies or testimonials. There are none to cite, and implying otherwise is the one mistake that discredits everything else on the page.",
  "No outcome statistics. Nothing has been measured in a customer environment, so every claim here is mechanical: what is structurally impossible, what is on the record, what is computed rather than typed.",
  "Every platform count is imported from one module that carries its own derivation and the date it was counted — never typed into prose. A figure that only a deployment can settle is published as a dated reading, not as a count.",
  "Every piece names the limit of the mechanism it describes, inside the piece rather than in a footnote — and a limit that is still open is written in the present tense.",
];

export const INSIGHTS_SEO = {
  title: "Insights — the argument under the platform | elan1",
  description:
    "Reviewed, ad-free essays on agentic transformation, each grounded in a mechanism this platform actually has: where the control sits, why staged enablement is a control, why a refusal is better evidence than a policy, the third eval state, computed rather than stored numbers, and what a modelled connector is. No customer names and no outcome statistics — nothing has been measured in a customer environment.",
};
