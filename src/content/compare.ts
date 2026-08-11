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
          "Not when the list was built — the one moment a consent check is guaranteed to be stale by the time the message goes. The gate lives in the core's channel layer, so it applies to the channels rather than to one application's send button: \"blocked — {target_type} '{target_id}' has opted out of email; the send was not dispatched\". A human confirm still sits on top; the gate narrows what reaches the confirm, it does not replace it.",
        patternId: "consent-send",
      },
      {
        title: "A refusal by shape, not by a flag on the request",
        body:
          "A pulse survey response carrying an employee identifier is refused at the data layer, and the refusal names the identifiers it found: \"a pulse response must be ANONYMOUS — it cannot carry an employee identifier ({identifiers}); data-minimisation refusal (grounded)\". The check reads what the record actually carries rather than a setting that says the record is anonymous — so the form, a bulk import and an agent all meet the same rule.",
        patternId: "pulse-anonymity",
      },
      {
        title: "Staged enablement is the control, and the count is published both ways",
        body:
          `${factValue("agentsRegistered")} agents registered, ${factValue("agentsEnabled")} enabled in the current wave. The remainder are deliberately off, not missing. The gate runs before an agent acts and refuses by name — \"{app}.{function} not enabled for tenant {tenant}\" — so an operator reads a configuration gap rather than a silent nothing, and a rollout is reversible one function at a time.`,
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
    headline: "Glean makes the estate findable. elan1 makes the write refusable.",
    subhead:
      "Retrieval and governance are not competing answers to the same question. One is about what an agent can know. The other is about what it can change — and the second is the one a regulator asks about.",
    theirModel:
      "Glean indexes your connected applications into a retrieval graph — a search and knowledge layer that mirrors each source system's permissions at index time, so a person retrieves only what they were already entitled to see. On top of it sit Glean Assistant and Glean Agents: an agent builder with agentic reasoning over that graph, and governance shipped around those agents rather than bolted on afterwards. Permission-faithful enterprise search across a large, messy estate is a genuinely hard engineering problem and Glean is very good at it. Where an agent acts rather than answers, the action goes out through a connector into the application that owns the record, and the write lands under that application's rules.",
    ourModel:
      `elan1 owns the record it writes to. ${factValue("systemsOfRecord")} systems of record, each behind a governed writer that resolves identity, evaluates policy, routes a consequential change to a human and appends the audit entry. Retrieval matters here too — every answer is grounded and cited, and \"nothing matched\" and \"we could not look\" are deliberately different answers rather than the same green number. But the argument elan1 makes is about the other half: what happens when the agent stops answering and starts changing something.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "In the source applications. Glean builds an index and a knowledge graph over them, with each source's access-control lists mirrored so retrieval cannot become an exfiltration path.",
        us:
          `In elan1 — ${factValue("systemsOfRecord")} systems of record with ${factValue("objectTypes")} typed object types. Reading is a different path from writing here: a read is not on the approval-and-audit path at all, which is a statement about approval and audit rather than about access.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Which agent ran, what it retrieved, what it was permitted to see, and what action it dispatched — a strong trail over retrieval and over the call.",
        us:
          "The record before the change, the policy that fired, the human who approved it, and a per-tenant hash chain that recomputes offline. The append-only property is enforced at the database rather than in application code: a trigger raises on UPDATE and DELETE, including for the table owner.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Access is the enforcement point, and it is enforced faithfully: what a person cannot open, an agent acting for them cannot retrieve.",
        us:
          "A refusal is a string on the write path, raised live, in the language of the business: \"cannot complete this batch: no material issued for {materials}. A produced unit without lot genealogy cannot be recalled — traceability is this vertical's promise, and it is kept here or nowhere.\" It appends a refused event and persists nothing.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Vertical value comes from what is indexed — the corpus is the customer's own, so the product improves with the estate rather than with a sector module.",
        us:
          `${factValue("verticalPacks")} packs of configuration, each adding the records the horizontal applications do not own, its own write-path refusals, and a governance signature that becomes policy. A pack that rebuilt case resolution or receivables ageing would be a fork wearing a pack's name, so it does not.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "The destination application. The agent's action is dispatched over a connector and the receiving system applies its own approval and permission model.",
        us:
          "elan1, in the writer, for everything it owns — one gate that a screen, an API client and an agent all reach. The approval is single-use, bound to the exact action, and fingerprinted to the payload the reviewer actually saw.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Disable the agent or narrow its permissions, and the underlying index keeps honouring the source systems' access rules.",
        us:
          "Suspend an application's agent fleet in one action — immediate, not queued, preserving the enabled set, and it survives a restart. Stated limit: the stop reaches the agent fleet and not that application's direct writes to its own store, and we say so in the present tense rather than describing a fix that has not shipped.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Built in the agent builder and governed through Glean's own agent governance, over a permission-faithful index.",
        us:
          "Through an eval gate that can fail. A Trust Mark is refused over a run that did not pass, over another tenant's run, and over a battery that scored nothing at all — because a check that scored nothing is not-measurable and never a pass. Re-running the battery revokes a mark that has drifted.",
      },
    ],
    whereTheyLead: [
      {
        title: "The retrieval graph is genuinely excellent, and permission-faithful search is hard",
        body:
          "Mirroring every source system's access-control lists into an index, keeping them current as they change, and still returning a good ranked answer is one of the harder problems in enterprise software. Glean solved it well and early. Nothing elan1 ships makes that problem easier for anyone else.",
      },
      {
        title: "They treat agents as things to be governed, and shipped the governance",
        body:
          "Glean now ships agent governance around its agent builder rather than leaving it as a customer exercise. That is the correct posture and they took it before it was a procurement requirement. We say this plainly because the opposite framing — a retrieval vendor with no governance story — would be untrue.",
      },
      {
        title: "Breadth of sight, and time to value",
        body:
          "An index over what you already have produces something people use within weeks, without moving a record or changing a process. It reads across systems elan1 does not connect to and never will, and the value does not depend on adopting a new operating record.",
      },
      {
        title: "The corpus improves without a migration",
        body:
          "Every new source connected makes the answers better, and nothing about the source has to change. That compounding curve is very hard to compete with on the retrieval axis, and we do not try to.",
      },
    ],
    whenToPickThem:
      "Choose Glean, not elan1, if your problem is that nobody can find anything — retrieval and answers across a large, heterogeneous estate — and you want it solved without moving a record, replacing a system or changing a process.",
    ourLimits: [
      "elan1's retrieval is over its own record and its own governed knowledge corpus. It is not an index of your whole estate and does not pretend to be.",
      "No SOC 2 and no ISO 27001 certification is held today.",
      "No named customers and no published deployments.",
      `${factValue("connectors")} connectors, registered and callable — a far smaller catalog than a retrieval-first vendor whose entire product depends on connecting to everything.`,
      "Where a knowledge answer is served, personal-data redaction runs at serve time; the eval battery that scores it is a different check from the serve path, and both are in the path deliberately rather than one standing in for the other.",
    ],
    proofPoints: [
      {
        title: "A number computed at read cannot drift from the book it summarises",
        body:
          `insight1 stores no metric of its own and computes at read from ${factValue("insightSourceApps")} sibling systems of record — a named set, deliberately not \"every application\". Grounding is a refusal rather than a caveat under the chart: \"metric not grounded ({reason})\" · \"could not ground the ask — a human rephrases; the copilot never guesses a query\". The pattern this closes is the one where an empty result and an unread source produce the same confident green number.`,
        patternId: "publish-number",
      },
      {
        title: "The answering agent's entire tool grant is the knowledge seam",
        body:
          "It can retrieve; it cannot act on a record. Below a confidence floor the endpoint routes to a human and says why — \"no confident KB match — a human takes this\" — and above it, the agent returns a cited draft with a proposed status. A person sends it: \"a PROPOSED resolution — a human confirms the resolve + send (K5); the agent never auto-closes\".",
        patternId: "service-draft",
      },
      {
        title: "Publishing is a human's action, and the check reads the record",
        body:
          "The truthfulness check reads the asset's own title and body rather than a flag on the request, so an asset cannot declare itself compliant: \"blocked — banned/misleading claim(s) in the post: {claims}\". Stated limit: that check is lexical over the record's text, which is exactly why the human review sits above it rather than behind it.",
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
    headline: "Both sides own the record. Only one puts the agent inside the writer.",
    subhead:
      "This is the fair fight, and we are the newcomer in it. An established suite has functional depth and an implementation ecosystem we cannot match. What differs is whether the agent sits beside the record as an assistant, or on the write path as a governed actor.",
    theirModel:
      "SAP, Odoo, Frappe and ERPNext are systems of record, and they have been for a long time. They carry functional depth accumulated over decades — statutory reporting and country localisations, industry-specific modules, the edge cases discovered by tens of thousands of implementations — plus workflow, approval and change-logging machinery that predates the current generation of agents and was designed for a person at a screen. The open-source members of that list are self-hostable and forkable, with the entry cost and the transparency that implies. Their AI generally arrives as an assistant or copilot layer alongside the record: it drafts, summarises, explains and suggests, and hands the consequential step to the suite's own workflow.",
    ourModel:
      `elan1 was built the other way round: the governed writer came first and the applications were built thin on top of it. ${factValue("suiteApps")} applications and ${factValue("verticalPacks")} industry packs share one core holding identity, policy, the approval gate, the hash-chained audit, the skills registry, the connector fabric and per-tenant cost metering. An agent is not a layer added later — it is a caller that meets the same writer a person meets, which is why an approval can be bound to a payload hash and an audit entry can carry the policy that fired. The trade is honest and it goes both ways: we have the write path, and they have twenty years of functional edge cases we have not met yet.`,
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "In the suite. This is the comparison where that is true of both sides, and it is the reason these are the closest comparators on this page.",
        us:
          `In elan1 — ${factValue("systemsOfRecord")} systems of record, ${factValue("objectTypes")} typed object types, and ${factValue("crossAppSagas")} governed cross-application workflows in which each step evaluates the receiving application's own gate rather than inheriting the caller's.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Change documents, field-level history and workflow approval records — mature, familiar to every auditor who has worked the suite, and queryable with tooling that has existed for decades.",
        us:
          "The prior record state, the policy that fired, the approver, and a chain in which each event hashes the one before it per tenant. Append-only is a database property rather than a convention: a trigger raises on UPDATE and DELETE, including for the table owner, and a uniqueness constraint over the tenant and the predecessor hash means the chain cannot fork. When a defect once minted events pointing at the wrong predecessor, the rows could not be corrected — so the damage was declared instead, as a signed marker naming the tenant, the first affected event and a frozen digest over the observed break set.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Validation rules, configuration and workflow states, shown in the system by a consultant who knows where they live.",
        us:
          "A string, raised live, in business language, on the path an agent and a person both take: \"supplier '{name}' is not on the approved-vendor list (approved={approved}, status={status}) — PO refused\" · \"receiving {qty} would bring total received to {total}, exceeding the PO's ordered qty ({ordered})\". Ask any vendor, including this one, to show you the refusal rather than the policy.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "Industry solutions and country localisation packs, frequently delivered through a partner as an implementation on top of the standard product — with a very large body of prior art behind each one.",
        us:
          `${factValue("verticalPacks")} packs of configuration over the same built applications. A pack adds the records no horizontal application owns, its own refusals and a governance signature, and forks nothing — so a fix in a shared application reaches every industry that composes it. What a pack refuses to rebuild matters as much: case resolution, receivables ageing and satisfaction scoring already exist in the applications it composes.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "A person, through the suite's approval workflow — configured per document type and per threshold, and generally recorded alongside the action it authorised.",
        us:
          "A person, at one gate, and the approval is what executes rather than what is filed. It is single-use, bound to the exact action, and matched against a content hash of the payload the reviewer saw, so an approval given for one operation cannot be spent on another. Where a writer flags a write maker-checker — the payment release and the commerce refund today — segregation of duties lives in that same gate, and the administrator role does not lift it.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "Transport and release management, sandbox and quality landscapes, reversal documents and a very deep operational playbook — plus, for the open-source suites, the ability to read and patch the code yourself.",
        us:
          "Cross-application workflows are compensating rather than optimistic: if invoicing fails after a shipment exists, the shipment is voided and the order reverts to confirmed rather than leaving a half-landed saga. One admin action suspends an application's agent fleet immediately, preserving the enabled set. Stated limit: that stop covers the agent fleet, not the application's direct writes to its own store.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Through the suite's own release process — the assistant ships with the product, and the customer governs it with the platform's roles and authorisation objects.",
        us:
          `Through an eval gate, then a wave. \"eval '{id}' did not pass — no Trust Mark\" · \"eval '{id}' scored ZERO cases — an empty battery is not evidence, no Trust Mark\". ${factValue("agentsRegistered")} agents are registered and ${factValue("agentsEnabled")} are enabled in the current wave, per tenant and per function.`,
      },
    ],
    whereTheyLead: [
      {
        title: "Decades of functional depth we have not accumulated",
        body:
          "Statutory reporting, country localisations, tax regimes, industry modules, and the long tail of edge cases that only tens of thousands of implementations discover. If your requirement is on that long tail, they have met it before and we have not. This is the single largest honest gap on this page.",
      },
      {
        title: "An ecosystem: partners, implementers, a hiring pool and a training market",
        body:
          "You can hire someone who has done your implementation before, in your country, in your industry. You can fire a partner and find another. For many organisations the implementer matters more than the platform, and that market exists for these suites and does not exist for elan1.",
      },
      {
        title: "Proven at scale, over a long time, under regulator scrutiny",
        body:
          "These systems run supply chains, ledgers and payrolls that predate most software categories, and they have survived audits, migrations, mergers and regulatory change for decades. Longevity is evidence. elan1 has none of it yet, and no amount of architecture argument substitutes for it.",
      },
      {
        title: "Odoo, Frappe and ERPNext: open source, self-hostable, forkable",
        body:
          "You can read every line you run, host it where you like, patch it yourself, and leave without asking anyone. That is a real and permanent answer to vendor risk, and it is one elan1 does not offer.",
      },
    ],
    whenToPickThem:
      "Choose an established suite, not elan1, if you need decades-deep statutory and localisation coverage on day one, if your implementation depends on a partner ecosystem at a scale we do not have, or if the ability to read and fork the source is a hard requirement.",
    ourLimits: [
      "Functional depth: an established suite has met statutory, tax and industry edge cases we have not. We would rather you test us on the long tail early than discover it in month four.",
      "No partner or implementation ecosystem, no certified-consultant market, no third-party training industry.",
      "No SOC 2 and no ISO 27001 certification is held today, and no third-party penetration-test report is on file.",
      "No named customers, no reference sites and no published deployment history — the longevity argument runs entirely against us.",
      "elan1 is not open source and is not self-hostable today. If forkability is your answer to vendor risk, we do not have an equivalent.",
      "run1 ships no service-level-agreement machinery today, and the resilience logic is real while the multi-node deployment is not.",
    ],
    proofPoints: [
      {
        title: "A commitment to an unapproved supplier is refused by name",
        body:
          "On a purchase order and on a blanket release alike, so a standing agreement cannot be used to route future spend to a vendor you have blocked. A release is measured against the quantity already released cumulatively rather than the line in front of you, and the registered commitment policy returns no allowance at all without an idempotency key: \"a commitment requires an idempotency_key (no double-ordering)\".",
        patternId: "procurement-commitment",
      },
      {
        title: "A batch cannot complete on material that was never issued",
        body:
          "And a certificate of analysis is refused over an open non-conformance or a later failed inspection — an earlier pass survives neither. An inspection criterion must carry a verdict a person reached, because the write path refuses to infer from a measurement whether it is in spec. A derive that would have to infer refuses instead.",
        patternId: "lot-genealogy",
      },
      {
        title: "A live price above the printed maximum is refused from both directions",
        body:
          "The sale above the cap is refused, and so is lowering the cap under a price the store is already selling at — naming the active rules to reprice first, because the alternative is a platform that knows a live price is illegal and leaves it selling. The same check is recomputed on the price that actually crossed into the storefront.",
        patternId: "price-ceiling",
      },
      {
        title: "An industry is configuration, and the hand-off keeps the target's gate",
        body:
          `${factValue("verticalPacks")} packs over one core, and ${factValue("crossAppSagas")} cross-application workflows in which each step evaluates the receiving application's own gate. A grievance opens a real service case through service1's governed writer, and the composing pack raises an error rather than writing a case row itself when that gate refuses.`,
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
    headline: "You can build all of this. Here is exactly what \"all of this\" is.",
    subhead:
      "Not the demo — the demo is a weekend. This is the list of controls that turns a working agent into one a regulated business will let near its ledger, written out so you can price it honestly rather than discover it in month five.",
    theirModel:
      "An agent framework, a model provider, your own database and your own team. LangGraph, CrewAI, an agent SDK, or a graph you wrote yourself. The frameworks are good now and improving quickly: durable execution, checkpointing, human-in-the-loop interrupts, tracing and eval tooling all ship in the box. You get exactly the system you specify, with no vendor between you and it, no licence, no roadmap but yours, and no data in anyone else's tenancy.",
    ourModel:
      "elan1 is the same decision, already taken, with the controls already written and the tests that can fail already in the suite. The honest framing is not that these controls are impossible to build — they are not, and we built them — but that each one has a subtle version that looks finished and is not. Every item below exists because a plausible-looking implementation of it was wrong here first, and the fix is the part that is hard to discover.",
    dimensions: [
      {
        dim: "Where the record lives",
        them:
          "Wherever you put it — your schema, your migrations, your ownership. Total control, and a data model that fits your business exactly rather than a vendor's idea of it.",
        us:
          `${factValue("systemsOfRecord")} systems of record and ${factValue("objectTypes")} typed object types, already modelled, each behind a writer that is the only sanctioned path in. The cost is that it is our data model. The benefit is that the gate has somewhere to live on day one.`,
      },
      {
        dim: "What the audit proves",
        them:
          "Whatever you write, at whatever fidelity you choose. An application-level append-only log is a morning's work; making it survive an operator with database credentials is a different piece of work.",
        us:
          "A hash chain per tenant, plus two properties that are not application code. A database trigger raises on UPDATE and DELETE against the audit table, including for the table owner, so deletion is not a permission anyone can be granted. A uniqueness constraint over the tenant and the predecessor hash means the chain cannot fork into two plausible histories. And row-level security is forced, so the policy applies to the table owner too — the database, not the query author, decides which rows a session can see.",
      },
      {
        dim: "Whether a refusal is demonstrable",
        them:
          "Your guards, your strings, your tests. The hard part is not writing the guard — it is writing a test that could have failed, which is a discipline rather than a library.",
        us:
          "Refusals are the deliverable, and the scar tissue is published with them. A guard whose name states a property and whose body measures a correlate — a substring, a regex, a named list, an absent key — is the dominant defect species we have found in our own code, and it passes review every time. So a guard here is tested against the property, and a second guard over the same rule is diffed against the first rather than assumed equal to it.",
      },
      {
        dim: "How a vertical is delivered",
        them:
          "A branch, a module, or a set of conditionals — and then the question of whether a fix in the shared path reaches all of them.",
        us:
          `${factValue("verticalPacks")} packs as configuration over the same applications, adding records, refusals and a governance signature and forking nothing. The reason that matters is maintenance, not elegance: a fix in a shared application reaches every industry that composes it rather than reaching one branch and waiting.`,
      },
      {
        dim: "Who approves a consequential write",
        them:
          "A human-in-the-loop interrupt in the graph, which the frameworks make easy and correct. The subtle part is what the resume checks.",
        us:
          "Three conditions checked together, then the token is consumed: it is approved, it belongs to the same action, and a content hash over the resumed payload matches the hash over the payload that was approved. The identifier comes from the caller — that is the intended resume — which is precisely why the identifier cannot be the check. An earlier version of one gate asked only whether the token was approved, a question the caller's own input can answer. Both gates now run the identical three checks, and the sameness is the fix.",
      },
      {
        dim: "What happens on rollback or incident",
        them:
          "A feature flag, a deploy, or a kill switch you wire yourself. Fast to build; the questions are whether it survives a restart and whether it restores the prior state rather than an empty one.",
        us:
          "Enablement is per tenant and per function, evaluated before an agent acts, with the refusal naming the application, the function and the tenant. Suspension overrides the whole enabled set immediately, identifies itself as an incident kill-switch in its own refusal text so a deliberate stop is not read as a configuration gap, preserves the enabled set so resuming restores the exact prior wave, and survives a restart — a guard over volatile state is only actually tested by a restart.",
      },
      {
        dim: "How an agent reaches production",
        them:
          "Your eval harness and your judgement about when it is good enough — with the risk that the harness reports a pass over a set it never populated.",
        us:
          "A promotion gate that refuses three ways: a run that did not pass, a run belonging to another tenant, and a battery that scored nothing — \"eval '{id}' scored ZERO cases — an empty battery is not evidence, no Trust Mark\". That third refusal exists because an empty battery once minted a mark here: everything held over an empty set was true, and the mark was worthless. A check that scored nothing is not-measurable, never a pass.",
      },
      {
        dim: "Segregation of duties",
        them:
          "A rule in your code, usually on the request handler, and usually correct until someone adds a second path to the same action.",
        us:
          "In the approval gate, where every path converges — and armed per write rather than globally, which is the part worth copying: the writer flags the write maker-checker, and the gate then refuses a same-principal sign-off. \"segregation of duties — {principal} requested approval '{id}' and cannot also approve it; a different approver is required\". The administrator role does not bypass it, because segregation of duties is a control and not a permission — a role that can override it has removed it. Stated limit: two writes carry the flag today, the payment release and the commerce refund; an unflagged approval is unaffected.",
      },
    ],
    whereTheyLead: [
      {
        title: "Total control, and no vendor risk at all",
        body:
          "No roadmap you do not own, no pricing change, no acquisition, no end-of-life notice, no data in someone else's tenancy, and no contract to renegotiate. For some organisations that is not a preference — it is the requirement, and nothing we ship answers it.",
      },
      {
        title: "Exact fit, because a bought platform's opinions are its main cost",
        body:
          "Our data model, our category structure, our idea of what a consequential action is: you inherit all of it. Building means every one of those decisions is yours, made against your business rather than against a market of them.",
      },
      {
        title: "The frameworks are genuinely good, and improving fast",
        body:
          "Durable execution, checkpointing, human-in-the-loop interrupts, tracing, eval tooling and model routing ship in the box now, with real communities behind them. The gap between a framework and a platform is smaller every quarter, and it is not honest to describe that as a blank sheet of paper.",
      },
      {
        title: "If the governed surface is small, our machinery is overhead",
        body:
          "One workflow, one team, one system of record, low blast radius — you would be paying for approval binding, wave enablement, tenant isolation and eval gating you do not need. Buy the platform when the surface is a business; build when it is a workflow.",
      },
    ],
    whenToPickThem:
      "Build it yourself, not elan1, if you have the engineering capacity to own these controls and the discipline to write the tests that could actually fail — and especially if the governed surface is one workflow rather than a business, or if owning the source is a hard requirement.",
    ourLimits: [
      "Everything on this page is buildable. We are not claiming otherwise, and a vendor telling you these controls are out of reach is telling you something untrue.",
      "elan1 is not open source and not self-hostable today, so \"read the code you run\" is not an answer we can give you.",
      "You adopt our data model, our category structure and our definition of a consequential action. That is the real price of not building.",
      "No SOC 2 and no ISO 27001 certification is held today, so buying does not currently shortcut your own certification work either.",
      "No named customers. The operational-experience argument for buying rather than building is weaker for us than it will be in two years, and we would rather say that than imply otherwise.",
      "Coverage of the governed write path is not universal here either. A build-time check counts the mutating handlers that still reach a store directly and freezes the count as a ceiling that may only fall.",
    ],
    proofPoints: [
      {
        title: "The bind, the consume, and the second gate",
        body:
          "A content hash over the action's arguments is stored with the approval request; on resume, approved plus same-action plus matching payload hash are checked together, then the token is spent. Each condition closes a specific hole: an approval for one action authorising another, one for one record authorising a different one, and a token spent twice. Both implementations run the identical checks — because fixing a stub does not travel to a copy of the stub, and the weaker of two guards over the same rule is the one that survives review.",
        patternId: "money-release",
      },
      {
        title: "The append-only property is the database's, not the application's",
        body:
          "A trigger raises on UPDATE and DELETE against the audit table for everyone, including the table owner, and the store exposes no mutation path at all. When a defect once minted events pointing at the wrong predecessor, the rows could not be repaired — the trigger is correct and applies to everyone — so the damage is declared instead: a signed, append-only marker naming the tenant, the first affected event and a frozen digest over the exact observed break set. Add damage, remove damage, or hide a real tamper inside the window, and the digest stops matching.",
      },
      {
        title: "A promotion gate that can refuse, and a mark that can be revoked",
        body:
          "\"eval '{id}' did not pass — no Trust Mark\" · \"eval '{id}' scored ZERO cases — an empty battery is not evidence, no Trust Mark\" · \"eval '{id}' belongs to another tenant — no cross-tenant Trust Mark\". Re-running a battery revokes a mark that no longer passes, as drift. The third refusal is the one worth copying if you build: a cross-tenant run is exactly the shape that looks like evidence and is not.",
        patternId: "agent-enablement",
      },
      {
        title: "Enablement, suspension, and the restart",
        body:
          "A function outside a tenant's enabled set is refused before it acts: \"{app}.{function} not enabled for tenant {tenant}\". A suspend overrides the whole set at once and says so in its own refusal text: \"{app} is SUSPENDED (incident kill-switch) for tenant {tenant}\". It preserves the enabled set and survives a restart, so resuming restores the exact prior wave rather than an empty one.",
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
