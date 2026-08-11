// content/developers.ts — the developer surface, and the honest state of each part of it.
//
// WHY THIS FILE EXISTS. elan1 is MCP-native — it consumes external MCP servers through one governed
// fabric AND publishes its own governed operations back out as MCP tools — and the site has never
// said so. That is a genuine differentiator going unclaimed.
//
// 🚨 THE FAILURE MODE THIS FILE IS BUILT TO PREVENT IS A DEAD LINK. A developer who clicks through to
// a 404, or to a docs domain that does not resolve, is gone and does not come back. There is no
// docs.elan1.ai today. There is no published npm or PyPI package. There is no GitHub repository to
// send anyone to. So this module carries a TYPED STATUS on every surface, and the page derives the
// link from `devHref()` — which refuses to return one for anything that is not `available`, and
// refuses again if the route is not in the allowlist below. Two independent gates, because a typed
// field alone can be set wrong by the next editor and nothing would notice.
//
// STATUS IS ABOUT THE READER, NOT ABOUT THE PLATFORM. It answers "what can a developer do with this,
// from this site, today?" — never "does elan1 have it?".
//
//   available — this site documents the mechanism, at `href`, on a route that exists right now.
//   preview   — it runs in the platform build these claims were checked against, but there is no
//               self-serve access and no published reference. Both ship with the developer preview.
//   planned   — named and scoped in the platform's own decision record. Not built. Says so.
//
// A `preview` row is not a weaker capability than an `available` one; it is a real capability with
// nowhere to send you yet. NEVER upgrade a row to `available` in order to give it a link.
//
// 🚨 EVERY CLAIM BELOW IS TRACEABLE TO PLATFORM CODE. Sources, so a future edit can re-check rather
// than guess. Paths are relative to the elan1-platform repo. Verified 2026-08-11.
//
//   THE CONTRACT (K9)
//   · eight typed surfaces as Protocols; the only coupling point ......... sdk/python/elan1_sdk/client.py
//   · versioned 1.0.0; a breaking signature = major bump + a recorded
//     decision + a migration note ....................................... sdk/python/pyproject.toml, docs/core-contract.md
//   · pure types and Protocols, `dependencies = []` ..................... sdk/python/pyproject.toml
//   · TypeScript mirror, `"private": true` (NOT published) .............. sdk/ts/package.json
//   · run status is a value, not an exception:
//     completed | awaiting_approval | rejected | error .................. sdk/python/elan1_sdk/types.py (RunStatus)
//   · K8 reads are ctx-scoped — "an operator only ever queries its own
//     tenant" ........................................................... sdk/python/elan1_sdk/client.py (TelemetrySurface)
//
//   MCP — BOTH DIRECTIONS
//   · consuming: a real JSON-RPC/stdio MCP client, adapted onto the
//     fabric Connector interface ........................................ core/elan1_core/mcp_client.py (ADR-0131)
//   · the fail-safe: for an UNKNOWN server a tool is consequential
//     UNLESS its name marks it a read ................................... core/elan1_core/mcp_client.py (_READ_HINTS comment)
//   · exposing: scope-gated tools/list + tools/call, consequential tool
//     blocked without a K5 approval ..................................... core/elan1_core/mcp_server.py (ADR-0177)
//   · the wire: JSON-RPC 2.0 + the initialize handshake + a
//     newline-delimited stdio loop ...................................... core/elan1_core/mcp_transport.py (ADR-0184)
//   · the agent catalog as an MCP tool manifest with a governance
//     overlay per tool; a gated call returns awaiting_approval .......... apps/enterprise1/enterprise1/mcp_server.py (ADR-0087),
//                                                                         apps/enterprise1/enterprise1/routers/mcp.py
//   · the manifest's autonomy overlay is tenant-scoped — "an external MCP
//     client must never be told an agent is L4 because a DIFFERENT
//     customer promoted it" ............................................. apps/enterprise1/enterprise1/mcp_server.py (ADR-0780)
//
//   THE SEAM ITSELF (do NOT restate the catalog — content/connectors.ts owns it)
//   · declared ops ARE the grantable scopes ............................. core/elan1_core/connectors.py
//   · credential refs `secret://<connector-id>`, unsealed only at the tool
//     boundary, only under their own connector's id, only AFTER the scope
//     check; error text scrubbed ........................................ core/elan1_core/connectors.py (_resolve_secrets, _redact)
//   · a connector as a typed manifest, sandbox-validated before publish .. core/elan1_core/connector_manifest.py (ADR-0126)
//
//   PROGRAMMATIC ACCESS
//   · gateway pipeline: authenticate → negotiate version → rate-limit →
//     registered operation → scope-check → /sdk handler → projection,
//     audited as `api.request` .......................................... core/elan1_core/api_gateway.py (ADR-0167)
//   · a key can only NARROW its issuing principal's grant ............... core/elan1_core/identity.py, apikeys.py (ADR-0474)
//   · signed outbound events: HMAC-SHA256 over a canonical body, header
//     `X-Elan1-Signature`, retried, then dead-lettered ................... core/elan1_core/webhooks.py (ADR-0168)
//   · sandbox tenants flag their events `sandbox: true` ................. core/elan1_core/webhooks.py (SandboxRegistry)
//
//   HONEST BOUNDARIES — the reason half of this file reads `preview`
//   · "No production endpoint … actually authenticates a real inbound
//     request via a presented API-key secret today (all live routes
//     resolve CoreContext from a bearer token)" ......................... docs/adr/ADR-0474 (Context)
//   · the webhook transport is a port; "a real HTTP client is the Wave-2
//     drop-in"; the subscription + dead-letter store is in-memory ....... core/elan1_core/webhooks.py, ADR-0168 (Deferred)
//   · client libraries are METHOD STUBS derived from the catalog, not a
//     generated, published package ...................................... core/elan1_core/api_gateway.py (client_methods), ADR-0168 (Deferred)
//   · the dev-portal payload is served inside the admin console from a
//     throwaway registry holding two SAMPLE operations
//     (get_contact / create_lead) ....................................... apps/enterprise1/enterprise1/routers/onboarding.py
//   · "a hosted dev-portal web surface" is named as deferred ............ docs/adr/ADR-0168 (Deferred)
//
// WHAT THIS FILE MUST NEVER DO:
//   · never name a customer, a design partner, or a developer count — there are none to name;
//   · never claim a certification — none is held (Trust.tsx states the posture; match it, never
//     strengthen it);
//   · never quote a latency, a throughput, an uptime or a saving — nothing has been measured in a
//     customer environment;
//   · never hand-type a platform count — import factValue() from platform-facts.ts;
//   · never emit an href to a domain, a repository, a package index or a docs site. If the artefact
//     does not exist, the row says so and renders as plain text.

