// pages/Pricing.tsx — the wedge: Discovery Sprint → Launchpad → subscription.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { VsBuildersBand } from "../components/VsBuildersBand";
import { BANDS } from "../content/bands";

const steps = [
  { tag: "Step 1 · lowest risk", name: "Discovery Sprint", body: "A fixed-scope sprint that maps your highest-value opportunity and ships a working proof. Fully credited toward your Launchpad.", accent: "#df8c64", cta: "Start here" },
  { tag: "Step 2 · prove it", name: "Launchpad", body: "One flagship workflow, live and governance-validated in 4–6 weeks — a fixed fee, a real result in production.", accent: "#2f6df0", cta: "Scope a Launchpad" },
  { tag: "Step 3 · scale", name: "Subscription & expand", body: "Per-seat / usage product pricing, plus run1 operations and assure1 governance as you expand across functions on enterprise1.", accent: "#7c6cf0", cta: "Plan the rollout" },
];

const models = [
  ["Services", "Fixed-scope engagement or build-sprint fees."],
  ["Products", "Per-seat / usage; enterprise licensing on enterprise1."],
  ["Solutions", "Fixed Launchpad fee, then product pricing + governance retainer."],
  ["Operations", "run1 retainer; assure1 governance retainer."],
];

const faqs = [
  ["How is this different from an agent-builder platform?", "A builder gives you a canvas to assemble an agent. elan1 ships the operations product — data models, workflows, and governance included — and every consequential action is human-gated, audited, and provable. See the full comparison on Why elan1 vs builders."],
  ["How do I trust an AI agent with money or decisions?", "You don't have to trust it — you verify it. Consequential actions are human-approved, and every one lands on an immutable, hash-chained audit you can export as a regulator-verifiable receipt."],
  ["Are you Claude-only? What about other models?", "Claude-native by positioning, with multi-provider failover behind the runtime seam — and our router is cost- and guardrail-aware on every route, which builder routers aren't."],
  ["Can non-developers build agents?", "Yes — describe an agent in plain English and a draft is composed for you. It never auto-publishes: a human reviews it and it must pass an eval before it can go live."],
  ["Does it connect to my Gmail / HubSpot / Slack today?", "Yes — 35+ connectors, native and self-serve. Connecting is supplying credentials + a scoped, least-privilege grant, not a custom build, and every call is audited."],
  ["Is it production-ready?", "The software is built and fully tested. Go-live is provisioning the lean stack — a documented step — with an enterprise multi-region track for residency and compliance."],
];

export default function Pricing() {
  useSeo("Pricing — start small, scale on proof | elan1", "The wedge: a low-risk Discovery Sprint, then a fixed-fee Launchpad, then subscription as you expand. Illustrative; not financial advice.");
  return (
    <>
      <PageHero
        kicker="Pricing · The wedge"
        accent="#df8c64"
        title="Start small. Scale on proof."
        subtitle="We lead with the lowest-risk way to begin and expand only when value is proven. No open-ended time-and-materials — fixed scope, real results, then subscription."
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "Get a custom quote", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead kicker="The path" title="Three steps, increasing commitment." lede="Each step de-risks the next. You never buy the platform before you've seen the proof." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: s.accent }}>{s.tag}</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink">{s.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{s.body}</p>
                <Link to="/contact" className="mt-6"><span className="link-underline">{s.cta} <Icon.Arrow className="h-4 w-4" /></span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHead kicker="By company size" title="Pick your band." lede="Size-appropriate offering mix, pricing posture, and an illustrative ROI estimate — choose where you are." align="center" />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {BANDS.map((b, i) => (
            <Reveal key={b.id} delay={i * 0.06}>
              <Link to={`/for/${b.id}`} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: b.accent }}>{b.range}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">{b.name}</h3>
                <p className="mt-2 flex-1 text-sm text-slate">{b.tagline} {b.who}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep">Explore {b.name} <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead kicker="Pricing models" title="By layer." lede="The right model depends on what you're buying and your size. Everything here is illustrative — not financial advice." />
        <div className="mt-10 overflow-hidden rounded-card border border-line bg-surface">
          {models.map(([t, b], i) => (
            <div key={t} className={`grid grid-cols-1 gap-1 px-6 py-5 sm:grid-cols-[200px_1fr] ${i < models.length - 1 ? "border-b border-line" : ""}`}>
              <span className="font-display font-bold text-ink">{t}</span>
              <span className="text-sm text-slate">{b}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted">Enterprise = contact us for a custom quote. Forward-looking figures are illustrative planning constructs.</p>
      </Section>
      <Section tone="paper">
        <SectionHead kicker="Questions buyers ask" title="Straight answers." lede="The objections that come up most — and how elan1 handles them." />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
          {faqs.map(([q, a], i) => (
            <Reveal key={i}>
              <details className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-display text-[15px] font-bold text-ink">{q}</span>
                  <Icon.Plus className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate">{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-slate">
          More on the difference — <Link to="/platform/why-elan1" className="link-underline">Why elan1 vs builders</Link> · <Link to="/platform/governance" className="link-underline">How governance works</Link>
        </p>
      </Section>
      <VsBuildersBand />
      <CTASection title="Get a quote sized to you." primary={{ label: "Get a custom quote", href: "/contact" }} />
    </>
  );
}
