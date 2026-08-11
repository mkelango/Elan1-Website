// pages/ComparePage.tsx — Template E. Renders any head-to-head comparison from typed content.
//
// WHY THE LAYOUT IS SHAPED THIS WAY. `whereTheyLead` gets a full section with its own SectionHead
// and its own tone, before the limits and before the proof — not a footnote under the table. A
// comparison page whose concessions are visually smaller than its claims reads as marketing to
// exactly the reader it is written for, and a technical buyer discounts the whole page the moment
// they notice. The disclosure renders on every entry for the same reason: this is the one page
// where half of every claim is about someone else, and a reader has no way to check that half.
//
// The dimensions table scrolls inside its own container rather than letting the page scroll
// sideways, and collapses to stacked cards below `lg` — the rows are prose, not numbers.
import { useParams, Navigate, Link } from "react-router-dom";
import {
  COMPARISONS,
  comparisonBySlug,
  proofPattern,
  COMPARE_DISCLOSURE,
  COMPARE_ASSESSED_ON,
  DEFAULT_COMPARISON_SLUG,
} from "../content/compare";
import { GOVERNED_PATH_SCOPE } from "../content/proof";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, GovernanceSpine, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";

export default function ComparePage() {
  const { slug } = useParams();
  const found = slug ? comparisonBySlug[slug] : undefined;

  // Hooks run unconditionally: resolve to the default entry for the SEO call, then redirect. The
  // sibling templates return <Navigate> before useSeo, which works because a route change unmounts
  // — this ordering just removes the hazard rather than relying on it.
  const cmp = found ?? comparisonBySlug[DEFAULT_COMPARISON_SLUG];
  const a = cmp.accent;

  useSeo(cmp.seo.title, cmp.seo.description, {
    breadcrumbs: [{ name: "Proof", href: "/resources/proof" }],
    jsonLd: serviceJsonLd(
      `elan1 compared with ${cmp.name}`,
      cmp.seo.description,
      `/compare/${cmp.slug}`,
    ),
  });

  if (!found) return <Navigate to={`/compare/${DEFAULT_COMPARISON_SLUG}`} replace />;

  const others = COMPARISONS.filter((c) => c.slug !== cmp.slug);

  return (
    <>
      <PageHero
        kicker={`Compare · ${cmp.category}`}
        accent={a}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/resources/proof" label="Proof & governed patterns" />
            </div>
          </Reveal>
        }
        title={cmp.headline}
        subtitle={cmp.subhead}
        cta={{
          label: "Ask us to raise the refusal",
          href: "/contact",
          secondary: { label: "See the governed patterns", href: "/resources/proof" },
        }}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm font-semibold text-ink">elan1</span>
            <span className="text-slate">compared with</span>
            <span className="font-mono text-lg font-bold" style={{ color: a }}>
              {cmp.name}
            </span>
          </div>
        }
      />

      {/* The two models, side by side. Theirs first — stated fairly, in their own architecture's terms. */}
      <Section tone="paper">
        <SectionHead
          kicker="The two models"
          title="What each one actually is."
          lede="Stated from their published architecture, not from a feature grid. If a sentence in the left-hand column would make someone who works there wince, it is wrong and we want to know."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card border border-line bg-mist/50 p-7">
              <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                Their model
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold" style={{ color: a }}>
                {cmp.name}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-slate">{cmp.theirModel}</p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-card border border-rose/30 bg-rose/[0.05] p-7">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-rose" aria-hidden />
              <div className="pl-2">
                <span className="font-mono text-[11px] uppercase tracking-kicker text-rose">
                  Our model
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink">elan1</h3>
                <p className="mt-5 text-[15px] leading-relaxed text-ink/85">{cmp.ourModel}</p>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-slate">
            The line under every row below: most agent platforms govern <em>the call</em> — may this
            agent invoke this operation, on this connector, with this scope. elan1 enforces that too.
            It is not the same control as governing <em>the write</em> — may this change land in this
            system of record, and who said so. An agent's tool call is one path into a record; a
            person in a screen is another; a sibling application is a third. A control at the write is
            the one all three share.
          </p>
        </Reveal>
      </Section>

      {/*
        The dimensions. Scrolls inside its own container; stacks below lg.

        THE AXIS COUNT IS DERIVED, NOT TYPED. The first draft of this lede read "six or seven axes":
        every entry carries seven rows and build-it-yourself carries eight, so the page miscounted
        itself — on the one page whose whole argument is that a number should come from the thing it
        describes. `cmp.dimensions.length` cannot drift from the rows rendered underneath it.
      */}
      <Section tone="mist">
        <SectionHead
          kicker="Dimension by dimension"
          title="Where the record lives, and what stands in front of it."
          lede={`${cmp.dimensions.length} axes, each one a question a buyer is actually asking. The left column describes their architecture; the right names the mechanism on ours, with its stated limit where there is one.`}
        />

        {/* Table at lg and up. */}
        <div className="mt-12 hidden overflow-x-auto rounded-card border border-line bg-surface lg:block">
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-mist/60">
                <th className="w-[18%] px-6 py-4 font-mono text-[11px] uppercase tracking-kicker text-muted">
                  Dimension
                </th>
                <th className="w-[41%] px-6 py-4 font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>
                  {cmp.name}
                </th>
                <th className="w-[41%] px-6 py-4 font-mono text-[11px] uppercase tracking-kicker text-rose">
                  elan1
                </th>
              </tr>
            </thead>
            <tbody>
              {cmp.dimensions.map((d) => (
                <tr key={d.dim} className="border-b border-line last:border-b-0 align-top">
                  <th scope="row" className="px-6 py-6 text-left font-display text-[15px] font-bold text-ink">
                    {d.dim}
                  </th>
                  <td className="px-6 py-6 text-sm leading-relaxed text-slate">{d.them}</td>
                  <td className="bg-rose/[0.035] px-6 py-6 text-sm leading-relaxed text-ink/85">{d.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stacked cards below lg. */}
        <div className="mt-12 grid gap-4 lg:hidden">
          {cmp.dimensions.map((d, i) => (
            <Reveal key={d.dim} delay={(i % 2) * 0.05}>
              <div className="rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-[17px] font-bold text-ink">{d.dim}</h3>
                <div className="mt-4">
                  <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>
                    {cmp.name}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{d.them}</p>
                </div>
                <div className="mt-5 border-t border-line pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-kicker text-rose">elan1</span>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85">{d.us}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/*
        THE CONCESSIONS — a full section, deliberately given the same weight as the table above it.
        See the note at the head of this file for why this is not a footnote.
      */}
      <Section tone="paper">
        <SectionHead
          kicker="Where they lead"
          title={`What ${cmp.name} does better than us.`}
          lede="Not a courtesy paragraph. These are the reasons a well-run evaluation lands on them, written so their own product marketing could quote them back without correction."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {cmp.whereTheyLead.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.06}>
              <FeatureCard
                title={s.title}
                description={s.body}
                accent={a}
                icon={<Icon.Check className="h-4 w-4" />}
              />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 rounded-card border-2 border-dashed p-7" style={{ borderColor: `${a}55` }}>
            <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>
              Choose them, not us, if…
            </span>
            <p className="mt-3 max-w-3xl text-lg leading-relaxed text-ink">{cmp.whenToPickThem}</p>
          </div>
        </Reveal>
      </Section>

      {/* Our limits — on obsidian, because it should be the hardest section on the page to skim past. */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24">
            <Kicker dark accent="#e0656d">Our limits</Kicker>
            <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">
              What elan1 does not have against {cmp.name}.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              A clean bill is unfalsifiable, and it discounts everything above it the moment a reader
              finds one thing it missed — which they will, because they are reading adversarially and
              we were not. So the open items are named.
            </p>
          </div>
          <Reveal>
            <ul className="flex flex-col gap-2.5">
              {cmp.ourLimits.map((l) => (
                <li
                  key={l}
                  className="flex items-start gap-3 rounded-lg border border-paper/15 bg-paper/[0.04] p-4"
                >
                  <span className="mt-0.5 shrink-0 font-mono text-sm text-rose" aria-hidden>
                    !
                  </span>
                  <span className="text-[15px] leading-relaxed text-paper/80">{l}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-card border border-paper/15 bg-paper/[0.04] p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-paper/40">
                The scope every claim on this page sits inside
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">{GOVERNED_PATH_SCOPE}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Proof points — each anchored to a mechanism, and linked to its pattern only when it resolves. */}
      <Section tone="mist">
        <SectionHead
          kicker="What we can show you"
          title="The mechanism, and the refusal it raises."
          lede="Each of these is a guard on the write path, quoted as the system states it. Braces mark values filled in at runtime. Ask any vendor on your shortlist, including this one, to raise the refusal rather than describe the policy."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {cmp.proofPoints.map((p, i) => {
            const pattern = proofPattern(p.patternId);
            return (
              <Reveal key={p.title} delay={(i % 2) * 0.05}>
                <div className="card h-full">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: `${a}1a`, color: a }}
                    >
                      <Icon.Shield className="h-4 w-4" />
                    </span>
                    <h3 className="font-display text-[17px] font-bold leading-snug text-ink">
                      {p.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate">{p.body}</p>
                  {pattern && (
                    <Link
                      to="/resources/proof"
                      className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 font-mono text-xs text-muted transition-colors hover:text-ink"
                    >
                      <Icon.Node className="h-3.5 w-3.5" /> Governed pattern: {pattern.title}
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* The disclosure + the other comparisons. */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHead kicker="How this page was written" title="What we know, and what we cannot." />
            <div className="mt-8">
              <GovernanceSpine
                text={COMPARE_DISCLOSURE}
                label={`Comparison disclosure · assessed ${COMPARE_ASSESSED_ON}`}
              />
            </div>
          </div>
          <div>
            <Kicker accent={a}>Other comparisons</Kicker>
            <ul className="mt-6 flex flex-col gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/compare/${o.slug}`}
                    className="group block rounded-card border border-line bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                      {o.category}
                    </span>
                    <span
                      className="mt-2 flex items-center gap-2 font-display text-lg font-bold"
                      style={{ color: o.accent }}
                    >
                      elan1 vs {o.name}
                      <Icon.Arrow className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTASection
        kicker="Evaluate us properly"
        title="Bring the hardest write you have."
        body={`The useful evaluation is not a feature grid. Name the change you would never let an agent make unsupervised — the payment, the price, the clinical note, the purchase order — and we will show you the gate in front of it and the refusal it raises. If ${cmp.name} is the better answer for you, this page has already told you when.`}
        primary={{ label: "Book a governed-write demo", href: "/contact" }}
        secondary={{ label: "See the governed patterns", href: "/resources/proof" }}
      />
    </>
  );
}
