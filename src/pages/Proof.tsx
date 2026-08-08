// pages/Proof.tsx — WS2.5: proof & case studies (before → after, with Trust Marks). Illustrative.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { PROOF, INDUSTRIES, TRUST_MARK_NOTE, REGISTERED_AGENT_NOTE, GOVERNED_PATH_SCOPE } from "../content/proof";

export default function Proof() {
  useSeo(
    "Governed workflow patterns | elan1",
    "The shape of a governed workflow, before and after — and the guarantee each one carries — across banking, retail, healthcare, insurance, telecom and manufacturing.",
    { type: "article", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  );
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? PROOF : PROOF.filter((c) => c.industry === filter);

  return (
    <>
      <PageHero
        kicker="Governed patterns"
        accent="#3fae6b"
        title="Before, after — and what the pattern guarantees."
        subtitle="Each pattern below shows the status quo, the governed agentic result, and the guarantee the governance actually gives you — stated as a property of the mechanism, not as an outcome we have measured for you."
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
            mechanisms, not measured results
          </span>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {shown.map((c, i) => (
            <Reveal key={c.id} delay={(i % 2) * 0.06}>
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                {/*
                  The pill is CONDITIONAL, and it was not always.

                  It used to render on every card unconditionally, which meant sixteen patterns each
                  asserted a Trust Mark — while the ids behind them were mostly registered AGENTS,
                  not marked workflows. A green shield on a card the reader cannot verify is a
                  fabricated citation, so the badge now fires only where `trustMark` is actually set,
                  and a card without one says what it is instead of implying what it is not.
                */}
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">{c.industry}</span>
                  {c.trustMark ? (
                    <span
                      title={TRUST_MARK_NOTE}
                      className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/[0.10] px-2.5 py-0.5 font-mono text-[10px] font-medium text-green"
                    >
                      <Icon.Shield className="h-3 w-3" /> Trust Mark
                    </span>
                  ) : (
                    <span
                      title={REGISTERED_AGENT_NOTE}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted"
                    >
                      registered agent
                    </span>
                  )}
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
                  <div className="max-w-md">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-muted">The guarantee</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">{c.guarantee}</p>
                  </div>
                  <span className="shrink-0 pl-4 font-mono text-[11px] text-slate">{c.trustMark}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 rounded-card border border-line bg-mist/50 p-6">
          <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">What "governed" covers here</p>
          <p className="mt-2.5 text-sm leading-relaxed text-slate">{GOVERNED_PATH_SCOPE}</p>
          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-muted">
            These patterns describe mechanisms in the platform, not results measured in a customer
            environment.{" "}
            <Link to="/trust" className="text-clayDeep underline underline-offset-2">How we govern</Link>.
          </p>
        </div>
      </Section>

      <CTASection title="Want proof on your data?" body="A Discovery Sprint ships a real, governed agent against your context — the best case study is your own." />
    </>
  );
}