import { factValue } from "./platform-facts";

/** What a developer can do with a surface today, from this site. See the header. */
export type DevStatus = "available" | "preview" | "planned";

export interface DevSurface {
  /** Stable id. Rows whose id starts `k` are the eight core surfaces. */
  id: string;
  /** The surface's name, as the platform names it. */
  name: string;
  /** What it actually is — the mechanism, not the benefit. */
  what: string;
  /** What a reader can do with it today. */
  status: DevStatus;
  /**
   * A route ON THIS SITE that documents it. Only ever read through `devHref()`, which drops it
   * unless the row is `available` AND the route is in LINKABLE_ROUTES.
   */
  href?: string;
  /** The limit, the caveat, or where the reference lives. Rendered beside the row, never hidden. */
  note?: string;
}

/** The single sentence used wherever an artefact is not published yet. One string, so it cannot drift. */
export const PREVIEW_NOTE = "Reference docs ship with the developer preview.";

/**
 * Every route this module is permitted to link to.
 *
 * DERIVED BY READING src/App.tsx ON 2026-08-11 — each entry below is a `<Route path=…>` that exists
 * in the router today. This is the second gate: a row can be marked `available` by mistake, but it
 * still cannot emit a link to a route the site does not serve. If you add a row, add its route here
 * only after confirming the route renders.
 */
const LINKABLE_ROUTES: ReadonlySet<string> = new Set([
  "/platform",
  "/platform/connectors",
  "/platform/engineering",
  "/platform/governance",
  "/platform/enterprise1",
  "/platform/assistant1",
  "/platform/built-on-claude",
  "/platform/verticals-are-config",
  "/trust",
  "/resources",
  "/resources/proof",
  "/pricing",
  "/get-started",
  "/demo",
]);

/**
 * THE ONLY WAY A LINK LEAVES THIS MODULE.
 *
 * Returns a route only when the surface is `available` and the route is one this site serves.
 * Anything else returns undefined and the page renders plain text with a status chip. A page that
 * reads `s.href` directly has bypassed the guard — do not do that.
 */
export function devHref(s: DevSurface): string | undefined {
  if (s.status !== "available") return undefined;
  if (!s.href) return undefined;
  return LINKABLE_ROUTES.has(s.href) ? s.href : undefined;
}

