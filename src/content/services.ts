// content/services.ts
// The pillars — what elan1 ships and who teaches it. Source: offering catalog + service playbooks.
//
// There is NO top-level "Services" section any more. Each pillar declares a `home`:
//   platform → agent1 · assure1 · run1   (software: the build studio, the trust layer, the ops layer)
//   resources → Academy (training)   ·   platform → strategy1 (plans and lands the work)
// agency1 (creative production) was RETIRED from the site — elan1 does not sell creative delivery.
// Canonical URL for a pillar is /<home>/<slug>; the old /services/<slug> URLs redirect there.

import { Service, ACCENT, type ServiceHome } from "./types";

/** Re-exported so page components can type their `home` prop without reaching into types.ts. */
export type ServiceHomeProp = ServiceHome;

export const services: Service[] = [
  {
    slug: "strategy1",
    layer: "service",
    home: "platform",
    name: "strategy1",
    tagline: "People plan it; the platform enforces it.",
    promise:
      "Turn agentic ambition into a sequenced roadmap with enforcement built in.",
    whoFor: "Leaders sequencing where agents go first. No strategy1 app — delivered by people.",
    accent: ACCENT.clay,
    offerings: [
      {
        title: "Discovery, run by people",
        description: "Interviews, workshops and a read of your current systems, done by consultants. What comes out is a written current-state map and a shortlist of candidate workflows. No part of this step is an agent, a screen or a scan — saying otherwise would be the first thing we got wrong.",
      },
      {
        title: "A sequence the platform can hold",
        description: "Candidate workflows ordered into waves. The order is not decorative: agent functions are enabled per tenant, one at a time, and a function outside the enabled set is refused before it can act — \"{app}.{function} not enabled for tenant {tenant}\" — then written to the audit chain as a blocked run. \"Later\" becomes a state the system holds, not a bullet you have to trust.",
      },
      {
        title: "A value model built to be argued with",
        description: "The business case is assembled from your own operating assumptions and labelled illustrative, because nothing has been measured in your environment. The platform holds the same line in code: a seeded figure is wrapped in a type that raises rather than render — \"illustrative value may not render as text — it is a demo seed, not a computed answer\" — and a payload carrying one is refused at the boundary.",
      },
      {
        title: "A cost line that later becomes a meter",
        description: "Roadmap costs start as estimates. After go-live they stop being estimates: run cost is computed from the platform's own rate card, per tenant and per app, with cache reads and writes priced separately. A model with no rate-card entry is logged and counted as UNPRICED rather than quietly priced at zero.",
      },
      {
        title: "An operating model written against real gates",
        description: "Who approves what, and where it lands. Expressed in mechanisms that already exist in the product — the human approval gate on consequential actions, the policy layer, the append-only hash-chained audit, role-based access, and per-tenant, per-function rollout — rather than a governance framework invented for the deck.",
      },
      {
        title: "A vertical starting point",
        description: "Ten industry packs ship as configuration over one core rather than forked application code, each carrying its own governance signature, and the control plane has a per-industry implementation workspace naming which suite apps a vertical composes. Where a packaged transformation blueprint exists in code it covers three — banking, healthcare, retail — and is reference data a consultant reads, not a service that runs.",
      },
      {
        title: "The proof, when you scope it",
        description: "A first working agent is a separately scoped build, not an automatic inclusion. When it is scoped, agent1 builds it and it lives under the same gates as everything else: evaluated before it runs, routed to a named human where the step is consequential, metered, and on the audit chain.",
      },
      {
        title: "The handover",
        description: "What leaves the engagement is a document set and a rollout order — not a running system. Standing it up is agent1 (build), assure1 (evidence) and run1 (operations), and enabling each function in the control plane is an audited admin action, gated like any other write.",
      },
    ],
    engagementModel:
      "A fixed-scope discovery-to-roadmap engagement, optionally followed by a proof-of-value sprint.",
    deliverables: [
      "Opportunity map and prioritization",
      "Costed, sequenced roadmap with ROI hypotheses",
      "An operating model and governance outline",
      "A shipped proof of value (if scoped)",
    ],
    whyElan1:
      "strategy1 is the one pillar here that is people rather than software — no strategy1 app, no strategy1 agent, no strategy1 screen. What makes the plan worth more than a document is that it is written against gates that already exist and that you will be handed: a function you have not enabled is refused before it runs, a consequential step waits for a named human, and both of those decisions land on an append-only, hash-chained log you can export.",
    outcomes: [
      "A roadmap whose sequence maps to per-tenant, per-function enablement — so \"not this wave\" is a state the control plane enforces, not a promise in a deck",
      "A value model built from your assumptions, labelled illustrative, with the arithmetic shown rather than asserted",
      "An operating model expressed as approval gates, roles and audit events that already exist in the product — nameable, not notional",
      "A rollout cost that becomes a metered number after go-live, computed from the platform's own rate card per tenant and per app",
      "A written list of what the engagement did not answer, carried forward rather than implied closed",
      "If a proof was scoped: one agent in production under the same evaluation, approval and audit gates as the rest of the platform",
    ],
    pricingModel: "Fixed-scope engagement fee. Illustrative; not financial advice.",
    connectsTo:
      "Feeds agent1 (build), the 1 Suite products, and the vertical Launchpads. Hands off to assure1 for governance and run1 for operations.",
    seo: {
      title: "strategy1 — the planning engagement | elan1",
      description:
        "strategy1 is elan1's planning engagement — delivered by people, not software. A sequenced agentic roadmap written against the gates that enforce it.",
    },
  },

  {
    slug: "agent1",
    layer: "service",
    home: "platform",
    name: "agent1",
    tagline: "Governance is a build step.",
    promise:
      "We build your agents in a studio that can refuse the build.",
    whoFor: "agent1 is both a delivery motion and a shipped console. Our engineers author your agents as typed blueprints; your platform admins open the same Studio inside enterprise1. Either way an agent reaches the runtime the same way — a passing eval, a human's approval, a Trust Mark, then deploy.",
    accent: ACCENT.green,
    offerings: [
      {
        title: "Bespoke agent builds, as typed blueprints",
        description: "We author your agents as AgentBlueprints and compile them through agent1's build_agent into /sdk AgentSpecs — the same shape every agent on the platform has, with no app forked to hold them. Three vertical packs (energy1, telco1, edu1) already compile their bespoke agents this way at import time, so a blueprint that breaks a guarantee fails the build rather than a review.",
      },
      {
        title: "The advisory guarantee, enforced at compile time",
        description: "Mark a blueprint advisory and it may hold none of the six control-system connectors. The compiler raises: \"advisory agent … may not hold control-system connectors … — OT actions are taken by humans\". Its instructions are stamped \"ADVISORY ONLY: recommend and explain; a human operator/technician/crew takes any physical or control-system action\" — stamped idempotently, so republishing does not churn the content hash and silently revoke the agent's Trust Mark.",
      },
      {
        title: "A builder where the gate updates as you type",
        description: "The Studio console in enterprise1 is a structured canvas — name, instructions, model policy, K3 tool chips, K4 skills, policy tags — validated through the real compiler on every change. Holding a money or commit tool raises the agent to a human-approval gate; advisory plus a control connector shows REFUSED live. Consequence is derived from what the blueprint actually carries, not from whether the author remembered to tick a box.",
      },
      {
        title: "Test, publish, deploy — with a refusal in the middle",
        description: "Run the draft through the governed runtime and read the step trace: runtime, governance decision, approval state, each real audit event with its hash, then the metered token cost. Publish refuses without a passing eval for that agent in that tenant — \"no passing eval for this agent — run the test first (no eval, no publish)\" — and publishing is itself a human approval. The Trust Mark mints first; the deploy runs after it.",
      },
      {
        title: "Rules as governed Skills, not pasted prompts",
        description: "Encode your rules as K4 Skills: versioned, content-hashed, resolvable by semver range, with lineage instead of forks. The publish gate refuses a shared skill that embeds a raw sensitive value, and refuses a body carrying an affirmative prompt-injection claim — \"a skill is injected verbatim into every agent that resolves it\". On a real-model deployment the runtime's certification gate cannot be switched off by configuration.",
      },
      {
        title: "Connectors granted to the op, not to the system",
        description: "A connector grant resolves against the ops the connector actually declares; asking for one it does not expose raises rather than widening the grant. MCP is real in both directions — a stdio JSON-RPC client, and a governed MCP server that returns a consequential tool call as an error requiring approval, so an external client cannot self-approve over the wire.",
      },
      {
        title: "The agent SDLC — what happens after it ships",
        description: "Nine endpoints read the live agent registry and name what a human should look at: every certified agent whose body drifted from the hash it was certified at, a prioritized reverify worklist, retirement candidates, an autonomy-promotion readiness check, and a per-agent critique. Each one flags and transitions nothing — certifying, reverifying, deprecating and raising autonomy are each a human's approval.",
      },
    ],
    engagementModel:
      "Scoped build sprints — from prototype to production — with clear acceptance criteria and quality gates.",
    deliverables: [
      "Production-grade agents and workflows",
      "Custom Skills and MCP connectors",
      "Integration with your systems",
      "Evals, guardrails, and operational handoff",
    ],
    whyElan1:
      "Two things here you can check rather than take on trust. The studio refuses builds: an advisory blueprint holding a control-system connector raises instead of compiling, and three vertical packs run through that guard every time they import. And a mark cannot be minted without evidence: Trust Mark issuance refuses an eval run that scored zero cases, refuses one that did not pass, and refuses one belonging to another tenant. What we have not done is measure speed, cost or accuracy in a customer environment — so we do not claim it. Integration is the honest exception too: the shared connector fabric ships as high-fidelity stand-ins, and making one real means wiring a native adapter or pointing an MCP connector at your actual server. That is engagement work, and we scope it as engagement work.",
    outcomes: [
      "An advisory agent that cannot hold a control-system connector — the build raises instead of compiling",
      "A Trust Mark bound to a content hash of the agent's definition, so editing the definition revokes the mark rather than outliving it",
      "A publish path that is eval-gated and approval-gated, with the refusal string on the record when it fires",
      "Rules that live in a versioned, content-hashed registry with lineage — not in a prompt someone pasted into a text box",
      "A drift scan that names every certified agent whose body no longer matches what was certified",
      "Connector grants that resolve against declared ops, so an over-broad grant fails instead of widening",
      "A run trace showing the real audit events and the real metered cost — computed, not narrated",
    ],
    pricingModel: "Scoped build-sprint fees. Illustrative; not financial advice.",
    connectsTo:
      "The build engine behind the 1 Suite and the vertical Launchpads. Hands off to assure1 (validation) and run1 (operations).",
    seo: {
      title: "agent1 — the governed agent build studio | elan1",
      description:
        "agent1 builds agents as typed blueprints and ships them through one gate: a passing eval, a human approval, a Trust Mark, then deploy. The studio refuses to compile an advisory agent that holds a control-system connector.",
    },
  },

  {
    slug: "assure1",
    layer: "service",
    home: "platform",
    name: "assure1",
    tagline: "No eval, no Trust Mark.",
    promise:
      "Trust Mark only from a passing eval. Withdrawn when definition, evidence, or model moves.",
    whoFor: "For regulated and risk-aware teams who have to show the evidence rather than describe it — and who would rather read an honest \"not measured\" than a green tick that means nothing.",
    accent: ACCENT.rose,
    offerings: [
      {
        title: "Trust Marks, eval-gated at one door",
        description: "A mark can only be created by one function, and it refuses four ways: an eval run it cannot find, a run that scored zero cases, a run that did not pass, and a run belonging to another tenant. \"An empty battery is not evidence, no Trust Mark.\" The mark stores a run id; the case counts are resolved from the eval store at read time, so the console shows what was scored — not that something was.",
      },
      {
        title: "Evals authored as data — and a third state",
        description: "Author a suite from a small declarative set of checks (contains · equals · nonempty · min_len · max_count · is_true · regex · judge); the compiler refuses to publish one that cannot run — no assertions, an unknown check, a missing value, or a judge criterion with no grader wired. A case with nothing to score reports \"not measurable — insufficient evidence on this tenant (this is NOT a pass)\", and a battery in which nothing was measurable did not pass: it did not run.",
      },
      {
        title: "Adversarial floor under the safety wedge",
        description: "Where a vertical declares a safety dimension, its certification path first runs a fixed corpus of paraphrase, synonym and obfuscation attacks through the live classifiers, and refuses the mark below a full block rate with zero false positives. Declaring a dimension that cannot be tested is itself a refusal: \"a dimension that is NAMED but cannot be tested is an error, not a pass.\" The console reports whether the classifier was the deterministic guard or a live model — it never calls one the other.",
      },
      {
        title: "Drift, re-verify, revocation",
        description: "Agents, skills, connectors, the grounding corpus and composed packs each carry a re-verify that revokes certification when the content hash drifts from the certified hash or a fresh eval fails — and one sweep runs them all, counting a broken entity as errored rather than clean. Withdrawing a mark is itself a governed action that queues for a human signature; the revocation is soft, so the audit keeps the history and a fresh passing eval can re-issue.",
      },
      {
        title: "Marks pinned to the model they were earned on",
        description: "A mark records the model id its evidence was scored under. When the runtime moves to a different model, the mark reads stale — not certified — because a score is evidence about the model it ran on. A sweep re-runs each certified agent's battery against the model the runtime would actually use; a lower score revokes the certification and demotes that agent's autonomy, and a battery that could not be scored reports not-measurable rather than a pass.",
      },
      {
        title: "The coverage register — a denominator, not a to-do list",
        description: "An improvement queue has no denominator: an empty one and an estate where nothing was ever measured look identical. The register lists every subject that should hold a mark — certified, drifted, revoked, stale, never scored — with the cases behind each, computed at read from the roster, the mark store and the eval store. Nothing is stored and nothing is capped. Uncertified is reported as unknown, not as failing, and the assurance advisor counts itself in the denominator.",
      },
      {
        title: "Evidence a third party can recompute",
        description: "The audit chain is re-hashed and re-walked on every read rather than displaying a stored verdict. A compliance receipt can be verified offline from its own contents — chain, digest, and an optional signature — with no access to the running platform. The evidence pack assembles the sources into one tenant-scoped artifact where each row carries its own measured state, and \"a row with measured=false carries verdict=null: it means we did not measure it, never that it is fine.\"",
      },
      {
        title: "The assurance engagement — what people do, not software",
        description: "Writing your governance signature, mapping controls to a framework, standing up the eval batteries that will gate your marks, closing a readiness gap, and running an external auditor's evidence requests are work our people do alongside yours. The platform holds the record and enforces the gates; the judgement calls are an engagement. elan1 is not a certification body and holds no third-party certification of its own.",
      },
    ],
    engagementModel:
      "Project-based assurance plus an ongoing governance retainer for systems in production.",
    deliverables: [
      "A governance framework and controls",
      "Evaluation and bias-test results",
      "Audit-ready evidence and reports",
      "The assure1 Trust Mark (where validated)",
    ],
    whyElan1:
      "Everything here is built so that an absence cannot read as a pass. A battery that scored nothing, a dimension that could not be tested, a control that collected no evidence, a mark whose eval can no longer be found, and a re-check that could not be measured each get their own refusal or their own \"not measured\" — instead of a green tick.",
    outcomes: [
      "A certification that cannot exist without a passing eval run behind it",
      "Coverage as a computed fraction of your estate — including what has never been scored",
      "Certifications that withdraw themselves when the definition, the evidence, or the model moves",
      "An audit trail re-hashed on every read, and a receipt a third party can verify offline",
      "\"Not measured\" visible as its own state, distinct from \"measured and fine\"",
    ],
    pricingModel: "Project fees plus a governance retainer. Illustrative; not legal or compliance advice.",
    connectsTo:
      "Validates every product and solution; central to health1, bank1, gov1, and energy1. Pairs with run1 in operations.",
    seo: {
      title: "assure1 — evals, Trust Marks, drift and revocation | elan1",
      description:
        "assure1 is elan1's certification layer: a Trust Mark only from a passing eval that scored real cases, pinned to the model it was earned on, revoked when it drifts.",
    },
  },

  {
    slug: "academy",
    layer: "service",
    home: "resources",
    name: "Academy",
    tagline: "We make your people agentic.",
    promise:
      "Training, certification, and talent that turn your workforce into confident, capable users and builders of agentic systems.",
    whoFor: "Organizations that need their people — and their talent pipeline — ready for the agentic era.",
    accent: ACCENT.violet,
    offerings: [
      { title: "Workforce training", description: "Role-based programs that build practical agentic skills." },
      { title: "Certification", description: "Credentialed paths that validate capability." },
      { title: "Enterprise enablement", description: "Change and adoption programs for agentic transformation." },
      { title: "Practitioner directory", description: "A directory of practitioners who have completed a path and consented to be listed. It is a matching mechanism, not a bench — we publish no count of certified people." },
    ],
    engagementModel:
      "Cohort programs, enterprise enablement engagements, and ongoing certification — for teams and individuals.",
    deliverables: [
      "Role-based training programs",
      "Certifications and credentials",
      "Adoption and change-management support",
      "A directory of practitioners who completed a path and chose to be listed — not a bench",
    ],
    whyElan1:
      "We teach what we build — practical, Claude-native skills grounded in real delivery, not theory.",
    outcomes: [
      "Confident, capable teams",
      "Higher adoption of agentic systems",
      "A route to practitioners who completed a path and chose to be listed",
      "Durable internal capability",
    ],
    pricingModel: "Per-seat / per-cohort and enterprise programs. Illustrative; not financial advice.",
    connectsTo:
      "Drives adoption for every product and solution; pairs with people1 and powers edu1.",
    seo: {
      title: "Academy — agentic training, certification & talent | elan1",
      description:
        "Academy turns your workforce into confident users and builders of agentic systems, with training, certification, and a talent marketplace.",
    },
  },

  {
    slug: "run1",
    layer: "service",
    home: "platform",
    name: "run1",
    tagline: "Agents in production, with a stop button that holds.",
    promise:
      "Every run on the record. One action stops the fleet.",
    whoFor: "run1 is the operating layer on the enterprise1 control plane — runs and traces, rate-card FinOps, rollout waves, and an incident kill-switch that refuses an app's writes while it is on. Take the consoles and drive them yourself, or put us on a retainer and we drive them with you.",
    accent: ACCENT.cyan,
    offerings: [
      {
        title: "The incident kill-switch",
        description: "One admin action suspends an app's entire agent fleet. It is immediate — an incident stop does not wait in an approval queue — and non-destructive: the enabled set is preserved, so resuming restores the exact prior wave. It survives a restart, and it is written to the hash-chained audit trail. Lifting it expands access again, so lifting it needs a human approval. One limit worth stating: the stop halts the agent fleet. The platform also carries a policy that would refuse a suspended app's direct system-of-record writes, and a test proves it fires — but the control plane registers that policy without the rollout reference the clause needs, so in the shipped wiring it does not engage. The kill-switch stops agents; a direct write through another path is not what it holds.",
      },
      {
        title: "Rollout waves — off until switched on",
        description: "A function stays disabled for a tenant until an admin enables it, and a run of a disabled function is refused before it acts: \"finance1.ap_ar not enabled for tenant acme\". The baseline wave turns on 69 functions across 31 modules; everything else in the registry is deliberately off, not missing. The rollout view reconciles the two sides at read and names the gaps — agents registered but enabled nowhere, and enabled entries that name no agent.",
      },
      {
        title: "The trace and the audit trail are the same record",
        description: "Observability lists every agent run with status, model, latency and priced cost, and opening a run's trace shows its own chain of audit events — there is no second log to reconcile against the governance record. Runs and cost are read from durable stores, so the figures do not reset when a process restarts, and the reliability count is taken over the whole ledger rather than over the page that was fetched.",
      },
      {
        title: "FinOps computed from a rate card, not a self-report",
        description: "Token cost is priced from the platform's own per-model rate card, with prompt-cache reads and writes priced as separate parts of the prompt rather than folded into one number. A model with no rate-card entry is logged and counted as unpriced instead of quietly costing zero. Budgets are per tenant and per period, and changing one is a cost decision that routes through the approval gate and lands in the audit trail. Cost-aware downshifting — dropping a tier as burn rises, never raising it — is available and off by default; a deployment opts in.",
      },
      {
        title: "A model upgrade is treated as an untested deploy",
        description: "When the underlying model changes, every agent's behaviour changes on unchanged code. run1 re-runs each certified agent's battery against the model the runtime would actually use, with the roster derived from the registry rather than typed. A lower score revokes that agent's Trust Mark and demotes its autonomy, both on the record. An agent with no battery comes back not measurable — we do not read an absent test as a pass. A read-only behaviour diff shows a person the per-case difference before anything is promoted.",
      },
      {
        title: "An improvement queue that proposes and does not act",
        description: "Failing eval batteries, drifted or revoked marks, agents with no eval history, running A/B experiments, and cost regressions computed from the priced run log — recent runs against earlier ones — are gathered into one worklist, scoped to your tenant and computed at read. Every item links to a governed action a person takes. Nothing on this surface modifies an agent.",
      },
      {
        title: "An incident procedure that has been rehearsed",
        description: "A written runbook: severity ladder, roles, notification targets, containment through the kill-switch endpoint, recovery through a restore drill that recomputes the audit chain per tenant against the restored rows, and a blameless review. It carries a control map to SOC 2 CC7.3 and CC7.4 and ISO 27001 A.5.24 to A.5.26, and a drill log that records exercises without back-dating them. It also names its own gaps in the same document — on-call rotation and escalation are your paging tool plus process, not elan1 code. It is a plan and a rehearsal record, not a certification.",
      },
      {
        title: "An ops retainer — people, working through your consoles",
        description: "If you would rather not staff this, elan1 people take the operating seat: watching runs and traces, working the improve queue, running the drift and model-change sweeps, setting waves and budgets, and tuning prompts and skills as the business changes. Everything they do goes through the same governed, audited paths your own operators use, so the record of who changed what does not depend on who was in the chair. Scoped to your systems and volume. It is a retainer of people, not a separate elan1-run service.",
      },
    ],
    engagementModel:
      "An ongoing operations retainer, scoped to your systems, volume, and SLAs.",
    deliverables: [
      "Operated, monitored agents in production",
      "Reliability and evaluation reporting",
      "Cost (FinOps) management",
      "Ongoing tuning and improvement",
    ],
    whyElan1:
      "Read the limits alongside the mechanisms. run1 ships no service-level agreement and no on-call rotation engine — paging routes to your own tool and the rotation is a human responsibility, stated as a known-open inside the runbook itself. Of the four alert rules, error rate and p95 latency can fire once an OpenTelemetry collector is wired; the audit-tamper and back-pressure rules have no metric producer yet, so a quiet alert there is not a verdict. Horizontal autoscaling is pinned to a single replica until back-pressure is shared, so today the platform scales vertically. High availability, disaster recovery and SRE ship as logic and manifests: the cluster, the multi-region topology and the backups remain an operator step, and the DR panel reports not measurable — every field null, with the reason — until a restore drill has actually left a receipt. The latency numbers we hold ourselves to are an in-process regression ratchet on a dev seed, never a production SLO, and our load-test harness is deliberately not quoted as evidence because it measures the harness. One incident drill has been recorded, a tabletop. Nothing here has been measured in a customer environment.",
    outcomes: [
      "An app's agent fleet can be halted in one audited action — immediate, non-destructive, and on the audit trail",
      "A function nobody has enabled cannot run — the refusal lands before the agent acts, with the app and tenant named",
      "The kill-switch survives the restart an incident tends to cause, because the state is written before the audit claims it happened",
      "What a run cost is computed from a rate card rather than reported by the model, and read from a durable store rather than a process that can be restarted",
      "A model upgrade cannot quietly re-certify itself: a lower score revokes the mark and demotes autonomy, and an agent with no battery reads not measurable",
      "Every wave change, suspension and resume is on the hash-chained audit trail, so the incident timeline reconstructs from the record rather than from memory",
      "An incident has a written, rehearsed procedure whose containment step is a real endpoint, not a paragraph",
    ],
    pricingModel: "Ongoing operations retainer. Illustrative; not financial advice.",
    connectsTo:
      "Operates every product and solution at scale; central to insure1, telco1, manufacture1, and energy1. Runs on enterprise1.",
    seo: {
      title: "run1 — agent operations, FinOps and rollout waves | elan1",
      description:
        "run1 is elan1's operating layer for agents in production — runs and traces on the audit trail, rate-card FinOps, wave rollout, and an incident kill-switch.",
    },
  },

];

