// pages/UseCases.tsx — WS4.2: programmatic vertical × use-case pages (index + template). Generated from
// the typed content layer (mirrors the platform's programmatic packs, X5); internally linked; quality-gated.
import { useParams, Navigate, Link } from "react-router-dom";
import { useSeo, SITE_URL } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { USE_CASES, useCaseBySlug } from "../content/usecases";

export default function UseCasesIndex() {
  useSeo(
    "Agentic use cases by industry | elan1",
    "Focused, governed agentic use cases — claims triage, demand forecasting, KYC, NOC triage, predictive maintenance and more — generated from the platform's packs.",
  );
  return (
    <>
      <PageHero
        kicker="Use cases"
        accent="#2f6df0"
        title="Agentic, by industry and job-to-be-done."
        subtitle="Narrow, high-intent use cases — each inherits its industry's governance signature and ships as configuration, not a new codebase."
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "See the solutions", href: "/solutions" } }}
      />
      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u, i) => (
            <Reveal key={u.slug} delay={(i % 3) * 0.06}>
              <Link to={`/agentic/${u.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: u.accent }}>{u.verticalLabel}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{u.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate">{u.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Explore <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection />
    </>
  );
}

export function UseCasePage() {
  const { slug } = useParams();
  const u = slug ? useCaseBySlug(slug) : undefined;
  if (!u) return <Navigate to="/agentic" replace />;

  useSeo(`${u.title} | elan1`, `${u.summary} Governed by the ${u.verticalLabel} signature; shipped as configuration, certified before it goes live.`, {
    type: "article",
    image: `/img/${u.vertical}.jpg`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: u.title,
      description: u.summary,
      provider: { "@type": "Organization", name: "elan1", url: SITE_URL },
      areaServed: u.verticalLabel,
      url: `${SITE_URL}/agentic/${u.slug}`,
    },
  });

  return (
    <>
      <PageHero
        kicker={`${u.verticalLabel} · ${u.useCase}`}
        accent={u.accent}
        title={u.title}
        subtitle={u.summary}
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "See a live agent", href: "/demo" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <SectionHead kicker="How it's governed" title={`Built for ${u.audience}, governed by design.`} lede={`This use case inherits the ${u.verticalLabel} governance signature — applied by the core, not bolted on.`} />
          <div className="mt-6 rounded-card border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Governance signature</p>
            <p className="mt-2 font-mono text-sm" style={{ color: u.accent }}>{u.signature}</p>
          </div>
          <ul className="mt-6 space-y-2.5">
            {["Composes built apps — configuration, no app fork", "Earns an assure1 Trust Mark before it goes live", "Human-in-the-loop on every consequential action", "Grounded, audited, and metered"].map((x) => (
              <li key={x} className="flex items-start gap-2.5 text-slate">
                <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-clayDeep" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={`/solutions/${u.vertical}`} className="btn-ghost">See the {u.verticalLabel} solution</Link>
            <Link to="/agentic" className="btn-ghost">All use cases</Link>
          </div>
        </div>
      </Section>
      <CTASection title={`Ship ${u.useCase} for your team.`} body="A Discovery Sprint scopes it and ships a governed proof in weeks — fully credited." />
    </>
  );
}
