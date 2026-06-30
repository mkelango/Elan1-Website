// components/VsBuildersBand.tsx — reusable obsidian cross-link band driving traffic to the
// "Why elan1 vs builders" + "Governance" pages. Drop onto Home / Pricing / overview pages.
import { Link } from "react-router-dom";
import { Reveal, Kicker, Icon } from "./primitives";

export function VsBuildersBand() {
  return (
    <section className="relative overflow-hidden bg-obsidian text-paper">
      <div className="absolute inset-0 bg-grid-obsidian opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -bottom-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(224,101,109,.32), transparent 65%)" }}
      />
      <div className="shell relative grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal><Kicker dark accent="#df8c64">Evaluating agent platforms?</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-4 text-3xl text-paper sm:text-4xl lg:text-[2.7rem]">
              Builder platforms get you a clever agent.<br />We run your business on agents you can trust.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/70">
              Every surface you'd shortlist on — connectors, a visual builder, describe-to-build, an app store,
              voice, multi-model routing. The difference is that all of it is governed, audited, and provable.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/platform/why-elan1" className="btn-accent">
                See it vs builders <Icon.Arrow className="h-4 w-4" />
              </Link>
              <Link to="/platform/governance" className="btn-ghost-dark">
                How governance works
              </Link>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <ul className="grid gap-3">
            {[
              ["Human-in-the-loop", "A person approves every consequential action — from one pane."],
              ["Immutable audit", "Hash-chained + exportable: a receipt a regulator can verify offline."],
              ["Eval-gated", "No passing eval → no Trust Mark → no production."],
              ["Owned data + residency", "Native systems-of-record, RLS isolation, India-first residency."],
            ].map(([t, b]) => (
              <li key={t} className="flex items-start gap-3 rounded-card border border-paper/15 bg-paper/[0.04] p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-rose/20 text-rose">
                  <Icon.Shield className="h-3.5 w-3.5" />
                </span>
                <span>
                  <span className="font-display text-[15px] font-bold text-paper">{t}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-paper/65">{b}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
