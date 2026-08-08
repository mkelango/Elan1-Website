# The site is describing a smaller, weaker company than the one you built

**A consolidated strategy for updating the elan1 marketing website, derived from the elan1 platform.**

*Research: 8 agents — 5 deriving platform ground truth from the tree, 2 doing live competitive scans, 1 synthesising. August 2026.*

Two things are true at once, and they compound. The marketing site makes several claims the platform's own code contradicts — and on the very same pages, it undersells the product by roughly forty percent. The oldest pages do both.

> **A note on method.** Every count in this document is machine-derived from the tree, not quoted from prose. The platform's own README carried a wrong offering count for months ("23 offerings" while the tree held 27) — which is exactly why prose is not evidence here.

---

## 1. The strategic shift: the competitive line is now half false

The working position has been **"they govern the call; we govern the write."** The first half no longer holds.

Approvals, human-in-the-loop and audit logs became **table stakes** across the agent field within the last six months — one-click tool approvals, flow-level HITL, trace and audit export, RBAC and PII redaction now ship across the builder platforms. Any claim that competitors *cannot* approve or audit is falsifiable by a buyer in one click.

**What survives is narrower, sharper, and genuinely hard to copy: not whether there is an approval, but what the approval is bound to.**

Builder platforms gate a tool call whose destination they do not own — the approval lives in the orchestrator, the record lands in someone else's SaaS, and the two are joined only by a trace.

> In elan1 the approval, the write and the record are one transaction on one spine — identity, policy, human approval, act, hash-chained audit. The approval is single-use and fingerprinted to the exact payload a person reviewed. A slow decision escalates instead of opening the gate. The chain can be recomputed to prove nothing was altered.

Every clause there is a statement about elan1's own architecture, traceable to `core/elan1_core/`. It asserts nothing about anyone else — which is the point.

**Standing rule: the site never says what a competitor lacks.** That framing has now produced false claims three separate times in this project's history.

---

## 2. Priority zero — claims the platform cannot support

Fourteen found. **Two fixed during this session; twelve remain.**

### ✅ FIXED — "Human-in-the-loop on *every* consequential action"
*18 locations · products, glossary, Trust, Governance, WhyElan1, VsBuildersBand*

512 mutating HTTP handlers exist; **41 write straight to a system-of-record repo**, bypassing policy, the approval gate and the audit. 24 have no governed writer at all — including payroll, which writes statutory PF/ESI/PT/TDS payslips.

Replaced with the mechanism, which is both true and more persuasive: single-use, action-bound, payload-fingerprinted approvals; maker-checker enforced; no auto-approve — a breached SLA escalates, it never decides.

*Retained only on `assistant1`, where it is true (`ungatedActionPaths: 0` — it holds no writer).*

### ✅ FIXED — Data residency claimed as enforced
*~24 locations · worst case: the region switcher, on every page*

The platform ships `declared: true, enforced: false` and labels its own routing table "demonstration". The site said cross-region movement was "forbidden by design", and the footer told every visitor "Data resident in India / Singapore / the EU".

Now stated as **declared per tenant with fail-closed classification** — an unclassified field is treated as restricted and refused a cross-border read. That part is real, and still respectable.

### ⛔ OPEN — Fabricated proof metrics
*`src/content/proof.ts` — all six entries*

"~70% screening toil removed", "100% clinician sign-off", "faster first-response" are presented as outcomes. **Nobody measured these and there are no customers.**

Strip every metric tile; reframe the page as **governed workflow patterns**. The underlying workflow ids verify against real platform artifacts, so the page survives honestly.

### ⛔ OPEN — A public ROI calculator with invented automation rates
*`src/content/bands.ts` — `automation: 0.5 / 0.55 / 0.6`*

No automation-rate measurement exists anywhere in the platform. Either remove the calculator or convert it to a user-supplied-assumption model with no default and no elan1-sourced number.

### ⛔ OPEN — "No builder platform ships this." ×3
*`Governance.tsx:23` · `WhyElan1.tsx:262, 279`*

Now false per the competitive scan. Cut all three. Keep the capability cards; drop the absolute.

### ⛔ OPEN — Integrations described as live that are typed seams
*`Pricing.tsx:29` · `products.ts:283` · `WhyElan1.tsx:41-42`*

- "Yes — 35+ connectors, native and self-serve" answers a Gmail/HubSpot/Slack question the code does not support that way
- "Multi-provider failover" is not implemented as failover
- market1 lists Ad platforms, Analytics and Claude Design as integrations; **only CMS is wired**
- Named ASR/TTS vendors quoted as shipped

A credential-gated, least-privilege seam is still a good story — tell that one.

### ⛔ OPEN — "The software is built and fully tested."
*`Pricing.tsx:30`* — only **6 of 31 modules** have eval suites. Make it a statement about what is deployable, not about completeness.

### ⛔ OPEN — "We sell creative production"
*`Trust.tsx:17` · echoed in `products.ts:287`* — the creative pillar was retired and ships no code. Keep the ad-free commitment; delete the clause.

---

## 3. Priority one — the undersell

The two oldest pages carry hand-typed counts from an earlier product. They make elan1 look roughly half its actual size, on the exact pages meant to establish credibility.

| What the site says | What the tree holds | Where |
|---|---|---|
| 6 product apps | **10 suite apps + enterprise1** | `WhyElan1:122` |
| 78 governed agents | **155 registered** | `WhyElan1:124` |
| 35+ connectors | **32 registered & callable** | `WhyElan1:124` |
| — not stated — | **260 workspace screens** | absent |
| — not stated — | **20 systems of record · 408 object types** | absent |
| — not stated — | **21 cross-app sagas** | absent |
| — not stated — | **131 reusable skills** | absent |
| — not stated — | **31 governance signatures** | absent |

