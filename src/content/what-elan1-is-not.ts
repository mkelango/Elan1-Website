// content/what-elan1-is-not.ts — THE LIMITS PAGE. Every claim in this file is a claim about what
// elan1 does NOT do, is NOT, and will NOT automate.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS FILE EXISTS. The rest of the content layer is disciplined about not overclaiming, and
// that discipline is invisible: a reader cannot tell a page that was careful from a page that was
// lucky. This file makes it legible. A regulated buyer's real question is never "what can it do" —
// it is "where does it stop, and did they tell me before I found out". A vendor whose limits you
// can find is a vendor whose capabilities you can believe.
//
// 🚨 THE FAILURE MODE HERE IS INVERTED. Everywhere else on this site the risk is claiming too much.
// Here the risk is claiming too little limit — softening a boundary into a hedge, or dressing a
// genuine gap as a deliberate design choice. The three edits that would ruin this file:
//   1. Turning a limit into a feature. "We deliberately don't do X" is only honest when X was
//      actually available and declined. Where something is simply not built yet, say NOT BUILT.
//   2. Adding a reassuring clause to the end of a limit. A limit followed by "…but in practice
//      this rarely matters" is not a limit; it is a limit with the load-bearing part removed.
//   3. Alarm styling. The page that renders this must read CALM. A limits page that shouts is
//      performing candour. One that states it plainly is exercising it.
//
// 🚨 THE CERTIFICATION CLAIM IS A QUOTE, NOT A REWRITE. `NOT_CERTIFIED_STATEMENT` below is the
// exact sentence pages/Trust.tsx publishes. Two surfaces stating the same posture in two slightly
// different ways is how one of them eventually drifts into "in progress" or "audited". If Trust.tsx
// changes, change this — never let them disagree, and never let this one be the softer of the two.
//
// 🚨 THE GOVERNED-PATH LIMIT IS IMPORTED, NOT RESTATED. `GOVERNED_PATH_SCOPE` lives in proof.ts
// because that is where the coverage sentences it scopes are written. It is imported here rather
// than paraphrased, so there is exactly ONE wording of the platform's most important caveat in the
// codebase. Paraphrasing it here would create a second copy, and the copy that drifts is always the
// one on the page that promised to be honest.
//
// 🚨 EVERY DELIBERATE REFUSAL CITES A REAL PATTERN. `DELIBERATE_REFUSALS` carries `patternIds` that
// must resolve against PROOF in proof.ts — `proofFor()` does the lookup and
// `REFUSAL_CITATIONS_RESOLVE` is a derived boolean the page can assert on. A refusal claim with a
// dangling citation is worse than no citation: it is a footnote that looks checkable and is not.
//
// WHAT THIS FILE MAY NEVER DO:
//   · Name or imply a customer, a design partner, a pilot, or a logo. There are none.
//   · Claim, imply or forecast a certification as held. SOC 2 and ISO 27001 are planned; neither is
//     held. "Undergoing audit" is also a claim, and it is not one we can make.
//   · Publish a measured outcome, a percentage, a latency figure or a throughput figure. Nothing has
//     been measured under a customer's load, so there is nothing to publish.
//   · Strengthen a quoted refusal. Every string in double quotes below was read out of the platform
//     tree with its lowercase first letter, its {placeholders} and its punctuation intact.
//   · Assert what a competitor lacks. Every sentence here is about elan1.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { ACCENT } from "./types";
import { factValue } from "./platform-facts";
import { PROOF, GOVERNED_PATH_SCOPE, type CaseStudy } from "./proof";

/**
 * One limit, stated in four parts.
 *
 * `weAreNot` is the boundary — written so a reader who needs the thing we are not can stop reading
 * and go elsewhere without wasting a call. `whatWeAre` is the substitution, and it must name a
 * mechanism rather than restate the marketing. `why` is OPTIONAL and is where the COST of the limit
 * goes: what this boundary costs the buyer, said plainly. A limit whose cost is never stated is a
 * limit the reader will assume is free.
 */
export interface NotClaim {
  id: string;
  title: string;
  /** The boundary. Plain, unhedged, and first — before any consolation. */
  weAreNot: string;
  /** What stands in its place, named as a mechanism the reader could go and check. */
  whatWeAre: string;
  /** OPTIONAL: what this limit costs you, and who should walk away because of it. */
  why?: string;
  accent: string;
}

/**
 * The certification posture, quoted from pages/Trust.tsx so the two surfaces cannot drift.
 * DO NOT edit this string in isolation. It is load-bearing on both pages, and the only acceptable
 * direction of change is toward a certificate that actually exists.
 */
