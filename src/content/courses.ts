// content/courses.ts — Academy: the authored curriculum, the certification paths it is written
// toward, and the honest note about what none of it has done yet.
//
// WHAT THIS SURFACE IS. Academy is the learn-surface under Resources (see `home: "resources"` in
// content/services.ts). Two different things sit under that one name, and this file keeps them
// apart on purpose:
//
//   THE CURRICULUM — the courses below. Authored design. We wrote them; no cohort has run them.
//   THE CERTIFICATION PATHS — a small, fixed set in the platform's enablement module. Each is tied
//   to a role the access system actually holds, and each refuses to certify until every module in
//   that path is recorded complete.
//
// A course is not a path. Finishing one course mints nothing. That distinction is the single most
// important thing on this surface, and COURSE_PATH_NOTE exists so a page cannot render it away.
//
// 🚨 THE FIVE CONSTRAINTS A FUTURE EDITOR WILL WANT TO BREAK, AND WHY THEY EXIST.
//
//   1. A COURSE MAY ONLY POINT AT A PATH THAT EXISTS.
//      An earlier draft of this file derived its role union from the platform's ROLE TABLE — the set
//      of roles the access system knows — and shipped a course against `viewer` on the strength of
//      it. That was the wrong collection. The role table is the SUPERSET a path's role must be drawn
//      FROM; it is not the set of things that get certified. Certifications are minted against a
//      LEARNING PATH, and the enablement module ships one path each for operator, approver, admin
//      and sales. There is no path for viewer, so nothing certifies it, and a course pointed at it
//      led to a credential the platform could not mint.
//      `CertifiableRole` is now DERIVED FROM `CERTIFICATION_PATHS` — the paths themselves — so a
//      course naming a role with no path is a type error rather than a copy-review miss. Point the
//      guard at the collection whose absence would break the claim, never at the one that merely
//      contains it.
//
//   2. A COURSE IS NOT A PATH, AND THE PAGE MUST SAY SO.
//      There are more courses here than there are paths, because the curriculum goes deeper than the
//      enablement module's own module lists. `course.role` names the path a course is written
//      TOWARD. It does not mean that course confers that certification. See COURSE_PATH_NOTE.
//
//   3. A COURSE'S `level` IS NOT THE CREDENTIAL LEVEL.
//      The credential ladder is computed from BREADTH — how many platform roles a person is certified
//      for — never from how hard one course was. No single course can confer Expert, because Expert
//      requires certifications for all three core operating roles. `level` on a Course therefore
//      describes the DEPTH OF THE MATERIAL and nothing else; `CERT_LEVELS` describes the ladder.
//      See COURSE_LEVEL_NOTE, which exists so a page cannot render the two as the same thing.
//
//   4. NO COURSE LENGTH IS PUBLISHED AS A COMMITMENT.
//      An earlier draft carried "Half a day / One day / Two days" and defended them as a scheduled
//      delivery commitment. That defence is the disqualifier: relabelling an unevidenced number as a
//      commitment upgrades it from a description into a promise, and we hold no schedule, curriculum
//      record or instructor behind one. `format` is now a closed union in which the qualifier is
//      INSIDE the string — "Designed as a half-day format — not yet delivered" — so a card, a
//      listing or a search snippet cannot carry the number without carrying the caveat.
//
//   5. "CERTIFIED TALENT" MUST NOT IMPLY A BENCH.
//      The talent surface is a consent-gated matching MECHANISM. It has no supply in it: the directory
//      lists only practitioners who have opted in, and the copy of it that ships inside the control
//      plane is seeded with demonstration practitioners so the mechanism can be exercised. We publish
//      no count of certified people and represent no pool of hireable talent. TALENT_MECHANISM and
//      TALENT_LIMIT are written together for that reason — do not ship one without the other.
//
// SOURCES AND COUNTS. Every mechanism below is traceable to the platform tree; the refusal strings in
// CERT_REFUSALS are quoted from the enablement and credential code rather than paraphrased. Platform
// counts are NEVER hand-typed — they come from content/platform-facts.ts, which carries each number's
// derivation and the date it was counted. The one number this file produces itself is the number of
// certification paths, and it is RENDERED FROM `CERTIFICATION_PATHS` rather than typed as a numeral,
// so the sentence and the list cannot drift apart. If that number is ever needed on a page outside
// Academy, it belongs in platform-facts.ts with its derivation, not re-typed there.

import { ACCENT } from "./types";
import { factValue } from "./platform-facts";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE CERTIFICATION PATHS — the collection everything else on this surface is checked against.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface CertificationPath {
  /** The platform role this path certifies. Validated against the access system's role table. */
  role: string;
  /** Reader-facing name of that role. */
  roleName: string;
  /** The path's own title, as the enablement module ships it. */
  title: string;
  /** What holding this certification says a person has been through. */
  certifies: string;
}

/**
 * The certification paths the platform actually ships — one per certified role.
 *
 * Derivation: one entry per learning path in the enablement module's catalogue, each tied to a role
 * the access system's role table holds. Mirrored by hand because the site cannot import the
 * platform; the mirror is what `CertifiableRole` is derived from, so a course can never point at a
 * path that is not in this list.
 *
 * ⚠️ One reconciliation to keep: the enablement module titles the sales path after that app's
 * internal package name. The site publishes the product name — sales1 — because an internal package
 * identifier has no business in reader-facing copy. Change one and change the other.
 */
export const CERTIFICATION_PATHS = [
  {
    role: "operator",
    roleName: "Operator",
    title: "Operate the platform",
    certifies:
      "Running agents day to day — the consoles, runs, traces and metered cost — without the ability to change what is turned on.",
  },
  {
    role: "approver",
    roleName: "Approver",
    title: "Approve with confidence",
    certifies:
      "Sitting on the human side of a consequential action: reading a governance decision, resolving an approval, and verifying the trail afterwards.",
  },
  {
    role: "admin",
    roleName: "Administrator",
    title: "Administer the platform",
    certifies:
      "The control plane — identity and access, staged rollout, and one governance pane across the apps.",
  },
  {
    role: "sales",
    roleName: "App operating role (sales)",
    title: "Run sales1",
    certifies:
      "Operating one app end to end: grounded research, drafted outreach, and commitments that stop at a person.",
  },
] as const satisfies readonly CertificationPath[];

/**
 * The roles a certification can actually be minted for.
 *
 * DERIVED FROM THE PATHS, deliberately — not from the platform's role table. A path is what
 * certification is issued against, so the paths are the collection whose absence breaks the claim.
 * Widening this union means shipping a path in the platform first.
 */
export type CertifiableRole = (typeof CERTIFICATION_PATHS)[number]["role"];

/** Every role in the access system's role table, including the one no path certifies. */
export type PlatformRole = CertifiableRole | "viewer";

