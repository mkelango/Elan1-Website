// pages/Band.tsx — WS3.2: size-appropriate landing pages (Growth / Scale-up / Enterprise) with a
// band-aware ROI calculator (WS3.1). The band selector routes here.
import { useParams, Navigate, Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { RoiCalculator } from "../components/RoiCalculator";
import { CTASection } from "../components/CTASection";
import { BANDS, bandById } from "../content/bands";

export default function Band() {
  const { band: id } = useParams();
  const band = id ? bandById(id) : undefined;
  if (!band) return <Navigate to="/pricing" replace />;

  useSeo(
    `elan1 for ${band.name} (${band.range}) | Agentic transformation`,
    `${band.tagline} ${band.who} The offering mix, pricing posture, and an illustrative ROI estimate for ${band.name} (${band.range}) companies.`,
  );

  return (
    <>
      <PageHero
        kicker={`For ${band.name} · ${band.range}`}
        accent={band.accent}
        title={band.tagline}
        subtitle={band.who}
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "See a live agent", href: "/demo" } }}
      />

      {/* band selector */}
      <div className="border-b border-line bg-mist/50">
        <div className="shell flex flex-wrap items-center gap-2 py-4">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wide text-muted">Your size:</span>
          {BANDS.map((b) => (
            <Link
              key={b.id}
              to={`/for/${b.id}`}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                b.id === band.id ? "border-clayDeep bg-clay/10 text-clayDeep" : "border-line bg-surface text-slate hover:text-ink"
              }`}
            >
              {b.name} <span className="text-muted">· {b.range}</span>
            </Link>
          ))}
        </div>
      </div>

      <Section tone="paper">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <SectionHead kicker="What fits" title={`The mix for ${band.name}.`} lede="Size-appropriate from day one — start where the value is, expand only on proof." />
            <ul className="mt-8 space-y-4">
              {band.mix.map((m) => (
                <Reveal key={m} as="li">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: `${band.accent}1f`, color: band.accent }}>
                      <Icon.Check className="h-4 w-4" />
                    </span>
                    <span className="text-ink">{m}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8 rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">Pricing posture</p>
              <p className="mt-2 text-sm text-slate">{band.pricing}</p>
              <Link to="/pricing" className="mt-3 inline-block"><span className="link-underline">See the pricing model <Icon.Arrow className="h-4 w-4" /></span></Link>
            </div>
          </div>

          <Reveal>
            <RoiCalculator band={band} />
          </Reveal>
        </div>
      </Section>

      <CTASection
        title={`Ready to become the one — at ${band.name} scale?`}
        body="Start with a fixed-scope Discovery Sprint, fully credited. We ship a working, certified agent in weeks."
      />
    </>
  );
}
