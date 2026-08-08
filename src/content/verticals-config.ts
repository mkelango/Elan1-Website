// content/verticals-config.ts — "a vertical is a manifest, not a fork".
//
// The composability proof: ten industry packs on one shared framework, with no copy of a suite app
// in any of them.
//
// 🚨 EVERY NUMBER AND EVERY QUOTE BELOW WAS READ OUT OF PLATFORM CODE ON 2026-08-08. Sources are
// given per claim so a future editor can re-check rather than guess. Counts drift — if you change a
// figure here, re-derive it from the files named, do not adjust it by feel.
//
//   · the ten pack directories ......................... elan1-platform/packs/{bank1,edu1,energy1,
//       gov1,health1,insure1,manufacture1,realestate1,retail1,telco1}
//   · pack.yaml line counts (57–116; 745 total) ........ `wc -l packs/*/pack.yaml`
//   · python line counts per pack (110–175; 1,331) ..... `wc -l` over each pack's non-test .py files
//   · pack.py line counts (90–121) ..................... packs/<id>/<id>/pack.py
//   · shared framework = 444 lines / 8 modules ......... packs/framework/pack_framework/*.py
//   · "NO app code lives here" (the design rule) ....... packs/framework/pack_framework/types.py
//                                                        (PackDefinition docstring) + packs/README.md
//   · what the validator actually checks ............... packs/framework/pack_framework/validator.py
//                                                        (`validate_pack`)
//   · the typed manifest shape ......................... packs/framework/pack_framework/types.py
//                                                        (PackDefinition / WorkflowDef)
//   · aggregate declarations (composes / policies /
//     evals / skills / connectors / workflows / agents)   parsed from the ten pack.yaml files
//   · 9 of 43 policies are `note()` posture policies ... packs/governance/governance_packs/policies.py
//                                                        (`note`) + catalog.py per-signature policies
//   · per-signature descriptions (quoted verbatim) ..... packs/governance/governance_packs/catalog.py
//                                                        (`description=` on each GovernancePack)
//   · the phantom-eval / vacuous-battery guards ........ packs/governance/governance_packs/pack.py
//                                                        (`eval_cases_for`, `scoreable_eval_sets`)
//   · every refusal string ............................. apps/enterprise1/enterprise1/server.py, the
//       ten `_*_validate` closures: `_health_validate` (L13443) · `_egy_validate` (L13653) ·
//       `_bnk_validate` (L13983) · `_gov_validate` (L14271) · `_tel_validate` (L14511) ·
//       `_ins_validate` (L15028) · `_mfg_validate` (L15423) · `_edu_validate` (L15963) ·
//       `_retail_validate` (L16154) · `_realestate_validate` (L16445)
//   · the pack.yaml excerpt ............................ packs/manufacture1/pack.yaml (comments trimmed)
//
// HONESTY NOTES kept deliberately visible on the page, because leaving them out would overclaim:
//   1. The validator does NOT forbid Python in a pack directory. It enforces that a pack composes only
//      BUILT apps and names only real agents / connectors / policies. "No forked app code" is a design
//      rule stated in the framework's own type definition and verified by reading the ten directories
//      — it is not a check that fails a build.
//   2. Eight of the ten packs DO carry a small `agents.py`. It declares bespoke agents through the
//      shared agent1 studio (`AgentBlueprint` / `build_agents`); it is not a copy of an app.
//   3. Nine of the forty-three policy tags are `note()` policies — they allow the action and record the
//      compliance posture as an audited reason. Their teeth come from sibling policies in the same
//      signature and from the write-path refusals, not from the note itself.

export interface PackRow {
  id: string;
  industry: string;
  /** Verbatim `title:` from the pack's pack.yaml. */
  title: string;
  /** Verbatim `composes:` from pack.yaml. */
  composes: string[];
  policies: number;
  evals: number;
  workflows: number;
  /** Verbatim `description=` on the pack's GovernancePack in the governance catalog. */
  signature: string;
}

