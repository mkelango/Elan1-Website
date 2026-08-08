// content/platform-facts.ts — THE ONLY PLACE THE SITE QUOTES A PLATFORM COUNT.
//
// WHY THIS FILE EXISTS. Three separate times, a number hand-typed into a page has gone stale and
// then shipped as a false claim. The worst case ran in both directions at once: /platform/why-elan1
// said "6 product apps · 78 governed agents · 35+ connectors" against a tree holding 10 apps, 155
// agents and 32 connectors — understating the product by roughly forty percent on the very page
// meant to establish credibility.
//
// THE RULES:
//   1. A page NEVER hand-types a platform count. It imports from here.
//   2. Every entry carries its DERIVATION — how it was counted — and the date it was counted.
//   3. A count with no derivation does not belong in this file.
//   4. When in doubt, publish the smaller, defensible number. "Registered" is a fact; "available"
//      is a claim about enablement, which is a different number (see `agentsEnabled`).
//
// Counted 2026-08-08 against the elan1-platform tree.

export interface PlatformFact {
  /** The number the site may quote. */
  value: number;
  /** What it counts, in the site's own words. */
  label: string;
  /** How it was derived — so a future reader can re-run it rather than trust it. */
  derivation: string;
}

const COUNTED = "2026-08-08";
export const PLATFORM_FACTS_COUNTED_ON = COUNTED;

export const PLATFORM_FACTS = {
  suiteApps: {
    value: 10,
    label: "agentic apps",
    derivation:
      "apps/ holds 9 product directories + enterprise1; goal1 and assistant1 run in-process inside enterprise1 (asserted by core/tests/test_g4_the_toolchain_agrees_with_itself.py). 9 directories + goal1 = 10 suite apps.",
  },
  verticalPacks: {
    value: 10,
    label: "industry packs",
    derivation: "packs/ excluding framework/, governance/, generated/ — each carries a pack.yaml.",
  },
  agentsRegistered: {
    value: 155,
    label: "agents registered",
    derivation: "live import of enterprise1.platform AGENTS → len 155, cross-checked against each app's agents.py roster.",
  },
  agentsEnabled: {
    value: 69,
    label: "enabled in the current wave",
    derivation:
      "BASELINE_WAVE in apps/enterprise1/enterprise1/platform.py — 69 entries across 31 modules. The remainder are deliberately off: enablement is staged by wave, not a gap.",
  },
  workspaceScreens: {
    value: 260,
    label: "workspace screens",
    derivation: "route: keys across APP_MODULES in web/enterprise1/src/content/appregistry.ts (21 entries).",
  },
  controlPlaneScreens: {
    value: 37,
    label: "control-plane screens, live",
    derivation:
      "web/enterprise1/src/nav.ts — items with status:'live' (a real screen reading a real endpoint). 3 further items are authored guides; zero are roadmap.",
  },
  systemsOfRecord: {
    value: 20,
    label: "systems of record",
    derivation: "core/elan1_core/sor_schema.py SOR_SCHEMAS (live import, len 20), each with a GovernedSoRWriter.",
  },
  objectTypes: {
    value: 408,
    label: "typed object types",
    derivation: "379 declared across the 20 registered SoR schemas + 29 CRM object types that run on their own core store.",
  },
  insightSourceApps: {
    value: 8,
    label: "systems of record insight1 reads",
    derivation:
      "SOURCE_APPS in sdk/python/elan1_sdk/insight.py (AST-parsed, len 8): customer1, service1, finance1, supply1, people1, market1, project1, commerce1. Deliberately NOT 'every app' — goal1 and insight1's own store are absent, and the earlier site copy said 'every other app's system-of-record', which was false in both directions.",
  },
  crossAppSagas: {
    value: 21,
    label: "cross-app workflows",
    derivation: "enterprise1.server._CROSS_FLOWS (live import, len 21) — order-to-cash, case-to-refund, procure-to-AP and so on.",
  },
  skills: {
    value: 131,
    label: "reusable skills",
    derivation: "JSON manifests under skills/ across 24 namespaces.",
  },
  governanceSignatures: {
    value: 31,
    label: "governance signatures",
    derivation: "one per vertical, per suite app, and per control-plane surface.",
  },
  connectors: {
    value: 32,
    label: "connectors registered and callable",
    derivation:
      "the registered, callable connector set. Deliberately NOT '35+': the earlier figure counted catalog entries that require credentials and a grant before they do anything.",
  },
  // ⚠️ REMOVED — `refusalStrings: 111`. Three independent derivations produced 111, 101 and 635
  // depending on how a "refusal" was counted, which means the number had no agreed definition and
  // therefore no business being on a public page. The verticals page quotes ELEVEN refusals
  // verbatim instead; a quoted refusal proves more than a count of them ever could.
} as const satisfies Record<string, PlatformFact>;

/** `155` → "155". Use in copy so the number and its source can never drift apart. */
export const factValue = (k: keyof typeof PLATFORM_FACTS): string =>
  String(PLATFORM_FACTS[k].value);

/** "155 agents registered" — the number with its own label, for stat strips. */
export const factLine = (k: keyof typeof PLATFORM_FACTS): string =>
  `${PLATFORM_FACTS[k].value} ${PLATFORM_FACTS[k].label}`;
