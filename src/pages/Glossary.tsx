// pages/Glossary.tsx — WS2.5: the agentic vocabulary, defined plainly. Searchable; DefinedTermSet JSON-LD.
import { useMemo, useState } from "react";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { Reveal } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { GLOSSARY, termsBySection, type Term } from "../content/glossary";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "elan1 agentic glossary",
  hasDefinedTerm: GLOSSARY.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.def,
  })),
};

export default function Glossary() {
  useSeo(
    "Glossary — the agentic vocabulary | elan1",
    "Agent, agentic transformation, MCP connector, Skill, Trust Mark, governance signature, human-in-the-loop, residency, wave rollout — the agentic vocabulary, defined plainly.",
    { type: "article", jsonLd, breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  );
  const [q, setQ] = useState("");
  const terms = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = !needle
      ? GLOSSARY
      : GLOSSARY.filter((t) => (t.term + " " + t.def).toLowerCase().includes(needle));
    return [...list].sort((a, b) => a.term.localeCompare(b.term));
  }, [q]);

  return (
    <>
      <PageHero
        kicker="Glossary"
        accent="#22b8c4"
        title="The agentic vocabulary, defined plainly."
        subtitle="Agents, governance, the platform, the go-to-market — the words that matter, without the hype. Search or scan."
      />

      <Section tone="paper">
        <div className="mx-auto max-w-3xl">
          <label className="block">
            <span className="sr-only">Search the glossary</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search terms… (e.g. Trust Mark, residency, Skill)"
              className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-ink outline-none transition focus:border-clayDeep"
            />
          </label>
          <p className="mt-2 font-mono text-[11px] text-muted">
            {terms.length} of {GLOSSARY.length} terms
          </p>

          {/*
            GROUPED BY SECTION, NOT ONE ALPHABETICAL WALL.

            The glossary grew from 22 entries to the full vocabulary the rest of the site now leans
            on. Sorted flat, that is a wall a reader scrolls past — and the sections carry real
            information: they order the terms the way the platform works (the idea → the write path
            → evidence → grounding → rollout → the fabric → tenancy → the suite → working with us),
            so a reader who does not yet know the vocabulary gets a path through it rather than an
            index. termsBySection() is the content layer's own grouping; the page must not re-derive
            one, because a second ordering is a second thing to keep in step.

            While searching, the grouping is dropped: a search result set is not a curriculum.
          */}
          {q.trim() ? (
            <dl className="mt-8 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
              {terms.map((t, i) => (
                <TermRow key={t.term} t={t} i={i} />
              ))}
              {terms.length === 0 && (
                <p className="p-8 text-center text-sm text-muted">No terms match “{q}”.</p>
              )}
            </dl>
          ) : (
            <div className="mt-8 flex flex-col gap-10">
              {termsBySection(terms).map((g) => (
                <section key={g.section}>
                  <div className="flex items-baseline gap-3">
                    <h2 className="font-display text-xl font-bold text-ink">{g.section}</h2>
                    <span className="font-mono text-[11px] text-muted">
                      {g.terms.length} {g.terms.length === 1 ? "term" : "terms"}
                    </span>
                  </div>
                  <dl className="mt-4 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
                    {g.terms.map((t, i) => (
                      <TermRow key={t.term} t={t} i={i} />
                    ))}
                  </dl>
                </section>
              ))}
            </div>
          )}
        </div>
      </Section>

      <CTASection />
    </>
  );
}

/**
 * One term. Extracted so the grouped view and the search view render identically — two copies of
 * this markup is how a badge or a qualifier ends up on one view and not the other.
 */
function TermRow({ t, i }: { t: Term; i: number }) {
  return (
    <Reveal delay={Math.min(i, 6) * 0.03} as="div">
      <div id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-display text-base font-bold text-ink">{t.term}</dt>
          {t.usage && t.usage !== "industry" && (
            <span className="shrink-0 rounded-full bg-mist px-2 py-0.5 font-mono text-[9px] uppercase tracking-kicker text-muted">
              {t.usage === "narrowed" ? "narrower here" : t.usage}
            </span>
          )}
        </div>
        <dd className="mt-1.5 text-sm leading-relaxed text-slate">{t.def}</dd>
        {t.why && <dd className="mt-2 text-sm leading-relaxed text-muted">{t.why}</dd>}
      </div>
    </Reveal>
  );
}