/** What each platform role is permitted to do, and whether anything certifies it. */
export interface RoleGrant {
  role: PlatformRole;
  /** Reader-facing name of the role. */
  name: string;
  /** What holding this role lets a person do — the permissions, in plain English. */
  grants: string;
  /** Where the role stops. Written as a limit, because the limit is the interesting half. */
  stopsAt: string;
  /**
   * The path that certifies this role, by title — or `null` where the platform ships none.
   * `null` is not a gap to be filled in copy. It is the honest state, and the page must render it.
   */
  certifiedBy: string | null;
}

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE CURRICULUM.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * How long a course is designed to take, with the caveat welded into the value.
 *
 * There is no bare "Two days" in this file and there must never be one. No cohort has run, so a
 * length on its own is a delivery promise we cannot keep. The qualifier travels with the number
 * because it is the same string.
 */
export type CourseFormat =
  | "Designed as a half-day format — not yet delivered"
  | "Designed as a one-day format — not yet delivered"
  | "Designed as a two-day format — not yet delivered";

export interface Course {
  slug: string;
  title: string;
  /**
   * The certification path this course is written TOWARD, named by the role that path certifies.
   * It does NOT mean finishing this course confers that certification — the path does, and only
   * when every module in the path is recorded complete. See COURSE_PATH_NOTE.
   * Constrained to the roles a path exists for — see CertifiableRole.
   */
  role: CertifiableRole;
  /**
   * The depth the material is pitched at — NOT the credential a graduate holds.
   * See COURSE_LEVEL_NOTE. The ladder in CERT_LEVELS is computed from breadth of roles.
   */
  level: "Associate" | "Professional" | "Expert";
  summary: string;
  /** The taught sequence. Each entry is a session, not a slide. */
  modules: string[];
  /** Wayfinding accent (hex). Use a token from ACCENT so the palette stays one system. */
  accent: string;

  // ——— Added in the depth pass. REQUIRED, not optional, and the reason matters: ———
  // a course card with no audience is an advert, a course with no prerequisites implies anyone can
  // walk in, and a course with no honest limit is the exact shape of over-promise this site exists
  // to avoid. Making them required means a half-written course fails the build instead of shipping.

  /** Who this is for, in the language of the job they do. */
  audience: string;
  /** Designed length, with its own caveat inside it. See CourseFormat — never publish a bare number. */
  format: CourseFormat;
  /**
   * The tasks the course is BUILT AROUND — mechanical actions on real surfaces, so each one could be
   * demonstrated in front of you. They are design decisions, not observations: no cohort has run and
   * nobody has been assessed against them. Never a business outcome, and never a measured result.
   * A page renders these under "what you practise", never under "outcomes".
   */
  practicals: string[];
  /** What you need before you start. "None" is a legitimate and useful answer — say it plainly. */
  prerequisites: string[];
  /** What this course deliberately does NOT cover, so nobody buys it for the wrong reason. */
  notCovered: string;
}

/**
 * The catalogue.
 *
 * ORDER IS THE CURRICULUM. It runs: the two entry points (operate, approve) → the four mechanism
 * courses a practitioner needs to work the governance surfaces (policy, evals, rollout, audit) →
 * the two that decide what the platform is allowed to touch (connectors, signatures) → the two
 * builder/administrator courses → the three app courses. A page may group it, but should not
 * re-sort it into "popular first".
 */
