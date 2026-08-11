// pages/EnterpriseOntology.tsx — the record model: the typed structure a write is validated against.
//
// Renders entirely from content/ontology.ts. Two rules this page must keep, both of them load-bearing:
//
//   1. `ONTOLOGY_FRAME.organising` — the sentence that says Enterprise Ontology is the NAME OF AN IDEA
//      organising capabilities that ship, not a product, a runtime, an editor or an API — is rendered
//      in the FIRST SCREEN, in full, unabbreviated. Moving it down the page turns this into a page
//      about a product that does not exist. It is the reason the page is allowed to use the name.
//   2. Every layer's `limit` renders BESIDE its layer, not in a disclaimer block at the bottom. A
//      skimmer who reads three cards must have read three limits.
//
// The page restates nothing that already has a page: connectors, verticals-as-config, governance and
// engineering are linked, not summarised.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  ONTOLOGY_FRAME,
  ONTOLOGY_LAYERS,
  ONTOLOGY_WHY_IT_MATTERS,
  ONTOLOGY_NOT_YET,
  ONTOLOGY_PATH_SCOPE,
  ANCHORED_REFUSALS,
  ONTOLOGY_SEO,
} from "../content/ontology";
import { factValue } from "../content/platform-facts";

const ACCENT = "#2f6df0";

