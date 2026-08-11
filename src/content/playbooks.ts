// content/playbooks.ts — the Resources playbooks. Published in full, on the page, ungated.
//
// WHY THIS FILE WAS REWRITTEN, AND WHAT THE REWRITE HAD TO UNDO.
//
// The first version held four cards of four bullets each — a title, an audience and a promise, behind
// an email form. A card that promises "the 5-stage maturity model" and never says what the stages are
// is indistinguishable from a card with nothing behind it, so the obvious fix was to write the actual
// sequences down. That fix, on its own, made things worse: it turned a vague promise into a specific
// one, and there is no document. Nothing in this repository is a playbook file — no PDF, no doc, no
// deck — and the site ships no mailer. The form captures a lead and stops: with a lead endpoint
// configured it posts the record there, and with none configured (the state of this repository) it
// keeps the record in the browser's local storage. Neither branch renders, attaches or emails
// anything, so wiring the endpoint would not make an inbox promise true either.
//
// Taking somebody's email address for a document that does not exist is the most damaging thing this
// section could do, and it gets worse — not better — the more precisely the document is described. So
// the gate is gone. What is below IS the playbook: the sequence, the decision each step forces, and
// the way each step goes wrong, published where a reader can check it without giving us anything.
// `delivery` records that state per entry and the page derives its call to action from it, so a card
// cannot offer to send a document that does not exist.
//
// THE RULES THIS FILE IS BUILT ON — a future editor will be tempted to undo each of them:
//
//  1. NOTHING IS GATED, AND NO CARD PROMISES AN EMAIL. If a written document is ever produced, set
//     that entry's `delivery` and add the fulfilment path in the same change — not before it, and not
//     as a follow-up ticket. `PLAYBOOK_PAGE_COPY` and `confirmationFor` exist so the page's success
//     state is derived from whether a document exists rather than typed by hand.
//
//  2. NO MEASURED OUTCOMES. Nothing in this product has been measured in a customer environment.
//     There are no faster / cheaper / higher-accuracy claims here and none may be added. What a
//     playbook may promise is MECHANICAL: what becomes structurally impossible, what lands on the
//     record, what is computed rather than typed. `outcome` is held to that standard.
//
//  3. NO PLATFORM COUNT IS HAND-TYPED. Numbers come from `platform-facts`, which carries each count's
//     derivation and the date it was taken. Where a real number exists but has no entry there, this
//     file does one of two things: describe the MECHANISM and point at the surface that owns the
//     number, or print the members and let the count be the length of the list the reader can see.
//     A count re-typed onto a second surface is a count that will one day disagree with itself; a
//     count given as a vague quantifier ("a handful") is worse, because it can never be re-run.
//
//  4. NO CLAIM ABOUT ANYONE ELSE. Not one line here says what another product cannot do. The
//     playbooks are useful because they are specific about elan1, not because they are unkind about
//     a category.
//
//  5. THE LIMITS STAY IN. `notCovered` is not a modesty section — it is the part a buyer reads to
//     decide whether the rest is honest. Deleting a line from it to make a card look fuller is the
//     single most damaging edit available in this file.
//
//  6. A QUOTATION IS EXACT AND COMPLETE, OR IT IS NOT PRESENTED AS A QUOTATION. Braces mark a value
//     the platform computes at runtime — `{app}`, `{ctx.tenant_id}`, `{ctx.region}` — which is the
//     convention the rest of the content layer already declares, so a reader can tell a computed slot
//     from an omitted word. A refusal that is assembled at runtime out of a principal and an approval
//     identifier has no fixed form at all; those are described in our own voice, outside quote marks,
//     rather than given one.

import { factValue } from "./platform-facts";

/**
 * Whether a written document exists behind a title.
 *
 * Today every entry is `outline-on-this-page` — the sequence below is the whole of it. The second
 * value exists so that a future author has to state the change rather than let a promise drift back
 * in: setting it turns on the request path in `PLAYBOOK_PAGE_COPY`, and the document had better be
 * real by then.
 */
export type PlaybookDelivery = "outline-on-this-page" | "written-document";

/** One step of a playbook. A step with no decision and no failure mode is a heading; don't add one. */
export interface PlaybookStep {
  /**
   * Short, imperative. This doubles as a line in the card's contents list (see `inside`), so keep it
   * under roughly seventy characters and make it readable on its own.
   */
  title: string;
  /** The substance: named mechanisms, quoted refusals, and what actually happens in what order. */
  body: string;
  /** The decision this step forces on the reader. Not a summary — a thing they must choose. */
  decision: string;
  /** How this step goes wrong. Written as the mistake, not as advice. */
  trap: string;
}

export interface Playbook {
  slug: string;
  title: string;
  /** One sentence. What this is, in terms of the sequence it describes. */
  desc: string;
  /** Who it is written for. Rendered inside the derived `cardLabel`, so keep it to a few roles. */
  audience: string;
  /** Whether a written document exists. See `PlaybookDelivery`. */
  delivery: PlaybookDelivery;
  /**
   * What the reader has at the end. MECHANICAL only — an artifact, a decision record, a written
   * order. Never a measured result: nothing here has been measured in a customer environment.
   */
  outcome: string;
  /** The sequence. Five to nine steps; fewer is a blog post, more is a course. */
  steps: PlaybookStep[];
  /** What the playbook deliberately does not cover. See rule 5 above — this section stays. */
  notCovered: string[];
  /**
   * The card's contents list. DERIVED from `steps` — never hand-write it. A hand-written contents
   * list is a claim about the text that drifts from the text the first time a step is added. These
   * are the sections of the outline on this page; they are not chapters of a document, because there
   * is no document.
   */
  inside: string[];
  /**
   * The card's eyebrow, DERIVED from `delivery` and `audience`. It exists so the page cannot label a
   * card "Gated" while this file publishes the whole thing.
   */
  cardLabel: string;
  accent: string;
}

/** A playbook as authored: everything except the derived fields. */
type PlaybookSource = Omit<Playbook, "inside" | "cardLabel">;

/**
 * The agents whose certification gate is hardened by a behaviour battery — a probe that grades what
 * the agent actually says. Printed rather than counted: the number in the copy below is this list's
 * length, so the count and its members can never disagree, and a reader can check both.
 *
 * Counted from the two places that build the gate's registry — one explicit entry plus the wave-1
 * vertical roster, whose membership a test pins by set equality — not taken from a brief.
 */
const BEHAVIOUR_BATTERY_AGENTS = [
  "edu1.learning_guide",
  "realestate1.diligence_advisor",
  "realestate1.transaction_coordinator",
  "manufacture1.maintenance_advisor",
  "energy1.grid_advisor",
  "telco1.noc_analyst",
] as const;

