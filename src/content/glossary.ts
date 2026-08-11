// content/glossary.ts — THE AGENTIC VOCABULARY, DEFINED AS THIS PLATFORM MEANS IT.
//
// WHY THIS FILE IS LONG. Forty pages of this site were rewritten to describe mechanisms instead of
// benefits, and the price of that decision is vocabulary: a reader now meets "governed writer",
// "payload fingerprint", "not measurable" and "modelled seam" on a product page with nowhere to look
// them up. This is that place. It is a reference surface, not a sales one — an entry is allowed to
// be boring, and is not allowed to be flattering.
//
// THE RULES, and why each exists (a future editor who deletes one of these will reintroduce a bug
// this site has already shipped once):
//
//  1. DEFINE THE TERM AS WE MEAN IT, AND FLAG WHEN THAT IS NOT THE INDUSTRY'S MEANING.
//     A large share of these are ordinary industry words used MORE NARROWLY here — an "agent" that
//     cannot write to a record is not one of ours. A glossary that quietly redefines a standard term
//     is worse than no glossary, because the reader carries our meaning back onto someone else's
//     page. ⇒ every entry carries `usage`; omitting it asserts "standard term, standard meaning".
//
//  2. NO PLATFORM COUNT IS HAND-TYPED, AND A COUNT WITH NO SOURCE DOES NOT GET WRITTEN AS A NUMERAL.
//     Every platform number below is interpolated from content/platform-facts.ts, or summed from the
//     same entries the product pages render (content/products.ts), or derived from content/
//     categories.ts and content/services.ts. Where a count is NOT in platform-facts.ts, the entry
//     names the mechanism and DROPS the numeral rather than typing it — an earlier draft of this
//     file stated this rule in the header and then broke it eight times in the body, which is worse
//     than never having stated it, because the header buys the reader's trust and the body spends
//     it. A glossary is also where a stale number survives longest, because nobody re-reads a
//     definition. If you want to publish a count that is not in platform-facts.ts, add it THERE
//     with its derivation first, then interpolate it here.
//     THE ONE CARVE-OUT, and it is narrow: a numeral whose members are enumerated in the same
//     sentence ("the three labels — enforced, declared, built-not-wired") is self-checking. A reader
//     can count them, and an editor who adds a fourth cannot miss the numeral sitting beside it.
//     `SPELLED_QUANTITIES` at the bottom of this file reads the rendered prose back and lists every
//     spelled quantity for a human to wave through, so the rule cannot rot silently again.
//
//  3. THE LIMIT LIVES INSIDE THE DEFINITION, NOT IN A FOOTNOTE. "Governed writer" without the
//     handlers that still bypass it, "Trust Mark" without the fact that the default agent
//     certification is a structural check, "Suspend switch" without the clause of it that cannot
//     fire in the shipped wiring, and "Residency" without "declared, not enforced" are each a
//     definition that the first engineer to read the code will contradict. A definition that
//     survives contact is worth more than one that impresses.
//
//  4. NO OUTCOME CLAIMS. NO COMPETITOR CLAIMS. Nothing here has been measured in a customer
//     environment, so no entry may say faster, cheaper, more accurate or lower-risk. And no entry
//     may say what another product cannot do — describe our own mechanism and stop.
//
//  5. NO UNQUALIFIED ABSOLUTE WITHOUT THE GUARD NAMED IN THE SAME SENTENCE. "The administrator role
//     does not bypass maker-checker" is allowed, because the check is in the approval gate. "Every
//     write is governed" is not, and the `Governed writer` entry says so out loud. "With no false
//     positives" is not either, however clean the run was, because a reader hears a property of the
//     classifier and the code measures a fixed corpus.
//
//  6. NO INTERNAL IDENTIFIERS. No file paths, no function names, no constant names. The one
//     deliberate exception is the K-series pillar codes, which appear in the product's own screens
//     and refusal text — so they get an entry that explains they are our numbering, not a standard.
//
//  7. A DEFINITION MAY NOT OUTRANK THE SURFACE IT SUMMARISES. A glossary entry is read as
//     authoritative precisely because it is short. Where the Academy page publishes a limit, where a
//     product page carries a qualifier, where the control plane's wiring is narrower than the
//     mechanism it implements, the entry here carries that limit too. A four-word definition that
//     contradicts a page in the same section is the most expensive error shape on this site.
//
// SHAPE NOTE FOR THE PAGE. `category` is kept as the field name because pages/Glossary.tsx renders
// it; it now holds a SECTION of this glossary, which is a different thing from a product Category
// (Revenue · Service · Trade · Works · Compass). The section names are chosen so the two can never
// be confused. `usage`, `why`, `aka` and `see` are additive and optional — see the notes at the
// bottom of this file for what the page should do with them.

// NOTE ON IMPORTS. This file reads four content modules and adds no new dependency edge: it sits at
// the leaf, and nothing imports it back. content/categories.ts already reads `products` at module
// evaluation time, so keep that one-way edge one-way — if a future edit makes products.ts import
// categories.ts again, the two form a cycle and one of them evaluates against an uninitialised
// binding. Checked by bundling this file and executing it, not by reading it.
import { categories, categorizedAppSlugs, numberWord } from "./categories";
import { products } from "./products";
import { factValue } from "./platform-facts";
import { platformPillars, resourcePillars } from "./services";

// ——— Derived counts. Rule 2: nothing below this line types a platform number into prose. ————————

/** The ten apps that sit in a category — i.e. the suite, excluding the enterprise1 backbone. */
const SUITE = products.filter((p) => categorizedAppSlugs.includes(p.slug));

/** Agents declared across the suite apps, summed from the same entries the product pages render. */
const SUITE_AGENTS = SUITE.reduce((n, p) => n + (p.workforce?.registered ?? 0), 0);

/** Of those, how many the launch wave enables. Published beside the roster, never instead of it. */
const SUITE_LAUNCH_WAVE = SUITE.reduce((n, p) => n + (p.workforce?.launchWave ?? 0), 0);

/** "ten" — spelled, because these read as prose rather than as statistics. */
const SUITE_APPS = numberWord(SUITE.length);
const CATEGORY_COUNT = numberWord(categories.length);

/**
 * The pillars, counted from content/services.ts rather than typed. This said four here and five
 * everywhere else on the site for one draft, because Academy lives under Resources and this entry
 * listed only the Platform ones — while the `Academy` entry pointed the reader straight at it.
 */
const PILLAR_COUNT = numberWord(platformPillars.length + resourcePillars.length);

/**
 * insight1's source count, as a digit AND as a word, both from the one fact entry. The `Semantic
 * layer` definition refers back to it four times in the course of stating its unit and its edge, and
 * a back-reference typed as "eight" is a hand-typed count wearing a pronoun — it goes stale in
 * exactly the same way, one sentence after the interpolated one that would not.
 */
const INSIGHT_SOURCES = factValue("insightSourceApps");
const INSIGHT_SOURCES_WORD = numberWord(Number(INSIGHT_SOURCES));

// ——— Types ————————————————————————————————————————————————————————————————————————————————————

/**
 * The sections of this glossary, in reading order: the idea, then the write path (which is the
 * product), then how it is evidenced, then how it stays true, then how it is rolled out and run,
 * then what it reaches, then how your data is held, then how the suite is shaped, then how you buy.
 */
export type TermSection =
  | "The idea"
  | "The write path"
  | "Evidence"
  | "Grounding"
  | "Rollout and operations"
  | "The fabric"
  | "Tenancy and data"
  | "The shape of the suite"
  | "Working with us";

