// content/compare.ts — HEAD-TO-HEAD COMPARISONS. Five entries: three named products, one category,
// and the option every technical buyer actually holds in reserve — building it themselves.
//
// ─────────────────────────────────────────────────────────────────────────────────────────────
// THE ONE ARGUMENT THIS FILE MAKES. Nearly every agent platform on a shortlist governs THE CALL:
// may this agent invoke this operation, on this connector, with this scope. That control is real
// and elan1 enforces it too. It is not the same control as governing THE WRITE: may this change
// land in this system of record, and who said so. The difference is arity. An agent's tool call is
// one path into a record; a person in a screen is another; a sibling application composing a
// cross-app workflow is a third. A control at the write is the one all three share. So the line is
// "they govern the call; elan1 governs the write" — and every dimension row below is a
// consequence of it, not a restatement of it.
//
// 🚨 A COMPARISON WITH NO CONCESSIONS IS MARKETING, AND A TECHNICAL BUYER PRICES IT AS MARKETING.
// `whereTheyLead`, `whenToPickThem` and `ourLimits` are REQUIRED fields on the interface, not
// optional garnish, and the page gives `whereTheyLead` a full section rather than a footnote. The
// test to apply to a concession: would their own product marketing be happy to quote it back? If
// not, it is a straw man wearing a concession's clothes. Be genuinely generous. We are the smaller
// party in four of these five comparisons and the page reads better for saying so.
//
// 🚨 NEVER ASSERT WHAT A COMPETITOR LACKS. Every `them` cell states what their architecture IS,
// positively, from their own published documentation. "They have no audit" is a claim about a
// system we cannot see; "the audit records the agent's call and the platform's change history"
// is a description. Where the contrast matters, it is carried by the `us` cell saying what elan1
// does — which is checkable, by us, today. If you cannot phrase a row that way, delete the row.
//
// 🚨 THE AGENTFORCE ROW IS THE ONE THAT KEEPS THIS PAGE HONEST. The generic frame — "they sit on
// top of someone else's system of record" — is FALSE of Salesforce, which is a system of record.
// Publishing the frame without that correction would make the strongest-sounding page on the site
// the one a Salesforce architect could dismiss in a sentence. So `theirModel` says it outright and
// the distinction moves to the true axis: WHICH records, and what the control on the write is.
//
// 🚨 NO MEASURED CLAIM APPEARS HERE. No percentages, no time-to-value figures, no TCO, no win
// rates, no customer names. elan1 has none of those to publish, and a comparison page is exactly
// where an invented one would be believed.
//
// QUOTED REFUSALS COME FROM THE PLATFORM, AND FROM proof.ts WHERE proof.ts ALREADY CARRIES THEM.
// A `proofPoints[].patternId` names a card in content/proof.ts so the page can link to the pattern
// rather than restate it — and `proofPattern()` RESOLVES that id against PROOF rather than
// trusting it, because a citation that points at nothing is worse than no citation.
// ─────────────────────────────────────────────────────────────────────────────────────────────

import { ACCENT } from "./types";
import type { SEO } from "./types";
import { PROOF } from "./proof";
import { factValue } from "./platform-facts";

/** One row of the comparison table. `them` describes their architecture; `us` describes ours. */
export interface CompareDimension {
  /** The axis, phrased as the question a buyer is actually asking. */
  dim: string;
  /** What their architecture is, stated positively and from public documentation. */
  them: string;
  /** What elan1 does instead — the named mechanism, and its stated limit where one exists. */
  us: string;
}

/** A concession. Substantive, specific, and quotable by their own marketing. */
export interface CompareStrength {
  title: string;
  body: string;
}

/**
 * A proof point anchored to a mechanism we can point at.
 * `patternId` must resolve to a card in content/proof.ts — see `proofPattern()`.
 */
export interface CompareProofPoint {
  title: string;
  body: string;
  patternId?: string;
}

