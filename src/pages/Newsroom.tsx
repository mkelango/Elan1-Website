// pages/Newsroom.tsx — the press kit.
//
// Renders from content/newsroom.ts; every platform figure resolves from content/platform-facts.ts or
// is summed from the typed content the rest of the site renders. Nothing on this page is typed here.
//
// 🚨 THE ONE RULE FOR EDITING THIS PAGE. Do not render a number without the label that says what it
// counts. The facts strip and the COUNT_GUIDE block below sit in the SAME section on purpose: the
// suite figure (summed from products.ts) and the platform figure (from the registry) are both true
// and count different things, and this is the one page a journalist quotes verbatim. Splitting them
// across two sections is how one of them gets printed bare.
//
// SECTION COUNT. Six bands, down from nine — three pairs that were making one point across two
// layouts were merged, and nothing was dropped: the boilerplate carries the name rules beside it,
// the corrections carry the honest-limits lists under them, and the fact-checking routes carry the
// media contact under them. Every qualifier, refusal and limit that had its own band still renders.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { Logo } from "../components/Logo";
import {
  BOILERPLATE,
  SHORT_DESCRIPTOR,
  TECHNOLOGY_LINE,
  NAME_RULES,
  NAMING_TABLE,
  BRAND_COLOURS,
  TYPOGRAPHY,
  WORDMARK_RULES,
  ASSET_NOTES,
  ATTRIBUTABLE_FACTS,
  COUNT_GUIDE,
  COUNT_GUIDE_NOTE,
  CORRECTIONS,
  WHAT_WE_CANNOT_PROVIDE,
  WHERE_THINGS_STAND,
  VERIFY_ROUTES,
  MEDIA_CONTACT,
  NEWSROOM_SEO,
} from "../content/newsroom";
import { PLATFORM_FACTS, PLATFORM_FACTS_COUNTED_ON } from "../content/platform-facts";

const ACCENT = "#df8c64";

