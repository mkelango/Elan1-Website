// lib/diagrams.ts
// THE DIAGRAM REGISTER — every blueprint SVG in public/diagrams, what it depicts, what actually
// ships behind it, and whether it is allowed to render.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// WHY THIS FILE IS SHAPED LIKE AN AUDIT AND NOT LIKE A GALLERY
//
// An architecture diagram is the most load-bearing artifact on a page. A buyer reads a layered
// drawing with surfaces, an agent workforce and a data layer as a PICTURE OF SOMETHING THAT RUNS.
// That is the whole reason to publish one — and the whole reason a wrong one is not an
// overstatement but a fabrication.
//
// This file previously carried three ad-hoc notes withholding three assets, each written when
// someone happened to notice a problem. That is the failure mode: a rule applied to one file and
// not to its copies. `/diagrams/elan1_diagram_index.svg` was withheld FOR CONTAINING AN agency1
// NODE — and ten solution maps that also draw an agency1 node kept rendering, on the library and on
// ten solution pages. The rule was right and it did not travel.
//
// So the register is now the single source, every asset is listed, and the decision is a typed
// field rather than a comment.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// THE WITHHOLDING TEST — STATED SO A SECOND READER CAN RE-RUN IT
//
// A drawing comes down when its SUBJECT DOES NOT EXIST or when it makes a COMMITMENT NOTHING CAN
// HONOUR. Concretely, four triggers:
//
//   W1  It draws an offering that was retired, or a delivery motion — work performed by people —
//       as a layered runtime with an agent workforce. Relabelling does not fix it, because the
//       layout is the claim.
//   W2  It prints a duration, a service level or an availability commitment. Nothing has been timed
//       in a customer environment, and elan1 is held to no service level. (service1's SLA machinery
//       is real and is the CUSTOMER's — their desk, their targets. A commitment BY US is the thing
//       that does not exist, and it is the thing these drawings print.)
//   W3  It promises business results — faster, cheaper, fewer, higher. Nothing has been measured
//       with a customer.
//   W4  It is not a picture of anything elan1 built, or it republishes a third party's figures and
//       roadmap under our imprint.
//
// A drawing STAYS UP, with the defect named in the register, when the fault is a LABEL: a stale
// name, a count with no derivation, a vendor logo in an integration plane, a principle written more
// absolutely than the guard behind it. Taking those down removes more truth than it removes error,
// and the register carries the correction where the artwork cannot.
//
// That line is a judgement and it is one reviewer's. It is written here so it can be argued with,
// which is the only useful property a standard has.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// WHAT THIS PASS CAN AND CANNOT SUPPORT
//
// Audited by one reviewer on 2026-08-08, by reading the text in each SVG against the platform tree
// and against this site's own content layer, and re-read the same day after six assets were
// corrected in place. It has had no second reader. Anything added since has not been through it.
//
// It is mostly a reading of WORDS. Where a finding is about what the boxes and arrows imply — an
// engagement drawn in the layer a reader has learned to read as a runtime — that is a reading of a
// LAYOUT, which has no text to quote and is the weakest evidence here.
//
// A count baked into an SVG is not, as an earlier draft of this note claimed, uncorrectable from
// code: these are text-based XML files and every number in one is an ordinary editable text node —
// six of them were edited on the audit date. The defensible statement is narrower. An asset in
// public/ cannot import the site's platform-count file, so a number inside artwork cannot be
// DERIVED at build time and no guard catches it going stale the way one catches a number typed into
// a page. That is why counts belong in text, and why the stale-count backlog on the published set
// below is open and unscheduled rather than closed by this pass.

import { services } from "../content/services";
import { factLine, factValue } from "../content/platform-facts";

/** The date the artwork below was last read line-by-line. Quoted on the page; never typed twice. */
export const DIAGRAM_AUDITED_ON = "2026-08-08";

export type DiagramGroup =
  | "System"
  | "Platform"
  | "Resources"
  | "Products"
  | "Solutions"
  | "Architecture";

/**
 * One thing the artwork says, and what is true instead.
 *
 * `asserts` is QUOTED FROM THE DRAWING wherever a phrase exists to quote — the same discipline the
 * product pages use for refusal strings. A quoted assertion can be checked by anyone with the file
 * open; a paraphrase asks the reader to trust the auditor.
 */
export interface DiagramFinding {
  asserts: string;
  butActually: string;
}

interface DiagramBase {
  /** Path under public/. An ASSET name — never derived from a slug (see the Academy note below). */
  src: string;
  title: string;
  group: DiagramGroup;
  /** What the artwork draws. */
  depicts: string;
  /** What actually ships behind it. Present on every entry, published or not. */
  ships: string;
  /** What was changed IN THE ARTWORK on the audit date, where anything was. */
  corrected?: string;
}

export interface PublishedDiagram extends DiagramBase {
  status: "published";
  /** The caption under the frame. Only a published entry has one. */
  blurb: string;
  /**
   * Named, unfixed problems on artwork that still ships.
   *
   * 🚨 THIS FIELD IS THE POINT OF THE WHOLE FILE. "Published" is not a clean bill of health, and a
   * register that only listed what it refused would imply it was. A published entry is one whose
   * fault is a label rather than a fabrication — so the label is quoted here, where a reader can
   * carry the correction to the drawing rather than the drawing to a meeting.
   */
  openDefects: DiagramFinding[];
}

export interface WithheldDiagram extends DiagramBase {
  status: "withheld";
  /** At least one — the tuple type is what makes a reasonless withholding unwritable. */
  findings: [DiagramFinding, ...DiagramFinding[]];
  /** What a redraw has to change before this can go back up. */
  redraw: string;
}

export type DiagramEntry = PublishedDiagram | WithheldDiagram;

const isPublished = (d: DiagramEntry): d is PublishedDiagram => d.status === "published";
const isWithheld = (d: DiagramEntry): d is WithheldDiagram => d.status === "withheld";

// ─────────────────────────────────────────────────────────────────────────────────────────────
// FINDINGS THAT RECUR
//
// Three defects appear across whole families of artwork because each family was drawn from one
// template in one sitting. Writing them once and composing them per entry keeps the audit honest
// about that: these are not ten independent mistakes, they are one mistake copied ten times.
//
// Every withheld map below ALSO carries its own quoted line, listed FIRST, so no asset is withheld
// on a template alone — which is the objection a reader should raise the moment they see a shared
// constant in an audit.
// ─────────────────────────────────────────────────────────────────────────────────────────────

