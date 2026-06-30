// pages/ServicePage.tsx — Template C. Renders any service pillar from typed content.
import { useParams, Navigate } from "react-router-dom";
import { services } from "../content/services";
import { serviceDiagram } from "../lib/diagrams";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage, AbstractHero } from "../components/BrandImage";
import { serviceImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export default function ServicePage() {
  const { slug } = useParams();
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return <Navigate to="/services" replace />;

  const diagram = slug ? serviceDiagram[slug] : undefined;
  const heroImg = slug ? serviceImage[slug] : undefined;
  const a = svc.accent;
  useSeo(svc.seo.title, svc.seo.description, {
    jsonLd: serviceJsonLd(svc.name, svc.seo.description, `/services/${svc.slug}`),
  });

  return (
    <>
      <PageHero
        kicker={`Service pillar · ${svc.tagline}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/services" label="All pillars" /></div></Reveal>}
        title={svc.promise}
        subtitle={svc.whoFor}
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "Book a demo", href: "/contact" } }}
        meta={<span className="font-mono text-3xl font-bold" style={{ color: a }}>{svc.name}</span>}
        media={
          heroImg ? (
            <BrandImage src={heroImg} alt={svc.tagline} accent={a} ratio="card" treatment="duotone" eager className="shadow-lift" />
          ) : (
            <AbstractHero label={svc.name} sub={svc.tagline} accent={a} ratio="card" className="shadow-lift" />
          )
        }
      />

      {/* Offerings */}
      <Section tone="paper">
        <SectionHead kicker="What we do" title={<>Inside <span className="font-mono" style={{ color: a }}>{svc.name}</span>.</>} lede="The offerings that make up this pillar — each grounded in real delivery on Claude." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {svc.offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 2) * 0.06}>
              <FeatureCard title={o.title} description={o.description} accent={a} icon={<Icon.Layers className="h-4 w-4" />} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Engagement + diagram */}
      <Section tone="mist">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Engagement model" title="How a project runs." lede={svc.engagementModel} />
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Deliverables</p>
              <div className="mt-4"><TickList items={svc.deliverables} accent={a} /></div>
            </div>
            <div className="mt-8 rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Pricing</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{svc.pricingModel}</p>
            </div>
          </div>
          {diagram && (
            <Reveal>
              <div className="lg:sticky lg:top-24">
                <DiagramEmbed src={diagram} title={`${svc.name} — operating architecture`} accent={a} caption="From the elan1 diagram library. Click to expand." />
              </div>
            </Reveal>
          )}
        </div>
      </Section>

      {/* Why elan1 + outcomes */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <Kicker accent={a}>Why elan1</Kicker>
            <p className="display mt-5 text-2xl leading-snug text-ink sm:text-3xl">{svc.whyElan1}</p>
            <div className="mt-8 rounded-card border border-line bg-mist/50 p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Connects to</p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{svc.connectsTo}</p>
            </div>
          </div>
          <div>
            <SectionHead kicker="Outcomes" title="What you walk away with." />
            <div className="mt-8"><TickList items={svc.outcomes} accent={a} /></div>
          </div>
        </div>
      </Section>

      <CTASection title={`Put ${svc.name} to work.`} body={`${svc.tagline} Start with a fixed-scope engagement and a shipped proof.`} />
    </>
  );
}
