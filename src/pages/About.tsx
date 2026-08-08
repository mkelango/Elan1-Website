// pages/About.tsx — Company · About.
//
// Renders entirely from content/about.ts. Nothing here authors a fact, a count or a claim: the
// page's job is sequence and emphasis, and every string it shows comes from the content layer,
// which in turn imports from newsroom.ts, site.ts, categories.ts and platform-facts.ts.
//
// 🚨 THREE THINGS THIS PAGE DELIBERATELY NO LONGER DOES, AND MUST NOT START DOING AGAIN:
//
//   1. NO PHOTOGRAPH OF PEOPLE. The previous hero rendered a stock image with the alt text "The
//      elan1 team". An image captioned as a team is a headcount claim made in a medium nobody
//      fact-checks, and alt text is copy. The hero is an abstract panel instead.
//   2. NO BIOGRAPHY BEYOND THE SOURCED RECORD. `THE_RECORD` carries the founder's name and the two
//      contact addresses, which is the whole of it. `NOT_PUBLISHED` renders the refusal.
//   3. NO VALUES GRID. Six one-word virtues — one of which promised delivery "in weeks" — were
//      replaced by EDITORIAL_RULES: the same slot, filled with rules that have consequences and a
//      link to the page where each one can be checked.
//
// The page also does not link to Careers or Partners from its body. Both are reachable from the
// Company menu; both currently carry claims this page is written to avoid (regions, team framing),
// and sending a reader straight from "here is what we refuse to state" into them would undo the
// argument. That is a deliberate omission, not an oversight — see the integrator note.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Kicker, Icon } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  ABOUT_SEO,
  ABOUT_HERO,
  ABOUT_DESCRIPTOR,
  ABOUT_BOILERPLATE,
  ABOUT_FACTS,
  ABOUT_FACTS_NOTE,
  THESIS,
  THESIS_ONE_LINE,
  WHAT_FOLLOWS,
  WHAT_FOLLOWS_TITLE,
  REFUSALS_BY_CATEGORY,
  REFUSALS_TITLE,
  REFUSALS_NOTE,
  LAYERS_IN_ORDER,
  LAYERS_LEDE,
  EDITORIAL_RULES,
  EDITORIAL_RULES_TITLE,
  WHAT_WE_ARE_NOT,
  THE_RECORD,
  FOUNDER_NAME,
  NOT_PUBLISHED,
  NOT_PUBLISHED_NOTE,
  NAMING_LEDE,
  NAMING_RULES,
  ABOUT_CTA,
} from "../content/about";

const ACCENT = "#df8c64";