/** Chip labels. `available` deliberately says where you can read it, not that it is "GA". */
export const DEV_STATUS_LABEL: Record<DevStatus, string> = {
  available: "documented here",
  preview: "developer preview",
  planned: "not built",
};

/** One line explaining each chip, for a title attribute — so a chip is never a bare word. */
export const DEV_STATUS_MEANING: Record<DevStatus, string> = {
  available:
    "Documented on a page of this site that exists today. The link goes to that page and nowhere else.",
  preview:
    "Real in the platform build these claims were checked against, but there is no self-serve access and no published reference. Both ship with the developer preview.",
  planned:
    "Named and scoped in the platform's own decision record, and not built. We would rather say that than link you to something that is not there.",
};

/**
 * The developer surface — the eight core surfaces (ids `k1`…`k8`) and the things you build WITH.
 * One list, so a status can never disagree with itself across two lists. The page splits it with the
 * derived exports below.
 */
export const DEV_SURFACES: DevSurface[] = [
  // ——— The eight core surfaces (K1–K8). The contract every app and every pack builds against. ———
  {
    id: "k1",
    name: "K1 · identity",
    what:
      "One call turns a bearer token into a context: tenant, principal, roles, app, request id and region. Tenant is the hard isolation boundary — every core call executes inside one, and the isolation is enforced in the database by row-level security rather than trusted to application code.",
    status: "available",
    href: "/platform/engineering",
    note:
      "An API key issued against this surface can only ever narrow what its issuing principal could already do. It is a ceiling, never a widening.",
  },
  {
    id: "k2",
    name: "K2 · runtime",
    what:
      "The agent runtime, with two entry points: run and resume. A spec goes in, a result comes out, and the result's status is one of four values — completed, awaiting_approval, rejected, error. A human gate is a value in the response you resume against later, not an exception to catch.",
    status: "available",
    href: "/platform/built-on-claude",
    note:
      "That four-value status is why a governed write is straightforward to integrate: your code branches on awaiting_approval instead of discovering the gate through a failure.",
  },
  {
    id: "k3",
    name: "K3 · connectors",
    what:
      "The MCP connector fabric. Code asks for a connector and receives a scoped handle bound to its tenant and its grant — never the raw connector. The call re-checks the scope, unseals only credentials belonging to that connector, evaluates policy on a consequential op, and writes the op and its argument keys to the audit chain.",
    status: "available",
    href: "/platform/connectors",
    note: `${factValue("connectors")} connectors are registered and callable on the fabric. Registered is not the same as connected — the connectors page names which ones default to a modelled adapter.`,
  },
  {
    id: "k4",
    name: "K4 · skills",
    what:
      "A registry with three calls — publish, resolve, list. A rule, a tone or a process is published once and resolved by any app by id and version, instead of being forked into each one. There are currently " +
      factValue("skills") +
      " reusable skills across the platform.",
    status: "available",
    href: "/platform/built-on-claude",
    note: `The publish/resolve/list signatures are part of the versioned contract. ${PREVIEW_NOTE}`,
  },
  {
    id: "k5",
    name: "K5 · approvals",
    what:
      "The human-in-the-loop gate: request, resolve, pending. This is the surface a consequential action stops at — and the reason an integration cannot become a quiet path around a control your finance or security team already enforces.",
    status: "available",
    href: "/platform/governance",
    note:
      "Maker is not checker: on an approval tagged for separation of duties, the person who raised it cannot resolve it, and an administrator does not bypass that.",
  },
  {
    id: "k6",
    name: "K6 · audit",
    what:
      "An append-only, per-tenant hash chain, with two calls: trail and verify. Verify recomputes the chain rather than reading a stored verdict. Updates and deletes are blocked by a database trigger, and a uniqueness constraint on the previous hash means the chain cannot fork.",
    status: "available",
    href: "/platform/governance",
    note:
      "Connector calls record the op name and the argument KEYS, never the argument values — because those args carry PII and the chain cannot be edited afterwards.",
  },
  {
    id: "k7",
    name: "K7 · governance (assure1)",
    what:
      "Policy evaluation and Trust Marks. A policy is evaluated before a terminal action, and a Trust Mark cannot be recorded without naming the evidence that authorised it — no eval, no mark. There are " +
      factValue("governanceSignatures") +
      " governance signatures across the verticals, the suite apps and the control-plane surfaces.",
    status: "available",
    href: "/platform/governance",
    note:
      "A mark can also be withdrawn. The certified set is re-read from the durable store rather than latched in memory, so a revocation propagates instead of surviving in a stale copy.",
  },
  {
    id: "k8",
    name: "K8 · telemetry (run1)",
    what:
      "Metering and the operations read surface: meter a unit of usage, then read runs, cost and reliability back. Every one of those reads carries the calling context, so an operator only ever queries its own tenant — the scoping is in the signature, not in a filter someone has to remember.",
    status: "available",
    href: "/platform/engineering",
    note:
      "Cost is metered per tenant and per app from a rate card. We publish no benchmark figure from it, because nothing here has been measured in a customer environment.",
  },

  // ——— What you build with. ———
  {
    id: "sdk-contract",
    name: "The /sdk contract",
    what:
      "The eight surfaces above, expressed as typed protocols — the one coupling point between an app and the core. It is deliberately implementation-free: pure types, no runtime dependencies of its own. Versioned 1.0.0, and breaking a signature is a major version bump with a recorded decision and a migration note, not a quiet change.",
    status: "preview",
    note: `Python-first, with a TypeScript mirror for frontends. Neither is published to a public package index today — the TypeScript manifest is marked private. An installable client, and its reference, ship with the developer preview.`,
  },
  {
    id: "mcp-fabric",
    name: "The MCP connector fabric",
    what:
      "One uniform, audited, least-privilege way to reach a system — including a real MCP client that speaks JSON-RPC over stdio to an external MCP server and adapts its tools onto the same fabric interface as everything else. Adding a system means adding a connector, never bespoke integration code.",
    status: "available",
    href: "/platform/connectors",
    note:
      "The whole catalog, with the state of each tier and the limits named, lives on that page. This page does not restate it.",
  },
  {
    id: "mcp-server",
    name: "elan1 exposed as an MCP server",
    what:
      "The inverse direction, and the part most platforms skip. The core ships a scope-gated MCP server speaking tools/list and tools/call over JSON-RPC 2.0, with the initialize handshake and a newline-delimited stdio loop. The control plane separately publishes its governed agent catalog as an MCP tool manifest, where every tool carries its autonomy level, whether it requires approval, and its approval tier.",
    status: "preview",
    note: `Reaching either one needs a tenant and a bearer token; there is no public endpoint. ${PREVIEW_NOTE}`,
  },
  {
    id: "byo-connector",
    name: "Bring your own connector",
    what:
      "Declare a connector as a typed manifest — an id shaped mcp.<slug>, a category, and each operation with its typed arguments and whether it is consequential. A deterministic sandbox adapter validates arguments against that manifest before anything is published, so the manifest is provably coherent while it is still offline. Certification is then eval-gated, fingerprinted by a content hash, and revoked on drift.",
    status: "available",
    href: "/platform/connectors",
    note:
      "Declaring the operations is what makes the scopes exist. There is no ambient access to declare — a connector cannot expose a capability it did not name.",
  },
  {
    id: "api-gateway",
    name: "The programmatic front door",
    what:
      "A single gateway with a fixed pipeline: authenticate the key, negotiate the API version, apply the rate limit, look up an explicitly registered operation, check the key's scope against it, call the /sdk surface, and optionally project just the fields asked for. Every call is audited. The registered operations are a deliberate allow-list, so the public surface is a decision rather than the whole core.",
    status: "preview",
    note:
      "Built and verified in the platform's own suite. In the build these claims were checked against, no live route authenticates a presented API key — every live route resolves identity from a bearer token instead. Key-authenticated access ships with the developer preview.",
  },
  {
    id: "webhooks",
    name: "Signed outbound events",
    what:
      "Subscribe a URL to specific event types and the platform calls out: a canonical body signed with HMAC-SHA256 under that subscription's own secret, delivered on an X-Elan1-Signature header so the receiver can verify it came from elan1, retried on transient failure, and dead-lettered when the attempts are exhausted. Tenant-scoped and audited on both subscribe and publish.",
    status: "preview",
    note:
      "The delivery transport is a port, which is why the signature and the retry behaviour are provable without a network. The HTTP deliverer, exponential backoff, and a durable subscription and dead-letter store are the drop-in, not the shipped default.",
  },
  {
    id: "sandbox",
    name: "A sandbox tenant",
    what:
      "A tenant marked as non-production. Its outbound events carry a sandbox flag, so a receiver you are building can drop test traffic on sight rather than distinguishing it by convention.",
    status: "preview",
    note: `The registry exists in the platform. A sandbox you can sign yourself up for — and its data reset behaviour — ships with the developer preview.`,
  },
  {
    id: "client-libs",
    name: "Generated client libraries",
    what:
      "Typed method stubs are derived from the operation catalog today — the names, the required scopes and the arguments come from the registry rather than being written by hand, which is the seed a generator needs. A generated, published client package for Python or TypeScript is not built.",
    status: "planned",
    note:
      "Named as deferred in the platform's own decision record. We list it rather than let its absence be inferred.",
  },
  {
    id: "dev-portal",
    name: "A hosted developer portal",
    what:
      "The platform can already describe itself: a machine-readable payload of registered operations, event types and served versions, plus the method stubs derived from it. Today that payload is served inside the administration console, and the instance behind it is a demonstration registry holding two sample operations — not the live public operation catalog.",
    status: "planned",
    note:
      "A hosted developer portal on the public web is named as deferred, and is not built. There is no documentation domain to link to, and we will not invent one.",
  },
];