/** The retired-and-phantom pillar band, drawn identically across all ten industry maps. */
const RETIRED_PILLAR_BAND: DiagramFinding = {
  asserts:
    "a “SERVICE PILLARS” band drawing six delivery nodes — strategy1, agent1, assure1, academy1, run1 and agency1 — under the line “delivered, certified & operated by the service pillars”.",
  butActually:
    "agency1 was retired outright: it has no page, no equivalent offering, and its old URL goes to the home page rather than to a lookalike. strategy1 is a delivery motion performed by people — no app, no agent, no screen, no endpoint. Publishing both as pillars of the delivery chain teaches a buyer two offerings that cannot be bought. This is the exact defect that already withheld the diagram index; it was never carried to the ten maps that share the band.",
};

/** The time-to-value line stamped on the launchpad panel of every industry map. */
const IN_WEEKS_CLAIM: DiagramFinding = {
  asserts: "a launchpad panel ending “pilot → production in weeks”.",
  butActually:
    "no delivery has been timed in a customer environment, so there is no interval to publish. The site's other pages were rewritten to state mechanism rather than duration for exactly this reason — what a gate refuses is checkable, how long a rollout takes is not.",
};

/** The `customer1` name, drawn across three product architectures and seven industry maps. */
const APP_NAME_DIVERGENCE: DiagramFinding = {
  asserts: "an app labelled `customer1` where the site says sales1.",
  butActually:
    "this is not a stale name. `customer1` is the live application id in the platform tree, and the site brands that same app sales1. It is a divergence between what the product calls itself and what we call it in public, and the drawing shows the platform's side of it. A diagram is where a buyer learns the vocabulary, so it should show the site's side.",
};

const SOLUTION_MAP_REDRAW =
  "Drop the pillar band entirely — how elan1 delivers is a Platform page, not a layer of an industry map. Keep the WHO / WHAT / USE CASES panels, which are the strongest part of the drawing and largely hold up. Replace the outcome strip with the pack's governance signature and its named refusals, take every duration and availability line off the artwork, and label the app sales1.";

const solutionMap = (
  src: string,
  title: string,
  depicts: string,
  ships: string,
  bespoke: [DiagramFinding, ...DiagramFinding[]],
): WithheldDiagram => ({
  src,
  title,
  group: "Solutions",
  depicts,
  ships,
  status: "withheld",
  findings: [...bespoke, RETIRED_PILLAR_BAND, IN_WEEKS_CLAIM],
  redraw: SOLUTION_MAP_REDRAW,
});

// ─────────────────────────────────────────────────────────────────────────────────────────────
// THE PILLAR DIAGRAMS
//
// All five are the same species. Each draws an ENGAGEMENT — kickoff, workshops, sign-offs,
// readouts — as a "surfaces" layer, and a NAMED SQUAD OF PEOPLE as the "agent workforce" layer,
// with each role pinned to a model tier. Some of these pillars do have a real screen in the control
// plane; none has the running system the artwork draws around it.
//
// The GROUP is derived from each pillar's `home` in services.ts, so a pillar that moves between
// Platform and Resources re-groups itself instead of stranding a dead heading.
// ─────────────────────────────────────────────────────────────────────────────────────────────

type PillarCopy = Omit<WithheldDiagram, "src" | "group">;

