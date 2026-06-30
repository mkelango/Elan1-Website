// pages/Glossary.tsx — WS2.5: the agentic vocabulary, defined plainly. Searchable; DefinedTermSet JSON-LD.
import { useMemo, useState } from "react";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { Reveal } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { GLOSSARY } from "../content/glossary";

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
    { type: "article", jsonLd },
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

          <dl className="mt-8 divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
            {terms.map((t, i) => (
              <Reveal key={t.term} delay={Math.min(i, 6) * 0.03} as="div">
                <div id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-display text-base font-bold text-ink">{t.term}</dt>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wide text-muted">{t.category}</span>
                  </div>
                  <dd className="mt-1.5 text-sm text-slate">{t.def}</dd>
                </div>
              </Reveal>
            ))}
            {terms.length === 0 && (
              <p className="p-8 text-center text-sm text-muted">No terms match “{q}”.</p>
            )}
          </dl>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
