// content/partners.ts — the partner programme, written as a MECHANISM rather than as a network.
//
// 🚨 WHAT THIS SURFACE MAY NOT CONTAIN, EVER:
//   · a partner name, a partner logo, or a wall of them
//   · a count of partners, listings, installs, referrals or certified practitioners
//   · a tier with anybody in it, a published fee, or a published revenue-share rate
//   · a case study, a co-delivery reference, or a quote from a partner
//   · a date by which a submission will be certified — certification is eval-gated and may withhold
//
// There is no partner network. Publishing one on the page that invites people to build it would be
// the cheapest lie on this site and the easiest to check: the first partner through the door finds
// out on day one. So the page publishes the DOOR — what the kit refuses at the point of declaration,
// what certification refuses to mint, and what the catalogue refuses to list — and says plainly that
// nobody has come through it yet. That is a real thing to publish, and it is the part a serious
// partner is actually assessing.
//
// WHAT IS REAL, AND WHERE IT LIVES (paths relative to the elan1-platform repo):
//
//   THE PARTNER KIT — the only surface a partner builds against
//   · two calls (`define_connector`, `define_pack`) returning validated SUBMISSIONS; the kit
//     registers no policy, grants no scope, writes no audit, touches no identity .... partner1/partner1/sdk.py
//   · namespacing at the door — `mcp.partner.` / `partner.` prefixes ................ partner1/partner1/sdk.py
//   · least privilege at the door — declared scopes must be a non-empty SUBSET of the
//     connector's own declared ops; the refusal names the extras ..................... partner1/partner1/sdk.py
//   · a pack references a REVIEWED governance signature and inherits its policy tags;
//     partners cannot define raw policy ............................................. partner1/partner1/sdk.py
//   · `partner_scoreable_evals` DROPS eval sets whose cases need a fact a partner
//     submission cannot compute — visibly, in the pack's own `evals` ................ partner1/partner1/sdk.py,
//                                                                                     ADR-0765
//
//   CERTIFICATION AND THE CATALOGUE
//   · submit → certify → list → install; `list_item` and `install` each raise
//     `NotCertifiedError` without a Trust Mark ...................................... partner1/partner1/marketplace.py
//   · composition validated before any eval runs (unbuilt app · unknown agent ·
//     unknown connector · unregistered policy) ...................................... packs/framework/pack_framework/validator.py
//   · a submission declaring no workflow is refused rather than passed ............... partner1/partner1/marketplace.py
//   · EVERY shipped workflow is scored and gets its OWN mark, not just the first ..... partner1/partner1/marketplace.py,
//                                                                                     ADR-0815
//   · the catalogue publishes each listing's mark id AND every workflow name it was
//     minted against, so a reader can recompute validity instead of trusting a badge . partner1/partner1/marketplace.py
//   · installing a pack composes built apps, grants only the declared scopes, and
//     wave-enables that pack's own workflows per tenant .............................. partner1/partner1/marketplace.py
//
//   THE REVIEW CHECKLIST
//   · five requirements, each DERIVED from the listing's own declarations, each able
//     to go red, each failure carrying its finding .................................. apps/enterprise1/enterprise1/marketplace_store.py
//                                                                                     (`certification_findings`), ADR-0780/0781
//   · the empty state is a refusal, not five green ticks ............................ apps/enterprise1/enterprise1/routers/wave2.py
//
//   THE HONEST LIMITS
//   · the catalogue is seeded through the REAL submit→certify→list path in a
//     demonstration environment and is empty in production .......................... apps/enterprise1/enterprise1/server.py
//     ("X4 partner marketplace (real submit→certify→list); empty in prod until real partners list")
//   · the partner-facing portal and real install provisioning are not built — the
//     surface says so itself in its own payload ..................................... apps/enterprise1/enterprise1/routers/wave2.py
//     ("PRT-2 built; the partner-portal web + real install provisioning pending.")
//   · a SECOND, status-only certification path exists beside the eval-gated one, is
//     deliberately unwired, and a test derived from the server source keeps it that
//     way — the registry that would hold tiers and produce a referral revenue-share
//     statement sits behind it ...................................................... core/elan1_core/partners.py,
//                                                                                     apps/enterprise1/tests/test_marketplace_certification_honest.py
//
// 🚨 THE TALENT LINE IS NOT WRITTEN HERE. The Resources nav sends "Certified talent" to this page,
// and the honest copy for it already exists in content/courses.ts as TALENT_MECHANISM and
// TALENT_LIMIT. This module IMPORTS them rather than restating them, so the two surfaces cannot
// drift into two different answers about whether there is a bench. (There is not.) Do not paraphrase
// them here, and never ship the mechanism without the limit.
//
// Platform counts are NEVER hand-typed — they come from content/platform-facts.ts with their
// derivations. The one figure this file must never acquire is a count of partners.