/**
 * Whose word this is. Rule 1 exists because the single most damaging thing a vendor glossary can do
 * is redefine a standard term without saying so.
 *   industry  — a standard term, used the standard way. (The default when `usage` is omitted.)
 *   narrowed  — a standard term we use more narrowly, or with a condition the industry does not imply.
 *   elan1     — our own word, or our own name for a mechanism. Do not expect it elsewhere.
 */
export type TermUsage = "industry" | "narrowed" | "elan1";

export interface Term {
  /** The headword. Also the anchor — see `termSlug`. */
  term: string;
  /** The definition, in plain English, as this platform means it. */
  def: string;
  /**
   * The section. Field name deliberately unchanged from the original interface so the existing
   * page renders without an edit; the VALUES are the sections above, not product categories.
   */
  category: TermSection;
  /** Whose word it is. Omitted ⇒ "industry". Never omit it on a term we bent. */
  usage?: TermUsage;
  /** One line of why it matters, or a concrete example from the suite. Optional by design. */
  why?: string;
  /** Other names a reader may arrive with, including retired headwords and pillar codes. */
  aka?: string[];
  /** Related headwords. Every entry here MUST match a `term` exactly — checked in dev below. */
  see?: string[];
}

/** Labels for the `usage` chip, so the page never has to invent wording for an honesty signal. */
export const USAGE_LABELS: Record<TermUsage, { label: string; note: string }> = {
  industry: {
    label: "Industry term",
    note: "A standard term, used the standard way.",
  },
  narrowed: {
    label: "Narrower here",
    note: "A standard term that carries a stricter condition on this platform than it does generally.",
  },
  elan1: {
    label: "Our word",
    note: "elan1's own term, or our own name for a mechanism. Do not expect to find it elsewhere.",
  },
};

/** The `usage` of a term, with the documented default applied. */
export const usageOf = (t: Term): TermUsage => t.usage ?? "industry";

// ——— The glossary ————————————————————————————————————————————————————————————————————————————

