// pages/SolutionPage.tsx — Template B. Renders any industry solution from typed content.
import { useParams, Navigate } from "react-router-dom";
import { solutions } from "../content/solutions";
import { solutionDiagram } from "../lib/diagrams";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, GovernanceSpine, ComposedOf, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage } from "../components/BrandImage";
import { solutionImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export default function SolutionPage() {
  const { slug } = useParams();
  const sol = solutions.find((s) => s.slug === slug);
  if (!sol) return <Navigate to="/solutions" replace />;

  const diagram = slug ? solutionDiagram[slug] : undefined;
  const a = sol.accent;
  useSeo(sol.seo.title, sol.seo.description, {
    image: `/img/${sol.slug}.jpg`,
    breadcrumbs: [{ name: "Solutions", href: "/solutions" }],
    jsonLd: serviceJsonLd(`${sol.name} — ${sol.industry}`, sol.seo.description, `/solutions/${sol.slug}`),
  });

  return (
    <>
      <PageHero
        kicker={`Solution · ${sol.industry}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/solutions" label="All solutions" /></div></Reveal>}
        title={sol.tagline}
        subtitle={sol.challenge}
        cta={{ label: `Talk to our ${sol.name} team`, href: "/contact", secondary: { label: "Book a demo", href: "/contact" } }}
        meta={
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-3xl font-bold" style={{ color: a }}>{sol.name}</span>
            <span className="text-slate">composes</span>
            <ComposedOf slugs={sol.composedOf} />
          </div>
        }
        media={
          <BrandImage
            src={solutionImage[sol.slug]}
            alt={`${sol.industry} — agentic transformation by elan1`}
            accent={a}
            ratio="portrait"
            treatment="duotone"
            eager
            className="shadow-lift"
            overlay={
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: a }}>
                  {sol.industry}
                </span>
                <span className="mt-1 font-display text-2xl font-bold text-paper">{sol.name}</span>
              </div>
            }
          />
        }
      />

      {/* The industry's version of the problem — what this pack is built against. */}
      {sol.problem && sol.problem.length > 0 && (
        <Section tone="mist">
          <SectionHead
            kicker="The problem"
            title={`What goes wrong in ${sol.industry.toLowerCase()}.`}
            lede="Not generic digital-transformation pain — the specific failures this pack's write path is built to refuse."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {sol.problem.map((p, i) => (
              <Reveal key={p} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6">
                  <span className="font-mono text-sm font-bold" style={{ color: a }} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-slate">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* WHO / challenge already in hero. WHAT we deploy */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-24 self-start">
            <SectionHead kicker="The elan1 solution" title="What we deploy." lede="An industry pack is configuration over the same built apps — the suite apps it composes, plus the records, agents and guards this industry needs and the others do not." />
            <div className="mt-7 rounded-card border border-line bg-mist/50 p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                Composes {sol.composedOf.length} suite apps
              </p>
              <div className="mt-4"><ComposedOf slugs={sol.composedOf} /></div>
              {sol.composedOfNote && (
                <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-slate">
                  {sol.composedOfNote}
                </p>
              )}
              {sol.ownRecords && sol.ownRecords.length > 0 && (
                <>
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-kicker text-muted">
                    And the records it owns itself
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {sol.ownRecords.map((r) => (
                      <li key={r} className="chip">{r}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
          <div>
            <Kicker accent={a}>Use cases</Kicker>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {sol.useCases.map((u, i) => (
                <Reveal key={u.title} delay={(i % 2) * 0.06}>
                  <FeatureCard title={u.title} description={u.description} accent={a} icon={<Icon.Bolt className="h-4 w-4" />} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/*
          The same pack as one picture. This was its own band with its own heading, which restated
          in prose what the drawing already says — so it closes the section it illustrates instead.
        */}
        {diagram && (
          <div className="mx-auto mt-16 max-w-4xl border-t border-line pt-14">
            <Reveal>
              <DiagramEmbed
                src={diagram}
                title={`${sol.name} — solution map`}
                accent={a}
                caption="WHO we serve, WHAT we deploy, HOW we deliver — and the governance running through it. Click to expand."
              />
            </Reveal>
          </div>
        )}
      </Section>

      {/* Governance signature — the hero of each vertical */}
      <Section tone="obsidian">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Kicker dark accent="#e0656d">The differentiator</Kicker>
            <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">The governance signature.</h2>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">
              In {sol.industry.toLowerCase()}, trust is the product. This is the governance that makes agentic
              deployment safe here — what is enforced on the write path, and what it refuses.
            </p>
            {sol.wedge && (
              <div className="mt-7 rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-paper/40">
                  The one guard this industry needs
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/80">{sol.wedge}</p>
              </div>
            )}
          </div>
          <Reveal>
            <div className="relative overflow-hidden rounded-card border border-rose/30 bg-rose/[0.08] p-7">
              <span className="absolute inset-y-0 left-0 w-1.5 bg-rose" aria-hidden />
              <div className="flex items-center gap-2 pl-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-rose/20 text-rose"><Icon.Shield className="h-4 w-4" /></span>
                <span className="font-mono text-[11px] uppercase tracking-kicker text-rose">{sol.name} governance</span>
              </div>
              <p className="mt-4 pl-2 text-[15px] leading-relaxed text-paper/90">{sol.compliance}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/*
        Regulatory rails, each carrying what the code ACTUALLY does about it.
        The status badge is the point: a regulated buyer's first question is which controls block a
        write and which only inform a person, and a page that blurs the two is the page they stop
        trusting. Publishing the weaker answer next to the stronger one is what makes both credible.
      */}
      {sol.regulatoryRails && sol.regulatoryRails.length > 0 && (
        <Section tone="paper">
          <SectionHead
            kicker="Regulatory rails"
            title="Which controls block a write, and which only inform a person."
            lede="Named rail by rail, because the difference decides whether a control survives an audit — and because a constant named after a regulation is not enforcement of it."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {sol.regulatoryRails.map((r, i) => {
              const tone =
                r.status === "enforced"
                  ? { background: "#7fd58f26", color: "#2f6b3e" }
                  : r.status === "computed"
                    ? { background: "#6c8cf026", color: "#33509e" }
                    : r.status === "modelled"
                      ? { background: "#e3b25c26", color: "#8a6415" }
                      : { background: "#0b122012", color: "#5b6472" };
              return (
                <Reveal key={r.name} delay={(i % 2) * 0.05}>
                  <div className="card h-full">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[17px] font-bold leading-snug text-ink">{r.name}</h3>
                      <span
                        className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-kicker"
                        style={tone}
                      >
                        {r.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate">{r.note}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal>
            <div className="mt-8 rounded-card border border-line bg-mist/50 p-6 text-sm leading-relaxed text-slate">
              <span className="font-semibold text-ink">enforced</span> — a guard on the write path
              refuses the write.{" "}
              <span className="font-semibold text-ink">computed</span> — derived at read as decision
              support: it informs a person and blocks nothing.{" "}
              <span className="font-semibold text-ink">declared</span> — recorded as configuration or
              an audited attestation, with no block of its own.{" "}
              <span className="font-semibold text-ink">modelled</span> — a deterministic adapter or a
              constant table standing in for a live rail.
            </div>
          </Reveal>
        </Section>
      )}

      {/* Refusals, quoted from this pack's write path. */}
      {sol.refusals && sol.refusals.length > 0 && (
        <Section tone="obsidian">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-24">
              <Kicker dark accent={a}>What it refuses</Kicker>
              <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">
                The industry rule, as the system states it.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
                Refusal messages quoted from{" "}
                <span className="font-mono" style={{ color: a }}>{sol.name}</span>'s write path. Braces
                mark values filled in at runtime.
              </p>
              {sol.evals && (
                <div className="mt-7 rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-paper/40">
                    How it is scored
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/75">{sol.evals}</p>
                </div>
              )}
            </div>
            <Reveal>
              <ul className="flex flex-col gap-2.5">
                {sol.refusals.map((r) => (
                  <li key={r} className="flex items-start gap-3 rounded-lg border border-paper/15 bg-paper/[0.04] p-4">
                    <span className="mt-0.5 shrink-0 font-mono text-sm" style={{ color: a }} aria-hidden>✕</span>
                    <code className="font-mono text-[13px] leading-relaxed text-paper/80">{r}</code>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Diagram */}
      {diagram && (
        <Section tone="mist">
          <SectionHead kicker="End-to-end flow" title="The solution, mapped." lede="WHO we serve, WHAT we deploy, HOW we deliver — and the governance running through it." align="center" />
          <div className="mx-auto mt-12 max-w-4xl">
            <Reveal>
              <DiagramEmbed src={diagram} title={`${sol.name} — solution map`} accent={a} caption="From the elan1 diagram library. Click to expand." />
            </Reveal>
          </div>
        </Section>
      )}

      {/* Outcomes + Launchpad */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Outcomes" title="What changes." />
            <div className="mt-8"><TickList items={sol.outcomes} accent={a} /></div>
          </div>
          <div>
            <SectionHead kicker="The Launchpad" title="One flagship workflow, live in 4–6 weeks." lede={sol.starterEngagement} />
            <div className="mt-7"><GovernanceSpine text={sol.pricingNote} label="Pricing · illustrative" /></div>
          </div>
        </div>
      </Section>

      <CTASection
        kicker="Get started"
        title={`Bring agentic transformation to ${sol.industry.toLowerCase()}.`}
        body={`Start with the ${sol.name} Launchpad — one flagship workflow, live and under the governance gates, in 4–6 weeks.`}
        primary={{ label: `Talk to our ${sol.name} team`, href: "/contact" }}
      />
    </>
  );
}