export interface Refusal {
  vertical: string;
  /** The refusal string as the platform writes it. `…` marks a value computed at runtime. */
  quote: string;
  /** What it is protecting — ours, not the code's. */
  gloss: string;
}

export interface ShapeFact {
  label: string;
  value: string;
  detail: string;
}

/* ————————————————————————————————————————————————————————————————————————
   THE SHAPE — what a pack physically is.
   ———————————————————————————————————————————————————————————————————————— */

export const PACK_SHAPE: ShapeFact[] = [
  {
    label: "Manifest",
    value: "57–116 lines",
    detail:
      "One pack.yaml per vertical — 745 lines of YAML for all ten. The smallest are health1 and energy1 at 57; the largest is retail1 at 116, and much of that file is comment.",
  },
  {
    label: "Glue",
    value: "90–121 lines",
    detail:
      "One pack.py per vertical. It resolves the manifest, registers the composed apps, installs the pack and certifies it — by calling the shared framework. It does not implement the vertical.",
  },
  {
    label: "Everything else",
    value: "110–175 lines",
    detail:
      "Total Python in a pack directory, tests excluded: pack.py, a short __init__.py, and — in eight of the ten — an agents.py declaring bespoke agents through the shared agent1 studio.",
  },
  {
    label: "Shared framework",
    value: "444 lines",
    detail:
      "The pack framework the ten point at, across eight modules: the typed manifest, the loader, the app registry, the validator and the path resolver.",
  },
];

/* ————————————————————————————————————————————————————————————————————————
   THE AGGREGATE — counted from the ten pack.yaml files.
   ———————————————————————————————————————————————————————————————————————— */

export const PACK_AGGREGATE: { value: string; label: string; note: string }[] = [
  {
    value: "10",
    label: "vertical packs",
    note: "bank1 · edu1 · energy1 · gov1 · health1 · insure1 · manufacture1 · realestate1 · retail1 · telco1",
  },
  {
    value: "8",
    label: "suite apps composed",
    note: "customer1, finance1, service1, project1, insight1, supply1, commerce1, market1 — each composed as built, by name.",
  },
  {
    value: "43",
    label: "policy tags declared",
    note: "Across the ten governance signatures. Nine are posture-recording `note()` policies; the other thirty-four block, require approval, or gate on grounding.",
  },
  {
    value: "73",
    label: "distinct eval sets",
    note: "Named in the ten signatures. A declared set that names nothing behind it raises rather than scoring zero cases.",
  },
  {
    value: "26",
    label: "flagship workflows",
    note: "Each names one existing agent to compose — twenty distinct agents in total, some belonging to a suite app and some to the vertical itself.",
  },
  {
    value: "21",
    label: "industry skills",
    note: "Declared across the ten, drawn from the shared skills registry — e.g. manufacture1.ot_safety_rule, gov1.rti_disclosure, insure1.fair_claims.",
  },
  {
    value: "16",
    label: "connector ids",
    note: "Distinct connectors scoped by the ten packs, from generic (mcp.crm, mcp.erp) to domain-specific (mcp.fhir, mcp.abdm, mcp.x12, mcp.core_banking, mcp.kyc). A pack declaring a seam is a governance and shape contract — it is not a live connection, and several of these are modelled adapters today.",
  },
  {
    value: "0",
    label: "forked suite apps",
    note: "No pack directory contains a copy of a suite app. Verified by reading all ten — see the note on what the validator does and does not enforce.",
  },
];

/* ————————————————————————————————————————————————————————————————————————
   THE TEN — every field below is read straight out of the pack's own files.
   ———————————————————————————————————————————————————————————————————————— */

