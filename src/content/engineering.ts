// content/engineering.ts — enterprise readiness: the procurement checklist, answered honestly.
//
// WHY THIS FILE EXISTS. A regulated buyer works a list: SSO, SCIM, tenant isolation, audit
// immutability, residency, retention, erasure, key management, API contract, DR, certification.
// The site was silent on almost all of it, which reads as "not built" — and the worse failure mode
// is the opposite: answering the list with confident prose the tree does not support. So every
// entry below carries a STATE (`enforced` / `declared` / `unwired`) and a source path, and the
// honest limits get their own section rather than being softened inside a capability line.
//
// 🚨 EVERY CLAIM BELOW IS TRACEABLE TO elan1-platform. Sources, so a future edit can re-check
// rather than guess (paths relative to the elan1-platform repo root):
//
//  IDENTITY & ACCESS
//   · OIDC/JWT verification against IdP JWKS (issuer·audience·expiry) ..... core/elan1_core/oidc.py
//   · a deploy refuses to boot on the stub verifier, on every branch ...... core/elan1_core/config.py
//     (Tier-4 P0-2 guard: `ELAN1_DEPLOY` set + `ELAN1_VERIFIER != "oidc"` ⇒ ConfigError)
//   · OIDC authorization-code + SAML federation behind one port .......... core/elan1_core/fed.py
//     ⚠️ only caller is the demonstration walk-through in
//        apps/enterprise1/enterprise1/routers/wave2.py, over FakeTokenExchanger / FakeSamlIdP ⇒ UNWIRED
//   · SCIM 2.0 /Users + /Groups, nested groups → inherited roles ......... core/elan1_core/scim.py
//     ⚠️ `build_scim_router` has NO caller outside core — the router is not mounted ⇒ UNWIRED
//   · RBAC over the registry scope lattice (exact ∨ ns:* ∨ *) ............ core/elan1_core/identity.py
//   · maker ≠ checker on a maker_checker-tagged approval; admin does NOT
//     bypass it ......................................................... core/elan1_core/approvals.py (~317, ~330)
//   · ReBAC relationship tuples + SoD engine ............................ core/elan1_core/authz.py
//     ⚠️ `AuthzEngine` has ZERO callers outside its own module ⇒ UNWIRED
//   · SDK keys: scoped, hashed at rest, shown once, masked in listings ... core/elan1_core/apikeys.py
//     (wired: apps/enterprise1/enterprise1/server.py ~1814; a key's scopes can only narrow a
//      principal's grant — `has_permission`, identity.py)
//
//  TENANT ISOLATION
//   · Postgres RLS + FORCE RLS on the `elan1.tenant_id` GUC .............. core/elan1_core/migrations/0001_identity_rls.sql,
//                                                                          0002_audit.sql, 0018_force_rls.sql
//   · per-request tenant contextvar; unbound ⇒ ContextNotBound ........... core/elan1_core/rls.py
//   · the GUC is set per transaction via set_config(..., local) .......... core/elan1_core/tenancy.py
//   · in-memory adapter proves cross-tenant denial with no DB ............ core/elan1_core/tenancy.py (InMemoryTenantStore)
//
//  EVIDENCE & AUDIT
//   · per-tenant sha256 hash chain; verify() recomputes .................. core/elan1_core/audit.py
//   · UPDATE/DELETE blocked by trigger `audit_events_no_mutate` .......... migrations/0002_audit.sql
//   · UNIQUE (tenant_id, prev_hash) — the chain cannot fork .............. migrations/0007_audit_nofork.sql
//   · signed, append-only re-baseline markers for declared damage ........ core/elan1_core/audit.py (Rebaseline)
//   · SIEM export in ECS JSON + CEF; e-discovery over the trail .......... core/elan1_core/siem_export.py, siem_ship.py
//     ⚠️ the only shipper caller is wave2.py over `FakeSiemTransport` ⇒ UNWIRED
//   · legal hold is consulted by the wired retention sweep .............. core/elan1_core/siem_export.py (LegalHold)
//     ⚠️ `place_hold` has no production caller — nothing places a hold today ⇒ DECLARED
//
//  DATA LIFECYCLE & PRIVACY
//   · retention schedule per data class; audit exempt (`None`) ........... core/elan1_core/retention.py
//   · the sweep now DELETES through each store's governed path ........... core/elan1_core/siem_export.py (RetentionEnforcer.enforce),
//                                                                          docs/adr/ADR-0828-*.md
//   · wired scope = CRM SoR types, one tenant per sweep .................. docs/adr/ADR-0828-*.md ("honest limits")
//   · DSR access / correction / erasure; erasure keeps the record shell .. core/elan1_core/dsr.py
//   · erasure floor = declared PII fields, ceiling = shape matcher ....... core/elan1_core/retention.py (ERASURE_PII_PATTERNS)
//
//  KEYS & SECRETS
//   · agents hold `secret://<name>`; reveal only at the tool boundary .... core/elan1_core/vault.py
//   · tenant-scoped remote vault paths + reason-required break-glass ..... core/elan1_core/vault_remote.py
//   · durable backend: AES-256-GCM sealed into the governed KV, RLS ...... core/elan1_core/vault_kv.py
//   · envelope encryption, per-tenant master key, tenant bound as AAD .... core/elan1_core/crypto.py
//   · cloud KMS / HashiCorp Transit behind a port (cred-gated drop-in) ... core/elan1_core/kms_cloud.py
//
//  API CONTRACT
//   · /api/v1 rewrite + X-API-Version header (not on an unhandled 500) ... core/elan1_core/versioning.py
//   · RFC 8594 Deprecation/Sunset/Link, keyed by route template .......... core/elan1_core/api_deprecation.py
//   · wire-level `Idempotency-Key` honoured at the governed chokepoint ... core/elan1_core/governed_action.py
//   · body-size cap + per-principal rate limit, separate anon budget ..... core/elan1_core/http_limits.py
//   · one error envelope; a governance refusal returns 403, not 500 ...... core/elan1_core/errors.py
//   · public gateway: key auth → version → scope → rate limit → dispatch . core/elan1_core/api_gateway.py
//
//  OPERATIONS & RESILIENCE
//   · backup manifest + restore integrity, RPO/RTO drill, status page .... core/elan1_core/dr.py
//   · primary/replica routing with read-after-write pinning ............. core/elan1_core/ha.py
//   · SLO error budgets, on-call escalation, per-tenant quota ............ core/elan1_core/sre.py
//     ⚠️ all three: the only callers are the read-only console surfaces in
//        apps/enterprise1/enterprise1/routers/wave2.py — no request path routes through them ⇒ DECLARED
//   · OpenTelemetry spans + per-tenant cost metering from a rate card .... core/elan1_core/telemetry.py
//   · scheduled jobs as manifests (reverify · retention · autoscaling) ... infra/ops/
//   ⚠️ DELIBERATELY ABSENT: the incident kill-switch on the SoR write path.
//      `register_sor_write_policies(governance, rollout)` (core/elan1_core/sor_write.py:58) has no
//      caller in the main tree, and its own docstring says that with `rollout` absent the clause
//      "simply cannot fire". Do not put it on the page until a caller exists.
//
//  ASSURANCE
//   · adversarial battery: paraphrase/obfuscation + false-positive rate .. core/elan1_core/adversarial.py
//     (WIRED and a certification GATE, not a report — apps/enterprise1/enterprise1/server.py ~2875,
//      ~8804, ~8846: a vertical Trust Mark is issued only if its safety dimension survives)
//   · egress DLP + red-team harness ..................................... core/elan1_core/redteam.py
//     ⚠️ `redteam` has ZERO importers outside its own module and tests ⇒ UNWIRED
//   · drift sweep re-verifies certified entities; a mark auto-revokes .... core/elan1_core/drift_monitor.py
//     (WIRED: apps/enterprise1/enterprise1/routers/evals.py ~115 + infra/ops/governance-reverify-cron.yaml)
//   · per-tenant model + tool allow-lists (opt-in; default unrestricted) . core/elan1_core/security.py
//   · control→evidence compliance packs, continuously re-run ............. core/elan1_core/compliance.py
//     (WIRED: /api/trust/profile in apps/enterprise1/enterprise1/server.py ~2893)
//   · SOC 2 / ISO readiness + gap analysis + auditor PBC workflow ........ core/elan1_core/certification.py
//     ⚠️ only caller is the wave2.py console surface ⇒ DECLARED
//   · IR runbook (roles · SEV ladder · lifecycle) + drill log ............ docs/compliance/incident-response.md,
//                                                                          docs/compliance/ir-drill-log.md
//
//  THE HONEST LIMITS (see ENGINEERING_LIMITS below)
//   · residency: `declared: true, enforced: false` on the wire ........... apps/enterprise1/enterprise1/server.py
//     (`_residency_posture`) + apps/enterprise1/tests/test_adr0818_trust_surface.py
//   · certification not held ............................................ docs/compliance/README.md
//     ("TC2 / TC3 / TC4 — abroad frameworks (UNDERWAY, not certified)")
//   · Postgres/RLS + Redis run as a separate integration job; the default
//     suite uses in-memory adapters ..................................... .github/workflows/ci.yml
//     (job "integration (postgres + redis — RLS / idempotency)"), core/elan1_core/tenancy.py
//   · webhook transport is a port; only `CollectingDeliverer` in the tree  core/elan1_core/webhooks.py
//   · no route is deprecated today ...................................... core/elan1_core/api_deprecation.py
//   · third-party pen-test log holds no findings yet .................... docs/compliance/pen-test.md
//   · single-region, single-primary today ............................... apps/enterprise1/enterprise1/server.py
//     ("elan1 also runs single-region today, so there is no peer region a request could be served from")
//
// 🔎 HOW THE `unwired` LABELS WERE DERIVED (re-run this before editing any state):
//     grep -rn "<Symbol>" --include="*.py" apps/ core/elan1_core/ | grep -v "/tests/"
//   A symbol whose only hits are its own module, a test, or a read-only console surface in
//   apps/enterprise1/enterprise1/routers/wave2.py is NOT enforced. That router's own comments call
//   its handlers a "REPRESENTATIVE ... walk-through" over fabricated inputs — it is a demonstration,
//   and a demonstration is not a production caller.
//
// Do NOT add an entry here without a comparable reference, and do NOT promote an entry from
// `declared` or `unwired` to `enforced` without a production caller you can point at.

