// pages/WhatElan1IsNot.tsx — the limits page (/what-elan1-is-not).
//
// WHY IT LOOKS LIKE THIS. Every design decision here is downstream of one judgement: a limits page
// that SHOUTS reads as performance, and a limits page that STATES reads as confidence. So there is
// no alarm styling, no red, no warning iconography and no exclamation anywhere on this page. The
// limits are set in the same type, on the same paper, at the same weight as everything else the
// site publishes — because that is the claim. This is not a disclaimer appended to the marketing;
// it is the marketing.
//
// The layout is a document, not a card grid. Full-width rows separated by hairlines read as a
// statement of record; a three-up grid of tiles reads as nine features, which is the exact wrong
// impression for nine things we cannot do.
//
// COUNTS ARE DERIVED. "Nine limits" and "five refusals" are rendered from NOT_CLAIMS.length and
// DELIBERATE_REFUSALS.length. A hand-typed count on a page about honesty is the one place a stale
// number is unforgivable — and this site has shipped a page that miscounted itself before.
//
// CITATIONS ARE RESOLVED, NOT ASSERTED. The refusal blocks render their proof citations through
// `proofFor()`, so a dangling id renders nothing rather than a dead reference. The line claiming
// every citation resolves is gated on REFUSAL_CITATIONS_RESOLVE — if one ever stops resolving, the
// claim disappears instead of becoming false.
//
// The page ends on an invitation to audit, not on a pitch. There is deliberately no /contact link.
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import {
  NOT_CLAIMS,
  DELIBERATE_REFUSALS,
  IS_NOT_INTRO,
  IS_NOT_CLOSING,
  REFUSAL_CITATIONS_RESOLVE,
  proofFor,
} from "../content/what-elan1-is-not";

// Muted teal. Chosen for what it is NOT: not the rose the governance spine uses (this page is not a
// governance claim), and nothing in the red family (a limit is not an alert).
const PAGE_ACCENT = "#5aa9a0";

const LABEL = "font-mono text-[10px] uppercase tracking-kicker text-muted";

export default function WhatElan1IsNot() {
  useSeo(
    "What elan1 is not — the limits | elan1",
    "The boundaries, stated plainly: no certification held, no named customers, no universal governed write path, no autonomy setting that removes the human approver — and the five things elan1 deliberately refuses to automate.",
    { type: "article", breadcrumbs: [{ name: "Trust", href: "/trust" }] },
  );

  return (
    <>
      <PageHero
        kicker="Trust · Limits"
        accent={PAGE_ACCENT}
        title="What elan1 is not."
        subtitle={IS_NOT_INTRO}
      />

      {/* ——— The limits, as a document ——— */}
      <Section tone="paper">
        <SectionHead
          kicker="The boundaries"
          title={`${NOT_CLAIMS.length} things elan1 is not.`}
          lede="Each one states the boundary first, what stands in its place second, and what the boundary costs you third — in that order, because a limit read after its consolation is not a limit."
        />

        <div className="mt-14 border-t border-line">
          {NOT_CLAIMS.map((c, i) => (
            <Reveal key={c.id} delay={0.04}>
              <article className="grid gap-7 border-b border-line py-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-14">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-xl font-bold leading-snug text-ink">{c.title}</h3>
                  <span className="mt-5 block h-0.5 w-10" style={{ background: c.accent }} aria-hidden />
                </div>

                <div className="space-y-6">
                  <div>
                    <p className={LABEL}>We are not</p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-ink">{c.weAreNot}</p>
                  </div>
                  <div>
                    <p className={LABEL}>What stands there instead</p>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-slate">{c.whatWeAre}</p>
                  </div>
                  {c.why && (
                    <div className="rounded-card border border-line bg-mist/60 p-6">
                      <p className={LABEL}>What that costs</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-slate">{c.why}</p>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ——— What we refuse to automate ——— */}
      <Section tone="mist">
        <SectionHead
          kicker="Deliberate refusals"
          title={`${DELIBERATE_REFUSALS.length} things elan1 refuses to automate.`}
          lede="These are not defaults waiting for an administrator to change them. Each is a refusal raised on the write path, quoted below exactly as the platform raises it — with its placeholders and its lowercase first letter intact, and with what it does not catch stated underneath."
        />

        <div className="mt-12 space-y-5">
          {DELIBERATE_REFUSALS.map((r, i) => {
            const cited = proofFor(r);
            return (
              <Reveal key={r.id} delay={(i % 2) * 0.05}>
                <article className="relative overflow-hidden rounded-card border border-line bg-surface p-7 sm:p-9">
                  <span className="absolute inset-y-0 left-0 w-1" style={{ background: r.accent }} aria-hidden />
                  <div className="pl-2 sm:pl-3">
                    <h3 className="font-display text-xl font-bold text-ink">{r.what}</h3>
                    <p className="mt-3.5 max-w-3xl text-[15px] leading-relaxed text-slate">{r.why}</p>

                    <div className="mt-6 space-y-2.5">
                      <p className={LABEL}>Verbatim, from the write path</p>
                      {r.refusals.map((q) => (
                        <p
                          key={q}
                          className="rounded-lg border border-line bg-paper/70 px-4 py-3 font-mono text-[12.5px] leading-relaxed text-ink"
                        >
                          “{q}”
                        </p>
                      ))}
                    </div>

                    {r.limit && (
                      <div className="mt-6 max-w-3xl border-t border-line pt-5">
                        <p className={LABEL}>What this does not catch</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate">{r.limit}</p>
                      </div>
                    )}

                    {cited.length > 0 && (
                      <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted">
                        Shown before and after as{" "}
                        {cited.map((p, n) => (
                          <span key={p.id}>
                            {n > 0 && (n === cited.length - 1 ? " and " : ", ")}
                            <span className="text-slate">{p.title.toLowerCase()}</span>
                          </span>
                        ))}
                        .
                      </p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {REFUSAL_CITATIONS_RESOLVE && (
          <Reveal delay={0.08}>
            <div className="mt-8 flex items-start gap-3 rounded-card border border-line bg-surface/70 p-6">
              <span className="mt-0.5 shrink-0 text-slate">
                <Icon.Shield className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-slate">
                Every pattern named above resolves to one published on this site — the citations are
                looked up rather than written down, so a reference that stopped resolving would
                disappear from this page rather than survive as a footnote nobody checks.
              </p>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ——— The one thing this page will not do is sell ——— */}
      <Section tone="paper">
        <div className="max-w-3xl">
          <Kicker accent={PAGE_ACCENT}>One more limit, about this page</Kicker>
          <p className="mt-6 text-[15px] leading-relaxed text-slate">
            This page is not exhaustive, and claiming it were would be its own overstatement. It
            collects the limits a buyer asks about early — certification, customers, autonomy,
            coverage, the model layer — and the refusals that are least likely to be volunteered
            elsewhere. Where a specific answer is missing, the honest reading is that nobody has
            asked yet, not that the answer is comfortable.
          </p>
        </div>
      </Section>

      <CTASection
        kicker="Hold us to it"
        title="Tell us where this page is wrong."
        body={IS_NOT_CLOSING}
        primary={{ label: "How we govern", href: "/trust" }}
        secondary={{ label: "The governed patterns", href: "/resources/proof" }}
      />
    </>
  );
}
