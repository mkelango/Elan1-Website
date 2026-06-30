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
      "Human-in-the-loop — a person approves every consequential action, from the control pane.",
      "Immutable, hash-chained audit — every action recorded, tamper-evident, exportable.",
      "Eval-gated promotion — no passing eval → no Trust Mark → no production.",
      "Policy engine — blocks, allows, or routes-to-human per tenant and vertical signature.",
    ],
    note: "No builder platform ships this.",
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
    note: "The layer most platforms stop at.",
  },
  {
    n: "Layer 3",
    t: "Platform security",
    accent: "#22b8c4",
    icon: <Icon.Layers className="h-5 w-5" />,
    lede: "Isolates the tenant.",
    points: [
      "Postgres row-level-security tenant isolation — never retrofitted.",
      "Data residency (in → sg → us → me → eu) with localized governance.",
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
    "Business governance (HITL + immutable audit + eval-gated Trust Marks), AI safety (PII redaction, prompt-injection), and platform security (RLS, residency, least-privilege). Provable, exportable, regulator-ready.",
  );
  return (
    <>
      <PageHero
        kicker="Platform · Governance"
        accent={ACCENT}
        title="Three layers of defense-in-depth. All live. All provable."
        subtitle="Most platforms put a content filter in front of a model and call it governance. elan1 governs the action, screens the content, and isolates the tenant — and gives you a receipt you can verify offline."
        cta={{ label: "Book a demo", href: "/get-started", secondary: { label: "Why elan1 vs builders", href: "/platform/why-elan1" } }}
      />

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
          title="Every consequential action runs the same gauntlet."
          lede="No agent action skips a step. This is the path from intent to audited fact."
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
              {["Who acted, what they did, when, and under which policy", "Which human approved it — and the role it was routed to", "A verifiable hash chain, exportable for board, regulator, or customer", "Erasure that honors privacy without breaking the immutable record"].map((t) => (
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