export const NOT_CERTIFIED_STATEMENT =
  "SOC 2 and ISO 27001 certification are planned ahead of general availability. Neither is held " +
  "today, and we will not imply otherwise until a certificate exists.";

export const NOT_CLAIMS: NotClaim[] = [
  {
    id: "not-a-model-lab",
    title: "Not a frontier-model lab",
    weAreNot:
      "We do not train models. There is no pre-training here, no fine-tuning, no distillation and no model weights of our own — the platform tree contains no training code, because training is not the thing we do. When a page on this site says elan1 is built on Claude, that is a statement about a dependency, not a partnership claim and not a co-development claim.",
    whatWeAre:
      "elan1 is the application and governance layer that sits between a model and a system of record. The runtime depends on a model client PORT, never on a concrete model, and the platform's default configuration selects a deterministic test client that replays a scripted plan — which means every governance gate on this site can be demonstrated with no API key present at all. The gates are not prompt instructions the model is asked to respect; they are refusals in the write path, below the model, that run whether the caller is a console, an API client or an agent.",
    why:
      "The cost of that split is that our ceiling on reasoning quality is somebody else's. We cannot make a model better at your domain than it is, and we will not claim to. What we can do is make sure a wrong answer cannot become an irreversible write — which is a different promise, and the only one we are in a position to keep.",
    accent: ACCENT.blue,
  },
  {
    id: "not-a-chatbot",
    title: "Not a chatbot bolted onto an ERP",
    weAreNot:
      "elan1 is not a conversational veneer over somebody else's records, and not an assistant pane that can discuss a system it has no authority to write to. If what you want is a chat window added beside the software you already run, this is the wrong shape of product and it will be an expensive way to get one.",
    whatWeAre: `The apps own their records. ${factValue(
      "systemsOfRecord",
    )} systems of record and ${factValue(
      "objectTypes",
    )} typed object types sit behind governed writers, and a consequential change takes the same path regardless of who asked for it: policy is evaluated, the change is routed to a human, the audit entry is written, and the approval, the write and the record land in one transaction on one spine rather than in three systems joined by a trace id. The assistant is a surface onto that spine, not a layer on top of it — when it acts, it acts through the owning app's own gate.`,
    why:
      "The honest cost is the size of the commitment. A record you own is a record you migrate onto, with the integration work, the data mapping and the change management that implies — measured in an engagement, not an afternoon. A chat panel is genuinely faster to adopt. It is also, structurally, unable to refuse a write, because it does not hold the write.",
    accent: ACCENT.teal,
  },
  {
    id: "not-a-no-code-toy",
    title: "Not a no-code toy",
    weAreNot:
      "There is no canvas here where a diagram becomes production by being pretty. Agents are not assembled by dragging boxes and hoping the arrows mean something, and a workflow does not become governed by being drawn inside a governance-branded product.",
    whatWeAre:
      "An agent is a typed blueprint compiled into a typed specification, and the compile step has refusals with teeth. The build refuses to produce an agent marked advisory that holds a control-system connector, by name: \"advisory agent '{name}' may not hold control-system connectors {connectors} — OT actions are taken by humans\". Skills are versioned manifests. An agent's definition is content-hashed, and a certification is bound to that hash — edit the definition after the mark is issued and the integrity check reports the mismatch rather than carrying the mark forward.",
    why:
      "That rigour is the point and it is also the friction. There is a learning curve, a real integration, and a data model to agree on. A team that needs something live by Friday from a browser tab should use a tool built for that. We would rather lose that evaluation early than win it and be the reason a governed write path was described as one and was not.",
    accent: ACCENT.clay,
  },
  {
    id: "not-certified",
    title: "Not certified",
    weAreNot: NOT_CERTIFIED_STATEMENT,
    whatWeAre:
      "What exists today is the control set an audit looks for: row-level tenant isolation enforced at the database, least-privilege access with SSO and directory provisioning, a hash-chained audit that recomputes, single-use approvals bound to the exact payload a person reviewed, and evidence packs you can export. The work ahead is the audit and the attestation, not the controls. If certification is a gate in your procurement, say so early and we will sequence it into the engagement and show you the control evidence in the meantime.",
    why:
      "One further distinction, because the word certified appears elsewhere on this site in a narrower sense: an assure1 Trust Mark is OUR instrument, issued by our own governed call against our own eval battery. It refuses to mint over an empty or failing run, and it is revoked when the evals it rests on stop passing — but it is not a third-party attestation, and it does not become one by being green. Anyone treating a Trust Mark as an external audit result has been misled, and not by the mark.",
    accent: ACCENT.gold,
  },
  {
    id: "not-a-human-replacement",
    title: "Not a replacement for a human approver",
    weAreNot:
      "There is no autonomy setting that removes the person from a consequential action, and there is no roadmap item that adds one. Removing the gate is not a feature we have not got to yet — the gate is the product, and a version of elan1 without it would be a different product with our name on it.",
    whatWeAre:
      "No auto-approve exists anywhere in the platform. A pending decision that breaches its service level escalates; it never decides, so waiting longer never opens a gate. An approval is consumed on use, bound to the exact action string, and fingerprinted to a content hash of the payload the reviewer actually saw, so a yes given for one operation cannot be spent on another or on an edited version of the same one. The person who requested a consequential action may not approve it — verbatim, from the approval gate: \"segregation of duties — {principal} requested approval '{id}' and cannot also approve it; a different approver is required\" — and an administrator's role does not lift that, because it is a control rather than a permission. A decision returned too fast to have been read is surfaced as exactly that, computed from the audit chain rather than stored as a flag someone could clear.",
    why:
      "State the cost plainly: on any workflow whose bottleneck is a person's attention, elan1 will be slower than an ungoverned agent, and no amount of configuration will close that gap. If your goal is an unattended pipeline that moves money, publishes to an audience, or touches a network, we are the wrong platform and you should stop evaluating us here. That is a real segment of the market and we are deliberately not in it.",
    accent: ACCENT.rose,
  },
  {
    id: "not-proven-in-production",
    title: "Not proven in production at customer scale",
    weAreNot:
      "There are no named customers. No logos, no \"trusted by\" row, no case studies, no design partner, no pilot we can point at — not because they are under NDA, but because they do not exist. Nothing anywhere on this site is a result measured in a customer environment, and no number on this site is an outcome.",
    whatWeAre:
      "What we publish instead is the mechanism and the evidence for it: refusals quoted verbatim from the code that raises them, and counts of the platform itself, each carrying the derivation that produced it and the date it was counted. Where a figure would have to be invented, it is absent — pricing is a case in point, since the platform's own rupee amounts are demo fixtures chosen to make a test tenant produce interesting numbers, so the site publishes the plan structure and what is metered, and no price anyone has agreed to sell at.",
    why:
      "Two limits inside this one, since they are what a serious buyer will ask next. Residency is declared per tenant and classified fail-closed, and runs single-region today; the routing for more than one region exists in the platform and has not been deployed across regions in anger. And we publish no latency or throughput figure, because none has been measured under a customer's load — a benchmark run against our own fixtures would tell you about our fixtures. The first production deployment will be somebody's first. We would rather you knew that going in than discovered it in month three.",
    accent: ACCENT.clayDeep,
  },
  {
    id: "not-a-universal-governed-path",
    title: "Not a universally governed write path",
    weAreNot:
      "Not every write in the platform passes the governed writer. We say this on the proof page, in the same words, beside the patterns it scopes — because a coverage claim that holds everywhere except where it does not is the single easiest lie to tell about a platform like this one, and the hardest for a buyer to check.",
    whatWeAre:
      "The limit is measured rather than estimated, and it is held by a ratchet. A build-time check derived from the router tree — not from a hand-kept list somebody remembers to update — counts the mutating request handlers still writing to a system of record directly, and holds that count as a ceiling that may only fall. Every fix lowers it; nothing may raise it.",
    // Imported verbatim from proof.ts rather than paraphrased. See the file header: exactly one
    // wording of this caveat exists in the codebase, and this is not the copy of it.
    why: GOVERNED_PATH_SCOPE,
    accent: ACCENT.violet,
  },
  {
    id: "not-model-neutral",
    title: "Not model-neutral",
    weAreNot:
      "elan1 is not a model marketplace, not a benchmarking layer, and not a promise that every provider behaves identically behind our gates. We do not assert provider parity, and you should not read the presence of a provider in our configuration as a claim that it performs like the one we build against.",
    whatWeAre:
      "Claude is the native provider — its own client, its own API — and it is what the platform is built, tested and evaluated against. The model seam is genuinely open beneath that: one shared client serves the OpenAI-compatible providers, and OpenAI, NVIDIA NIM, Ollama, Kimi/Moonshot and GLM are each configured seams needing their own credential. The seam is real. The equivalence is the part we will not assert.",
    why:
      "Here is the tradeoff and its price. A certification is pinned to the model it was earned on: swap the model under a certified agent and the platform reports the mark as stale rather than carrying it across, so changing provider means re-earning the evidence rather than inheriting it. That is the correct behaviour and it is also the inconvenient one. And the honest edge on it — a certification recorded before model pinning existed carries no model, and a mark with no recorded model cannot be reported stale. Those are grandfathered, and grandfathered means exactly what it sounds like.",
    accent: ACCENT.cyan,
  },
  {
    id: "not-a-data-broker",
    title: "Not a data broker, and not ad-funded",
    weAreNot:
      "We do not sell your data. We do not sell attention. There is no advertising surface inside the product and no plan to build one — and this is not a setting a future administrator could flip, because it is not implemented as a setting.",
    whatWeAre:
      "Paid media is refused as a category by market1's own registered policy rather than switched off in configuration: \"ad placement / paid media is not permitted (ad-free)\". Consent is a hard gate evaluated at dispatch against the recipient being written to rather than against the segment they were in, and a do-not-contact recipient is blocked before a channel is reached at all. On the personal-data side the refusals inspect the record rather than trusting a flag on the request — a survey response is refused for carrying an employee identifier regardless of what the payload claims about itself.",
    why:
      "One boundary we cannot draw for you, and will not pretend to: elan1 trains nothing on your data because elan1 trains nothing at all. What a model provider does with an API call is governed by the contract YOU hold with that provider, and we will not speak for it. Read that contract. It is the one part of this stack our refusals do not reach.",
    accent: ACCENT.green,
  },
];

