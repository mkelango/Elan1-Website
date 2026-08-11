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
      "People, not software. A plan worth more than a deck because the gates enforcing it already exist.",
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
    whoFor: "Teams building agents. We author blueprints or you author in Studio. One path: eval → approval → mark → deploy.",
    accent: ACCENT.green,
    offerings: [
      {
        title: "Bespoke agent builds, as typed blueprints",
        description: "Typed blueprints compile as AgentSpecs. Breaks guarantee, fails build.",
      },
      {
        title: "The advisory guarantee, enforced at compile time",
        description: "Advisory agents cannot hold control-system connectors. Compiler enforces it.",
      },
      {
        title: "A builder where the gate updates as you type",
        description: "Studio validates blueprint on every change. Money tools auto-raise to human gate.",
      },
      {
        title: "Test, publish, deploy — with a refusal in the middle",
        description: "Publish gate requires passing eval. Trust Mark mints before deploy.",
      },
      {
        title: "Rules as governed Skills, not pasted prompts",
        description: "K4 Skills versioned and hashed. Publish gate refuses raw secrets and injections.",
      },
      {
        title: "Connectors granted to the op, not to the system",
        description: "Grants resolve to declared ops. External clients cannot self-approve.",
      },
      {
        title: "The agent SDLC — what happens after it ships",
        description: "Registry tracks drift, reverify, retirement, autonomy readiness. Human approves all.",
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
      "Builds refuse unsafe blueprints. Marks require passing evals. Integration needs engagement work.",
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
        description: "One function creates marks. Refuses: no eval, zero cases, failed run, wrong tenant.",
      },
      {
        title: "Evals authored as data — and a third state",
        description: "Declarative checks: contains, equals, regex, judge. Compiler enforces before publish.",
      },
      {
        title: "Adversarial floor under the safety wedge",
        description: "Safety dimensions run paraphrase/obfuscation attacks. Zero false positives required.",
      },
      {
        title: "Drift, re-verify, revocation",
        description: "Hash drift or failed eval revokes mark. Soft revocation keeps history.",
      },
      {
        title: "Marks pinned to the model they were earned on",
        description: "Mark records model ID. Model upgrade triggers re-verify and possible revocation.",
      },
      {
        title: "The coverage register — a denominator, not a to-do list",
        description: "Register lists all marks: certified, drifted, revoked, stale, never scored.",
      },
      {
        title: "Evidence a third party can recompute",
        description: "Audit chain re-hashed on every read. Compliance receipt verifies offline.",
      },
      {
        title: "The assurance engagement — what people do, not software",
        description: "Governance signature, control mapping, eval batteries, readiness. Our people + yours.",
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
      "Absence is not a pass. Empty batteries, untested dimensions, unscored cases each get their own refusal.",
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
    whoFor: "Teams running agents in production. Operate consoles yourself or put us on retainer.",
    accent: ACCENT.cyan,
    offerings: [
      {
        title: "The incident kill-switch",
        description: "One action stops agent fleet. Immediate, non-destructive, survives restarts.",
      },
      {
        title: "Rollout waves — off until switched on",
        description: "Functions disabled by default. Admin enables per tenant. Reconciles gaps at read.",
      },
      {
        title: "The trace and the audit trail are the same record",
        description: "Runs and cost from durable stores. No second log to reconcile.",
      },
      {
        title: "FinOps computed from a rate card, not a self-report",
        description: "Token cost from rate card. Unpriced entries logged. Budgets per tenant/period.",
      },
      {
        title: "A model upgrade is treated as an untested deploy",
        description: "Model change triggers re-verify. Lower score revokes mark, demotes autonomy.",
      },
      {
        title: "An improvement queue that proposes and does not act",
        description: "Failing batteries, drifted marks, cost regressions in one worklist. Links to actions.",
      },
      {
        title: "An incident procedure that has been rehearsed",
        description: "Written runbook, drill log, mapped to SOC 2 & ISO 27001. Blameless review.",
      },
      {
        title: "An ops retainer — people, working through your consoles",
        description: "elan1 people monitor, tune, and operate. Same audited paths as your team.",
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
      "No SLA, no built-in paging. Ops responsibility is yours. Nothing here measured in production yet.",
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