**Fix the mechanism, not just the numbers.** Every count the site quotes should live in one dated, sourced constants module with its derivation recorded beside it. A number hand-typed into a page is a claim that will go stale again — this is the third time it has.

---

## 4. Priority one — what is genuinely strong and barely mentioned

- **The audit chain.** Per-tenant SHA-256, each event hashing over its predecessor, a Postgres trigger blocking UPDATE and DELETE *even for the table owner*, an anti-fork uniqueness constraint, and no update or delete method on the store port at all. The site says "immutable" — a marketing word — where the mechanism is stronger and checkable.
- **A Trust Mark cannot be minted from nothing.** Refused on an unknown run, a non-passing run, another tenant's run, and — the good one — **zero scored cases**. An empty battery is not evidence.
- **"Not measurable" is a real third state.** Insufficient evidence never reads as a pass, and never as a zero. Nothing in the competitive set markets this.
- **Fail-safe defaults.** An unregistered policy tag routes to human approval rather than allowing. The autonomy ladder can only *add* approvals, never remove one.
- **Verticals are configuration, not forked code.** Ten packs, each a 57–116 line manifest plus ~100 lines of shared glue. **Zero forked application code.** The most defensible architectural claim in the tree, and the site never makes it.
- **assistant1 holds no writer.** Shipped this session — the sharpest version of the whole governance story.

---

## 5. Priority two — three pages that don't exist yet

### `/platform/engineering` — enterprise readiness
The largest single omission. SCIM provisioning, OIDC SSO, SIEM export, credential vault with cloud KMS, DR/HA, webhooks, a red-team battery, drift monitoring with auto-rollback, data-subject requests, enforced retention purge, API versioning, wire-level idempotency, per-client rate limiting, row-level tenant isolation. **Every item maps to a named file.** This is the procurement checklist the regulated verticals are sold into, and the site has zero coverage.

### `/platform/connectors` — the honest three tiers
32 registered and callable, a credential-gated SaaS catalog, and MCP servers — named as **typed governed seams with credential-gated transport**, never as live integrations. Replaces the single "via MCP connectors" line the site leans on everywhere.

### `/platform/verticals-are-config` — the composability proof
One real manifest as the artifact, the derived shape across all ten packs, the compliance regimes actually encoded, and per-vertical **"what it refuses"** blocks quoting the platform's own refusal strings verbatim. There are **111 of them**. Quoting a refusal is worth more than describing a capability.

---

## 6. Standing rules — things the site should never say again

- Anything asserting what a **competitor lacks**. Three false claims have come from this framing.
- Any **continuous-integration or automated-pipeline** claim — the workflow gates have never run.
- Any **latency, p95 or speed figure** — the platform's own docs say its numbers are in-process dev measurements that must not be quoted.
- Any **live health, EDI, SCADA or OT connectivity** claim — no gateway exists for any of them.
- **Lines of code, ADR counts, test counts** as evidence of depth. They measure effort, not capability.
- Any **absolute** — "every", "forbidden by design", "no one else". Both claims fixed this session were absolutes. They are the easiest thing to write and the hardest to keep true.

---

## 7. Yours to decide

**Disclose the 41 ungoverned handlers publicly?** There's a real argument for it: a measured debt with a build-breaking ratchet that can only shrink is a stronger governance story than silence, and it's the kind of thing a regulated buyer's architect respects. There's an equally real argument against.

**Publish declared-versus-exercised ratios?** 155 agents registered → 69 enabled → 11 wired into a saga. 21 cross-app flows loaded → 1 running end-to-end under the baseline wave. Unusually honest; invites a question you may not want on a marketing page.

**Publish a price?** Every comparable vendor now publishes per-user list pricing. The absence is real buyer friction — but the platform's commercial constants are marked *illustrative*, so there is no number to publish until one is set commercially.

**The audit chain's 925 declared discontinuities.** Before any tamper-evident claim ships, decide how to state that the dev database carries 925 declared link breaks from a fixed bug. Content hashes all recompute; nothing was altered. The declaration mechanism is itself impressive — but it needs a sentence, not silence.

**SOC 2 / ISO 27001.** Zero mentions today, which reads as a gap in enterprise procurement. No certification is held. The honest move is to state controls and posture explicitly rather than leave a silence buyers will fill themselves.

**Four more from the research:** whether the platform's `CLAUDE.md` should stop listing two service pillars that ship no code; whether the Enterprise plan grants nine apps or ten; whether the Middle East is a served region or an intent; and how to describe model behaviour when no API key is configured.

---

## 8. Sequencing

| # | Phase | Why this order |
|---|---|---|
| **01** | Finish priority zero — the remaining twelve | Nothing else ships while a page states something the code contradicts. Mostly deletions and rewrites; small effort, high consequence. |
| **02** | One sourced constants module, then correct the counts | Fixes the undersell *and* removes the recurrence. Every number gets a derivation comment and a date. |
| **03** | Rewrite `WhyElan1` and `Governance` | The oldest pages, the most false claims, the worst undersell — and built on a premise the competitive scan invalidated. They need rewriting, not editing. |
| **04** | The three new pages | Engineering readiness first — it unblocks the regulated verticals already two clicks from the nav. |
| **05** | Section-by-section content pass | Products, solutions, platform, resources, company — written **once**, against corrected facts and settled positioning, rather than twice. |

---

*Two priority-zero items were fixed during the session that produced this document. `assistant1` shipped at `/platform/assistant1`, and the "whole company in one view" section was removed from the home page.*
