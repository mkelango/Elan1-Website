// pages/Company.tsx — Careers and Partners.
//
// 🚨 TWO SURFACES, ONE FILE — AND THAT IS HOW THE FABRICATED JOBS SURVIVED.
//
// Careers and Partners were rewritten in the same pass by two authors. Both wrote this whole file,
// the second write landed last, and it carried the OLD Careers body — so five invented job
// listings with cities and an Apply button went straight back in behind an honest Partners page,
// and the type-check stayed green because both exports still existed.
//
// If you rewrite one of these surfaces, edit only its own function and its own content file
// (content/careers.ts, content/partners.ts). Do not regenerate this file wholesale.

import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, FeatureCard, TickList, Crumb, GovernanceSpine } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import {
  CAREERS_HERO,
  CAREERS_SEO,
  NO_OPEN_LIST,
  WHAT_THIS_PAGE_WILL_NOT_TELL_YOU,
  REPLY_POSTURE,
  HOW_WE_WORK,
  HOW_WE_WORK_LEDE,
  HOW_WE_WORK_TITLE,
  REFUSALS_LEDE,
  QUOTED_REFUSALS,
  THE_WORK,
  THE_WORK_LEDE,
  LIMITS_LEDE,
  WE_PUBLISH_OUR_LIMITS,
  YOU_WILL_RECOGNISE_THIS,
  READ_THIS_TWICE_IF,
  ACADEMY_NOTE,
  INTRODUCE_LEDE,
  INTRODUCE_ASKS,
  INTRODUCE_NOTE
} from "../content/careers";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import {
  PARTNERS_INTRO,
  PARTNERS_SEO,
  NO_NETWORK_YET,
  PARTNER_TRACKS,
  KIT_REFUSALS,
  KIT_SURFACE_NOTE,
  LIFECYCLE,
  CERTIFICATION_SCOPE_NOTE,
  CERT_REQUIREMENTS,
  CHECKLIST_EMPTY_STATE,
  TALENT,
  TALENT_ANCHOR,
  PARTNER_LIMITS,
  HOW_TO_START,
  WHAT_WE_WILL_NOT_DO
} from "../content/partners";

const CAREERS_ACCENT = "#3fae6b";

const PARTNER_ACCENT = "#7c6cf0";

