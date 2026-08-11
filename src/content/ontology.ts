// content/ontology.ts — THE ENTERPRISE ONTOLOGY: the typed structure a write is validated against.
//
// WHY THIS FILE EXISTS. The market conversation about agents and enterprise data is a conversation
// about RETRIEVAL — what an agent can see, how well it is ranked, how much of it fits. That is a real
// problem and it is not the one this platform solves. Context is what an agent READS. An ontology is
// the typed structure a WRITE is validated against. A retrieval graph makes an answer better; a
// record model makes a write REFUSABLE. Everything on this page exists to hold that one distinction
// still long enough for a reader to see it, and then to show the parts of the platform that make the
// second half of it true.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// 🚨 THE HARDEST HONESTY CONSTRAINT ON THIS SITE LIVES IN THIS FILE. READ IT BEFORE EDITING A LINE.
//
// elan1 HAS the components: a typed system-of-record schema, a governed writer that validates against
// it, config packs with a typed contract, an MCP connector fabric, a knowledge fabric with lifecycle
// governance. elan1 does NOT have them assembled, named and shipped as one product called an
// "ontology engine". There is no ontology runtime, no ontology editor, no ontology API, and no graph
// to query. Naming a thing before assembling it is precisely the over-claiming the rest of this site
// forbids — and it is the easier mistake to make here than anywhere else on the site, because the
// name is good and the parts are real.
//
// So: "Enterprise Ontology" is the name of an IDEA that ORGANISES capabilities that ship today. That
// sentence is not a footnote — it is `ONTOLOGY_FRAME.organising`, it is exported, and the page renders
// it in the first screen. If a future edit moves it below the fold, the page starts implying a product
// that does not exist. Do not move it. Do not soften it into "the ontology layer", "the ontology
// engine", "our ontology service", or any noun phrase a procurement reader could put on a purchase
// order.
//
// 🚨 EVERY LAYER CARRIES `verified`, AND IT IS NOT DECORATION. It says how the claim was checked
// against the platform tree, so a sceptical reader re-checks rather than trusts. A layer with no
// verification does not belong in this file. A layer whose `verified` says "designed" must say so on
// the page in that word — there is no such layer today, and adding one is allowed only with the word.
//
// 🚨 EVERY LAYER CARRIES ITS LIMIT WHERE ONE EXISTS, AND THE PAGE RENDERS IT BESIDE THE LAYER. Not in
// a disclaimer block at the bottom that a skimmer never reaches. The strongest thing about this
// argument is that it survives being qualified; a `limit` deleted to tighten a paragraph is the one
// edit that makes this page worse than not having it.
//
// 🚨 QUOTES ARE VERBATIM. Every string in `refusals` was read out of the platform tree on 2026-08-09,
// with its lowercase first letter and its punctuation intact. A `{placeholder}` marks a value the
// platform fills in at the moment of refusal — the same convention content/proof.ts uses — and it is
// named for WHAT IT HOLDS rather than for the variable that holds it, because an internal variable
// abbreviation is not reader-facing copy. The fixed text between the braces is exact. If a refusal
// changes upstream, change it here or delete it. Never paraphrase one into something that sounds
// better; the whole persuasive force of a refusal is that a reader can ask to see it raised.
//
// 🚨 COUNTS COME FROM platform-facts.ts, NEVER FROM THIS FILE'S KEYBOARD. And the coverage limit that
// scopes the governed write path comes from content/proof.ts (`GOVERNED_PATH_SCOPE`) — re-exported
// here so the page renders the one canonical statement rather than a second, drifting copy of it.
//
// WHAT WAS SCOUTED, AND WHERE (elan1-platform, 2026-08-09) — so a future editor re-derives rather than
// guesses. Kept in comments; no internal path appears in reader-facing copy.
//   · the schema registry (SOR_SCHEMAS, 20 entries; schema_for) ...... core/elan1_core/sor_schema.py
//   · 379 declared object types + 174 with a declared value domain ... counted by importing the twenty
//       `*_OBJECT_TYPES` / `STATUS_DOMAINS` pairs from sdk/python/elan1_sdk (execution, not reading);
//       + 29 CRM object types on the CRM store ⇒ 408, which is `objectTypes` in platform-facts.ts
//   · the writer, its check ORDER and its refusals ................... core/elan1_core/sor_write.py
//       (`check_domains`, `_uniqueness_conflicts`, `_referential_conflicts`, `_require_approval`)
//   · the referential gate's warn-by-default posture ................. same file, `_referential_gate_mode`
//   · link fields DERIVED from the SDK dataclasses ................... core/elan1_core/integrity.py
//   · the pack contract shape ........................................ packs/*/pack.yaml (10 manifests)
//   · pack lockfile + transitive trust + content hash ................ core/elan1_core/pack_lifecycle.py
//   · knowledge manifest · eval-gated certify · reverify ............. core/elan1_core/knowledge_lifecycle.py
//   · serve-time redaction AND its production callers ................ same file (`redact_pii_chunks`),
//       called from core/elan1_core/fabric_connectors.py and apps/enterprise1's service1 router
//   · canonical ↔ native mapping at the seam ......................... core/elan1_core/sor_connectors.py
//   · that the schema registry has exactly TWO consumers ............. grep across apps/ + core/: the
//       writer and the integrity sweep. No HTTP endpoint, no screen. This is why `ONTOLOGY_NOT_YET`
//       can say "no ontology API" as a fact rather than as modesty.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { ACCENT } from "./types";
import { factValue } from "./platform-facts";
import { PROOF, GOVERNED_PATH_SCOPE, type CaseStudy } from "./proof";