export const COURSES: Course[] = [
  {
    slug: "operate",
    title: "Operate the platform",
    role: "operator",
    level: "Associate",
    accent: ACCENT.cyan,
    audience: "Anyone who will have the consoles open during the working day — ops, shared services, an app owner's deputy.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      `The day-to-day seat. One core carries every one of the ${factValue("suiteApps")} apps, so the run list, the trace, the cost and the audit entry for a sales1 agent and a finance1 agent are the same four things in the same place. You learn to read a run rather than react to it.`,
    modules: [
      "One core, many apps — what is shared, what an app owns, and why that means one place to look",
      "The run list — status, model, latency and priced cost, read from a durable store rather than a process that can be restarted",
      "Opening a trace — a run's own chain of audit events, with hashes, rather than a second log to reconcile",
      "The worklist that proposes and does not act — failing batteries, drifted marks, agents with no eval history",
      "Escalating properly: what an operator may read, what they must hand to an approver, and what only an administrator can change",
    ],
    practicals: [
      "Open any agent run and say what it did, which model it used, what it cost and where that is written",
      "Tell a refused run apart from a failed one, and name which gate refused it",
      "Read the rollout state without being able to change it — the operator role grants the read, the administrator role holds the change",
      "Hand an item off the improvement worklist to the person whose approval it actually needs",
    ],
    prerequisites: ["None. This is the entry point of the programme."],
    notCovered:
      "Changing anything. An operator may run, call a granted connector, and read approvals, audit, skills, governance and the rollout state. Enabling a function, resolving an approval and editing a policy each belong to a different role and a different course.",
  },

  {
    slug: "approve",
    title: "Read an approval queue",
    role: "approver",
    level: "Professional",
    accent: ACCENT.rose,
    audience: "The named humans who sit on the other side of a consequential action — a deal desk, a controller, a service lead, a risk reviewer.",
    format: "Designed as a half-day format — not yet delivered",
    summary:
      "An approval queue is only worth anything if you know what you are signing. This course is about the anatomy of a request: what it binds to, what it cannot be spent on afterwards, and the two cases where the queue refuses you rather than the action.",
    modules: [
      "What a request carries — the action, the payload, the requester, and the role required to resolve it",
      "Binding: a token is tied to both the action and a hash of the exact payload, and is consumed on use — so an approval for one operation cannot be spent on another",
      "Segregation of duties — on a request flagged for it, the person who asked cannot be the person who approves; the administrator role does not bypass this, because it is a control and not a permission",
      "Reading the governance decision that produced the request: allowed, refused, or routed to you — and the reasons attached",
      "Rejecting well: what a rejection leaves on the record, and why it is as much a decision as an approval",
    ],
    practicals: [
      "Say, before approving, exactly which payload the approval will be spendable against",
      "Recognise a request you are disqualified from resolving, and why the refusal is protecting you",
      "Read a policy decision's reasons rather than the request's title",
      "Find the audit entry your approval produced, and the one the action produced after it",
    ],
    prerequisites: [
      "Operate the platform, or equivalent time in the consoles.",
      "A role in your tenant that can resolve approvals — your administrator grants it; finishing this course does not.",
    ],
    notCovered:
      "Judgement about your own business. The course teaches what the gate guarantees mechanically; whether a particular discount, refund or payment should be approved is your policy, and writing that policy down is a different course.",
  },

  {
    slug: "author-a-policy",
    title: "Author a policy the runtime enforces",
    role: "admin",
    level: "Expert",
    accent: ACCENT.rose,
    audience: "Risk, compliance and platform owners who currently express rules as guidance and want them expressed as a decision the runtime makes.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      "A rule written in a prompt is a request. A policy is evaluated before a terminal action, against the action and its payload, and returns one of three answers: allow, refuse, or route this to a named human. This course is about writing the third answer on purpose.",
    modules: [
      "The three answers — allowed, refused with reasons, requires-approval — and why the middle one is the only honest place to say no",
      "Policy tags: attaching a rule to a class of action rather than to one agent, so a new agent inherits the rule instead of re-declaring it",
      "Writing a refusal string a human can act on — the refusal is the product, and it lands on the audit trail as written",
      "Consequence derived, not declared: an agent holding a money or commit tool is raised to a human gate by what it carries, not by whether the author remembered to tick a box",
      "Testing a policy against payloads that should pass — a rule that has never allowed anything has not been tested",
      "The permissive case, read honestly: a rule whose input is not wired reports itself permissive rather than pretending to a check it cannot make, and knowing which of those you are looking at is the whole skill",
    ],
    practicals: [
      "Turn a written control into a policy that returns refuse-with-reasons rather than a warning nobody reads",
      "Choose correctly between refusing an action and routing it to an approver",
      "Write a refusal a person can act on without opening the code",
      "Show where a policy decision is recorded, and read it back later",
      "Take a registered rule and establish whether its clause can fire at all in the deployment in front of you",
    ],
    prerequisites: [
      "Read an approval queue.",
      "An administrator role in a non-production tenant to author against.",
    ],
    notCovered:
      "A guarantee that every write in your estate passes the governed writer. A standing guard holds a ceiling over the mutating handlers that still reach a system of record outside it, and that ceiling is not zero — it may only fall. Governed-everywhere is a direction with a ratchet on it, and the course shows you the ratchet rather than claiming the destination.",
  },

  {
    slug: "read-an-eval",
    title: "Read an eval battery, and its third state",
    role: "approver",
    level: "Professional",
    accent: ACCENT.rose,
    audience: "Anyone who will be shown a green tick and asked to rely on it — assurance, internal audit, risk, and the approver who signs after it.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      "Most of this course is about the state between pass and fail. A case with nothing to score reports \"not measurable — insufficient evidence on this tenant (this is NOT a pass)\", and a battery in which nothing was measurable did not pass — it did not run. Learning to see that state is the difference between reading evidence and reading a colour.",
    modules: [
      "Authoring a battery as data — contains, equals, nonempty, minimum length, maximum count, is-true, regular expression, and a judge",
      "Why the compiler refuses to publish a suite that cannot run: no assertions, an unknown check, a missing value, or a judge criterion with no grader wired",
      "The third state, in full — what produces it, why an unasked question is not a passed question, and how a run's verdict excludes it",
      "No eval, no mark: a certification refuses a run it cannot find, a run that scored zero cases, a run that did not pass, and a run belonging to another tenant",
      "A mark is evidence about the model it was earned on — when the runtime moves to another model, the mark reads stale, not certified",
      "The coverage register as a denominator: certified, drifted, revoked, stale and never-scored, with uncertified reported as unknown rather than as failing",
    ],
    practicals: [
      "Spot a battery whose result is a colour rather than a measurement",
      "Say how many cases were actually scored behind a certification, not merely that it exists",
      "Recognise a certification that is stale because the model beneath it changed",
      "Read a coverage figure as a fraction of an estate, including the part that has never been measured",
    ],
    prerequisites: ["Read an approval queue, or equivalent exposure to the governance surfaces."],
    notCovered:
      "How much of your estate holds a behaviour battery. The default certification for an agent is a structural declaration check — it reads what the agent declares, not how it behaves. A behaviour battery sits over a specific, named set of agents, and your own coverage register lists them by name: the course teaches you to ask for that list rather than to assume the second kind is the default.",
  },

  {
    slug: "stage-a-rollout",
    title: "Stage a rollout, and stop one",
    role: "admin",
    level: "Expert",
    accent: ACCENT.cyan,
    audience: "Platform administrators and the change-approval forum that has to sign off on turning something on.",
    format: "Designed as a half-day format — not yet delivered",
    summary:
      `Nothing is on because it exists. A function stays disabled for a tenant until an administrator enables it, and a run of a disabled function is refused before it acts — "finance1.ap_ar not enabled for tenant acme". Across the platform the baseline wave turns on ${factValue("agentsEnabled")} of the ${factValue("agentsRegistered")} registered agent functions; the rest are deliberately off, which is a control rather than a gap.`,
    modules: [
      "The wave gate — enabling per tenant, per function, and what the refusal looks like when someone runs ahead of it",
      "Reconciling the two sides: agents registered but enabled nowhere, and enabled entries naming no agent — the second of which is an unambiguous defect",
      "The incident stop — one action suspends an app's agent fleet, immediately, because reducing capability is the wrong thing to make wait in a queue",
      "Reading the two refusals apart: \"finance1 is SUSPENDED (incident kill-switch) for tenant acme\" is named distinctly from \"finance1.ap_ar not enabled for tenant acme\", so an incident stop never reads as a configuration gap",
      "Why lifting the stop needs an approval and applying it does not — the asymmetry is the point",
      "Non-destructive by design: the enabled set is left intact under a suspension and written down rather than held in memory, so a restart does not lift the stop and resuming restores the exact prior wave",
      "Sequencing a wave you can defend: what you enable first, what evidence you want before the second wave, and what you write down either way",
    ],
    practicals: [
      "Enable one function for one tenant and produce the audit entry that records who did it",
      "Demonstrate the refusal a not-yet-enabled function returns, with the app and tenant named in it",
      "Halt an app's agent fleet in one action and show that its functions are refused while it is halted, with the incident named in the refusal",
      "Resume to the exact prior wave rather than re-deriving it from memory",
      "Check for yourself whether the stop reaches a given write path in the deployment in front of you, rather than assuming it does",
    ],
    prerequisites: [
      "Operate the platform.",
      "An administrator role. An operator can read the rollout state but cannot change it — that split is enforced by the role, not by convention.",
    ],
    notCovered:
      "Two things, named rather than implied. The stop halts the agent fleet; it does not, as the control plane is wired today, also refuse that app's direct system-of-record writes — the generic rule that would do that is registered without the rollout reference its clause needs, so the clause cannot fire, and the course shows you how to check rather than assume. And there is no service-level machinery in the operating layer and no on-call rotation engine: paging routes to your own tool, and the rotation is a human responsibility.",
  },

  {
    slug: "investigate-the-audit-chain",
    title: "Investigate with the audit chain",
    role: "approver",
    level: "Associate",
    accent: ACCENT.blue,
    audience: "Internal audit, second line, security, and anyone who will be asked \"what happened\" a week after it happened.",
    format: "Designed as a half-day format — not yet delivered",
    summary:
      "The trail is per-tenant and hash-chained, and reading it re-walks and re-hashes rather than displaying a stored verdict. This course teaches the investigation, not the theory: start from a consequence, walk back to the decision, and end holding a receipt someone else can check without access to the running platform.",
    modules: [
      "Reading an entry — the actor, the action, the decision, and the entry's own hash and predecessor",
      "Why an entry cannot be edited or deleted where the trail runs on the platform's database adapter: mutation is blocked in the database itself, and a uniqueness constraint on the predecessor means the chain cannot fork into a second, friendlier history",
      "Chained is not the same as durable — how to establish which store is behind the trail you are reading before you rely on it",
      "Data minimisation at the write site, not in the reader — a connector call records the operation and its argument keys and never the argument values, and a governed write records the fields that moved rather than their contents, which is what lets an erasure request be honoured against records the chain still refers to",
      "Declared damage: a re-baseline is signed and appended rather than hidden, so a gap is visible as a gap",
      "Working an investigation backwards — consequence, action, approval, policy decision, run, trace",
      "The offline receipt: verifying a compliance receipt from its own contents, with no access to the platform that produced it",
    ],
    practicals: [
      "Reconstruct who approved a specific consequential action and what payload it was bound to",
      "Show that a trail has not been altered by recomputing it, rather than by trusting a status field",
      "Produce a receipt an external party can verify without a login",
      "Explain to an auditor why an erasure request did not put a hole in the evidence",
      "Name the store behind a chain you are shown, and say whether it survives a restart",
    ],
    prerequisites: [
      "None as a course. The read-only viewer role is enough for the reading exercises in it — but note that nothing certifies that role: the certification this material sits under is the approver path, which is the one carrying the trail-verification module.",
    ],
    notCovered:
      "Placing a legal hold. The hold is consulted by the retention sweep, but nothing in production places one today — so the course teaches the retention path as it is wired, and names the part that is not.",
  },

  {
    slug: "connectors-live-or-modelled",
    title: "Decide live, modelled or declared",
    role: "operator",
    level: "Associate",
    accent: ACCENT.teal,
    audience: "Integration leads and app owners deciding what to wire first, and what to deliberately leave standing in.",
    format: "Designed as a half-day format — not yet delivered",
    summary:
      `The single most misread thing about a connector fabric is what "connected" means. ${factValue("connectors")} connectors are registered and callable; a registered connector runs against a deterministic modelled adapter — real interface, real governance, not real data — until credentials and a grant are wired. This course is about making that call deliberately instead of discovering it in a demo.`,
    modules: [
      "The three honest states — live, modelled, declared — and what a page is allowed to claim about each",
      "A grant is a human approval, and it resolves against the operations a connector actually declares: asking for one it does not expose raises rather than quietly widening the grant",
      "Credentials as references: unsealed only at the tool boundary, only under their own connector's identity, only after the scope check, and scrubbed out of errors",
      "What the audit records about a connector call — the operation and the argument keys, never the argument values",
      "Consequential over the wire: the platform exposed as a governed server returns a consequential tool call as an error requiring approval, so an external client cannot self-approve",
      "The decision itself — when a modelled adapter is the right answer for longer than you expect, and what changes the day you make one live",
    ],
    practicals: [
      "State, for any seam in front of you, whether it is live, modelled or declared — and what would change if it moved",
      "Read a grant as a list of operations rather than as access to a system",
      "Show where a credential is unsealed and where it is scrubbed",
      "Write a wiring sequence that puts the credential work where the risk actually is",
    ],
    prerequisites: ["Operate the platform."],
    notCovered:
      "Building the adapter. Making a seam live means wiring a native adapter or pointing it at your own server, and that is engagement work rather than a course exercise.",
  },

  {
    slug: "governance-signature",
    title: "The vertical governance signature",
    role: "approver",
    level: "Professional",
    accent: ACCENT.clayDeep,
    audience: "Industry leads, compliance owners and the reviewer who has to decide whether an industry pack is a control or a costume.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      `An industry pack is configuration over one core, and what makes it more than branding is its signature — the one thing it enforces on the write path that the generic suite does not. ${factValue("governanceSignatures")} signatures are declared across the verticals, the suite apps and the control-plane surfaces. This course teaches you to tell a wedge from a posture.`,
    modules: [
      "Wedge versus posture — \"built for regulated lending\" is a posture; \"a disbursal against a lapsed sanction is refused at the write\" is a wedge",
      "The four states a regulatory rail can honestly be in — enforced at the write, computed at read as decision support, declared as configuration or attestation, or modelled by a deterministic stand-in",
      "Why a constant named after a regulation is not enforcement of it, and how to check which one you are looking at",
      "A pack cannot certify without its signature bound — \"pack '{pack}' has no governance signature bound — cannot certify\"",
      "Reading a pack's eval battery for whether a set can actually fail, rather than whether a set exists",
      "Working a signature review: the four questions to ask of any vertical claim before you repeat it",
    ],
    practicals: [
      "Ask of any industry claim whether it is enforced, computed, declared or modelled — and get an answer",
      "Find the refusal string behind a compliance claim, or establish that there isn't one",
      "Tell an eval set that could fail apart from one that could not",
      "Review a pack's signature the way a regulator would read it",
    ],
    prerequisites: ["Read an eval battery, and its third state."],
    notCovered:
      "Legal or regulatory advice. The course teaches what the code does about a rule; whether that satisfies your obligation is a question for your counsel and your regulator, and elan1 is not a certification body.",
  },

  {
    slug: "build-in-studio",
    title: "Build an agent the studio can refuse",
    role: "admin",
    level: "Expert",
    accent: ACCENT.green,
    audience: "Platform administrators and internal builders who will author agents rather than commission them.",
    format: "Designed as a two-day format — not yet delivered",
    summary:
      "An agent here is a typed blueprint compiled through the same path every agent on the platform takes. The interesting part of the course is the refusals: an advisory agent that holds a control-system connector does not compile, and publishing without a passing eval for that agent in that tenant is refused outright.",
    modules: [
      "The blueprint — name, instructions, model policy, tool grants, skills, policy tags — and what each one costs you at the gate",
      "The advisory guarantee, enforced at compile time: an advisory blueprint may hold none of the control-system connectors, and the build raises rather than warns",
      "Consequence derived from what the blueprint carries: holding a money or commit tool raises the agent to a human gate live, as you type",
      "Rules as versioned, content-hashed skills with lineage — and the publish gate that refuses a shared skill carrying a raw sensitive value",
      "No eval, no publish — running the draft, reading the step trace, and the human approval that publishing itself is",
      "Life after shipping: the drift scan that names every certified agent whose body no longer matches what was certified, and why re-certifying is a person's decision",
    ],
    practicals: [
      "Author a blueprint and make the studio refuse it on purpose, then fix it",
      "Explain why an agent is at a human gate by pointing at what it holds rather than at a setting",
      "Publish through the eval gate and produce the mark, the approval and the audit entries that resulted",
      "Run a drift scan and read the worklist it produces",
    ],
    prerequisites: [
      "Author a policy the runtime enforces.",
      "Decide live, modelled or declared.",
      "An administrator role in a tenant you are allowed to break.",
    ],
    notCovered:
      "Model selection as a science. Routing and cost policy are taught in the run-cost course; choosing a model for a task is a judgement the course frames rather than settles.",
  },

  {
    slug: "administer",
    title: "Administer the control plane",
    role: "admin",
    level: "Expert",
    accent: ACCENT.violet,
    audience: "The people who will own the tenant: platform administrators, and the IT owner accountable for who can do what.",
    format: "Designed as a two-day format — not yet delivered",
    summary:
      "The administrator role holds every permission the platform's scope lattice can express, which is exactly why the course spends its time on restraint: least privilege, the controls an administrator cannot bypass, and the widenings of access that are themselves approved, audited actions.",
    modules: [
      "Tenants, principals and roles — and granting the smallest role that does the job",
      "The controls an administrator does not outrank: on a request flagged for segregation of duties, holding the administrator role does not let the requester approve their own request",
      "Keys that can only narrow: an issued key's scopes are a second gate over the same lattice and can never widen the role behind them",
      "One governance pane — approvals, marks, policies and audit for every app in one place rather than one console per app",
      "Rollout, suspension and resume as audited administrative actions, and why lifting a suspension expands access and therefore needs an approval",
      "Data lifecycle in practice: retention by data class with the audit trail exempt, an erasure that keeps the record shell, and the honest scope of the sweep that is actually wired",
      "Reading the readiness surface honestly — what is enforced, what is declared but not yet consulted, and what is built but not yet wired",
    ],
    practicals: [
      "Design a role assignment that survives an access review",
      "Show a control that the administrator role deliberately cannot bypass",
      "Run a rollout change, a suspension and a resume, and produce the audit entries for all three",
      "Answer a procurement question about identity, isolation, audit or retention with a state rather than an adjective",
    ],
    prerequisites: [
      "Stage a rollout, and stop one.",
      "Investigate with the audit chain.",
    ],
    notCovered:
      "Standing up the infrastructure. High availability, disaster recovery and multi-region topology ship as logic and manifests; the cluster, the backups and the restore drill are an operator step in your environment, and the recovery panel reports not-measurable until a drill has actually left a receipt.",
  },

  {
    slug: "run-cost",
    title: "Read what a run cost",
    role: "operator",
    level: "Associate",
    accent: ACCENT.cyan,
    audience: "Finance business partners, platform owners, and the operator who will be asked why last month moved.",
    format: "Designed as a half-day format — not yet delivered",
    summary:
      "Cost on the governed runtime is computed from the platform's own rate card rather than reported by the model, with prompt-cache reads and writes priced as separate parts of the prompt. A model with no rate-card entry is logged and counted as unpriced instead of quietly costing nothing — this course is largely about that word.",
    modules: [
      "Where a number comes from — the rate card, the run log, and why a self-reported cost is not evidence",
      "Unpriced as its own state: an absent rate is counted and named rather than folded into a zero",
      "Budgets per tenant and per period, and why changing one routes through the approval gate",
      "Cost-aware downshifting — dropping a tier as burn rises and never raising it — available, off by default, opted into",
      "Reading a cost regression from the priced run log: recent runs against earlier ones, computed rather than remembered",
    ],
    practicals: [
      "Attribute a period's cost to tenant, app and model from the run log",
      "Identify unpriced runs and say what is missing rather than assuming they were free",
      "Set a budget and produce the approval and audit entries the change created",
      "Explain a cost movement using the priced log rather than an anecdote",
    ],
    prerequisites: ["Operate the platform."],
    notCovered:
      "Your bill. The metered figure covers model usage on the governed runtime, is computed from a rate card that labels itself illustrative, and is a cost signal rather than an invoice or billing advice. Nothing in this programme has been measured in a customer environment.",
  },

  {
    slug: "run-sales1",
    title: "Run sales1",
    role: "sales",
    level: "Associate",
    accent: ACCENT.clay,
    audience: "Sellers, sales operations and deal desks moving onto the agentic CRM.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      "The app course for the demand side. Agents research the account, score the lead, draft the outreach and propose the next move; marking a deal won, paying a commission, renewing a subscription and releasing an order to fulfilment each stop at a person. The course is mostly about that boundary and where it sits.",
    modules: [
      "The account brief, grounded in the record rather than in the model's recollection",
      "Outreach that is drafted and not sent — the consent check at the send site, the one-tap confirm, and the recipient who is blocked outright",
      "Quotes drawn from the price book, and the discount that applies within authority but escalates beyond it",
      "The roll-up computed from open opportunities, sitting beside the rep's own committed number rather than replacing it",
      "Order to cash as one governed move: releasing a confirmed order drives the shipment and the invoice together, and unwinds if the second half fails",
      "Duplicates proposed, not merged — and why the app draws the line there",
    ],
    practicals: [
      "Work a deal through the app and name every point at which a person is required",
      "Show where a quoted number came from, on the record",
      "Trigger a refusal deliberately — an over-committed release, an ungrounded discount — and read what it says",
      "Explain the forecast to a manager as something computed rather than typed",
    ],
    prerequisites: ["None. The app operating role grants running the runtime and working approvals, and the course starts there."],
    notCovered:
      "Administering the app. Territory design, scoring models and assignment rules are configuration an administrator owns.",
  },

  {
    slug: "run-service1",
    title: "Run the service desk",
    role: "operator",
    level: "Associate",
    accent: ACCENT.gold,
    audience: "Support leads, agents and the quality reviewer behind them.",
    format: "Designed as a one-day format — not yet delivered",
    summary:
      "service1 drafts a reply and a person sends it. The course is built around that sentence: what the agent grounds an answer in, what it says when the knowledge does not support one, and which actions are refused at the data layer without a human approval.",
    modules: [
      "Grounded answers with citations — and the honest \"the knowledge base does not support this\" that is the point of the design",
      "Triage and scoring computed from the case book rather than read from a stored counter",
      "The draft-and-send boundary: a reply is queued for a person, never dispatched by the agent",
      "Refused without a person: a refund, an account change and a case close",
      "The service spine — a case that becomes a refund becomes a finance entry, each step keeping its own gate rather than inheriting the caller's",
      "Quality review: reading what the agent proposed, what the human sent, and the difference",
    ],
    practicals: [
      "Say, for any reply that went out, who sent it",
      "Show an answer's citations, and recognise a refusal to answer as correct behaviour",
      "Follow a refund from the case to the finance record and name the approval at each step",
      "Read a service metric as something computed from the case book",
    ],
    prerequisites: ["None. This is an app entry point."],
    notCovered:
      "Deflection targets. The desk is built to resolve rather than to deflect, and the programme publishes no benchmark for either — nothing here has been measured in a customer environment.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE LADDER, AND THE THREE NOTES THAT KEEP IT HONEST.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * The credential ladder.
 *
 * `level` and `body` are the two fields the Learn page renders today — do not remove them. The rest
 * exist because "Associate / Professional / Expert" tells a reader nothing about what a person can
 * be trusted with, which is the only question anyone is actually asking.
 *
 * 🎯 THE LADDER MEASURES BREADTH, NOT SENIORITY. It counts how many platform roles a person is
 * certified for — not how long they have worked, how hard the course was, or how well they did.
 * Two roles is Professional whichever two they are. That is a real property of the mechanism and
 * publishing it is the honest move: a reader who assumes it means seniority has been misled by us.
 */
export interface CertLevel {
  level: "Associate" | "Professional" | "Expert";
  /** The one-liner the Learn page already renders. Keep it short. */
  body: string;
  /** How the level is arrived at — the mechanism, not a rubric. */
  earnedBy: string;
  /** What this level's roles permit. Actions on real surfaces, not adjectives. */
  canDo: string[];
  /** Where it stops. Every level has one, including the top. */
  stopsAt: string;
}

export const CERT_LEVELS: CertLevel[] = [
  {
    level: "Associate",
    body: "Operate a certified app function.",
    earnedBy: "Certified for one platform role.",
    canDo: [
      "Work the surfaces their one role opens — running the functions their tenant has enabled and calling granted connectors as an operator, or working the queue as an approver",
      "Read a run, its trace, its priced cost and the audit entries behind it",
      "Read the approval queue and the rollout state where the role grants it, without being able to change either",
      "Recognise a refusal and route it to the person whose decision it is",
    ],
    stopsAt:
      "Deciding. An Associate resolves nothing consequential — the queue is a surface they read, not one they clear.",
  },
  {
    level: "Professional",
    body: "Operate and approve across apps.",
    earnedBy: "Certified for two or more platform roles — breadth, not seniority.",
    canDo: [
      "The union of the two or more roles they hold — in the common case, operating the platform and resolving the approvals the approver role permits",
      "Read a policy decision's reasons and say why an action was refused or routed",
      "Read an eval battery for how many cases were actually scored, and spot the not-measurable state",
      "Judge an industry pack's claim as enforced, computed, declared or modelled",
    ],
    stopsAt:
      "Widening access. A Professional cannot enable a function, grant a connector, change a budget or lift a suspension — each of those expands what the platform may do, and each belongs to an administrator.",
  },
  {
    level: "Expert",
    body: "Operate, approve and administer the control plane.",
    earnedBy: "Certified for all three core operating roles — operate, approve and administer.",
    canDo: [
      "Everything above, plus enabling functions per tenant and sequencing a rollout wave",
      "Author policies, grant connectors, set budgets, and publish an agent through the eval gate",
      "Halt an app's agent fleet in one action, and resume it to the exact prior wave",
      "Answer a procurement or audit question with a state — enforced, declared, or built but not wired — rather than an adjective",
    ],
    stopsAt:
      "The controls that outrank the role. An administrator still cannot approve a request they raised where segregation of duties applies, cannot mint a certification without a passing eval behind it, and cannot switch off the runtime's certification gate by configuration.",
  },
];

/**
 * WHY THIS NOTE IS AN EXPORT AND NOT A COMMENT. A page that renders `course.level` beside
 * `CERT_LEVELS` invites the reader to conclude that finishing one Expert course makes them an
 * Expert. It does not, and the platform is the reason: the credential level is computed from how
 * many roles a person holds certifications for. Render this wherever both appear.
 */
export const COURSE_LEVEL_NOTE =
  "A course's level describes the depth of the material. It is not the credential: the ladder is computed from how many platform roles a person is certified for, so no single course confers Expert — that one needs all three core operating roles.";

/**
 * The second half of the same honesty. The level counts roles; the ROLES carry the permissions. So
 * what a person at a level can actually do is the union of the roles behind it, never a fixed list —
 * and a page that renders `canDo` as a fixed list without this note has quietly promised more than
 * the mechanism delivers. It also says the harder thing: read the ladder as the shape a certification
 * takes, not as one anyone holds today.
 */
export const CERT_LADDER_NOTE =
  "Read the level as breadth and the roles as the grant. Two roles is Professional whichever two they are, and what that person can do is the union of them — the ladder is a count, not a rank. Read it as the shape the certification takes, not as one you can hold today: no cohort has run.";

/**
 * 🚨 THE NOTE THAT KEEPS THE CATALOGUE APART FROM THE PATHS. There are more courses on this page
 * than there are certification paths in the platform. A page that prints "certifies · operator" on
 * every card, with no note, tells a reader that thirteen certifications are available. Four are.
 * Both numbers below are rendered from the collections above, never typed.
 */
export const COURSE_PATH_NOTE =
  `A course is not a certification path. We publish ${COURSES.length} courses of authored curriculum, and the platform ships ${CERTIFICATION_PATHS.length} certification paths — one each for operator, approver, admin and sales. A course names the path it is written toward; finishing one course mints nothing. A certification is issued only when every module in its path is recorded complete, and only for a role the access system already holds.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE ROLE TABLE — the most checkable thing on the page, including the row with nothing in it.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * Every role in the platform's access-control role table, with what each one grants and what
 * certifies it.
 *
 * ⚠️ THIS TABLE IS NOT THE SET OF CERTIFIABLE ROLES, AND THE DIFFERENCE IS THE POINT. An earlier
 * draft published this list as "the five roles a certification can attest", which read a
 * containment check as an enumeration: the platform validates a path's role AGAINST this table, so
 * the table is the superset a path must draw from. `viewer` is in it and no path certifies it —
 * which is why `certifiedBy` is nullable, why the null renders, and why `CertifiableRole` is derived
 * from CERTIFICATION_PATHS instead of from here.
 */
export const PLATFORM_ROLES: RoleGrant[] = [
  {
    role: "operator",
    name: "Operator",
    grants:
      "Run the runtime, call granted connectors, and read approvals, the audit trail, the skills registry, governance decisions and the rollout state.",
    stopsAt: "Changing the rollout. Operators see the wave state; administrators change it.",
    certifiedBy: "Operate the platform",
  },
  {
    role: "approver",
    name: "Approver",
    grants: "Work the approval queue — raise, resolve and read — and read the audit trail.",
    stopsAt:
      "Running anything. The approver role is deliberately narrow: it decides, and it does not act.",
    certifiedBy: "Approve with confidence",
  },
  {
    role: "admin",
    name: "Administrator",
    grants: "Every permission the platform's scope lattice can express.",
    stopsAt:
      "The controls that are not permissions. Segregation of duties is not bypassed by holding this role, and a certification still cannot be minted without a passing eval behind it.",
    certifiedBy: "Administer the platform",
  },
  {
    role: "sales",
    name: "App operating role (sales)",
    grants: "Run the runtime and work approvals — the shape an in-app operating role takes.",
    stopsAt: "The control plane. It grants nothing over identity, rollout, policy or budgets.",
    certifiedBy: "Run sales1",
  },
  {
    role: "viewer",
    name: "Viewer",
    grants: "Read the audit trail and the skills registry.",
    stopsAt:
      "Everything else. It is the smallest role in the platform, and it is the right one for an auditor who should be able to check the record and change nothing.",
    certifiedBy: null,
  },
];

/**
 * The roles the access system holds that no path certifies. Derived, so it can never be a stale
 * sentence: if a path for one of them ever ships, this list empties itself.
 */
export const ROLES_WITHOUT_A_PATH: RoleGrant[] = PLATFORM_ROLES.filter(
  (r) => r.certifiedBy === null,
);

/**
 * The sentence the role table must ship with. Written from the derived list rather than typed, so it
 * cannot outlive the fact it describes.
 */
export const ROLE_TABLE_NOTE =
  ROLES_WITHOUT_A_PATH.length === 0
    ? "Every role in the platform's role table has a certification path behind it."
    : `Not every role in the platform's role table can be certified. ${ROLES_WITHOUT_A_PATH.map(
        (r) => r.name,
      ).join(
        " and ",
      )} exists in access control and has no learning path, so nothing certifies it — there is no path to enrol on and no certification to hold. It is listed here because a reader deserves the whole table, not the flattering part of it.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT THE MECHANISM DOES, AND — AT GREATER LENGTH — WHAT IT DOES NOT.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * Refusals from the enablement and credential code, quoted rather than paraphrased.
 *
 * These are here for the same reason products.ts quotes refusals: a refusal proves a guard exists in
 * a way no adjective does, and it is the hardest thing on the page to fake. Quote exactly; never
 * strengthen one into something it does not block. (Placeholders are shown in braces the way the
 * product pages show them; one trailing internal tag is elided, nothing else is changed.)
 */
