// pages/ProductPage.tsx — Template A. Renders any 1 Suite product from typed content.
import { useParams, Navigate, Link } from "react-router-dom";
import { products } from "../content/products";
import { productDiagram } from "../lib/diagrams";
import { useSeo, productJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, GovernanceSpine, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage, AbstractHero } from "../components/BrandImage";
import { productImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/products" replace />;

  const diagram = slug ? productDiagram[slug] : undefined;
  const heroImg = slug ? productImage[slug] : undefined;
  const a = product.accent;
  useSeo(product.seo.title, product.seo.description, {
    type: "product",
    jsonLd: productJsonLd(product.name, product.seo.description, `/products/${product.slug}`),
  });

  return (
    <>
      <PageHero
        kicker={`Product · ${product.businessFunction}`}
        accent={a}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/products" label="The 1 Suite" /></div></Reveal>}
        title={product.hero.headline}
        subtitle={product.hero.subhead}
        cta={{
          label: product.hero.primaryCta ?? "Book a demo",
          href: "/contact",
          secondary: product.externalUrl
            ? { label: product.hero.secondaryCta ?? "See it live", href: product.externalUrl, external: true }
            : product.hero.secondaryCta
            ? { label: product.hero.secondaryCta, href: "/contact" }
            : undefined,
        }}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-3xl font-bold" style={{ color: a }}>{product.name}</span>
            <span className="text-slate">·</span>
            <span className="text-slate">{product.tagline}</span>
            {product.status === "live" && <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-green">live</span>}
          </div>
        }
        media={
          heroImg ? (
            <BrandImage src={heroImg} alt={`${product.name} — ${product.tagline}`} accent={a} ratio="card" treatment="duotone" eager className="shadow-lift" />
          ) : (
            <AbstractHero label={product.name} sub={product.businessFunction} accent={a} ratio="card" className="shadow-lift" />
          )
        }
      />

      {/* Problem strip */}
      <section className="border-b border-line bg-obsidian text-paper">
        <div className="shell py-16">
          <Kicker dark accent={a}>The status quo</Kicker>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.problem.map((p, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full rounded-card border border-lineDark bg-white/[0.03] p-5">
                  <span className="font-mono text-xs text-rose">✕</span>
                  <p className="mt-2 text-sm leading-relaxed text-paper/75">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <Section tone="paper">
        <SectionHead kicker="What it does" title={<>The agents inside <span style={{ color: a }} className="font-mono">{product.name}</span>.</>} lede="Each capability is an agent doing real work — grounded in your data, with humans in control." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {product.capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.06}>
              <FeatureCard title={c.title} description={c.description} accent={a} icon={<Icon.Spark className="h-4 w-4" />} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Architecture diagram */}
      {diagram ? (
        <Section tone="mist">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-24">
              <SectionHead kicker="The architecture" title="Five layers, one agentic app." lede="Surfaces, agent workforce, intelligence, integration (MCP), and your data — with governance running the length of the stack." />
              <div className="mt-7"><GovernanceSpine text={product.trust} /></div>
            </div>
            <Reveal>
              <DiagramEmbed src={diagram} title={`${product.name} — agent architecture`} accent={a} caption="From the elan1 diagram library. Click to expand." />
            </Reveal>
          </div>
        </Section>
      ) : (
        <Section tone="mist">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHead kicker="Live now" title={<>See <span className="font-mono" style={{ color: a }}>{product.name}</span> in production.</>} lede="This product runs on its own platform. Explore the live experience, then book a working demo against your data." />
              <div className="mt-7"><GovernanceSpine text={product.trust} /></div>
            </div>
            <Reveal>
              <a href={product.externalUrl} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-card border border-lineDark bg-obsidian p-8 text-paper shadow-lift transition-transform hover:-translate-y-1">
                <span className="font-mono text-sm text-paper/50">{(product.externalUrl ?? "").replace("https://", "")}</span>
                <p className="display mt-4 text-3xl" style={{ color: a }}>{product.name}</p>
                <p className="mt-2 text-paper/70">{product.tagline}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-clay">Visit the live product <Icon.External className="h-4 w-4" /></span>
              </a>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Outcomes + Suite fit */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHead kicker="Outcomes" title="What changes for your team." />
            <div className="mt-8"><TickList items={product.outcomes} accent={a} /></div>
          </div>
          <div>
            <SectionHead kicker="Fits the 1 Suite" title="Stronger together." lede={product.suiteFit} />
            <div className="mt-8 rounded-card border border-line bg-mist/50 p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Integrations · via MCP</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.integrations.map((it) => (
                  <li key={it} className="chip">{it}</li>
                ))}
              </ul>
              <Link to="/products/enterprise1" className="mt-6 inline-block"><span className="link-underline">Standardize on enterprise1 <Icon.Arrow className="h-4 w-4" /></span></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section tone="mist">
        <SectionHead kicker="Pricing" title="Start small. Scale on proof." lede="Illustrative tiers — the right starting point depends on your size and goals. Nothing here is financial advice." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {product.pricingTiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <span className="h-2 w-2 rounded-full" style={{ background: a }} />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{t.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{t.description}</p>
                <Link to="/contact" className="mt-auto pt-6"><span className="link-underline">Get a custom quote <Icon.Arrow className="h-4 w-4" /></span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title={`Put ${product.name} to work.`} body={`Book a working demo and we'll run ${product.name} against your data — with governance on by default.`} />
    </>
  );
}
