// pages/Governance.tsx — the governance explainer: three layers of defense-in-depth, made legible.
// The public version of the launch storyboard's "governance arc."
import { useSeo } from "../lib/seo";
import { PageHero, Section, GovernanceSpine } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";

const ACCENT = "#e0656d";

const layers = [
  {
    n: "Layer 1",
    t: "Business governance",
    accent: "#e0656d",
    icon: <Icon.Shield className="h-5 w-5" />,
    lede: "Governs the action.",
    points: [
      "Human-in-the-loop — a person approves consequential actions, from the control pane.",
      "A hash-chained audit you can recompute — append-only enforced by the database itself, not by convention.",
      "Eval-gated promotion — no passing eval → no Trust Mark → no production.",
      "Policy engine — blocks, allows, or routes-to-human per tenant and vertical signature.",
    ],
    note: "Suspend an app mid-incident and its agent fleet stops — per tenant, per app, immediately and without waiting in an approval queue, because reducing capability is the wrong thing to gate. The policy that would additionally refuse that app's own direct system-of-record writes is registered in production without the rollout reference its clause reads, so that half does not fire today.",
  },
  {
    n: "Layer 2",
    t: "AI safety",
    accent: "#df8c64",
    icon: <Icon.Spark className="h-5 w-5" />,
    lede: "Screens the content.",
    points: [
      "PII redaction at the model I/O boundary.",
      "Prompt-injection and jailbreak detection.",
      "Denied-topic and policy screening on inputs and outputs.",
      "Pattern engine by default; Bedrock Guardrails / Model Armor when configured.",
    ],
    note: "Content safety — necessary, and not sufficient on its own.",
  },
  {
    n: "Layer 3",
    t: "Platform security",
    accent: "#22b8c4",
    icon: <Icon.Layers className="h-5 w-5" />,
    lede: "Isolates the tenant.",
    points: [
      "Postgres row-level-security tenant isolation — never retrofitted.",
      "Per-tenant declared residency with localized governance; data classified fail-closed.",
      "Least-privilege connector grants on the MCP fabric.",
      "Encryption, OIDC SSO, and secrets via a manager — never hardcoded.",
    ],
    note: "Enterprise-grade by default.",
  },
];

const lifecycle = [
  ["Run", "An agent proposes a consequential action (send, refund, commit, post)."],
  ["Evaluate", "The policy engine checks it against tenant + vertical governance signature."],
  ["Gate", "Allowed, blocked, or routed to a human approval inbox — routed to the right role."],
  ["Act", "Only after approval does the action execute, idempotently."],
  ["Audit", "The decision + actor + policy is appended to the hash-chained ledger."],
  ["Meter", "Cost and telemetry are recorded per tenant and per app."],
];