import { factValue } from "./platform-facts";
import { TALENT_MECHANISM, TALENT_LIMIT } from "./courses";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE DISCLOSURE. It renders directly under the lede, not at the bottom of the page.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * 🚨 THE LINE THAT MUST NOT BE SOFTENED — and must stay ABOVE the tracks, not under them.
 *
 * Every promotional instinct on a partner page pulls toward implying momentum. This paragraph is the
 * counterweight, and it is also the thing that makes the rest of the page credible: a reader who is
 * told the network is empty will believe the description of the gate.
 */
export const NO_NETWORK_YET =
  "There is no partner network yet. No firm has been registered as a partner, nothing in the marketplace was listed by anyone outside elan1, and we publish no count of partners, listings, installs or certified people. What exists is the door: a partner kit that refuses a submission at the point of declaration, a certification that refuses to mint a Trust Mark without a passing eval run behind it, and a catalogue whose list and install calls each refuse an item that has no mark. A demonstration environment carries one seeded listing, submitted, certified and listed by the platform itself through that same real path so the mechanism can be exercised; demonstration seeding is off in production, where the catalogue is empty until somebody lists. When there is a partner to name, this page will name them, and not before.";

export const PARTNERS_INTRO = {
  kicker: "Company · Partners",
  title: "Build on one core. Certify before you list.",
  lede: "The partner programme is a governed door rather than a logo wall. A partner declares a connector or a pack through a kit that can refuse it before a line of it runs, certification mints a Trust Mark only from an eval run that passed, and the catalogue's list and install calls each refuse an item that carries no mark. A partner contribution then runs on the same identity, governance and audit paths as a first-party one — it holds no privilege of its own, because the kit itself has no way to grant one.",
  /** Render immediately under the lede. It is the disclosure, not a footnote. */
  note: NO_NETWORK_YET,
} as const;

export const PARTNERS_SEO = {
  title: "Partners — build on the core, certify before you list | elan1",
  description:
    "The elan1 partner programme: a governed partner kit that refuses an over-broad grant at the door, certification that mints a Trust Mark only from a passing eval, and a catalogue that refuses to list or install without one. No partner network exists yet, and we say so.",
};

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE THREE SHAPES A PARTNERSHIP CAN TAKE. Two are software; one is people.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface PartnerTrack {
  id: string;
  /** What kind of thing this is, in one word — so nobody reads a delivery motion as software. */
  kind: "Software" | "People";
  title: string;
  /** What you would actually be building or doing. */
  body: string;
  /** The mechanisms that apply to this track. Each is checkable in platform code. */
  mechanisms: string[];
  /** Where this track stops today. Every track has one. */
  stopsAt: string;
}

/**
 * ⚠️ THERE IS NO FOURTH TRACK, AND THE ONE THAT WAS REMOVED IS WORTH NAMING.
 *
 * An earlier version of this page offered "Capital & ecosystem — back the category". Investment is
 * not a partnership shape, it has no mechanism behind it, and putting it on a partner page invites a
 * reader to infer a raise we are not describing. If there is ever something to say about capital, it
 * belongs in the newsroom with a date on it, not in a card next to two engineering surfaces.
 */