export const CERT_REFUSALS: string[] = [
  "path '{path}' is not complete — no certification",
  "path '{path}' certifies unknown platform role '{role}'",
  "module '{module}' is not in path '{path}'",
  "unknown path '{path}'",
  "no platform certification for role '{role}' — earn it first",
  "no platform certifications — nothing to credential",
];

/** What a certification actually attests. Each line is a mechanism, and each one is checkable. */
export const CERTIFICATION_ATTESTS: string[] = [
  "Every module in the path was completed. Issuing refuses an incomplete path outright — \"path '{path}' is not complete — no certification\". There is no partial credit and no override.",
  "The role it names is a role the access system actually knows. A path naming a role outside the platform's role table is refused rather than issued, so a credential cannot describe a permission that does not exist.",
  "The issuance is written as an event rather than as a silent state change. Certifying appends the path, the role and the credential to the audit surface the enablement module is handed, and that surface chains each event over its predecessor.",
  "It is tenant-scoped. A certification is held inside the tenant it was earned in, and is read back only for the person who earned it.",
  "It can be checked from its own contents. A credential carries a hash over its own fields, so an altered field fails the check — and checking it exposes the role and the level, never what the person studied.",
];

/**
 * The scope that must travel with the third line above, because that line borrows a word this site
 * defines strictly elsewhere.
 *
 * 🚨 THE CORRECTION THAT COST US A REVIEW. The draft said certifying "appends its own event to the
 * hash-chained audit trail" — and "the hash-chained audit trail", as this site defines it, is
 * append-only enforced at the database. The enablement module's audit sink is supplied when the
 * module is constructed and is optional, and every wiring that exists today hands it an in-memory
 * chain. The chaining is real and the event is real; the durability is not there yet. Render this
 * beside CERTIFICATION_ATTESTS, not three sections below it.
 */
