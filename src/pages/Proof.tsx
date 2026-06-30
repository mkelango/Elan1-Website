// pages/Proof.tsx — WS2.5: proof & case studies (before → after, with Trust Marks). Illustrative.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { PROOF, INDUSTRIES } from "../content/proof";

export default function Proof() {
  useSeo(
    "Proof & case studies | elan1",
    "Before → after, with Trust Marks: how governed agents change the work across banking, retail, healthcare, insurance, telecom, and manufacturing. Figures are illustrative.",
    { type: "article" },
  );
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROOF : PROOF.filter((c) => c.industry === filter);

  return (
    <>
      <PageHero
        kicker="Proof"
        accent="#3fae6b"
        title="Before, after — and a Trust Mark."
        subtitle="Legacy firms write white papers; we ship proof. Each pattern below shows the status quo, the governed agentic result, and the workflow that earned an assure1 Trust Mark."
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "See a live agent", href: "/demo" } }}
      />

      <Section tone="paper">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                filter === ind ? "border-clayDeep bg-clay/10 text-clayDeep" : "border-line bg-surface text-slate hover:text-ink"
              }`}
            >
              {ind}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] uppercase tracking-wide text-muted">
            figures illustrative · not advice
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {shown.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.06}>
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{c.industry}</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/[0.10] px-2.5 py-0.5 font-mono text-[10px] font-medium text-green">
                    <Icon.Shield className="h-3 w-3" /> Trust Mark
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-ink">{c.title}</h3>
                <p className="mt-1 font-mono text-[11px] text-slate">{c.app}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-line bg-paper/60 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Before</p>
                    <p className="mt-1.5 text-sm text-slate">{c.before}</p>
                  </div>
                  <div className="rounded-lg p-4" style={{ background: `${c.accent}14`, border: `1px solid ${c.accent}40` }}>
                    <p className="font-mono text-[10px] uppercase tracking-wide" style={{ color: c.accent }}>After</p>
                    <p className="mt-1.5 text-sm text-ink">{c.after}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
                  <div>
                    <p className="display text-2xl text-ink">{c.metric}</p>
                    <p className="font-mono text-[11px] text-muted">{c.metricLabel}</p>
                  </div>
                  <span className="font-mono text-[11px] text-slate">{c.trustMark}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Patterns shown are illustrative of the platform's governed approach, not guarantees.{" "}
          <Link to="/trust" className="text-clayDeep underline underline-offset-2">How we govern</Link>.
        </p>
      </Section>

      <CTASection title="Want proof on your data?" body="A Discovery Sprint ships a real, governed agent against your context — the best case study is your own." />
    </>
  );
}