export default function EnterpriseOntology() {
  useSeo(ONTOLOGY_SEO.title, ONTOLOGY_SEO.description, {
    breadcrumbs: [{ name: "Platform", href: "/platform" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Enterprise Ontology — the typed structure a write is validated against",
      description: ONTOLOGY_SEO.description,
      url: "https://elan1.ai/platform/enterprise-ontology",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Platform · the record model"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/platform" label="Platform" />
            </div>
          </Reveal>
        }
        title={
          <>
            Context is what an agent reads. <br />
            An ontology is what a write is validated against.
          </>
        }
        subtitle={ONTOLOGY_FRAME.restated}
        cta={{
          label: "See the governed refusals",
          href: "/resources/proof",
          secondary: { label: "Talk to engineering", href: "/contact" },
        }}
        meta={
          <span className="font-mono text-sm text-muted">
            {factValue("objectTypes")} typed object types · {factValue("systemsOfRecord")} systems of
            record · one governed writer in front of each
          </span>
        }
        media={
          <AbstractHero
            label="object_type"
            sub="declare · validate · refuse · audit"
            accent={ACCENT}
            accent2="#5ad1c0"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* 🚨 THE ORGANISING NOTE — first screen, in full. See the file header. */}
      <Section tone="mist">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker accent={ACCENT}>What this page is claiming</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
              A name for an idea — not a product you buy.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-slate">{ONTOLOGY_FRAME.why}</p>
          </div>
          <Reveal>
            <div className="rounded-card border-2 border-dashed border-ink/20 bg-surface p-7 shadow-card">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-md"
                  style={{ background: `${ACCENT}1f`, color: ACCENT }}
                >
                  <Icon.Shield className="h-4 w-4" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                  Read this before the rest
                </span>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/85">
                {ONTOLOGY_FRAME.organising}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The distinction, held still */}
      <Section tone="obsidian">
        <SectionHead
          kicker="The distinction"
          title={ONTOLOGY_FRAME.thesis}
          lede="Both columns describe something worth having. They are not competing answers to one question — they are answers to two, and only the right-hand one is load-bearing once an agent stops answering and starts acting."
          dark
          accent={ACCENT}
        />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-paper/20">
                <th className="w-[16rem] py-4 pr-6 font-mono text-[10px] uppercase tracking-kicker text-paper/40">
                  &nbsp;
                </th>
                <th className="py-4 pr-6 font-mono text-[11px] uppercase tracking-kicker text-paper/55">
                  Retrieval · what an agent reads
                </th>
                <th className="py-4 font-mono text-[11px] uppercase tracking-kicker" style={{ color: ACCENT }}>
                  A record model · what a write is checked against
                </th>
              </tr>
            </thead>
            <tbody>
              {ONTOLOGY_FRAME.rows.map((r) => (
                <tr key={r.question} className="border-b border-paper/10 align-top">
                  <th
                    scope="row"
                    className="py-6 pr-6 font-display text-base font-bold leading-snug text-paper"
                  >
                    {r.question}
                  </th>
                  <td className="py-6 pr-6 text-[14px] leading-relaxed text-paper/60">{r.retrieval}</td>
                  <td className="py-6 text-[14px] leading-relaxed text-paper/85">{r.ontology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* The five layers */}
      <Section tone="paper">
        <SectionHead
          kicker="What actually ships"
          title="Five components. Each one checkable."
          lede="These are not five names for one thing, and none of them is a roadmap item. Each carries how it was verified against the platform, the refusals it makes possible where there are any, and the limit that scopes it."
        />
        <div className="mt-12 space-y-6">
          {ONTOLOGY_LAYERS.map((l, i) => (
            <Reveal key={l.id} delay={(i % 3) * 0.05}>
              <article className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: l.accent }}
                        aria-hidden
                      />
                      <h3 className="font-display text-xl font-bold text-ink">{l.name}</h3>
                    </div>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate">{l.what}</p>
                    <p className="mt-4 text-[15px] leading-relaxed text-slate">{l.howItShips}</p>
                    {l.seeAlso && (
                      <Link
                        to={l.seeAlso.href}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep transition-colors hover:text-ink"
                      >
                        {l.seeAlso.label} <Icon.Arrow className="h-4 w-4" />
                      </Link>
                    )}
                  </div>

                  <div className="space-y-5">
                    <div className="rounded-lg border border-line bg-mist p-5">
                      <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                        How this was verified
                      </span>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate">{l.verified}</p>
                    </div>

                    {l.refusals && (
                      <div>
                        <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                          What it says when it refuses
                        </span>
                        <div className="mt-2 space-y-3">
                          {l.refusals.map((q) => (
                            <blockquote
                              key={q}
                              className="border-l-2 pl-4 font-mono text-[12.5px] leading-relaxed text-ink/80"
                              style={{ borderColor: l.accent }}
                            >
                              {q}
                            </blockquote>
                          ))}
                        </div>
                      </div>
                    )}

                    {l.limit && (
                      <div className="rounded-lg border border-clayDeep/25 bg-clay/[0.06] p-5">
                        <span className="font-mono text-[10px] uppercase tracking-kicker text-clayDeep">
                          The limit
                        </span>
                        <p className="mt-2 text-[13px] leading-relaxed text-slate">{l.limit}</p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[13px] leading-relaxed text-muted">
          The braces in a quoted refusal mark a value the platform fills in at the moment it refuses.
          The text around them is the platform's own.
        </p>
      </Section>

      {/* Why a typed record model is what makes a refusal possible */}
      <Section tone="mist">
        <SectionHead
          kicker="Why it matters"
          title="Read a refusal backwards and you arrive at the record model."
          lede={ONTOLOGY_WHY_IT_MATTERS.thesis}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {ANCHORED_REFUSALS.map(({ anchor, pattern }, i) => (
            <Reveal key={anchor.patternId} delay={(i % 2) * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                    {pattern.domain}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{pattern.app}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                  {pattern.title}
                </h3>
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase tracking-kicker" style={{ color: ACCENT }}>
                    The structure it needed
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{anchor.structure}</p>
                </div>
                <div className="mt-5">
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                    Without it
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{anchor.withoutIt}</p>
                </div>
                <Link
                  to="/resources/proof"
                  className="mt-auto pt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep transition-colors hover:text-ink"
                >
                  Read the full pattern <Icon.Arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-slate">
            {ONTOLOGY_WHY_IT_MATTERS.closing}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 max-w-3xl rounded-card border border-line bg-surface p-6">
            <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
              The scope every claim here is held to
            </span>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">{ONTOLOGY_PATH_SCOPE}</p>
          </div>
        </Reveal>
      </Section>

      {/* What this is not, yet */}
      <Section tone="obsidian">
        <SectionHead
          kicker="What this is not, yet"
          title="The parts we have not assembled."
          lede="A name is easy to ship and a structure is not, so this is the section that decides whether the rest of the page is worth reading. Nothing below is a hedge on something above — each one is a thing that does not exist, said in those words."
          dark
          accent={ACCENT}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {ONTOLOGY_NOT_YET.map((n, i) => (
            <Reveal key={n.claim} delay={(i % 2) * 0.04}>
              <div className="flex h-full flex-col rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                <h3 className="font-display text-base font-bold leading-snug text-paper">{n.claim}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/65">{n.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-paper/70">
            We would rather publish this list than let a good name do work it has not earned. The
            argument at the top of the page survives every line of it — the components are real, each
            is named where it actually sits, and the ones standing on the write path are the reason a
            refusal is possible at all.
          </p>
        </Reveal>
      </Section>

      <CTASection
        title="Bring us a write you cannot let an agent make."
        body="Start with one fixed-scope Discovery Sprint. We map the record it would have to create, the structure that write is validated against, and the exact refusal that stands in front of it."
      />
    </>
  );
}