export const PARTNER_TRACKS: PartnerTrack[] = [
  {
    id: "pack",
    kind: "Software",
    title: "Ship a pack",
    body: `A pack is configuration over apps that already exist: it composes from the ${factValue("suiteApps")} suite apps rather than forking any of them. You declare which apps it composes, which reviewed governance signature it runs under, the connectors and skills it needs, and the workflow it ships. The kit hands back a submission and wires nothing; composition is checked at certification, before any eval runs.`,
    mechanisms: [
      "A pack id must carry the partner namespace, checked at declaration — so a contribution written through the kit cannot present itself as first-party.",
      "A pack references a governance signature that has already been reviewed and inherits its policy tags. A partner cannot author raw policy — the rules a pack runs under are ones the platform already enforces.",
      "Composition is validated against the live tree: composing an app that is not built, naming an agent no registered app holds, referencing an unknown connector, or referencing an unregistered policy each come back as a named error and the certification is refused.",
      "Every workflow the pack ships is scored and earns its own Trust Mark, keyed to its own name — not just the first one in the list.",
    ],
    stopsAt:
      "Anything that needs a new core primitive. A pack composes what is built; it does not add a capability to the platform, and a workflow naming an agent that does not exist is refused rather than stubbed.",
  },
  {
    id: "connector",
    kind: "Software",
    title: "Bring a connector",
    body: `Your system becomes a governed seam rather than an integration project. You declare the connector and the least-privilege operations it needs; the kit checks the request against the connector's own schema before it becomes a submission. It joins the same fabric as the ${factValue("connectors")} connectors registered today, under the same scope checks and the same audit rule.`,
    mechanisms: [
      "A partner connector id must carry the partner namespace, checked at declaration.",
      "The scopes you declare must be a non-empty subset of the operations the connector itself exposes. Asking for one it does not expose is refused, and the refusal names the extras rather than quietly widening the grant.",
      "Certification runs a conformance check over the connector's own schema and mints a mark from that run — then records, in the connector catalogue, the eval run that authorised it.",
      "A granted connector call is audited by operation and argument keys rather than argument values — the same data-minimisation rule the fabric applies to a first-party call.",
    ],
    stopsAt:
      "Credentials and a grant. Registered is not connected: nothing reaches a real system until credentials are wired and a human approves the grant against the operations the connector declares. Where an adapter is not yet wired, the seam runs as a deterministic modelled stand-in — real interface, real governance, not real data — and that is engagement work in your environment rather than a checkbox.",
  },
  {
    id: "deliver",
    kind: "People",
    title: "Deliver alongside us",
    body: "The delivery motions on this site — the planning engagement, the agent build, the assurance work and the operating seat — are people work, and a partner can hold part of it. What we can offer today is narrow and honest: joint work on a named engagement, and Academy's certification paths for the people who will run the platform.",
    mechanisms: [
      "Academy certifies a PERSON against a platform role the access system actually holds, and refuses to issue until every module in that path is recorded complete.",
      "A certification is not a permission. Roles are granted by a tenant's own administrator and the runtime checks the role, never the credential — so a certified consultant still gets exactly the access you grant them.",
      "Everything a partner does through the consoles runs through the same governed, audited paths your own operators use, so the record of who changed what does not depend on who was in the chair.",
    ],
    stopsAt:
      "Accreditation of a firm. There is no partner-level certification, no tier anybody holds, and elan1 is not a certification body — the credential Academy issues is our own, against our own platform, and no external body recognises it.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE DOOR — what the kit refuses before anything is built.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * Refusals quoted from the partner kit rather than paraphrased.
 *
 * A quoted refusal proves a guard exists in a way no adjective does, and it is the hardest thing on
 * a page to fake. Quote exactly; never strengthen one into something it does not block. Placeholders
 * are shown in braces, the way the product pages show them.
 */
export const KIT_REFUSALS: { refusal: string; means: string }[] = [
  {
    refusal: "partner connector id must start with 'mcp.partner.'",
    means:
      "Namespacing is checked at declaration, so a partner contribution cannot be mistaken for a first-party one anywhere downstream.",
  },
  {
    refusal: "declare the least-privilege scopes the connector needs (none given)",
    means:
      "A submission that declares no scopes is not quietly granted everything. It is refused for declaring nothing.",
  },
  {
    refusal: "declared scopes {scopes} are not ops of '{connector}' (least-privilege)",
    means:
      "You cannot ask for an operation the connector does not expose. The refusal names exactly which ones, rather than widening the grant to fit the request.",
  },
  {
    refusal: "partner pack id must start with 'partner.'",
    means: "The same namespacing rule, applied to packs.",
  },
  {
    refusal: "unknown signature '{signature}' — partners must use a reviewed governance signature",
    means:
      "A pack runs under governance that has already been reviewed. A partner references a signature; a partner does not write policy.",
  },
];

/** What the kit is, said as a property of its surface rather than as a promise. */
export const KIT_SURFACE_NOTE =
  "The kit is deliberately small: two calls that return a validated submission. It holds no function that registers a policy, grants a scope, writes an audit entry or reaches identity — certification and install are the platform's job, not the partner's. That is why \"partner code gets no special privileges\" is a statement about the surface rather than a promise about intent.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE LIFECYCLE — four steps, each with the refusal that guards it.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface LifecycleStep {
  n: string;
  title: string;
  body: string;
  /** The refusal at this step, quoted. `null` where the step's guard is the previous step's. */
  refusal: string | null;
}

export const LIFECYCLE: LifecycleStep[] = [
  {
    n: "01",
    title: "Submit",
    body: "The kit returns a declaration — the connector and its scopes, or the pack and the workflow it ships — and the platform records it as a listing in draft. Submitting installs nothing, grants nothing and lists nothing.",
    refusal: null,
  },
  {
    n: "02",
    title: "Certify",
    body: "Composition is validated first: an unbuilt app, an unknown agent, an unknown connector or an unregistered policy stops the review before an eval runs. Then the battery runs, and a Trust Mark is minted from the run — one per workflow the pack ships, each keyed to its own name so it can be looked up later.",
    refusal: "'{pack}' declares no workflow — there is nothing to certify",
  },
  {
    n: "03",
    title: "List",
    body: "A listing reaches the catalogue only with a mark. The catalogue then publishes the mark id and every workflow name it was minted against, so a reader can recompute validity from the mark store rather than trust the badge — and a mark that has since been revoked fails that recompute.",
    refusal: "'{listing}' is not certified — it cannot be listed",
  },
  {
    n: "04",
    title: "Install",
    body: `A tenant installs; the platform does not push. Installing a pack composes the built apps it named, grants only the scopes it declared, and enables that pack's own workflows for that tenant through the platform's wave gate — the same gate that has ${factValue("agentsEnabled")} of the ${factValue("agentsRegistered")} registered agent functions on in the baseline wave and refuses the rest before they act.`,
    refusal: "'{listing}' is not certified + listed — it cannot be installed",
  },
];

/**
 * 🚨 THE SCOPE THAT MUST TRAVEL WITH "CERTIFIED", AND IT IS NOT FLATTERING.
 *
 * A partner listing's certification is real and it is NARROWER than a first-party pack's. Two
 * reasons, both structural, both in the code: the battery is the governance signature's rather than
 * the workflow's, scored over a fixed sample the platform supplies — so scoring a second workflow
 * establishes that it has its own passing run and its own mark, not that it behaves correctly on
 * your data. And the eval sets whose cases need a fact only a live host app can compute are DROPPED
 * before scoring rather than passed vacuously, because a partner submission has no such records to
 * read. The narrowing is visible in the pack's own declared eval list. Render this beside the
 * lifecycle, not three sections below it.
 */
export const CERTIFICATION_SCOPE_NOTE =
  "Read \"certified\" precisely. The battery a partner submission is scored against belongs to the governance signature it referenced, and it runs over a fixed sample the platform supplies — so what certification establishes is that every workflow shipped has its own passing run and its own Trust Mark, not that a workflow behaves correctly against your data. The eval sets whose cases need a fact only the host application can compute are dropped before scoring rather than passed on an absent field, and that narrowing shows up in the pack's own declared eval list. Per-workflow behavioural evidence needs a per-workflow sample a submission does not carry today.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE REVIEW CHECKLIST — five requirements that can each go red.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface CertRequirement {
  /** The requirement's name, as the platform holds it. */
  name: string;
  /** The fact it reads. Every one of these can be absent, which is why the checklist can fail. */
  reads: string;
  /** The finding the reviewer is shown when it fails — quoted from the platform. */
  finding: string;
}

