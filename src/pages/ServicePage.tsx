// pages/ServicePage.tsx — Template C. Renders any pillar from typed content.
//
// There is no /services or /academy section any more. A pillar's canonical URL is /<home>/<slug>,
// derived from its own `home` field — /platform/strategy1, /resources/academy. Mounted under both
// sections, it refuses a slug the other section owns, so a pillar has exactly ONE canonical URL
// and no duplicate-content twin.
import { useParams, Navigate } from "react-router-dom";
import { services, serviceBySlug, servicePath, type ServiceHomeProp } from "../content/services";
import { serviceDiagram } from "../lib/diagrams";
import { useSeo, serviceJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage, AbstractHero } from "../components/BrandImage";
import { serviceImage } from "../content/images";
import { CTASection } from "../components/CTASection";
import NotFound from "./NotFound";

/**
 * Redirects a retired /services/<slug> URL to the pillar's new home.
 * A slug that no longer exists (agency1, retired outright) has no equivalent offering, so it goes
 * to the home page rather than to a lookalike.
 */
export function ServicesRedirect() {
  const { slug } = useParams();
  const svc = serviceBySlug(slug);
  return <Navigate to={svc ? servicePath(svc) : "/"} replace />;
}

export default function ServicePage({ home, slug: fixedSlug }: { home: ServiceHomeProp; slug?: string }) {
  // `fixedSlug` is set when the pillar is mounted on a static route. Resources already owns
  // /resources/insights, /diagrams, /proof, /glossary and /playbooks, so a dynamic /resources/:slug
  // would share a namespace with them; a static mount removes that collision class entirely.
  const { slug: paramSlug } = useParams();
  const slug = fixedSlug ?? paramSlug;
  const svc = serviceBySlug(slug);
  // Hooks must run unconditionally — every early return lives BELOW this call. The not-found branch
  // sets its OWN title here rather than passing "": this effect runs after the child's, so an empty
  // string would clobber NotFound's title and ship a 404 page with a blank <title>.
  useSeo(
    svc ? svc.seo.title : "Page not found | elan1",
    svc ? svc.seo.description : "That page doesn't exist. Browse the platform, the products, or the industry solutions.",
    {
      noindex: !svc,
      jsonLd: svc ? serviceJsonLd(svc.name, svc.seo.description, servicePath(svc)) : undefined,
    },
  );

  // A slug that is not a pillar at all is a genuine 404, not a soft redirect. Bouncing it to
  // /platform would make NotFound unreachable under both sections and serve a soft-404 to crawlers.
  if (!svc) return <NotFound />;
  // Canonicalise BOTH ways a non-canonical URL can reach this page:
  //   1. right slug, wrong section  — /academy/agent1      → /platform/agent1
  //   2. right section, LEGACY slug — /platform/advisory   → /platform/strategy1
  // Case 2 is the easy one to miss: serviceBySlug() resolves legacy slugs, so the pillar is found
  // and `home` matches, and without this check the page would RENDER at the old URL — serving the
  // same content at two addresses, which is the duplicate-content twin this design exists to avoid.
  if (svc.home !== home || svc.slug !== slug) return <Navigate to={servicePath(svc)} replace />;

  const diagram = slug ? serviceDiagram[slug] : undefined;
  const heroImg = slug ? serviceImage[slug] : undefined;
  const a = svc.accent;
  const parent = svc.home === "platform"
    ? { to: "/platform", label: "Platform" }
    : { to: "/resources", label: "Resources" };

  return (
    <>
      <PageHero
        kicker={`${parent.label} pillar · ${svc.tagline}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to={parent.to} label={parent.label} /></div></Reveal>}
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