const PILLAR_DIAGRAM_COPY: Record<string, PillarCopy> = {
  strategy1: {
    title: "strategy1 — operating architecture",
    status: "withheld",
    depicts:
      "a five-layer running system with client surfaces, a strategy agent workforce, an intelligence layer and a data base, headed “5 LAYERS · 8 STRATEGY AGENTS · 4–6 WEEKS”.",
    ships:
      "a planning engagement performed by people: discovery, a sequence the platform can hold, a value model built to be argued with, a cost line that later becomes a meter, and a handover.",
    findings: [
      {
        asserts: "an operating architecture — surfaces, an agent workforce, a data layer.",
        butActually:
          "there is no such system. A search of the whole platform tree returns a diagram label, a catalogue page and an accelerator module with no production caller. No app directory, no route, no agent, no endpoint. This was the first entry pulled and it set the standard the rest of the register is held to.",
      },
      {
        asserts: "a header reading “5 LAYERS · 8 STRATEGY AGENTS · 4–6 WEEKS”.",
        butActually:
          "the eight is the same boilerplate number that headed five product diagrams until it was taken off them, applied here to a motion that has no agents at all. The weeks are a duration promise, which the site does not make anywhere else.",
      },
    ],
    redraw:
      "Draw the ENGAGEMENT — phases, deliverables, who does what, what is handed over — and give it a title that cannot be read as a runtime. No agent count, because there are no agents, and no duration.",
  },
  agent1: {
    title: "agent1 — build studio architecture",
    status: "withheld",
    depicts:
      "a five-layer runtime titled “BUILD STUDIO ARCHITECTURE”, whose fourth layer is a “BUILD SQUAD” of nine named roles — build lead, solution architect, agent engineer, skills author, connector engineer, integration engineer, eval engineer, guardrail engineer and hardening/SRE — each pinned to a model tier.",
    ships:
      "a build surface in the control plane where a blueprint is typed, a policy gate updates as you edit it, and publish and deploy run behind a refusal. That is real. The squad is not part of it.",
    findings: [
      {
        asserts:
          "a “BUILD SQUAD” layer sitting exactly where an app's agent workforce sits on every other drawing, with each human role labelled Opus or Sonnet.",
        butActually:
          "the squad is people doing a build engagement. Drawing an engagement in the position a reader has been trained to read as a runtime is the defect that removed the planning pillar from this library, and it survives a relabel because the layout is the claim. Pinning a person to a model tier is the tell.",
      },
      {
        asserts:
          "Layer 5 as “SURFACES — WHERE CLIENT & BUILD SQUAD MEET”, listing build kickoff, sprint plan, design reviews, sign-off and staging acceptance.",
        butActually:
          "those are delivery touchpoints in a statement of work. They are not screens, endpoints or agents, and nothing about them belongs on a system diagram.",
      },
      {
        asserts: "Anthropic's own end-user products drawn as elan1 delivery surfaces in that layer.",
        butActually:
          "how a build team collaborates is a working practice, not part of a customer's architecture. Drawing a third party's product as one of our layers borrows its credibility for a claim we did not make.",
      },
    ],
    redraw:
      "Draw the studio, not the engagement: the blueprint object, the policy gate that evaluates it as it is edited, the publish and deploy path, and the refusal in the middle. If the squad needs a picture, it is an engagement diagram — phases, deliverables and who does what — and its title must not read as a runtime.",
  },
  assure1: {
    title: "assure1 — trust and assurance architecture",
    status: "withheld",
    depicts:
      "a five-layer “ASSURANCE ENGINE” with an assurance lead sequencing eight specialist evaluators, an independence guardrail, a meta-eval, a Trust Centre with a live status dashboard, and its own evidence base.",
    ships:
      "the certification kernel, which lives in core rather than in a package of its own, plus governance screens in the control plane: the policy engine, the Trust Mark surface, and the coverage register. A Trust Mark is our own internal gate — it is eval-gated and auto-revoked on drift, and it is not an accreditation issued by anyone outside elan1.",
    findings: [
      {
        asserts: "a rule printed five times across the drawing: “no pass without proof”.",
        butActually:
          "the default agent certification is a STRUCTURAL DECLARATION CHECK — it reads what an agent declares about itself. A behaviour battery, which is what “proof” means to a reader, covers only a named handful of agents. The strong version of the rule is true of that handful and not of the roster, and an unqualified rule printed on artwork cannot carry the qualifier.",
      },
      {
        asserts:
          "a headline of “Trust, proven · Independent”, a “Trust Centre” with a live public status dashboard, and a Trust Mark captioned “the certification · proof of governed AI”.",
        butActually:
          "the Trust Mark is elan1's own internal gate, not an accreditation, and no third party issues or audits it. “Independent” on a drawing is heard as independent OF US. There is also no public status dashboard.",
      },
      {
        asserts:
          "a “BIAS & FAIRNESS AUDITOR” running disparate-impact checks across protected dimensions.",
        butActually:
          "the people app is fairness-by-construction: a set of protected attributes are never model inputs, and it deliberately ships no diversity analytics. Drawing a disparate-impact engine describes a different product than the one built, and a more invasive one.",
      },
      {
        asserts: "assure1 as a standalone system with its own five layers and its own data base.",
        butActually:
          "assure1 ships no package of its own. Its code is the certification kernel inside core. The assurance ENGAGEMENT is real and is people; the standalone runtime in the drawing is not a thing that can be pointed at.",
      },
    ],
    redraw:
      "Draw the certification path as it actually runs: the declaration check at the door, the named batteries that go further and how few subjects they cover, the mark, the drift signal, and the revocation. Show the coverage register as a denominator. Say Trust Mark and never certification, and drop “independent” unless somebody outside elan1 is doing the issuing.",
  },
  academy: {
    title: "Academy — learning and talent architecture",
    status: "withheld",
    depicts:
      "a “LEARNING ENGINE” with cohort programmes, a hands-on lab and sandbox layer, proctored certification exams, an AI tutor, and a talent marketplace captioned “Certified talent ↔ demand · Hire or augment · Matched to projects”.",
    ships:
      "a curriculum of learning paths, each certifying one platform role, with progress and completion tracked; a credential ladder tied to the platform roles a person actually holds; and a consent-gated match between credentialed people and demand. The learning core is reused by the education pack rather than duplicated.",
    findings: [
      {
        asserts:
          "a talent marketplace layer — “Certified talent ↔ demand · Hire or augment · Matched to projects”.",
        butActually:
          "there is no bench. The directory lists only practitioners who have consented to be listed, and we publish no count of certified people. Academy is a programme and a matching mechanism; it is not a supply of hireable talent, and this drawing is the one place on the site that says otherwise.",
      },
      {
        asserts: "proctored certification exams and a hands-on lab and sandbox layer.",
        butActually:
          "certification is earned by completing a path that maps to a platform role — there is no proctoring engine and no sandbox environment behind the drawing. This is the cheapest kind of over-claim to make in artwork and the most awkward to answer in a demo.",
      },
      {
        asserts: "credentials that are “portable, tamper-evident and employer-trusted”.",
        butActually:
          "the credential is real and it is verifiable. “Employer-trusted” is a claim about what third parties do with it, and no third party has been asked. Delete the adjective, keep the mechanism.",
      },
      {
        asserts: "the title “ACADEMY1”, and delivery in “20+ languages”.",
        butActually:
          "the pillar is Academy — a content surface, in Title Case plain English; the trailing 1 marks a thing you run. The asset filename still carries the old name, which is fine, but the artwork should not. The language figure is a count with no derivation anywhere in the site's one count file.",
      },
    ],
    redraw:
      "Draw what exists: path → modules → completion → the role it certifies → the credential → the consented match. Every one of those is a real object. Drop the labs, the proctoring, the tutor, the marketplace framing and the adjectives, and rename the artwork Academy.",
  },
  run1: {
    title: "run1 — managed AgentOps architecture",
    status: "withheld",
    depicts:
      "an always-on “OPS CONTROL PLANE” of eight ops agents under an ops lead, with an SLA reporting surface, a status page, on-call escalation into a named paging vendor, and an autoscaling capacity layer.",
    ships:
      "a read-only operations console over the run record and the meter — live and recent runs, a per-run trace that is the same object as the audit entry, and per-tenant cost. Alongside it: the incident kill-switch that stops an app's whole agent fleet immediately and non-destructively, rollout waves that stay off until switched on, cost computed from a rate card rather than a self-report, a model upgrade treated as an untested deploy, and an improvement queue that proposes and does not act.",
    findings: [
      {
        asserts:
          "an SLA surface across the whole drawing — “SLA & reliability reports”, “Against the SLA”, “SLA-BACKED”, “reported against an SLA”, and an ops config pack holding “SLA definitions — the targets we're held to”.",
        butActually:
          "elan1 is held to no service level. No target we own is defined, measured, or reported against anywhere in the system. This is the single most consequential line on the whole drawing, because an SLA is the one thing on it a procurement team will try to hold us to. The distinction is worth stating precisely, because it is easy to trip over: service1 genuinely does run SLA machinery, and those are the CUSTOMER's service-desk targets, started and breached inside their own desk. run1's are commitments by us, and they do not exist.",
      },
      {
        asserts: "round-the-clock fleet coverage, printed three times — “24/7 coverage”, “watches the fleet 24/7”, and “Always-on”.",
        butActually:
          "that is a staffing claim, and the site does not publish counts of people. What is genuinely always-on is the record: a run is traced and audited whether or not anyone is looking at it.",
      },
      {
        asserts: "escalation into a named third-party paging product, and a public status page.",
        butActually:
          "neither ships. External systems reach the platform as modelled adapters — a real interface with a deterministic adapter behind it — until credentials and a grant are wired. A vendor name inside an integration layer asserts a live connection.",
      },
      {
        asserts: "eval-gated model migration with “zero regression”.",
        butActually:
          "what exists is a gate: an upgrade is treated as an untested deploy and held until it passes. A gate that can hold is a strong claim and a checkable one. “Zero regression” is an absolute no gate can promise.",
      },
    ],
    redraw:
      "Draw the console and the controls, which are genuinely distinctive: the kill-switch and what it stops by name, the wave gate and what sits outside the enabled set, the rate-card meter, the upgrade gate, and the proposal queue that cannot act. Remove the SLA panel, the paging vendor, the status page and the autoscaler until each one exists.",
  },
};