export const CERTIFICATION_AUDIT_SCOPE =
  "Scope that honestly. The audit sink is supplied when the enablement module is constructed, and both wirings that exist today hand it an in-memory chain — one alongside development-only tokens and a stand-in model, the other a deliberately isolated store built purely to seed a demonstration directory. So the event is real and the chaining is real, but no certification here yet lands in the durable, database-enforced tenant trail described elsewhere on this site. The append is also a direct audit write, not a policy-evaluated, approval-gated one.";

/**
 * What a certification does NOT attest.
 *
 * ⚠️ This array is the honesty load-bearing wall of the Academy surface. Every line answers an
 * inference a reader will otherwise make for free. Deleting one does not make the page stronger; it
 * makes the page a claim we cannot support. Two of these — Durability and Assessment — were added
 * after a review found the list named five limits and not the two that bite hardest.
 */
export const CERTIFICATION_DOES_NOT_ATTEST: string[] = [
  "Accreditation. elan1 issues its own credential against its own platform. It is not accredited by anyone, no third party recognises it, and elan1 is not a certification body — the readiness work against external frameworks is readiness, not a certificate held.",
  "Assessment. Module completion is learner-reported. There is no exam, no score and no proctoring behind it: the gate is that every module in the path is marked complete, which is a check on completeness and not on competence.",
  "Durability. Certifications live in the enablement module's process memory rather than in a system of record, and a restart empties them. There is no per-learner store, no enrolment surface on this site, and the audit event behind an issuance is chained but — in every wiring that exists today — in memory. Treat what is described here as a mechanism that works, not as a register you can query.",
  "Access. Roles are granted by your own administrator in the control plane, and the runtime checks the role, never the credential. A certification is a statement about training; it opens nothing.",
  "Provenance. The hash on a credential is tamper-evidence, not a digital signature: it proves the fields have not been altered since it was minted, not that it was minted by us. Treat a credential someone hands you as a claim to verify with the issuing tenant, not as proof on its own.",
  "Performance. Nothing in this programme has been measured in a customer environment — not adoption, not time to competence, not error rates afterwards. A credential says a person completed a path, and stops there.",
  "Currency. A Trust Mark withdraws itself when the thing it certifies drifts, and reads stale when the model beneath it changes. A person's credential does not: it records the date it was issued and stands. If currency matters to you, re-certify on a schedule you set — the platform will not do it for you.",
];