/**
 * ⚠️ WHY THIS LIST IS INTERESTING AT ALL. The surface behind it used to review all five requirements
 * as passed, in a loop, against a listing id that did not exist — a compliance checklist that could
 * not go red, rendered on a console as evidence. Each requirement now reads a fact that can be
 * missing. That history is the reason the page publishes the FINDINGS rather than the tick marks.
 */
export const CERT_REQUIREMENTS: CertRequirement[] = [
  {
    name: "Security review",
    reads:
      "Whether a valid Trust Mark actually resolves, in the mark store, for this listing's workflow — cross-checked against the mark the listing claims to carry.",
    finding:
      "no VALID assure1 Trust Mark resolves for this listing's workflow — the eval-gated review was never passed, or the mark was revoked",
  },
  {
    name: "Least-privilege scopes",
    reads:
      "The connectors and scopes the submission itself declared. A wildcard grant fails it — and so does declaring none at all, which makes least privilege unreviewable rather than satisfied.",
    finding: "wildcard grant(s) {scopes} — least-privilege requires enumerated scopes",
  },
  {
    name: "Documentation",
    reads: "Whether the listing's workflow declares a governed step sequence a reviewer can read.",
    finding:
      "the listing's workflow declares no governed step sequence — there is nothing for a reviewer to read, so documentation cannot be signed off",
  },
  {
    name: "Support contact",
    reads: "Whether an owner is recorded on the listing at all.",
    finding: "no partner/owner recorded on the listing — there is no one to escalate an incident to",
  },
  {
    name: "Data handling",
    reads:
      "How many safety-dimension cases the certification battery actually scored — the count, not the colour.",
    finding:
      "the certification battery scored ZERO safety-dimension cases — data handling was never actually exercised (an empty scan is not a pass)",
  },
];

