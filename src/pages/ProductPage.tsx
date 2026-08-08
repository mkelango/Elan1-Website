// pages/ProductPage.tsx — Template A. Renders any 1 Suite product from typed content.
import { useParams, Navigate, Link } from "react-router-dom";
import { products } from "../content/products";
import { categoryOfApp, appsOf } from "../content/categories";
import { productDiagram } from "../lib/diagrams";
import { useSeo, productJsonLd } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, GovernanceSpine, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { BrandImage, AbstractHero } from "../components/BrandImage";
import { productImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export default function ProductPage({ slug: fixedSlug }: { slug?: string } = {}) {
  // enterprise1 is the CONTROL PLANE, not one of the five product categories — it belongs to
  // Platform and is mounted there on a static route. Every other product comes from the URL.
  const { slug: paramSlug } = useParams();
  const slug = fixedSlug ?? paramSlug;
  const product = products.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/products" replace />;

  const diagram = slug ? productDiagram[slug] : undefined;
  const heroImg = slug ? productImage[slug] : undefined;
  const a = product.accent;
  // enterprise1 is the backbone, not a category member — it keeps the plain "The 1 Suite" crumb.
  const category = slug ? categoryOfApp[slug] : undefined;
  const siblings = category ? appsOf(category).filter((p) => p.slug !== product.slug) : [];
  useSeo(product.seo.title, product.seo.description, {
    type: "product",
    breadcrumbs: category
      ? [{ name: "Products", href: "/products" }, { name: category.name, href: `/products/category/${category.slug}` }]
      : [{ name: "Platform", href: "/platform" }],
    jsonLd: productJsonLd(product.name, product.seo.description, `/products/${product.slug}`),
  });

  return (
    <>
      <PageHero
        kicker={`Product · ${product.businessFunction}`}
        accent={a}
        eyebrow={
          <Reveal>
            <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Crumb to={product.slug === "enterprise1" ? "/platform" : "/products"} label={product.slug === "enterprise1" ? "Platform" : "The 1 Suite"} />
              {category && (
                <>
                  <span className="font-mono text-xs text-muted">/</span>
                  <Link
                    to={`/products/category/${category.slug}`}
                    className="font-mono text-xs transition-opacity hover:opacity-70"
                    style={{ color: category.accent }}
                  >
                    part of {category.name}
                  </Link>
                </>
              )}
            </div>
          </Reveal>
        }
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
            <AbstractHero label={product.name} sub={product.businessFunction} accent={a} ratio="card" className="shadow-lift" variant="console" />
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

      {/*
        The capability surface, derived from platform code.
        Every block below renders ONLY when its data is present, so a product entry without the
        optional fields degrades to the original page rather than to a row of empty shells.
      */}

      {/* The workforce — roster vs launch wave. Staged enablement is a control, so we publish both. */}
      {product.workforce && (
        <Section tone="obsidian">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <Kicker accent={a}>The workforce</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
                {product.workforce.registered} agents ship.{" "}
                <span style={{ color: a }}>{product.workforce.launchWave} are on at launch.</span>
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{product.workforce.note}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
                That gap is the control, not a gap in the product. Enablement is staged per tenant:
                a function outside the enabled set is refused before it acts, and a suspend switch
                overrides the set entirely.
              </p>
            </div>
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-paper/15">
                <div className="bg-obsidian p-5">
                  <dt className="display text-3xl text-paper">{product.workforce.registered}</dt>
                  <dd className="mt-1 text-sm leading-snug text-paper/60">agents declared</dd>
                </div>
                <div className="bg-obsidian p-5">
                  <dt className="display text-3xl" style={{ color: a }}>{product.workforce.launchWave}</dt>
                  <dd className="mt-1 text-sm leading-snug text-paper/60">enabled in the launch wave</dd>
                </div>
                {product.systemOfRecord && (
                  <div className="bg-obsidian p-5">
                    <dt className="display text-3xl text-paper">{product.systemOfRecord.objectTypes}</dt>
                    <dd className="mt-1 text-sm leading-snug text-paper/60">typed object types it owns</dd>
                  </div>
                )}
                {product.skills && (
                  <div className="bg-obsidian p-5">
                    <dt className="display text-3xl text-paper">{product.skills.count}</dt>
                    <dd className="mt-1 text-sm leading-snug text-paper/60">reusable skills</dd>
                  </div>
                )}
              </dl>
              {product.systemOfRecord && (
                <div className="mt-4 rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-paper/40">
                    Its own system of record
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{product.systemOfRecord.note}</p>
                </div>
              )}
            </Reveal>
          </div>
        </Section>
      )}

      {/* Copilots — in-screen assists, each labelled advisory or gated. */}
      {product.copilots && product.copilots.length > 0 && (
        <Section tone="paper">
          <SectionHead
            kicker="Copilots"
            title="The assists inside the screens."
            lede="Not background agents — panels you work beside. Each one is labelled by what it is allowed to do."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.copilots.map((c, i) => (
              <Reveal key={c.name} delay={(i % 3) * 0.06}>
                <div className="card h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">{c.name}</h3>
                    <span
                      className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-kicker"
                      style={
                        c.mode === "advisory"
                          ? { background: "#0b122010", color: "#5b6472" }
                          : { background: `${a}1f`, color: a }
                      }
                    >
                      {c.mode === "advisory" ? "advisory" : "gated"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{c.does}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Automations — the real triggers, quoted from the agent specs. */}
      {product.automations && product.automations.length > 0 && (
        <Section tone="mist">
          <SectionHead
            kicker="Automations"
            title="What runs on its own, and what starts it."
            lede="Triggers as declared in code — a schedule or a named event, never “continuously”."
          />
          <Reveal>
            <div className="mt-10 overflow-hidden rounded-card border border-line bg-surface">
              {product.automations.map((au, i) => (
                <div
                  key={au.name}
                  className={`grid gap-2 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] sm:gap-6 ${i > 0 ? "border-t border-line" : ""}`}
                >
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink">{au.name}</p>
                    <p className="mt-1.5 inline-block rounded bg-mist px-2 py-0.5 font-mono text-[11px] text-clayDeep">
                      {au.trigger}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate">{au.does}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Refusals — quoted verbatim. The hardest thing on the page to fake. */}
      {product.refusals && product.refusals.length > 0 && (
        <Section tone="obsidian">
          <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-24">
              <Kicker accent={a}>What it refuses</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
                The guardrail, in its own words.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
                These are refusal messages quoted from{" "}
                <span className="font-mono" style={{ color: a }}>{product.name}</span>'s write path — the
                text the system returns when it declines. A refusal you can read is a stronger claim
                than any adjective we could write about safety.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
                Braces mark values filled in at runtime.
              </p>
            </div>
            <Reveal>
              <ul className="flex flex-col gap-2.5">
                {product.refusals.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-3 rounded-lg border border-paper/15 bg-paper/[0.04] p-4"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-sm" style={{ color: a }} aria-hidden>
                      ✕
                    </span>
                    <code className="font-mono text-[13px] leading-relaxed text-paper/80">{r}</code>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Dashboards + tool seams. */}
      {((product.dashboards && product.dashboards.length > 0) ||
        (product.mcpSeams && product.mcpSeams.length > 0)) && (
        <Section tone="paper">
          <div className="grid gap-14 lg:grid-cols-2">
            {product.dashboards && product.dashboards.length > 0 && (
              <div>
                <SectionHead
                  kicker="Dashboards"
                  title="The surfaces you work in."
                  lede="Described by what each one computes, because that is what makes a number defensible."
                />
                <ul className="mt-8 flex flex-col gap-3">
                  {product.dashboards.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: a }} aria-hidden />
                      <span className="text-[15px] leading-relaxed text-slate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.mcpSeams && product.mcpSeams.length > 0 && (
              <div>
                <SectionHead
                  kicker="Tool seams · MCP"
                  title="What it can reach, and how real that is."
                  lede="Each seam is labelled. We would rather tell you a connector is modelled than let you assume it is live."
                />
                <div className="mt-8 flex flex-col gap-3">
                  {product.mcpSeams.map((m) => (
                    <div key={m.name} className="rounded-card border border-line bg-surface p-5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-semibold text-ink">{m.name}</span>
                        <span
                          className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-kicker"
                          style={
                            m.status === "live"
                              ? { background: "#7fd58f26", color: "#3f7a4c" }
                              : m.status === "modelled"
                                ? { background: "#e3b25c26", color: "#8a6415" }
                                : { background: "#0b122010", color: "#5b6472" }
                          }
                        >
                          {m.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate">{m.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  <span className="font-semibold">live</span> — a real connection.{" "}
                  <span className="font-semibold">modelled</span> — a deterministic adapter behind the
                  same interface: real shape, not real data.{" "}
                  <span className="font-semibold">declared</span> — named and scoped, pending
                  credentials and a grant.
                </p>
              </div>
            )}
          </div>
        </Section>
      )}

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
      ) : product.externalUrl ? (
        <Section tone="mist">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHead kicker="Live now" title={<>See <span className="font-mono" style={{ color: a }}>{product.name}</span> in production.</>} lede="Explore the live experience, then book a working demo against your data." />
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
      ) : (
        <Section tone="mist">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHead kicker="Native in the suite" title={<>One platform. <span className="font-mono" style={{ color: a }}>{product.name}</span> runs natively.</>} lede="No bolt-on, no separate app to manage. It runs on the shared enterprise1 core — the same identity, governance, and immutable audit as every other app in the 1 Suite." />
              <div className="mt-7"><GovernanceSpine text={product.trust} /></div>
            </div>
            <Reveal>
              <AbstractHero label={product.name} sub={product.businessFunction} accent={a} ratio="card" variant="console" className="shadow-lift" />
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
              <Link to="/platform/enterprise1" className="mt-6 inline-block"><span className="link-underline">Standardize on enterprise1 <Icon.Arrow className="h-4 w-4" /></span></Link>
            </div>
            {product.crossAppFlows && product.crossAppFlows.length > 0 && (
              <div className="mt-4 rounded-card border border-line bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                  Governed cross-app workflows
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {product.crossAppFlows.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-1 shrink-0" style={{ color: a }} aria-hidden>
                        <Icon.Arrow className="h-3.5 w-3.5" />
                      </span>
                      <span className="text-sm leading-relaxed text-slate">{f}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                  Each leg terminates at the receiving app's own approval gate rather than inheriting
                  the caller's — which is why one app can hand work to another without widening what
                  either is allowed to do.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Category band — where this app sits in the suite */}
      {category && (
        <Section tone="obsidian">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <Kicker>Part of {category.name}</Kicker>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
                {category.positioning}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
                The 1 Suite groups its apps by what the approval gate protects. In {category.name} that gate is{" "}
                <span style={{ color: category.accent }}>{category.gate.kind.toLowerCase()}</span>.
              </p>
              <Link
                to={`/products/category/${category.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
              >
                Explore {category.name} <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
            <Reveal>
              <div className="rounded-card border border-paper/15 bg-paper/[0.04] p-7">
                {siblings.length > 0 ? (
                  <>
                    <p className="font-mono text-[10px] uppercase tracking-kicker text-paper/50">
                      Also in {category.name}
                    </p>
                    <div className="mt-4 space-y-3">
                      {siblings.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/products/${s.slug}`}
                          className="group flex items-start gap-3 rounded-card border border-paper/10 p-4 transition-colors hover:border-paper/30"
                        >
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: s.accent }} />
                          <span>
                            <span className="font-mono text-sm font-semibold text-paper">{s.name}</span>
                            <span className="mt-0.5 block text-sm leading-relaxed text-paper/60">{s.tagline}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[10px] uppercase tracking-kicker text-paper/50">
                      One app, its own category
                    </p>
                    <p className="mt-4 text-[15px] leading-relaxed text-paper/75">{category.composition}</p>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </Section>
      )}

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
