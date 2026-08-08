// content/connectors.ts — the honest connector surface (K3, the MCP connector fabric).
//
// The site used to say "via MCP connectors" and stop there. This module replaces that one line with
// the real three-tier surface, and labels each tier for what it actually is today.
//
// 🚨 EVERY CLAIM BELOW IS TRACEABLE TO PLATFORM CODE. Sources, so a future edit can re-check rather
// than guess. Paths are relative to the elan1-platform repo.
//
//   TIER 1 — registered and callable
//   · the fabric + registry + scoped resolve + audit-every-call ......... core/elan1_core/connectors.py
//   · the 14 shared fabric connectors (FABRIC_CONNECTORS) .............. core/elan1_core/fabric_connectors.py
//   · the count (32 registered · 275 declared ops) ..................... VERIFIED BY EXECUTION, 2026-08-08:
//       built the registry the way apps/enterprise1/enterprise1/server.py does
//       (build_default_services → register_fabric → register_health_connectors,
//        register_commerce_connectors, register_marketplace_connector, register_project_connectors,
//        register_eprocurement_connector, register_wms_connector, register_assistant_channels),
//       then counted registry.connectors() excluding the Phase-0 `mcp.demo`.
//       Corroborated by docs/adr/ADR-0712 ("32 registered connectors") and
//       docs/agentic-erp-sizing-benchmark-2026-08-03.md ("275 exposed (32 connectors)").
//   · native CRM + channel connectors registered in the container ...... core/elan1_core/container.py:360, :424
//   · "modelled adapter by default, live when configured" .............. apps/enterprise1/enterprise1/server.py:25182-25228
//       (fhir_base_url · payment_gateway_base_url · marketplace_base_url · project_connector_base_url ·
//        eprocurement_base_url · wms_base_url), core/elan1_core/project_connectors.py (SoRProjectOpsGateway)
//   · mcp.web is a deterministic mock reference connector .............. core/elan1_core/connectors.py (WebConnector)
//   · assistant channels: "modelled `send` by default (no live external
//     dispatch in this build)" ......................................... apps/enterprise1/enterprise1/server.py:25226
//
//   TIER 2 — credential-gated catalog (declared seams)
//   · the 18-entry curated SaaS library, status "available",
//     "connect = credentials + an audited grant (operator step)" ....... apps/enterprise1/enterprise1/connector_catalog.py
//   · SoR connectors — Salesforce · SAP · Workday · ServiceNow ·
//     NetSuite; canonical↔native field mapping; FakeSorTransport for
//     offline verification, HttpSorTransport is the cred-gated drop-in .. core/elan1_core/sor_connectors.py (SOR_SYSTEMS), ADR-0200
//   · data + collaboration — Snowflake · Databricks · JDBC (query);
//     S3 · SharePoint · O365 (object); Slack · Teams · Jira (collab) ... core/elan1_core/data_connectors.py (DATA_SYSTEMS), ADR-0201
//   · reached today through the enterprise1 wave-2 router, NOT part of
//     the 32 registered on the boot fabric ............................. apps/enterprise1/enterprise1/routers/wave2.py:26,41
//
//   TIER 3 — MCP servers and the MCP registry
//   · MCP-registry bridge: curated snapshot (37 entries · 13 categories,
//     counted by import 2026-08-08) + governed `install` that records a
//     least-privilege audited grant (`connector.mcp.install`) .......... apps/enterprise1/enterprise1/mcp_registry.py, ADR-0090
//   · the honest boundary, quoted from that module's own docstring ..... apps/enterprise1/enterprise1/mcp_registry.py (docstring)
//   · MCP servers attachable as tool sources (4: filesystem · GitHub ·
//     Postgres · Brave Search) ......................................... apps/enterprise1/enterprise1/connector_catalog.py (MCP_SERVERS)
//   · elan1 exposed AS a governed MCP server; consequential tool over
//     the wire returns an error requiring approval ..................... core/elan1_core/mcp_server.py (ADR-0177),
//                                                                        core/elan1_core/mcp_transport.py (ADR-0184)
//   · bring-your-own connector as a typed manifest, sandbox-tested ..... core/elan1_core/connector_manifest.py (ADR-0126)
//   · eval-gated certification, drift auto-revoke, content hash ........ core/elan1_core/connector_lifecycle.py (ADR-0307)
//
//   GOVERNANCE
//   · a grant is a K5 human approval; revoke/disconnect are immediate .. apps/enterprise1/enterprise1/server.py:19776-19792
//   · scope lattice refuses an op the connector does not expose ........ core/elan1_core/connector_lifecycle.py:311-322
//   · call-time scope check + block audit + refusal text ............... core/elan1_core/connectors.py (_ScopedConnector.call)
//   · danger-verb classifier (_DANGER_VERBS, _looks_dangerous,
//     op_is_consequential) AND its stated gap ......................... core/elan1_core/connectors.py:66-175
//   · K7 backstop on consequential ops for every caller ................ core/elan1_core/connectors.py (_ScopedConnector.call)
//   · credential refs: `secret://<connector-id>`, unsealed only at the
//     tool boundary, only under their own connector's id, only AFTER
//     the scope check; errors scrubbed to `[redacted-credential]` ...... core/elan1_core/connectors.py (_resolve_secrets, _redact)
//   · the audit records op + arg KEYS, never arg values ................ core/elan1_core/connectors.py (data-minimization note)
//   · Trust Mark requires `attested_by` ("No eval, no Trust Mark") ..... core/elan1_core/connectors.py (ConnectorCatalog.certify), ADR-0792
//
//   HONEST BOUNDARIES
//   · 0 certified connectors in the verified build .................... docs/build-log.md:13954 (live spine panel)
//   · 18 of 32 registered connectors bound as agent tools; 14 reachable
//     by API but bound by no agent ..................................... docs/elan1-tech-census-2026-08-03.md:80-83
//   · 18 of 33 seed grants hold an op the connector does not expose —
//     surfaced by the curator, deliberately NOT mark-gating ............ docs/adr/ADR-0712 ("the three honest bends", #3)
//
// Do NOT add a capability here without a comparable reference. And do NOT promote a tier-2 or tier-3
// entry into tier-1 language: "typed, governed seam with credential-gated transport" is the ceiling
// for anything that has not been registered on the fabric.

