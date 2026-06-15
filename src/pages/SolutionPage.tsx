// pages/SolutionPage.tsx — Template B. Renders any industry solution from typed content.
import { useParams, Navigate } from "react-router-dom";
import { solutions } from "../content/solutions";
import { solutionDiagram } from "../lib/diagrams";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, GovernanceSpine, ComposedOf, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage } from "../components/BrandImage";
import { solutionImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export default function SolutionPage() {
  const { slug } = useParams();
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return <Navigate to="/solutions" replace />;

  const diagram = slug ? solutionDiagram[slug] : undefined;
  const a = sol.accent;
  useSeo(sol.seo.title, sol.seo.description, {
    image: `/img/${sol.slug}.jpg`,
    jsonLd: serviceJsonLd(`${sol.name} — ${sol.industry}`, sol.seo.description, `/solutions/${sol.slug}`),
  });

  return (
    <>
      <PageHero
        kicker={`Solution · ${sol.industry}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/solutions" label="All solutions" /></div></Reveal>}
        title={sol.tagline}
        subtitle={sol.challenge}
        cta={{ label: `Talk to our ${sol.name} team`, href: "/contact", secondary: { label: "Book a demo", href: "/contact" } }}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-3xl font-bold" style={{ color: a }}>{sol.name}</span>
            <span className="text-slate">composes</span>
            <ComposedOf slugs={sol.composedOf} />
          </div>
        }
        media={
          <BrandImage
            src={solutionImage[sol.slug]}
            alt={`${sol.industry} — agentic transformation by elan1`}
            accent={a}
            ratio="portrait"
            treatment="duotone"
            eager
            className="shadow-lift"
            overlay={
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>
                  {sol.industry}
                </span>
                <span className="mt-1 font-display text-2xl font-bold text-paper">{sol.name}</span>
              </div>
            }
          />
        }
      />

      {/* WHO / challenge already in hero. WHAT we deploy */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-24 self-start">
            <SectionHead kicker="The elan1 solution" title="What we deploy." lede="This vertical composes 1 Suite apps and service pillars with industry skills, connectors, and governance." />
            <div className="mt-7 rounded-card border border-line bg-mist/50 p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Composed of</p>
              <div className="mt-4"><ComposedOf slugs={sol.composedOf} /></div>
              <p className="mt-6 text-sm leading-relaxed text-slate">{sol.starterEngagement}</p>
            </div>
          </div>
          <div>
            <Kicker accent={a}>Use cases</Kicker>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sol.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 2) * 0.06}>
                  <FeatureCard title={u.title} description={u.description} accent={a} icon={<Icon.Bolt className="h-4 w-4" />} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Governance signature — the hero of each vertical */}
      <Section tone="obsidian">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Kicker dark accent="#e0656d">The differentiator</Kicker>
            <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">The governance signature.</h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">
              In {sol.industry.toLowerCase()}, trust is the product. This is the governance that makes agentic
              deployment safe here — the page legacy firms can't write convincingly.
            </p>
          </div>
          <Reveal>
            <div className="relative overflow-hidden rounded-card border border-rose/30 bg-rose/[0.08] p-7">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-rose" aria-hidden />
              <div className="flex items-center gap-2 pl-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-rose/20 text-rose"><Icon.Shield className="h-4 w-4" /></span>
                <span className="font-mono text-[11px] uppercase tracking-kicker text-rose">{sol.name} governance</span>
              </div>
              <p className="mt-4 pl-2 text-[15px] leading-relaxed text-paper/90">{sol.compliance}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Diagram */}
      {diagram && (
        <Section tone="mist">
          <SectionHead kicker="End-to-end flow" title="The solution, mapped." lede="WHO we serve, WHAT we deploy, HOW we deliver — and the governance running through it." align="center" />
          <div className="mx-auto mt-12 max-w-4xl">
            <Reveal>
              <DiagramEmbed src={diagram} title={`${sol.name} — solution map`} accent={a} caption="From the elan1 diagram library. Click to expand." />
            </Reveal>
          </div>
        </Section>
      )}

      {/* Outcomes + Launchpad */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Outcomes" title="What changes." />
            <div className="mt-8"><TickList items={sol.outcomes} accent={a} /></div>
          </div>
          <div>
            <SectionHead kicker="The Launchpad" title="One flagship workflow, live in 4–6 weeks." lede={sol.starterEngagement} />
            <div className="mt-7"><GovernanceSpine text={sol.pricingNote} label="Pricing · illustrative" /></div>
          </div>
        </div>
      </Section>

      <CTASection
        kicker="Get started"
        title={`Bring agentic transformation to ${sol.industry.toLowerCase()}.`}
        body={`Start with the ${sol.name} Launchpad — one flagship workflow, live and governance-validated in 4–6 weeks.`}
        primary={{ label: `Talk to our ${sol.name} team`, href: "/contact" }}
      />
    </>
  );
}