/**
 * 🚨 THE DISCLOSURE THAT MUST APPEAR ABOVE THE FOLD, NOT UNDER IT.
 *
 * A reviewer's finding, applied as written: a curriculum nobody has taught is authored design, and
 * saying so once at the bottom of the page is not saying so. This is the first thing the Academy
 * surface should tell a reader after the lede.
 */
export const ACADEMY_AUTHORED_NOT_DELIVERED =
  "Academy's course list, levels and syllabi are authored design decisions, not observed delivery. No cohort has run, so nothing on this page is a measurement. We publish no course length as a commitment: a duration attached to a course nobody has taught is a delivery promise, and we hold no schedule, curriculum record or instructor behind one — each course carries the format it is designed for, with that caveat inside the same sentence. What is listed here is what we have written, not what we have run. \"Certification\" means a syllabus and a completeness check we authored: it is not accredited by any external body, the credential it produces is verifiable only in the sense that it carries a hash over its own fields, and it is a different object from the agent Trust Mark the platform issues. There is no bench of certified practitioners to hire from today.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * TALENT — a mechanism, not a supply.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/**
 * The talent surface, as a mechanism.
 *
 * Written deliberately as "what the mechanism does" rather than "what is available", because the
 * second framing is a supply claim and we have no supply to claim. Ships with TALENT_LIMIT.
 */