/** Which of the three honest states a control is in. The page renders the label; nothing is implied. */
export type ControlState = "enforced" | "declared" | "unwired";

export const CONTROL_STATES: Record<ControlState, { label: string; note: string }> = {
  enforced: {
    label: "Enforced",
    note: "There is code on the live path that applies this, and something breaks if you remove it.",
  },
  declared: {
    label: "Declared, not enforced",
    note: "The rule is implemented and exercised, but no production path consults it yet. We report it as declared, never as enforcement.",
  },
  unwired: {
    label: "Built, not yet wired",
    note: "The logic exists and is exercised behind a port, but nothing in production calls it yet. What is missing is a mount, an adapter or a credential — not new engineering.",
  },
};

export interface EngineeringControl {
  title: string;
  body: string;
  state: ControlState;
}

export interface EngineeringGroup {
  id: string;
  title: string;
  lede: string;
  controls: EngineeringControl[];
}

export const ENGINEERING_GROUPS: EngineeringGroup[] = [
  {
    id: "identity",
    title: "Identity and access",
    lede: "Your directory stays the source of truth. The platform verifies against it and refuses to run without it.",
    controls: [
      {
        title: "SSO by OIDC, verified against your IdP",
        state: "enforced",
        body: "A bearer JWT is validated against your identity provider's JWKS — signature by key id, issuer, audience and expiry — and its claims become the tenant, principal, roles and region that every downstream check reads. Claim names are configurable, including dotted paths, so an IdP that nests custom claims needs no code change.",
      },
      {
        title: "A deploy refuses to boot on the development verifier",
        state: "enforced",
        body: "The platform ships a stub verifier that accepts hardcoded development tokens. A deploy context with that verifier selected raises a configuration error and does not start — checked on every deploy branch rather than delegated to a downstream check that only ran on one of them. That guard exists because the delegated version had a hole in it.",
      },
      {
        title: "SCIM 2.0 provisioning, with nested groups",
        state: "unwired",
        body: "Standard /scim/v2/Users and /scim/v2/Groups resources your IdP pushes to, mapped onto the provisioning engine, including nested groups — a group whose members are themselves groups defines a hierarchy, and a user in a child group inherits the parent's roles. The router is built and exercised; it is not mounted on a running server today, so directory sync is a wiring step you should scope with us rather than assume.",
      },
      {
        title: "Federation for OIDC authorization-code and SAML",
        state: "unwired",
        body: "One federation port with two adapters. The authorization-code flow burns a code on exchange, single-use as the spec requires, and an unknown or reused code fails closed; the SAML adapter parses the assertion's NameID and attribute statement. Today the only thing calling them is a demonstration walk-through against an offline identity provider — the live token-endpoint call and XML signature check are the credential-gated drop-ins.",
      },
      {
        title: "One scope lattice for permission checks",
        state: "enforced",
        body: "Role permissions resolve through the same lattice — exact match, namespace wildcard, or full grant — that the skill, connector and agent registries use, so a grant can be written once as a namespace rather than enumerated per action, and there is one place to reason about what a role can reach.",
      },
      {
        title: "Maker-checker, where a writer flags it",
        state: "enforced",
        body: "On an approval tagged for maker-checker, the principal who requested it cannot also approve it; the refusal names both the principal and the approval. The administrator role does not bypass this, because it is a control rather than a permission. Untagged approvals are unaffected, so single-principal flows still resolve.",
      },
      {
        title: "Relationship-based access and separation of duties",
        state: "unwired",
        body: "A relationship engine — does this principal own this account, is she a member of the team that does, resolved directly or through one hop of group membership — with grants, revocations and conflict blocks audited. It is built and tenant-scoped, and nothing in production calls it yet. The maker-checker control above is separate and is enforced.",
      },
      {
        title: "Programmatic keys that can only narrow",
        state: "enforced",
        body: "An SDK key belongs to a tenant, carries a least-privilege scope set, and is stored as a hash — shown once at issue, masked in every listing, never retrievable. When a call is key-authenticated the key's scopes are a second, independent gate over the same lattice: the key can narrow the principal's role grant, not widen it.",
      },
    ],
  },
  {
    id: "isolation",
    title: "Tenant isolation",
    lede: "The isolation contract is enforced by Postgres, not by application code remembering to add a filter.",
    controls: [
      {
        title: "Row-level security, forced, on a session GUC",
        state: "enforced",
        body: "Tenant-scoped tables carry an RLS policy keyed on a custom Postgres setting, with FORCE ROW LEVEL SECURITY so the policy applies to the table owner too. The database, not the query author, decides which rows a session can see.",
      },
      {
        title: "A per-request tenant context that fails closed",
        state: "enforced",
        body: "The request's context is bound to a contextvar — per task, so a pooled connection borrowed inside a request cannot pick up another request's tenant — and each Postgres transaction sets the GUC from it. A tenant-scoped operation with nothing bound raises rather than running unscoped. An unauthenticated or invalid bearer proceeds unbound, which means any tenant-scoped query then fails closed instead of returning rows.",
      },
      {
        title: "The same contract provable without a database",
        state: "enforced",
        body: "Every store is also scoped by the context's tenant at the port layer, so the in-memory adapter demonstrates cross-tenant denial with no external services running. Two independent mechanisms over one property: neither is asked to be sufficient alone.",
      },
    ],
  },
  {
    id: "audit",
    title: "The evidence layer",
    lede: "An audit log is only evidence if it cannot be edited, trimmed, or quietly re-rooted. This one is defended at the data layer.",
    controls: [
      {
        title: "A per-tenant hash chain you can recompute",
        state: "enforced",
        body: "An event's hash is computed over each of its fields except the hash itself — including the previous event's hash — so any change to a recorded event is detectable and the chain is verifiable end to end. Verification recomputes a tenant's chain and reports tampering rather than asserting integrity.",
      },
      {
        title: "Append-only in the database, not just in the API",
        state: "enforced",
        body: "A trigger raises on UPDATE and DELETE against the audit table, including for the table owner, and the store exposes no mutation path. Deletion is not a permission someone can be granted.",
      },
      {
        title: "The chain cannot fork in the database",
        state: "enforced",
        body: "A unique constraint on (tenant, previous hash) means only one event may chain off a given predecessor. A concurrent writer that would have forked the chain gets a surfaced error instead of silently corrupting the record — and a forked chain is what makes verification report tampering when nothing was tampered with.",
      },
      {
        title: "Damage is declared, never repaired away",
        state: "enforced",
        body: "When a defect once minted events pointing at the wrong predecessor, the rows could not be corrected — the append-only trigger is correct and applies to everyone. So the damage is declared instead: a signed, append-only marker naming the tenant, the first affected event, and a frozen digest over the exact observed break set. Add damage, remove damage, or hide a real tamper inside the window, and the digest stops matching.",
      },
      {
        title: "Export to your SIEM, and e-discovery over the trail",
        state: "unwired",
        body: "Events render as Elastic Common Schema JSON or CEF for the tooling your security team already runs, with a shipper behind a transport port and an e-discovery bundle across a person or a matter. Export reads the trail rather than becoming a second, editable copy of it. The transport pointed at a real Splunk or Elastic endpoint is the step that has not been taken.",
      },
      {
        title: "Legal hold outranks the retention schedule",
        state: "declared",
        body: "The retention sweep consults the hold register before it deletes anything and reports a matching record as retained-under-hold. The register is real and the sweep honours it; there is no operator surface that places a hold yet, so today the register is empty by construction.",
      },
    ],
  },
  {
    id: "data",
    title: "Data lifecycle and subject rights",
    lede: "Storage limitation and the right to erasure, reconciled with an audit log that cannot be edited.",
    controls: [
      {
        title: "A retention schedule per data class",
        state: "enforced",
        body: "Business records, message content, application logs and telemetry each carry a window. The audit trail is deliberately exempt and holds tamper-evident metadata rather than raw personal data — which is what makes erasure and an immutable log reconcilable rather than contradictory.",
      },
      {
        title: "The sweep deletes, through each store's own governed path",
        state: "enforced",
        body: "Retention used to be declared while nothing deleted on the schedule — the classifier had no production caller. It now deletes past-window, non-held records through the store's own governed delete, driven by an admin-gated endpoint and a daily job manifest. A class with no schedule, and any record whose class is unknown, is refused rather than purged.",
      },
      {
        title: "Access, correction and erasure for a data principal",
        state: "enforced",
        body: "Erasure anonymises the personal fields, keeps the record shell and its id so referential integrity and audit linkage survive, marks it erased, and appends an erasure event to the trail. The trail itself is untouched, because it cannot be touched.",
      },
      {
        title: "Erasure has a declared floor and a shape-matched ceiling",
        state: "enforced",
        body: "The declared per-type field list is the floor an operator can see as a menu. Above it, a matcher works on the record's own shape — a person's name, a date of birth, a national or health identifier — so a data-principal record on a type nobody declared is still erasable. Ambiguous names like 'name' or 'email' are admitted only on a data-principal shape, which is why a product name or a campaign name is not erased by accident.",
      },
    ],
  },
  {
    id: "secrets",
    title: "Keys, secrets and encryption",
    lede: "A model should not see a credential. An agent is given a reference, and the raw value is resolved at the connector boundary — one place, audited.",
    controls: [
      {
        title: "Agents hold a reference, not a secret",
        state: "enforced",
        body: "An agent and its model context only ever carry `secret://<name>`. The raw value is resolved at the connector boundary, and the audit records the access — who revealed which named secret — not the value.",
      },
      {
        title: "A credential store with somewhere durable to live",
        state: "enforced",
        body: "Secrets are sealed with AES-256-GCM, the tenant id bound as additional authenticated data, before they reach the platform's governed key-value store. A row read out of band yields ciphertext, and a row copied into another tenant's partition fails to decrypt rather than opening. Isolation rests on two independent mechanisms: row-level security on the row, and a tenant path prefix on the key.",
      },
      {
        title: "Envelope encryption with a per-tenant master key",
        state: "enforced",
        body: "A fresh data key encrypts the value; the data key is wrapped under a per-tenant master key. Ciphertext is bound to its tenant through the cipher's authenticated data, so a value sealed for one tenant cannot be opened under another.",
      },
      {
        title: "Break-glass access, on the record",
        state: "unwired",
        body: "Emergency reveal during an incident requires a stated reason and is loudly audited — the documented exception to the normal flow, rather than an undocumented one.",
      },
      {
        title: "External KMS and HashiCorp Vault adapters",
        state: "unwired",
        body: "Cloud KMS and Vault Transit adapters sit behind the same wrap/unwrap port as the in-process reference and are exercised against a faithful offline transport. Pointing them at a provisioned account is the remaining step, and it is a credential and configuration step, not new code.",
      },
    ],
  },
  {
    id: "api",
    title: "The API contract",
    lede: "What an integrator can rely on, and what happens when they retry.",
    controls: [
      {
        title: "Versioned paths and a version on the wire",
        state: "enforced",
        body: "Every route is reachable under /api/v1 through a rewrite, so an external caller can pin a version while the internal client keeps its unversioned calls, and a future version can diverge without touching v1. Responses carry an X-API-Version header — with one measured exception, an unhandled 500, because that response is produced outside the middleware stack. It is written down rather than glossed over.",
      },
      {
        title: "Retirement announces itself, per RFC 8594",
        state: "enforced",
        body: "A retired route can carry Deprecation, Sunset and a successor Link, keyed by the declared route template so a deprecation is one entry rather than a hand-edited handler. No route is deprecated today; this is the policy made executable ahead of the first one.",
      },
      {
        title: "Idempotency-Key, honoured at the one chokepoint",
        state: "enforced",
        body: "A request header is bound for the request's duration and read where every governed consequential action passes, so a client re-posting after a timeout gets the stored prior result rather than a second execution. A request still awaiting approval was never recorded as executed, so a re-post during the pending window behaves as a fresh request. Without the header the mechanism is inert and behaviour is unchanged.",
      },
      {
        title: "Rate limiting keyed on the principal, not the proxy",
        state: "enforced",
        body: "The limiter keys on the verified principal first, which is unforgeable, and falls back to a separately counted anonymous budget for pre-authentication traffic. Forwarded-for headers are ignored unless you declare your trusted proxies, because trusting a client-supplied header lets an attacker mint unlimited buckets — worse than having no limiter. That default was chosen after the earlier version was measured sharing one bucket across an entire deployment.",
      },
      {
        title: "A refusal is not a crash",
        state: "enforced",
        body: "One error envelope across the control plane, and an unexpected exception returns a generic 500 with the raw text logged server-side rather than sent to the caller. A permission denial or a segregation-of-duties block returns the status that is true — because a governance refusal is the system working, and it must not look identical to the system failing.",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations, resilience and cost",
    lede: "The infrastructure half is a deployment. The decision logic is real code you can exercise offline.",
    controls: [
      {
        title: "Backup integrity, recovery objectives, and a drill",
        state: "declared",
        body: "A backup manifest carries its own digest so a restore can be proven intact, and a failover drill computes the actual data-loss window and recovery time against your stated objectives — a restore that fails its integrity check aborts the drill rather than reporting a pass. The logic is real and exercised; taking and restoring real backups across regions is the deployment half, and no production path runs the drill today.",
      },
      {
        title: "Read/write routing and replica health",
        state: "declared",
        body: "Writes go to the primary, reads round-robin across healthy replicas, unhealthy replicas drop out, and a tenant that just wrote reads the primary until replication settles. The routing decision is implemented and exercised, but the platform runs a single primary today, so nothing on a request path consults it.",
      },
      {
        title: "Error budgets and per-tenant quota",
        state: "declared",
        body: "An SLO target yields an error budget with a computed consumed-and-remaining position, so an exhausted budget is a signal to freeze risky change, and per-tenant quota rejects cleanly once a tenant is over its limit. Both are exercised through a read-only console surface rather than sitting in front of live traffic — the control that does throttle live traffic today is the rate limiter above.",
      },
      {
        title: "Tracing and per-tenant cost, from a rate card",
        state: "enforced",
        body: "Runs are wrapped in OpenTelemetry spans tagged with tenant, app, principal and request id, and cost is computed from a rate card rather than trusted from a model's self-report. A model with no known rate produces no cost figure instead of a fabricated free one. Cost figures are illustrative, not billing advice.",
      },
    ],
  },
  {
    id: "assurance",
    title: "Assurance and compliance machinery",
    lede: "Controls that check themselves, and readiness artifacts produced from live signals rather than screenshots.",
    controls: [
      {
        title: "An adversarial battery that can withhold a mark",
        state: "enforced",
        body: "Paraphrase, synonym and obfuscation attacks are run through the live classifiers, and a dimension passes only if it blocks the attacks and lets legitimate inputs through — block rate and false-positive rate together. It is a certification gate rather than a report: a vertical's trust mark is issued only if its safety dimension survives the battery. The assurance tier is reported as structural, behavioural or adversarial, so a badge says what it actually proves, and the mode says whether the classifier was the deterministic guard or a model.",
      },
      {
        title: "Egress DLP that blocks rather than masks",
        state: "unwired",
        body: "Outbound content can be scanned for credential shapes — cloud keys, private keys, bearer tokens — which are blocked outright rather than redacted, on the reasoning that a partially masked secret is still a leaked secret, with personal data redacted through the same guardrail. The harness is built and exercised; nothing on the outbound path imports it yet.",
      },
      {
        title: "Drift re-verification with automatic revocation",
        state: "enforced",
        body: "A scheduled sweep re-verifies the certified skills, connectors and agents it is handed against their certified hashes, revokes the trust mark of anything that drifted, and returns one consolidated report — with a thunk that raises counted as errored rather than aborting the sweep. A mark must not outlive a passing re-check.",
      },
      {
        title: "Per-tenant model and tool allow-lists",
        state: "enforced",
        body: "A tenant can constrain which foundation models touch its data and which connectors its agents may reach. The check sits on the run path — at model selection, including fallback, and at each tool call — and a denial is rejected cleanly and audited rather than silently executed. Restriction is opt-in: a tenant that configures no list is unrestricted, so this constrains nothing until you set it.",
      },
      {
        title: "Control-to-evidence packs, re-run continuously",
        state: "enforced",
        body: "Each control binds to a collector that probes a live platform signal — the audit chain verifying, an encryption round-trip, an access check — so an assessment is computed rather than asserted, and a control that passed last week and fails today shows as drift. A control with no automated evidence reports as unknown and is flagged for a human; it is never filled in.",
      },
      {
        title: "Readiness, gap analysis and the auditor workflow",
        state: "declared",
        body: "A readiness assessment turns a control report into coverage, named gaps and a band. A Type II window accumulates periodic samples and treats a control as operating effectively only if it held at every sample, with no lapse. The auditor's evidence-request workflow, with acceptance and exceptions, is modelled and audited. It is exercised through a console surface; no live auditor engagement is running against it.",
      },
      {
        title: "An incident response runbook, and a record of rehearsing it",
        state: "declared",
        body: "Roles, a severity ladder, the notification clock and the full lifecycle, each step mapped to the control that makes it real — and a drill log recording that the plan has been walked, not merely written.",
      },
      {
        title: "Outbound webhooks",
        state: "unwired",
        body: "Subscription, HMAC-signed payloads, retry and dead-lettering are built against a delivery port, with sandbox events flagged so an integrator can build without touching production. The tree ships a collecting transport for verification; a production HTTP deliverer is not wired.",
      },
    ],
  },
];

/**
 * The section that earns the rest of the page. Each limit is stated in the platform's own terms —
 * no softening, because a buyer who finds one of these themselves discounts everything above it.
 */
export interface EngineeringLimit {
  title: string;
  body: string;
}

export const ENGINEERING_LIMITS: EngineeringLimit[] = [
  {
    title: "Data residency is declared, not enforced by routing",
    body: "The classifier and the routing rule are real: a field with no declared classification is treated as restricted and refused a cross-border read, rather than waved through as internal. But no production read path, connector or storage layer consults the router, and the platform runs single-region today, so there is no peer region a request could be served from. The trust surface publishes this as data — `declared: true, enforced: false`, with the reason attached — so a console cannot render the declaration as an enforcement without ignoring a boolean that is right there.",
  },
  {
    title: "No SOC 2 or ISO 27001 certification is held today",
    body: "Certificates are issued by independent auditors, and a Type II attestation needs a months-long observation window. What exists is the control set those audits examine — the immutable audit chain, row-level isolation, OIDC access control, encryption at rest, continuous control monitoring — plus the readiness assessment, gap analysis and auditor engagement workflow in code. Control mapping for GDPR, SOC 2 Type II and ISO 27001 is recorded as underway and not certified. We would rather you read that here than assume it.",
  },
  {
    title: "The Postgres and RLS tests are a separate job, not the default suite",
    body: "The default test suite runs against in-memory adapters, which is what makes the isolation contract provable on any machine with no services running. Cross-tenant RLS and idempotency against real Postgres and Redis run in a dedicated integration job with those services stood up and the guarded tests un-skipped. Both are real; they are not the same run, and it would be misleading to imply every change is exercised against Postgres.",
  },
  {
    title: "No third-party penetration test report is on file",
    body: "The scope is written — token forgery and audience bypass, cross-tenant access at the API and the data layer, connector scope and consent-gate bypass, the control plane and secrets handling — and the remediation log is prepared. It holds no findings yet, because no independent tester has produced a report. That is a commissioning step, not an engineering one.",
  },
  {
    title: "Several capabilities are built but not yet wired, and we name them",
    body: "SCIM directory sync, OIDC and SAML federation, shipping the audit feed to a live SIEM, outbound webhook delivery, relationship-based access control, egress DLP, and the external KMS and Vault adapters are each implemented and exercised behind a port — and each is currently called by nothing in production. If one of them is on your requirements list, treat it as scope to agree rather than as a feature to switch on, and hold us to that in writing.",
  },
  {
    title: "The resilience logic is real; the multi-node deployment is not",
    body: "Replica routing, backup-restore integrity, recovery objectives, error budgets and per-tenant quota are implemented and exercised as decision logic. The platform runs single-region on a single primary today, so those decisions are not sitting in front of live traffic. We would rather show you the logic and tell you the deployment shape than let an architecture diagram imply both.",
  },
  {
    title: "We publish no performance figures",
    body: "No latency, throughput or availability number appears on this page, because we will not put a figure in front of a buyer that we cannot reproduce on their shape of data and their deployment. Ask us to run the load profile you actually care about, and read the result rather than our summary of it.",
  },
];

/** What a buyer can ask to be shown, rather than told. Each maps to a surface that exists. */
export const ENGINEERING_EVIDENCE: string[] = [
  "The audit chain recomputed live for your tenant, and what verification reports when a record is altered underneath it",
  "A cross-tenant read attempted against Postgres row-level security, at the data layer rather than the API",
  "The trust evidence pack, which marks a source as not measured and returns no verdict for it, rather than a green tick",
  "An erasure run end to end: the personal fields gone, the record shell and the audit linkage intact",
  "A governed action re-posted with the same Idempotency-Key, executing once",
  "The adversarial battery run against the live classifiers, including its false-positive rate on legitimate inputs",
];

export const ENGINEERING_SEO = {
  title: "Engineering and enterprise readiness | elan1",
  description:
    "The procurement checklist a regulated buyer works through, answered against platform code and labelled with the state each control is actually in: identity and access, row-level tenant isolation, a hash-chained append-only audit trail, retention and erasure, key management, the API contract, resilience and assurance — including that data residency is declared rather than enforced, and that no SOC 2 or ISO 27001 certification is held today.",
};
