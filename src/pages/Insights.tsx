// pages/Insights.tsx — WS4.1: the insights hub (list) + article template. Reviewed before publish, ad-free.
import { useParams, Navigate, Link } from "react-router-dom";
import { useSeo, SITE_URL } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { INSIGHTS, insightBySlug } from "../content/insights";

export default function Insights() {
  useSeo(
    "Insights — agentic transformation, per layer & vertical | elan1",
    "On-brand, reviewed, ad-free insights on agentic transformation: strategy, governance, and the composable platform.",
  );
  return (
    <>
      <PageHero
        kicker="Insights"
        accent="#7c6cf0"
        title="Agentic transformation, thought through."
        subtitle="On-brand, reviewed-before-publish, ad-free. The ideas behind the platform — strategy, governance, and how the pieces compose."
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "Read the glossary", href: "/resources/glossary" } }}
      />
      <Section tone="paper">
        <div className="grid gap-5 lg:grid-cols-3">
          {INSIGHTS.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.06}>
              <Link to={`/resources/insights/${a.slug}`} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: a.accent }}>{a.tag}</span>
                  <span className="font-mono text-[10px] text-muted">{a.readMins} min</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Read <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-wide text-muted">Reviewed before publish · ad-free · figures illustrative</p>
      </Section>
      <CTASection />
    </>
  );
}

export function InsightArticle() {
  const { slug } = useParams();
  const a = slug ? insightBySlug(slug) : undefined;
  if (!a) return <Navigate to="/resources/insights" replace />;

  useSeo(`${a.title} | elan1 Insights`, a.excerpt, {
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.excerpt,
      datePublished: a.date,
      author: { "@type": "Organization", name: a.author },
      publisher: { "@type": "Organization", name: "elan1" },
      mainEntityOfPage: `${SITE_URL}/resources/insights/${a.slug}`,
    },
  });

  return (
    <>
      <PageHero kicker={`Insights · ${a.tag}`} accent={a.accent} title={a.title} subtitle={a.excerpt} />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-line pb-5 font-mono text-[11px] text-muted">
            <span>By {a.author}</span>
            <span className="inline-flex items-center gap-1.5 text-green"><Icon.Shield className="h-3.5 w-3.5" /> Reviewed by {a.reviewedBy}</span>
            <span>{a.readMins} min read</span>
            <span>{new Date(a.date).toLocaleDateString()}</span>
          </div>
          <div className="mt-8 space-y-8">
            {a.body.map((s) => (
              <Reveal key={s.h}>
                <h2 className="font-display text-xl font-bold text-ink">{s.h}</h2>
                <p className="mt-2 leading-relaxed text-slate">{s.p}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6">
            <Link to="/resources/insights"><span className="link-underline">← All insights</span></Link>
            <Link to="/get-started" className="btn-primary">Start a Discovery Sprint</Link>
          </div>
        </div>
      </Section>
      <CTASection />
    </>
  );
}
