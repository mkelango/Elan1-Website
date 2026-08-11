// pages/WhyElan1.tsx — "vs agent-builder platforms": why a governed operations platform beats a builder.
// Framed generically — it describes ONLY elan1 and what a builder is FOR. It must never assert
// a capability a competitor LACKS: approvals, HITL and audit are table stakes across that field
// now, so any "they can't" line is both false and checkable by a buyer in one click.
import { useSeo } from "../lib/seo";
import { factLine } from "../content/platform-facts";
import { PageHero, Section, GovernanceSpine } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";

const ACCENT = "#df8c64";

/* The headline contrast: build a clever agent vs. run your business on agents you can trust. */
const contrast = [
  {
    side: "Agent-builder platforms",
    tone: "muted",
    points: [
      "Give you a canvas to build an agent — you assemble the app.",
      "The agent acts on records that live in your other systems.",
      "The approval and the trace sit in the orchestrator.",
      "The system of record is somebody else's, reached across an integration.",
      "You own the assembly — and the governance you wire around it.",
    ],
  },
  {
    side: "elan1 — the governed operations platform",
    tone: "accent",
    points: [
      "Ships the app: data models, workflows, and governance included.",
      "Native systems-of-record across the 1 Suite, with RLS tenant isolation.",
      "Three layers of defense-in-depth — business, AI-safety, platform.",
      "Consequential actions are human-gated and least-privilege — the approval single-use and bound to the payload the reviewer saw.",
      "A hash-chained audit that recomputes — export a receipt a regulator can check.",
    ],
  },
];

/* Feature-by-feature: every builder surface, but the governed version. */
const parity = [
  ["Connect your stack", "Gmail · Outlook · Slack · HubSpot · Salesforce · Notion · Sheets · SharePoint · MCP", "each least-privilege + audited"],
  ["Visual multi-agent flow builder", "A drag-style canvas for multi-agent flows", "every node policy-gated (HITL); the whole run is audited"],
  ["Describe-to-build (NL → agent)", "A sentence becomes a draft agent with tools + tier", "never auto-published — human review + a passing eval first"],
  ["Agent marketplace / App Store", "Browse and install agents & blueprints", "certified = eval-gated; community is clearly uncertified until it passes"],
  ["Voice agents", "A voice-agent compiler with consent gating", "over an audited channel; the speech transport is credential-gated"],
  ["Multi-model routing", "Claude-native, OpenAI-compatible providers behind the seam", "cost-aware + guardrail-screened on every route"],
];

/* The governance arc — captioned snapshots of what you see in the live control plane. */
const frames = [
  {
    act: "The moat",
    head: "Human-in-the-loop, resolved from the pane",
    sub: "A person approves the consequential action — and it lands on the chain.",
    vs: "the approval lands beside the record it changed",
    accent: "#e0656d",
    ui: (
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
          <span className="font-mono text-[11px] text-slate">crm · close-won · ₹ deal</span>
          <span className="rounded-full bg-rose/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-rose">pending</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
          <span className="font-mono text-[11px] text-slate">finance · refund approval</span>
          <span className="rounded-full bg-rose/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-rose">pending</span>
        </div>
        <div className="flex items-center justify-end gap-2 pt-1">
          <span className="rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-slate">Reject</span>
          <span className="rounded-md bg-green px-2.5 py-1 font-mono text-[10px] font-bold text-white">Approve</span>
        </div>
      </div>
    ),
  },
  {
    act: "Provable governance",
    head: "Hash-chained audit + compliance receipt",
    sub: "Exportable, tamper-evident. Change one event → verification fails.",
    vs: "the chain recomputes — change one event and verification fails",
    accent: "#3fae6b",
    ui: (
      <div className="space-y-2">
        <div className="flex items-center gap-2 rounded-lg border border-green/30 bg-green/[0.06] px-3 py-2">
          <span className="text-green"><Icon.Check className="h-4 w-4" /></span>
          <span className="font-mono text-[11px] font-bold text-green">AUDIT CHAIN · VERIFIED</span>
        </div>
        <div className="rounded-lg border border-line bg-paper px-3 py-2 font-mono text-[10px] leading-relaxed text-muted">
          <div>evt 0481 · approve · digest 9af3…</div>
          <div>evt 0482 · act · digest c1d8…</div>
          <div>evt 0483 · audit · digest 7e22…</div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-slate">
          <Icon.External className="h-3 w-3" /> Export compliance receipt
        </span>
      </div>
    ),
  },
  {
    act: "The app store",
    head: "Certified = eval-gated",
    sub: "Community agents are welcome — but clearly uncertified until they pass.",
    vs: "certification is the moat, not volume",
    accent: "#df8c64",
    ui: (
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
          <span className="font-mono text-[11px] text-slate">Agentic claims triage</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green"><Icon.Check className="h-3 w-3" /> certified</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
          <span className="font-mono text-[11px] text-slate">Demand forecasting</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green"><Icon.Check className="h-3 w-3" /> certified</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2">
          <span className="font-mono text-[11px] text-muted">Meeting-notes → actions</span>
          <span className="rounded-full bg-ink/[0.06] px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-muted">community</span>
        </div>
      </div>
    ),
  },
];