/** The empty state, quoted. It is the whole design philosophy of the surface in one sentence. */
export const CHECKLIST_EMPTY_STATE =
  "no listed partner item on this tenant — there is nothing to review. An empty checklist is NOT a passing checklist.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * CERTIFIED TALENT — the Resources nav lands here, and the answer is the Academy answer.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/** The anchor the "Certified talent" nav link should target. Kept here so a page cannot mistype it. */
export const TALENT_ANCHOR = "talent";

/**
 * Why the talent question is on the partner page at all — and it is a mechanism, not a supply.
 * Ships with TALENT_MECHANISM and TALENT_LIMIT, imported from courses.ts. Never one without the other.
 */
export const TALENT_INTRO =
  "Demand posted to the matching mechanism is of two kinds: a delivery need, and a partner build. That is why the talent question lands on this page. What it is, precisely, is a consent-gated matching mechanism — and what it is not is a pool of people you can hire from today.";

export const TALENT = {
  intro: TALENT_INTRO,
  mechanism: TALENT_MECHANISM,
  limit: TALENT_LIMIT,
} as const;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE HONEST LIMITS. Close with a list, not a clean bill.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const PARTNER_LIMITS: { title: string; body: string }[] = [
  {
    title: "Nobody has come through the door",
    body: "No partner is registered, no listing in the catalogue was submitted by anyone outside elan1, and no tenant has installed a partner contribution. The seeded listing that appears in a demonstration environment is the platform exercising its own submit, certify and list path so the mechanism can be shown working; in production the catalogue is empty until somebody lists.",
  },
  {
    title: "There is no partner portal",
    body: "The certification and install surfaces report their own state to anyone who reads them: the partner-facing web portal and real install provisioning are named as pending in the payload itself. Applying today means a conversation with a person. Nothing on this site provisions an account, creates a listing, or places you in a programme.",
  },
  {
    title: "A partner certification is narrower than a first-party one",
    body: "The battery belongs to the governance signature the submission referenced and runs over a fixed sample the platform supplies, and the eval sets that need a fact only a host application can compute are dropped before scoring rather than passed on an absent field. Certification establishes that each shipped workflow has its own passing run and its own mark. It does not establish behaviour against your data.",
  },
  {
    title: "Two other code paths are called certification, and one of them is a status write",
    body: "The path described on this page is the eval-gated one, and it is the one that is wired. A second, simpler partner registry sits in the codebase whose sign-off sets a status without consulting a checklist; it is reachable from no endpoint, and a test derived from the server's own source fails if it is ever referenced there. We name it because a future wiring of the wrong one would quietly turn this page into a false claim.",
  },
  {
    title: "No commercial terms are published",
    body: "No fee, no revenue-share rate, no tier and no tier benefit. The registry that would produce a referral statement sits behind that same unwired path, the rates in it are illustrative constants, the statement it produces moves no money, and nothing has been agreed with anybody. Commercials are a conversation, and we will not dress one up as a programme.",
  },
  {
    title: "We hold no certification of our own to lend you",
    body: "elan1 is not a certification body. No SOC 2 and no ISO 27001 certification is held today — what exists is the control set those audits examine plus the readiness work, published as readiness and not as a certificate. Academy's credential is our own, against our own platform, and no external body recognises it.",
  },
  {
    title: "Nothing here has been measured in a customer environment",
    body: "No time to certification, no time to first install, no partner-sourced revenue, no adoption figure. Where this page says what a mechanism does, that is what the code does; there is no observed outcome behind any of it, and a figure would have to be invented.",
  },
  {
    title: "No certification date, on purpose",
    body: "Certification is eval-gated and may withhold: a battery that did not pass refuses the mark, and a battery that scored nothing is refused rather than counted as clean. We will tell you what failed and what it would take. We will not tell you when you will be certified.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * STARTING A CONVERSATION — the honest CTA, and the honest refusal list beside it.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const HOW_TO_START: string[] = [
  "Tell us what you build or deliver, and which part of the business or which industry it touches.",
  "If it is a connector, name the operations it exposes and the ones you would actually need granted. The least-privilege check happens at declaration, so this is the conversation either way.",
  "If it is a pack, name the apps it would compose and the governance signature it would run under. Both have to already exist — that constraint is the point, and it is worth hitting early.",
  "If it is delivery, name the engagement you want to run and who on your team would hold the platform roles, because roles are what the runtime checks.",
  "We will tell you which shape fits, what the kit will refuse before you write it, and what certification will ask of you.",
];

export const WHAT_WE_WILL_NOT_DO: string[] = [
  "Put your logo on this site, or ours on yours, before there is work behind it.",
  "Announce a partnership. There is no press release, and the newsroom says plainly that we have no customers, coverage or awards to point at.",
  "Name a date for certification, or certify around a failing battery.",
  "Publish a tier, a fee or a revenue share as though it were a standing programme.",
  "Give a partner build a privilege a first-party build does not get — the kit itself holds no way to register a policy, grant a scope or write an audit entry.",
];