export default function About() {
  useSeo(ABOUT_SEO.title, ABOUT_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About elan1",
      description: ABOUT_SEO.description,
      url: "https://elan1.ai/company/about",
      mainEntity: {
        "@type": "Organization",
        name: "elan1",
        url: "https://elan1.ai",
        description: ABOUT_DESCRIPTOR,
        // The whole of the sourced record. No foundingDate, no numberOfEmployees, no address —
        // structured data is copy, and a search engine repeating an invented figure is worse than
        // a page carrying one.
        founder: { "@type": "Person", name: FOUNDER_NAME },
        email: THE_RECORD.contacts[0].address,
      },
    },
  });

  return (
    <>
      <PageHero
        kicker={ABOUT_HERO.kicker}
        accent={ACCENT}
        title={ABOUT_HERO.title}
        subtitle={ABOUT_HERO.subtitle}
        cta={{
          label: "What is not true yet",
          href: "/platform/engineering",
          secondary: { label: "The governance model", href: "/platform/governance" },
        }}
        meta={
          <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
            {ABOUT_HERO.meta}
          </span>
        }
        media={
          <AbstractHero
            label="the write path"
            sub="propose · evaluate · approve · write · record"
            accent={ACCENT}
            accent2="#e0656d"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* What the company is — the press kit's own words, so the two surfaces cannot diverge */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Kicker accent={ACCENT}>In one sentence</Kicker>
            <p className="display mt-5 text-2xl leading-snug text-ink sm:text-3xl">
              {ABOUT_DESCRIPTOR}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-slate">{ABOUT_BOILERPLATE}</p>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7 shadow-card">
              <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                What has been built
              </span>
              <ul className="mt-5 space-y-3">
                {ABOUT_FACTS.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ACCENT }}
                      aria-hidden
                    />
                    <span className="text-[15px] leading-relaxed text-ink/85">{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {ABOUT_FACTS_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* THE ARGUMENT — the reason the page exists */}
      <Section tone="obsidian">
        <SectionHead
          dark
          accent={ACCENT}
          kicker="Why this company exists"
          title="The gate belongs on the write path."
          lede={THESIS_ONE_LINE}
        />
        <div className="mt-14 space-y-px">
          {THESIS.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.05}>
              <div className="grid gap-5 border-t border-paper/12 py-9 lg:grid-cols-[7rem_1fr] lg:gap-10">
                <span className="font-mono text-sm" style={{ color: ACCENT }}>
                  {m.n}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold leading-snug text-paper sm:text-2xl">
                    {m.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-paper/70">{m.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What the belief forces */}
      <Section tone="paper">
        <SectionHead
          kicker="What follows from it"
          title={WHAT_FOLLOWS_TITLE}
          lede="None of these is an inevitable way to build agentic software. Each is a choice the belief above forces, and each one is checkable rather than characterful."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_FOLLOWS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="card card-hover flex h-full flex-col">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}1a`, color: "#b9603f" }}
                  >
                    <Icon.Shield className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-bold leading-snug text-ink">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The refusals — derived from the product pages, never re-typed here */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <SectionHead
              kicker="The evidence"
              title={REFUSALS_TITLE}
              lede={REFUSALS_NOTE}
            />
          </div>
          <Reveal>
            <div className="space-y-3">
              {REFUSALS_BY_CATEGORY.map((r) => (
                <div key={r.category} className="rounded-card border border-line bg-surface p-6 shadow-card">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-sm font-bold text-ink">{r.category}</span>
                    <span className="font-mono text-xs text-muted">{r.app}</span>
                  </div>
                  <p className="mt-3 font-mono text-[13px] leading-relaxed text-clayDeep">
                    “{r.refusal}”
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-muted">Gate: {r.gate}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The shape of the company — derived from site.ts LAYERS */}
      <Section tone="paper">
        <SectionHead kicker="The shape of it" title="One company, three layers." lede={LAYERS_LEDE} />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {LAYERS_IN_ORDER.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.06}>
              <Link
                to={l.href}
                className="group block h-full rounded-card border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span
                  className="block h-2.5 w-2.5 rounded-full"
                  style={{ background: l.accent }}
                  aria-hidden
                />
                <span className="mt-4 block font-mono text-[11px] uppercase tracking-kicker text-muted">
                  {l.tag}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">{l.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{l.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The values section, written as rules with consequences */}
      <Section tone="mist">
        <SectionHead
          kicker="The standard"
          title={EDITORIAL_RULES_TITLE}
          lede="A values list is unfalsifiable, which is why this slot holds rules instead. Each one has a consequence, each one has already changed a page here, and each one links to somewhere you can check that it was kept."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {EDITORIAL_RULES.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{r.body}</p>
                <Link
                  to={r.href}
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-clayDeep hover:underline"
                >
                  {r.linkLabel} <Icon.Arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What we are not */}
      <Section tone="obsidian">
        <SectionHead
          dark
          accent={ACCENT}
          kicker="Stated plainly"
          title="What elan1 is not."
          lede="Each of these closes an inference a reader would otherwise make for free. Every line is about us — none of them says what anything else does or lacks."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {WHAT_WE_ARE_NOT.map((n, i) => (
            <Reveal key={n.title} delay={(i % 2) * 0.05}>
              <div className="h-full rounded-card border border-paper/15 bg-paper/[0.04] p-7">
                <h3 className="font-display text-base font-bold leading-snug text-paper">{n.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{n.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The record — the whole sourced biography, and the refusal to extend it */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <Kicker accent={ACCENT}>{THE_RECORD.kicker}</Kicker>
            <h2 className="display mt-4 text-3xl text-ink sm:text-4xl">{THE_RECORD.title}</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-slate">{THE_RECORD.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {THE_RECORD.contacts.map((c) => (
                <a
                  key={c.address}
                  href={`mailto:${c.address}`}
                  className="rounded-card border border-line bg-surface px-5 py-4 transition-colors hover:border-ink/25"
                >
                  <span className="block font-mono text-[11px] uppercase tracking-kicker text-muted">
                    {c.label}
                  </span>
                  <span className="mt-1 block text-sm font-medium text-ink">{c.address}</span>
                </a>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-mist p-7">
              <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                What this site will not publish
              </span>
              <ul className="mt-5 space-y-3">
                {NOT_PUBLISHED.map((n) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate/40" aria-hidden />
                    <span className="text-sm leading-relaxed text-slate">{n}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {NOT_PUBLISHED_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The names */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead kicker="The names" title="Why some things end in 1 and some do not." lede={NAMING_LEDE} />
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7 shadow-card">
              <ul className="space-y-3">
                {NAMING_RULES.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-clay/15 text-clayDeep">
                      <Icon.Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[15px] leading-relaxed text-slate">{r}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/company/newsroom"
                className="mt-6 inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm font-medium text-clayDeep hover:underline"
              >
                Brand assets and the press kit <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        kicker={ABOUT_CTA.kicker}
        title={ABOUT_CTA.title}
        body={ABOUT_CTA.body}
        primary={ABOUT_CTA.primary}
        secondary={ABOUT_CTA.secondary}
      />
    </>
  );
}
