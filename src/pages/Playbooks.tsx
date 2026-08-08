// pages/Playbooks.tsx — the playbooks, published in full on the page.
//
// 🚨 WHAT THIS PAGE USED TO DO, AND WHY IT CHANGED.
//
// It gated four playbooks behind an email form. The button said "Email me the playbook", the
// confirmation said "On its way to your inbox — thank you", and the submit path ended at a lead
// record: there is no mailer wired and no document in the repo. So the page collected an address by
// promising a file that could not be sent.
//
// That is the worst failure available to a marketing site, because the person has already paid —
// they gave you their details — before the promise breaks. It is also invisible in a build: the form
// works, the lead is captured, the confirmation renders, and nothing errors.
//
// The fix is not a better form. It is to publish the thing. Each playbook now renders its full
// outline — every step with what you do, the decision it turns on, and the trap it avoids — with no
// form in the way. The form that remains asks for a WALKTHROUGH, which is a thing a person can
// actually deliver, and its confirmation text comes from `confirmationFor()` in the content layer so
// the wording can never again promise a document that does not exist.
//
// Every reader-facing string lives in PLAYBOOK_PAGE_COPY in content/playbooks.ts, deliberately: the
// promise and the mechanism that has to honour it belong in one file.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import {
  PLAYBOOKS,
  PLAYBOOK_PAGE_COPY as COPY,
  ctaLabelFor,
  confirmationFor,
  hasWrittenDocument,
  type Playbook,
} from "../content/playbooks";
import { submitLead } from "../lib/lead";

export default function Playbooks() {
  useSeo(
    "Playbooks — agentic guides, published in full | elan1",
    "The agentic transformation roadmap, governance, per-industry blueprints, FinOps, agent evidence and connector readiness — each published in full on the page, free to read, no form in the way.",
    { type: "article", breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  );

  return (
    <>
      <PageHero
        kicker="Playbooks"
        accent="#2f6df0"
        title="The guides we'd hand a friend."
        subtitle={COPY.heroSubtitle}
        cta={{
          label: "Start a Discovery Sprint",
          href: "/get-started",
          secondary: { label: "Read the glossary", href: "/resources/glossary" },
        }}
      />

      {PLAYBOOKS.map((p, i) => (
        <Section key={p.slug} tone={i % 2 === 0 ? "paper" : "mist"}>
          <PlaybookBody pb={p} />
        </Section>
      ))}

      <CTASection
        title="Prefer a working proof to an outline?"
        body="A Discovery Sprint ships a real, governed agent against your data — the best playbook is one that runs."
      />
    </>
  );
}

function PlaybookBody({ pb }: { pb: Playbook }) {
  return (
    <article id={pb.slug} className="scroll-mt-24">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* The sticky rail: what it is, who it is for, and what you end up holding. */}
        <div className="lg:sticky lg:top-24 self-start">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: pb.accent }} />
            <span className="font-mono text-[11px] uppercase tracking-kicker text-muted">{pb.cardLabel}</span>
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">{pb.title}</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate">{pb.desc}</p>

          <div className="mt-7 rounded-card border border-line bg-surface p-6">
            <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Who it is for</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">{pb.audience}</p>

            <p className="mt-5 font-mono text-[11px] uppercase tracking-kicker text-muted">{COPY.outcomeHeading}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate">{pb.outcome}</p>
          </div>

          {pb.notCovered.length > 0 && (
            <div className="mt-4 rounded-card border border-line bg-mist/50 p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">{COPY.notCoveredHeading}</p>
              <ul className="mt-3 flex flex-col gap-2">
                {pb.notCovered.map((x) => (
                  <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate">
                    <span className="mt-1 font-mono text-xs text-muted" aria-hidden>—</span>
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4">
            <AskPanel pb={pb} />
          </div>
        </div>

        {/* The outline itself — the thing that used to be behind the form. */}
        <div>
          <Kicker accent={pb.accent}>{COPY.contentsHeading}</Kicker>
          <ol className="mt-6 flex flex-col gap-4">
            {pb.steps.map((s, i) => (
              <Reveal key={s.title} delay={Math.min(i, 4) * 0.04}>
                <li className="rounded-card border border-line bg-surface p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-sm font-bold" style={{ color: pb.accent }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-lg font-bold leading-snug text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.body}</p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-line bg-mist/50 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-kicker text-muted">The decision</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">{s.decision}</p>
                    </div>
                    <div className="rounded-lg border border-rose/25 bg-rose/[0.05] p-4">
                      <p className="font-mono text-[10px] uppercase tracking-kicker text-rose">The trap</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">{s.trap}</p>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}

/**
 * The ask panel. It requests a WALKTHROUGH — something a person delivers — rather than a download.
 *
 * The confirmation string comes from `confirmationFor(pb)` rather than being written here, so a
 * playbook that has no written document says so on submit instead of implying an email is coming.
 */
function AskPanel({ pb }: { pb: Playbook }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ name: "", email: "", company: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) return setError("Please agree to be contacted before we reply.");
    setBusy(true);
    try {
      await submitLead(
        {
          name: f.name,
          company: f.company,
          email: f.email,
          segment: "—",
          interest: `Playbook walkthrough: ${pb.title}`,
          region: "—",
        },
        consent,
      );
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-card border border-green/30 bg-green/[0.07] p-5">
        <div className="flex items-start gap-2.5">
          <Icon.Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
          <p className="text-sm leading-relaxed text-slate">{confirmationFor(pb)}</p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn-ghost w-full justify-center">
        {ctaLabelFor(pb)} <Icon.Arrow className="h-4 w-4" />
      </button>
    );
  }

  return (
    <div className="rounded-card border border-line bg-surface p-6">
      <p className="text-sm leading-relaxed text-slate">{COPY.askIntro}</p>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" className="inp" />
        <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Work email" className="inp" />
        <input required value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} placeholder="Company" className="inp" />
        <label className="flex items-start gap-2 text-xs text-slate">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-clayDeep" />
          <span>
            I agree to be contacted and accept the{" "}
            <Link to="/trust" className="text-clayDeep underline underline-offset-2">privacy policy</Link>.
          </span>
        </label>
        {error && <p role="alert" className="text-sm text-rose">{error}</p>}
        <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
          {busy ? "Sending…" : COPY.askSubmitLabel}
        </button>
        <p className="text-xs leading-relaxed text-muted">{COPY.privacyFootnote}</p>
      </form>
      <style>{`.inp{width:100%;border-radius:.75rem;border:1px solid #e7e2d9;background:#fff;padding:.6rem .85rem;font-size:.9rem;color:#0b1220;outline:none}.inp:focus{border-color:#df8c64;box-shadow:0 0 0 3px rgba(223,140,100,.15)}`}</style>
    </div>
  );
}