export function Careers() {
  useSeo(CAREERS_SEO.title, CAREERS_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "Working at elan1",
      description: CAREERS_SEO.description,
      url: "https://elan1.ai/company/careers",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  // The hero's secondary CTA points at a REAL ROUTE, never at "#how-we-work". The version this
  // replaced pointed its hero button at "#roles": PageHero renders a react-router <Link>, a
  // pushState navigation does not scroll to a fragment, and the button therefore did nothing at
  // all. The section id below is kept for deep links but is not advertised by a control.
  return (
    <>
      <PageHero
        kicker={CAREERS_HERO.kicker}
        accent={CAREERS_ACCENT}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/company/about" label="Company" /></div></Reveal>}
        title={CAREERS_HERO.title}
        subtitle={CAREERS_HERO.subtitle}
        cta={{
          label: "Introduce yourself",
          href: "/contact",
          secondary: { label: "How we engineer", href: "/platform/engineering" },
        }}
      />

      {/* The state of hiring — answered first, because it is the first thing a reader wants. */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHead
              kicker="Open roles"
              title={NO_OPEN_LIST.title}
              lede={NO_OPEN_LIST.body}
              accent={CAREERS_ACCENT}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{REPLY_POSTURE}</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                What this page will not tell you
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {WHAT_THIS_PAGE_WILL_NOT_TELL_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-xs text-muted">—</span>
                    <span className="text-[15px] leading-relaxed text-slate">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                None of that is coyness. Every one of them is a figure we would have to invent, and an
                invented sentence on a careers page costs the reader far more than it costs us.{" "}
                <Link to="/contact" className="text-clayDeep hover:underline">Ask us directly</Link>.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The standard — the heart of the page, and the most self-selecting thing on it. */}
      <Section tone="mist" id="how-we-work">
        <SectionHead
          kicker="How the work is done"
          title={HOW_WE_WORK_TITLE}
          lede={HOW_WE_WORK_LEDE}
          accent={CAREERS_ACCENT}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {HOW_WE_WORK.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">{p.title}</h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Quoted refusals — the habit demonstrated rather than asserted. */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker dark accent={CAREERS_ACCENT}>Quoted, never paraphrased</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              What the system says when it says no.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{REFUSALS_LEDE}</p>
          </div>
          <Reveal>
            <ul className="flex flex-col gap-4">
              {QUOTED_REFUSALS.map((r) => (
                <li key={r.quote} className="rounded-card border border-paper/15 bg-paper/[0.04] p-6">
                  <p className="font-mono text-[13px] leading-relaxed text-paper">“{r.quote}”</p>
                  <p className="mt-3 text-sm leading-relaxed text-paper/65">{r.gloss}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* What the work actually is. */}
      <Section tone="paper">
        <SectionHead
          kicker="The work"
          title="Closer to a back office than a chatbot."
          lede={THE_WORK_LEDE}
          accent={CAREERS_ACCENT}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {THE_WORK.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.06}>
              <FeatureCard
                title={w.title}
                description={w.body}
                accent={CAREERS_ACCENT}
                icon={<Icon.Node className="h-4 w-4" />}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The evidence that the habit is real, rather than a claim that it is. */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Stated limits"
              title="The part most companies leave out."
              lede={LIMITS_LEDE}
              accent={CAREERS_ACCENT}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Each of these already appears elsewhere on this site, on the page that sells the thing
                it limits — see{" "}
                <Link to="/platform/engineering" className="text-clayDeep hover:underline">engineering</Link>,{" "}
                <Link to="/trust" className="text-clayDeep hover:underline">trust</Link> and the{" "}
                <Link to="/company/newsroom" className="text-clayDeep hover:underline">newsroom</Link>.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <ul className="flex flex-col gap-4">
                {WE_PUBLISH_OUR_LIMITS.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-xs text-muted">—</span>
                    <span className="text-[15px] leading-relaxed text-slate">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Self-selection, written to be equally useful in both directions. */}
      <Section tone="paper">
        <SectionHead
          kicker="Before you write"
          title="Worth knowing which way this cuts."
          lede="This is a specific way to work. It suits some engineers and irritates others, and we would rather you find that out here than three months in."
          accent={CAREERS_ACCENT}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card border border-line bg-surface p-7">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-md"
                  style={{ background: `${CAREERS_ACCENT}1f`, color: CAREERS_ACCENT }}
                >
                  <Icon.Check className="h-4 w-4" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                  You will recognise the place if
                </span>
              </div>
              <div className="mt-6">
                <TickList items={YOU_WILL_RECOGNISE_THIS} accent={CAREERS_ACCENT} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="h-full rounded-card border border-line bg-mist/70 p-7">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink/[0.06] text-muted">
                  <Icon.Shield className="h-4 w-4" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                  Read it twice if
                </span>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {READ_THIS_TWICE_IF.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-xs text-muted">—</span>
                    <span className="text-[15px] leading-relaxed text-slate">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The introduction — the only process this page describes, described precisely. */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Introduce yourself"
              title="There is nothing to apply to. Write anyway."
              lede={INTRODUCE_LEDE}
              accent={CAREERS_ACCENT}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-muted">{ACADEMY_NOTE}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/resources/academy"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline"
              >
                Read the curriculum <Icon.Arrow className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Useful to send</p>
              <div className="mt-5">
                <TickList items={INTRODUCE_ASKS} accent={CAREERS_ACCENT} />
              </div>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {INTRODUCE_NOTE}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        kicker="Careers"
        title="Tell us what you would want to build."
        body="No roles are listed and no timeline is implied. If what you have read here sounds like how you already work, say so and name the part of the platform you would want to be near — we will tell you honestly whether it exists yet."
        primary={{ label: "Introduce yourself", href: "/contact" }}
        secondary={{ label: "Read about elan1", href: "/company/about" }}
      />
    </>
  );
}

/* ——————————————————————————————————————————————————————————————————————————————————————————————
 * ⚠️ ORIGINAL, UNTOUCHED — see the merge note at the top of this file. A concurrent pass is
 * rewriting this export against a new content/partners.ts. Do not treat the version below as the
 * Careers pass's opinion of the Partners page; it is here so the module compiles.
 * —————————————————————————————————————————————————————————————————————————————————————————————— */

export function Partners() {
  useSeo(PARTNERS_SEO.title, PARTNERS_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "elan1 partner programme",
      description: PARTNERS_SEO.description,
      url: "https://elan1.ai/company/partners",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker={PARTNERS_INTRO.kicker}
        accent={PARTNER_ACCENT}
        eyebrow={<Reveal><div className="mb-5"><Crumb to="/company/about" label="Company" /></div></Reveal>}
        title={PARTNERS_INTRO.title}
        subtitle={PARTNERS_INTRO.lede}
        cta={{
          label: "Start a conversation",
          href: "/contact",
          secondary: { label: "How the governance works", href: "/trust" },
        }}
      />

      {/* The disclosure, then the three shapes. The disclosure is above the tracks on purpose. */}
      <Section tone="paper">
        <Reveal>
          <div className="max-w-3xl rounded-card border border-line bg-mist/70 p-7">
            <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Read this first</p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{NO_NETWORK_YET}</p>
          </div>
        </Reveal>

        <div className="mt-16">
          <SectionHead
            kicker="Three shapes"
            title="Two are software. One is people."
            lede="Which one you are is not a marketing distinction — it decides which door you come through, what gets checked, and what the platform can refuse."
          />
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {PARTNER_TRACKS.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${PARTNER_ACCENT}1a`, color: PARTNER_ACCENT }}
                  >
                    <Icon.Node className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">{t.kind}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{t.body}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {t.mechanisms.map((m) => (
                    <li key={m} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: PARTNER_ACCENT }} aria-hidden />
                      <span className="text-sm leading-relaxed text-slate">{m}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-auto border-t border-line pt-5 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-[11px] uppercase tracking-kicker">Where it stops</span>
                  <span className="mt-2 block">{t.stopsAt}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The door — the refusals, quoted. */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker dark accent={PARTNER_ACCENT}>The door</Kicker>
            <h2 className="display mt-4 text-3xl text-paper sm:text-4xl">
              What the kit refuses, before you build anything.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              These are the platform's own refusal strings, not a summary of them. Each one fires at
              declaration — the point where a submission is written — rather than at review, which is
              the difference between finding out now and finding out after you have built it.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">{KIT_SURFACE_NOTE}</p>
          </div>
          <Reveal>
            <ul className="flex flex-col gap-3">
              {KIT_REFUSALS.map((r) => (
                <li key={r.refusal} className="rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                  <p className="break-words font-mono text-[12.5px] leading-relaxed text-paper/90">
                    “{r.refusal}”
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-paper/55">{r.means}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* The lifecycle. */}
      <Section tone="paper">
        <SectionHead
          kicker="Submit · certify · list · install"
          title="Four steps, and the refusal that guards each one."
          lede="A contribution moves forward only by passing something. Nothing here advances on a status field being set."
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {LIFECYCLE.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-sm" style={{ color: PARTNER_ACCENT }}>{s.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
                {s.refusal && (
                  <p className="mt-auto pt-5">
                    <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">Refused</span>
                    <span className="mt-2 block break-words rounded-lg border border-line bg-mist/70 p-3 font-mono text-[12px] leading-relaxed text-clayDeep">
                      “{s.refusal}”
                    </span>
                  </p>
                )}
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <div className="mt-6 max-w-3xl rounded-card border border-line bg-mist/60 p-7">
            <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
              What “certified” does and does not establish
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{CERTIFICATION_SCOPE_NOTE}</p>
          </div>
        </Reveal>
      </Section>

      {/* The review checklist. */}
      <Section tone="mist">
        <SectionHead
          kicker="The review"
          title="Five requirements that can each go red."
          lede="Every one of them reads a fact that can be absent, and every failure carries its finding — which is why the checklist is published as findings rather than as tick marks."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {CERT_REQUIREMENTS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-ink">{r.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">
                  <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">Reads</span>{" "}
                  {r.reads}
                </p>
                <p className="mt-auto pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">Fails with</span>
                  <span className="mt-2 block break-words rounded-lg border border-line bg-mist/70 p-3 font-mono text-[12px] leading-relaxed text-clayDeep">
                    “{r.finding}”
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-6 max-w-3xl">
            <GovernanceSpine label="And when there is nothing to review" text={CHECKLIST_EMPTY_STATE} />
          </div>
        </Reveal>
      </Section>

      {/* Certified talent — the Resources nav lands here. */}
      <Section tone="paper" id={TALENT_ANCHOR}>
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Certified talent"
              title="A matching mechanism, not a bench."
              lede={TALENT.intro}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="rounded-card border border-line bg-surface p-7">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">The mechanism</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{TALENT.mechanism}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-card border border-clayDeep/30 bg-clay/[0.06] p-7">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-clayDeep">The limit</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{TALENT.limit}</p>
                <p className="mt-5 text-sm leading-relaxed text-slate">
                  The certification paths behind it, what each one attests and what it deliberately
                  does not, are on the{" "}
                  <Link to="/resources/academy/learn" className="text-clayDeep hover:underline">
                    Academy learning hub
                  </Link>
                  , and the programme itself is at{" "}
                  <Link to="/resources/academy" className="text-clayDeep hover:underline">
                    Academy
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* The limits. */}
      <Section tone="mist">
        <SectionHead
          kicker="Honest limits"
          title="What this programme is not, yet."
          lede="Close with a list, not a clean bill. Each of these is something you would find out anyway — better that you read it here."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PARTNER_LIMITS.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.04}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-base font-bold text-ink">{l.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Starting a conversation. */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              kicker="Start here"
              title="What to send, and what happens next."
              lede="There is no application portal and no queue. A partner conversation starts with a person, and the useful version of it starts with the seam."
            />
            <div className="mt-10">
              <TickList items={HOW_TO_START} accent={PARTNER_ACCENT} />
            </div>
            <Reveal>
              <div className="mt-10">
                <Link to="/contact" className="btn-primary">
                  Start a conversation <Icon.Arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.06}>
            <div className="rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                What we will not do
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {WHAT_WE_WILL_NOT_DO.map((w) => (
                  <li key={w} className="flex items-start gap-3">
                    <span className="mt-1 font-mono text-xs text-muted">—</span>
                    <span className="text-[15px] leading-relaxed text-slate">{w}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                None of this is coyness. A partner page that implies a network it does not have costs
                the first real partner the one thing they came for, which is an accurate picture of
                what they are joining.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        kicker="Partners"
        title="Let's find out whether it fits."
        body="Tell us what you build and which seam it touches. We will tell you what the kit refuses before you write it, what certification will ask of you, and what we cannot promise."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "Read the governance", href: "/trust" }}
      />
    </>
  );
}
