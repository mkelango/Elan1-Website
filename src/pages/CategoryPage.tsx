// pages/CategoryPage.tsx — one of the five 1 Suite product categories.
// Renders entirely from content/categories.ts + the member apps' own typed content.
import { useParams, Navigate, Link } from "react-router-dom";
import { categoryBySlug, categories, appsOf } from "../content/categories";
import { useSeo } from "../lib/seo";
import { PageHero, Section, GovernanceSpine, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = slug ? categoryBySlug[slug] : undefined;
  const apps = category ? appsOf(category) : [];

  useSeo(category?.seo.title ?? "", category?.seo.description ?? "", {
    jsonLd: category
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seo.description,
          url: `https://elan1.in/products/category/${category.slug}`,
          isPartOf: { "@type": "WebSite", name: "elan1", url: "https://elan1.in" },
          hasPart: apps.map((p) => ({
            "@type": "Product",
            name: p.name,
            description: p.tagline,
            url: `https://elan1.in/products/${p.slug}`,
            brand: { "@type": "Brand", name: "elan1" },
          })),
        }
      : undefined,
  });

  if (!category) return <Navigate to="/products" replace />;
  const a = category.accent;
  const others = categories.filter((c) => c.slug !== category.slug);
  const isCompass = category.slug === "compass1";

  return (
    <>
      <PageHero
        kicker={`Category · ${apps.length} ${apps.length === 1 ? "app" : "apps"}`}
        accent={a}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/products" label="The 1 Suite" />
            </div>
          </Reveal>
        }
        title={category.hero.headline}
        subtitle={category.hero.subhead}
        cta={{
          label: category.hero.primaryCta ?? "Book a demo",
          href: "/contact",
          secondary: { label: "See all five categories", href: "/products" },
        }}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-3xl font-bold" style={{ color: a }}>
              {category.name}
            </span>
            <span className="text-slate">·</span>
            <span className="text-slate">{category.positioning}</span>
          </div>
        }
        media={
          <AbstractHero
            label={category.name}
            sub={category.apps.join(" · ")}
            accent={a}
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* The member apps */}
      <Section tone="paper">
        <SectionHead
          kicker="What's in it"
          title={apps.length === 1 ? "One app." : `${apps.length} apps, one outcome area.`}
          lede={category.positioning}
        />
        <div className={`mt-12 grid gap-4 ${apps.length === 1 ? "sm:grid-cols-1 lg:max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {apps.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <Link
                to={`/products/${p.slug}`}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
                    <span className="font-mono text-base font-semibold text-ink">{p.name}</span>
                  </span>
                  {p.status === "live" && (
                    <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">
                      live
                    </span>
                  )}
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{p.businessFunction}</p>
                <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">{p.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{p.hero.subhead}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                  Explore {p.name} <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The gate — why this grouping exists */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker>Why these are one category</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              Grouped by what the approval gate protects.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              The 1 Suite is not grouped by org chart. It is grouped by the kind of record each app writes, because
              that is what decides where a human has to stand in the loop.
            </p>
          </div>
          <Reveal>
            <div className="rounded-card border border-paper/15 bg-paper/[0.04] p-7">
              <p className="font-mono text-[10px] uppercase tracking-kicker" style={{ color: a }}>
                The gate · {category.gate.kind}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-paper/85">{category.gate.body}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How they compose */}
      <Section tone="paper">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionHead
            kicker="How they compose"
            title={apps.length === 1 ? "Where it sits in the suite." : "They are one category because they share a record."}
            lede=""
          />
          <Reveal>
            <p className="text-[15px] leading-relaxed text-slate">{category.composition}</p>
          </Reveal>
        </div>
      </Section>

      {/* compass1 inside this category — cross-cutting, not a silo */}
      {category.compassNote && (
        <Section tone="mist">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Kicker>Cross-cutting</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                compass1 runs inside {category.name} too.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">
                insight1 and goal1 are their own category, but they are not a silo — they read the systems of record
                the other four categories own.
              </p>
              <Link
                to="/products/category/compass1"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline"
              >
                Explore compass1 <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
            <Reveal>
              <div className="rounded-card border border-line bg-surface p-7 shadow-card">
                <p className="text-[15px] leading-relaxed text-slate">{category.compassNote}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["insight1", "goal1"].map((s) => (
                    <Link
                      key={s}
                      to={`/products/${s}`}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* compass1's own page: state the inverse — it lives in all four */}
      {isCompass && (
        <Section tone="mist">
          <SectionHead
            kicker="Cross-cutting by design"
            title="compass1 is also inside the other four."
            lede="If compass1 reads as a standalone silo, the information architecture is wrong. insight1 serves finance and HR analytics as directly as it serves sales; goal1 watches whichever number the mission is built on."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {others.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.06}>
                <Link
                  to={`/products/category/${c.slug}`}
                  className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                    <span className="font-mono text-base font-semibold text-ink">{c.name}</span>
                  </span>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{c.compassNote}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      {/* Governance signature */}
      <Section tone="paper">
        <GovernanceSpine
          text={`${category.gate.kind}. ${category.gate.body}`}
          label={`${category.name} · governance signature`}
        />
        <Reveal>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Every app in {category.name} runs on{" "}
            <Link to="/products/enterprise1" className="text-clayDeep hover:underline">
              enterprise1
            </Link>
            , the control plane that carries identity, policy, audit and rollout for the whole suite. enterprise1 is
            the backbone the categories stand on — not a sixth category, and not the five bundled together.
          </p>
        </Reveal>
      </Section>

      {/* The other categories */}
      <Section tone="mist">
        <SectionHead kicker="The rest of the suite" title="The other categories." lede="" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 4) * 0.05}>
              <Link
                to={`/products/category/${c.slug}`}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  <span className="font-mono text-sm font-semibold text-ink">{c.name}</span>
                </span>
                <p className="mt-2 text-sm leading-snug text-slate">{c.positioning}</p>
                <p className="mt-3 font-mono text-[11px] text-muted">{c.apps.join(" · ")}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title={`Run ${category.name} on the 1 Suite.`} />
    </>
  );
}
