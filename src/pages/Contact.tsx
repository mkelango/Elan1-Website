// pages/Contact.tsx — Book a demo / Discovery Sprint. Captures segment + interest + region for routing.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { Reveal, Kicker, Icon } from "../components/primitives";
import { REGIONS } from "../content/site";
import { submitLead } from "../lib/lead";

const segments = ["Startup ($1M–$10M)", "Scale-up ($10M–$100M)", "Enterprise ($100M–$1B)"];
const interests = ["A product (1 Suite)", "An industry solution", "A service pillar", "Not sure yet"];

export default function Contact() {
  useSeo("Book a demo · Start a Discovery Sprint | elan1", "Start with a fixed-scope Discovery Sprint — low-risk and fully credited. We deploy a working, certified agent in weeks.");
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", segment: segments[0], interest: interests[0], region: REGIONS[0], message: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) {
      setError("Please agree to be contacted before submitting.");
      return;
    }
    setBusy(true);
    try {
      await submitLead(form, consent); // consent-gated; no PII in the URL (POST body / local capture)
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="absolute inset-0 bg-grid-paper opacity-50" aria-hidden />
      <div className="shell relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Left: pitch */}
        <div>
          <Reveal><Kicker>Get started</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-5 text-4xl text-ink sm:text-5xl">Start a Discovery Sprint.</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-lg">
              The lowest-risk way to begin: a fixed-scope sprint, fully credited toward your first Launchpad. We map
              the highest-value opportunity and ship a working, certified proof — in weeks.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-9 space-y-4">
              {[
                ["A scoped, costed opportunity map", "We size the highest-value agentic use cases for you."],
                ["A working proof of value", "A real agent, running against your context — not a slide."],
                ["A governance plan", "Human-in-the-loop, audit, and the path to a Trust Mark."],
              ].map(([t, b]) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-clay/15 text-clayDeep"><Icon.Check className="h-4 w-4" /></span>
                  <span>
                    <span className="block font-display font-bold text-ink">{t}</span>
                    <span className="block text-sm text-slate">{b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          {/* The on-ramp ladder: Discovery Sprint → Launchpad → subscription */}
          <Reveal delay={0.18}>
            <div className="mt-10 rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted">The on-ramp</p>
              <ol className="mt-4 space-y-3">
                {[
                  ["01", "Discovery Sprint", "Fixed-scope, low-risk, fully credited. A costed opportunity map + a working proof."],
                  ["02", "Launchpad", "Your first production agent — deployed, governed, Trust-Marked."],
                  ["03", "Subscription", "Operate + sequence the next function. The flywheel turns."],
                ].map(([n, t, b]) => (
                  <li key={n} className="flex items-start gap-3">
                    <span className="font-mono text-sm text-clayDeep">{n}</span>
                    <span>
                      <span className="block font-display text-sm font-bold text-ink">{t}</span>
                      <span className="block text-sm text-slate">{b}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-muted">
                Priced to your band —{" "}
                <Link to="/pricing" className="font-medium text-clayDeep underline underline-offset-2">
                  Growth · Scale-up · Enterprise
                </Link>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Built on Claude", "Human-in-the-loop", "Ad-free", "DPDP-ready"].map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <div className="rounded-card border border-line bg-surface p-7 shadow-lift sm:p-9">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green/15 text-green"><Icon.Check className="h-7 w-7" /></span>
                <h2 className="display mt-5 text-2xl text-ink">Thank you, {form.name.split(" ")[0] || "there"}.</h2>
                <p className="mt-3 max-w-sm text-slate">
                  Your request is routed to our {form.region} team for {form.interest.toLowerCase()}. We'll be in touch within one business day.
                </p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-7">Submit another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name"><input required value={form.name} onChange={set("name")} className="inp" placeholder="Your name" /></Field>
                  <Field label="Company"><input required value={form.company} onChange={set("company")} className="inp" placeholder="Company" /></Field>
                </div>
                <Field label="Work email"><input required type="email" value={form.email} onChange={set("email")} className="inp" placeholder="you@company.com" /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Company size"><select value={form.segment} onChange={set("segment")} className="inp">{segments.map((s) => <option key={s}>{s}</option>)}</select></Field>
                  <Field label="I'm interested in"><select value={form.interest} onChange={set("interest")} className="inp">{interests.map((s) => <option key={s}>{s}</option>)}</select></Field>
                </div>
                <Field label="Region"><select value={form.region} onChange={set("region")} className="inp">{REGIONS.map((s) => <option key={s}>{s}</option>)}</select></Field>
                <Field label="Anything else? (optional)"><textarea value={form.message} onChange={set("message")} rows={3} className="inp resize-none" placeholder="Tell us about your goals…" /></Field>

                <label className="flex items-start gap-2.5 text-sm text-slate">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-clayDeep"
                  />
                  <span>
                    I agree to be contacted about my enquiry and accept the{" "}
                    <Link to="/trust" className="text-clayDeep underline underline-offset-2">privacy policy</Link>.
                    No spam, ever — DPDP-respecting.
                  </span>
                </label>

                {error && (
                  <p role="alert" className="rounded-lg border border-rose/40 bg-rose/[0.07] px-3 py-2 text-sm text-rose">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
                  {busy ? "Sending…" : "Book a demo"} <Icon.Arrow className="h-4 w-4" />
                </button>
                <p className="text-center font-mono text-[11px] text-muted">We'll route you to the right team. No spam — ever.</p>
              </form>
            )}
          </div>
        </Reveal>
      </div>

      <style>{`.inp{width:100%;border-radius:.75rem;border:1px solid #e7e2d9;background:#fff;padding:.7rem .9rem;font-size:.9rem;color:#0b1220;outline:none;transition:border-color .15s, box-shadow .15s}.inp:focus{border-color:#df8c64;box-shadow:0 0 0 3px rgba(223,140,100,.15)}`}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