// ——— Derivations. Nav, footer, routing, breadcrumbs, redirects and the sitemap use these. ———

/** The pillars that live under Platform — software. */
export const platformPillars = services.filter((s) => s.home === "platform");
/** The pillars that live under Resources — the learn-surface. */
export const resourcePillars = services.filter((s) => s.home === "resources");

/** Canonical path for a pillar, derived from its `home`. Never build this string by hand. */
export function servicePath(s: Pick<Service, "home" | "slug">): string {
  return `/${s.home}/${s.slug}`;
}

/**
 * Slugs these pillars used to ship under. `serviceBySlug` resolves them, so a retired URL redirects
 * STRAIGHT to the current canonical in one hop — /academy/strategy1 → /platform/strategy1, never
 * hopping through a retired section on the way. Redirect chains leak equity and
 * break the moment a middle hop is deleted.
 */
const LEGACY_SLUGS: Record<string, string> = {
  academy1: "academy",
  advisory: "strategy1",
};

/** Look up a pillar by its current slug, or by any slug it used to ship under. */
export function serviceBySlug(slug: string | undefined): Service | undefined {
  if (!slug) return undefined;
  const canonical = LEGACY_SLUGS[slug] ?? slug;
  return services.find((s) => s.slug === canonical);
}

export default services;
