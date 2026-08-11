// pages/VerticalsConfigPage.tsx — the composability proof: a vertical is a manifest, not a fork.
//
// Renders entirely from content/verticals-config.ts, where every count and every quoted refusal
// carries a platform-code reference. Nothing is re-listed here.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  PACK_SHAPE,
  PACK_AGGREGATE,
  PACK_ROWS,
  PACK_YAML_EXCERPT,
  REFUSALS,
  VALIDATOR_CHECKS,
  VALIDATOR_LIMITS,
  VERTICALS_CONFIG_SEO,
} from "../content/verticals-config";

const ACCENT = "#7c6cf0";

export default function VerticalsConfigPage() {
  useSeo(VERTICALS_CONFIG_SEO.title, VERTICALS_CONFIG_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Verticals are configuration, not forks",
      description: VERTICALS_CONFIG_SEO.description,
      url: "https://elan1.ai/platform/verticals-are-config",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Platform · the composability proof"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/platform" label="Platform" />
            </div>
          </Reveal>
        }
        title={<>Ten industries. <br />No forked apps.</>}
        subtitle="Banking, healthcare, insurance, real estate, retail, manufacturing, energy, telecom, government, education. Each one is a manifest of between 57 and 116 lines plus a small loader — composing suite apps that were built once and are used unchanged. That is the whole reason the governance story reads the same in all ten."
        cta={{
          label: "Start a Discovery Sprint",
          href: "/get-started",
          secondary: { label: "See the suite", href: "/products" },
        }}
        meta={
          <span className="font-mono text-sm text-muted">
            packs/ · 10 manifests · 745 lines of YAML · 0 forked suite apps
          </span>
        }
        media={
          <AbstractHero
            label="packs/"
            sub="manifest · compose · govern · certify"
            accent={ACCENT}
            accent2="#22b8c4"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* The shape of a pack — and one real one, in the same band. The list of shape facts and the
          artifact were making the same point ("a vertical is a small file") in two consecutive
          layouts; the artifact is the stronger of the two, so it leads and the counts follow it. */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Kicker accent={ACCENT}>The shape</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              A vertical is a file you can read in one sitting.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              Open any of the ten directories and you find the same two things: a{" "}
              <span className="font-mono text-paper/90">pack.yaml</span> declaring which apps the vertical
              composes, its governance signature, its skills, its scoped connectors and its flagship
              workflows — and a small{" "}
              <span className="font-mono text-paper/90">pack.py</span> that points the shared framework at
              that manifest.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              Beside this is one real manifest, comments trimmed and nothing else changed. It composes
              five built apps, carries a four-policy signature scored by a nine-set eval battery, and
              defines two flagship workflows — one driven by its own advisory agent, one by supply1's
              gated reorder agent.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              Note that second workflow. It names{" "}
              <span className="font-mono text-paper/90">supply1.reorder</span> — an agent belonging to a
              suite app, composed by reference. The manufacturing vertical did not get its own copy of
              procurement.
            </p>
          </div>
          <Reveal>
            <div className="overflow-hidden rounded-card border border-paper/15 bg-paper/[0.04] shadow-lift">
              <div className="flex items-center gap-2 border-b border-paper/15 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT }} />
                <span className="font-mono text-[11px] uppercase tracking-kicker text-paper/50">
                  packs/manufacture1/pack.yaml
                </span>
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-[12px] leading-relaxed text-paper/80">
                {PACK_YAML_EXCERPT}
              </pre>
            </div>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PACK_SHAPE.map((s, i) => (
            <Reveal key={s.label} delay={(i % 4) * 0.05}>
              <div className="h-full rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-base font-bold text-paper">{s.label}</span>
                  <span className="ml-auto font-mono text-sm font-semibold" style={{ color: ACCENT }}>
                    {s.value}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">{s.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The aggregate */}
      <Section tone="mist">
        <SectionHead
          kicker="In aggregate"
          title="What the ten packs declare between them."
          lede="Counted from the ten manifests themselves. Every figure here is a sum of what the files say — not a roadmap, not a projection."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PACK_AGGREGATE.map((a, i) => (
            <Reveal key={a.label} delay={(i % 4) * 0.05}>
              <div className="card h-full">
                <span className="font-mono text-3xl font-bold" style={{ color: ACCENT }}>
                  {a.value}
                </span>
                <h3 className="mt-2 font-display text-base font-bold text-ink">{a.label}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-slate">{a.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The ten */}
      <Section tone="paper">
        <SectionHead
          kicker="The ten"
          title="Same framework. Ten different compliance postures."
          lede="The governance signature is the part that differs — and it is a list of names in the manifest, resolved against a shared catalog of policies and eval sets. Each signature line below is quoted from that catalog."
        />
        <div className="mt-12 space-y-4">
          {PACK_ROWS.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.04}>
              <div className="rounded-card border border-line bg-surface p-6 shadow-card">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="font-mono text-base font-semibold text-ink">{p.id}</span>
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                    {p.industry}
                  </span>
                  <span className="ml-auto font-mono text-[11px] text-muted">
                    {p.policies} policies · {p.evals} eval sets · {p.workflows}{" "}
                    {p.workflows === 1 ? "workflow" : "workflows"}
                  </span>
                </div>
                <p className="mt-2 font-display text-lg font-bold leading-snug text-ink">{p.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{p.signature}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                    composes
                  </span>
                  {p.composes.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-slate"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The refusals */}
      <Section tone="obsidian">
        <SectionHead
          kicker="What each one refuses"
          title="The vertical is the refusal."
          lede="Every line below is the platform's own text, returned as the reason a write was refused. They live on the write path in the shared control plane — which is why a vertical can be a manifest and still say no in its own words. The … marks a value computed at the moment of refusal."
          dark
          accent={ACCENT}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {REFUSALS.map((r, i) => (
            <Reveal key={`${r.vertical}-${i}`} delay={(i % 2) * 0.05}>
              <figure className="flex h-full flex-col rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}26`, color: ACCENT }}
                  >
                    <Icon.Shield className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-sm font-semibold text-paper">{r.vertical}</span>
                  <span className="ml-auto font-mono text-[9px] uppercase tracking-kicker text-paper/40">
                    refused
                  </span>
                </div>
                <blockquote className="mt-4 border-l-2 pl-4 font-mono text-[13px] leading-relaxed text-paper/85" style={{ borderColor: ACCENT }}>
                  {r.quote}
                </blockquote>
                <figcaption className="mt-auto pt-4 text-[13px] leading-relaxed text-paper/55">
                  {r.gloss}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What is enforced, and what is not */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card border border-line bg-surface p-7">
              <Kicker accent={ACCENT}>Enforced</Kicker>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">
                What the framework checks at the door.
              </h3>
              <div className="mt-6">
                <TickList items={VALIDATOR_CHECKS} accent={ACCENT} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-card border border-line bg-surface p-7">
              <Kicker accent="#b9603f">Stated, not enforced</Kicker>
              <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink">
                Where the claim needs qualifying.
              </h3>
              <ul className="mt-6 space-y-4">
                {VALIDATOR_LIMITS.map((l) => (
                  <li key={l} className="flex gap-3 text-sm leading-relaxed text-slate">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clayDeep" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                We would rather state this than let “zero forks” do work it has not earned. The
                architectural claim survives the qualification.
              </p>
            </div>
          </Reveal>
        </div>

        {/* The payoff, folded in here rather than given a band of its own: the argument only lands
            once the qualification above has been read. */}
        <Reveal delay={0.1}>
          <div className="mt-14 max-w-3xl border-t border-line pt-10">
            <h3 className="font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              A new industry is a manifest, not a fork.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-slate">
              The reason to care is not that packs are small. It is that there is only one copy of the
              thing that has to be right. When a vertical forks the application, every governance
              guarantee has to be re-proved in that fork — and a fix to an approval gate has to be found
              and re-applied in each one. Here the approval gates, the audit trail, the identity model and
              the eval batteries belong to{" "}
              <Link to="/platform/enterprise1" className="text-clayDeep hover:underline">
                enterprise1
              </Link>
              , the shared control plane, and a pack names which of them apply to it.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-slate">
              That is why the governance story on this site reads identically for a hospital and for a
              distribution utility. It is the same code path, reached through a different manifest —{" "}
              <Link to="/solutions" className="text-clayDeep hover:underline">
                seen from the industry side
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Bring us your industry."
        body="Start with one fixed-scope Discovery Sprint — low-risk and fully credited. We map the highest-value governed workflow and show you exactly what its manifest would declare."
      />
    </>
  );
}