/**
 * What elan1 deliberately refuses to automate — the five categories where the answer is a refusal in
 * the code rather than a default a customer could change.
 *
 * `patternIds` MUST resolve against PROOF in proof.ts. These are citations, and a citation that does
 * not resolve is worse than none: it looks checkable, so nobody checks it. `proofFor()` resolves
 * them and `REFUSAL_CITATIONS_RESOLVE` is the derived assertion the page renders against.
 */
export interface DeliberateRefusal {
  id: string;
  /** The thing we will not automate, stated as the thing itself. */
  what: string;
  /** Why the line is there — the failure it exists to prevent, described as a mechanism. */
  why: string;
  /** The refusal(s), verbatim from the platform's write path. Quote exactly; never strengthen. */
  refusals: string[];
  /** OPTIONAL: what this guard does NOT catch. Present wherever the guard has a known blind spot. */
  limit?: string;
  /** Ids in PROOF (content/proof.ts) where the same pattern is shown before-and-after. */
  patternIds: string[];
  accent: string;
}

export const DELIBERATE_REFUSALS: DeliberateRefusal[] = [
  {
    id: "money-without-a-person",
    what: "Money that moves without a person.",
    why:
      "An automation holding ledger credentials turns a rule match into an irreversible transfer, and the evidence that anyone intended it becomes a chat thread and somebody's memory of saying yes. So releasing a payment is classified as consequential by the governed writer rather than by the screen that asked for it, and the same predicate runs whether the request arrives from the console, the API or an agent.",
    refusals: [
      "every payment/commitment requires human approval",
      "money action requires an idempotency_key (no double-posting)",
      "segregation of duties — {principal} requested approval '{id}' and cannot also approve it; a different approver is required",
    ],
    limit:
      "Scoped to the governed write path, which is not universal — see the ratchet above. This is the card where that limit matters most, which is why it is stated here rather than left to a footnote.",
    patternIds: ["money-release", "procurement-commitment", "refund-capture"],
    accent: ACCENT.cyan,
  },
  {
    id: "clinical-decision",
    what: "A clinical decision.",
    why:
      "An ambient scribe drafts well, and nothing between a good draft and the record stops a generated line being signed as a diagnosis. So the note's safety status is recomputed from its effective text on every write — supplying the status in the payload changes nothing, and amending an already-signed note into a diagnosis meets the same refusal. Separately, a write to a record type declared as protected health information is refused without an active consent for the resolved patient, on create and on update alike.",
    refusals: [
      "decision-support only — this note asserts a diagnosis or prescription, so it cannot be signed into the record. A clinician writes the clinical decision; the scribe drafts.",
      "no active patient consent — a clinical record requires consent (DPDP/ABDM/HIPAA)",
    ],
    limit:
      "health1 is provider-side decision support and does not adjudicate as a payer. None of this is a regulatory certification, and nothing elan1 produces is medical advice.",
    patternIds: ["clinical-signature"],
    accent: ACCENT.green,
  },
  {
    id: "hiring-rejection",
    what: "A hiring rejection.",
    why:
      "The version of this control that does not work asks the actor being judged for the verdict about itself — one boolean on the request saying whether protected attributes were used. So the payload is inspected instead: keys and string values, at any depth, against the platform's protected-attribute list, matched in the vocabulary a rejection actually uses rather than the schema's. A hit refuses and names what it found. Above that, people1's registered decision policy answers every action it governs the same way, so whatever the classifier narrows still arrives at a person.",
    refusals: ["a human decides this people action"],
    limit:
      "The guard is lexical. It cannot catch a proxy — a graduation year standing in for age, a postcode standing in for something else. It is stronger than a self-declared flag and weaker than a human reviewer, and both are in the path deliberately.",
    patternIds: ["protected-attributes", "pulse-anonymity"],
    accent: ACCENT.rose,
  },
  {
    id: "publishing-to-an-audience",
    what: "Publishing to an audience.",
    why:
      "Anything that reaches people outside your organisation — a campaign asset, a broadcast, a published number — is effectively irreversible the moment it lands, so it is a human's action by policy rather than a schedule's. The truthfulness check reads the record's own title and body rather than a flag on the request, so an asset cannot declare itself compliant. A post that has already published cannot publish again and a broadcast that has already sent cannot send again, both refused before the approval gate, because re-sending is not a decision anyone should be asked to make.",
    refusals: [
      "a human reviews this asset before publish",
      "human approval required to publish a dashboard",
      "metric not grounded ({reason})",
    ],
    limit:
      "The claim check is lexical over the record's text. It catches the banned phrasing, not every way of implying it — which is exactly why the human review sits above it rather than behind it.",
    patternIds: ["publish-asset", "publish-number", "consent-send"],
    accent: ACCENT.violet,
  },
  {
    id: "network-and-ot-actuation",
    what: "An actuation on a network or a machine.",
    why:
      "The line between IT advice and OT action is a person, and it is enforced in two places rather than one. At runtime, the network and machine write paths refuse: an agent plans, triages and correlates, and a human provisions, suspends and decides every flag. At build time, the studio refuses to compile an agent marked advisory that holds a control-system connector at all — so the guarantee is a property of what can exist, not only of what gets called.",
    refusals: [
      "humans act on the network: the agent plans and triages, but a human provisions, suspends and decides every flag (refused: {marker})",
      "machine safety: no command may be issued against a LOCKED-OUT machine (LOTO)",
      "advisory agent '{name}' may not hold control-system connectors {connectors} — OT actions are taken by humans",
    ],
    patternIds: ["resource-integrity", "lot-genealogy"],
    accent: ACCENT.clayDeep,
  },
];

