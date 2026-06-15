// pages/Overviews.tsx — Products / Solutions / Services overview (hub) pages.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { products } from "../content/products";
import { solutions } from "../content/solutions";
import { services } from "../content/services";
import { BrandImage, AbstractHero } from "../components/BrandImage";
import { solutionImage, serviceImage } from "../content/images";

function OfferingTile({
  to,
  name,
  sub,
  tagline,
  accent,
  live,
  featured,
  thumb,
}: {
  to: string;
  name: string;
  sub: string;
  tagline: string;
  accent: string;
  live?: boolean;
  featured?: boolean;
  thumb?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`group flex h-full flex-col overflow-hidden rounded-card border shadow-card transition-all hover:-translate-y-1 hover:shadow-lift ${
        thumb ? "" : "p-6"
      } ${featured ? "border-transparent bg-obsidian text-paper" : "border-line bg-surface"}`}
    >
      {thumb}
      <div className={`flex h-full flex-col ${thumb ? "p-6" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
          <span className={`font-mono text-base font-semibold ${featured ? "text-paper" : "text-ink"}`}>{name}</span>
        </span>
        {live && <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span>}
        {featured && !live && <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-clay">backbone</span>}
      </div>
      <p className={`mt-1 font-mono text-[11px] uppercase tracking-wide ${featured ? "text-paper/50" : "text-muted"}`}>{sub}</p>
      <p className={`mt-4 font-display text-lg font-bold leading-snug ${featured ? "text-paper" : "text-ink"}`}>{tagline}</p>
      <span className={`mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium ${featured ? "text-clay" : "text-clayDeep"} opacity-0 transition-opacity group-hover:opacity-100`}>
        Learn more <Icon.Arrow className="h-4 w-4" />
      </span>
      </div>
    </Link>
  );
}

export function ProductsOverview() {
  useSeo("The 1 Suite — agentic apps for every function | elan1", "Seven agentic apps, one for every business function, unified on the enterprise1 platform backbone.");
  return (
    <>
      <PageHero
        kicker="Products · The 1 Suite"
        accent="#2f6df0"
        title={<>The 1 Suite. <br />Agentic apps for every function.</>}
        subtitle="Each app owns one business function, works in any industry, and unifies on the enterprise1 platform. Not copilots that wait for instructions — agents that do the work, under human control."
        cta={{ label: "Book a demo", href: "/contact", secondary: { label: "Why apps beat copilots", href: "/what-is-agentic-transformation" } }}
        media={<AbstractHero label="The 1 Suite" sub="seven agentic apps · one platform" accent="#2f6df0" accent2="#df8c64" ratio="card" className="shadow-lift" />}
      />
      <Section tone="paper">
        <SectionHead kicker="Functional apps" title="Seven apps. One platform." lede="Horizontal by function, reused across every vertical, governed as one." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.filter((p) => p.slug !== "enterprise1").map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <OfferingTile to={`/products/${p.slug}`} name={p.name} sub={p.businessFunction} tagline={p.tagline} accent={p.accent} live={p.status === "live"} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-4">
            <OfferingTile to="/products/enterprise1" name="enterprise1" sub="Platform backbone" tagline="One agentic platform. Every function. Total control." accent="#df8c64" featured />
          </div>
        </Reveal>
      </Section>
      <Section tone="mist">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHead kicker="The model" title="Agentic apps, not copilots." lede="A copilot suggests; you still do the work. An agentic app reasons, uses your tools, and completes the task — then asks a human to approve what matters. That's the difference between assistance and transformation." />
          <Reveal>
            <ul className="space-y-3">
              {[
                "Each app is a workforce of agents for one function.",
                "Grounded in your data and systems via MCP connectors.",
                "Human-in-the-loop on every consequential action.",
                "Standardize on enterprise1 for shared governance at scale.",
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 rounded-card border border-line bg-surface p-4">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blueprint/12 text-blueprint"><Icon.Check className="h-4 w-4" /></span>
                  <span className="text-[15px] text-slate">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>
      <CTASection title="Run your business on the 1 Suite." />
    </>
  );
}

export function SolutionsOverview() {
  useSeo("Solutions — agentic transformation by industry | elan1", "Ten industry solutions that compose the 1 Suite with sector skills and the governance your regulator expects.");
  const bands = [
    { name: "Growth", range: "$1M–$10M", body: "Start with one high-value win and a fixed price you can sign." },
    { name: "Scale-up", range: "$10M–$100M", body: "Fix a whole function and prove ROI before you expand." },
    { name: "Enterprise", range: "$100M–$1B", body: "Govern, secure, and scale agentic systems across the business." },
  ];
  return (
    <>
      <PageHero
        kicker="Solutions · By industry & size"
        accent="#d39a3a"
        title="Agentic transformation, tuned to your world."
        subtitle="Verticals compose the 1 Suite and the service pillars with industry skills, connectors, and the governance your sector demands. The governance signature is the hero of each."
        cta={{ label: "Find your industry", href: "#industries", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper" >
        <div id="industries" />
        <SectionHead kicker="By industry" title="Ten industries. Ten governance signatures." lede="From clinical sign-off in health1 to model-risk governance in bank1 — each vertical leads with the trust its regulator expects." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.05}>
              <Link
                to={`/solutions/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <BrandImage
                  src={solutionImage[s.slug]}
                  alt={s.industry}
                  accent={s.accent}
                  ratio="21 / 9"
                  rounded={false}
                  overlay={
                    <div className="absolute inset-0 flex items-end justify-between p-4">
                      <span className="font-display text-lg font-bold text-paper">{s.name}</span>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                    </div>
                  }
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{s.industry}</p>
                  <p className="mt-2 font-display text-base font-bold leading-snug text-ink">{s.tagline}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <Icon.Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="obsidian">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Kicker dark accent="#df8c64">Another way to browse</Kicker>
            <p className="mt-3 font-display text-2xl text-paper sm:text-3xl">Start from the outcome, not the industry.</p>
            <p className="mt-2 max-w-xl text-paper/65">Agentic transformation, customer experience, cost & FinOps, compliance, legacy modernization — see how the offerings compose around a single business need.</p>
          </div>
          <Link to="/solutions/initiatives" className="btn-accent shrink-0">Browse by initiative <Icon.Arrow className="h-4 w-4" /></Link>
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead kicker="By company size" title="From a $1M brand to a $1B enterprise." lede="The same model, sized to you — pick the band that fits and we'll route you to the right starting point." align="center" />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {bands.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <span className="font-mono text-[11px] uppercase tracking-kicker text-clayDeep">{b.range}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-ink">{b.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{b.body}</p>
                <Link to="/contact" className="mt-auto pt-6"><span className="link-underline">Start here <Icon.Arrow className="h-4 w-4" /></span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection title="Bring agentic transformation to your industry." primary={{ label: "Talk to an industry team", href: "/contact" }} />
    </>
  );
}

export function ServicesOverview() {
  useSeo("Services — strategy to scale, under one roof | elan1", "Six service pillars take you from agentic strategy to a scaled, governed result: strategy1, agent1, assure1, academy1, run1, agency1.");
  return (
    <>
      <PageHero
        kicker="Services · The six pillars"
        accent="#7c6cf0"
        title="Strategy to scale, under one roof."
        subtitle="The six pillars are how elan1 delivers — and a flywheel. You can start anywhere; we take you everywhere. Every recommendation is grounded in what we can actually build on Claude, and we prove it."
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "See the method", href: "/platform/flywheel" } }}
      />
      <Section tone="paper">
        <SectionHead kicker="The pillars" title="Six pillars, end to end." lede="Strategy → Build → Assure → Academy → Run → Creative. Each is a standalone engagement and a step in the flywheel." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <OfferingTile
                to={`/services/${s.slug}`}
                name={s.name}
                sub={s.tagline}
                tagline={s.promise}
                accent={s.accent}
                thumb={
                  serviceImage[s.slug] ? (
                    <BrandImage src={serviceImage[s.slug]} alt={s.tagline} accent={s.accent} ratio="21 / 9" rounded={false} />
                  ) : (
                    <AbstractHero label={s.name} accent={s.accent} ratio="21 / 9" compact className="!rounded-none" />
                  )
                }
              />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="obsidian">
        <SectionHead kicker="The method" title="Discover → Design → Deliver → Assure → Handoff → Expand." lede="A repeatable path with formal gates (G1–G4) where humans sign off — so speed never costs you control." dark />
        <div className="mt-10">
          <Kicker dark accent="#7c6cf0">Start anywhere</Kicker>
          <p className="mt-4 max-w-3xl text-lg text-paper/70">
            Need a plan? Start with strategy1. Need it built? agent1. Need to prove it's safe? assure1. Already
            live and need it run? run1. Whatever the entry point, the pillars connect into one continuous motion.
          </p>
        </div>
      </Section>
      <CTASection title="Start anywhere. We'll take you everywhere." primary={{ label: "Start a Discovery Sprint", href: "/contact" }} />
    </>
  );
}