/* ————————————————————————————————————————————————————————————————————————
   THE FRAME — the distinction the whole page exists to make.
   ———————————————————————————————————————————————————————————————————————— */

/** One line of the read-side / write-side contrast. Neither column is a straw man: the retrieval
 *  column describes what retrieval is FOR, correctly, and the point is that it is a different job. */
export interface FrameRow {
  /** The question both columns answer. */
  question: string;
  /** What a retrieval layer — context — does about it. */
  retrieval: string;
  /** What a typed record model does about it. */
  ontology: string;
}

export const ONTOLOGY_FRAME = {
  /** The whole argument, in two sentences. Everything else on the page is evidence for these. */
  thesis:
    "Context is what an agent reads. An ontology is the typed structure a write is validated against.",
  restated:
    "A retrieval graph makes an answer better. A record model makes a write refusable. Those are different jobs, and only one of them is load-bearing when an agent stops answering and starts acting.",
  rows: [
    {
      question: "What it stands in front of",
      retrieval: "The prompt. It decides what the agent gets to see.",
      ontology: "The store. It decides what a record is allowed to become.",
    },
    {
      question: "What it improves",
      retrieval: "The answer.",
      ontology: "The record.",
    },
    {
      question: "What it can refuse",
      retrieval:
        "Nothing. Retrieval returns what it found and ranks it. A ranking is not a verdict, and there is no state in which retrieval says no.",
      ontology:
        "An object type nothing declares. A value outside its declared domain. A duplicate natural key. A link that resolves to no record. Each one is a refusal with a reason attached.",
    },
    {
      question: "How it fails",
      retrieval:
        "A weaker answer, in front of a person who can read it and push back on it in the same minute.",
      ontology:
        "A wrong record, behind everyone, found weeks later by whatever depended on it being right.",
    },
    {
      question: "Who catches the failure",
      retrieval: "The reader, if the answer looks wrong.",
      ontology:
        "The writer, before anything is stored — and the audit entry, which records the refusal whether or not anybody was watching.",
    },
  ] as FrameRow[],

  /**
   * 🚨 THE LINE THAT MAKES THIS PAGE HONEST. It is rendered in the first screen of the page, in full.
   * See the file header: do not move it, do not shorten it, and do not let a later edit turn the name
   * into a product.
   */
  organising:
    "Enterprise Ontology is what we call the idea that organises the five capabilities below. It is not a product you buy, a runtime you configure, an editor you open or an API you call. This platform ships no ontology engine, and there is no graph here to query. What it ships is a typed record model, a writer that validates against it, a typed pack contract, a governed knowledge corpus and a mapped connector seam — each of which is in the platform today, and each of which is named below so you can check it. The frame is ours. The parts are the platform's.",

  /** Why the distinction is worth a page rather than a paragraph. */
  why: "An agent that drafts is judged by its answers, so the work is in retrieval. An agent that writes to a system of record is judged by what it left behind, and nothing about retrieval can stop it leaving the wrong thing. The moment an agent is allowed to act, the question stops being what it can see and becomes what the store will accept — and that question has no answer at all unless the store knows what shape its records are meant to be.",
} as const;

