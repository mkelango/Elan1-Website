// pages/Contact.tsx — Company · contact, and the Discovery Sprint on-ramp.
//
// Renders from content/contact.ts. Read the header of that file before editing a string here: it
// holds the list of things this page may never say, and three of them were on this page until today
// — a one-business-day reply, five regional teams it invented, and a certified agent "in weeks".
//
// The page's job is not persuasion, it is sequence: what happens next, in what order, what to bring,
// and what we will not have when you ask for it.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { Section } from "../components/blocks";
import { SectionHead, Reveal, Kicker, Icon } from "../components/primitives";
import { REGIONS, BRAND } from "../content/site";
import { SITE_REGIONS } from "../lib/region";
import { submitLead, type LeadReceipt } from "../lib/lead";
import {
  CONTACT_SEO,
  CONTACT_HERO,
  HERO_POINTS,
  HERO_CHIPS,
  WHAT_HAPPENS_NEXT,
  ON_RAMP,
  WHAT_TO_BRING,
  NOT_ON_OFFER,
  ANSWERS_WITHOUT_US,
  OTHER_DOORS,
  EMAIL_ROUTES,
  SEGMENT_OPTIONS,
  CONTACT_INTERESTS,
  interestById,
  FORM_COPY,
  CONFIRMATION,
} from "../content/contact";

const ACCENT = "#df8c64";

/**
 * The compliance note for a region, resolved from lib/region.ts — the file that already had to be
 * corrected once for claiming "data resident in <region>" against a platform that runs single-region
 * with residency declared rather than enforced. The ROSTER is REGIONS from content/site.ts, and a
 * region with no matching note renders no note at all: a missing string must never become a
 * confident one.
 */
const regionNote = (label: string): string =>
  SITE_REGIONS.find((r) => r.label === label)?.compliance ?? "";