export interface ConnectorTier {
  /** Short tier id used as the mono label. */
  id: string;
  /** The tier's name. */
  name: string;
  /** The one-line honest status. Never implies a switch is already on. */
  status: string;
  /** What this tier actually is. */
  body: string;
  /** Named seams inside the tier, grouped. */
  groups: { label: string; items: string[] }[];
  /** The limit that a reader would otherwise assume away. */
  caveat: string;
}

export interface ConnectorGuard {
  title: string;
  description: string;
  /** The platform's own refusal or guard language, quoted. */
  quote?: string;
}

/** The three tiers, in the order the page presents them. */
export const CONNECTOR_TIERS: ConnectorTier[] = [
  {
    id: "tier 1",
    name: "Registered and callable",
    status: "32 connectors on the fabric · 275 declared ops",
    body:
      "These are the connectors the agent runtime can actually invoke. Each one is registered on the K3 fabric, so a call through the seam passes a scope check, a policy evaluation on a consequential op, and a hash-chained audit entry. A connector's declared ops are the scopes a grant is drawn from — the catalog publishes them as the same list.",
    groups: [
      {
        label: "Business systems",
        items: [
          "mcp.crm — the native CRM system of record",
          "mcp.erp · mcp.helpdesk · mcp.hris · mcp.pm · mcp.cms · mcp.bi",
          "mcp.inventory · mcp.supplier · mcp.commerce · mcp.marketplace",
          "mcp.wms · mcp.eprocurement · mcp.project_ops · mcp.payments",
        ],
      },
      {
        label: "Regulated and industry seams",
        items: [
          "mcp.fhir — health interop, with a live-endpoint path once a base URL is configured",
            "mcp.abdm · mcp.x12 — modelled seams: typed and governed, with no live gateway today",
          "mcp.kyc · mcp.core_banking — financial-services seams",
        ],
      },
      {
        label: "Channels and grounding",
        items: [
          "mcp.email · mcp.sms · mcp.whatsapp · mcp.voice · mcp.push · mcp.meet · mcp.calendar",
          "mcp.assistant.slack · mcp.assistant.teams · mcp.assistant.whatsapp",
          "mcp.kb — knowledge retrieval · mcp.web — a read-only reference connector",
        ],
      },
    ],
    caveat:
      "Registered and callable is not the same as live. Several of these ship a modelled adapter by default and reach an external endpoint only once one is configured — the FHIR, payment-gateway, marketplace, project-ops, e-procurement and WMS connectors each read a base-URL setting, and fall back to a deterministic modelled adapter when it is unset. The assistant channel connectors are modelled `send` in this build, with no live external dispatch. mcp.web is a deterministic mock. We name this because the governance is the same either way, and the connection is not.",
  },
  {
    id: "tier 2",
    name: "A credential-gated catalog",
    status: "Declared seams · nothing runs without credentials and a scoped grant",
    body:
      "A curated library of enterprise SaaS and data seams the platform knows how to speak to. Each entry declares, up front, exactly which ops a grant would allow. Connecting one is not a code change — it is supplying credentials and having an audited, approved grant recorded. Until both happen, the entry does nothing at all.",
    groups: [
      {
        label: "Systems of record",
        items: [
          "Salesforce · SAP · Workday · ServiceNow · NetSuite",
          "A canonical object and field model (account · contact · employee · incident · invoice) mapped onto each system's native naming — the translation is the point.",
        ],
      },
      {
        label: "Data and analytics",
        items: [
          "Snowflake · Databricks · JDBC — a query family",
          "Amazon S3 · SharePoint · Microsoft 365 — an object-store family",
        ],
      },
      {
        label: "Collaboration and work",
        items: [
          "Slack · Microsoft Teams · Jira — a collaboration family",
          "Gmail · Outlook / M365 Mail · Google Calendar · Google Drive · Notion",
        ],
      },
      {
        label: "Commercial SaaS",
        items: [
          "HubSpot · Zendesk · GitHub · Google Sheets",
          "Stripe · Razorpay — payment seams, scoped like any other",
        ],
      },
    ],
    caveat:
      "These are typed, governed seams with credential-gated transport. They are not live integrations, and none of them is switched on for you. Each family is verified offline against a real in-memory transport that carries genuine logic — a filtering query store, a key-to-bytes object store, a per-channel item log — so the mapping is provable before any account exists. The credential-gated drop-in is the per-system HTTP or SDK transport. Today these are reached through the enterprise1 wave-2 surface; they are not among the 32 registered on the boot fabric.",
  },
  {
    id: "tier 3",
    name: "MCP servers, and elan1 as one",
    status: "A curated registry snapshot · a governed install · a governed server",
    body:
      "Rather than hand-build integrations to chase a logo count, the platform bridges the MCP ecosystem — and publishes itself into it. Both directions carry the same envelope: a scoped grant, an audit entry, and a human approval before anything consequential happens.",
    groups: [
      {
        label: "The MCP registry bridge",
        items: [
          "A curated catalog of 37 well-known MCP servers across 13 categories, searchable and faceted.",
          "Installing one records a least-privilege, audited connector grant on the fabric — not an ungoverned tool.",
        ],
      },
      {
        label: "MCP servers as tool sources",
        items: [
          "Filesystem (stdio, scoped path) · GitHub (http) · Postgres (stdio, read-only over a DSN) · Brave Search (http)",
          "Attaching one uses the same least-privilege and audit envelope as the rest of the fabric.",
        ],
      },
      {
        label: "elan1 exposed as an MCP server",
        items: [
          "The platform speaks the MCP tools/list and tools/call shapes over JSON-RPC, with a newline-delimited stdio loop, so an external client can connect to elan1.",
          "A caller sees only the tools its grant covers. Read tools flow freely within scope; a consequential tool comes back as an error requiring approval and can never self-approve over the wire.",
        ],
      },
      {
        label: "Bring your own",
        items: [
          "Declare a connector as a typed manifest — id, category, and each op with its args and whether it is consequential — then test it against a deterministic sandbox that validates args before anything is published.",
          "Certification is eval-gated, fingerprinted by a content hash, and revoked on drift: a re-registered connector whose ops changed no longer matches its certification.",
        ],
      },
    ],
    caveat:
      "The registry bridge ships a curated snapshot plus a governed install path. A live registry fetch and the real per-server transport are not enabled — the platform's own docstring calls them \"a one-flip behind this same catalog shape.\" We would rather say that than let a screenshot of 37 logos imply otherwise.",
  },
];