/* ————————————————————————————————————————————————————————————————————————
   THE LAYERS — component by component, each anchored to something checkable.
   ———————————————————————————————————————————————————————————————————————— */

export interface OntologyLayer {
  id: string;
  /** The layer's name in our words. Never a product name — see the file header. */
  name: string;
  /** What the structure IS, stated mechanically. */
  what: string;
  /** How it ships TODAY: the mechanism that reads the structure, and where in the path it sits. */
  howItShips: string;
  /** How this was checked against the platform tree, so a reader can re-check rather than trust. */
  verified: string;
  accent: string;
  /** Verbatim refusal(s) the structure makes possible. `{braces}` = filled in at refusal time. */
  refusals?: string[];
  /** The limit that scopes this layer. The page renders it beside the layer, never at the bottom. */
  limit?: string;
  /** An existing page that already covers this in depth — link it rather than restate it. */
  seeAlso?: { label: string; href: string };
}

export const ONTOLOGY_LAYERS: OntologyLayer[] = [
  {
    id: "record-model",
    name: "The record model",
    what: `Every record any app writes is an instance of a declared object type, and each system of record declares its own list of them — ${factValue(
      "objectTypes",
    )} typed object types across ${factValue(
      "systemsOfRecord",
    )} systems of record. Alongside the types, a system of record declares value domains: object type → field → the values that field may hold, so a lifecycle field is a closed set rather than a free string. This is not documentation of the shape. It is the shape, in the form the write path reads.`,
    howItShips:
      "The declarations live in one registry keyed by the system of record's own name, rather than as a parameter passed in at each writer's construction — deliberately, because a parameter is a thing the next system of record gets added without. A writer resolves its schema by name, so a twenty-first system of record is covered the moment it declares its types rather than the moment somebody remembers to wire it. A name the registry does not know resolves to an empty declaration and enforces nothing, which keeps the registry a data contract rather than a naming rule.",
    verified: `Counted by execution, not by reading: importing the twenty declared type registries yields 379 object types across them, plus 29 more on the CRM store that runs on its own core store — ${factValue(
      "objectTypes",
    )} in total, which is the number this site publishes and the derivation it publishes it with.`,
    refusals: [
      "unknown object_type '{object_type}' for {sor} — the {sor} system of record declares {n} types and this is not one of them",
      "{object_type}.{field_name}={value} is not a declared value — {sor}.{object_type}.{field_name} must be one of {allowed}",
    ],
    limit:
      "Fewer than half of those object types name a value domain today. A field with no declared domain is not checked, and the declaration's own note is the honest reading of that: an absent domain is a known gap, not a permission. Nothing was invented to fill one in, because a domain invented to make the coverage look better is a rule nobody agreed to, enforced on real data.",
    accent: ACCENT.blue,
  },
  {
    id: "governed-write",
    name: "The validated write",
    what: "A structure is only worth declaring if something reads it before the record lands. One governed writer stands in front of each system of record and runs the same ordered sequence whether the write arrives from a screen, from the API or from an agent: the shape gate first — the object type, then its declared value domains — followed by derived safety fields computed from the record's own contents, the app's own invariants, natural-key uniqueness, the referential check, and only then policy, the human approval gate where the write is consequential, and the audit entry.",
    howItShips:
      "The order is the argument. The shape gate runs ahead of everything, including the derive, so that a refusal names the caller's own mistake rather than whatever the derive made of it. A derived field is computed from the record rather than accepted from the request, which is the only reason it is worth gating on — an asset cannot declare itself compliant, and a metric cannot declare itself grounded. Uniqueness applies to the business identifier a record carries, not only to the synthetic id. An update that cannot find its target raises rather than quietly creating one: an update never creates.",
    verified:
      "Read from the writer itself. The sequence above is the order the checks appear in its write method, each refusal below is that method's own text, and each refusal is written to the audit trail as a blocked decision rather than returned silently to the caller.",
    refusals: [
      "{object_type}.{key}={value} already exists (record {id}) — natural key must be unique",
      "{object_type}.{key}={value} references a {target} that does not exist in {sor} — a governed write may not create a dangling reference",
    ],
    limit:
      "The referential check is narrowly scoped and says so: it enforces a link only when the target type belongs to the same system of record, because checking a cross-system link against the wrong repository would refuse legitimate writes — those are left to a periodic sweep. Its resting posture audits a new dangling link rather than blocking it, since the current corpus still legitimately creates some; blocking is an operator's opt-in. There are no database foreign keys underneath. This gate is what stands in for them at the moment of writing, and a gate is a weaker thing than a constraint.",
    seeAlso: { label: "The governance model", href: "/platform/governance" },
    accent: ACCENT.cyan,
  },
  {
    id: "pack-contract",
    name: "The pack contract",
    what: `An industry is a manifest here, and the manifest is typed. Each of the ${factValue(
      "verticalPacks",
    )} packs declares which suite apps it composes, its governance signature — the policies and the eval sets that score it — its skills, its scoped connectors, and its flagship workflows, each workflow naming the agent it binds. That declaration is the contract: it is what the pack validator reads, and what the trust gate resolves when the pack is certified.`,
    howItShips:
      "A pack earns its Trust Mark only when every component it composes is itself certified, and the lockfile pins each component's content hash at that moment. Re-resolving the lock later is how drift revokes the mark: a component that changed, or lost its own certification, invalidates the composition rather than sitting inside it unnoticed. The hash covers what the pack composes, its policies, its eval sets, its skills, its connectors and the agents its workflows bind — editing any one of them produces a different hash.",
    verified: `Read from the ${factValue(
      "verticalPacks",
    )} manifests themselves and from the lifecycle module that hashes them. The neighbouring page on this site renders the same manifests, including a real one in full.`,
    limit:
      "A declaration is only ever checked against what it itself declares — which is how one pack's manifest was once able to validate happily while describing a different vertical from the one that shipped: two composed apps where three were composed, and connectors that were not that vertical's at all. The manifests were truthed up against the implementation, and the episode is the limit worth stating: the validator proves internal consistency, not correspondence with reality. Correspondence is a review, done by a person.",
    seeAlso: { label: "Verticals are config, not forks", href: "/platform/verticals-are-config" },
    accent: ACCENT.indigo,
  },
  {
    id: "knowledge-grounding",
    name: "Knowledge and grounding",
    what: "The corpus an agent cites is governed as a registered artifact rather than as a folder someone dropped documents into: a declared manifest with an owner and a residency binding, a content hash computed over the documents themselves, and a certification that is eval-gated — the corpus must actually retrieve, must be clean of raw personal and health identifiers, must be free of injected instructions, and must be bound to a region.",
    howItShips:
      "Re-verification re-runs the scan over the current corpus, so ingesting one leaky document revokes the mark as drift instead of waiting for a review cycle. And because a certificate describes a corpus at a moment while retrieval happens continuously, the same scan runs again at serve time: a leaky chunk is redacted in place on its way to the agent, keeping its source and its score so the agent still learns that a source existed. Redacted rather than dropped — dropping it silently would hide that anything was withheld.",
    verified:
      "The serve-time redaction is not a test-only path: it is called from the knowledge connector on the shared fabric and from the customer-service retrieval routes. It was added precisely because certification-time scanning left retrieval unguarded between sweeps.",
    refusals: [
      "[withheld at retrieval — this source contains raw PII/PHI or poisoned content and cannot be cited until the corpus is cleaned]",
    ],
    limit:
      "This governs what an agent may cite; it is not the record model, and the two are deliberately kept apart. Personal data belongs in the system of record under its own consent and minimisation gates, never in the grounding corpus — which is why the corpus scan treats a raw identifier as a defect rather than as content.",
    accent: ACCENT.green,
  },
  {
    id: "connector-seam",
    name: "The connector seam",
    what: "An external system's naming is not your record model, and pretending otherwise is how a field means two things. At the seam, a connector maps a canonical object and field model onto each system's native naming — an account's name is Salesforce's `Account.Name`, a worker's is Workday's `legalName`, an incident's summary is ServiceNow's `short_description`. The agent speaks canonical; the connector speaks the vendor's dialect; the translation is the connector's entire value.",
    howItShips:
      "Five such systems are declared as configuration of one connector rather than as five integrations, which is the same argument the packs make one layer up. Every call through the fabric is scope-checked against what the connector actually exposes and audited by operation and argument keys rather than argument values, and credentials are references unsealed only at the tool boundary.",
    verified:
      "The mapping tables are declared in the connector module and readable in one sitting. The offline transport is a real in-memory store, so the translation is verifiable without holding an account anywhere; the HTTP transport is the credential-gated drop-in beside it.",
    limit:
      "These are declared seams, not live integrations you inherit. Connecting one is credentials plus an audited grant, and that is an operator's step, not a switch we have already flipped. The connectors page states which tier each connector is in and does not round the catalog up into the registered count.",
    seeAlso: { label: "Connectors — the MCP fabric", href: "/platform/connectors" },
    accent: ACCENT.gold,
  },
];