/** "a, b and c" — no index access, so it stays honest on an empty or single-item list. */
const andList = (xs: readonly string[]): string => {
  const head = xs.slice(0, -1).join(", ");
  const tail = xs.slice(-1).join("");
  return head ? `${head} and ${tail}` : tail;
};

const BATTERY_COUNT = String(BEHAVIOUR_BATTERY_AGENTS.length);
const BATTERY_ROSTER = andList(BEHAVIOUR_BATTERY_AGENTS);

const eyebrow = (p: PlaybookSource): string =>
  p.delivery === "written-document"
    ? `On request · ${p.audience}`
    : `Free to read here · ${p.audience}`;

/** The card's contents list is the step titles, in order. One source, so the card cannot lie. */
const withDerived = (p: PlaybookSource): Playbook => ({
  ...p,
  inside: p.steps.map((s) => s.title),
  cardLabel: eyebrow(p),
});

const SOURCES: PlaybookSource[] = [
  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "agentic-transformation-roadmap",
    title: "The Agentic Transformation Roadmap",
    desc: "Sequencing agent enablement so \"not yet\" is a state the control plane holds — the first function, the shape of wave one, and the stop you rehearse before you need it.",
    audience: "CEOs, CIOs, transformation leads",
    delivery: "outline-on-this-page",
    outcome:
      "An enablement order: named functions in the sequence an operator turns them on, the gate at each step, and the refusal that fires if someone runs ahead.",
    accent: "#df8c64",
    steps: [
      {
        title: "Write the roadmap as functions, not departments",
        body: "Enablement is staged per tenant, and the unit is one app function — not one app, not one team. A function outside the enabled set is refused before it acts: \"{app}.{function} not enabled for tenant {ctx.tenant_id}\" — braces are values the platform fills in at runtime — and the blocked run lands on the audit chain. The sequence is a state the control plane holds, not a promise in a deck.",
        decision: "Which named functions are in wave one, and who is allowed to add the next one.",
        trap: "A plan written in teams and quarters. It survives exactly as long as everyone's goodwill does.",
      },
      {
        title: "Make wave one advisory by construction",
        body: `The platform stages its own enablement the same way: ${factValue(
          "agentsEnabled",
        )} of ${factValue(
          "agentsRegistered",
        )} registered agent functions are on in the current wave; the rest are deliberately off — a sequencing decision, not a gap. A consequential action stops at the human approval gate whichever wave it sits in, so "enabled" is not "unattended". The corollary is the sharp one, and the governance playbook takes it apart: an action nobody declared consequential does not stop. Copy the shape — wave one should be able to be wrong without anything leaving the building.`,
        decision:
          "Which drafting functions produce output a human already reviews today.",
        trap: "Enabling a function that both drafts and commits because it arrives as one feature. Split it, or wave one is not advisory.",
      },
      {
        title: "Choose the first workflow by the refusal it needs",
        body: "Rank candidates on four questions rather than on value. Does the work already have a system of record, or does it live in a spreadsheet? Is there a named human who owns the commitment today? Can you write the thing the agent must never do as a single sentence? Would a wrong answer be visible within a day? A candidate that fails the first two produces an agent grounded in nothing, and one that fails the third has no gate to build — you cannot govern a boundary you cannot state.",
        decision:
          "The one sentence naming what the agent must never do. Write it before the build is scoped, not after.",
        trap: "Picking the highest-value workflow whose record is a shared spreadsheet, then discovering that grounding was the whole project.",
      },
      {
        title: "Split the workflow at the commitment",
        body: "Everything up to the commitment is draftable; the commitment itself is a gate. service1 is the plain example — an agent drafts a reply and a person sends it. sales1 draws the same line between advancing a deal stage, which is an immediate governed write, and marking it Closed Won, which is a revenue commitment and waits for a person. Draw the line explicitly for your workflow and name the role standing on the far side of it.",
        decision: "Where the line falls, and which role holds approval authority for it.",
        trap: "Leaving the line implicit. An unnamed gate becomes whoever happens to be nearest the screen.",
      },
      {
        title: "Decide what wave one will be judged on before it runs",
        body: "Choose the evidence in advance: the eval battery the workflow will be scored by, the approval queue somebody will actually work, and the audit export you will read. Promotion to production is gated on a passing eval run, and an app whose battery has never been scored is refused rather than waved through — not-measurable is a refusal, and the refusal names the blocking apps. Most eval coverage sits where you would want it, in the per-app and per-pack batteries scored at certification. What is thinner is the behaviour battery, the probe that grades what an agent actually says rather than what it declares; that is covered separately below. Either way, if your first workflow has no battery, writing one is a scheduled task rather than paperwork.",
        decision: "Who writes the eval battery, and when it lands relative to the enablement date.",
        trap: "Meeting the promotion gate with nothing scored and reading the refusal as a platform problem rather than a missing battery.",
      },
      {
        title: "Name wave two before you turn on wave one",
        body: "\"Later\" has to be something a system holds, or it becomes a negotiation you have every month. The enabled set is per tenant and durable, so the second wave is a list you write now and an operator applies later as an audited admin action. Write both waves and the criterion for moving between them in the same document, so the argument about scope happens once, in a room, with everyone present.",
        decision:
          "The criterion that moves a function from wave two to wave one — a condition, not a date.",
        trap: "Shipping wave one with wave two undefined, which turns every subsequent request into a fresh negotiation with no precedent.",
      },
      {
        title: "Rehearse the stop, and know exactly what it stops",
        body: "The incident kill-switch overrides the enabled set for an app: while it is on, every function of that app is refused at the gate, the switch is written to the audit chain, and it survives a restart — a stop a redeploy silently lifts is not a stop. The enabled set is preserved, so lifting the switch restores the exact prior wave rather than forcing somebody to reconstruct it, because a stop that costs you your configuration is a stop people avoid. Know its edge as precisely as its reach: it halts that app's agent fleet, and it does not, as the control plane is wired today, also refuse that app's direct system-of-record writes. The generic rule that would do that is registered in production without the reference to the rollout registry its clause needs, so the clause cannot fire; only a test wires it. Rehearse against the fleet stopping, and verify the write path yourself rather than assuming the switch covers it.",
        decision:
          "The named people who can suspend, and the sentence that authorises them to do it without asking first.",
        trap: "Treating suspension as an escalation. If it needs a meeting, it will not happen during the incident.",
      },
      {
        title: "Keep the business case arguable",
        body: "Nothing here has been measured in a customer environment, and the platform holds the same line in code: a seeded illustrative figure is wrapped in a type that refuses to render — turning it into text raises rather than printing it — so a demo number has no silent path onto a page as a computed answer. Build the value model from your own operating assumptions, label it illustrative, and show the arithmetic instead of the conclusion. After go-live one line gets firmer: agent runs on the governed runtime are metered per tenant, per app and per model, and priced platform-side from an illustrative rate card. Firmer is not the same as billable — the FinOps playbook below sets out exactly how far that number goes.",
        decision: "Whose assumptions the model uses, and who is allowed to change them.",
        trap: "A number that reaches a board pack without its assumptions attached, and comes back a year later as a commitment.",
      },
      {
        title: "Hand over an order, not a system",
        body: "strategy1 is a delivery motion performed by people — there is no strategy1 app, agent, screen or endpoint. What leaves a planning engagement is a document set and an enablement order; standing it up is separate work, and enabling each function in the control plane is an audited admin action gated like any other write. Say this in the handover meeting, because a roadmap mistaken for a deployment is the most expensive misunderstanding on offer.",
        decision:
          "Who owns the enablement order after handover, and what their first audited action is.",
        trap: "Assuming the roadmap arrives running.",
      },
    ],
    notCovered: [
      "A business case with our numbers in it. Nothing here has been measured in a customer environment, so the model carries your assumptions, labelled, with the arithmetic shown rather than the conclusion asserted.",
      "Change management, internal communications and training design. Academy covers the operator, approver and administrator paths on their own terms.",
      "Data migration and master-data cleanup — usually the longest pole in the tent, and scoped separately for that reason.",
      "An incident procedure that assumes the kill-switch also stops direct system-of-record writes. It stops the agent fleet; the rule that would cover the write path is registered without the reference its clause needs, so it does not fire.",
      "Which functions your tenant should enable second. That depends on your records and your approvers, and it is a Discovery conversation rather than a document.",
      "Any comparison with another vendor's adoption framework.",
    ],
  },

  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "governance-playbook",
    title: "The Governance Playbook",
    desc: "The operating model written in mechanisms that already exist — which actions gate, who may approve them, what the audit chain will and will not hold, and where we would tell your auditor a control is declared rather than enforced.",
    audience: "Risk, compliance, security leaders",
    delivery: "outline-on-this-page",
    outcome:
      "A control narrative an auditor can follow: the gate on each consequential action, the approver split, the evidence the chain holds, and a written list of the limits to carry in your risk register from day one.",
    accent: "#e0656d",
    steps: [
      {
        title: "Learn the spine before you design anything on top of it",
        body: "A write that goes through the platform's governed writer crosses the same sequence: the caller's identity is resolved, policy is evaluated, a consequential action stops for a human approval, the action runs, and the decision lands on an append-only, hash-chained audit log. Consequential control-plane operations use the same spine — issuing a programmatic key, publishing a skill, erasing a data subject's record. Your operating model should say where your controls attach to that sequence, rather than standing up a parallel one beside it.",
        decision:
          "Which of your existing controls map onto policy, which onto approval, and which onto evidence.",
        trap: "Building a governance layer above the product that duplicates the approval gate. You end up with two queues, and one of them is decorative.",
      },
      {
        title: "Decide what counts as consequential, in writing",
        body: "The gate exists because an action is declared consequential, and that declaration has a sharp edge. An operation declared non-consequential is still policy-evaluated and audited — but it is not gated. Some are deliberately so: revoking a key is a fast security response you never want sitting in a queue. Read \"not consequential\" as ungated, never as governed-but-queued; that misreading is how a control gets signed off that was never there.",
        decision:
          "The list of actions in your deployment that must gate, signed by the risk owner, before the build starts.",
        trap: "Hearing a non-consequential declaration as a softer gate. It is not a softer gate; it is no gate.",
      },
      {
        title: "Bind the approval to the payload, not to the intent",
        body: "An approval is bound to the action and to a fingerprint of the exact payload, and it is consumed on use — so a token approved for one operation cannot be spent on another, and a payload edited after approval no longer matches the token that authorised it. The operational consequence sits on your side of the line: your approvers are approving a specific payload, so an approval screen that shows a friendly summary and not the payload is a gap in your process rather than in the mechanism.",
        decision: "What an approver must see on screen for the approval to mean anything.",
        trap: "Approving a description. The fingerprint is over the payload; the description is not what executes.",
      },
      {
        title: "Maker-checker is a tag plus two people",
        body: "On an approval a writer has flagged for maker-checker, the principal who requested it cannot also approve it. The refusal is assembled at the moment it fires, out of that principal's identifier and that approval's identifier, so it has no fixed wording for us to quote — what it says, in our own words, is that a segregation-of-duties rule stopped this person approving the request they themselves raised, and that a different approver is required. The administrator role does not bypass it, because it is a control rather than a permission. Untagged approvals are unaffected, so single-principal flows still resolve — which means somebody has to decide which actions carry the tag, and that somebody is you.",
        decision: "Which actions carry the tag, and which role approves each of them.",
        trap: "Tagging an action for which only one person in a timezone holds the approving role. The queue then stalls on your rota, and the refusal correctly names your own person.",
      },
      {
        title: "Set the autonomy ceiling before you loosen anything",
        body: "The default for an unconfigured action is a human approval on every consequential run. A tenant may opt in per action class to a graduated tier: automatic within a value tolerance and a budget, escalating to a human above it, and a hard ceiling above which the action is refused outright rather than queued. Every path is audited, the automatic one included. Set the tolerance from what a reviewer could genuinely re-examine after the fact, not from what felt safe in a workshop.",
        decision:
          "The value tolerance and the hard ceiling for each action class you loosen — both numbers, or neither.",
        trap: "Loosening because the queue is long. A long queue is information about the tolerance and about staffing; automation chosen by fatigue is not a control decision.",
      },
      {
        title: "Test the audit chain on an ordinary Tuesday",
        body: "The chain is per tenant: each event hashes the one before it, and verification recomputes the chain rather than trusting a flag. On Postgres, updates and deletes to the log are blocked by a database trigger, and a uniqueness constraint on the previous-hash column is what stops a tenant's chain forking. Damage that does occur is recorded as a signed, append-only re-baseline marker rather than quietly repaired. Run the verification routinely, so the first time you read its output is not during an audit.",
        decision: "Who runs verification, how often, and where the result is filed.",
        trap: "Treating immutability as a property you assume. It is a property you can check, which is the stronger position to be in when someone asks.",
      },
      {
        title: "Write the erasure runbook against what the chain actually stores",
        body: "The audit records field keys rather than raw values, and that is what makes an erasure request compatible with an immutable log. Erasure keeps the record shell and clears the declared personal fields, with a shape matcher as the ceiling so an unexpected spelling of a sensitive field name is still caught. Connector calls are recorded the same way — the operation and its argument keys, never the argument values.",
        decision:
          "Which fields your deployment declares as personal, and who revisits that list when a new object type lands.",
        trap: "Assuming the shape matcher covers a field nobody declared. It is a ceiling over the declaration, not a replacement for it.",
      },
      {
        title: "Read a not-measurable verdict as an unread instrument",
        body: "There are three verdicts, not two: passed, failed, and not measurable. Not measurable is not a pass — at the promotion gate it is a refusal, and the refusal names which apps are blocking. You will meet it where an app has no eval battery, where a readiness assessment collected no evidence at all, and where a re-run after a model change had no battery to score against. In each case the honest reading is that nothing was measured, which is a different sentence from a clean result.",
        decision:
          "What your process does with a not-measurable verdict: write the missing battery, or record the function as ineligible for promotion.",
        trap: "Filing not-measurable next to passed on a dashboard because neither is red. Absence of a finding is not absence of a problem, and this is precisely where that error is made.",
      },
      {
        title: "Put the declared-not-enforced list in the risk register on day one",
        body: "Some controls are implemented and exercised without a production path consulting them yet, and this site labels those rather than rounding them up. Five to carry from the first day. The incident kill-switch halts an app's agent fleet, and does not also refuse that app's direct system-of-record writes: the generic rule that would do that is registered without the reference to the rollout registry its clause needs, so the clause cannot fire, and only a test wires it. Residency is declared and recorded rather than enforced by a router — no production read path, connector or storage layer consults it — and where it does bite it bites locally, at health1's interop connectors, which refuse a call from outside the India region. run1 ships no service-level machinery: paging routes to your own tool and the rotation is a human responsibility. A derived guard walks the mutating request handlers reachable from the application's routers — the denominator comes from the filesystem and the syntax tree rather than a list somebody maintains — and counts the ones that reach a system of record through a direct store call, with a smaller subset showing no governed writer anywhere in the handler at all; both are held as ceilings that may fall and may never rise, which makes \"every write is governed\" a direction with a mechanism behind it rather than a finished fact. And no framework certification is held.",
        decision:
          "Which of these limits are acceptable for your first workflow, and which must close before a second one is scoped.",
        trap: "Hearing a labelled limit as a disclosure that cancels the controls around it. The labels are the reason the rest of the list is worth reading.",
      },
    ],
    notCovered: [
      "Legal advice, or an opinion on whether a particular deployment satisfies a specific regulation in your jurisdiction.",
      "A certification. Readiness tooling is not attestation, and no framework certification is held.",
      "Your policy content. The platform evaluates declared policy tags; what your policy says is your risk function's work and should stay there.",
      "Model safety research. A behaviour battery probes one agent against its own stated boundary; it is not a general evaluation of a model.",
      "Penetration-test findings. The third-party log exists and holds none yet, and we would rather say so than imply a clean result.",
    ],
  },

  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "vertical-guides",
    title: "Vertical Guides (by industry)",
    desc: "How to read an industry pack the way an auditor would — the wedge on the write path, the refusals it fires, the seams that are modelled, and the four questions that separate a real vertical claim from a themed demo.",
    audience: "Industry & function owners",
    delivery: "outline-on-this-page",
    outcome: `A per-pack read you can check against your own controls: what the pack refuses when a record is written, which of the ${factValue(
      "suiteApps",
    )} suite apps it composes and through whose writer, and four questions to put to any vertical claim — including ours.`,
    accent: "#2f6df0",
    steps: [
      {
        title: "Start from what a pack is: configuration over one core",
        body: `The ${factValue(
          "verticalPacks",
        )} industry packs are configuration over the same core and the same apps rather than forked application code, and each carries its own governance signature — the written statement of what it refuses and why. The consequence worth planning around cuts both ways: a control won in one vertical is available to the others, and so is a weakness. It also means an industry requirement met by configuration is maintainable, while one met by a fork is a second product.`,
        decision:
          "Whether your requirement is genuinely industry-specific, or a general control you can state once and reuse.",
        trap: "Asking for a fork. A fork ends the property that made the pack worth buying.",
      },
      {
        title: "Ask the four questions of any vertical claim",
        body: "One: is the rule enforced when a record is written, or only when a screen renders? Two: is the number computed from the record, or accepted from whatever the payload supplied? Three: does the eval that scores the rule contain a case that could actually fail? Four: does the pack's own agent write through the same governed writer a person uses? A claim that survives all four is a mechanism. A claim that survives fewer is a screen, and screens can be changed by anyone with the console open.",
        decision: "Which of your own controls you will put through the same four questions.",
        trap: "Accepting a demonstration as the answer to question one. A demo shows the happy path; the question is about the write path.",
      },
      {
        title: "Read the refusals, not the feature list",
        body: "A pack's real boundary is the sentence it returns when it declines, so we quote those whole rather than trimming them to fit. health1 refuses a clinical write with \"no active patient consent — a clinical record requires consent (DPDP/ABDM/HIPAA)\", and refuses an interop call from outside the region with \"{connector_id}: residency — this endpoint serves 'in' only; a call from '{ctx.region}' is refused (cross-border PHI is not allowed)\", where the braces are values the platform fills in at runtime. retail1 refuses a sale price above the item's maximum retail price from both directions, appends a refusal event to the chain, and writes no record. bank1 drafts rather than executes a scheduled debit and says why: \"a standing instruction DRAFTS a debit; a human authorizes it (K5) and the sanctions / balance / KYC gates run at execute\". Ask for the refusal list first — it is shorter than the capability list and considerably more honest.",
        decision: "The three refusals your industry would consider non-negotiable.",
        trap: "Reading a refusal as a limitation. In a regulated workflow the refusal is the product.",
      },
      {
        title: "Check whether the number is computed or accepted",
        body: "What separates a governed vertical from a themed form is recomputation at the boundary: an eligibility verdict derived from the patient's coverage, an available balance recomputed from the transaction ledger rather than read from a stored field, a quality-measure rate counted from the underlying care plans. A payload that supplies one of those values does not get to keep it, because the derive fires on every write. Apply the test to whichever number your regulator would ask about first.",
        decision: "The one number in your process that must never be typed.",
        trap: "A field that looks computed on screen and is stored from the request — the two are indistinguishable in a demo and completely different in an audit.",
      },
      {
        title: "Separate the seam from the badge",
        body: "A connector can be registered and callable and still be a modelled adapter: real interface, real governance, deterministic behaviour, and no external call until an endpoint and credentials are configured. Some packs say this about their own seams — an interop connector that reads a live endpoint when one is configured and the pack's own record otherwise, and reports which mode it is in. Plan the go-live around which seams have to be live for the first workflow to mean anything, and let the rest stay modelled on purpose.",
        decision: "The seams that must be live on day one, versus the ones that can stay modelled.",
        trap: "Reading an industry-standard name on a seam as evidence of a live connection.",
      },
      {
        title: "Follow the composition, and check whose writer runs",
        body: `A pack composes suite apps rather than rebuilding them: a grievance opens a service1 case, a disbursement posts a finance1 payable. The property to check is that each write goes through the target app's own governed writer, so the target's gate holds even though another app started the move — and where a sibling declines, the pack raises rather than routing around it. That is what stops a vertical becoming a way to write into finance without finance's controls. insight1 is the counter-example worth knowing, because it is the one app that composes without writing: it reads a named set of ${factValue(
          "insightSourceApps",
        )} sibling record stores — not every app — and holds no write access to any of them, its own grants being its analytics store and a send-only email seam. Where a finding needs an action it proposes into the owning app's approval queue rather than writing there itself.`,
        decision:
          "Which sibling apps your first vertical workflow will write into, and who owns each of their gates.",
        trap: "Assuming a cross-app step inherits the caller's approval. Each step keeps its own.",
      },
      {
        title: "Look for the case that could have failed",
        body: "A battery whose cases all pass over an empty sample is measuring nothing at all. The packs that handle this honestly score a claim not-measurable when the sample is empty rather than passing it, and the receipt names the claims that were not attested. When you are handed a Trust Mark receipt, read the not-attested section before the headline.",
        decision:
          "Whether a not-attested claim blocks your go-live, or is accepted with a compensating control you name.",
        trap: "Counting a mark as coverage. A mark is coverage of what was scored, and the receipt says what that was.",
      },
      {
        title: "Read the pack's boundary paragraph before its capability list",
        body: "Each pack states what it is not. health1 is provider-side — it documents, codes, claims and measures, and does not adjudicate as a payer. Several regulatory alignments are carried as a recorded, audited posture rather than as a block, and the packs say which ones. Reading the boundary first saves the discovery in week three where a capability everyone assumed turns out to be a note.",
        decision:
          "Whether the stated boundary is compatible with the first workflow, before the build is scoped.",
        trap: "Discovering the boundary after the statement of work is signed.",
      },
    ],
    notCovered: [
      "Regulatory certification or legal sign-off for your jurisdiction. Nothing here is legal, medical or financial advice.",
      "Industries outside the shipped packs. A vertical we do not ship is a configuration project scoped on its own terms — there is nothing to read here for it, and nothing to download.",
      "Country-specific statutory content beyond what the packs already model.",
      "Your data model. The pack brings its record types; mapping yours onto them is Discovery work and is usually where the time goes.",
      "A comparison with other vendors' industry offerings. We describe what elan1 does and leave the rest of the market to you.",
    ],
  },

  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "finops-playbook",
    title: "The Agent FinOps Playbook",
    desc: "Running agents on a number you can compute — what is metered and what is not, how a tier gets chosen, the places a zero is not free, and why a cost-down model change goes through the same battery as a safety change.",
    audience: "Finance, platform, operations",
    delivery: "outline-on-this-page",
    outcome:
      "A cost model that separates the metered part from the assumed part on the same page as the total, a routing policy written per task class, and a migration checklist that stops on a verdict of not measurable.",
    accent: "#3fae6b",
    steps: [
      {
        title: "Meter before you tune, and scope the meter honestly",
        body: "Agent runs on the governed runtime are metered along three dimensions — tenant, app and model — and their cost is computed platform-side from an illustrative rate card keyed to the three routing tiers, rather than taken from a figure the model reports. The rate card is illustrative and is not billing advice; the platform labels it that way in its own source, twice, and we are not going to un-label it here. Runs are traced with the tenant, app, principal and request identifier correlated, so a cost line can be walked back to the run that produced it. Two scoping sentences belong in your model beside the total: metering covers the governed runtime path, and it is not a claim that every model call in the platform is metered.",
        decision:
          "The unit you will report on — per tenant, per app, or per workflow — and who receives it.",
        trap: "Reading a metered figure as a bill. It is computed from an illustrative card, on the paths that route through the meter.",
      },
      {
        title: "Price the token classes separately",
        body: "Input, output, cache reads and cache writes are disjoint parts of a prompt and are priced independently rather than derived from one another. A cache read costs roughly a tenth of the base input rate. A cache write costs more than a plain input token, and the multiplier is a function of the cache lifetime — the card carries the multiplier for the short, five-minute lifetime the platform actually requests, and a longer lifetime is a different multiplier. That coupling is the part people miss: changing the caching strategy without re-pricing under-charges quietly, and quietly is the expensive way to be wrong. A test ties the priced lifetime to the one the client sends, so the mismatch shows up red rather than silently.",
        decision:
          "Who owns the caching strategy, and that the same owner owns the rate change that goes with it.",
        trap: "Treating cache tokens as free because they are cheap.",
      },
      {
        title: "Route by task class, decided by an eval",
        body: "Model routing selects a tier per policy alias, so which work goes to which tier is a written policy rather than a per-developer preference. The right way to move a task class to a cheaper tier is to run that class's battery on both and compare the scores — which makes it an evidence decision that happens to save money, rather than a cost decision that happens to touch safety.",
        decision: "The task classes, and the battery each one is scored by.",
        trap: "Routing by intuition and meeting the regression in production, where it costs more than the tier ever saved.",
      },
      {
        title: "Know the four places the number is softer than it looks",
        body: "The rate card is keyed by routing tier, not by model, and it holds an entry per tier. So: a model with no entry is recorded at zero, and that zero is logged and counted as unpriced rather than accepted as free — reconcile the unpriced counter to nothing before you trust a monthly figure. An unrecognised model identifier falls back to the middle tier and is charged at that tier's rate. A provider reached through the compatible client reports the tier as its model name, so calls to it are priced against the same tier rates rather than that provider's own. And a caller that already priced its own usage has that number stored as supplied — the platform respects it rather than recomputing. None of these is a bug; each is a place where a figure means slightly less than a reader will assume.",
        decision: "Who checks the unpriced counter, and on what cadence.",
        trap: "A monthly total that looks excellent because part of it was never priced, or was priced at a tier's rate rather than a provider's.",
      },
      {
        title: "Set a budget so the ceiling is yours",
        body: "A per-tenant budget lets the router downshift as the budget burns: past a soft threshold the tier drops one step, and past the hard threshold it moves to the cheapest tier. The budget check is a downshift only — it chooses between the tier the caller asked for and a cheaper one, so a budget can lower the tier and has no path to raise it. The saving is computed from the price delta rather than asserted. A tenant with no configured budget falls back to a documented illustrative default, which is a reason to set a real one rather than inherit a number chosen to make a demo interesting.",
        decision:
          "The budget per tenant, and which workloads may downshift versus which must refuse instead.",
        trap: "Leaving the fallback in place and reading it later as a ceiling somebody chose.",
      },
      {
        title: "Gate every cost-down migration on the same battery",
        body: "A Trust Mark earned on one model is not evidence about another. When a model change is detected under a byte-identical agent, the certifying eval is re-run and a lower score is treated as a regression rather than noise. A re-run that cannot be scored comes back not measurable, which is not a pass — and a comparison against a missing number is not a regression either, because \"we could not measure\" must not manufacture a verdict in either direction. Know what your re-run actually exercises: for most agents it is the structural declaration check, and only the agents named in the evidence playbook below carry a behaviour battery that grades what the model says.",
        decision:
          "The stop condition — that a not-measurable outcome halts the migration until a battery exists.",
        trap: "Reading not-measurable as clean because nothing turned red.",
      },
      {
        title: "Meter what you can compute, and say what you cannot",
        body: "Model usage on the governed runtime is metered inside the platform. Infrastructure is not: there is no compute meter, so a self-hosted deployment's compute lands on your cloud bill and sits outside this model entirely. Non-model actions that pass through the meter — a channel send, for instance — are recorded under a name the rate card has no entry for, so they arrive unpriced by construction. Put those sentences in the model, next to the total, rather than presenting an all-in figure the platform cannot compute.",
        decision:
          "Where the boundary of your cost model sits, stated on the same page as the total.",
        trap: "An all-in figure assembled from one metered part and one guessed part, with the join invisible.",
      },
      {
        title: "Keep illustrative figures out of the arithmetic",
        body: "Seeded demo figures in the platform are wrapped in a type that refuses to render — turning one into text raises, and a walk over an outgoing payload raises if one slipped through — so a demo number cannot be printed as a computed answer even by accident. Hold your own model to the same discipline: label every assumption, keep it visibly separate from the metered inputs, and show the arithmetic. It makes the model arguable, which is the only condition under which it survives a finance review.",
        decision:
          "Which inputs are metered and which are assumed, marked as such inside the model itself.",
        trap: "An assumption that hardens into a fact by being copied into a slide.",
      },
    ],
    notCovered: [
      "A price list, or any commercial terms.",
      "Billing advice. The rate card is illustrative and says so in its own source; a metered figure is an operating signal, not an invoice.",
      "Infrastructure and compute cost modelling. The platform has no compute meter, so an all-in number is not something it can produce.",
      "Savings claims. Routing computes a price delta from a rate card; nothing has been measured in a customer environment.",
      "Self-hosted or open-weight model economics.",
      "Procurement or financial advice. Nothing here is either.",
    ],
  },

  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "agent-evidence-playbook",
    title: "The Evidence Pack: certifying an agent",
    desc: "What has to exist before an agent is certified, how to tell a structural declaration check from a behaviour battery on sight, which agents actually carry one, and what to do with a verdict of not measurable.",
    audience: "Eval owners, internal audit, platform leads",
    delivery: "outline-on-this-page",
    outcome:
      "An evidence pack per agent — the definition, the battery, the passing run, the fingerprint, the model it was scored on, and the list of claims not attested — plus the ability to say which of two very different checks earned a given Trust Mark.",
    accent: "#a394ff",
    steps: [
      {
        title: "Know which of the two checks you are looking at",
        body: `The default agent certification is a deterministic structural declaration check. It asks whether the agent has instructions, whether a tool-using agent at higher autonomy declares policy tags so the policy engine has something to evaluate, and whether a fully autonomous tool-using agent either requires approval or verifies itself. It certifies that the declared governance posture is coherent for the autonomy level — it does not ask how the agent behaves when it is probed. A behaviour battery does ask that: adversarial and nominal scenarios graded on what the agent actually says, through the vertical's own live classifier. It hardens the certification gate for ${BATTERY_COUNT} agents, named here so the count and the roster cannot come apart — ${BATTERY_ROSTER}. Every other registered agent certifies on the structural declaration check alone, and the platform is explicit that this is a staged roll-forward rather than a sample: the battery is a lookup, deliberately not a blanket requirement, so an agent with no entry keeps the declaration-only gate. Note who is not on that list — no suite app and no cross-app workflow has one, and neither do the clinical, banking and insurance advisories.`,
        decision: "Which of your agents need a behaviour battery, given what their tools can reach.",
        trap: "Reading a Trust Mark as a behavioural result. Ask which of the two checks earned it before you rely on it.",
      },
      {
        title: "Know what the battery graded, as well as who it covered",
        body: "Coverage is one question and fidelity is another. Unless the live model client is configured, the battery grades a deterministic reference response rather than a model's actual output — and the code labels it that way rather than letting a modelled run read as a live one. So there are two facts to record beside any battery result: which agents have a battery at all, and whether the run that produced this verdict spoke to a model. Neither is the whole eval surface, and it would be a mistake to read this section as if it were: each industry pack and each suite app carries its own eval battery scored at certification, and that is where most eval coverage sits. What is scarce is specifically the probe of what an agent says.",
        decision:
          "Whether your evidence pack records the model client the run used, not only the verdict it returned.",
        trap: "Filing a modelled run as behavioural evidence. It is evidence about the harness, which is worth having and is not the same thing.",
      },
      {
        title: "Build a battery that can fail in both directions",
        body: "Every scenario is either adversarial — a request that pushes the agent past its stated boundary — or nominal, a legitimate request it must actually help with. A violation in the response fails the case regardless of which kind it was. A nominal case additionally fails when the response is not substantive, because a battery made only of refusal scenarios can be passed by an agent that refuses everything, and refusing everything is not correct behaviour either.",
        decision: "The ratio of nominal to adversarial scenarios, fixed before the first run.",
        trap: "An all-adversarial battery, which certifies silence and calls it safety.",
      },
      {
        title: "Write down how the classifier can be wrong",
        body: "The battery's verdict comes from a classifier reading the response text — the app's own semantic one rather than a keyword list. Classifiers have characteristic failure shapes: a contrastive decline that reads as an offer, a request that collapses to its noun and loses the intent. Record the known false positives beside the battery, because whoever reads a failed case in six months will otherwise re-derive them from scratch, or worse, edit the case.",
        decision: "Who owns the classifier's known-error list, and where it lives.",
        trap: "Tuning the classifier until a case passes. That is editing the instrument to fit the reading.",
      },
      {
        title: "Collect the definition, not a description of it",
        body: "Certification binds a fingerprint of the agent's consequential definition — its instructions, skills, tools, policy tags, model policy, approval posture and trigger. Your evidence pack should hold those same fields verbatim, plus the battery, the run that passed, and the model that run was scored on. A pack holding a summary cannot be checked against the fingerprint later, and being checkable later is the entire purpose of a fingerprint.",
        decision: "Where the pack is stored, and who can read it during an audit.",
        trap: "A pack assembled from the documentation rather than from the definition. They diverge silently.",
      },
      {
        title: "Expect certification to be refused for three specific reasons",
        body: "Certification is refused unless the eval passed, unless it ran for this agent rather than a neighbouring one, and unless it belongs to this tenant — and the refusal names which of the three applied. The rule underneath is short enough to put on a wall: no eval, no Trust Mark. The second refusal exists because certifying against a run from an agent with a similar name is a thing that happens.",
        decision: "Who is allowed to run the certifying eval, and in which environment.",
        trap: "Assuming a passing run somewhere in the tenant is a passing run for this agent.",
      },
      {
        title: "Treat an un-revoked mark on a changed agent as the incident",
        body: "A re-published agent whose instructions, tools or approval posture changed produces a new fingerprint, so the prior certification no longer matches, and a drift sweep revokes it. Revocation is the mechanism working as designed. The condition worth alerting on is the opposite one: a mark still showing valid against a definition that has moved.",
        decision:
          "What your change process does on revocation — re-run and re-certify, or disable the function until it is re-certified.",
        trap: "Building a process that treats revocation as a failure and re-issues the mark to make a dashboard green.",
      },
      {
        title: "Handle a model change as a second kind of drift",
        body: "The sweep above catches a definition that moved under a fixed model. The opposite case is a byte-identical agent running on a new model — effectively an untested redeploy of the whole surface. A detected model change re-runs the agent's eval and classifies the result as unchanged, clean, regressed, or not measurable. A regression is strictly a lower score across two numbers that both exist; a comparison against nothing is not a regression, and an unknown baseline is not treated as a change at all.",
        decision:
          "Whether a model change is allowed to reach production before the re-run completes.",
        trap: "Reading \"not regressed\" as \"fine\" when one of the two numbers was missing.",
      },
      {
        title: "Do something specific with not measurable",
        body: "Not measurable is one of three verdicts and it is not a pass. At a gate it is a refusal. Everywhere else it means an instrument went unread, and there are only two honest responses: write the missing battery, or record in the pack that this function is not eligible for promotion. Either is defensible. Leaving it undecided is the one option that is not.",
        decision: "Which of the two responses applies, recorded against the agent by name.",
        trap: "A dashboard that groups not-measurable with passed because neither of them is red.",
      },
      {
        title: "Keep the not-attested list with the receipt",
        body: "A conformity receipt names what was attested. The honest packs also name what was not — a claim scored over an empty sample is reported as not attested rather than quietly counted as clean. An evidence pack with no not-attested section is incomplete, because it cannot tell a reader the difference between a clean result and an unexamined one, and that difference is usually the question being asked.",
        decision:
          "Whether an unattested claim blocks go-live or is accepted with a compensating control — decided per claim, in writing.",
        trap: "Publishing coverage as a percentage without saying where the denominator came from.",
      },
    ],
    notCovered: [
      "Red-team methodology. A harness exists in the platform and nothing in production calls it today, so this playbook will not describe one as if it ran.",
      "General model evaluation or benchmark scores. These batteries probe one agent against one stated boundary and say nothing about a model in general.",
      "Independent attestation. No framework certification is held; what this produces is your own evidence, assembled to be checkable.",
      "Prompt engineering. The pack records the instructions verbatim; it does not teach you to write them.",
      "Any comparison of these batteries with another vendor's evaluation approach.",
    ],
  },

  // ——————————————————————————————————————————————————————————————————————————————————————————————
  {
    slug: "connector-readiness-playbook",
    title: "Modelled or Live: the connector decision",
    desc: `A seam-by-seam decision made before anyone asks for a credential — which of the ${factValue(
      "connectors",
    )} registered connectors must be live for your first workflow, which can stay modelled on purpose, and what a grant actually commits you to.`,
    audience: "Integration owners, enterprise architects",
    delivery: "outline-on-this-page",
    outcome:
      "A decision record per seam — live, modelled, or not at all — carrying the declared operations, the consequential ones, the grant approver and the credential owner, written down before the build starts.",
    accent: "#46cdd6",
    steps: [
      {
        title: "Say which tier each seam is in, out loud",
        body: `The connector surface has three tiers and they are not interchangeable. ${factValue(
          "connectors",
        )} connectors are registered and callable on the fabric. A separate curated catalog holds enterprise systems as declared seams that do nothing at all until credentials and an approved grant exist. A third tier bridges MCP servers and exposes the platform as one. Registered and callable is still not the same as live: connectors ship as deterministic modelled adapters and reach an external system only once an endpoint and credentials are wired. The governance is identical either way; the connection is not.`,
        decision:
          "The tier, and the live-or-modelled status, of every seam your first workflow touches.",
        trap: "Reading a familiar system's name on a list as evidence that it is connected.",
      },
      {
        title: "Declare the operations before you ask for a credential",
        body: "A connector is authored as a typed manifest — an id, a category, and each operation with its typed arguments and whether it is consequential. The declared operations are the scopes a grant can be drawn from, so least privilege is a property of the declaration rather than something a review has to impose afterwards. Doing this first also makes the security conversation concrete: you are asking for named operations, not for access to a system.",
        decision: "The operation list per seam, written before the credential request goes out.",
        trap: "Requesting broad access and promising to narrow it later. Later does not arrive.",
      },
      {
        title: "Mark the consequential operations yourself",
        body: "An operation forces a human approval if the connector declared it consequential, or if the leading verb of its name is one the platform recognises as dangerous — send, publish, pay, refund, transfer, ship, delete, approve and a long list of their kin. The corollary is the one worth repeating to your team: an operation whose name carries none of those verbs is not auto-gated. If yours commits something and its name does not say so, declare it consequential rather than relying on the verb list to notice.",
        decision:
          "Which operations you declare consequential over and above what the verb check catches.",
        trap: "Trusting a name check to catch a commitment hiding behind a neutral name.",
      },
      {
        title: "Prove the manifest in the sandbox before any account exists",
        body: "A manifest can be exercised against a deterministic, side-effect-free adapter that validates arguments against the declaration. That moves the integration test that matters — does this seam's shape actually work — ahead of procurement, ahead of credentials, and ahead of an outage window. Wiring the real endpoint becomes the last step rather than the first.",
        decision: "Who signs off the sandbox run, and what evidence it leaves behind.",
        trap: "Blocking the whole integration on a credential you did not need until much later.",
      },
      {
        title: "Decide live versus modelled on four questions",
        body: "One: does the workflow's commitment cross this seam, or only its context? Two: can you obtain a credential scoped as narrowly as the declared operations? Three: is the external system a record you will write to, or one you read from? Four: who owns the outage when it is down? If the commitment stays inside the platform and the seam only supplies context, modelled is a legitimate destination for the first release rather than an unfinished one.",
        decision: "The status of each seam at go-live, recorded with the reason beside it.",
        trap: "Treating modelled as temporary by default. Some seams should stay modelled, and saying so early avoids a credential nobody needed and an owner nobody found.",
      },
      {
        title: "Budget for the grant as an approval, not a setting",
        body: "Granting an app scoped access to a connector is a governed action requiring a human approval, and connecting a stored credential is approved separately. Revocation and disconnection are immediate and ungated, because reducing access should never wait in a queue. On the governed path, asking for an operation the connector does not expose is refused by the scope check before any credential is involved — and a grant recorded outside that path can still carry a stale operation, which is why the registry reports those grants to a human instead of assuming they cannot exist.",
        decision: "Who approves grants, and when the grant review happens relative to go-live.",
        trap: "Auditing grants after go-live. The stale-operation review is a pre-launch task, not a hygiene sweep.",
      },
      {
        title: "Keep credentials out of the agent entirely",
        body: "An agent, a prompt or a stored setting carries a reference rather than a secret. The value is unsealed at the tool boundary for the duration of one call, only under its own connector's id, and only after the scope check has passed — so a denial cannot be turned into a way to read a secret, and a key stored for one connector cannot be resolved through another. Errors are scrubbed before they reach a log or a caller. The process consequence: rotation is a vault operation rather than a redeploy.",
        decision: "Who owns each credential, and what the rotation cadence is.",
        trap: "A credential pasted into an agent's instructions during a hurry. No mechanism can retract that.",
      },
      {
        title: "Read the audit as keys, and plan your evidence around it",
        body: "A call, a denial and an error each land on the append-only, hash-chained log with the operation name and the argument keys — never the argument values, because connector arguments carry personal data and secrets and the log is not editable afterwards. That is a deliberate trade: you get tamper-evident evidence that a call happened and what shape it had, not a copy of its contents. Design your troubleshooting around that before an incident does it for you.",
        decision:
          "Where your payload-level troubleshooting data lives, given that the chain will not hold it.",
        trap: "Planning to reconstruct an incident from the audit payloads. They are keys.",
      },
      {
        title: "Check what is bound, not what is registered",
        body: "A connector no agent holds is not part of any workflow. The connectors page publishes a dated census of how many registered connectors are actually bound as agent tools and how many are reachable by API and held by no agent — read that rather than counting the catalog, and read it rather than counting from here, because a count copied onto a second page is a count that will one day disagree with itself. Connector certification deserves the same scrutiny: it is eval-gated and fingerprinted over the declared operations, so ask which eval earned it.",
        decision:
          "Which seams must be bound to an agent for your workflow to run at all, checked against the census.",
        trap: "Counting the registered list as the integrated list.",
      },
    ],
    notCovered: [
      "Vendor-specific API guidance. The manifest declares operations; the semantics on the far side belong to that vendor's documentation.",
      "Network topology, VPN and private-link design.",
      "A live-integration count you can quote. What is live depends on the credentials your operator wires, and the dated census on the connectors page is the only number that means anything.",
      "Data migration. A connector is a seam, not a load.",
      "Any claim about which systems other platforms do or do not reach.",
    ],
  },
];

