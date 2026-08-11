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
    def: "Caller-supplied key ensuring repeated requests execute once; finance1 blocks money without it, supply1 blocks PO without it.",
    why: "Pending approvals stay pending; retry behaves as fresh request without header.",
    see: ["Consequential action"],
  },
  {
    term: "Policy tag",
    category: "The write path",
    usage: "narrowed",
    def: "Label on action resolving at runtime to policy that allows, routes to human, or blocks. Unregistered tags route to human, never grant autonomy silently.",
    why: "Invisible failure mode: unsupervised agent with unregistered tag.",
    see: ["Governance signature", "Consequential action"],
  },
  {
    term: "Governance signature",
    category: "The write path",
    usage: "elan1",
    aka: ["K7"],
    def: `Named policy set (clinical safety, approved-vendor-only, segregation of duties, separation of operational/IT). Platform registers ${factValue("governanceSignatures")}; one per vertical, app, and control surface.`,
    why: "Agents derive tags from signature so they cannot drift.",
    see: ["Policy tag", "Industry pack"],
  },
  {
    term: "Refusal string",
    category: "The write path",
    usage: "elan1",
    def: "Exact sentence platform returns when declining: \"no autonomous money — a payment is human-approved.\" \"no active patient consent — a clinical record requires consent.\" \"release exceeds remaining commitment — refusing to over-commit.\"",
    why: "Quoted refusals prove more than unchecked counts.",
    see: ["Governed writer", "Wedge"],
  },

  // ——— Evidence ———————————————————————————————————————————————————————————————————————————————
  {
    term: "Hash-chained audit",
    category: "Evidence",
    aka: ["K6", "audit trail", "audit chain"],
    def: "Per-tenant append-only log where each event hashes previous event; any change is detectable. Records keys, decisions, hashes (not raw values).",
    why: "Defended at database layer, not by convention.",
    see: ["Append-only trigger", "Erasure", "Run trace"],
  },
  {
    term: "Append-only trigger",
    category: "Evidence",
    usage: "elan1",
    def: "Database trigger raises on UPDATE and DELETE (including table owner); no mutation method exposed. Uniqueness constraint on tenant+predecessor prevents forking.",
    why: "Damage cannot be repaired, only declared with frozen digest.",
    see: ["Hash-chained audit"],
  },
  {
    term: "Trust Mark",
    category: "Evidence",
    usage: "elan1",
    def: "Evidence-gated certification earned by passing eval battery; refuses if run not found, scored zero, did not pass, or another tenant. Records model used.",
    why: "Default is structural check; behavior battery covers subset, not whole roster.",
    see: ["Eval battery", "Not measurable", "Auto-revocation", "Coverage register"],
  },
  {
    term: "Eval set",
    category: "Evidence",
    def: "Scored dimension (grounding, safety, fairness) made of cases; authored from tiny vocabulary (contains, equals, regex, judge).",
    why: "Small vocabulary ensures checks cannot silently fail.",
    see: ["Eval battery", "Not measurable"],
  },
  {
    term: "Eval battery",
    category: "Evidence",
    usage: "elan1",
    def: "Named eval sets an app's Trust Mark is scored against; verdict over measurable cases only. Mark refused for zero-scored run, failed run, or other tenant's run.",
    why: "Empty battery never passes—it did not run.",
    see: ["Eval set", "Not measurable", "Auto-revocation"],
  },
  {
    term: "Not measurable",
    category: "Evidence",
    usage: "elan1",
    def: "Third eval state: case with no evidence reports \"not measurable (NOT a pass).\" Absence looks clean but is not.",
    why: "Empty battery is not evidence; green tick meaning \"we did not look\" is worse than red.",
    see: ["Eval battery", "Coverage register", "Ungrounded"],
  },
  {
    term: "Drift",
    category: "Evidence",
    usage: "narrowed",
    def: "Certified subject whose content hash no longer matches cert hash: agent definition, skill body, connector operations, grounding corpus.",
    see: ["Content hash", "Auto-revocation"],
  },
  {
    term: "Auto-revocation",
    category: "Evidence",
    usage: "elan1",
    def: "Sweep re-verifies subjects against cert hashes and fresh eval; drifted or failing subjects lose Trust Mark. Revocation is soft.",
    why: "Mark must not outlive re-check; model upgrade = untested deploy.",
    see: ["Trust Mark", "Drift", "Model routing"],
  },
  {
    term: "Adversarial battery",
    category: "Evidence",
    usage: "elan1",
    def: "Fixed corpus of paraphrase/synonym/obfuscation attacks scored on block rate and false-positive together. Mark refused unless classifier blocks every attack.",
    why: "Fixed corpus, not population; floor applied at mint, re-verification runs battery case not whole corpus.",
    see: ["Trust Mark", "Prompt-injection screen"],
  },
  {
    term: "Coverage register",
    category: "Evidence",
    usage: "elan1",
    def: "List of every subject that should hold Trust Mark with its state (certified, drifted, revoked, stale, never scored) and cases.",
    why: "Empty queue and unmeasured estate look identical without denominator.",
    see: ["Not measurable", "Trust Mark"],
  },
  {
    term: "Control state (enforced · declared · built, not wired)",
    category: "Evidence",
    usage: "elan1",
    def: "Three labels for enterprise controls: Enforced (code on live path), Declared (implemented, not consulted), Built-not-wired (logic exists, missing mount/adapter).",
    why: "Declared or built-not-wired = scope to agree, not switch to flip.",
    see: ["Live · modelled · declared", "Residency", "Suspend switch"],
  },

  // ——— Grounding ——————————————————————————————————————————————————————————————————————————————
  {
    term: "Grounded",
    category: "Grounding",
    usage: "narrowed",
    def: "Answer or figure derived from your records at request time, carrying its source. Claim cites the record it rests on.",
    see: ["Ungrounded", "Computed at read", "Cite-or-refuse", "Self-verification judge"],
  },
  {
    term: "Ungrounded",
    category: "Grounding",
    usage: "elan1",
    def: "Named state: where figure cannot compute, platform returns no value and stated reason. A metric from an unpopulated field is zero wearing a metric's name.",
    why: "Silent zeros are the failure to prevent.",
    see: ["Grounded", "Not measurable"],
  },
  {
    term: "Computed at read",
    category: "Grounding",
    usage: "elan1",
    def: "Number derived at each request, not stored in counter: win rate, first-response time, days-past-due, stock cover, agent scorecard.",
    why: "Stored figure goes stale overnight; computed one cannot disagree with the book.",
    see: ["Grounded", "Semantic layer", "System of record"],
  },
  {
    term: "Cite-or-refuse",
    category: "Grounding",
    usage: "elan1",
    def: "Answer only from retrieved knowledge, cite all claims, decline if ungrounded. service1 agent can retrieve, cannot act. assistant1 declines ungrounded answers.",
    see: ["Grounded", "assistant1"],
  },
  {
    term: "Self-verification judge",
    category: "Grounding",
    usage: "elan1",
    def: "Judge runs before write-back: does draft match transcript, is it factual, on brand, inside policy? Fail and regenerate with critique; escalate if still failing.",
    why: "Default judge is no-op; record stores whether judge actually ruled vs. just passed.",
    see: ["Not measurable", "Consequential action"],
  },
  {
    term: "Semantic layer",
    category: "Grounding",
    def: `One governed metric definition over ${INSIGHT_SOURCES_WORD} sibling record stores (sales1, service1, finance1, supply1, people1, market1, project1, commerce1) so dashboard, board pack, and agent resolve to same source.`,
    why: "insight1 publishes; never pays. It proposes to owning app's queue, not writes itself.",
    see: ["Computed at read", "System of record", "Category"],
  },
  {
    term: "Illustrative figure",
    category: "Grounding",
    usage: "elan1",
    def: "Number for planning or demo, not measured. Platform enforces label; seeded figure raises, not renders.",
    why: "Nothing here is measured customer outcome.",
    see: ["Band", "Rate card"],
  },
  {
    term: "Prompt-injection screen",
    category: "Grounding",
    def: "Deterministic classifier (not model) checking inbound messages for injection attempts; refuses as they arrive. assistant1 carries eval-gated Trust Mark with adversarial floor: mark refused unless blocks every attack in corpus while admitting legitimate questions.",
    why: "Screened in platform, not chat; live check fires canonical jailbreak on each read.",
    see: ["Adversarial battery", "assistant1"],
  },

  // ——— Rollout and operations —————————————————————————————————————————————————————————————————
  {
    term: "Wave rollout",
    category: "Rollout and operations",
    usage: "narrowed",
    aka: ["staged enablement", "enabled set", "X2", "wave gate"],
    def: `Functions turned on per tenant by audited admin action; refused before act if outside enabled set. Baseline enables ${factValue("agentsEnabled")} of ${factValue("agentsRegistered")} functions; remainder deliberately off.`,
    why: "Makes roadmap enforceable; only version of widening that rolls back.",
    see: ["Launch wave", "Suspend switch"],
  },
  {
    term: "Launch wave",
    category: "Rollout and operations",
    usage: "elan1",
    def: `Suite's opening: ${SUITE_LAUNCH_WAVE} of ${SUITE_AGENTS} agents enabled across ${SUITE_APPS} apps.`,
    why: "Publish both numbers to avoid implying full roster runs day one.",
    see: ["Wave rollout"],
  },
  {
    term: "Suspend switch",
    category: "Rollout and operations",
    usage: "elan1",
    aka: ["kill-switch", "incident stop"],
    def: "One admin action stopping app's entire agent fleet immediately; non-destructive (enabled set preserved). Survives restart. Lifting it requires human approval.",
    why: "Overrides set, not edits it—stops incident without losing rollout. Note: stops agents, not direct writes.",
    see: ["Wave rollout", "Governed writer", "Control state (enforced · declared · built, not wired)"],
  },
  {
    term: "Rate card",
    category: "Rollout and operations",
    usage: "elan1",
    aka: ["K8", "FinOps", "metering"],
    def: "Per-model price list per tenant, per app; model with no entry logged as unpriced not zero-cost.",
    why: "Gap visible inside number; figures illustrative, not billing advice.",
    see: ["Run trace", "Illustrative figure"],
  },
  {
    term: "Run trace",
    category: "Rollout and operations",
    usage: "elan1",
    def: "Each agent run with status, model, latency, cost, and audit chain. Trace and governance record are same record; no second log.",
    see: ["Hash-chained audit", "Rate card"],
  },
  {
    term: "Model routing",
    category: "Rollout and operations",
    usage: "narrowed",
    aka: ["K2", "model policy"],
    def: "Choose model tier per task with per-tenant allow-list (opt-in). Model change is untested deploy; Trust Mark re-run against runtime model.",
    why: "Model swap where code unchanged is treated as untested.",
    see: ["Trust Mark", "Auto-revocation"],
  },

  // ——— The fabric —————————————————————————————————————————————————————————————————————————————
  {
    term: "Seam",
    category: "The fabric",
    usage: "elan1",
    def: "Typed, governed boundary to system; declares operations/arguments; caller resolves to scoped handle; policy evaluated; operation names/keys (never values) audited.",
    see: ["Live · modelled · declared", "Connector"],
  },
  {
    term: "Live · modelled · declared",
    category: "The fabric",
    usage: "elan1",
    def: "Three states of seam: Live (reaches external endpoint when configured), Modelled (deterministic adapter, no external call), Declared (typed, awaiting credentials and grant).",
    why: "Connectors ship modelled, reach external only when wired.",
    see: ["Connector", "Control state (enforced · declared · built, not wired)"],
  },
  {
    term: "Connector",
    category: "The fabric",
    usage: "narrowed",
    aka: ["K3", "MCP connector"],
    def: `${factValue("connectors")} registered and callable: CRM, ERP, helpdesk, HR, project, inventory, supplier, commerce, marketplace, warehouse, e-procurement, payments, health, banking, channel, knowledge seams. Plus credential-gated catalog and MCP bridge.`,
    why: "Published as callable count, not library catalog entries.",
    see: ["Seam", "MCP (Model Context Protocol)", "Connector grant"],
  },
  {
    term: "MCP (Model Context Protocol)",
    category: "The fabric",
    def: "Open protocol exposing tools/data to model. elan1 consumes MCP servers as tool sources and publishes as governed server. Caller sees only granted tools; reads flow freely; consequential tools error, requiring approval.",
    why: "Gate lives in platform, not protocol.",
    see: ["Connector", "Connector grant"],
  },
  {
    term: "Connector grant",
    category: "The fabric",
    usage: "elan1",
    def: "Scoped subset of connector's operations given to app. Asking for unexposed operation refused before credential involved. Grant is human-approved; revoke/disconnect immediate, ungated. Ungranted call blocked and audited.",
    why: "Least-privilege review surfaces operations seeded grants do not expose.",
    see: ["Connector", "Credential reference"],
  },
  {
    term: "Credential reference",
    category: "The fabric",
    usage: "elan1",
    def: "Reference of form secret://<connector>, never credential itself. Unsealed at tool boundary for one call only after scope check; scrubbed from errors.",
    see: ["Connector grant", "Seam"],
  },
  {
    term: "Skill",
    category: "The fabric",
    usage: "elan1",
    aka: ["K4"],
    def: `Reusable, versioned, content-hashed unit of know-how: brand voice, cadence rule, qualification method, constraint, disclosure. Platform publishes ${factValue("skills")}. Shared with lineage, not forked.`,
    why: "Publish gate refuses raw sensitive values and affirmative injection claims.",
    see: ["Skill manifest", "Content hash"],
  },
  {
    term: "Skill manifest",
    category: "The fabric",
    usage: "elan1",
    def: "Typed declaration skill ships as: id, version, body, scope, lineage. Manifest gets hashed; hash binds to certification.",
    see: ["Skill", "Content hash"],
  },
  {
    term: "Content hash",
    category: "The fabric",
    def: "Deterministic hash over entity version's consequential fields: agent definition, skill body, connector operations, approval payload. Platform's tamper-evident fingerprint.",
    why: "Makes certification honest; Trust Mark bound to cert hash, so edit revokes mark.",
    see: ["Drift", "Trust Mark", "Approval token"],
  },
  {
    term: "Blueprint",
    category: "The fabric",
    usage: "elan1",
    def: "Typed authoring shape: name, instruction, model policy, tool grants, skills, policy tags. Compiler refuses advisory blueprints holding control-system connectors.",
    why: "Consequence derived from blueprint actually carries, not author memory.",
    see: ["Advisory", "Agent"],
  },

  // ——— Tenancy and data ———————————————————————————————————————————————————————————————————————
  {
    term: "Tenant isolation",
    category: "Tenancy and data",
    aka: ["K1", "row-level security", "RLS", "multi-tenancy"],
    def: "Database enforces row-level security per transaction setting from verified identity; forced so policy applies to table owner. Tenant-scoped op with no binding raises, fails closed.",
    why: "Two independent mechanisms over one property; isolation test requires infrastructure.",
    see: ["Residency", "Erasure"],
  },
  {
    term: "Residency",
    category: "Tenancy and data",
    usage: "narrowed",
    aka: ["X3", "data residency", "localisation"],
    def: "Tenant declares region; data classified fail-closed: undeclared field treated restricted, refused cross-border read. Platform-wide, residency declared not enforced by routing. Single-region today.",
    why: "health1 connectors enforce region-block per-operation as separate control, not general platform enforcement.",
    see: ["Control state (enforced · declared · built, not wired)", "Tenant isolation"],
  },
  {
    term: "PII by shape",
    category: "Tenancy and data",
    usage: "elan1",
    def: "Write path refuses field by name shape: national ID, card number, security code, device ID however spelled. Normalised matcher (camel case, hyphens collapse). Erases personal fields on unknown types.",
    why: "Sees name shape only, not free text. Not same as protected attributes guard.",
    see: ["Fairness by construction", "Erasure", "Governed writer"],
  },
  {
    term: "Fairness by construction",
    category: "Tenancy and data",
    usage: "elan1",
    aka: ["protected attributes", "people1 fairness"],
    def: "Exact-name check: protected attributes not declared on candidate/employee models. Test walks roster, fails if any appear. Conformity scan re-checks live records.",
    why: "Lexical guard cannot catch proxy; narrows what reaches human, not replaces it.",
    see: ["PII by shape", "Human approval gate"],
  },
  {
    term: "Erasure",
    category: "Tenancy and data",
    aka: ["right to erasure", "DSR", "data subject request"],
    def: "Data principal's record anonymised in personal fields; shell/id survive so integrity/audit linkage hold. Marked erased; erasure appended to trail. Audit untouched.",
    why: "Declared fields per type is menu floor; matcher works on record shape, so undeclared data-principal types still erasable.",
    see: ["Retention schedule", "Hash-chained audit", "PII by shape"],
  },
  {
    term: "Retention schedule",
    category: "Tenancy and data",
    def: "Window per data class (business records, messages, logs, telemetry); sweep deletes past-window. Unknown class refused, not purged. Audit exempt, holds metadata not raw PII.",
    why: "Wired scope is CRM types, one tenant per sweep; legal hold support not yet exposed.",
    see: ["Erasure", "Control state (enforced · declared · built, not wired)"],
  },

  // ——— The shape of the suite —————————————————————————————————————————————————————————————————
  {
    term: "The 1 Suite",
    category: "The shape of the suite",
    usage: "elan1",
    def: `${SUITE_APPS} apps (sales1, market1, service1, supply1, commerce1, finance1, people1, project1, insight1, goal1) grouped into ${CATEGORY_COUNT} categories on one core, with enterprise1 as control plane, assistant1 as conversational entry.`,
    why: "Each app name: one lowercase word + 1.",
    see: ["Category", "enterprise1", "Composable platform"],
  },
  {
    term: "Category",
    category: "The shape of the suite",
    usage: "elan1",
    def: `${CATEGORY_COUNT} outcome areas (Revenue, Service, Trade, Works, Compass) split by approval-gate protection. Revenue/Service: outside records, consent/data/outbound. Trade: goods in motion. Works: money/people. Compass: claims about others, publishes not pays.`,
    why: "Categories Title Case; apps lowercase+1; tells them apart on page.",
    see: ["The 1 Suite", "Semantic layer"],
  },
  {
    term: "enterprise1",
    category: "The shape of the suite",
    usage: "elan1",
    def: "Control plane: identity, approvals, audit chain, agent/skill/connector registries, wave rollout, suspend switch, metering, assurance register. Suite apps run on it.",
    see: ["Wave rollout", "Coverage register", "Run trace"],
  },
  {
    term: "Composable platform",
    category: "The shape of the suite",
    usage: "elan1",
    aka: ["thin core", "one core, many apps"],
    def: "Thin shared core, modular apps, verticals as configuration. New industry = pack, not fork. Control written once.",
    why: "Enables one approval gate, one audit chain, one place policy missing can be found.",
    see: ["Industry pack", "The 1 Suite"],
  },
  {
    term: "Industry pack",
    category: "The shape of the suite",
    usage: "elan1",
    aka: ["vertical pack", "pack"],
    def: `Vertical as config over core: own record types, skills, seams, signature, agents. ${factValue("verticalPacks")} today. Adds record no suite app owns; composes others. gov1 owns entitlement, opens grievance as real service1 case.`,
    why: "What pack does NOT do matters. Rebuilding would make second ungoverned record copy.",
    see: ["Composition", "Governance signature", "Wedge"],
  },
  {
    term: "Composition",
    category: "The shape of the suite",
    usage: "elan1",
    def: "App/pack writes into another through owned governed writer, not reaching into store. Target's gate holds and can refuse.",
    why: "Stops suite being products sharing login.",
    see: ["Governed writer", "Cross-app saga"],
  },
  {
    term: "Cross-app saga",
    category: "The shape of the suite",
    usage: "narrowed",
    aka: ["cross-app workflow", "cross-app flow"],
    def: `Named path where one app's decision becomes another's work (order-to-cash, procure-to-pay, case-to-refund, stockout-to-replenish, project-to-cash). Platform declares ${factValue("crossAppSagas")}. Each leg stops at owning app's gate. Compensates if span fails.`,
    why: "Rollout decision, not shipping claim; declared, loadable, enabled deliberately in waves.",
    see: ["Composition", "Wave rollout", "Maker-checker (segregation of duties)"],
  },
  {
    term: "Wedge",
    category: "The shape of the suite",
    usage: "elan1",
    def: "One thing vertical enforces on write path no other suite piece does. health1: clinical note asserting diagnosis/Rx has no sign path. bank1: money leaves only on human sig. retail1: price above MRP not persisted.",
    why: "Policy wedge = claim; write-path wedge = demoable refusal.",
    see: ["Industry pack", "Refusal string"],
  },
  {
    term: "Pillar",
    category: "The shape of the suite",
    usage: "elan1",
    def: `${PILLAR_COUNT} delivery/platform surfaces: agent1 builds, assure1 certifies, run1 operates, strategy1 plans, Academy teaches. Three limits: strategy1 is people motion; assure1 ships no package; run1 no SLA machinery.`,
    why: "Name what is people/software—roadmap you can hold vs. diagram.",
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