export const GLOSSARY: Term[] = [
  // ——— The idea ———————————————————————————————————————————————————————————————————————————————
  {
    term: "Agent",
    category: "The idea",
    usage: "narrowed",
    def: `A typed spec that pursues a goal, picks tools, and writes to a record; on elan1: ${SUITE_APPS} apps have ${SUITE_AGENTS} declared, ${SUITE_LAUNCH_WAVE} enabled.`,
    why: "Narrower than industry standard—must write to be governed.",
    see: ["Blueprint", "Autonomy tier", "Governed writer"],
  },
  {
    term: "Agentic transformation",
    category: "The idea",
    def: "Adopting agents as an operating layer where work, record, and control move together.",
    why: "Each function enabled with its own gate.",
    see: ["Wave rollout", "Discovery Sprint"],
  },
  {
    term: "Copilot",
    category: "The idea",
    usage: "narrowed",
    def: "Assistive surface: reads, suggests, proposes; a person decides. Either advisory or acts-through-gate.",
    why: "No middle ground for unguarded writes.",
    see: ["Advisory", "Agent"],
  },
  {
    term: "Advisory",
    category: "The idea",
    usage: "elan1",
    def: "Recommends, never acts; enforced at build time, no control-system connectors.",
    why: "Control comes from reach, not opinion.",
    see: ["Blueprint", "Content hash"],
  },
  {
    term: "Autonomy tier",
    category: "The idea",
    usage: "elan1",
    def: "Declared level: autonomous (log/enrich/note), one-tap (lightweight confirm), or human-led. Tier is metadata; what gates action is spec's flag plus policy. At every level, consequential actions stay human-approved.",
    why: "Autonomy granted by people, bounded by spendable budget, never on consequential end.",
    see: ["Consequential action", "Human approval gate"],
  },
  {
    term: "assistant1",
    category: "The idea",
    usage: "elan1",
    def: "Governed central assistant: screens for injection, grounds in your records, drafts consequential requests for owning apps. Proposers exist in sales1, people1, finance1; everything else read-only.",
    why: "Platform citizen, not suite app—blocks side doors around controls.",
    see: ["Prompt-injection screen", "Cite-or-refuse", "Governed writer"],
  },
  {
    term: "The pillar codes (K1–K8)",
    category: "The idea",
    usage: "elan1",
    aka: ["K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8"],
    def: "elan1's shorthand for core pillars: identity, agent/model runtime, connectors, skills, approval gate, audit chain, governance, metering (K1–K8 in order).",
    why: "Our numbering, not a standard; surfaces in screens and refusals.",
    see: ["Human approval gate", "Hash-chained audit"],
  },

  // ——— The write path —————————————————————————————————————————————————————————————————————————
  {
    term: "System of record",
    category: "The write path",
    def: `Durable, typed store an app owns; platform registers ${factValue("systemsOfRecord")} behind governed writers, holding ${factValue("objectTypes")} typed types.`,
    why: "Owning the record enables gating, recomputing, auditing.",
    see: ["Governed writer", "Computed at read", "Semantic layer"],
  },
  {
    term: "Governed writer",
    category: "The write path",
    usage: "elan1",
    def: "Single path for writes: identity, policy, human approval (if consequential), write, audit entry. Same path for person, agent, or app.",
    why: "No write is governed means direction of travel, not current state.",
    see: ["Consequential action", "Immediate write", "Composition"],
  },
  {
    term: "Consequential action",
    category: "The write path",
    usage: "narrowed",
    def: "Action whose effect requires human decision: money, outbound messages, commits, access widening. Declared by writer/spec/connector or derived from verb list (send, publish, pay, refund, capture, transfer, ship, delete, approve).",
    why: "Known-open gaps published rather than hidden.",
    see: ["Human approval gate", "Immediate write", "Policy tag", "Idempotency key", "Connector"],
  },
  {
    term: "Immediate write",
    category: "The write path",
    usage: "elan1",
    def: "Governed write without human stop; passes policy and audit but not consequential.",
    why: "Governed and gated are different controls.",
    see: ["Governed writer", "Consequential action"],
  },
  {
    term: "Human approval gate",
    category: "The write path",
    usage: "narrowed",
    aka: ["Human-in-the-loop", "HITL", "K5", "maker gate"],
    def: "Control point for consequential action: request with payload, named person approves/rejects, action executes only then. No auto-approve; missed deadline escalates.",
    why: "Self-opening gate silently converts backlogs to unreviewed action.",
    see: ["Approval token", "Maker-checker (segregation of duties)"],
  },
  {
    term: "Approval token",
    category: "The write path",
    usage: "elan1",
    def: "Single-use permission bound to exact action and content-hash fingerprint of reviewed payload; consumed once.",
    why: "Payload hash makes approval evidence about one write, not permission for roughly-the-same action.",
    see: ["Content hash", "Human approval gate"],
  },
  {
    term: "Maker-checker (segregation of duties)",
    category: "The write path",
    aka: ["SoD", "four eyes", "segregation of duties"],
    def: "Flagged approval: requester cannot be approver; refusal names both. Admin does not bypass—it's a control, not a permission.",
    why: "Finance1: drafter cannot approve. Service1: refund posts to finance1 and stops at its maker-checker gate.",
    see: ["Human approval gate", "Cross-app saga"],
  },
  {
    term: "Idempotency key",
    category: "The write path",
    def: "A caller-supplied key that makes a repeated request execute once. On the wire, a request header is read at the one chokepoint every governed consequential action passes through, so a client re-posting after a timeout gets the stored prior result rather than a second execution. In the apps it is a precondition: finance1 blocks a money action with no key outright, and supply1 refuses a purchase-order submit without one — a replay returns the original receipt and orders nothing.",
    why: "A request still waiting for approval was never recorded as executed, so a re-post during the pending window behaves as a fresh request. Without the header the mechanism is inert and behaviour is unchanged.",
    see: ["Consequential action"],
  },
  {
    term: "Policy tag",
    category: "The write path",
    usage: "narrowed",
    def: "A label an agent spec or a writer attaches to an action. At run time each tag resolves to a registered policy that can allow it, route it to a human, or block it. The load-bearing part is the tag nobody registered: it routes to a human rather than passing — an unregistered policy tag must never silently grant autonomy — and a boot-time check catches unregistered tags in a deployment as a second line.",
    why: "This is the failure mode that would otherwise be invisible. An agent declaring a consequential tag a deployment forgot to wire would run unsupervised, and nothing on any screen would look wrong.",
    see: ["Governance signature", "Consequential action"],
  },
  {
    term: "Governance signature",
    category: "The write path",
    usage: "elan1",
    aka: ["K7"],
    def: `A named, enforceable policy set applied by the core rather than bolted on — clinical safety, approved-vendor-only, segregation of duties, separation of operational technology from IT. The platform registers ${factValue("governanceSignatures")} of them: one per vertical, per suite app and per control-plane surface. Where a pack has one, its agents derive their policy tags from it rather than hand-writing them, so signature and agent cannot drift apart. A signature is also where an app declares the eval sets its Trust Mark is scored against.`,
    why: "health1's care advisor takes its policy tags from the health1 signature. sales1's is written down as \"the agent proposes, a human commits\".",
    see: ["Policy tag", "Industry pack"],
  },
  {
    term: "Refusal string",
    category: "The write path",
    usage: "elan1",
    def: "The exact sentence the platform returns when it declines to do something, quoted verbatim across this site rather than paraphrased. \"no autonomous money — a payment is human-approved.\" \"no active patient consent — a clinical record requires consent.\" \"release exceeds the remaining commitment — refusing to over-commit.\"",
    why: "We quote refusals instead of counting them: three independent attempts to total them produced three different numbers, so the count has no agreed definition and no business on a public page. A refusal you can read proves more than a total you cannot check.",
    see: ["Governed writer", "Wedge"],
  },

  // ——— Evidence ———————————————————————————————————————————————————————————————————————————————
  {
    term: "Hash-chained audit",
    category: "Evidence",
    aka: ["K6", "audit trail", "audit chain"],
    def: "An append-only log, per tenant, in which each event's hash is computed over its own fields including the previous event's hash. Verification recomputes the chain rather than displaying a stored verdict, so any change to a recorded event is detectable. The trail records field keys, decisions and hashes rather than raw values, which is what lets an erasure request and an unalterable log coexist.",
    why: "An audit log is only evidence if it cannot be edited, trimmed or quietly re-rooted. This one is defended at the data layer, not by convention — see the next entry.",
    see: ["Append-only trigger", "Erasure", "Run trace"],
  },
  {
    term: "Append-only trigger",
    category: "Evidence",
    usage: "elan1",
    def: "The reason the audit chain is more than a convention. A database trigger raises on UPDATE and DELETE against the audit table — including for the table owner — and the storage interface exposes no update or delete method at all. A uniqueness constraint on the tenant and the predecessor hash means only one event can chain off a given event, so the chain cannot fork; a concurrent writer that would have forked it gets a surfaced error instead of silently corrupting the record.",
    why: "Deletion is not a permission somebody can be granted. And because the trigger is correct and applies to everyone, damage that predates a fix cannot be repaired away — it is declared instead, with a frozen digest over the exact observed break, so adding damage, removing damage or hiding a real tamper inside that window all stop the digest matching.",
    see: ["Hash-chained audit"],
  },
  {
    term: "Trust Mark",
    category: "Evidence",
    usage: "elan1",
    def: "An evidence-gated certification a subject earns by passing an eval battery. Minting one is a single guarded path, and it refuses four ways: an eval run it cannot find, a run that scored zero cases, a run that did not pass, and a run belonging to another tenant. The mark records the model its evidence was scored under, so when the runtime moves to a different model the mark reads stale rather than certified — a score is evidence about the model it ran on.",
    why: "Read the depth honestly. The default agent certification is a structural declaration check; a behaviour battery that probes what the model actually says covers a named handful of agents rather than the whole roster, and the console reports which kind of check a badge rests on instead of calling one the other.",
    see: ["Eval battery", "Not measurable", "Auto-revocation", "Coverage register"],
  },
  {
    term: "Eval set",
    category: "Evidence",
    def: "One scored dimension of a subject's behaviour — grounding, safety, fairness — made of cases with an expected result. A set carries one or more cases, and the case is the scored unit, which is why a product page quotes both and never one as the other. A set can be authored as data from a small declarative vocabulary of checks (contains, equals, non-empty, minimum length, maximum count, is-true, a regular expression, or a natural-language judge), and one that cannot run is refused at publish rather than shipped: no assertions, an unknown check, a missing value, or a judge criterion with no grader wired.",
    why: "The vocabulary is deliberately tiny. An authoring language rich enough to express anything is rich enough to express a check that silently cannot fail.",
    see: ["Eval battery", "Not measurable"],
  },
  {
    term: "Eval battery",
    category: "Evidence",
    usage: "elan1",
    def: "The named eval sets an app's Trust Mark is scored against. Each app declares its own in the platform's governance signature; at run time the sets are flattened into individual cases, and the verdict is taken over the cases that could actually be measured on that tenant. A case with no evidence behind it is reported not-measurable and excluded from the verdict — never counted as a pass — and the conformity receipt names every claim it did not attest. The battery is also not the only gate: a mark is refused for an eval run that scored zero cases, one that did not pass, or one belonging to another tenant, and re-verification revokes a mark whose battery no longer passes.",
    why: "Per-app set and case counts belong on each product page, rendered from the registry, rather than restated in a definition nobody re-reads. And a battery in which nothing could be measured did not pass. It did not run.",
    see: ["Eval set", "Not measurable", "Auto-revocation"],
  },
  {
    term: "Not measurable",
    category: "Evidence",
    usage: "elan1",
    def: "The third eval state, beside pass and fail. A case with nothing to score reports \"not measurable — insufficient evidence on this tenant (this is NOT a pass)\", and it is the platform's answer wherever an absence could otherwise read as a clean result: an agent with no behaviour battery after a model change, a control with no automated evidence, a recovery panel with no drill receipt, a safety eval over an output that carried no prose at all.",
    why: "This is the most load-bearing idea in the assurance layer. An empty battery is not evidence, and a green tick that means \"we did not look\" is worse than a red one — it is indistinguishable from a real pass.",
    see: ["Eval battery", "Coverage register", "Ungrounded"],
  },
  {
    term: "Drift",
    category: "Evidence",
    usage: "narrowed",
    def: "A certified subject whose content hash no longer matches the hash it was certified at — an agent's definition, a skill's body, a connector's declared operations, the grounding corpus, or a composed pack. Drift is also what a control-evidence check reports when a control that passed last week fails today.",
    see: ["Content hash", "Auto-revocation"],
  },
  {
    term: "Auto-revocation",
    category: "Evidence",
    usage: "elan1",
    def: "A scheduled sweep re-verifies certified agents, skills, connectors, the grounding corpus and composed packs against the hashes they were certified at, and against a fresh eval where one applies. A subject that drifted or no longer passes has its Trust Mark revoked; a subject whose check raises is counted as errored rather than aborting the sweep. Revocation is soft, so the audit keeps the history and a later passing eval can re-issue, and withdrawing a mark is itself a governed action that queues for a human signature.",
    why: "A mark must not outlive a passing re-check. A model upgrade is treated as an untested deploy for the same reason — every agent's behaviour changes on unchanged code — so a lower score revokes the mark and demotes that agent's autonomy, both on the record.",
    see: ["Trust Mark", "Drift", "Model routing"],
  },
  {
    term: "Adversarial battery",
    category: "Evidence",
    usage: "elan1",
    def: "A fixed corpus of paraphrase, synonym and obfuscation attacks run through the platform's own classifiers, scored on block rate and false-positive rate together — so a guard that blocks everything fails as surely as one that blocks nothing. Where a vertical declares a safety dimension, a mark is refused unless the classifier blocks every attack in that corpus while still admitting the legitimate messages the same corpus carries, and declaring a dimension that cannot be tested is itself a refusal rather than a pass.",
    why: "Read the denominator with the result. It is a fixed corpus, not a population: \"nothing in this corpus was mis-flagged\" is what the guard measures, and that is a weaker statement than \"no false positives\" — which is not a claim this site makes. The floor is applied at the moment a mark is minted; what re-verification re-runs afterwards is the battery's own case rather than the whole corpus. The console also says whether the classifier under test was the deterministic guard or a live model, instead of calling one the other.",
    see: ["Trust Mark", "Prompt-injection screen"],
  },
  {
    term: "Coverage register",
    category: "Evidence",
    usage: "elan1",
    def: "The list of every subject that ought to hold a Trust Mark, with its state — certified, drifted, revoked, stale against the running model, or never scored — and the cases behind each, computed at read from the roster, the mark store and the eval store. Nothing is stored and nothing is capped. Uncertified is reported as unknown, not as failing, and the assurance advisor counts itself in the denominator.",
    why: "An improvement queue has no denominator: an empty one and an estate where nothing was ever measured look identical.",
    see: ["Not measurable", "Trust Mark"],
  },
  {
    term: "Control state (enforced · declared · built, not wired)",
    category: "Evidence",
    usage: "elan1",
    def: "The three labels this site puts on every enterprise control, so a capability is never read as an enforcement it is not. Enforced — there is code on the live path, and something breaks if you remove it. Declared — the rule is implemented and exercised, but no production path consults it yet. Built, not wired — the logic exists behind a port and nothing in production calls it, so what is missing is a mount, an adapter or a credential rather than new engineering.",
    why: "If a control on your requirements list reads declared or built-not-wired, treat it as scope to agree in writing rather than a switch to flip — and hold us to that. The three labels also apply inside a single mechanism: a control can be enforced in one clause and unwired in another, which is exactly the case for the suspend switch.",
    see: ["Live · modelled · declared", "Residency", "Suspend switch"],
  },

  // ——— Grounding ——————————————————————————————————————————————————————————————————————————————
  {
    term: "Grounded",
    category: "Grounding",
    usage: "narrowed",
    def: "An answer or a figure derived from your own records at the moment it is given, carrying the source it came from. Grounding here is not a prompt instruction — it is a statement about where the number came from: a claim cites the record it rests on, and a figure is recomputed from the book it claims to summarise.",
    see: ["Ungrounded", "Computed at read", "Cite-or-refuse", "Self-verification judge"],
  },
  {
    term: "Ungrounded",
    category: "Grounding",
    usage: "elan1",
    def: "A named state rather than an error. Where a figure cannot be computed the platform returns no value and a stated reason instead of a plausible number; an alert on a metric that will not compute records itself ungrounded and notifies nobody; a disbursed loan with no repayment schedule behind it is reported ungrounded and excluded from both sides of the ratio rather than counted as healthy.",
    why: "The failure this prevents is the quiet one. A metric assembled from a field nobody populates is a zero wearing a metric's name.",
    see: ["Grounded", "Not measurable"],
  },
  {
    term: "Computed at read",
    category: "Grounding",
    usage: "elan1",
    def: "A number derived from the records every time it is asked for, rather than kept in a counter that somebody has to remember to update. Win rate, first-response time, days-past-due and the loan classification that follows from it, stock cover, sell-through, an agent scorecard joined from a survey to the case's assignee — computed, not stored.",
    why: "A stored figure is correct at write time and silently wrong the next morning. A computed one cannot disagree with the book it summarises, and it can disclose the sample it rests on.",
    see: ["Grounded", "Semantic layer", "System of record"],
  },
  {
    term: "Cite-or-refuse",
    category: "Grounding",
    usage: "elan1",
    def: "Answer only from what was retrieved, cite every claim, and say so where the knowledge does not support an answer. In service1 the answering agent's entire tool grant is the knowledge seam, so it can retrieve and cannot act on a record. In assistant1 it is a screened path rather than a prompt instruction, and an answer that cannot be grounded is declined rather than produced.",
    see: ["Grounded", "assistant1"],
  },
  {
    term: "Self-verification judge",
    category: "Grounding",
    usage: "elan1",
    def: "A judge pass that runs before a write-back: does this update match the transcript, is this draft factual, on brand and inside policy. Pass and the draft continues to the governance gate; fail and it is regenerated with the critique and retried a bounded number of times; still failing and it escalates to a human. An unverified write-back is never auto-committed. Where a real judge is wired, a consequential draft is checked even if its agent never opted in — so a high-autonomy spec cannot carry an unchecked draft into the approval queue.",
    why: "The honest part is in the audit row. The default judge is a no-op that passes, so the record stores whether a judge actually ruled separately from whether it passed — \"passed\" must not be able to mean \"nothing ran\".",
    see: ["Not measurable", "Consequential action"],
  },
  {
    term: "Semantic layer",
    category: "Grounding",
    def: `One governed definition per metric, held over the record stores of ${INSIGHT_SOURCES_WORD} sibling apps — sales1, service1, finance1, supply1, people1, market1, project1 and commerce1 — so the dashboard, the board pack and an agent's answer resolve to the same source instead of several spreadsheets sharing a name. Read the unit precisely: those are ${INSIGHT_SOURCES_WORD} sibling record stores, and not ${INSIGHT_SOURCES_WORD} of the ${factValue("systemsOfRecord")} registered systems of record counted elsewhere on this site. All but one of them sit in that registered set; the exception, sales1's CRM, runs on its own core store. State the guard's edge with it, too: a metric naming a source app outside that set is refused when it is saved, while a metric saved naming no source app at all passes that particular check — the refusal that matters then falls at compute time, where a value that cannot be derived comes back as no number and a stated reason.`,
    why: "insight1 publishes; it never pays. It holds no write access to a sibling's system of record — its own grants are its analytics store and a send-only email seam — and where a finding needs an action it proposes into the owning app's own approval queue rather than writing there itself. Publishing a number to an audience that will act on it is the consequential action in that app, and it is human-approved.",
    see: ["Computed at read", "System of record", "Category"],
  },
  {
    term: "Illustrative figure",
    category: "Grounding",
    usage: "elan1",
    def: "A number produced for planning or demonstration rather than measured. This site labels them, and the platform enforces the label: a seeded demonstration figure is wrapped in a type that raises rather than render, and a payload carrying one is refused at the boundary.",
    why: "Nothing on this site is a measured customer outcome. There is no faster, cheaper or more accurate here, because nobody has measured it in your environment.",
    see: ["Band", "Rate card"],
  },
  {
    term: "Prompt-injection screen",
    category: "Grounding",
    def: "A classifier — the same engine the rest of the platform uses, not a prompt rule — that checks every inbound message for attempts to override an agent's instructions and refuses them as they arrive rather than logging them for later. The classifier is deterministic rather than a model call, and the console labels it that way. assistant1 carries its own eval-gated Trust Mark with an adversarial floor over it: certification is refused unless that same classifier — the one screening live traffic — blocks every attack in the platform's red-team corpus, paraphrases and spaced obfuscations included, while still admitting the legitimate questions that corpus carries alongside them. Scope it honestly: the full-corpus floor is applied at the moment a mark is minted, and what re-verification re-runs afterwards is the battery's own injection case rather than the whole corpus.",
    why: "Free text is the platform's most exposed surface, which is why it is screened first and screened in the platform rather than in the chat window — a channel going live changes the transport, not the governance. A live check recomputes two invariants over running state, how many action paths are ungated and how many answer paths are unscreened, and fires a canonical jailbreak at the classifier on each read, so a classifier that quietly stopped working fails the battery rather than passing it.",
    see: ["Adversarial battery", "assistant1"],
  },

  // ——— Rollout and operations —————————————————————————————————————————————————————————————————
  {
    term: "Wave rollout",
    category: "Rollout and operations",
    usage: "narrowed",
    aka: ["staged enablement", "enabled set", "X2", "wave gate"],
    def: `Agent functions are turned on per tenant, one at a time, by an audited admin action. A function outside a tenant's enabled set is refused before it acts — the app and the tenant are named in the refusal — and the blocked run is written to the audit chain. The baseline wave enables ${factValue("agentsEnabled")} of the ${factValue("agentsRegistered")} functions in the registry; the remainder are deliberately off, not missing.`,
    why: "This is what makes a roadmap enforceable. \"Not this wave\" becomes a state the control plane holds rather than a bullet in a deck — and it is the only version of widening that can also be rolled back.",
    see: ["Launch wave", "Suspend switch"],
  },
  {
    term: "Launch wave",
    category: "Rollout and operations",
    usage: "elan1",
    def: `The suite's opening enablement: of the ${SUITE_AGENTS} agents declared across the ${SUITE_APPS} suite apps, ${SUITE_LAUNCH_WAVE} are enabled. The product pages publish both numbers side by side.`,
    why: "Quoting only the roster would imply the whole workforce runs on day one, and would give away the control. Quoting only the wave would undersell the app.",
    see: ["Wave rollout"],
  },
  {
    term: "Suspend switch",
    category: "Rollout and operations",
    usage: "elan1",
    aka: ["kill-switch", "incident stop"],
    def: "One admin action that stops an app's entire agent fleet. It is immediate — an incident stop does not wait in an approval queue — and non-destructive: the enabled set is preserved, so resuming restores the exact prior wave. It survives a restart, and it is written to the hash-chained audit. Lifting it widens access again, so lifting it needs a human approval.",
    why: "It overrides the enabled set rather than editing it, which is the difference between stopping an incident and losing your rollout. Now the edge, because this is the kind that gets assumed rather than checked: what the switch stops is the agent fleet. A generic governance rule that would additionally refuse a suspended app's own direct system-of-record writes exists in the core — but the composition that runs in production registers that rule without the rollout reference its clause needs, so the clause cannot fire as wired today, and only a test supplies it. Read the switch as a stop on the agents, and verify the direct write path separately rather than inferring it from the stop.",
    see: ["Wave rollout", "Governed writer", "Control state (enforced · declared · built, not wired)"],
  },
  {
    term: "Rate card",
    category: "Rollout and operations",
    usage: "elan1",
    aka: ["K8", "FinOps", "metering"],
    def: "The platform's own per-model price list, used to compute what a run on the governed runtime cost rather than trusting a model's self-report — per tenant, per app, with prompt-cache reads and writes priced as separate parts of the prompt. A model with no rate-card entry is logged and counted as unpriced instead of quietly costing zero.",
    why: "The gap in the number is visible inside the number. Cost figures here are illustrative, and they are not billing advice.",
    see: ["Run trace", "Illustrative figure"],
  },
  {
    term: "Run trace",
    category: "Rollout and operations",
    usage: "elan1",
    def: "Every agent run with its status, model, latency and priced cost, and — on opening one — its own chain of audit events. The trace and the governance record are the same record; there is no second log to reconcile against. Runs and cost are read from durable stores, so the figures do not reset when a process restarts, and reliability is counted over the whole ledger rather than over the page that was fetched.",
    see: ["Hash-chained audit", "Rate card"],
  },
  {
    term: "Model routing",
    category: "Rollout and operations",
    usage: "narrowed",
    aka: ["K2", "model policy"],
    def: "Choosing a model tier per task rather than sending everything to the largest one, with a per-tenant allow-list a deployment can set (opt-in: a tenant that configures no list is unrestricted). A change of model is not a neutral swap — a Trust Mark records the model its evidence was scored under, a certified agent's battery is re-run against the model the runtime would actually use, and a lower score revokes the mark and demotes that agent's autonomy.",
    why: "A model swap is the one deploy where nothing in the codebase changed, so it is treated as an untested one. A read-only behaviour diff shows a person the per-case difference before anything is promoted.",
    see: ["Trust Mark", "Auto-revocation"],
  },

  // ——— The fabric —————————————————————————————————————————————————————————————————————————————
  {
    term: "Seam",
    category: "The fabric",
    usage: "elan1",
    def: "Our word for a typed, governed boundary to a system. A seam declares its operations and their arguments; a caller resolves to a scoped handle bound to its tenant and grant rather than the raw connector; policy is evaluated on a consequential operation; and the operation name and its argument keys — never the values — are written to the hash-chained audit. All of that is real whether or not a live endpoint sits on the other side, which is why the next entry exists.",
    see: ["Live · modelled · declared", "Connector"],
  },
  {
    term: "Live · modelled · declared",
    category: "The fabric",
    usage: "elan1",
    def: "The three honest states of a seam, used on every product page. Live — it reaches a real external endpoint, once one is configured. Modelled — a deterministic adapter carrying the real interface and real logic, with no external call. Declared — typed and known, and doing nothing at all until credentials and an approved, scoped grant exist.",
    why: "Registered and callable is not the same as connected. Connectors ship as modelled adapters and reach an external system only once credentials and a base endpoint are wired, and the assistant channel connectors record a send rather than dispatching one in this build. The governance is identical either way. The connection is not.",
    see: ["Connector", "Control state (enforced · declared · built, not wired)"],
  },
  {
    term: "Connector",
    category: "The fabric",
    usage: "narrowed",
    aka: ["K3", "MCP connector"],
    def: `A registered seam to a system, declaring each operation with its typed arguments. The fabric holds ${factValue("connectors")} that are registered and callable — the native CRM record, plus ERP, helpdesk, HR, project, inventory, supplier, commerce, marketplace, warehouse, e-procurement and payments, the health and banking interop seams, and the channel and knowledge seams. Beyond them sit a credential-gated catalog of enterprise systems and data platforms, and a bridge into the MCP ecosystem.`,
    why: "Deliberately not published as a larger number. An earlier figure counted catalog entries that require credentials and an approved grant before they do anything, which is a claim about a library rather than about what the runtime can invoke.",
    see: ["Seam", "MCP (Model Context Protocol)", "Connector grant"],
  },
  {
    term: "MCP (Model Context Protocol)",
    category: "The fabric",
    def: "The open protocol for exposing tools and data to a model. elan1 speaks it in both directions: it consumes MCP servers as tool sources under the same least-privilege and audit envelope as the rest of the fabric, and it publishes itself as a governed MCP server. A caller over the wire sees only the tools its grant covers, reads flow freely inside scope, and a consequential tool comes back as an error requiring approval.",
    why: "An external client cannot self-approve over the wire. The gate lives in the platform rather than in the protocol.",
    see: ["Connector", "Connector grant"],
  },
  {
    term: "Connector grant",
    category: "The fabric",
    usage: "elan1",
    def: "A scoped subset of a connector's declared operations, given to an app. The grantable scopes ARE the declared operations, so on the governed path asking for one the connector does not expose is refused before a credential is involved. Granting is itself a human approval; revoking a grant or disconnecting a connector is immediate and ungated, because reducing access should never wait in a queue. The scope is re-checked at call time as well, and an ungranted call is written to the audit chain as a block with the granted set recorded beside it — so a denial is evidence rather than a silent no-op.",
    why: "A least-privilege review of the seeded grants found some holding an operation their connector does not expose. That is surfaced as a worklist item for a human rather than quietly corrected.",
    see: ["Connector", "Credential reference"],
  },
  {
    term: "Credential reference",
    category: "The fabric",
    usage: "elan1",
    def: "An agent, a prompt or a stored setting carries a reference of the form secret://<connector> and never the credential itself. The value is unsealed at the tool boundary, for the duration of one call, only under its own connector's id, and only after the scope check has passed — so a denial cannot be turned into a way to read a secret. Any credential a call did unseal is scrubbed out of error text before it reaches a log or a caller.",
    see: ["Connector grant", "Seam"],
  },
  {
    term: "Skill",
    category: "The fabric",
    usage: "elan1",
    aka: ["K4"],
    def: `A reusable, versioned, content-hashed unit of know-how an agent resolves by semantic-version range — a brand voice, a cadence rule, a qualification method, an industry constraint, a required disclosure. The platform publishes ${factValue("skills")} of them. Skills are shared with lineage rather than forked, so a rule has one place to change.`,
    why: "The publish gate refuses a shared skill that embeds a raw sensitive value, and refuses a body carrying an affirmative prompt-injection claim — because a skill is injected verbatim into every agent that resolves it.",
    see: ["Skill manifest", "Content hash"],
  },
  {
    term: "Skill manifest",
    category: "The fabric",
    usage: "elan1",
    def: "The typed declaration a skill ships as — its id, its version, its body, its scope and its lineage — held as a tracked file rather than as text somebody pasted into a field. The manifest is what gets hashed, and the hash is what a certification binds to.",
    see: ["Skill", "Content hash"],
  },
  {
    term: "Content hash",
    category: "The fabric",
    def: "A deterministic hash over an entity version's consequential fields — an agent's definition, a skill's body, a connector's declared operations, an approval's payload. It is the platform's single tamper-evident fingerprint, shared by the agent, skill, connector and pack registries.",
    why: "It is what makes a certification honest. A Trust Mark is bound to the hash of what it certified, so editing the definition revokes the mark rather than letting the mark outlive the thing it was about.",
    see: ["Drift", "Trust Mark", "Approval token"],
  },
  {
    term: "Blueprint",
    category: "The fabric",
    usage: "elan1",
    def: "The typed authoring shape an agent is written as in agent1 — name, instruction, model policy, tool grants, skills, policy tags — compiled into the same specification every agent on the platform has, with no app forked to hold it. The compiler can refuse: an advisory blueprint holding a control-system connector raises instead of building, and the vertical packs that ship bespoke agents run them through that guard every time they import.",
    why: "Consequence is derived from what the blueprint actually carries, not from whether the author remembered to tick a box.",
    see: ["Advisory", "Agent"],
  },

  // ——— Tenancy and data ———————————————————————————————————————————————————————————————————————
  {
    term: "Tenant isolation",
    category: "Tenancy and data",
    aka: ["K1", "row-level security", "RLS", "multi-tenancy"],
    def: "Each customer's data is separated by the database rather than by application code remembering to add a filter: row-level security, forced so the policy applies to the table owner too, keyed on a per-transaction setting taken from the request's verified identity. A tenant-scoped operation with nothing bound raises rather than running unscoped, so an unauthenticated or invalid request fails closed instead of returning rows.",
    why: "The same contract is provable against the in-memory adapter with no database running. Two independent mechanisms over one property, neither asked to be sufficient on its own — because an isolation test you can only run with infrastructure standing is a test that quietly stops being run.",
    see: ["Residency", "Erasure"],
  },
  {
    term: "Residency",
    category: "Tenancy and data",
    usage: "narrowed",
    aka: ["X3", "data residency", "localisation"],
    def: "Each tenant declares the region its data belongs to, and data is classified fail-closed: a field with no declared classification is treated as restricted and refused a cross-border read. Read the state precisely — platform-wide, residency is declared rather than enforced by routing. No production read path, connector or storage layer consults the router, and the platform runs single-region today, so there is no peer region a request could be served from. The trust surface publishes that as data, with the reason attached, so a console cannot render the declaration as an enforcement.",
    why: "One narrower mechanism does enforce a region, and it is a different control rather than a retraction of the sentence above: health1's interop connectors refuse any call originating outside the India region, on every operation, with cross-border clinical data named in the refusal. That is a per-connector guard on one pack's own seams. Read a residency requirement against the platform-wide state, and treat the connector guard as an exception you can point at rather than as the general case.",
    see: ["Control state (enforced · declared · built, not wired)", "Tenant isolation"],
  },
  {
    term: "PII by shape",
    category: "Tenancy and data",
    usage: "elan1",
    def: "A write path that refuses a field because of what its name looks like, rather than because somebody remembered to add it to a list. The matcher normalises the key before it decides — camel case, hyphens, capitals and separators all collapse to one form — so a national identifier, a card number, a security code or a raw device identifier is refused however it happened to be spelled, and a capital letter cannot walk a name past a list the vertical already declared. The same matcher runs on the store side and on the cross-app seam, so the two cannot drift apart, and erasure uses it to find the personal fields on a record type nobody thought to declare.",
    why: "State the limit with it: the matcher sees the shape of a field name. It does not read free text — an identifier pasted into a note is invisible to it — and the platform's own code says exactly that. It is also not the mechanism behind people1's protected attributes, which is a narrower check under its own headword, next.",
    see: ["Fairness by construction", "Erasure", "Governed writer"],
  },
  {
    term: "Fairness by construction",
    category: "Tenancy and data",
    usage: "elan1",
    aka: ["protected attributes", "people1 fairness"],
    def: "people1's version of the same instinct, and a narrower mechanism than the shape matcher above. The protected attributes on elan1's roster are not declared fields on the candidate or employee model, and a test walks that roster and fails if one of those names appears on either model; a separate conformity scan re-checks live employee and candidate records, so an absent column is never assumed to mean a clean record. It is an exact-name check rather than a shape matcher, and the code states its own limit out loud — a lexical guard cannot catch a proxy variable — so it narrows what reaches a human rather than replacing the human.",
    why: "Do not read it as \"no protected attribute can influence a people decision\". The runtime fairness gate catches most of that roster as a decision key, and the codebase names the ones it does not yet catch — an accepted ratchet, published rather than hidden, and the reason every consequential people decision is human-approved anyway. Alongside it: a payslip with no salary structure behind it cannot be approved, and a raise is refused without a written justification on record.",
    see: ["PII by shape", "Human approval gate"],
  },
  {
    term: "Erasure",
    category: "Tenancy and data",
    aka: ["right to erasure", "DSR", "data subject request"],
    def: "A data principal's record is anonymised in its personal fields while the record shell and its id survive, so referential integrity and audit linkage hold; the record is marked erased and an erasure event is appended to the trail. Deletes elsewhere are soft — the record is withdrawn and the audit keeps the history — and hard erasure stays this path. The trail itself is untouched, because it cannot be touched.",
    why: "The declared field list per type is the floor an operator can see as a menu. Above it a matcher works on the record's own shape, so a data-principal record on a type nobody declared is still erasable — and ambiguous names like name or email are admitted only on a data-principal shape, which is why a product name is not erased by accident.",
    see: ["Retention schedule", "Hash-chained audit", "PII by shape"],
  },
  {
    term: "Retention schedule",
    category: "Tenancy and data",
    def: "A window per data class — business records, message content, application logs, telemetry — with a sweep that deletes past-window records through each store's own governed delete. A class with no schedule, and any record whose class is unknown, is refused rather than purged. The audit trail is deliberately exempt and holds tamper-evident metadata rather than raw personal data, which is what makes storage limitation and an unalterable log reconcilable rather than contradictory. A legal hold outranks the schedule and is consulted before anything is deleted.",
    why: "The wired scope today is the CRM record types, one tenant per sweep, and no operator surface places a legal hold yet — so the hold register is empty by construction. Both facts are published rather than implied away.",
    see: ["Erasure", "Control state (enforced · declared · built, not wired)"],
  },

  // ——— The shape of the suite —————————————————————————————————————————————————————————————————
  {
    term: "The 1 Suite",
    category: "The shape of the suite",
    usage: "elan1",
    def: `elan1's ${SUITE_APPS} agentic apps — sales1, market1, service1, supply1, commerce1, finance1, people1, project1, insight1 and goal1 — grouped into ${CATEGORY_COUNT} categories and running on one shared core, with enterprise1 as the control plane over them and assistant1 as the way you talk to them.`,
    why: "Each app name is one lowercase word ending in 1. Never Sales 1, never Sales1.",
    see: ["Category", "enterprise1", "Composable platform"],
  },
  {
    term: "Category",
    category: "The shape of the suite",
    usage: "elan1",
    def: `The ${CATEGORY_COUNT} outcome areas the suite is grouped into — Revenue, Service, Trade, Works and Compass — split by what the approval gate protects rather than by org chart. Revenue and Service hold records about someone outside your company, so the gate protects consent, personal data and the outbound moment. Trade holds goods in motion: approved vendor, stock truth, the margin floor. Works holds money and people: segregation of duties, statutory obligation, fairness. Compass makes claims about the others, so its gate is grounding — it publishes; it never pays.`,
    why: "Categories are Title Case plain English. The apps inside them are lowercase and end in 1, which is how you can tell a category from an app on any page of this site.",
    see: ["The 1 Suite", "Semantic layer"],
  },
  {
    term: "enterprise1",
    category: "The shape of the suite",
    usage: "elan1",
    def: "The control plane over the shared core: one place for identity, approvals, the audit chain, the agent and skill and connector registries, wave rollout, the suspend switch, metering and the assurance register. The suite apps run on it rather than beside it, which is why an approval, a refusal and a run cost look the same wherever in the suite they came from.",
    see: ["Wave rollout", "Coverage register", "Run trace"],
  },
  {
    term: "Composable platform",
    category: "The shape of the suite",
    usage: "elan1",
    aka: ["thin core", "one core, many apps"],
    def: "One thin shared core, modular apps on top of it, and verticals delivered as configuration — so a new industry is a pack rather than a fork, and a governance control is written once in the core rather than re-implemented per app.",
    why: "It is also the constraint that makes the honest claims possible: there is one approval gate to describe, one audit chain to verify, and one place a policy can be missing from.",
    see: ["Industry pack", "The 1 Suite"],
  },
  {
    term: "Industry pack",
    category: "The shape of the suite",
    usage: "elan1",
    aka: ["vertical pack", "pack"],
    def: `A vertical delivered as configuration over the same core rather than as forked application code — its own record types, its skills, its connector seams, its governance signature and its own agents, each carrying a declaration file. There are ${factValue("verticalPacks")} of them today. A pack adds the record none of the suite apps owns and composes the apps for everything else: gov1 owns the public entitlement record and opens its citizen grievance as a real service1 case, and owns no resolution engine of its own.`,
    why: "What a pack does not do is as load-bearing as what it does. Rebuilding the app it composes would put a second, ungoverned copy of the same record in the same tenant.",
    see: ["Composition", "Governance signature", "Wedge"],
  },
  {
    term: "Composition",
    category: "The shape of the suite",
    usage: "elan1",
    def: "One app or pack writing into another through that app's own governed writer, rather than reaching into its store. The target's gate holds and can refuse — insure1 raises an error rather than bypass service1's writer, and retail1's return opens a service1 case through service1's path instead of writing a case row.",
    why: "It is what stops a suite from being several products that happen to share a login.",
    see: ["Governed writer", "Cross-app saga"],
  },
  {
    term: "Cross-app saga",
    category: "The shape of the suite",
    usage: "narrowed",
    aka: ["cross-app workflow", "cross-app flow"],
    def: `A named path where one app's decision becomes another app's work — order to cash, procure to pay, case to refund, stockout to replenish, project to cash. The platform declares ${factValue("crossAppSagas")} of them. Each leg terminates at the owning app's own gate rather than inheriting the caller's: service1's approved refund posts to finance1 and stops at finance1's maker-checker gate, so service1 never moves money. Where a saga spans two writes it compensates — if invoicing fails after a shipment already exists, the shipment is voided and the order reverts to confirmed.`,
    why: "Which of them run in your tenant is a rollout decision rather than a shipping claim. The sagas are declared and loadable; the agents that carry them are enabled deliberately, in waves.",
    see: ["Composition", "Wave rollout", "Maker-checker (segregation of duties)"],
  },
  {
    term: "Wedge",
    category: "The shape of the suite",
    usage: "elan1",
    def: "The one thing a vertical pack enforces on the write path that nothing else in the suite does, stated as a sentence a person can check. health1: a clinical note whose own text asserts a diagnosis or a prescription has no path to signed. bank1: money leaves only on a human's signature, and the scheduled route around that signature is closed on the write path. retail1: a sale price above the item's maximum retail price is not persisted.",
    why: "A wedge in a policy document is a claim. A wedge on the write path is a refusal you can trigger in a demo.",
    see: ["Industry pack", "Refusal string"],
  },
  {
    term: "Pillar",
    category: "The shape of the suite",
    usage: "elan1",
    def: `The ${PILLAR_COUNT} delivery and platform surfaces beside the apps: agent1 builds agents, assure1 certifies them, run1 operates them, strategy1 plans the work, and Academy teaches the people who will use them. agent1, assure1, run1 and strategy1 sit under Platform; Academy sits under Resources, alongside this glossary. Three limits worth knowing up front — strategy1 is a delivery motion performed by people, with no app, agent, screen or endpoint behind it; assure1 ships no package of its own, because its code is the certification kernel that lives in the core; and run1 carries no service-level machinery, so an availability commitment is a contract term to agree rather than something the platform measures for you.`,
    why: "Naming what is people and what is software is the difference between a roadmap you can hold us to and a diagram.",
    see: ["Trust Mark", "Discovery Sprint", "Academy"],
  },

  // ——— Working with us ————————————————————————————————————————————————————————————————————————
  {
    term: "Discovery Sprint",
    category: "Working with us",
    usage: "elan1",
    def: "The on-ramp: a fixed-scope planning engagement run by people that produces a current-state map, a shortlist of candidate workflows, and a wave order written against the enablement gate that will enforce it. The value model is assembled from your own operating assumptions and labelled illustrative, with the arithmetic shown rather than asserted.",
    why: "What leaves the engagement is a document set and a rollout order, not a running system. A first working agent is separately scoped, and a written list of what the engagement did not answer is carried forward rather than implied closed.",
    see: ["Wave rollout", "Illustrative figure"],
  },
  {
    term: "Launchpad",
    category: "Working with us",
    usage: "elan1",
    def: "A fixed-scope engagement that takes one flagship workflow of a vertical live and governance-validated — built as a typed blueprint, evaluated before it runs, routed to a named human where the step is consequential, metered, and on the audit chain.",
    why: "There is no timeline promise attached to certification here. A mark is eval-gated: it is withheld until the evidence passes, and how long that takes depends on the workflow.",
    see: ["Industry pack", "Trust Mark"],
  },
  {
    term: "Band",
    category: "Working with us",
    usage: "elan1",
    def: "The three revenue bands the offering mix is shaped around — Growth, Scale-up and Enterprise — used to describe which apps, packs and retainers usually fit, not to set a price.",
    why: "The estimator on this site deliberately holds no automation-rate default. The share of work an agent could take is your assumption, entered by you; we only do the arithmetic.",
    see: ["Illustrative figure"],
  },
  {
    term: "Academy",
    category: "Working with us",
    usage: "elan1",
    def: "The training and certification surface — role-based programmes, credentialed paths, and enablement for adoption. It sits under Resources, because it is where people learn rather than where software runs. Read one limit into the definition rather than out of it: there is no bench. Academy is a programme and a matching mechanism; the practitioner directory lists only people who have consented to be listed, and we publish no count of certified people. It is not a supply of hireable talent, and no sentence on this site should be read as one.",
    why: "A credential is also not a permission. Nothing in the access path reads a certification: your administrator grants roles and the runtime checks the role, which means a person can hold a role without being certified — a gap your own access review has to close, and not one a course closes for you.",
    see: ["Pillar", "Trust Mark"],
  },
  {
    term: "Partner SDK",
    category: "Working with us",
    usage: "elan1",
    aka: ["X4"],
    def: "A governed subset of the platform partners build on — apps, packs and connectors authored as typed manifests, tested against a deterministic sandbox, certified before listing, granted least privilege, and audited on the same fabric as everything else.",
    see: ["Connector grant", "Trust Mark"],
  },
];

