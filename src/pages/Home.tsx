// pages/Home.tsx — the company on one page: the spine of the whole site.
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Reveal, Kicker, SectionHead, Icon } from "../components/primitives";
import { Section } from "../components/blocks";
import { CTASection } from "../components/CTASection";
import { VsBuildersBand } from "../components/VsBuildersBand";
import { LayerExplorer } from "../components/LayerExplorer";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { products } from "../content/products";
import { solutions, activeSolutions, parkedSolutions } from "../content/solutions";
import { services } from "../content/services";
import { SHIFT, METHOD, FLYWHEEL, WHY_WIN, VS_LEGACY, REGIONS } from "../content/site";

const ALL_TAGS = [
  ...services.map((s) => s.name),
  ...products.map((p) => p.name),
  ...solutions.map((s) => s.name),
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="absolute inset-0 bg-grid-paper opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(223,140,100,.28), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,109,240,.14), transparent 65%)" }}
      />
      <div className="shell relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-slate backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> The agentic transformation company · Built on Claude
            </span>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display mt-6 text-5xl text-ink sm:text-6xl lg:text-[4.6rem]">
              Add 1.
              <br />
              Become <span className="relative whitespace-nowrap text-clayDeep">the one
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 7C40 2 160 2 198 7" stroke="#df8c64" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede mt-7 max-w-xl">
              elan1 turns startups, scaleups, and enterprises into agentic organizations — number one in
              their field. From AI ambition to a deployed, certified result, in weeks, not quarters.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/get-started" className="btn-primary">
                Start a Discovery Sprint <Icon.Arrow className="h-4 w-4" />
              </Link>
              <Link to="/demo" className="btn-ghost">
                <Icon.Play className="h-4 w-4" /> See a live agent
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
              {[
                ["6", "service pillars"],
                ["10", "agentic apps"],
                ["10", "industry solutions"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="display text-3xl text-ink">{n}</dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Live-agent teaser card */}
        <Reveal delay={0.2}>
          <div className="relative">
            <div className="overflow-hidden rounded-card border border-lineDark bg-obsidian shadow-lift">
              <div className="flex items-center gap-2 border-b border-lineDark px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
                <span className="ml-2 font-mono text-[11px] text-paper/50">agent · sales1 · live</span>
                <Link
                  to="/demo"
                  className="ml-auto font-mono text-[11px] text-clay underline-offset-2 hover:underline"
                >
                  Try it →
                </Link>
              </div>
              <div className="space-y-3 p-5 font-mono text-[13px]">
                <p className="text-paper/50">{"// account research agent"}</p>
                <div className="rounded-lg bg-white/[0.04] p-3 text-paper/80">
                  → Researching <span className="text-clay">Acme Corp</span>… 14 signals found
                </div>
                <div className="rounded-lg bg-white/[0.04] p-3 text-paper/80">
                  → Drafting outreach, grounded in account context
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-clay/30 bg-clay/[0.08] p-3 text-paper">
                  <Icon.Shield className="h-4 w-4 text-clay" />
                  <span className="text-paper/80">Awaiting rep approval before send</span>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-green"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green" /> human-in-the-loop · audited
                </motion.div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-surface px-4 py-3 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Time to value</p>
              <p className="display text-xl text-ink">Weeks, not quarters</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Offering marquee */}
      <div className="relative border-t border-line py-4">
        <div className="fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...ALL_TAGS, ...ALL_TAGS].map((t, i) => (
              <span key={i} className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-slate">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Shift() {
  return (
    <section className="relative overflow-hidden bg-obsidian text-paper">
      <div className="absolute inset-0" aria-hidden>
        <img src={pageImage.shift} alt="" className="h-full w-full object-cover opacity-[0.14]" style={{ filter: "grayscale(1)" }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/60" />
      </div>
      <div className="absolute inset-0 bg-grid-obsidian opacity-40" aria-hidden />
      <div className="shell relative py-20 sm:py-28">
        <SectionHead kicker={SHIFT.kicker} title={SHIFT.headline} lede={SHIFT.body} dark />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SHIFT.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-card border border-lineDark bg-white/[0.03] p-6">
                <span className="font-mono text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-paper">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuiteGrid() {
  return (
    <Section tone="paper">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead
          kicker="The 1 Suite"
          title="One platform. Every business function."
          lede="Ten agentic apps, each owning one function, each reusable across every industry — unified on the enterprise1 backbone."
        />
        <Reveal delay={0.1}>
          <Link to="/products" className="btn-ghost shrink-0">Explore the suite <Icon.Arrow className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.06}>
            <Link
              to={`/products/${p.slug}`}
              className={`group block h-full rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${
                p.slug === "enterprise1" ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
                  <span className="font-mono text-base font-semibold text-ink">{p.name}</span>
                </span>
                {p.status === "live" && (
                  <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span>
                )}
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{p.businessFunction}</p>
              <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">{p.tagline}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                Learn more <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ModelSection() {
  return (
    <Section tone="mist">
      <SectionHead
        kicker="The three-layer model"
        title="The whole company, in one view."
        lede="Services deliver, products deploy, solutions serve. Click any layer to explore the 23 offerings — and see how a single need opens onto the whole platform."
        align="center"
      />
      <div className="mt-12">
        <Reveal><LayerExplorer /></Reveal>
      </div>
    </Section>
  );
}

function SolutionsRow() {
  return (
    <Section tone="paper">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead kicker="Solutions by industry" title="Agentic transformation, tuned to your world." lede="Each vertical leads with the governance signature your sector demands." />
        <Reveal delay={0.1}><Link to="/solutions" className="btn-ghost shrink-0">Find your industry <Icon.Arrow className="h-4 w-4" /></Link></Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* FY1 GTM focus: the 7 active verticals are featured; the 3 parked ones (bank1/insure1/gov1 —
            still fully built & certified, just not this year's outbound focus) are one click away. */}
        {activeSolutions.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 5) * 0.04}>
            <Link to={`/solutions/${s.slug}`} className="group block h-full rounded-card border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="h-2 w-2 rounded-full" style={{ background: s.accent, display: "block" }} />
              <p className="mt-3 font-mono text-sm font-semibold text-ink">{s.name}</p>
              <p className="mt-1 text-xs leading-snug text-slate">{s.industry}</p>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={activeSolutions.length % 5 * 0.04}>
          <Link to="/solutions" className="group flex h-full flex-col justify-center rounded-card border border-dashed border-line bg-mist/60 p-5 text-center transition-all hover:-translate-y-1 hover:shadow-card">
            <p className="font-mono text-sm font-semibold text-ink">+{parkedSolutions.length} more</p>
            <p className="mt-1 text-xs leading-snug text-slate">Certified &amp; available by inquiry — {parkedSolutions.map((s) => s.name).join(", ")}</p>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

function ServicesJourney() {
  return (
    <Section tone="mist">
      <SectionHead kicker="End-to-end services" title="Strategy to scale, under one roof." lede="The six pillars are a journey — and a flywheel. Start anywhere; we take you everywhere." />
      <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <Link to={`/services/${s.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
                <span className="font-mono text-sm font-semibold text-ink">{s.name}</span>
              </span>
              <span className="mt-2 text-xs leading-snug text-slate">{s.tagline}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Method() {
  return (
    <Section tone="paper">
      <SectionHead kicker="The method" title="Discover → Expand. With gates that earn trust." lede="A repeatable path from opportunity to a scaled, governed result — with formal gates (G1–G4) where humans sign off." />
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {METHOD.map((m, i) => (
          <Reveal as="li" key={m.name} delay={i * 0.05} className="relative">
            <div className="h-full rounded-card border border-line bg-surface p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-clayDeep">{m.step}</span>
                {m.gate && <span className="rounded-full bg-rose/12 px-2 py-0.5 font-mono text-[10px] font-bold text-rose">{m.gate}</span>}
              </div>
              <h3 className="mt-3 font-display text-base font-bold text-ink">{m.name}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-slate">{m.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

function Flywheel() {
  return (
    <Section tone="obsidian">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead kicker="The flywheel" title="How value compounds." lede="Each turn makes the next easier. Land a service, expand into a product, deepen with a solution — and every certified result compounds trust." dark />
          <div className="mt-9">
            <Link to="/platform/flywheel" className="btn-ghost-dark">See the flywheel <Icon.Arrow className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {FLYWHEEL.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="h-full rounded-card border border-lineDark bg-white/[0.03] p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm font-bold" style={{ background: `${f.accent}22`, color: f.accent }}>
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-paper">{f.label}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/60">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function WhyWin() {
  return (
    <Section tone="paper">
      <SectionHead kicker="Why we win" title="Working proof in weeks — not decks in quarters." lede="Legacy consulting is structurally too slow and too expensive to lead the agentic era. Here's the contrast." align="center" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {WHY_WIN.map((w, i) => (
          <Reveal key={w.metric} delay={i * 0.06}>
            <div className="h-full rounded-card border border-line bg-surface p-6 text-center">
              <p className="display text-2xl text-clayDeep">{w.metric}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{w.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-card border border-line bg-surface">
          <div className="grid grid-cols-3 border-b border-line bg-mist/60 px-6 py-3 font-mono text-[11px] uppercase tracking-wide text-muted">
            <span></span>
            <span>Legacy consulting</span>
            <span className="text-clayDeep">elan1</span>
          </div>
          {VS_LEGACY.map((r) => (
            <div key={r.dim} className="grid grid-cols-3 gap-3 border-b border-line px-6 py-4 text-sm last:border-0">
              <span className="font-medium text-ink">{r.dim}</span>
              <span className="text-muted line-through decoration-rose/40">{r.legacy}</span>
              <span className="flex items-start gap-1.5 font-medium text-ink"><Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />{r.elan1}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function TrustGlobal() {
  return (
    <Section tone="mist">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
            <Kicker accent="#e0656d">Trust</Kicker>
            <h3 className="display mt-4 text-2xl text-ink">Built on Claude. Governed by assure1.</h3>
            <p className="mt-3 text-slate">Human-in-the-loop, grounded and cited, eval-gated Trust Marks, and per-vertical governance signatures. Trust isn't a page — it's how the work is built.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Human-in-the-loop", "Audit trails", "DPDP / data residency", "Eval-gated", "Ad-free", "Responsible AI"].map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            <Link to="/trust" className="mt-auto pt-7"><span className="link-underline">Visit the Trust Center <Icon.Arrow className="h-4 w-4" /></span></Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
            <Kicker accent="#2f6df0">Global</Kicker>
            <h3 className="display mt-4 text-2xl text-ink">Delivered from India, for the world.</h3>
            <p className="mt-3 text-slate">One team, five regions — region-aware compliance language, data residency, and case studies.</p>
            <div className="mt-7 grid grid-cols-2 gap-2.5">
              {REGIONS.map((r) => (
                <div key={r} className="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-3">
                  <Icon.Globe className="h-4 w-4 text-blueprint" />
                  <span className="text-sm font-medium text-ink">{r}</span>
                </div>
              ))}
            </div>
            <p className="mt-auto pt-7 font-mono text-xs text-muted">India · Singapore · United States · Middle East · Europe</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default function Home() {
  useSeo("elan1 — The Agentic Transformation Company | Built on Claude", "elan1 turns startups, scaleups, and enterprises into agentic organizations — number one in their field. Add 1. Become the one.");
  return (
    <>
      <Hero />
      <Shift />
      <SuiteGrid />
      <ModelSection />
      <SolutionsRow />
      <ServicesJourney />
      <Method />
      <Flywheel />
      <WhyWin />
      <VsBuildersBand />
      <TrustGlobal />
      <CTASection />
    </>
  );
}
