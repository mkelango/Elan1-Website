// pages/Initiatives.tsx — the "By initiative" way to browse Solutions: overview + per-initiative page.
import { Link, useParams, Navigate } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, ComposedOf, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import { initiatives } from "../content/initiatives";
import { initiativeImage } from "../content/images";

export function InitiativesOverview() {
  useSeo("Initiatives — agentic transformation by business need | elan1", "Cross-industry initiatives: agentic transformation, customer experience, cost & FinOps, compliance & governance, and legacy modernization.");
  return (
    <>
      <PageHero
        kicker="Solutions · By initiative"
        accent="#df8c64"
        title="Start from the outcome you need."
        subtitle="Some needs cross every industry. Browse by initiative to see how elan1 composes the service pillars and the 1 Suite around a single business outcome — from agentic transformation to legacy modernization."
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "Browse by industry", href: "/solutions" } }}
      />
      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((it, i) => (
            <Reveal key={it.slug} delay={(i % 3) * 0.06}>
              <Link
                to={`/solutions/initiatives/${it.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <BrandImage
                  src={initiativeImage[it.slug]}
                  alt={it.name}
                  accent={it.accent}
                  ratio="21 / 9"
                  rounded={false}
                  overlay={
                    <div className="absolute inset-0 flex items-end p-4">
                      <span className="font-display text-lg font-bold text-paper">{it.name}</span>
                    </div>
                  }
                />
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: it.accent }}>{it.tag}</span>
                  <p className="mt-2 font-display text-base font-bold leading-snug text-ink">{it.headline}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                    Explore <Icon.Arrow className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection title="Tell us the outcome. We'll sequence the path." />
    </>
  );
}

export function InitiativePage() {
  const { slug } = useParams();
  const it = initiatives.find((x) => x.slug === slug);
  if (!it) return <Navigate to="/solutions/initiatives" replace />;
  const a = it.accent;
  useSeo(it.seo.title, it.seo.description);

  return (
    <>
      <PageHero
        kicker={`Initiative · ${it.name}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/solutions/initiatives" label="All initiatives" /></div></Reveal>}
        title={it.headline}
        subtitle={it.challenge}
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "Browse by industry", href: "/solutions" } }}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate">Composes</span>
            <ComposedOf slugs={it.composedOf} />
          </div>
        }
        media={
          <BrandImage
            src={initiativeImage[it.slug]}
            alt={it.name}
            accent={a}
            ratio="portrait"
            treatment="duotone"
            eager
            className="shadow-lift"
            overlay={
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>{it.tag}</span>
                <span className="mt-1 font-display text-2xl font-bold text-paper">{it.name}</span>
              </div>
            }
          />
        }
      />

      <Section tone="paper">
        <SectionHead kicker="The elan1 approach" title="How we deliver this outcome." lede="Composed from the offerings best suited to the need — wrapped in governance, built on Claude." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {it.approach.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <FeatureCard title={s.title} description={s.description} accent={a} icon={<Icon.Bolt className="h-4 w-4" />} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Outcomes" title="What changes." />
            <div className="mt-8"><TickList items={it.outcomes} accent={a} /></div>
          </div>
          <div>
            <Kicker accent={a}>Composed of</Kicker>
            <p className="mt-4 text-slate">This initiative brings together the offerings best matched to the need:</p>
            <div className="mt-5"><ComposedOf slugs={it.composedOf} /></div>
            <div className="mt-8 rounded-card border border-line bg-surface p-6">
              <p className="text-sm leading-relaxed text-slate">
                Not sure where to start? A fixed-scope Discovery Sprint maps the highest-value entry point for this
                initiative in your business — and ships a working proof.
              </p>
              <Link to="/contact" className="mt-5 inline-block"><span className="link-underline">Start a Discovery Sprint <Icon.Arrow className="h-4 w-4" /></span></Link>
            </div>
          </div>
        </div>
      </Section>

      <CTASection title={`Make ${it.name.toLowerCase()} real.`} body="Start with a Discovery Sprint — low-risk, fully credited — and ship a working, certified proof in weeks." />
    </>
  );
}