export const PACK_ROWS: PackRow[] = [
  {
    id: "bank1",
    industry: "banking",
    title: "relationship banking + KYC/AML",
    composes: ["customer1", "finance1", "service1", "project1", "insight1"],
    policies: 4,
    evals: 9,
    workflows: 3,
    signature:
      "Human decides credit/money; RBI alignment; AML/KYC flag-not-act; model-risk; verified data.",
  },
  {
    id: "health1",
    industry: "healthcare",
    title: "patient access & reimbursement support (decision-support only)",
    composes: ["finance1", "project1", "insight1"],
    policies: 3,
    evals: 6,
    workflows: 1,
    signature: "Clinical DECISION-SUPPORT only; human sign-off; DPDP+DISHA; grounded in the record.",
  },
  {
    id: "insure1",
    industry: "insurance",
    title: "FNOL & claims intake",
    composes: ["service1", "finance1", "customer1", "insight1", "project1"],
    policies: 3,
    evals: 8,
    workflows: 2,
    signature: "Human decides claims; fraud=flag-not-deny; IRDAI; grounded in policy; fair claims.",
  },
  {
    id: "realestate1",
    industry: "real-estate",
    title: "listing → transact → serve (a human signs)",
    composes: ["customer1", "finance1", "project1", "service1", "insight1"],
    policies: 5,
    evals: 6,
    workflows: 4,
    signature:
      "Human decides/signs transactions; fair-housing; RERA; document/title accuracy; escrow integrity.",
  },
  {
    id: "retail1",
    industry: "retail",
    title: "merchandising & integrity for an India-first omnichannel merchant",
    composes: ["customer1", "commerce1", "supply1", "market1", "service1", "insight1"],
    policies: 5,
    evals: 7,
    workflows: 5,
    signature:
      "Human approves commitments; truthful marketing + no dark patterns; pricing integrity (MRP-safe); PII-minimised (DPDP); consumer protection (never an autonomous refund); grounded in the catalog.",
  },
  {
    id: "manufacture1",
    industry: "manufacturing",
    title: "signal → ship (humans control the machines)",
    composes: ["supply1", "finance1", "project1", "service1", "insight1"],
    policies: 4,
    evals: 9,
    workflows: 2,
    signature:
      "Humans control machines (agents advisory); OT/IT separation; safety-first; lot/batch/serial traceability.",
  },
  {
    id: "energy1",
    industry: "energy",
    title: "forecast → serve (humans control the grid)",
    composes: ["supply1", "finance1", "customer1", "service1", "project1", "insight1"],
    policies: 5,
    evals: 7,
    workflows: 2,
    signature:
      "Humans control the grid (agents advisory); OT/IT separation; safety-first; CERC/SERC + environmental; critical-infra security.",
  },
  {
    id: "telco1",
    industry: "telecom",
    title: "high-volume subscriber care",
    composes: ["service1", "finance1", "customer1", "project1", "insight1"],
    policies: 3,
    evals: 7,
    workflows: 2,
    signature: "Humans act on the network; TRAI/DoT; reliability; fraud/SIM-swap flagged.",
  },
  {
    id: "gov1",
    industry: "government",
    title: "citizen service desk",
    composes: ["service1", "finance1", "customer1", "project1", "insight1"],
    policies: 5,
    evals: 7,
    workflows: 2,
    signature:
      "Official decides entitlements; transparency/explainability; equity; RTI-ready; sovereignty.",
  },
  {
    id: "edu1",
    industry: "education",
    title: "enquiry → learn → progress (integrity-safe; educators decide)",
    composes: ["customer1", "finance1", "project1", "service1", "insight1"],
    policies: 6,
    evals: 7,
    workflows: 3,
    signature:
      "Student-data protection (heightened for minors); age-appropriate safety; academic integrity (guides, never does the work); human educators decide; grounded in curriculum; accessibility/equity.",
  },
];

/* ————————————————————————————————————————————————————————————————————————
   THE ARTIFACT — a real manifest, comments trimmed. Nothing else changed.
   ———————————————————————————————————————————————————————————————————————— */