/** The eight core surfaces, DERIVED — never a second hand-typed list that can disagree with the first. */
export const CORE_SURFACES: DevSurface[] = DEV_SURFACES.filter((s) => /^k[1-8]$/.test(s.id));

/** Everything you build WITH, derived as the complement. Add a row above and it lands in exactly one. */
export const BUILD_SURFACES: DevSurface[] = DEV_SURFACES.filter((s) => !/^k[1-8]$/.test(s.id));

/** How many rows carry each status — computed, so the page can never quote a stale tally. */
export const DEV_STATUS_COUNTS: Record<DevStatus, number> = DEV_SURFACES.reduce(
  (acc, s) => ({ ...acc, [s.status]: acc[s.status] + 1 }),
  { available: 0, preview: 0, planned: 0 } as Record<DevStatus, number>,
);

export interface McpPoint {
  title: string;
  body: string;
  /** The platform's own refusal or reference string, quoted verbatim with placeholders. */
  quote?: string;
}

/**
 * MCP_STORY — why MCP-native is a governance claim, not an integration claim.
 *
 * The industry reads "MCP-native" as "we can reach more tools". The interesting property is the
 * opposite one: because a connector must be DECLARED before it exists, and its declared operations
 * ARE its grantable scopes, the seam is typed and least-privilege by construction — and because a
 * credential is a reference that is unsealed at the tool boundary, it is credential-gated and never
 * pre-connected. That is what makes a write path governable rather than merely reachable.
 */
