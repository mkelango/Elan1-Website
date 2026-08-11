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
// over the customer's business to query. Naming a thing before assembling it is precisely the over-claiming the rest of this site
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
//   · ⚠️ the SoR connectors ship ONE transport, the in-memory one .... same file. The module's own comment
//       names `HttpSorTransport` as "the cred-gated drop-in"; NO SUCH CLASS EXISTS anywhere in the tree,
//       and the single production construction is `sor_connector("salesforce", FakeSorTransport())` in
//       enterprise1's wave-2 router, unwrapped. Same species as the `_referential_gate_mode` docstring
//       below: a comment that describes an intention in the present tense. Do not re-publish it.
//   · the schema REGISTRY's consumers ................................ `SOR_SCHEMAS` / `schema_for` are
//       imported in exactly two places — the governed writer and the integrity sweep. But the SDK's
//       `*_OBJECT_TYPES` tuples UNDERNEATH the registry have more readers: enterprise1's `sordata.py`
//       derives every app workspace snapshot from the same tuples, and that snapshot is served over HTTP
//       and rendered on a screen. So "no ontology API" is a fact about the MODEL — no endpoint returns a
//       type's declared values, and `STATUS_DOMAINS` has no reader outside the write path — and NOT a
//       claim that a type name never reaches a screen. The wider version was in an earlier draft of
//       `ONTOLOGY_NOT_YET` and was false. Do not restore it.
//   · /api/knowledge-graph EXISTS .................................... apps/enterprise1/.../routers/
//       knowledge_graph.py, 22 lines, returning a fixed handful of demo entities identical for every
//       tenant. "There is no graph you can query" was therefore too absolute — the endpoint is findable
//       in a minute — so the claim is scoped to a graph OVER YOUR BUSINESS, which is the true one.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { ACCENT } from "./types";
import { PLATFORM_FACTS, factValue } from "./platform-facts";
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
        "Nothing, by itself. Retrieval returns what it found and ranks it, and a ranking is not a verdict. Where something does say no on the way out — this platform withholds a leaky chunk at retrieval time, further down this page — that is a governance layer wrapped around retrieval, not retrieval doing it.",
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
    "Enterprise Ontology is what we call the idea that organises the five capabilities below. It is not a product you buy, a runtime you configure, an editor you open or an API you call. This platform ships no ontology engine, and there is no graph over your business here to query. What it ships is a typed record model, a writer that validates against it, a typed pack contract, a governed knowledge corpus and a mapped connector seam — each of which is in the platform today, and each of which is named below so you can check it. The frame is ours. The parts are the platform's.",

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
    what: `${factValue("objectTypes")} typed object types across ${factValue("systemsOfRecord")} systems; value domains declare closed sets per field.`,
    howItShips:
      "Writer resolves schema by name from registry, not constructor parameter; unknown names enforce nothing.",
    verified: `Counted by execution: 379 types + 29 CRM = ${factValue("objectTypes")} total, published with derivation method.`,
    refusals: [
      "unknown object_type '{object_type}' — {sor} declares {n} types",
      "{object_type}.{field_name}={value} not declared — must be one of {allowed}",
    ],
    limit:
      "Fewer than half of those object types name a value domain. Absent domain = known gap, not permission.",
    accent: ACCENT.blue,
  },
  {
    id: "governed-write",
    name: "The validated write",
    what: "Shape gate first, then derived safety fields, uniqueness, referential check, policy, approval, audit.",
    howItShips:
      "Order matters: shape gates all derives. Derived fields read record not request. Update never creates.",
    verified:
      "Read from writer: check sequence, refusals logged to audit trail as blocked decisions.",
    refusals: [
      "{object_type}.{key}={value} already exists — natural key must be unique",
      "{object_type}.{key}={value} references missing {target} — dangling references forbidden",
    ],
    limit:
      "Referential check within same SoR only; audits new dangling links by default. No database FKs.",
    seeAlso: { label: "The governance model", href: "/platform/governance" },
    accent: ACCENT.cyan,
  },
  {
    id: "pack-contract",
    name: "The pack contract",
    what: `${factValue("verticalPacks")} typed packs declare composed apps, policies, evals, skills, connectors, and agent-bound workflows.`,
    howItShips:
      "Trust Mark earned when all components certified. Lockfile pins content hash. Hash change revokes mark.",
    verified: `Read from ${factValue("verticalPacks")} manifests and lifecycle module; one real manifest published here.`,
    limit:
      "Validator proves internal consistency, not reality-correspondence. Correspondence requires human review.",
    seeAlso: { label: "Verticals are config, not forks", href: "/platform/verticals-are-config" },
    accent: ACCENT.indigo,
  },
  {
    id: "knowledge-grounding",
    name: "Knowledge and grounding",
    what: "Corpus governed as registered artifact: declared manifest, content hash, eval-gated certification with PII/PHI scan.",
    howItShips:
      "Re-verification revokes mark as drift. Serve-time redaction withholds leaky chunks in place.",
    verified:
      "Serve-time redaction production path in knowledge connector and service retrieval routes.",
    refusals: [
      "[withheld at retrieval — source contains raw PII/PHI or poisoned content]",
    ],
    limit:
      "Governs agent citation only, not record model. PII belongs in SoR under consent gates, never corpus.",
    accent: ACCENT.green,
  },
  {
    id: "connector-seam",
    name: "The connector seam",
    what: "Connector maps canonical model to vendor native naming; agent speaks canonical, connector speaks vendor dialect.",
    howItShips:
      "Five systems declared as one connector config. Calls scope-checked; credentials sealed until tool boundary.",
    verified:
      "Mapping tables declared in connector module. Offline in-memory transport is only shipped transport.",
    limit:
      "Declared seams, not live integrations. Not registered on boot fabric. Requires transport + credentials + grant.",
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
    claim: "There is no graph over your business to query.",
    detail:
      "The core carries an entity and relationship grounding module, and its own description is the accurate one — a small deterministic catalog standing in for a graph store: a fixed handful of demo entities and their edges, the same for every tenant, behind one read-only endpoint. So there is something to call. It is not a knowledge graph over your business, nothing on this page depends on it, and no claim here should be read as one.",
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