export const PACK_YAML_EXCERPT = `# packs/manufacture1/pack.yaml — comments trimmed, nothing else changed
pack_id: manufacture1
name: manufacture1
industry: manufacturing
title: manufacture1 — signal → ship (humans control the machines)
status: available

composes: [supply1, finance1, project1, service1, insight1]

governance_signature:
  policies:
    [
      manufacture1.humans_control_machines,
      manufacture1.ot_it_separation,
      manufacture1.safety_first,
      manufacture1.traceability,
    ]
  evals:
    [
      manufacture1.grounding,
      manufacture1.machine_safety,
      manufacture1.quality_integrity,
      manufacture1.worker_data_safety,
      manufacture1.ot_it_separation,
      manufacture1.quality_closed_loop,
      manufacture1.capa_never_autonomous,
      manufacture1.engine_never_acts_for_the_human,
      manufacture1.worker_data_seam_clean,
    ]

skills: [manufacture1.ot_safety_rule, manufacture1.traceability]

connectors: [mcp.inventory, mcp.supplier]

workflows:
  - name: manufacture1.predictive_maintenance
    composes_agent: manufacture1.maintenance_advisor
    steps: [signal, predict_failure, recommend, technician_acts, audit]
  - name: manufacture1.replenishment
    composes_agent: supply1.reorder
    steps: [demand, plan, human_approves_commitment, place_order, audit]

ui_theme:
  accent: "#46cdd6"`;

/* ————————————————————————————————————————————————————————————————————————
   THE REFUSALS — verbatim from the write path. This is the best material we have.
   Each string lives in a `_*_validate` closure in apps/enterprise1/enterprise1/server.py and is
   returned as a reason the write is refused. `…` marks a value computed at runtime.
   ———————————————————————————————————————————————————————————————————————— */

export const REFUSALS: Refusal[] = [
  {
    vertical: "health1",
    quote:
      "decision-support only — this note asserts a diagnosis or prescription, so it cannot be signed into the record. A clinician writes the clinical decision; the scribe drafts.",
    gloss: "The scribe may draft anything. The record may not assert a clinical decision.",
  },
  {
    vertical: "manufacture1",
    quote:
      "inspection criterion … has result …, which is not a pass/fail verdict. Record the verdict a person reached ('pass' / 'fail') — this platform will not infer from a measurement whether it is in spec, and a batch of medicine is not a place to guess.",
    gloss: "A derive that would have to infer, refuses instead.",
  },
  {
    vertical: "manufacture1",
    quote:
      "cannot complete this batch: no material issued for …. A produced unit without lot genealogy cannot be recalled — traceability is this vertical's promise, and it is kept here or nowhere.",
    gloss: "The promise is enforced at the moment it becomes a produced unit, not at reporting time.",
  },
  {
    vertical: "bank1",
    quote:
      "a loan cannot be disbursed with a tenor of zero months: it would generate an EMPTY repayment schedule, so its outstanding, DPD and NPA status would all be a structural zero — money out against an asset the RBI classification can never see",
    gloss: "A metric computed over a field nobody populates is a zero wearing a metric's name.",
  },
  {
    vertical: "gov1",
    quote:
      "an RTI request may not be rejected without citing a statutory exemption ground (transparency: information may be refused, but never silently)",
    gloss: "Information can be refused. Refusing it silently cannot.",
  },
  {
    vertical: "gov1",
    quote:
      "appropriation: the scheme's sanctioned budget has … remaining and this benefit needs … — refused (a statutory entitlement is never part-paid to fit a budget; escalate for a revised sanction)",
    gloss: "Appropriation is modelled as a refusal, not as a cap that quietly trims the payment.",
  },
  {
    vertical: "realestate1",
    quote:
      "the certifying professional must be named — an anonymous certification is not an attestation, and the escrow ceiling rests on it",
    gloss: "The number that unlocks buyers' money has to trace to a named person.",
  },
  {
    vertical: "realestate1",
    quote:
      "escrow: … are computed from the certified construction stages and the collections in the account — not supplied. Certify a construction stage to raise what is drawable; use `withdraw_request` to draw.",
    gloss: "A gate whose input the caller supplies is not a gate — so the caller may only ask, never assert.",
  },
  {
    vertical: "energy1",
    quote:
      "a REC may only be issued against grounded, not-already-certified generation (no greenwashing / double-counting)",
    gloss: "A green attribute has to be backed by metered generation that has not been sold already.",
  },
  {
    vertical: "insure1",
    quote:
      "a claim can only be approved against an ACTIVE policy (coverage grounding — a lapsed / cancelled policy is not in force)",
    gloss: "Coverage is re-checked on the write that approves, not on the screen that displays.",
  },
  {
    vertical: "retail1",
    quote:
      "pricing integrity: MRP … is below … ACTIVE price rule(s) selling at … — lowering it would put a live price above MRP (Legal Metrology). Reprice those rules first.",
    gloss:
      "The ceiling is enforced from both sides: you cannot raise the price over MRP, and you cannot lower MRP under a price that is live.",
  },
  {
    vertical: "telco1",
    quote:
      "a network resource can only be assigned from 'available' (it is '…') — a number / IP / SIM is never double-allocated (resource integrity)",
    gloss: "Resource integrity as a state-machine refusal rather than a nightly reconciliation.",
  },
  {
    vertical: "edu1",
    quote:
      "academic integrity: the agent guides learning and never does the student's work (refused: …)",
    gloss:
      "Alongside it: “student-data protection: the agent never discloses another learner's grade, disciplinary or health detail”. Both sit on the write path, not only in the eval battery.",
  },
];