export interface Comparison {
  slug: string;
  /** The competitor or category as it is normally written. */
  name: string;
  /** What kind of thing it is — renders as the hero kicker. */
  category: string;
  accent: string;
  seo: SEO;
  headline: string;
  subhead: string;
  /** What they actually are. Fair, accurate, and recognisable to someone who works there. */
  theirModel: string;
  /** What elan1 is instead. */
  ourModel: string;
  dimensions: CompareDimension[];
  /** REQUIRED. 2–4 genuine concessions. See the note at the head of this file. */
  whereTheyLead: CompareStrength[];
  /** REQUIRED. The honest "choose them, not us, if…" sentence. */
  whenToPickThem: string;
  /** REQUIRED. What elan1 does not have against this comparator. */
  ourLimits: string[];
  proofPoints: CompareProofPoint[];
}

export const COMPARISONS: Comparison[] = [
  // ───────────────────────────────────────────────────────────────────────────────────────────
  {
    slug: "agentforce",
    name: "Agentforce",
    category: "Agents inside a CRM platform",
    accent: ACCENT.cyan,
    seo: {
      title: "elan1 vs Agentforce — governing the call and governing the write | elan1",
      description:
        "An honest architectural comparison: Salesforce is a system of record, Agentforce is agents over it, and elan1 is a governed system of record with the approval gate on the write. Where Agentforce leads, and when to pick it.",
    },
    headline: "Agents over CRM, or approval gate inside the writer.",
    subhead:
      "They own customer records; we govern all writes. Real question: which records and what controls the write.",
    theirModel:
      "Agentforce: agent layer over Salesforce platform. Topics and actions as Flows, Apex, APIs via MuleSoft, grounded in Data Cloud, run through Einstein Trust Layer (prompt defence, masking, zero-retention). Customer record genuinely Salesforce's with 20 years of permission/sharing/release tooling. Control on write to them is the axis.",
    ourModel:
      `elan1: operating record for ${factValue("suiteApps")} functions. Each ${factValue("systemsOfRecord")} system behind governed writer. Identity, policy, approval, audit in same order for person/API/agent. Gate not workflow-filed; action stops, requests approval with payload, resumes checking token, action, content-hash match then consumes.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Salesforce: accounts, opportunities, cases. Ledger, stock, batch, payroll in other systems via integration.",
        us:
          `${factValue("systemsOfRecord")} systems natively with ${factValue("objectTypes")} types; cross-app moves are governed steps, not integration.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Topic ran, action invoked, prompt/response via Trust Layer, field history and setup audit.",
        us:
          "Record before, policy fired, approver, hash chain per tenant offline-recomputable. Database trigger on UPDATE/DELETE (table owner included); chain cannot fork.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Topic scope, action permissions, validation/sharing rules shown by admin in org.",
        us:
          "String raised live: \"pricing integrity: sale price exceeds MRP (Legal Metrology)\". Ask for refusal, not policy.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Industry Clouds: data model, flows, layouts, partner-extended.",
        us:
          `${factValue("verticalPacks")} packs as config, adds records no app owns, owns no resolution engine. Fix reaches all verticals composing it.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "Person via platform approval/permission, configured per object/flow.",
        us:
          "Person at one writer gate; approval executes not files. Maker-checker flags segregate duty in same gate. Admin does not lift.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Deactivate agent/topic, rollback via sandbox release tooling.",
        us:
          "One admin action suspends fleet immediately, preserves enabled set, survives restart. Stops agents, not direct writes.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Sandbox build, test, deploy, permission sets govern access.",
        us:
          `Eval gate and staged wave. Mark refused if battery scored nothing, did not pass, or different tenant. ${factValue("agentsRegistered")} registered, ${factValue("agentsEnabled")} enabled.`,
      },
    ],
    whereTheyLead: [
      {
        title: "Inside a Salesforce estate, they are already where the work is",
        body:
          "One place: record, permission model, reports, admins. Agent on opportunity needs no integration/migration/vendor—adoption is config change.",
      },
      {
        title: "A platform underneath the agents that has been operated at scale for two decades",
        body:
          "Flow, Apex, sharing/permission, sandboxes, release, certified-admin market. Agentforce inherits it; elan1 does not.",
      },
      {
        title: "The Einstein Trust Layer is a serious answer to the model-side risks",
        body:
          "Prompt defence, data masking, zero-retention, logging shipped before most had answers. Real controls; we acknowledge it.",
      },
      {
        title: "An ecosystem: AppExchange, partners, ISVs and a hiring pool",
        body:
          "Salesforce implementation market exists; ours does not yet. This concession costs us most deals and is most true.",
      },
    ],
    whenToPickThem:
      "Choose Agentforce, not elan1, if your operating record already is Salesforce, the work you want agents to do lives inside that estate, and you would rather deepen one platform your team already runs than stand a second one up beside it.",
    ourLimits: [
      "No SOC 2, no ISO 27001 today; both planned before GA.",
      "No named customers, no case studies, no reference calls.",
      "No partner ecosystem, marketplace, or implementer labour market.",
      `${factValue("connectors")} connectors, a fraction of Salesforce marketplace.`,
      "Write path coverage not universal; counted and capped via build-time check.",
    ],
    proofPoints: [
      {
        title: "The approval is bound to the payload, not filed beside it",
        body:
          "Consequential action stops, requests approval with arguments. Resume gate checks: approved, same action, content-hash match. Consumes token. Approval for one op cannot spend on another; replayed token already spent.",
        patternId: "money-release",
      },
      {
        title: "A refund is bounded by the payment record, not by the request",
        body:
          "Max refundable computed from captured amount: \"refund exceeds captured—blocked (not grounded)\". Same guard on order book.",
        patternId: "refund-capture",
      },
      {
        title: "Cross-application moves keep the target's gate, not the caller's",
        body:
          `${factValue("crossAppSagas")} workflows; each step evaluates receiving app's gate. Pack opens service1 case through its writer, error if refused. Disbursement inherits finance1 approval.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────────────────────
  {
    slug: "copilot",
    name: "Microsoft Copilot",
    category: "Agents across the productivity estate",
    accent: ACCENT.blue,
    seo: {
      title: "elan1 vs Microsoft Copilot — knowledge work, and consequential writes | elan1",
      description:
        "Copilot grounds on the work graph and governs through Entra, Purview and DLP. elan1 puts a governed writer in front of each system of record. Where Copilot leads, when to pick it, and what elan1 does not have.",
    },
    headline: "Copilot works the work graph; elan1 works the record.",
    subhead:
      "Two jobs: drafting/summarizing (M365) and landing writes (systems of record). Only writes need approval gates.",
    theirModel:
      "M365 Copilot grounds on Graph (mail, files, chats, meetings, permissions). Copilot Studio: agents from topics/knowledge/actions over Power Platform connectors, Dataverse store. Entra, DLP, Purview govern. Records in Dynamics/SAP/LOB via connector under system's permission model.",
    ourModel:
      `elan1 owns business record. ${factValue("systemsOfRecord")} systems each behind governed writer: identity, policy, approval gate, audit in order. Token single-use, bound to action and content-hash of reviewed payload. Audit: prior record, policy fired, approver, per-tenant hash chain.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Work graph (mail, files, chats, meetings) in M365. Dataverse for state. LOB records via connector.",
        us:
          `${factValue("systemsOfRecord")} systems natively with ${factValue("objectTypes")} types. Writer available because record exists.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Purview records interactions/actions, each system keeps own history, trails joined by investigator.",
        us:
          "One trail with linkage: prior state, policy, approver, hash of preceding. Trigger on UPDATE/DELETE (owner included); offline-recomputable.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "DLP blocks connector combo, reports in admin surface.",
        us:
          "Business-language string live: \"claim only approved against ACTIVE policy (lapsed/cancelled not in force)\". Audit beside record.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Accelerators, templates, partner solutions on Power Platform/Dynamics.",
        us:
          `${factValue("verticalPacks")} packs as config, each adds record no app owns, signature becomes policy.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "Destination system decides via connector; lands under system's approval/permission.",
        us:
          "One gate in writer, same for screen/API/agent. Maker-checker segregates; admin does not bypass.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Disable agent, revoke connector, tighten policy via admin centre/Entra.",
        us:
          "Single suspend stops fleet immediately, preserves enabled set, survives restart. Lift needs approval. Stops agents, not direct writes.",
      },
      {
        dim: "What the agent may reach",
        them:
          "Large connector catalog; DLP constrains agent combinations.",
        us:
          `${factValue("connectors")} connectors; grant drawn from declared operations. Unexposed scope refused before credential.`,
      },
    ],
    whereTheyLead: [
      {
        title: "Distribution — it is already in the tenant",
        body:
          "No new vendor, procurement, or security review. Already in apps people use. Architecture argument cannot outweigh presence.",
      },
      {
        title: "Grounding in the work graph is genuinely hard to beat",
        body:
          "Mail, documents, chats, meetings with permissions. \"What did we decide?\" corpus beats connected alternatives.",
      },
      {
        title: "The governance surface is one your security team already operates",
        body:
          "Entra, Purview, DLP, conditional access already known. No new tools, consoles, audit scope. Second platform = second everything.",
      },
      {
        title: "A connector catalog and a low-code builder with real reach",
        body:
          "Power Platform connectors and Copilot Studio for non-engineers, backed by Microsoft support. Few equals.",
      },
    ],
    whenToPickThem:
      "Choose Copilot, not elan1, if the work you want to change is knowledge work over M365 content — drafting, summarising, finding, meeting follow-up — rather than consequential writes into a business record, and your governance requirement is satisfied by Entra, Purview and DLP.",
    ourLimits: [
      "No SOC 2, no ISO 27001, no third-party pen test report.",
      "No named customers, no case studies, no references.",
      `${factValue("connectors")} connectors vs. marketplace in four figures; some default modelled.`,
      "No productivity surface. Does not draft email, summarise meetings, live in documents.",
      "Residency declared, not enforced; single-region deployment today.",
    ],
    proofPoints: [
      {
        title: "Consent is checked at the send, against the recipient being written to",
        body:
          "Not at list build. Gate in core's channel layer: \"blocked—{target} opted out; send not dispatched\". Confirm still on top; gate narrows what reaches it.",
        patternId: "consent-send",
      },
      {
        title: "A refusal by shape, not by a flag on the request",
        body:
          "Pulse response carrying employee ID refused at data layer: \"must be ANONYMOUS—cannot carry ID; data-minimisation refusal\". Reads actual record, not setting.",
        patternId: "pulse-anonymity",
      },
      {
        title: "Staged enablement is the control, and the count is published both ways",
        body:
          `${factValue("agentsRegistered")} registered, ${factValue("agentsEnabled")} enabled this wave; remainder deliberately off. Refused by name: \"{app}.{function} not enabled\". Rollout reversible per function.`,
        patternId: "agent-enablement",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────────────────────
  {
    slug: "glean",
    name: "Glean",
    category: "Retrieval-first agents over the estate",
    accent: ACCENT.violet,
    seo: {
      title: "elan1 vs Glean — a retrieval graph, and a governed write path | elan1",
      description:
        "Glean's permission-faithful retrieval graph is genuinely strong and it now ships agent governance. elan1 governs the write into the record. An honest comparison, with concessions and our own limits.",
    },
    headline: "Glean finds; elan1 governs the write.",
    subhead:
      "Retrieval and governance are different questions. One: what can it know. Two: what can it change. Regulator asks about two.",
    theirModel:
      "Glean indexes connected apps into retrieval graph, mirrors permissions at index time. Assistant and Agents on top with governance. Permission-faithful search hard; they do it well. Actions via connector to owning app under app's rules.",
    ourModel:
      `elan1 owns record. ${factValue("systemsOfRecord")} systems behind governed writer: identity, policy, approval, audit. Retrieval grounded/cited. Write-side argument: what happens when agent stops answering and starts changing.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Source apps. Index and graph mirror ACLs; retrieval cannot exfiltrate.",
        us:
          `${factValue("systemsOfRecord")} systems with ${factValue("objectTypes")} types. Read path separate from write; statement about approval/audit.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Agent ran, retrieved, permitted to see, action dispatched—trail over retrieval and call.",
        us:
          "Prior record, policy fired, approver, per-tenant offline-computable hash chain. Database trigger on UPDATE/DELETE (owner included).",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Access enforced: what person cannot open, agent cannot retrieve.",
        us:
          "String on write path live: \"cannot complete batch: no material issued. Unit without lot genealogy cannot recall—traceability promised here.\"",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Value from what is indexed—corpus is customer's; improves with estate.",
        us:
          `${factValue("verticalPacks")} packs config, adds records no app owns, own refusals, signature becomes policy.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "Destination app via connector; lands under app's approval/permission.",
        us:
          "elan1 writer gate for all owned; screen/API/agent same gate. Single-use, bound to action, payload-hash fingerprint.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Disable agent or narrow permissions; index honours source access rules.",
        us:
          "Single suspend immediate, fleet stops, enabled set preserved, survives restart. Stops agents, not direct writes.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Built in builder, governed by Glean's agent governance, over permission-faithful index.",
        us:
          "Eval gate that fails. Mark refused if run failed, other tenant, or scored nothing (not-measurable never pass). Re-run revokes drifted.",
      },
    ],
    whereTheyLead: [
      {
        title: "The retrieval graph is genuinely excellent, and permission-faithful search is hard",
        body:
          "Mirroring ACLs and keeping current with good answers is a hard problem. Glean solved it well early. Nothing we ship makes it easier.",
      },
      {
        title: "They treat agents as things to be governed, and shipped the governance",
        body:
          "Glean ships governance around agents, not leaving it to customer. Correct posture taken early.",
      },
      {
        title: "Breadth of sight, and time to value",
        body:
          "Index over what you have produces weeks of value; no record move needed. Reads systems we don't connect to.",
      },
      {
        title: "The corpus improves without a migration",
        body:
          "New sources improve answers; nothing on source changes. Compounding curve hard to match on retrieval.",
      },
    ],
    whenToPickThem:
      "Choose Glean, not elan1, if your problem is that nobody can find anything — retrieval and answers across a large, heterogeneous estate — and you want it solved without moving a record, replacing a system or changing a process.",
    ourLimits: [
      "Retrieval is own record/corpus only; not whole-estate index.",
      "No SOC 2, no ISO 27001 today.",
      "No named customers, no published deployments.",
      `${factValue("connectors")} connectors; smaller catalog than retrieval-first vendor.`,
      "Knowledge redaction at serve time; eval battery different check from serve path, both deliberate.",
    ],
    proofPoints: [
      {
        title: "A number computed at read cannot drift from the book it summarises",
        body:
          `insight1 computes at read from ${factValue("insightSourceApps")} sibling systems—named set. Grounding refusal: \"metric not grounded\" or \"human rephrases; copilot never guesses\". Closes pattern where empty and unread both show green.`,
        patternId: "publish-number",
      },
      {
        title: "The answering agent's entire tool grant is the knowledge seam",
        body:
          "Retrieve only, cannot act. Below floor routes to human. Above floor, returns cited draft with proposed status. Person sends: \"PROPOSED resolution—human confirms (K5); agent never auto-closes\".",
        patternId: "service-draft",
      },
      {
        title: "Publishing is a human's action, and the check reads the record",
        body:
          "Truthfulness check reads title/body, not request flag. Cannot self-declare compliant: \"blocked—banned claims: {claims}\". Lexical, human review above.",
        patternId: "publish-asset",
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────────────────────
  {
    slug: "erp-suites",
    name: "SAP · Odoo · Frappe / ERPNext",
    category: "Established ERP suites",
    accent: ACCENT.gold,
    seo: {
      title: "elan1 vs SAP, Odoo and Frappe / ERPNext — AI beside the record, or in the writer | elan1",
      description:
        "Established suites are systems of record with decades of depth and an ecosystem elan1 does not have. The difference is where the agent sits. An honest comparison with real concessions.",
    },
    headline: "Both own records; we put agent inside writer.",
    subhead:
      "Fair fight; we are newcomer. They have depth/ecosystem we cannot match. Difference: agent beside record (assistant) or inside write (governed).",
    theirModel:
      "SAP, Odoo, Frappe, ERPNext: systems of record for decades. Statutory, localization, tax, industry from thousands of implementations. Workflow/approval predate agents, designed for screen. Open-source self-hostable/forkable. AI as assistant: drafts, suggests, hands consequential to suite.",
    ourModel:
      `elan1 built writer-first. ${factValue("suiteApps")} apps, ${factValue("verticalPacks")} packs share core: identity, policy, approval, audit, skills, connectors, metering. Agent meets same writer as person—approval binds payload hash, audit carries policy. We have write path; they have 20 years edge cases.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Suite. This comparison: both sides true; closest comparators.",
        us:
          `${factValue("systemsOfRecord")} systems, ${factValue("objectTypes")} types, ${factValue("crossAppSagas")} workflows. Each step evaluates receiving gate.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Change docs, field history, workflow approvals; mature, familiar, decades-old tooling.",
        us:
          "Prior state, policy fired, approver, per-tenant hash chain. Trigger on UPDATE/DELETE (owner); chain cannot fork.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Validation rules, config, workflow states shown by consultant.",
        us:
          "String live: \"supplier not approved-vendor (PO refused)\" · \"received qty exceeds ordered\". Show refusal, not policy.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Localization packs via partner on standard product.",
        us:
          `${factValue("verticalPacks")} config packs over apps. Add records no app owns, own refusals, signature. Fix reaches all composing.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "Person via approval workflow, per type/threshold.",
        us:
          "Person at one gate; approval executes not files. Single-use, bound to action, payload-hash match. Maker-checker segregates.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Release management, sandboxes, reversal docs, playbook. Open-source: read/patch yourself.",
        us:
          "Compensating workflows: invoicing fails after shipment—void and revert. One suspend immediate, preserves enabled set. Stops agents.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Suite release; customer governs with roles/auth objects.",
        us:
          `Eval gate then wave. \"did not pass—no Mark\" · \"scored ZERO—not evidence, no Mark\". ${factValue("agentsRegistered")} registered, ${factValue("agentsEnabled")} enabled.`,
      },
    ],
    whereTheyLead: [
      {
        title: "Decades of functional depth we have not accumulated",
        body:
          "Statutory, localizations, tax, industry, long tail of edge cases from thousands. If on tail, they've met it; we haven't. Largest honest gap here.",
      },
      {
        title: "An ecosystem: partners, implementers, a hiring pool and a training market",
        body:
          "Hire locals who've done it. Fire/find partners. Market exists for suites, not elan1. Implementer often matters more than platform.",
      },
      {
        title: "Proven at scale, over a long time, under regulator scrutiny",
        body:
          "Supply chains, ledgers, payrolls surviving decades of audits/mergers/regulatory change. Longevity is evidence. elan1 has none.",
      },
      {
        title: "Odoo, Frappe and ERPNext: open source, self-hostable, forkable",
        body:
          "Read, host where you like, patch, leave free. Real answer to vendor risk. elan1 doesn't offer.",
      },
    ],
    whenToPickThem:
      "Choose suite if you need decades-deep statutory/localisation day one, partner ecosystem at scale, or fork ability.",
    ourLimits: [
      "Functional depth: edge cases not met. Test on long tail early, not month four.",
      "No partner ecosystem, no consultant market, no training industry.",
      "No SOC 2, no ISO 27001, no pen test report.",
      "No named customers, references, deployment history—longevity against us.",
      "Not open source, not self-hostable. No forkability answer to vendor risk.",
      "No SLA machinery, resilience logic real, multi-node not.",
    ],
    proofPoints: [
      {
        title: "A commitment to an unapproved supplier is refused by name",
        body:
          "On PO and blanket release. Standing agreement cannot route future spend to blocked vendor. Release cumulative, no allowance without idempotency_key: \"commitment requires idempotency_key (no double-ordering)\".",
        patternId: "procurement-commitment",
      },
      {
        title: "A batch cannot complete on material that was never issued",
        body:
          "CoA refused if open non-conformance or later failed. Inspection must carry verdict person reached; write path refuses infer from measurement. Derive that would infer refuses.",
        patternId: "lot-genealogy",
      },
      {
        title: "A live price above the printed maximum is refused from both directions",
        body:
          "Sale above cap refused. Lowering cap under selling price refused—must reprice active rules first. Same check on storefront price.",
        patternId: "price-ceiling",
      },
      {
        title: "An industry is configuration, and the hand-off keeps the target's gate",
        body:
          `${factValue("verticalPacks")} packs, ${factValue("crossAppSagas")} workflows evaluate receiving gate. Grievance opens real service1 case via its writer; pack errors if gate refuses.`,
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────────────────────
  {
    slug: "build-it-yourself",
    name: "Building it yourself",
    category: "An agent framework, a database and your team",
    accent: ACCENT.clayDeep,
    seo: {
      title: "elan1 vs building it yourself — the controls you would re-implement | elan1",
      description:
        "You can build every control elan1 ships. Here is the specific list — payload-bound approvals, a hash-chained audit enforced by the database, per-tenant wave enablement, eval-gated promotion, segregation of duties in the writer — and when building is the right call.",
    },
    headline: "You can build all this; here's exactly what.",
    subhead:
      "Not demo (weekend). Controls to let regulated business near ledger. Price honestly or discover month five.",
    theirModel:
      "Framework, provider, DB, team. LangGraph, CrewAI, SDK, or your graph. Durable, checkpointing, interrupts, tracing, eval. Exactly your system, no vendor, no license, your roadmap, your tenancy.",
    ourModel:
      "elan1: same decision, controls written, tests fail ready. Each control has subtle wrong version. Every item below was wrong here first; fix is hard to discover.",
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Your schema, migrations, ownership. Total control, model fits business.",
        us:
          `${factValue("systemsOfRecord")} systems, ${factValue("objectTypes")} types. Our model; gate lives day one.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Whatever you write. App-level append-only is morning; surviving operator DB creds is different work.",
        us:
          "Hash chain per tenant. Trigger on UPDATE/DELETE (owner included). Uniqueness constraint prevents fork. RLS forced; DB decides rows.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Your guards, strings, tests. Hard part: test that could fail, not writing guard.",
        us:
          "Refusals are deliverable. Guard name/body mismatch (substring/regex/list) is dominant defect; we test against property, diff two guards over same rule.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Branch, module, or conditionals. Fix shared path reaches all?",
        us:
          `${factValue("verticalPacks")} packs config, fork nothing. Fix shared app reaches every composing industry.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "Human-in-loop interrupt in graph; frameworks make easy. Subtle part: resume checks.",
        us:
          "Three checked together then consumed: approved, same action, payload-hash match. Identifier from caller; cannot be check. Both gates identical three checks.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Feature flag, deploy, kill-switch. Fast; survives restart? Restores prior state?",
        us:
          "Per-tenant/function, evaluated before act, refusal names app/function/tenant. Suspend immediate, names itself incident kill-switch, preserves enabled set, survives restart.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Your eval harness, your call when good. Risk: passes over unpopulated set.",
        us:
          "Promotion gate refuses: did not pass, other tenant, scored nothing (\"not evidence, no Mark\"). Empty battery once minted mark; now nothing is not-measurable.",
      },
      {
        dim: "Segregation of duties",
        them:
          "Rule in code, usually request handler, breaks when second path added.",
        us:
          "In approval gate where paths converge, per-write not global. Writer flags; gate refuses same-principal sign-off. Admin does not bypass. Two writes carry flag today.",
      },
    ],
    whereTheyLead: [
      {
        title: "Total control, and no vendor risk at all",
        body:
          "No roadmap, pricing, acquisition, EOL, data in others' tenancy, contract. For some, requirement not preference.",
      },
      {
        title: "Exact fit, because a bought platform's opinions are its main cost",
        body:
          "Our model, category structure, consequential action definition: you inherit. Build means yours, made for business not market.",
      },
      {
        title: "The frameworks are genuinely good, and improving fast",
        body:
          "Durable, checkpointing, interrupts, tracing, eval, routing ship now with real communities. Gap smaller every quarter.",
      },
      {
        title: "If the governed surface is small, our machinery is overhead",
        body:
          "One workflow, one team, one store, low blast—you pay for approval/wave/tenant/eval you don't need. Buy platform for business, build for workflow.",
      },
    ],
    whenToPickThem:
      "Build it yourself, not elan1, if you have the engineering capacity to own these controls and the discipline to write the tests that could actually fail — and especially if the governed surface is one workflow rather than a business, or if owning the source is a hard requirement.",
    ourLimits: [
      "Everything buildable; we don't claim otherwise.",
      "Not open source, not self-hostable. No \"read code you run.\"",
      "You adopt our model, structure, consequential definition. Real price of not building.",
      "No SOC 2, no ISO 27001; buying doesn't shortcut your cert work.",
      "No named customers. Operational-experience argument weaker for us than in two years.",
      "Write-path coverage not universal; mutating handlers counted and capped.",
    ],
    proofPoints: [
      {
        title: "The bind, the consume, and the second gate",
        body:
          "Hash over action arguments stored with request; resume checks approved+same-action+matching-hash together then spends. Each closes hole. Both implementations identical—fixing stub doesn't travel to copy.",
        patternId: "money-release",
      },
      {
        title: "The append-only property is the database's, not the application's",
        body:
          "Trigger on UPDATE/DELETE for everyone (owner included); no mutation path exposed. Defect once minted wrong predecessor—rows couldn't repair, trigger correct so damage declared. Add/remove/hide and digest stops matching.",
        patternId: "money-release",
      },
      {
        title: "A promotion gate that can refuse, and a mark that can be revoked",
        body:
          "\"did not pass—no Mark\" · \"scored ZERO—not evidence, no Mark\" · \"other tenant—no cross-tenant Mark\". Re-run revokes drifted. Cross-tenant run looks like evidence but isn't.",
        patternId: "agent-enablement",
      },
      {
        title: "Enablement, suspension, and the restart",
        body:
          "Function outside enabled set refused: \"{app}.{function} not enabled\". Suspend overrides all, says so in refusal text. Preserves enabled set, survives restart, restores prior wave.",
        patternId: "agent-enablement",
      },
    ],
  },
];

/** Slug → comparison. Derived, so a new entry is reachable without a second list to keep in sync. */
export const comparisonBySlug: Record<string, Comparison> = Object.fromEntries(
  COMPARISONS.map((c) => [c.slug, c]),
);

/** The default entry the page redirects an unknown slug to. Derived — never a hardcoded slug. */
export const DEFAULT_COMPARISON_SLUG = COMPARISONS[0].slug;

/**
 * Resolve a `proofPoints[].patternId` against the actual PROOF array.
 *
 * WHY THIS IS A LOOKUP AND NOT A STRING THE PAGE PRINTS. A citation is only worth rendering if it
 * points at something that exists. If a pattern is renamed or removed in proof.ts, this returns
 * undefined and the page renders the proof point without a link — rather than shipping a live link
 * to a card that is not there, or a pattern title that quietly stopped matching its card.
 */
export const proofPattern = (id?: string) =>
  id ? PROOF.find((p) => p.id === id) : undefined;

/**
 * The date the descriptions on this page were last reviewed.
 *
 * DELIBERATELY NOT "the date we read each vendor's documentation". That would be a claim about our
 * own method that a reader cannot check and that nothing in this repository evidences — which is
 * exactly the shape of claim the rest of this file refuses to make about someone else.
 */
export const COMPARE_ASSESSED_ON = "2026-08-09";

/**
 * Rendered on every comparison page. A comparison page is the one place on a site where a reader
 * has no way to check the half of the claim that is about someone else — so the limits of our
 * knowledge are stated rather than left for them to assume away.
 */
export const COMPARE_DISCLOSURE =
  `These comparisons describe each product's publicly documented architecture as we understood it on ${COMPARE_ASSESSED_ON}. ` +
  "No vendor reviewed a word of it, nothing here was checked against a running instance of their " +
  "product, and the left-hand column is our reading of someone else's design rather than a quotation " +
  "from it. elan1 has no " +
  "access to any competitor's private roadmap, no visibility into an unreleased build, and no " +
  "benchmark run in a customer environment — which is why no percentage, no time-to-value figure " +
  "and no total-cost number appears anywhere on this page. Nobody measured them. Product " +
  "architecture moves quickly, and some of what is written here will be out of date before we " +
  "correct it. If you work on one of these products and a sentence on this page is wrong, tell us " +
  "and we will change it: a comparison that survives only because the vendor never read it is not " +
  "evidence of anything.";