// ——— Derivations. The page uses these; nothing re-lists a section by hand. ——————————————————————

/**
 * The sections, in reading order. Export name kept as `CATEGORIES` so nothing downstream breaks;
 * `SECTIONS` is the name to prefer in new code, because these are glossary sections and NOT the
 * five product Categories.
 */
export const CATEGORIES = [
  "The idea",
  "The write path",
  "Evidence",
  "Grounding",
  "Rollout and operations",
  "The fabric",
  "Tenancy and data",
  "The shape of the suite",
  "Working with us",
] as const satisfies readonly TermSection[];

export const SECTIONS = CATEGORIES;

/**
 * The anchor for a term. Exported so a link from another page and the id the glossary renders can
 * never disagree — a heading id built independently in a component is exactly how a deep link rots.
 */
export const termSlug = (term: string): string =>
  term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * What the search box should match against. `aka` is in here on purpose: a reader arriving with
 * "human in the loop", "HITL", "RLS" or "K5" must land on the entry that now carries a different
 * headword, rather than being told there are no results.
 */
export const searchText = (t: Term): string =>
  [t.term, t.def, t.why ?? "", ...(t.aka ?? [])].join(" ").toLowerCase();

/** Group a list of terms into sections, in reading order, dropping any section left empty. */
export function termsBySection(
  list: Term[] = GLOSSARY,
): { section: TermSection; terms: Term[] }[] {
  return SECTIONS.map((section) => ({
    section,
    terms: list.filter((t) => t.category === section),
  })).filter((g) => g.terms.length > 0);
}