/* ————————————————————————————————————————————————————————————————————————
   WHAT THE FRAMEWORK ACTUALLY CHECKS — and what it does not.
   ———————————————————————————————————————————————————————————————————————— */

export const VALIDATOR_CHECKS: string[] = [
  "A pack may compose only apps that are actually built — `composes an unbuilt app` is an error the pack framework's validator returns by name.",
  "Every workflow must name an agent that exists and is registered, or the pack is invalid.",
  "Declared connectors are checked against the connector registry when one is supplied; declared policies are checked against the governance surface when one is supplied.",
  "A declared eval set that names nothing behind it raises rather than resolving to an empty list — an eval that scores zero cases did not pass, it did not run.",
  "A certification door that cannot compute a battery's facts has that battery narrowed for it; if the narrowing leaves nothing, it raises rather than issuing a mark.",
];

export const VALIDATOR_LIMITS: string[] = [
  "The validator does not forbid Python in a pack directory. “No app code is forked into a pack” is a design rule stated in the pack framework's own type definition and verified by reading the ten packs — not a check that fails a build.",
  "Eight of the ten packs do carry a small agents.py. It declares bespoke agents through the shared agent1 studio rather than implementing anything, and each one says so in its own docstring — energy1's reads “NOT a supply1 fork”.",
  "Nine of the forty-three policy tags are posture-recording: they allow the action and log the compliance reason. Their teeth come from sibling policies in the same signature and from the write-path refusals above — the note itself blocks nothing.",
  "Vertical domain rules are not weightless. They live in shared platform modules — the write-path validators and the vertical SDK helpers — rather than in a forked branch of a suite app. The claim is that no app is forked, not that a vertical costs nothing.",
];

export const VERTICALS_CONFIG_SEO = {
  title: "Verticals are configuration, not forks | elan1",
  description:
    "Ten industry verticals on elan1 — banking, healthcare, insurance, real estate, retail, manufacturing, energy, telecom, government, education — are declarative packs: a manifest of 57–116 lines plus a small loader, composing eight built suite apps unchanged. No suite app is forked for any of them.",
};