const runIt = [
  { t: "Agent workforce scorecard", b: "Accuracy, human-intervention rate, cost/run, and hours saved — per agent. Manage agents like a workforce, not a black box." },
  { t: "Cost governance", b: "Per-tenant budgets with automatic model downshift (Opus → Sonnet → Haiku). Bounded spend without an outage." },
  { t: "One control plane", b: "Governance, observability, FinOps, wave rollout, and identity — across every app and every tenant, in one pane." },
];

// DERIVED from content/platform-facts.ts — never hand-typed. The literals here previously read
// "6 product apps" and "78 governed agents" against a tree of 10 and 155, understating the product
// by roughly forty percent on the page whose whole job is credibility.
const proof = [
  `${factLine("suiteApps")} on one governed core · 1 control plane · ${factLine("verticalPacks")}.`,
  `${factLine("agentsRegistered")}, enabled in governed waves · ${factLine("skills")} · ${factLine("crossAppSagas")} that span them.`,
  `${factLine("systemsOfRecord")} with ${factLine("objectTypes")} · a hash-chained audit you can recompute · eval-gated promotion to production.`,
  `${factLine("workspaceScreens")} across the suite and the packs · ${factLine("connectors")} · cost metered per tenant.`,
  "Lean stack deploys in one documented step; a multi-region track is the enterprise roadmap.",
];