export default function Contact() {
  useSeo(CONTACT_SEO.title, CONTACT_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact elan1",
      description: CONTACT_SEO.description,
      publisher: {
        "@type": "Organization",
        name: "elan1",
        url: "https://elan1.ai",
        email: BRAND.email,
      },
    },
  });

  // `receipt` replaces the old boolean `sent`. What the success state may say is derived from what
  // actually happened to the record, never from the fact that a submit handler ran.
  const [receipt, setReceipt] = useState<LeadReceipt | null>(null);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    segment: SEGMENT_OPTIONS[0],
    interestId: CONTACT_INTERESTS[0].id,
    region: REGIONS[0],
    message: "",
  });

  const interest = interestById(form.interestId);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError(FORM_COPY.consentError);
      return;
    }
    setBusy(true);
    try {
      // consent-gated; no PII in the URL (POST body / local capture).
      const r = await submitLead(
        {
          name: form.name,
          company: form.company,
          email: form.email,
          segment: form.segment,
          interest: interest.label,
          region: form.region,
          message: form.message,
        },
        consent,
      );
      setReceipt(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : FORM_COPY.genericError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* ——— Hero + form ——— */}
      <section id="start" className="relative overflow-hidden border-b border-line bg-paper">
        <div className="absolute inset-0 bg-grid-paper opacity-50" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${ACCENT}33, transparent 65%)` }}
        />
        <div className="shell relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left: what this is */}
          <div>
            <Reveal>
              <Kicker accent={ACCENT}>{CONTACT_HERO.kicker}</Kicker>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">{CONTACT_HERO.title}</h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede mt-6 max-w-lg">{CONTACT_HERO.lede}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-9 space-y-4">
                {HERO_POINTS.map((p) => (
                  <li key={p.title} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/15 text-clayDeep">
                      <Icon.Check className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block font-display font-bold text-ink">{p.title}</span>
                      <span className="block text-sm leading-relaxed text-slate">{p.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 rounded-card border border-line bg-surface p-6">
                <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">
                  Reach us without the form
                </p>
                <ul className="mt-4 space-y-2.5">
                  {EMAIL_ROUTES.map((r) => (
                    <li key={r.address} className="text-sm">
                      <a
                        href={`mailto:${r.address}`}
                        className="font-mono font-semibold text-clayDeep underline underline-offset-2"
                      >
                        {r.address}
                      </a>
                      <span className="ml-2 text-slate">{r.body}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-6 flex flex-wrap gap-2">
                {HERO_CHIPS.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: the form */}
          <Reveal delay={0.1}>
            <div className="rounded-card border border-line bg-surface p-7 shadow-lift sm:p-9">
              {receipt ? (
                <div className="flex min-h-[420px] flex-col justify-center">
                  {receipt.delivered ? (
                    <>
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green">
                        <Icon.Check className="h-7 w-7" />
                      </span>
                      <h2 className="display mt-5 text-2xl text-ink">
                        {CONFIRMATION.heading(form.name.trim().split(" ")[0] ?? "")}
                      </h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-slate">{interest.routed}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{FORM_COPY.noTiming}</p>
                      <Link
                        to={interest.meanwhile.href}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep underline underline-offset-2"
                      >
                        {interest.meanwhile.label} <Icon.Arrow className="h-4 w-4" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose/15 text-rose">
                        <Icon.Shield className="h-7 w-7" />
                      </span>
                      <h2 className="display mt-5 text-2xl text-ink">{CONFIRMATION.undeliveredHeading}</h2>
                      <p className="mt-4 text-[15px] leading-relaxed text-slate">{CONFIRMATION.undelivered}</p>
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-clayDeep underline underline-offset-2"
                      >
                        {BRAND.email} <Icon.Arrow className="h-4 w-4" />
                      </a>
                    </>
                  )}
                  <button onClick={() => setReceipt(null)} className="btn-ghost mt-8 self-start">
                    {CONFIRMATION.another}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink">{FORM_COPY.heading}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate">{FORM_COPY.intro}</p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={FORM_COPY.labels.name}>
                      <input required value={form.name} onChange={set("name")} className="inp" placeholder="Your name" />
                    </Field>
                    <Field label={FORM_COPY.labels.company}>
                      <input required value={form.company} onChange={set("company")} className="inp" placeholder="Company" />
                    </Field>
                  </div>

                  <Field label={FORM_COPY.labels.email}>
                    <input required type="email" value={form.email} onChange={set("email")} className="inp" placeholder="you@company.com" />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={FORM_COPY.labels.segment}>
                      <select value={form.segment} onChange={set("segment")} className="inp">
                        {SEGMENT_OPTIONS.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label={FORM_COPY.labels.interest}>
                      <select value={form.interestId} onChange={set("interestId")} className="inp">
                        {CONTACT_INTERESTS.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label={FORM_COPY.labels.region} note={FORM_COPY.regionNote}>
                    <select value={form.region} onChange={set("region")} className="inp">
                      {REGIONS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                    {regionNote(form.region) && (
                      <span className="mt-1.5 block font-mono text-[11px] text-muted">{regionNote(form.region)}</span>
                    )}
                  </Field>

                  <Field label={FORM_COPY.labels.message}>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={4}
                      className="inp resize-none"
                      placeholder={FORM_COPY.messagePlaceholder}
                    />
                  </Field>

                  <label className="flex items-start gap-2.5 text-sm text-slate">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-clayDeep"
                    />
                    <span>
                      {FORM_COPY.consent}{" "}
                      <Link to="/trust" className="text-clayDeep underline underline-offset-2">
                        How we handle data
                      </Link>
                      .
                    </span>
                  </label>

                  {error && (
                    <p role="alert" className="rounded-lg border border-rose/40 bg-rose/[0.07] px-3 py-2 text-sm text-rose">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                    {busy ? FORM_COPY.busyLabel : FORM_COPY.submitLabel} <Icon.Arrow className="h-4 w-4" />
                  </button>
                  <p className="text-xs leading-relaxed text-muted">{FORM_COPY.privacyFootnote}</p>
                  <p className="text-xs leading-relaxed text-muted">{FORM_COPY.noTiming}</p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— What happens next ——— */}
      <Section tone="mist">
        <SectionHead
          kicker="What happens next"
          title="The order, end to end."
          lede="Written against the engagements and the gates as they actually run — including the part where what leaves a Discovery Sprint is a document set and a rollout order, not a running system."
        />
        <ol className="mt-12 grid gap-4 lg:grid-cols-2">
          {WHAT_HAPPENS_NEXT.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05} className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-clayDeep">{s.n}</span>
                  <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
                </div>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-kicker text-muted">{s.who}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate">{s.body}</p>
                {s.link && (
                  <Link
                    to={s.link.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline"
                  >
                    {s.link.label} <Icon.Arrow className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-card border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">The commercial shape</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {ON_RAMP.map((o) => (
                <div key={o.n} className="flex items-start gap-3">
                  <span className="font-mono text-sm text-clayDeep">{o.n}</span>
                  <span>
                    <span className="block font-display text-sm font-bold text-ink">{o.name}</span>
                    <span className="block text-sm leading-snug text-slate">{o.body}</span>
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
              Priced by band —{" "}
              <Link to="/pricing" className="font-medium text-clayDeep underline underline-offset-2">
                how the sprint, the Launchpad and the subscription are charged
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ——— What to bring ——— */}
      <Section tone="paper">
        <SectionHead
          kicker="What to bring"
          title="Everything here feeds a gate."
          lede="Not a discovery questionnaire. Every item here is an input a specific mechanism takes, which is what turns a first conversation into a design session."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHAT_TO_BRING.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-lg font-bold text-ink">{b.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{b.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={WHAT_TO_BRING.length * 0.05}>
            <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-line bg-mist/60 p-7">
              <p className="text-sm leading-relaxed text-slate">
                None of it has to be tidy. A workflow described badly by the person who runs it beats a
                process map drawn by someone who does not.
              </p>
              <a href="#start" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline">
                Back to the form <Icon.Arrow className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ——— The honest limits ——— */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker dark accent={ACCENT}>What we will not have for you</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              At the door, not at the end of procurement.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              You would find all of this out by asking. It costs us nothing to say it first, and it
              tells you more about how an engagement with us runs than a case study would.
            </p>
            <Link
              to="/platform/engineering"
              className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-clay hover:underline"
            >
              The full readiness page, limits included <Icon.Arrow className="h-4 w-4" />
            </Link>
          </div>
          <Reveal>
            <ul className="flex flex-col gap-3">
              {NOT_ON_OFFER.map((t) => (
                <li key={t} className="flex items-start gap-3 rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                  <span className="mt-1 font-mono text-xs text-clay">—</span>
                  <span className="text-[15px] leading-relaxed text-paper/80">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* ——— Answers that do not wait on us ——— */}
      <Section tone="paper">
        <SectionHead
          kicker="Before you send anything"
          title="Answers that do not wait on us."
          lede="A contact page that makes you wait for the basics is a contact page that never published them."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ANSWERS_WITHOUT_US.map((a, i) => (
            <Reveal key={a.href} delay={i * 0.05}>
              <Link to={a.href} className="card card-hover flex h-full flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{a.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{a.body}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep">
                  Open <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-4 border-t border-line pt-12 md:grid-cols-3">
          {OTHER_DOORS.map((d, i) => (
            <Reveal key={d.href} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-base font-bold text-ink">{d.label}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{d.body}</p>
                <Link
                  to={d.href}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep hover:underline"
                >
                  Go there <Icon.Arrow className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <style>{`.inp{width:100%;border-radius:.75rem;border:1px solid #e7e2d9;background:#fff;padding:.7rem .9rem;font-size:.9rem;color:#0b1220;outline:none;transition:border-color .15s, box-shadow .15s}.inp:focus{border-color:#df8c64;box-shadow:0 0 0 3px rgba(223,140,100,.15)}`}</style>
    </>
  );
}

function Field({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">{label}</span>
      {note && <span className="mb-2 block text-xs leading-snug text-muted">{note}</span>}
      {children}
    </label>
  );
}