export const MCP_STORY: {
  kicker: string;
  headline: string;
  lede: string;
  points: McpPoint[];
  limit: string;
} = {
  kicker: "MCP-native, in both directions",
  headline: "The protocol is the integration story. The seam is the governance story.",
  lede:
    "elan1 consumes external MCP servers through one fabric, and publishes its own governed operations back out as MCP tools. Both directions cross the same envelope — a scoped grant, a policy check on anything consequential, a human approval before a write, and a hash-chained audit entry. Which is the point: an agent reaching your systems over MCP inherits your controls instead of routing around them.",
  points: [
    {
      title: "A connector is a declaration before it is a connection",
      body:
        "A connector joins the fabric with an MCP-style schema: its id, its category, and each operation with its typed arguments. Declaring those operations is what makes its scopes exist. There is no ambient access to grant, and no capability a connector did not name — which is why a least-privilege grant is a subset of a published list rather than a promise in a policy document.",
    },
    {
      title: "Least privilege is the same object as the schema",
      body:
        "A connector's grantable scopes are exactly its declared operations. On the governed path, asking for a scope the connector does not expose is refused by the scope lattice before any credential is involved — so over-granting is a shape error, caught early, rather than a configuration mistake discovered later.",
      quote: "connector '<id>' does not expose ops [...]",
    },
    {
      title: "Credential-gated, and never pre-connected",
      body:
        "An agent, a prompt or a stored connector setting carries a reference, never a credential. The real value is unsealed at the tool boundary for the duration of one call, only under its own connector's id, and only AFTER the scope check — so a denial cannot be turned into a way to read a secret. Any value the call did unseal is scrubbed from error text before it reaches the log or the caller. Nothing is switched on for you: a connection is credentials plus an approved, audited grant.",
      quote: "secret://<connector-id>",
    },
    {
      title: "A write over MCP is still a write",
      body:
        "When an external client calls a consequential tool on elan1 — a write, a send, money — it does not execute. It comes back as an error result requiring approval, and the client cannot self-approve over the wire. A caller also only sees the tools its grant covers: a tool it cannot call, it cannot discover.",
      quote: "'<tool>' is consequential — requires human approval (K5).",
    },
    {
      title: "An unknown server is gated by default, not trusted by default",
      body:
        "Going the other way, the platform cannot trust a third-party server's write-list to be complete. So a tool from an unknown MCP server is treated as consequential UNLESS its name clearly marks it a read. The classification is deliberately biased: a miss over-gates and asks a human, and never resolves into an autonomous write.",
    },
    {
      title: "Governance travels with the tool, per tenant",
      body:
        "When the governed agent catalog is published as an MCP manifest, each tool carries its autonomy level, whether it requires approval, and its approval tier — and that overlay is scoped to the tenant doing the discovering. One customer promoting an agent to a higher autonomy level does not change what a different customer's client is told about it.",
    },
  ],
  limit:
    "Said precisely: the transport, the handshake, tool discovery and tool calls are real, and so is the governance envelope around them. What makes any single connector 'live' is pointing it at an actual server and supplying credentials. Several fabric connectors ship a modelled adapter and reach an external system only once an endpoint is configured — the connectors page names which ones.",
};