export default function WhyElan1() {
  useSeo(
    "Why elan1 vs. agent-builder platforms | elan1",
    "Builder platforms help you build an agent. elan1 runs your business on governed agents — the approval, the write and the record are one transaction on one spine, landing in a hash-chained audit you can recompute.",
  );
  return (
    <>
      <PageHero
        kicker="Why elan1 · vs builder platforms"
        accent={ACCENT}
        title={<>Builder platforms get you a clever agent.<br />elan1 runs your business on agents you can trust.</>}
        subtitle="Every surface you'd evaluate on an agent platform — connectors, a visual builder, describe-to-build, an app store, voice, multi-model routing. The difference is that all of it is governed, audited, and provable."
        cta={{ label: "Book a demo", href: "/get-started", secondary: { label: "How governance works", href: "/platform/governance" } }}
      />

      {/* The core contrast */}
      <Section tone="paper">
        <SectionHead
          kicker="The difference"
          title="Build an agent — or run your business on them?"
          lede="A builder hands you a canvas and a blank page. elan1 hands you the operations product: the data, the workflows, and the governance ship with it."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {contrast.map((c, i) => (
            <Reveal key={c.side} delay={i * 0.08}>
              <div
                className={`h-full rounded-card border p-7 ${
                  c.tone === "accent" ? "border-ink/15 bg-surface shadow-lift" : "border-line bg-mist"
                }`}
              >
                <span
                  className="font-mono text-[11px] uppercase tracking-kicker"
                  style={{ color: c.tone === "accent" ? "#b9603f" : "#8a8a93" }}
                >
                  {c.tone === "accent" ? "The governed version" : "The status quo"}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{c.side}</h3>
                <ul className="mt-5 space-y-3">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          c.tone === "accent" ? "bg-green/15 text-green" : "bg-ink/[0.06] text-muted"
                        }`}
                      >
                        {c.tone === "accent" ? <Icon.Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                      </span>
                      <span className="text-[15px] leading-relaxed text-slate">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Parity, wrapped in governance */}
      <Section tone="mist">
        <SectionHead
          kicker="Parity — wrapped in governance"
          title="Everything you'd expect from a builder. Each one, governed."
          lede="We didn't skip the surfaces buyers shortlist on. We shipped them — and put governance around every one."
        />
        <div className="mt-12 overflow-hidden rounded-card border border-line bg-surface">
          <div className="hidden grid-cols-[1.1fr_1.3fr_1.4fr] gap-4 border-b border-line bg-mist/60 px-6 py-3 font-mono text-[10px] uppercase tracking-kicker text-muted sm:grid">
            <span>Capability</span>
            <span>What a builder gives you</span>
            <span>The elan1 difference</span>
          </div>
          {parity.map(([cap, base, diff], i) => (
            <Reveal key={cap} delay={(i % 6) * 0.04}>
              <div className={`grid gap-2 px-6 py-5 sm:grid-cols-[1.1fr_1.3fr_1.4fr] sm:gap-4 ${i !== parity.length - 1 ? "border-b border-line" : ""}`}>
                <span className="font-display text-[15px] font-bold text-ink">{cap}</span>
                <span className="text-sm leading-relaxed text-slate">{base}</span>
                <span className="flex items-start gap-2 text-sm leading-relaxed text-ink/85">
                  <span className="mt-0.5 shrink-0 text-rose"><Icon.Shield className="h-4 w-4" /></span>
                  {diff}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 font-mono text-xs text-muted">
          Claude-native by positioning, with other providers reachable behind the same runtime seam. Guardrails are evaluated on the route; cost-aware model downshifting is a separate behaviour that an operator turns on deliberately rather than something running by default.
        </p>
      </Section>

      {/* The governance arc — captioned control-plane snapshots */}
      <Section tone="paper">
        <SectionHead
          kicker="Inside the control plane"
          title="What governed actually looks like."
          lede="Three moments from the live control plane."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {frames.map((f, i) => (
            <Reveal key={f.head} delay={i * 0.08}>
              <figure className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-mist">
                <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-2.5">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: f.accent }} />
                    <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">{f.act}</span>
                  </span>
                  <span className="font-mono text-[10px] text-muted">enterprise1 · control plane</span>
                </div>
                <div className="flex-1 p-4">{f.ui}</div>
                <figcaption className="border-t border-line bg-surface px-4 py-4">
                  <p className="font-display text-[15px] font-bold text-ink">{f.head}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate">{f.sub}</p>
                  <p className="mt-2 font-mono text-[11px]" style={{ color: f.accent }}>▸ vs builders — {f.vs}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">
          Illustrative snapshots of the live control plane. See all of it end-to-end in a working demo.
        </p>

        {/* Merged in from the former "The proof of governance" band: it made the same
            hash-chained-audit / compliance-receipt point one band later in a different layout.
            Kept in full — GovernanceSpine and the /platform/governance link are governance surfaces. */}
        <div className="mt-16 grid gap-10 border-t border-line pt-14 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker accent="#e0656d">Provable, not asserted</Kicker>
            <h3 className="display mt-4 text-2xl text-ink sm:text-3xl">The moat is governance you can hand to a regulator.</h3>
            <p className="lede mt-5 text-slate">
              A human approves consequential actions. The decision lands on a hash-chained audit that recomputes. Export a
              compliance receipt — a tamper-evident, offline-verifiable record of what passed through the governed path. Tamper
              with one event and verification fails. The approval, the write and the record are one transaction — not an orchestrator call joined to someone else’s record by a trace.
            </p>
            <div className="mt-7">
              <a href="/platform/governance" className="btn-ghost">
                See the three layers <Icon.Arrow className="h-4 w-4" />
              </a>
            </div>
          </div>
          <GovernanceSpine
            label="The compliance receipt"
            text="Every agent action — who, what, when, under which policy, approved by whom — is appended to a hash-chained ledger. Export it and a regulator can verify the chain offline. Provable governance is the difference between 'trust us' and 'verify it yourself.'"
          />
        </div>
      </Section>

      {/* Run it like a business — with the former standalone "Proof points" band folded in below.
          Both answered "what does it look like to operate this today"; two bands of equal weight,
          one after the other, was the repetition. Every derived factLine survives. */}
      <Section tone="mist">
        <SectionHead kicker="Run it like a business" title="A CFO/COO pane over governed work." />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {runIt.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay/12 text-clayDeep"><Icon.Layers className="h-4 w-4" /></span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{r.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{r.b}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <Kicker accent="#3fae6b">Proof points — today</Kicker>
          <h3 className="display mt-4 text-2xl text-ink">Not a roadmap. A running platform.</h3>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {proof.map((p, i) => (
              <Reveal as="li" key={i} delay={(i % 2) * 0.06} className="flex items-start gap-3 rounded-card border border-line bg-surface p-5">
                <span className="mt-0.5 text-green"><Icon.Check className="h-5 w-5" /></span>
                <span className="text-[15px] leading-relaxed text-slate">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CTASection
        title="Builder platforms get you a clever agent. We get you a business that runs on agents you can trust — and prove it."
        body="Add 1. Become the one. See the governed control plane end-to-end in a working demo."
        primary={{ label: "Book a demo", href: "/get-started" }}
      />
    </>
  );
}