/** The governance envelope every call crosses. This, not the logo list, is the product. */
export const CONNECTOR_GUARDS: ConnectorGuard[] = [
  {
    title: "A grant is an approval, not a setting",
    description:
      "Granting an app scoped access to a connector is a governed action that requires human approval — the platform's own summary for it is \"app gains scoped data/action access.\" Connecting a connector with a stored credential is separately approved. Revoking a grant or disconnecting a connector is immediate and ungated, because reducing access should never wait for a queue.",
  },
  {
    title: "Least privilege by construction",
    description:
      "A connector's grantable scopes are its declared ops. On the governed grant path, asking for a scope the connector does not expose is refused by the scope lattice before any credential is involved. A grant recorded outside that path can still hold a stale op, which is why the registry's own health review reports those grants rather than assuming they cannot exist.",
    quote: "connector '<id>' does not expose ops [...]",
  },
  {
    title: "The scope check happens at call time too",
    description:
      "Every call through the seam re-checks the grant. An ungranted op is refused and written to the audit log as a block, with the granted set recorded beside it — so a denial is evidence, not a silent no-op.",
    quote: "app '<app>' is not granted op '<op>' on connector '<connector>'",
  },
  {
    title: "The danger-verb classifier — stated precisely",
    description:
      "An op forces human approval if the connector declared it consequential, or if the leading verb of its snake_case name is in the platform's danger list — send, publish, pay, refund, capture, transfer, ship, delete, approve and their kin. This is deliberately keyed on the leading verb, so get_invoice and list_orders stay reads. Be clear about the corollary: an op whose name carries none of those verbs is not auto-gated. The platform names the ops this leaves out in its own source comment, and treats that as a known open item rather than a solved one.",
  },
  {
    title: "A policy backstop no caller can skip",
    description:
      "When an op classifies as consequential, the policy engine evaluates it inside the connector wrapper itself — for the agent runtime, for direct app code, and for a call arriving over MCP. A deny blocks the op there, so the check does not depend on a connector author remembering to add one.",
  },
  {
    title: "Credentials never travel as values",
    description:
      "An agent, a prompt or a stored connector setting carries a reference — secret://<connector-id> — and never the credential. The real value is unsealed at the tool boundary, for the duration of one call, and only under its own connector's id: a key stored for the payments connector cannot be resolved through an unrelated one. Unsealing happens after the scope check, so a denial cannot be turned into a way to read a secret.",
    quote: "credential '<name>' does not belong to connector '<connector>'",
  },
  {
    title: "The audit records keys, never values",
    description:
      "A call, a denial and an error through the fabric each land in the append-only, hash-chained audit log — with the op name and the argument keys, never the argument values, because connector args carry PII and secrets and the chain cannot be edited afterwards. Any credential the call did unseal is scrubbed out of error text before it reaches the log or the caller.",
    quote: "[redacted-credential]",
  },
  {
    title: "No eval, no Trust Mark",
    description:
      "Certifying a connector requires naming what authorised it — an eval id, an approval id, a lifecycle record. A mark with no provenance is refused outright, and a mark can be withdrawn: the certified set is re-read from the durable store rather than latched in memory, so a revocation propagates instead of surviving in a stale copy.",
  },
];