export default function Governance() {
  useSeo(
    "Governance — three layers of defense-in-depth | elan1",
    "Business governance (human approval + a recomputable hash-chained audit + eval-gated Trust Marks), AI safety (PII redaction, prompt-injection), and platform security (row-level tenant isolation, declared residency, least-privilege). Provable, exportable, regulator-ready.",
  );
  return (
    <>
      <PageHero
        kicker="Platform · Governance"
        accent={ACCENT}
        title="Three layers of defense-in-depth. All live. All provable."
        subtitle="A content filter screens what a model says. elan1 governs what an agent may DO, screens the content, and isolates the tenant — then gives you a receipt you can verify offline."
        cta={{ label: "Book a demo", href: "/get-started", secondary: { label: "Why elan1 vs builders", href: "/platform/why-elan1" } }}
      />

      {/*
        Approval QUALITY — the strongest genuinely-unclaimed differentiator on the board, and it led
        nowhere on this page before. Approval gates are now common across the agent field; what an
        approval is BOUND to is not. Every property below is enforced in core/elan1_core/approvals.py
        and sor_write.py — none of it asserts anything about anyone else.
      */}
      <Section tone="mist">
        <SectionHead
          kicker="What an approval is worth"
          title="An approval gate is common. What the approval is bound to is not."
          lede="A gate that can be replayed, widened, or quietly satisfied by a rubber stamp is theatre. These are the properties that make one mean something — each enforced in the platform, not asked for in a prompt."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Single-use", "An approval is consumed when it executes. It cannot be replayed for a second run."],
            ["Bound to the exact action", "The token carries the action string. An approval for one operation cannot authorise a different one."],
            ["Fingerprinted to the payload", "The token carries a content hash of the exact payload the reviewer saw. Change the payload after approval and it no longer matches."],
            ["Maker-checker enforced", "The person who requests an action is not the person who may approve it — and an admin does not bypass that."],
            ["No auto-approve, anywhere", "A breached SLA escalates. It never decides. There is no path in the platform where waiting long enough opens a gate."],
            ["A rubber stamp is visible", "A decision returned too fast to have been read is surfaced as exactly that — computed from the audit chain, not stored as a flag someone could clear."],
          ].map(([t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 0.06}>
              <div className="card card-hover h-full">
                <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-slate">
            There is one more, and it is the one that matters most: the approval, the write and the
            record are a single transaction on a single spine — identity, policy, human approval, act,
            audit. The approval does not live in one system while the record lands in another, joined
            only by a trace.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-6 max-w-3xl rounded-card border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">And one about evidence</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">
              An evaluation here reports three outcomes, not two: passed, failed, and{" "}
              <span className="font-mono text-sm">not measurable</span>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              “We did not look” never renders as “we looked and it was fine.” A run with nothing
              scored cannot mint a Trust Mark — an empty battery is not evidence — and a score with
              no measurable case returns nothing rather than zero. It is a small distinction that
              decides whether a governance report means anything.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* The three layers */}
      <Section tone="paper">
        <SectionHead
          kicker="Defense-in-depth"
          title="Governance isn't a filter. It's three layers."
          lede="Each layer answers a different question — what may the agent do, what may flow through it, and who can ever see whose data."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {layers.map((l, i) => (
            <Reveal key={l.t} delay={i * 0.08}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface p-7">
                <span className="absolute inset-x-0 top-0 h-1" style={{ background: l.accent }} aria-hidden />
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: `${l.accent}1a`, color: l.accent }}>
                    {l.icon}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">{l.n}</span>
                    <h3 className="font-display text-lg font-bold text-ink">{l.t}</h3>
                  </div>
                </div>
                <p className="mt-4 font-display text-base font-semibold" style={{ color: l.accent }}>{l.lede}</p>
                <ul className="mt-4 space-y-3">
                  {l.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0" style={{ color: l.accent }}><Icon.Check className="h-4 w-4" /></span>
                      <span className="text-sm leading-relaxed text-slate">{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-muted">{l.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The lifecycle of a governed action */}
      <Section tone="obsidian">
        <SectionHead
          dark
          kicker="The governed action lifecycle"
          title="A consequential action runs the same gauntlet, every time."
          lede="This is the path from intent to audited fact, and the governed write path holds it end to end."
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map(([step, body], i) => (
            <Reveal key={step} delay={(i % 3) * 0.06}>
              <div className="h-full rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-clay/20 font-mono text-sm font-bold text-clay">{i + 1}</span>
                  <h3 className="font-display text-lg font-bold text-paper">{step}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-paper/70">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center font-mono text-xs text-paper/55">
          K2 runtime → K7 evaluate → (block / K5 human-approve) → act → K6 audit → K8 meter
        </p>
      </Section>

      {/* Provable governance — the receipt */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Kicker accent={ACCENT}>Provable, not asserted</Kicker>
            <h2 className="display mt-4 text-2xl text-ink sm:text-3xl">A compliance receipt a regulator can verify offline.</h2>
            <p className="lede mt-5 text-slate">
              The audit log is hash-chained: each event seals the one before it. Export a compliance receipt and the chain can be
              verified independently — tamper with a single event and verification fails. Trust stops being a claim and becomes math.
            </p>
            <ul className="mt-7 space-y-3">
              {["Who acted, what they did, when, and under which policy", "Which human approved it — and the role it was routed to", "A chain that recomputes — export it for a board, a regulator, or a customer", "Erasure that honors privacy without breaking the chain"].map((t) => (
                <li key={t} className="flex items-start gap-3"><span className="mt-0.5 text-green"><Icon.Check className="h-5 w-5" /></span><span className="text-[15px] text-slate">{t}</span></li>
              ))}
            </ul>
          </div>
          <GovernanceSpine
            label="Audit chain · verified"
            text="✓ VERIFIED — chain intact, digest matches. This is what a regulator sees: an offline-verifiable record of every agent action. The difference between 'trust us' and 'verify it yourself.'"
          />
        </div>
      </Section>

      {/* Per-vertical signatures */}
      <Section tone="mist">
        <SectionHead
          kicker="Governance signatures"
          title="Different industries, different proof of trust."
          lede="Each vertical leads with the governance its regulator expects — the same engine, configured as a pack."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["health1", "Clinical sign-off on every clinical action; HIPAA-class privacy.", "#3fae6b"],
            ["bank1", "Model-risk governance, verified-data sourcing, human sign-off.", "#df8c64"],
            ["gov1", "Sovereignty, data residency, transparency and explainability.", "#e0656d"],
            ["insure1", "Fair-decisioning checks; human adjudication on denials.", "#22b8c4"],
            ["manufacture1", "Assist, never actuate; safety steps flagged; IP protected.", "#7c6cf0"],
            ["energy1", "Safety-critical controls; assist, never actuate; reliability + audit.", "#b9603f"],
          ].map(([name, body, accent], i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-base font-semibold" style={{ color: accent }}>{name}</span>
                <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="Deploy with confidence — and evidence."
        body="See HITL approvals, the verified audit chain, and an exported compliance receipt live in the control plane."
        primary={{ label: "Book a demo", href: "/get-started" }}
      />
    </>
  );
}
