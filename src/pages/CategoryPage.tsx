// pages/CategoryPage.tsx — one of the five 1 Suite product categories.
// Renders entirely from content/categories.ts + the member apps' own typed content.
import { useParams, Navigate, Link } from "react-router-dom";
import {
  categoryBySlug,
  categories,
  appsOf,
  numberWord,
  sentenceCase,
  categoryStats,
  categoryRefusals,
} from "../content/categories";
import { solutions, solutionsComposing } from "../content/solutions";
import { useSeo } from "../lib/seo";
import { PageHero, Section, GovernanceSpine, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";

export default function CategoryPage() {
  const { slug } = useParams();
  const category = slug ? categoryBySlug[slug] : undefined;
  const apps = category ? appsOf(category) : [];
  // Derived from the member apps, so a category page and a product page cannot disagree.
  const stats = categoryStats(slug ?? "");
  const refusals = categoryRefusals(slug ?? "");

  useSeo(category?.seo.title ?? "", category?.seo.description ?? "", {
    breadcrumbs: [{ name: "Products", href: "/products" }],
    jsonLd: category
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seo.description,
          url: `https://elan1.ai/products/category/${category.slug}`,
          isPartOf: { "@type": "WebSite", name: "elan1", url: "https://elan1.ai" },
          hasPart: apps.map((p) => ({
            "@type": "Product",
            name: p.name,
            description: p.tagline,
            url: `https://elan1.ai/products/${p.slug}`,
            brand: { "@type": "Brand", name: "elan1" },
          })),
        }
      : undefined,
  });

  if (!category) return <Navigate to="/products" replace />;
  const a = category.accent;
  const others = categories.filter((c) => c.slug !== category.slug);
  const isCompass = category.slug === "compass";
  const reach = category.verticalReach ? solutionsComposing(category.verticalReach) : [];
  // DERIVED, not a literal pair — Compass's membership lives in categories.ts and nowhere else.
  const compassApps = appsOf(categoryBySlug.compass);

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

        {/*
          Summed from the member apps in products.ts — see categoryStats(). Never hand-typed: a
          number written here would go stale the first time an app's roster changed, silently,
          because no build step reads prose.
        */}
        {stats.agents > 0 && (
          <Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line sm:grid-cols-4">
              {[
                { v: stats.agents, l: "agents across the category" },
                { v: stats.launchWave, l: "enabled in the launch wave" },
                { v: stats.objectTypes, l: "typed object types owned" },
                { v: stats.skills, l: "reusable skills" },
              ].map((s) => (
                <div key={s.l} className="bg-surface p-5">
                  <dt className="display text-3xl text-ink">{s.v}</dt>
                  <dd className="mt-1 text-sm leading-snug text-muted">{s.l}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
              Agents ship staged rather than all-on: a function outside a tenant's enabled set is
              refused before it acts, and a suspend switch overrides the set entirely. The gap
              between the first two numbers is the control, not a gap in the product.
            </p>
          </Reveal>
        )}

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
                {p.workforce && (
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-kicker text-muted">
                    {p.workforce.registered} agents · {p.workforce.launchWave} on at launch
                    {p.systemOfRecord ? ` · ${p.systemOfRecord.objectTypes} object types` : ""}
                  </p>
                )}
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

        {/*
          The gate described above, evidenced. Collected from the member apps' own refusal strings
          (categoryRefusals) rather than restated here — a paragraph about safety is a claim, and
          the message the system returns when it declines is the proof of it.
        */}
        {refusals.length > 0 && (
          <Reveal>
            <div className="mt-14 border-t border-paper/15 pt-12">
              <p className="font-mono text-[10px] uppercase tracking-kicker" style={{ color: a }}>
                What that gate refuses
              </p>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-paper/70">
                Quoted from the write path of{" "}
                {apps.map((p) => p.name).join(" and ")}. Braces mark values filled in at runtime.
              </p>
              <ul className="mt-7 grid gap-2.5 lg:grid-cols-2">
                {refusals.slice(0, 10).map((r) => (
                  <li
                    key={`${r.app}:${r.refusal}`}
                    className="flex items-start gap-3 rounded-lg border border-paper/15 bg-paper/[0.04] p-4"
                  >
                    <span className="mt-0.5 shrink-0 font-mono text-sm" style={{ color: a }} aria-hidden>✕</span>
                    <span>
                      <code className="font-mono text-[13px] leading-relaxed text-paper/80">{r.refusal}</code>
                      <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-kicker text-paper/35">
                        {r.app}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              {refusals.length > 10 && (
                <p className="mt-5 text-sm leading-relaxed text-paper/50">
                  Ten of {refusals.length} shown. The rest are on each app's own page.
                </p>
              )}
            </div>
          </Reveal>
        )}
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
            {/* DERIVED from each solution's own composedOf — never a hand-written count. A prior
                hand-written claim contradicted the site's own /solutions pages within one click. */}
            {reach.length > 0 && (
              <div className="mt-6 rounded-card border border-line bg-mist/50 p-6">
                <p className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                  Reach across the industry packs
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">
                  {sentenceCase(numberWord(reach.length))} of the {numberWord(solutions.length)} industry packs
                  compose {category.verticalReach} directly.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {reach.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/solutions/${s.slug}`}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      {s.slug}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-muted">
                  Industry packs are configuration, not products — they compose the suite for a sector.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Section>

      {/* compass inside this category — cross-cutting, not a silo */}
      {category.compassNote && (
        <Section tone="mist">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Kicker>Cross-cutting</Kicker>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                Compass runs inside {category.name} too.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-slate">
                insight1 and goal1 are their own category, but they are not a silo — they read the systems of record
                the other four categories own.
              </p>
              <Link
                to="/products/category/compass"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline"
              >
                Explore Compass <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
            <Reveal>
              <div className="rounded-card border border-line bg-surface p-7 shadow-card">
                <p className="text-[15px] leading-relaxed text-slate">{category.compassNote}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {compassApps.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/products/${p.slug}`}
                      className="rounded-full border border-line px-3 py-1 font-mono text-xs text-slate transition-colors hover:border-ink/40 hover:text-ink"
                    >
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Compass's own page: state the inverse — it lives in all four */}
      {isCompass && (
        <Section tone="mist">
          <SectionHead
            kicker="Cross-cutting by design"
            title="Compass is also inside the other four."
            lede="If compass reads as a standalone silo, the information architecture is wrong. insight1 serves finance and HR analytics as directly as it serves sales; goal1 watches whichever number the mission is built on."
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
            <Link to="/platform/enterprise1" className="text-clayDeep hover:underline">
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