// NB: `src` comes from the mapping below, NOT from the slug. The artwork filename is an ASSET name
// and does not follow a rename — deriving `/diagrams/${slug}_architecture.svg` shipped a broken
// image the moment academy1 became Academy, because the file is still academy1_architecture.svg.
const PILLAR_DIAGRAM_SRC: Record<string, string> = {
  strategy1: "/diagrams/strategy1_architecture.svg",
  agent1: "/diagrams/agent1_architecture.svg",
  assure1: "/diagrams/assure1_architecture.svg",
  academy: "/diagrams/academy1_architecture.svg",
  run1: "/diagrams/run1_architecture.svg",
};

const PILLAR_DIAGRAMS: DiagramEntry[] = services
  .filter((s) => PILLAR_DIAGRAM_COPY[s.slug] && PILLAR_DIAGRAM_SRC[s.slug])
  .map((s) => ({
    ...PILLAR_DIAGRAM_COPY[s.slug],
    src: PILLAR_DIAGRAM_SRC[s.slug],
    group: s.home === "platform" ? ("Platform" as const) : ("Resources" as const),
  }));

// ─────────────────────────────────────────────────────────────────────────────────────────────
// THE REGISTER — every asset in public/diagrams, in reading order.
// ─────────────────────────────────────────────────────────────────────────────────────────────