/**
 * DEV_STATUS_NOTE — the paragraph a developer deserves before they spend an hour looking for
 * something that is not there. TODAY versus the developer preview, in one honest pass.
 */
export const DEV_STATUS_NOTE =
  "What a developer can do today is read the mechanism. The connector fabric, the governance envelope, the enterprise-readiness answers and the security posture are each documented on this site, with the limits named beside the claims rather than after the contract. What a developer cannot do today is self-serve. There is no public package to install — the contract is versioned and stable, but neither the Python client nor its TypeScript mirror is published to a package index. There is no documentation domain, no API reference and no public repository, so this page links to none of them. And in the build these claims were checked against, no live route authenticates a presented API key: the gateway that issues, scopes, version-negotiates and rate-limits keys is built and verified in the platform's own test suite, while every live route resolves identity from a bearer token instead. The signed webhook hub is real code behind a transport port; the HTTP deliverer and a durable subscription store are the drop-in, not the shipped default. Client libraries exist as method stubs derived from the operation catalog, not as published packages. All of that — keys, a sandbox, an installable client and the reference docs — is what the developer preview is for. We would rather you learn it here, in ninety seconds, than in week three of an integration.";

/** What this page refuses to imply. Each line is a real limit in the build the claims were checked against. */
export const DEV_BOUNDARIES: string[] = [
  "There is no public documentation site, API reference, package or repository to link to today. Where a row on this page is not clickable, that is the reason — not an oversight.",
  "The /sdk contract is versioned 1.0.0 and stable, but it is not distributed: the TypeScript mirror is marked private and neither package is published to an index.",
  "No live route authenticates a presented API key. The gateway, the key registry, version negotiation, scope narrowing and rate limiting are built and verified; the public key-authenticated door is not open.",
  "The webhook hub signs, retries and dead-letters through a transport port. The real HTTP deliverer, exponential backoff and a durable subscription store are named as deferred.",
  "The developer portal payload is served inside the administration console, from a demonstration registry holding two sample operations. A hosted public portal is not built.",
  "Client libraries are typed method stubs derived from the operation catalog. A generated, published client package is not built.",
  "Registered and callable is not the same as connected. Several fabric connectors default to a modelled adapter and reach an external system only once an endpoint is configured.",
  "No performance, latency, throughput or uptime figure appears on this page, because none has been measured in a customer environment.",
];

/**
 * The stat strip. Every platform census figure comes from platform-facts.ts; the contract's arity is
 * DERIVED from CORE_SURFACES above rather than typed, so adding or removing a surface moves the
 * number on the page in the same edit. Nothing here is hand-typed.
 */
export const DEV_STATS: { value: string; label: string }[] = [
  { value: String(CORE_SURFACES.length), label: "core surfaces in the contract" },
  { value: factValue("connectors"), label: "connectors registered and callable" },
  { value: factValue("agentsRegistered"), label: "agents registered" },
  { value: factValue("skills"), label: "reusable skills" },
];

export const DEVELOPERS_SEO = {
  title: "Developers — MCP-native, contract-first | elan1",
  description:
    "How you build on elan1: one typed contract across eight core surfaces, an MCP connector fabric that consumes external MCP servers, and elan1 published back out as a governed MCP server where a consequential tool call returns an approval requirement instead of executing.",
};
