// pages/PartnerPortal.tsx — WS4.3: the partner portal (onboarding / listing / resources), tied to the
// partner program (X4). Partners build on the core via a governed SDK; every contribution is certified
// before it lists. Includes a consent-respecting application.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { submitLead } from "../lib/lead";

const STEPS = [
  { n: "01", t: "Apply", b: "Tell us what you build. We review fit with the program and the core." },
  { n: "02", t: "Build on the partner SDK", b: "A governed subset of /sdk — consume core primitives, never reimplement them. Least-privilege by default." },
  { n: "03", t: "Certify (assure1)", b: "Your pack/connector passes governance + eval review and earns a Trust Mark — uncertified items can't list." },
  { n: "04", t: "List & install", b: "List in the marketplace; tenants install under wave rollout — fully audited, no special privileges." },
];

const TYPES = [
  { t: "SIs & delivery", b: "Deliver Discovery Sprints & Launchpads on the platform; access academy1 certification." },
  { t: "Tech / ISV", b: "Build apps, packs, and connectors on the core; list them in the marketplace." },
  { t: "Advisory", b: "Co-sell agentic transformation with a governed, certifiable platform underneath." },
];

export default function PartnerPortal() {
  useSeo(
    "Partner portal — build on the core, certified | elan1",
    "Join the elan1 partner program: build apps, packs, and connectors on a governed partner SDK, certify with assure1, and list in the marketplace — least-privilege, fully audited, no fork.",
  );
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [f, setF] = useState({ name: "", company: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) return setError("Please agree to be contacted before applying.");
    try {
      await submitLead({ name: f.name, company: f.company, email: f.email, segment: "—", interest: "Partner program", region: "—", message: f.message }, consent);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  };

  return (
    <>
      <PageHero
        kicker="Partners"
        accent="#7c6cf0"
        title="Build on the core. Ship certified."
        subtitle="An ecosystem on one governed platform: partners extend reach with a partner SDK and a marketplace — every contribution assure1-certified before it lists, least-privilege, fully audited."
        cta={{ label: "Apply to partner", href: "#apply", secondary: { label: "How governance works", href: "/trust" } }}
      />

      <Section tone="paper">
        <SectionHead kicker="The path" title="From apply to listed — governed at every step." lede="No special privileges, no forks. Partner code runs under the same identity, governance, and audit as first-party." />
        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="h-full rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-sm text-clayDeep">{s.n}</span>
                <h3 className="mt-2 font-display text-base font-bold text-ink">{s.t}</h3>
                <p className="mt-1.5 text-sm text-slate">{s.b}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section tone="mist">
        <SectionHead kicker="Who partners" title="Three ways to plug in." align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {TYPES.map((t) => (
            <Reveal key={t.t}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-ink">{t.t}</h3>
                <p className="mt-2 text-sm text-slate">{t.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          Certified talent is matched via the <Link to="/academy/learn" className="text-clayDeep underline underline-offset-2">academy1 learning hub</Link>.
        </p>
      </Section>

      {/* apply */}
      <Section tone="paper" id="apply">
        <div className="mx-auto max-w-xl">
          <SectionHead kicker="Apply" title="Tell us what you build." align="center" />
          <div className="mt-8 rounded-card border border-line bg-surface p-7 shadow-card">
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-green/15 text-green"><Icon.Check className="h-6 w-6" /></span>
                <p className="text-slate">Thanks — we'll be in touch about the partner program.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" className="inp" />
                <input required value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} placeholder="Company" className="inp" />
                <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Work email" className="inp" />
                <textarea value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} rows={3} placeholder="What do you build / deliver?" className="inp resize-none" />
                <label className="flex items-start gap-2 text-xs text-slate">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-clayDeep" />
                  <span>I agree to be contacted and accept the <Link to="/trust" className="text-clayDeep underline underline-offset-2">privacy policy</Link>.</span>
                </label>
                {error && <p role="alert" className="text-sm text-rose">{error}</p>}
                <button type="submit" className="btn-primary w-full">Apply to partner <Icon.Arrow className="h-4 w-4" /></button>
              </form>
            )}
          </div>
        </div>
        <style>{`.inp{width:100%;border-radius:.75rem;border:1px solid #e7e2d9;background:#fff;padding:.65rem .9rem;font-size:.9rem;color:#0b1220;outline:none}.inp:focus{border-color:#df8c64;box-shadow:0 0 0 3px rgba(223,140,100,.15)}`}</style>
      </Section>

      <CTASection title="Let's grow the ecosystem." body="Build on a governed core, certify with assure1, and reach tenants through the marketplace." />
    </>
  );
}