/* ————————————————————————————————————————————————————————————————————————
   WHY IT MATTERS — the refusals, read backwards to the structure they needed.
   ———————————————————————————————————————————————————————————————————————— */

/**
 * A refusal from content/proof.ts, read backwards: what structure had to exist for the platform to be
 * able to say no. The pattern is cited by ID and resolved from PROOF — never re-typed here, because a
 * second copy of a refusal is the copy that drifts and stops being a quote.
 */
export interface RefusalAnchor {
  /** The `id` of a pattern in content/proof.ts. */
  patternId: string;
  /** The typed structure the refusal had to read in order to be possible. */
  structure: string;
  /** What the same request would have done against a store with no declared shape. */
  withoutIt: string;
}

export const ONTOLOGY_WHY_IT_MATTERS = {
  thesis:
    "You cannot refuse a write against a structure you do not have. Every governed refusal this platform publishes is downstream of something being declared — a type, a domain, a link, a field computed from the record rather than supplied with it. Read the refusals backwards and you arrive at the record model every time.",
  anchors: [
    {
      patternId: "refund-capture",
      structure:
        "A payment is a declared type carrying a captured amount in a declared field, and the refund links to it. The bound is computed from that record.",
      withoutIt:
        "The only comparison available is the number the caller typed against the number the caller typed. There is nothing else in the request to disagree with it.",
    },
    {
      patternId: "lapsed-coverage",
      structure:
        "A policy has a declared status domain, so `active` is a value the store recognises rather than a word in a field — and the claims already made against the sum insured are typed records that can be summed.",
      withoutIt:
        "Coverage state is a string on another screen, and what remains of the sum insured is a number somebody is expected to remember at the moment of paying.",
    },
    {
      patternId: "lot-genealogy",
      structure:
        "Genealogy is the record model doing its job: material issues are typed records that link to the batch, so 'no material was issued against this batch' is a question the store can answer.",
      withoutIt:
        "Traceability is reassembled after the fact from spreadsheets, which means a recall traces to a reconstruction rather than to a record.",
    },
    {
      patternId: "publish-number",
      structure:
        "The metric is computed at read from typed rows in the systems of record it is allowed to read, so 'nothing matched' and 'we could not look' are distinguishable states rather than the same figure.",
      withoutIt:
        "A stored counter keeps reporting the last value it held, and an empty result and an unread source arrive on the dashboard looking identical.",
    },
  ] as RefusalAnchor[],
  closing:
    "None of this makes a refusal automatic. A declared type is what makes the question answerable; the answer still has to be asked on the path the write actually takes, which is the scope every claim on this site is held to.",
} as const;