/** Look up one entry by headword or by any of its alternative names. */
export function termByName(name: string): Term | undefined {
  const needle = name.trim().toLowerCase();
  return GLOSSARY.find(
    (t) =>
      t.term.toLowerCase() === needle ||
      (t.aka ?? []).some((a) => a.toLowerCase() === needle),
  );
}

export const GLOSSARY_SEO = {
  title: "Glossary — the agentic vocabulary, as this platform means it | elan1",
  description:
    "Governed writer, consequential action, approval token, Trust Mark, not measurable, drift, wave rollout, policy tag, seam, residency — the words the rest of this site uses, defined with the mechanism behind them and the limit stated inside the definition.",
};

// ——— Dev-only integrity checks. Same pattern as content/categories.ts. ————————————————————————
//
// A glossary decays in three specific ways, and none of them breaks the build: a `see` pointing at a
// headword somebody renamed, two entries whose slugs collide so one anchor silently wins, and a bare
// platform count typed back into a definition after Rule 2 took it out. All three are surfaced here
// rather than left to be found by a reader.

const DEV = Boolean(
  (import.meta as unknown as { env?: Record<string, unknown> }).env?.DEV,
);

/** `see` references that match no headword. Should always be empty. */
export const UNRESOLVED_SEE: string[] = GLOSSARY.flatMap((t) =>
  (t.see ?? [])
    .filter((ref) => !GLOSSARY.some((x) => x.term === ref))
    .map((ref) => `${t.term} → ${ref}`),
);