export const TALENT_MECHANISM =
  "Certified practitioners can be matched to demand — a delivery need or a partner build — and the matching is consent-first by construction: a practitioner is matched only if they have opted in, the opt-in is theirs to withdraw, and a match returns their identifier, the role, the level and whether the credential verifies, and nothing else. Learning history is never exposed. A credential that fails its own check is not matched at all.";

/**
 * 🚨 THE LINE THAT MUST NOT BE SOFTENED. An earlier version of this page said certified
 * practitioners "can be matched to demand via the partner ecosystem", which is true of the
 * mechanism and reads as a bench. There is no bench.
 */
export const TALENT_LIMIT =
  "There is no bench. The directory lists only practitioners who have consented to be listed, the copy of it inside the control plane is seeded with demonstration practitioners so the mechanism can be exercised, and we publish no count of certified people. Academy is a programme and a matching mechanism — it is not a supply of hireable talent, and nothing on this page should be read as one.";

/** The honest limits of the programme itself, in the same register the rest of the site uses. */
export const ACADEMY_LIMITS: { title: string; body: string }[] = [
  {
    title: "The curriculum is authored, and no cohort has run it",
    body: "Every course, level and syllabus below is a design decision we wrote. None of it has been delivered, nobody has been assessed against it, and the formats are what each course is designed for rather than a schedule anyone has kept. Read the catalogue as a statement of what we teach, not as a record of teaching.",
  },
  {
    title: "A course is not a certification path",
    body: `The platform ships ${CERTIFICATION_PATHS.length} certification paths — operator, approver, admin and sales — and each one certifies only when every module in it is recorded complete and the role it names is a role the access system already holds. The ${COURSES.length} courses here are the curriculum written toward those paths. Finishing one course mints nothing, and one platform role, viewer, has no path at all.`,
  },
  {
    title: "We are not a certification body",
    body: "Academy issues its own credential against its own platform, and elan1 holds no third-party certification of its own. Completion is learner-reported — there is no exam, score or proctoring. Where a course touches a regulated question it teaches what the code does about it, not whether that satisfies your obligation, which is a matter for your counsel and your regulator.",
  },
  {
    title: "A credential is not a permission",
    body: "Nothing in the access path reads a certification. Your administrator grants roles, and the runtime checks the role. Training and access are deliberately separate: a person can be certified and hold nothing, and — more importantly — can hold a role without being certified, which is a gap your own access review has to close.",
  },
  {
    title: "Nothing here is durable yet",
    body: "Enrolment progress and issued certifications live in the enablement module's process memory, keyed per tenant, per person, per path, and do not survive a restart. There is no per-learner system of record and no enrolment surface on this site — the courses and levels published here are content. Issuing does append an audit event, and that event is chained over its predecessor, but every wiring that exists today puts that chain in memory rather than in the database-enforced tenant trail this site describes elsewhere.",
  },
  {
    title: "Nothing here has been measured in a customer environment",
    body: "No adoption figure, no time-to-competence, no error rate after training, and no benchmark for any of it. Where a course names something a graduate should be able to do, that is what the material is built around — a design intention, not an observation.",
  },
  {
    title: "The curriculum tracks a moving platform",
    body: "Enablement is staged per tenant, so two learners on the same course may be looking at different enabled sets. Courses teach the gates, which are stable, and name the surfaces, which are not — where a surface is built but not yet wired, the course says so rather than teaching it as live.",
  },
];