export default function Newsroom() {
  useSeo(NEWSROOM_SEO.title, NEWSROOM_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "elan1 newsroom",
      description: NEWSROOM_SEO.description,
      url: "https://elan1.ai/company/newsroom",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Company · newsroom"
        accent={ACCENT}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/company/about" label="Company" /></div></Reveal>}
        title="Press kit."
        subtitle="Everything a writer needs on deadline: a boilerplate to paste, how the name is written, what to call each part of the platform, the colours and type, the facts you can attribute and which denominator each one belongs to — and a straight answer about what we cannot give you yet."
        cta={{ label: "Contact the team", href: "/contact", secondary: { label: "About elan1", href: "/company/about" } }}
        meta={
          <p className="font-mono text-xs text-muted">
            Media enquiries · <a href={`mailto:${MEDIA_CONTACT.email}`} className="text-clayDeep hover:underline">{MEDIA_CONTACT.email}</a> · facts counted {PLATFORM_FACTS_COUNTED_ON}
          </p>
        }
      />

      {/* Boilerplate + the name — one band: the words to paste, and how to spell the one in them. */}
      <Section tone="paper">
        <SectionHead
          kicker="Boilerplate"
          title="The paragraph to paste, and how to write the name."
          lede="Current as of this page. The one-liner and what it runs on sit under it; the capital letter is the most common error in coverage of a brand like this one."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <blockquote className="rounded-card border border-line bg-surface p-7 text-[15px] leading-relaxed text-ink">
                {BOILERPLATE}
              </blockquote>
            </Reveal>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.06}>
                <div className="h-full rounded-card border border-line bg-mist/60 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">One line</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">{SHORT_DESCRIPTOR}</p>
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="h-full rounded-card border border-line bg-mist/60 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">What it runs on</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink">{TECHNOLOGY_LINE}</p>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.08}>
            <div className="h-full rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">How the name is written</p>
              <div className="mt-5"><TickList items={NAME_RULES} accent={ACCENT} /></div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* What to call things */}
      <Section tone="mist">
        <SectionHead
          kicker="What to call things"
          title="The taxonomy, so the category error does not make print."
          lede="Spelling errors get corrected in the comments. Calling the control plane an app, or the Trust Mark a security certification, changes what the story says. Each row is the sentence we would ask you to run instead."
        />
        <div className="mt-12 grid gap-3">
          {NAMING_TABLE.map((row, i) => (
            <Reveal key={row.term} delay={Math.min(i, 4) * 0.04}>
              <div className="grid gap-4 rounded-card border border-line bg-surface p-6 sm:grid-cols-[0.6fr_1.2fr_1.2fr] sm:gap-6 sm:p-7">
                <p className="font-mono text-sm font-semibold text-clayDeep">{row.term}</p>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Is</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink">{row.is}</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Is not</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate">{row.isNot}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Wordmark + colour + type */}
      <Section tone="paper">
        <SectionHead kicker="Brand assets" title="The mark, the colours, the type." lede="The wordmark is typographic — set in the display face with a clay dot on the 1. Ask us if you need a vector file for print." />
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Wordmark</p>
              <div className="mt-6 flex flex-col gap-5">
                <div className="flex items-center justify-center rounded-lg border border-line bg-paper py-7"><Logo /></div>
                <div className="flex items-center justify-center rounded-lg bg-obsidian py-7"><Logo dark /></div>
              </div>
              <div className="mt-6"><TickList items={WORDMARK_RULES} accent={ACCENT} /></div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Colour</p>
              <ul className="mt-5 space-y-4">
                {BRAND_COLOURS.map((c) => (
                  <li key={c.hex} className="flex items-start gap-3">
                    <span className="mt-0.5 h-8 w-8 shrink-0 rounded-md border border-line" style={{ background: c.hex }} aria-hidden />
                    <span>
                      <span className="block font-mono text-sm font-semibold text-ink">{c.name} <span className="text-muted">{c.hex}</span></span>
                      <span className="mt-0.5 block text-sm leading-snug text-slate">{c.use}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Typography</p>
              <ul className="mt-5 space-y-5">
                {TYPOGRAPHY.map((t) => (
                  <li key={t.role}>
                    <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">{t.role}</span>
                    <p className="mt-1 font-display text-lg font-bold text-ink">{t.face}</p>
                    <p className="mt-1 text-sm leading-snug text-slate">{t.note}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-line pt-6">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Asking for a file</p>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {ASSET_NOTES.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <span className="mt-1 font-mono text-xs text-muted">—</span>
                      <span className="text-sm leading-snug text-slate">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Attributable facts + which number to print */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker accent={ACCENT}>Facts you can attribute</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              Numbers, with where they come from.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              Each of these is counted from the platform's source tree rather than written by hand,
              and each carries its derivation internally. Counted {PLATFORM_FACTS_COUNTED_ON}. If you
              are publishing after that date, ask us to re-run them.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              Some carry a qualifier that has to travel with the number. Where one does, it is
              printed on the tile rather than kept in a footnote you might not run.
            </p>
          </div>
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-paper/15">
              {ATTRIBUTABLE_FACTS.map((f) => {
                const fact = PLATFORM_FACTS[f.key];
                return (
                  <div key={f.key} className="bg-obsidian p-5">
                    <dt className="display text-3xl text-paper">{fact.value}</dt>
                    <dd className="mt-1 text-sm leading-snug text-paper/60">
                      {f.gloss}
                      {f.caveat && (
                        <span className="mt-2 block text-[13px] leading-snug text-clay/85">{f.caveat}</span>
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        {/* The denominator note — deliberately in the same section as the numbers above. */}
        <div className="mt-16 border-t border-lineDark pt-14">
          <div className="max-w-3xl">
            <Kicker dark>Which number to print</Kicker>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-paper sm:text-3xl">
              Two agent counts are both correct. They count different things.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              The product pages add up to one figure and the platform registry reports another. Print
              either one with its denominator attached and you are right; print one bare and you have
              a correction to run.
            </p>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-card bg-paper/15 sm:grid-cols-2">
            {COUNT_GUIDE.map((row) => (
              <div key={row.counts} className="bg-obsidian p-6">
                <p className="display text-4xl text-clay">{row.figure}</p>
                <p className="mt-2 text-[15px] leading-snug text-paper">{row.counts}</p>
                <p className="mt-2.5 text-sm leading-snug text-paper/60">{row.caution}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-paper/70">{COUNT_GUIDE_NOTE}</p>
        </div>
      </Section>

      {/* The corrections, and under them the honest limits — one band, because they are one answer:
          here is the accurate sentence, and here is the thing that does not exist to be given. */}
      <Section tone="mist">
        <SectionHead
          kicker="Corrections"
          title="What we most often have to correct."
          lede="Not a list of don'ts. Each row gives you the sentence that is accurate, so you can run it instead of going to find one."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {CORRECTIONS.map((c, i) => (
            <Reveal key={c.heard} delay={Math.min(i, 3) * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                {/* Labelled as well as struck through: a cropped screenshot of a strikethrough
                    alone would read as the claim rather than as the misquote. */}
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Sometimes written</p>
                <p className="mt-2 text-[15px] font-medium leading-snug text-muted line-through decoration-clay/60 decoration-2">
                  {c.heard}
                </p>
                <div className="mt-4 flex items-start gap-3 border-t border-line pt-4">
                  <span className="mt-0.5 shrink-0 text-clayDeep"><Icon.Check className="h-5 w-5" /></span>
                  <p className="text-[15px] leading-relaxed text-ink">{c.accurate}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The honest limits — kept whole, moved here rather than dropped. */}
        <div className="mt-16 grid gap-12 border-t border-line pt-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker accent={ACCENT}>What we cannot give you</Kicker>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              Straight answers, so you are not left guessing.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-slate">
              You would find this out by asking. Better that it is written down.
            </p>
            <Reveal delay={0.1}>
              <ul className="mt-8 flex flex-col gap-3">
                {WHERE_THINGS_STAND.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-clayDeep"><Icon.Shield className="h-4 w-4" /></span>
                    <span className="text-sm leading-relaxed text-slate">{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <ul className="flex flex-col gap-3">
                {WHAT_WE_CANNOT_PROVIDE.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-xs text-muted">—</span>
                    <span className="text-[15px] leading-relaxed text-slate">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                What we can do is walk you through the platform and show you the governance working —
                the approval gate, the audit chain, and what the system refuses to do.{" "}
                <Link to="/contact" className="text-clayDeep hover:underline">Ask for a walkthrough</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Where to check a claim, and who to ask when reading is not enough — one band. */}
      <Section tone="paper">
        <SectionHead
          kicker="Fact-checking"
          title="Where to check a claim before you print it."
          lede="Every mechanism named on this page is written down somewhere you can read without talking to us first. What is left, put in a mail — the address is below."
        />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {VERIFY_ROUTES.map((r, i) => (
            <Reveal key={r.href} delay={Math.min(i, 3) * 0.04}>
              <Link
                to={r.href}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-kicker text-muted">
                  <Icon.Node className="h-3.5 w-3.5" /> Verify
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{r.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{r.find}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep">
                  Read it <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* The media contact — moved under the fact-checking routes rather than given its own band. */}
        <div className="mt-16 grid gap-12 border-t border-line pt-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <Kicker accent={ACCENT}>Media contact</Kicker>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
              One address, and what to put in it.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-slate">{MEDIA_CONTACT.note}</p>
            <Reveal delay={0.1}>
              <a
                href={`mailto:${MEDIA_CONTACT.email}`}
                className="mt-8 inline-flex flex-col gap-1 rounded-card border border-line bg-surface px-6 py-4 transition-colors hover:border-ink/25"
              >
                <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">Media enquiries</span>
                <span className="font-mono text-base font-semibold text-ink">{MEDIA_CONTACT.email}</span>
              </a>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-7">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Include</p>
                <div className="mt-3"><TickList items={MEDIA_CONTACT.include} accent={ACCENT} /></div>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">On the record</p>
              <ul className="mt-5 flex flex-col gap-5">
                {MEDIA_CONTACT.onRecord.map((o) => (
                  <li key={o.topic}>
                    <p className="text-[15px] leading-snug text-ink">{o.topic}</p>
                    <p className="mt-1 text-sm leading-snug text-muted">{o.who}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-line pt-5 text-sm leading-relaxed text-slate">
                {MEDIA_CONTACT.cannot}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        kicker="Media"
        title="Working on a story?"
        body="Tell us the angle and the deadline and we will get you the right person — engineering, governance, or the founder. If a claim on this site does not hold up, we would rather hear it from you than read it."
        primary={{ label: "Contact the team", href: "/contact" }}
        secondary={{ label: "Read about elan1", href: "/company/about" }}
      />
    </>
  );
}