/** The anchors with their patterns resolved. DERIVED — a citation this file cannot resolve is dropped
 *  rather than rendered as a title we typed by hand, and the page counts what it renders. */
export const ANCHORED_REFUSALS: { anchor: RefusalAnchor; pattern: CaseStudy }[] =
  ONTOLOGY_WHY_IT_MATTERS.anchors.flatMap((anchor) => {
    const pattern = PROOF.find((p) => p.id === anchor.patternId);
    return pattern ? [{ anchor, pattern }] : [];
  });

/** The one canonical statement of how far the governed write path reaches. Re-exported, never
 *  restated: two copies of a coverage limit drift, and the copy that drifts is always the softer one. */
export const ONTOLOGY_PATH_SCOPE = GOVERNED_PATH_SCOPE;

/* ————————————————————————————————————————————————————————————————————————
   WHAT THIS IS NOT, YET — the section that earns the rest of the page.
   ———————————————————————————————————————————————————————————————————————— */

export interface NotYet {
  /** The thing we do NOT have, stated flatly and without a softening adverb. */
  claim: string;
  /** What exists instead, and what a buyer should conclude from it. */
  detail: string;
}

export const ONTOLOGY_NOT_YET: NotYet[] = [
  {
    claim: "There is no ontology engine, and no ontology API.",
    detail:
      "The type declarations have exactly two consumers in the platform: the governed writer that validates against them, and the integrity sweep that reads them to know what a record id could refer to. Nothing serves them over HTTP and no screen renders them. If a schema service is what your architecture needs, that is something to build, and we would rather say so than let a page imply it already exists.",
  },
  {
    claim: "There is no graph you can query.",
    detail:
      "The core carries an entity and relationship grounding module, and its own description is the accurate one — a small deterministic catalog standing in for a graph store. It is not a knowledge graph over your business, nothing on this page depends on it, and no claim here should be read as one.",
  },
  {
    claim: "There is no ontology editor, and a free-form field is still free-form.",
    detail:
      "Object types and their value domains are declared in the platform's source and reviewed the way code is reviewed. A business user cannot add a type from a screen. Each record does carry a free-form bag alongside its typed fields, and that bag is deliberately outside the checks: the shape gate and the link check read the typed fields only, which is a limit rather than a design flourish.",
  },
  {
    claim: "The declared shape is not complete.",
    detail:
      "Fewer than half of the declared object types name a value domain for any of their fields. The fields of those that do not are unchecked. The platform's own note on this is the right one to publish: an absent domain is a known gap, not a permission — and closing the gap is work, not wording.",
  },
  {
    claim: "There are no database foreign keys.",
    detail:
      "Records are stored as documents, so referential integrity is enforced at the governed write and swept periodically afterwards, rather than declared to the database. The write-path check defaults to auditing a new dangling link rather than blocking it, and only for links inside a single system of record. That is weaker than a constraint, and the difference is worth knowing before you assume the shape of your data is guaranteed by the store.",
  },
  {
    claim: "Coverage of the governed write path is not universal.",
    detail: GOVERNED_PATH_SCOPE,
  },
  {
    claim: "Nothing here has been measured in a customer environment.",
    detail:
      "There are no customers to measure yet, so this page carries no outcome figures, no time savings and no rates of anything. Every claim above is a property of a mechanism you can ask us to demonstrate, which is a different and more checkable kind of claim than a result.",
  },
];

/* ————————————————————————————————————————————————————————————————————————
   SEO
   ———————————————————————————————————————————————————————————————————————— */

export const ONTOLOGY_SEO = {
  title: "Enterprise Ontology — the typed structure a write is validated against | elan1",
  description:
    "Context is what an agent reads; an ontology is the typed structure a write is validated against. The record model, the governed writer, the pack contract, the knowledge fabric and the connector seam — with what each one is not, yet.",
} as const;