export const DIAGRAM_REGISTER: DiagramEntry[] = [
  // ——— System ———
  {
    src: "/diagrams/elan1_system_map.svg",
    title: "elan1 system map",
    group: "System",
    depicts: "the whole company on one sheet: solutions, products and a services layer.",
    ships:
      `${factValue("suiteApps")} suite apps on one core, ${factValue(
        "verticalPacks",
      )} industry packs on top of them, and a set of delivery pillars that are motions rather than a layer of the product.`,
    status: "withheld",
    findings: [
      {
        asserts:
          "a headline count — “10 SOLUTIONS · 7 PRODUCTS · 6 SERVICES” — over a “SERVICES — how we deliver (6)” panel.",
        butActually:
          `two of the three counts were already stale before the services section was retired, and the services layer no longer exists at all. The site publishes ${factLine(
            "suiteApps",
          )}, from the one file that carries each number with its derivation.`,
      },
      {
        asserts: "an agency1 node in the company structure.",
        butActually: "agency1 was retired outright and has no equivalent offering.",
      },
      {
        asserts: "a pillar captioned “certify, independently”.",
        butActually:
          "nobody outside elan1 certifies anything here. A Trust Mark is our own internal gate. On a company map, “independently” is read as an accrediting body, and there is none.",
      },
      APP_NAME_DIVERGENCE,
    ],
    redraw:
      "A company map is the hardest artwork to keep true, because every reorganisation invalidates it. If it is redrawn, it should carry no counts at all — just the shape: one core, the apps on it, the packs that configure them, and the control plane around all of it.",
  },
  {
    src: "/diagrams/elan1_diagram_index.svg",
    title: "Diagram index",
    group: "System",
    depicts: "a contents page for the visual system, keyed to each asset filename.",
    ships: "this register, which does the same job and carries the audit with it.",
    status: "withheld",
    findings: [
      {
        asserts: "an agency1 entry pointing at agency1_architecture.svg.",
        butActually:
          "agency1 was retired outright. This was the first asset withheld for that reason — and the reason was never carried to the ten industry maps that draw the same node, which is why the register now holds the decision instead of a comment.",
      },
      {
        asserts: "a footer reading “the 7 products run on enterprise1”.",
        butActually: `the site publishes ${factLine("suiteApps")}, sourced from one file.`,
      },
      {
        asserts: "an index of the library that is itself a static image.",
        butActually:
          "an index drawn as artwork goes stale the moment any asset changes, and cannot be corrected from code. The index should be data. It now is.",
      },
    ],
    redraw:
      "Do not redraw it. An index of a changing set belongs in the register, where a stale entry is a type error rather than a picture nobody re-exported.",
  },

  // ——— Architecture ———
  {
    src: "/diagrams/claude_360_architecture.svg",
    title: "Claude 360°",
    group: "Architecture",
    depicts:
      "a map titled “THE COMPLETE ARCHITECTURE OF CLAUDE — ANTHROPIC”: the model line-up with release dates and context windows, the consumer and developer surfaces, and the extensibility ecosystem.",
    ships:
      "elan1's agents run on Claude through the Agent SDK, with a cost-tiered router choosing a model per task. That relationship is described in words on the Built on Claude page, where each sentence can be qualified.",
    status: "withheld",
    findings: [
      {
        asserts: "a title claiming to be the complete architecture of another company's product.",
        butActually:
          "whatever it gets right, it is not a picture of anything elan1 built, and it sits in a library whose framing is the systems we build. The most generous reading is that it borrows a partner's credibility for an elan1 page.",
      },
      {
        asserts:
          "a dated model catalogue — a named flagship, its release date, its knowledge cutoff and its context window — stamped “MAP UPDATED Jun 2026”.",
        butActually:
          "a third party's version numbers change on their schedule. A stamped model list is stale from the day it is exported, and we cannot correct someone else's roadmap in our own SVG.",
      },
      {
        asserts:
          "comparative performance figures for those models — “~4× less likely to let code flaws pass”, “~2.5× speed”.",
        butActually:
          "those are a vendor's numbers. Republished under our own diagram they read as our measurement, and we have measured nothing about model quality. This is the clearest instance on the whole shelf of an unbacked figure arriving by import.",
      },
      {
        asserts: "capability promised for release “in the coming weeks”, printed twice.",
        butActually:
          "an unshipped feature on someone else's roadmap has no business on our page under any framing, and a date promise is a date promise whoever made it first.",
      },
    ],
    redraw:
      "If the Claude relationship deserves a picture, draw OUR seam and nothing else: where the router tiers, where the Agent SDK sits, where a skill is loaded as config, and where the governed writer sits between an agent and a system of record. That drawing is about elan1 and stays true when a model version changes.",
  },

  // ——— Products — all six published, each with its open defects named ———
  {
    src: "/diagrams/enterprise1_architecture.svg",
    title: "enterprise1 — platform backbone",
    group: "Products",
    depicts:
      "the control plane in five planes: one front door, a cross-function orchestration and agent fabric, shared intelligence, one integration gateway, and one data and identity layer.",
    ships:
      "the control plane, and it is the real backbone — shared identity, one approvals queue, the wave gate that stages enablement per tenant, the audit chain, and the cross-app workflows that let an event in one app drive a governed write in another.",
    corrected:
      `the connector directory read “200+ connectors shared across products” against a registered, callable set of ${factValue(
        "connectors",
      )} — roughly six times a number we can defend. It now reads “one shared connector fabric”. Corrected in the artwork on the audit date rather than captioned around.`,
    status: "published",
    blurb:
      "The five planes every suite app runs on — one front door, one agent fabric, shared intelligence, one gateway, one identity and audit layer.",
    openDefects: [
      {
        asserts:
          "a header reading “THE CONTROL PLANE · UNIFIES 7 PRODUCTS”, above a body captioned “six functional products”.",
        butActually:
          `two counts on one drawing, and neither is the ${factValue(
            "suiteApps",
          )} suite apps the site publishes. Artwork that disagrees with itself on its own headline number is the clearest argument there is for keeping counts in text, where one file holds each number with the derivation that produced it.`,
      },
      {
        asserts: "suite-wide model migration with “zero regression”, printed twice.",
        butActually:
          "a model upgrade is treated as an untested deploy and held until it passes. That is a gate, and a gate is the stronger claim precisely because it can refuse. “Zero regression” is an absolute nothing enforces, and the drawing should print the gate instead.",
      },
      {
        asserts: "natural-language configuration under the line “No 6-month projects”.",
        butActually:
          "no delivery has been timed in a customer environment, so there is nothing to compare against. It is also a claim shaped around what other approaches supposedly take, which is not a claim this site makes about anyone.",
      },
      APP_NAME_DIVERGENCE,
    ],
  },
  {
    src: "/diagrams/service1_architecture.svg",
    title: "service1 architecture",
    group: "Products",
    depicts:
      "a five-layer service runtime: omnichannel surfaces, an orchestrator over specialist agents, a self-verification judge before every send, and read / write / action tool tiers.",
    ships:
      "the customer-service app — its own systems of record, a resolution path that graduates through the approval gate, and a case-to-refund workflow that lands in finance1 through that app's governed writer rather than by writing into it. The SLA machinery on this drawing is real, and it is the CUSTOMER's: a triage agent starts their clock and an escalation agent fires on their breach.",
    corrected:
      "the header read “5 LAYERS · 8 AGENTS · 40+ MCP TOOLS” — the same three numbers printed on five unrelated product diagrams, every one of them wrong about the app it headed and wrong in the same direction, understating it. It now names the five layers and carries no counts.",
    status: "published",
    blurb:
      "The service desk where the agent drafts and a person sends — surfaces, agents, the judge that runs before every message, and the tool tiers underneath.",
    openDefects: [
      {
        asserts:
          "a write tool that sends a message on a consumer channel, drawn beside a resolution agent that acts across systems.",
        butActually:
          "the reply is drafted onto the case marked as needing a send, and a person sends it. The gap between “drafts and a person sends” and a drawn send tool is the single most important thing about this product — it is the product page's own headline — and the artwork erases it.",
      },
      {
        asserts: "named helpdesk vendors in the integration layer.",
        butActually:
          "those seams are modelled adapters — a real interface with a deterministic adapter behind it — until credentials and a grant are wired. Drawn as names in an integration plane they read as live connections.",
      },
      {
        asserts: "delivery in “20+ languages”, printed twice.",
        butActually:
          "a language count is a platform count, and the site publishes counts from one file with a derivation attached. This one has no derivation anywhere.",
      },
      {
        asserts: "a footer principle reading “MCP-first — every capability is a tool”.",
        butActually:
          "a standing guard over the write path still counts mutating handlers that reach a system of record without passing the governed writer, and holds that count as a ceiling that may only fall. Governed-everywhere is a direction with a ratchet on it, not a state, and an unqualified “every” printed on artwork is the hardest kind of claim to walk back.",
      },
      APP_NAME_DIVERGENCE,
    ],
  },
  {
    src: "/diagrams/finance1_architecture.svg",
    title: "finance1 architecture",
    group: "Products",
    depicts:
      "a five-layer finance runtime with an approvals-first surface layer, a controller-style orchestrator, a model router, a self-verification judge before every write, and an integration plane naming ledger and payment systems.",
    ships:
      "the deepest app in the suite and the lighthouse for the agentic pattern — its agents compute from the record rather than restating it, and every consequential move stops at a human approval that is itself the thing that executes the workflow. Nothing here pays: releasing a payment is refused without an explicit human approval, and the drafter can never approve their own entry.",
    corrected:
      "the header read “5 LAYERS · 8 AGENTS · 40+ MCP TOOLS”, a template value shared with four other product diagrams. It now names the five layers and carries no counts.",
    status: "published",
    blurb:
      "Approvals first, then the agents — a finance runtime where every number ties to the ledger and no commitment moves without a named human.",
    openDefects: [
      {
        asserts: "named accounting, ERP and payment vendors in the integration layer, and a bank feed.",
        butActually:
          "these are modelled adapters until credentials and a grant are wired. On a finance diagram this matters more than anywhere else: a reader assumes a drawn bank feed means money moves.",
      },
      {
        asserts: "a subtitle reading “Close faster. See clearer.”",
        butActually:
          "no close has been run in a customer environment, so neither half has been observed. The mechanical version is stronger anyway: the number on a statement is computed from the ledger rather than typed by whoever prepared it.",
      },
      {
        asserts: "“SOC2 controls · GDPR / DPDP” in the compliance panel.",
        butActually:
          "the drawing labels a control domain rather than claiming an attestation, which is the right thing for it to do and what the control-mapping code supports. Worth stating plainly beside it: no SOC 2 or ISO 27001 certification is held. The site publishes that as a named engineering limit, and control mapping for those regimes is recorded as underway and not certified. If the label is ever tightened, the phrasing to reach for is “SOC 2 control mapping”.",
      },
      {
        asserts: "a footer principle reading “MCP-first — every capability is a tool”.",
        butActually:
          "the same open ratchet as on the service drawing: a guard still counts mutating handlers reaching a system of record without passing the governed writer, and that count is not zero.",
      },
    ],
  },
  {
    src: "/diagrams/supply1_architecture.svg",
    title: "supply1 architecture",
    group: "Products",
    depicts:
      "a five-layer supply runtime — signal-driven planning surfaces, an orchestrator over specialist planning and procurement agents, a judge before every purchase order, and an integration plane naming ERP vendors.",
    ships:
      "the deepest supply-chain app in the suite, built controls-first: sourcing restricted to approved vendors, spend that is never autonomous, and supplier data refused by shape rather than by policy text.",
    corrected:
      "the header read “5 LAYERS · 8 AGENTS · 40+ MCP TOOLS”, a template value shared with four other product diagrams. It now names the five layers and carries no counts.",
    status: "published",
    blurb:
      "Signals in, drafted orders out — a supply runtime where a purchase order is never autonomous and a vendor outside the approved set is refused.",
    openDefects: [
      {
        asserts: "named ERP vendors in the integration layer.",
        butActually:
          "modelled adapters until credentials and a grant are wired. A drawn ERP connection on a procurement diagram implies purchase orders leaving the building.",
      },
      {
        asserts: "an agent layer drawn without the approved-vendor boundary.",
        butActually:
          "the most distinctive fact about this app is what its agents cannot do — commit spend, or reach a vendor outside the approved set. The approval boundary is on the drawing; the vendor boundary is not, and it is the half a procurement team asks about.",
      },
      {
        asserts: "a footer principle reading “MCP-first — every capability is a tool”.",
        butActually:
          "the same open ratchet as on the finance drawing: the guard's count of ungoverned mutating handlers is a ceiling that may only fall, not a zero.",
      },
    ],
  },
  {
    src: "/diagrams/people1_architecture.svg",
    title: "people1 architecture",
    group: "Products",
    depicts:
      "a five-layer HR runtime with a human-decided, bias-checked framing, an orchestrator over talent agents, a judge before every output, and an integration plane naming applicant-tracking and HRIS vendors.",
    ships:
      "the HR app, where fairness is structural rather than reviewed: a set of protected attributes are never model inputs, no diversity analytics ship, and the only place money moves is a compensation approval at a human gate.",
    corrected:
      "the header read “5 LAYERS · 8 AGENTS · 40+ MCP TOOLS”, a template value shared with four other product diagrams. On this app it understated the roster further than on any of the other four. It now names the five layers and carries no counts.",
    status: "published",
    blurb:
      "Assist, never decide — an HR runtime where the protected attributes are not inputs and a human decides every matter.",
    openDefects: [
      {
        asserts: "named applicant-tracking and HRIS vendors in the integration layer.",
        butActually:
          "modelled adapters until credentials and a grant are wired. On an HR diagram a drawn HRIS connection implies employee records already flowing.",
      },
      {
        asserts: "“bias-checked” as a property of the pipeline, in the subtitle and in the flow.",
        butActually:
          "the mechanism is stronger and different: the protected attributes are not inputs at all, so there is nothing downstream to check. “Bias-checked” describes a review step; what ships is a construction that removes the need for one.",
      },
      {
        asserts: "“SOC2” in the compliance list beside GDPR and DPDP.",
        butActually:
          "as on the finance drawing, this labels a control domain rather than claiming an attestation. No SOC 2 or ISO 27001 certification is held; the site says so as a named engineering limit.",
      },
      {
        asserts: "a footer principle reading “MCP-first — every capability is a tool”.",
        butActually: "the same open ratchet: the guard's count is a falling ceiling, not a zero.",
      },
    ],
  },
  {
    src: "/diagrams/market1_architecture.svg",
    title: "market1 architecture",
    group: "Products",
    depicts:
      "a five-layer marketing runtime — campaign surfaces, a brand-and-compliance judge before every publish, and an integration plane naming a content system, advertising platforms and analytics.",
    ships:
      "the marketing app: it plans and drafts, every asset clears a human before publish, campaign spend lands in finance1 through that app's governed writer, and demand hands off to sales1 rather than being claimed twice.",
    corrected:
      "the header read “5 LAYERS · 8 AGENTS · 40+ MCP TOOLS”, a template value shared with four other product diagrams. It now names the five layers and carries no counts.",
    status: "published",
    blurb:
      "Produce freely, publish on approval — a marketing runtime with a brand-and-compliance judge in front of every asset.",
    openDefects: [
      {
        asserts: "an advertising-platform node in the integration layer, beside an analytics seam.",
        butActually:
          "an advertising-platform node contradicts market1's ad-free-by-construction design. In platform code that is three things: a governance policy refuses a publish outright — with no approver to appeal to — when the request carries an ad placement or paid media, and it is attached to every market1 publish agent; the content seam exposes no ad-placement operation to call; and a test asserts the live operation set matches a reviewed list, so a new operation fails until a person reviews it. The stated limits, in the code's own words: the policy matches two specific request keys rather than reading intent, the test forces a human review rather than forbidding a change, and an operation name can never prove what an operation does. Pixel-free is enforced by absence rather than by a guard — engagement figures are computed from recorded actions such as form submits and event registrations, and there is no opens-and-clicks path to read.",
      },
      {
        asserts:
          "a governance panel headed “PRODUCTION, NOT PLACEMENT”, explaining that “Claude products are ad-free”.",
        butActually:
          "that is a statement about a third party's products, not about ours, sitting in the panel where a reader looks for OUR commitment. The elan1 half — that this app has no ad-placement operation to call — is the part worth drawing.",
      },
      {
        asserts: "a closing principle routing everything back into `customer1`.",
        butActually:
          "the site brands that app sales1, and the handoff is the interesting part: demand is written through the receiving app's governed writer rather than inserted into its store.",
      },
      {
        asserts: "“low cost-per-asset” as a design principle.",
        butActually:
          "no cost per asset has been measured anywhere. Model tiering and caching are real mechanisms; the cost outcome they are drawn as producing has never been observed.",
      },
    ],
  },

  // ——— Platform / Resources pillars (group derived from services.ts) ———
  ...PILLAR_DIAGRAMS,
  {
    src: "/diagrams/agency1_architecture.svg",
    title: "agency1 — creative studio architecture",
    group: "Platform",
    depicts: "a creative studio runtime producing brand systems and campaign assets.",
    ships: "nothing. agency1 was retired outright and has no equivalent offering.",
    status: "withheld",
    findings: [
      {
        asserts: "an offering that no longer exists, drawn as a running studio.",
        butActually:
          "the pillar was retired; its old URL resolves to the home page rather than to a lookalike offering, precisely so that nobody is quietly redirected to a substitute. The asset is kept only so the register can account for it.",
      },
      {
        asserts: "translation into “20+ languages”.",
        butActually:
          "a count with no derivation, on artwork for an offering that is not sold. Both halves of that sentence are reasons not to publish it.",
      },
    ],
    redraw:
      "Do not. The offering is retired; the register lists the asset so nobody re-adds it by accident.",
  },

  // ——— Solutions ———
  solutionMap(
    "/diagrams/health1_solution_map.svg",
    "health1 solution map",
    "who healthcare serves, which suite apps the pack configures, the deployable use cases, a governance panel, and a pillar band along the bottom.",
    "the healthcare pack: interoperability formats, national health identifiers, and claims exchange, with patient data refused by shape at the seam rather than by policy text.",
    [
      {
        asserts:
          "an outcome strip reading “Shorter wait times · lower admin cost · fewer claim denials · clinician time returned · faster, cleaner revenue cycle”.",
        butActually:
          "nothing has been measured with a customer. Not one of those five has been observed anywhere, and a drawn promise of lower cost is the thing a reader will remember off this sheet.",
      },
      {
        asserts:
          "“assure1's independent clinical & privacy evals issue a Trust Mark”, and multilingual access in “20+ languages”.",
        butActually:
          "a Trust Mark is elan1's own internal gate, not an independent assessment, and no accrediting body is involved. The language figure is a count with no derivation.",
      },
    ],
  ),
  solutionMap(
    "/diagrams/bank1_solution_map.svg",
    "bank1 solution map",
    "the banking landscape, the apps the pack configures, onboarding and reconciliation use cases, a governance panel, and the pillar band.",
    "the banking pack: the national payments and identity regimes, a mandate that drafts rather than executes, and a non-performing-asset ratio that now refuses to report a number when the field it counts is unpopulated.",
    [
      {
        asserts:
          "an outcome strip reading “Faster compliant onboarding · lower service & ops cost · earlier fraud detection · fewer reconciliation breaks”.",
        butActually:
          "no onboarding, cost, detection or break rate has been measured in a customer environment. On a regulated buyer's sheet these read as a performance representation.",
      },
      {
        asserts:
          "a relationship layer built on `customer1` with a know-your-customer assist beside it.",
        butActually:
          "the site brands that app sales1, and the assist proposes — the identity decision itself stays with a person. The drawing shows the assist and not the gate.",
      },
    ],
  ),
  solutionMap(
    "/diagrams/insure1_solution_map.svg",
    "insure1 solution map",
    "the insurance landscape, claims and distribution use cases, the pillar band, and a reliability panel down one side.",
    "the insurance pack: the Indian regulatory regime, and a claim path that refuses to pay against a lapsed policy — fixed on the write path and on the read surface beside it, because a guard on one and not the other is how the first version passed review.",
    [
      {
        asserts:
          "a “RELIABILITY & SLA” panel, and a closing principle reading “Operated to SLA — run1 keeps turnaround, quality & fraud-drift in check”.",
        butActually:
          "elan1 is held to no service level. No target we own is defined, measured or reported against. This is the same fabrication as on the operations pillar drawing, repeated on an industry map where a regulated buyer is most likely to act on it.",
      },
      {
        asserts:
          "an outcome strip reading “Faster claims settlement · lower claims & service cost · earlier fraud detection · fairer, more consistent decisions”.",
        butActually:
          "none of it has been measured with a customer, and “fairer decisions” is the one claim on the sheet an ombudsman would ask us to evidence.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/retail1_solution_map.svg",
    "retail1 solution map",
    "the retail landscape, the apps the pack configures, merchandising and service use cases, and the pillar band.",
    "the retail pack: the national commerce protocol and maximum-retail-price rules, enforced on the write path rather than checked afterwards.",
    [
      {
        asserts:
          "an outcome strip reading “Fewer stockouts & less overstock · higher conversion & AOV · lower acquisition & service cost · better margins”.",
        butActually:
          "six commercial metrics, none of them observed anywhere. A drawn margin claim is the hardest thing on this shelf to retract.",
      },
      {
        asserts:
          "a closing principle reading “Reliable at peak — run1 scales through sale events & peak season”.",
        butActually:
          "an availability commitment for the busiest week of a retailer's year, and elan1 is held to no service level at all.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/telco1_solution_map.svg",
    "telco1 solution map",
    "the telecom landscape, the apps the pack configures, lifecycle and assurance use cases, and the pillar band.",
    "the telecom pack: the Indian regulatory regime for business connectivity, with subscriber numbers treated as a managed resource rather than blanket-denied at the seam — a deliberate exception, made explicitly.",
    [
      {
        asserts:
          "a closing principle reading “Reliable at carrier scale — run1 runs it 24/7 with incident-grade SLAs”, beside a panel promising autoscaling through peaks.",
        butActually:
          "elan1 is held to no service level, and there is no autoscaler. An incident-grade commitment to a carrier is the single most expensive sentence on this shelf.",
      },
      {
        asserts:
          "an outcome strip reading “Lower cost-to-serve at scale · faster resolution & higher CSAT · fewer truck-rolls & faster MTTR · less churn”.",
        butActually:
          "seven operational metrics, none measured with a customer. Four of them are contractual terms in this industry.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/gov1_solution_map.svg",
    "gov1 solution map",
    "the public-sector landscape, citizen service use cases, a governance panel, and the pillar band.",
    "the government pack: the Indian data-protection, information-rights and direct-benefit regimes, where an appropriation limit is a refusal rather than a cap that quietly clips a number.",
    [
      {
        asserts:
          "service windows described as “24/7, multilingual”, with “SLAs, drift checks” in the operations node.",
        butActually:
          "an availability commitment and a service level, neither of which exists. On a public-sector sheet these become procurement terms.",
      },
      {
        asserts:
          "an outcome strip reading “Faster citizen service · shorter backlogs · lower cost · higher public trust”, and an “assure1 public Trust Mark”.",
        butActually:
          "nothing has been measured with a customer, public trust least of all. A Trust Mark is elan1's own internal gate; calling it public invites a reader to hear an external accreditation.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/manufacture1_solution_map.svg",
    "manufacture1 solution map",
    "the industrial landscape, maintenance and quality use cases, and the pillar band.",
    "the manufacturing pack: the Indian incentive, standards and factories regimes, and a certificate of analysis that refuses to issue rather than inferring a missing value — a scar from a truthiness bug that once let an out-of-spec certificate through.",
    [
      {
        asserts:
          "an outcome strip reading “Fewer stockouts & less expediting · higher OEE, less downtime · lower scrap & better quality · lower cost”.",
        butActually:
          "OEE, scrap and downtime are the numbers a plant is run on, and not one of them has been observed in a customer environment.",
      },
      {
        asserts: "“SLAs, drift, quality” in the operations node of the pillar band.",
        butActually:
          "elan1 is held to no service level. Drift and quality monitoring are real and worth drawing; the service level beside them is not.",
      },
    ],
  ),
  solutionMap(
    "/diagrams/realestate1_solution_map.svg",
    "realestate1 solution map",
    "the property landscape, sales, leasing and diligence use cases, and the pillar band.",
    "the real-estate pack: the Indian regulatory authority regime, with the fairness check built so that it can actually fail — an earlier version could not.",
    [
      {
        asserts:
          "an outcome strip reading “Shorter sales & leasing cycles · faster document & diligence · higher conversion · fewer errors & disputes”.",
        butActually: "no cycle, conversion or dispute rate has been measured with a customer.",
      },
      {
        asserts:
          "a closing principle reading “assure1 certifies fairness & accuracy before go-live”, and “operate — SLAs” in the pillar band.",
        butActually:
          "assure1 issues elan1's own internal Trust Mark rather than certifying anything, and there is no service level behind the operations node. The fairness check itself is real and is the strongest thing on this sheet — an earlier version of it could not fail, and that was fixed.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/edu1_solution_map.svg",
    "edu1 solution map",
    "the education landscape, admissions and teaching use cases, and the pillar band.",
    "the education pack: the national education policy, the academic credit register and the data-protection regime, with an academic-integrity classifier on the write path.",
    [
      {
        asserts: "round-the-clock multilingual admissions support, with “operate — SLAs” beside it.",
        butActually:
          "an availability claim and a service level, neither derived from anything that exists. The pack's real distinction is that an integrity refusal happens before an answer is produced, not after.",
      },
      {
        asserts:
          "an outcome strip reading “Better learner support at scale · lower admin & admissions load · higher engagement & retention · faculty time returned”.",
        butActually:
          "retention and engagement are the two numbers an institution is judged on, and neither has been measured with a customer.",
      },
      APP_NAME_DIVERGENCE,
    ],
  ),
  solutionMap(
    "/diagrams/energy1_solution_map.svg",
    "energy1 solution map",
    "the utilities landscape, grid and compliance use cases, and the pillar band.",
    "the energy pack: the Indian central authority, regulatory commission and distribution-reform regimes, with a renewable certificate that must reconcile against metered generation — an earlier version certified a figure a thousand times the real one.",
    [
      {
        asserts:
          "“grid-grade SLAs” in the pillar band, and a closing principle reading “run1 runs it 24/7 at incident-grade”.",
        butActually:
          "an availability and severity commitment, on the map of the most operationally sensitive vertical on the shelf, and elan1 is held to no service level at all.",
      },
      {
        asserts:
          "an outcome strip reading “Higher grid reliability & fewer outages · less asset downtime · lower fuel & O&M cost · safer operations”.",
        butActually:
          "reliability, outage count and safety are regulated measures. None has been observed in a customer environment, and drawing them as delivered outcomes is the species of claim a regulator reads literally.",
      },
    ],
  ),
];

/** What renders. Derived — a published entry is one whose `status` says so, and nothing else. */
export const DIAGRAM_LIBRARY: PublishedDiagram[] = DIAGRAM_REGISTER.filter(isPublished);

/** What does not, and why. Same source, opposite predicate — the two can never disagree. */
export const DIAGRAM_WITHHELD: WithheldDiagram[] = DIAGRAM_REGISTER.filter(isWithheld);

// ─────────────────────────────────────────────────────────────────────────────────────────────
// PER-PAGE MAPPINGS
//
// The full slug → asset binding is kept below so the pairing survives a withholding and a redraw
// does not have to rediscover which file belongs to which page. Each map is then FILTERED THROUGH
// THE REGISTER, so a page cannot render artwork the library refuses.
//
// 🚨 Do not "temporarily" bypass the filter for one page. The reason this file exists in this shape
// is that the withhold rule was previously written as a comment beside one asset while twenty-one
// pages kept rendering the same defects.
//
// WHAT THE FILTER COSTS TODAY, stated so nobody has to discover it: `productDiagram` keeps all six
// entries, so no product page loses its architecture. `solutionDiagram` and `serviceDiagram` are
// empty — ten solution pages and five pillar pages render without a diagram. ProductPage,
// SolutionPage and ServicePage each already branch on `undefined` and render a non-diagram layout,
// so the degradation is clean, but it is a real loss and the redraw notes above are the way back.
// ─────────────────────────────────────────────────────────────────────────────────────────────

const PUBLISHED_SRC = new Set(DIAGRAM_LIBRARY.map((d) => d.src));

const onlyPublished = (m: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(m).filter(([, src]) => PUBLISHED_SRC.has(src)));

export const productDiagram: Record<string, string> = onlyPublished({
  // sales1, insight1, project1, commerce1 and goal1 have never had artwork; they show a native
  // "runs on the suite" panel instead.
  service1: "/diagrams/service1_architecture.svg",
  finance1: "/diagrams/finance1_architecture.svg",
  supply1: "/diagrams/supply1_architecture.svg",
  people1: "/diagrams/people1_architecture.svg",
  market1: "/diagrams/market1_architecture.svg",
  enterprise1: "/diagrams/enterprise1_architecture.svg",
});

export const solutionDiagram: Record<string, string> = onlyPublished({
  health1: "/diagrams/health1_solution_map.svg",
  bank1: "/diagrams/bank1_solution_map.svg",
  insure1: "/diagrams/insure1_solution_map.svg",
  retail1: "/diagrams/retail1_solution_map.svg",
  telco1: "/diagrams/telco1_solution_map.svg",
  gov1: "/diagrams/gov1_solution_map.svg",
  manufacture1: "/diagrams/manufacture1_solution_map.svg",
  realestate1: "/diagrams/realestate1_solution_map.svg",
  edu1: "/diagrams/edu1_solution_map.svg",
  energy1: "/diagrams/energy1_solution_map.svg",
});

export const serviceDiagram: Record<string, string> = onlyPublished(PILLAR_DIAGRAM_SRC);