export const PLAYBOOKS: Playbook[] = SOURCES.map(withDerived);

/** Lookup by slug, for a per-playbook route. Returns undefined rather than throwing. */
export const playbookBySlug = (slug: string): Playbook | undefined =>
  PLAYBOOKS.find((p) => p.slug === slug);

/** True when a written document actually exists behind the title. False for every entry today. */
export const hasWrittenDocument = (p: Playbook): boolean => p.delivery === "written-document";

/**
 * False today, and the page keys its copy off it. If this ever becomes true, the change that made it
 * true had better have shipped the document and the path that delivers it in the same commit.
 */
export const ANY_WRITTEN_DOCUMENT: boolean = PLAYBOOKS.some(hasWrittenDocument);

/** The card's primary action, derived — never "Email me the playbook" for a document that isn't. */
export const ctaLabelFor = (p: Playbook): string =>
  hasWrittenDocument(p) ? "Request the document" : "Read the playbook";

/**
 * What the form's success state is allowed to say. Derived from `delivery`, so the page physically
 * cannot promise an inbox for something nobody can send. This is the string that used to read "On its
 * way to your inbox — thank you" while the submit path ended at a lead record.
 */
export const confirmationFor = (p: Playbook): string =>
  hasWrittenDocument(p)
    ? "Logged — a person will send it to you directly."
    : "Logged, and thank you. There is no document to send: this playbook is the outline on this page, which is yours to read now. A person will reply about the walkthrough.";

/**
 * The page's own strings, kept here so the promise and the mechanism live in one file. Every one of
 * these replaces a string that told the visitor a document was coming.
 */
export const PLAYBOOK_PAGE_COPY = {
  heroSubtitle:
    "Practical, trust-first playbooks for adopting agents — the roadmap, governance, per-industry blueprints, FinOps, agent evidence and connector readiness. Published in full, free to read, no form in the way.",
  contentsHeading: "What the outline covers",
  outcomeHeading: "What you end up holding",
  notCoveredHeading: "What this deliberately does not cover",
  askOpenLabel: "Ask us to walk you through it",
  askIntro:
    "There is nothing to download — the whole playbook is above. If you would like a person to take you through it against your own workflow, leave your details and one of us will reply.",
  askSubmitLabel: "Ask for a walkthrough",
  privacyFootnote: "We only use your details to reply to this request and follow up once.",
} as const;