/** Resolve a refusal's `patternIds` to the proof patterns they cite. Empty means a dangling citation. */
export const proofFor = (r: DeliberateRefusal): CaseStudy[] =>
  r.patternIds
    .map((id) => PROOF.find((p) => p.id === id))
    .filter((p): p is CaseStudy => Boolean(p));

/**
 * DERIVED. True only when every `patternIds` entry above resolves to a real pattern in proof.ts.
 * The page renders the citation row from `proofFor()`, so a dangling id disappears rather than
 * rendering a dead link — and this boolean is what a test (or a future reviewer) asserts on.
 */
export const REFUSAL_CITATIONS_RESOLVE = DELIBERATE_REFUSALS.every(
  (r) => proofFor(r).length === r.patternIds.length,
);

/** Framing prose — the top of the page. */
export const IS_NOT_INTRO =
  "Most of this site describes what elan1 does. This page describes where it stops. Everything " +
  "below is a limit: something we are not, something we have not proven, or something we refuse to " +
  "automate and will keep refusing. Nothing here is softened for the read, and nothing here is a " +
  "capability wearing a limit's clothes — where something is simply not built yet, this page says " +
  "not built rather than by design.";

/** Framing prose — the close. Deliberately NOT a pitch. */
export const IS_NOT_CLOSING =
  "This page exists because a trust sale is won by the vendor whose limits you can find. Anyone " +
  "can publish a capability list; the useful signal is whether the boundaries were volunteered " +
  "before you went looking for them, and whether they survive contact with the code. So hold us to " +
  "it. Take any line above into a technical review, ask to see the refusal raised, and tell us if " +
  "you find a claim on this site that the platform cannot support — that correction is worth more " +
  "to us than the sentence it removes.";