/** Headwords that reduce to the same anchor. Should always be empty. */
export const COLLIDING_SLUGS: string[] = Object.entries(
  GLOSSARY.reduce<Record<string, string[]>>((acc, t) => {
    const s = termSlug(t.term);
    acc[s] = [...(acc[s] ?? []), t.term];
    return acc;
  }, {}),
)
  .filter(([, terms]) => terms.length > 1)
  .map(([slug, terms]) => `${slug}: ${terms.join(" / ")}`);

/**
 * RULE 2, MADE CHECKABLE. An earlier draft declared "no count is hand-typed" in its header and then
 * hand-typed eight of them in the body. This scan reads the rendered prose back, AFTER
 * interpolation, and lists every spelled quantity word in it.
 *
 * Be precise about what it does and does not see, because a guard whose comment overstates it is the
 * same defect one level up. It reads the STRING, so it cannot tell a hand-typed word from a derived
 * one: `numberWord` output ("ten" suite apps, "five" categories, "five" pillars) lands in this list
 * even though those are derived and safe, and a figure interpolated from platform-facts.ts renders
 * as a DIGIT and never appears at all. So it is a review aid, not a gate, and it over-reports on
 * purpose. Rule 2's carve-out means a genuine enumeration is also expected here for a human to wave
 * through. What it is actually good at is the case it was written for: a spelled quantity with no
 * members beside it and no derivation behind it — the reviewer's question is always "where would a
 * reader check this?", and if the answer is "nowhere", the numeral comes out.
 */
const QUANTITY_WORDS =
  /\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen)\b/gi;

export const SPELLED_QUANTITIES: string[] = GLOSSARY.flatMap((t) => {
  const hits = [t.def, t.why ?? ""].join(" ").match(QUANTITY_WORDS) ?? [];
  return hits.map((w) => `${t.term}: "${w.toLowerCase()}"`);
});

if (DEV && UNRESOLVED_SEE.length > 0) {
  console.warn(
    `[glossary] ${UNRESOLVED_SEE.length} "see" reference(s) match no term: ` +
      `${UNRESOLVED_SEE.join(", ")}.`,
  );
}

if (DEV && COLLIDING_SLUGS.length > 0) {
  console.warn(
    `[glossary] ${COLLIDING_SLUGS.length} term(s) share an anchor: ${COLLIDING_SLUGS.join(", ")}.`,
  );
}

export default GLOSSARY;
