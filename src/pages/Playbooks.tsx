// pages/Playbooks.tsx — WS3.4: gated playbooks (consent-respecting lead capture). Each card opens an
// inline gated form; on consent + submit the lead is captured (lib/lead.ts) and delivery is confirmed.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { PLAYBOOKS, type Playbook } from "../content/playbooks";
import { submitLead } from "../lib/lead";

export default function Playbooks() {
  useSeo(
    "Playbooks — gated agentic guides | elan1",
    "The Agentic Transformation Roadmap, the Governance Playbook, per-industry vertical guides, and the Agent FinOps Playbook — gated, consent-respecting downloads.",
    { type: "article" },
  );
  return (
    <>
      <PageHero
        kicker="Playbooks"
        accent="#2f6df0"
        title="The guides we'd hand a friend."
        subtitle="Practical, trust-first playbooks for adopting agents — the roadmap, governance, per-industry blueprints, and FinOps. A quick form, then it's yours."
        cta={{ label: "Start a Discovery Sprint", href: "/get-started", secondary: { label: "Read the glossary", href: "/resources/glossary" } }}
      />
      <Section tone="paper">
        <div className="grid gap-5 lg:grid-cols-2">
          {PLAYBOOKS.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.06}>
              <PlaybookCard pb={p} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          We only use your details to send the playbook and follow up once.{" "}
          <Link to="/trust" className="text-clayDeep underline underline-offset-2">How we handle data</Link>.
        </p>
      </Section>
      <CTASection title="Prefer a working proof to a PDF?" body="A Discovery Sprint ships a real, governed agent against your data — the best playbook is one that runs." />
    </>
  );
}

function PlaybookCard({ pb }: { pb: Playbook }) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [f, setF] = useState({ name: "", email: "", company: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consent) return setError("Please agree to be contacted before downloading.");
    setBusy(true);
    try {
      await submitLead(
        { name: f.name, company: f.company, email: f.email, segment: "—", interest: `Playbook: ${pb.title}`, region: "—" },
        consent,
      );
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: pb.accent }} />
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">Gated · {pb.audience}</span>
      </div>
      <h3 className="mt-3 font-display text-xl font-bold text-ink">{pb.title}</h3>
      <p className="mt-2 text-sm text-slate">{pb.desc}</p>
      <ul className="mt-4 space-y-1.5">
        {pb.inside.map((x) => (
          <li key={x} className="flex items-start gap-2 text-sm text-slate">
            <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-clayDeep" /> {x}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-line pt-5">
        {sent ? (
          <div className="flex items-center gap-2 text-sm text-green">
            <Icon.Check className="h-5 w-5" /> On its way to your inbox — thank you.
          </div>
        ) : !open ? (
          <button onClick={() => setOpen(true)} className="btn-primary w-full">
            Get the playbook <Icon.Arrow className="h-4 w-4" />
          </button>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" className="inp" />
            <input required type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="Work email" className="inp" />
            <input required value={f.company} onChange={(e) => setF({ ...f, company: e.target.value })} placeholder="Company" className="inp" />
            <label className="flex items-start gap-2 text-xs text-slate">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 accent-clayDeep" />
              <span>I agree to be contacted and accept the <Link to="/trust" className="text-clayDeep underline underline-offset-2">privacy policy</Link>.</span>
            </label>
            {error && <p role="alert" className="text-sm text-rose">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60">
              {busy ? "Sending…" : "Email me the playbook"}
            </button>
          </form>
        )}
      </div>

      <style>{`.inp{width:100%;border-radius:.75rem;border:1px solid #e7e2d9;background:#fff;padding:.6rem .85rem;font-size:.9rem;color:#0b1220;outline:none}.inp:focus{border-color:#df8c64;box-shadow:0 0 0 3px rgba(223,140,100,.15)}`}</style>
    </article>
  );
}
