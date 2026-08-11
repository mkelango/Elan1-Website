// pages/EngineeringPage.tsx — enterprise readiness, the procurement checklist.
//
// Renders entirely from content/engineering.ts, where every claim carries a platform-code reference
// and every control carries an honest state. Nothing is re-listed here.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  CONTROL_STATES,
  ENGINEERING_GROUPS,
  ENGINEERING_LIMITS,
  ENGINEERING_EVIDENCE,
  ENGINEERING_SEO,
  type ControlState,
} from "../content/engineering";

const ACCENT = "#2f6df0";

const STATE_ORDER: ControlState[] = ["enforced", "declared", "unwired"];

/** Derived, never hand-counted: the heading below states this number. */
const CONTROL_COUNT = ENGINEERING_GROUPS.reduce((n, g) => n + g.controls.length, 0);

/** Muted, non-alarming state chips — the label carries the meaning, not the colour. */
const STATE_STYLE: Record<ControlState, string> = {
  enforced: "border-line bg-mist text-ink",
  declared: "border-line bg-paper text-slate",
  unwired: "border-line bg-paper text-muted",
};

export default function EngineeringPage() {
  useSeo(ENGINEERING_SEO.title, ENGINEERING_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Engineering and enterprise readiness",
      description: ENGINEERING_SEO.description,
      url: "https://elan1.ai/platform/engineering",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Platform · enterprise readiness"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/platform" label="Platform" />
            </div>
          </Reveal>
        }
        title={<>The checklist. <br />Answered, including the gaps.</>}
        subtitle="Identity, tenant isolation, audit immutability, retention and erasure, key management, the API contract, resilience and assurance — each with the state it is actually in. Where something is declared rather than enforced, or built rather than wired, this page says so in those words."
        cta={{
          label: "Talk to engineering",
          href: "/contact",
          secondary: { label: "Read the governance model", href: "/platform/governance" },
        }}
        meta={
          <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">
            Enforced · declared · built-not-wired
          </span>
        }
        media={
          <AbstractHero
            label="controls"
            sub="stated · sourced · checkable"
            accent={ACCENT}
            accent2="#5ad1c0"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* The vocabulary — read this first, it governs every claim below */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Kicker accent={ACCENT}>How to read this page</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              Three states, and we name which one applies.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              Most readiness pages have one state: present. That is how a rule that is implemented but
              never called ends up reading as a rule that is enforced — and a buyer who discovers the
              difference during diligence discounts everything else on the page with it.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              So every control below carries a label. The uncomfortable ones are labelled too, and the
              section after this one collects them in one place rather than scattering them where they
              are easiest to miss.
            </p>
          </div>
          <Reveal>
            <div className="space-y-3">
              {STATE_ORDER.map((s) => (
                <div key={s} className="rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs" style={{ color: ACCENT }}>
                      {CONTROL_STATES[s].label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/65">{CONTROL_STATES[s].note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The limits — deliberately BEFORE the capability list */}
      <Section tone="mist">
        <SectionHead
          kicker="Stated plainly"
          title="What is not true yet."
          lede="These come first because they are the ones a buyer would otherwise have to find. Nothing below contradicts them."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {ENGINEERING_LIMITS.map((l, i) => (
            <Reveal key={l.title} delay={(i % 2) * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-7 shadow-card">
                <h3 className="font-display text-lg font-bold leading-snug text-ink">{l.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The controls — ONE band, the groups as sub-heads inside it.
          This map used to emit one full-width <Section> per group, so a page with four written
          sections rendered twelve bands of identical weight and the reader lost the thread by the
          third. The groups are now sub-heads under a single heading: same controls, same honest
          state chip on every one, one scroll region with a hierarchy. */}
      <Section tone="paper">
        {/* Every number and the list are DERIVED from the roster below — a hand-written “eight
            groups, …” here would drift the moment the content layer gains or drops one. The claim
            "every one with its state named" is about the CONTROLS (a group carries no state), and
            it is structural: `state` is required on EngineeringControl, so a control cannot render
            without one. */}
        <SectionHead
          kicker="The controls"
          title={`${ENGINEERING_GROUPS.length} groups, ${CONTROL_COUNT} controls — every one with its state named.`}
          lede={ENGINEERING_GROUPS.map((g) => g.title).join(" · ")}
        />
        <div className="mt-14 space-y-16">
          {ENGINEERING_GROUPS.map((g, gi) => (
            <div key={g.id} className={gi > 0 ? "border-t border-line pt-14" : undefined}>
              <span className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: ACCENT }}>
                {`${String(gi + 1).padStart(2, "0")} — ${g.id}`}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {g.title}
              </h3>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate">{g.lede}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {g.controls.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 3) * 0.06}>
                    <div className="card card-hover flex h-full flex-col">
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ background: `${ACCENT}1a`, color: ACCENT }}
                        >
                          <Icon.Shield className="h-4 w-4" />
                        </span>
                        <h4 className="font-display text-base font-bold leading-snug text-ink">
                          {c.title}
                        </h4>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-slate">{c.body}</p>
                      <div className="mt-auto pt-5">
                        <span
                          className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-kicker ${STATE_STYLE[c.state]}`}
                        >
                          {CONTROL_STATES[c.state].label}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Evidence you can ask for */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Diligence"
              title="Ask to be shown, not told."
              lede="Every item here maps to a surface that already exists, so a technical review can be a working session rather than a slide read-through."
            />
            <p className="mt-6 text-[15px] leading-relaxed text-slate">
              These controls are not a security module bolted onto the suite — they are the core each
              app is built on. They are operated in{" "}
              <Link to="/platform/enterprise1" className="text-clayDeep hover:underline">
                enterprise1
              </Link>
              , the console an administrator and an auditor both work in, and they exist to protect{" "}
              <Link to="/platform/governance" className="text-clayDeep hover:underline">
                the governance model
              </Link>
              : identity, policy, human approval on a consequential action, then the audit record.
            </p>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7 shadow-card">
              <TickList items={ENGINEERING_EVIDENCE} accent={ACCENT} />
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                If one of these does not behave the way this page describes, that is a finding we want —
                the page is written to be re-checked against the code, not taken on trust.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        kicker="Diligence"
        title="Send us your security questionnaire."
        body="We answer it against the code, mark anything we cannot evidence as unknown rather than filling it in, and give you the file paths behind each answer so your team can check the work."
        primary={{ label: "Talk to engineering", href: "/contact" }}
        secondary={{ label: "Start a Discovery Sprint", href: "/get-started" }}
      />
    </>
  );
}