/** Hub copy for the Learn page. Kept here so the page renders content rather than authoring it. */
export const ACADEMY_INTRO = {
  kicker: "Academy · Learn",
  title: "Learn the gate, not just the screen.",
  lede: "Academy teaches the platform by its mechanisms: reading an approval before you sign it, authoring a policy the runtime enforces, telling an eval's third state from a pass, staging a rollout one function at a time, and investigating from a chain that re-hashes when you read it. The certifications behind it sit on a small set of paths, each tied to a role the access system actually knows, and each refused until every module in its path is complete.",
  /** Render immediately under the lede. It is the disclosure, not a footnote. */
  note: ACADEMY_AUTHORED_NOT_DELIVERED,
} as const;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * Derivations. A page should read these rather than re-listing courses in a component.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

/** Look up a course by slug. */
export const courseBySlug = (slug: string | undefined): Course | undefined =>
  slug ? COURSES.find((c) => c.slug === slug) : undefined;

/** Look up a certification path by the role it certifies. */
export const pathForRole = (role: CertifiableRole): CertificationPath | undefined =>
  CERTIFICATION_PATHS.find((p) => p.role === role);

/** Every course written toward a given certification path, in catalogue order. */
export const coursesForRole = (role: CertifiableRole): Course[] =>
  COURSES.filter((c) => c.role === role);

/**
 * The paths the catalogue actually has taught material for — derived, so a new course cannot fall
 * out of a roster and an emptied path cannot keep a card.
 */
export const PATHS_WITH_COURSES: readonly CertificationPath[] = CERTIFICATION_PATHS.filter((p) =>
  COURSES.some((c) => c.role === p.role),
);

/**
 * The other half of the same derivation, and the more useful one: a path we ship with no course
 * written toward it. Today this is empty. If it ever is not, the page should say so rather than let
 * a reader assume the curriculum covers the ladder.
 */
export const PATHS_WITHOUT_COURSES: readonly CertificationPath[] = CERTIFICATION_PATHS.filter(
  (p) => !COURSES.some((c) => c.role === p.role),
);

/** The roles the catalogue covers — derived from the paths, never from the role table. */
export const COVERED_ROLES: CertifiableRole[] = CERTIFICATION_PATHS.filter((p) =>
  COURSES.some((c) => c.role === p.role),
).map((p) => p.role);