/** The four transitions a connector passes through before an agent can use it. */
export const CONNECTOR_SPINE: { step: string; name: string; body: string }[] = [
  {
    step: "01",
    name: "Register",
    body: "A connector joins the fabric with an MCP-style schema: its id, its category, and each op with its typed args. Declaring it is what makes its scopes exist — there is no ambient access to declare.",
  },
  {
    step: "02",
    name: "Grant",
    body: "An app is granted a scoped subset of that connector's ops. On the governed path the scope lattice refuses anything the connector does not expose, and the grant itself requires human approval. Where a durable store is configured, grants are written through to it, so least privilege survives a restart rather than resetting on every boot.",
  },
  {
    step: "03",
    name: "Resolve",
    body: "Code asking for a connector receives a scoped handle bound to the caller's tenant and grant — not the raw connector. A pass-through route that would let a caller name any op is deliberately handed a resolver that cannot unseal credentials at all.",
  },
  {
    step: "04",
    name: "Invoke",
    body: "The call re-checks the scope, unseals only credentials belonging to that connector, evaluates policy on a consequential op, and writes the op and its argument keys to the hash-chained audit log. A denial and an error are audited as carefully as a success.",
  },
];

/**
 * What we will not let this page imply. Every line here is a real limit in the build we verified,
 * stated in the platform's own terms.
 */
export const CONNECTOR_BOUNDARIES: string[] = [
  "Registered and callable does not mean connected. Several fabric connectors default to a modelled adapter and reach an external system only once an endpoint is configured.",
  "Nothing in the credential-gated catalog is switched on for you. Each entry needs credentials and an approved, scoped grant before it does anything.",
  "In the build recorded in the platform's own log, a live read of the registry reported zero certified connectors. Certification is eval-gated and earned per connector — it does not ship pre-granted.",
  "A census on 3 August 2026 found 18 of the 32 registered connectors bound as agent tools — the other 14 are reachable by API but bound by no agent today.",
  "The danger-verb classifier is not a blanket default-deny: an op whose name carries no recognised verb is not auto-gated, and the platform lists the ops this leaves out rather than implying the gap closed.",
  "The MCP registry bridge is a curated snapshot with a governed install. A live registry fetch and the real per-server transport are built-but-not-enabled.",
  "A least-privilege review of the seeded grants found 18 of 33 holding an op their connector does not expose. That is surfaced as a worklist item for a human, not quietly corrected.",
];

export const CONNECTORS_SEO = {
  title: "Connectors — the governed MCP seam | elan1",
  description:
    "How elan1 reaches your systems: 32 connectors registered and callable on the MCP fabric, a credential-gated catalog of enterprise SoR and data seams, and the MCP registry — each one a scoped grant, a policy check on consequential ops, and a hash-chained audit entry.",
};
