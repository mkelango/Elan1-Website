// pages/Trust.tsx — Trust & governance / Trust Center. Make trust legible and visual.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { byInquirySolutions } from "../content/solutions";
import { PageHero, Section, GovernanceSpine } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { CTASection } from "../components/CTASection";

const principles = [
  { t: "Human-in-the-loop", b: "Agents recommend and draft; a human approves consequential actions. Approvals are single-use, bound to the exact action, and fingerprinted to the payload the reviewer saw. We never imply autonomous, unsupervised action." },
  { t: "Grounded & cited", b: "Answers are grounded in your data and sources, with citations — not ungrounded generation." },
  { t: "Eval-gated Trust Marks", b: "Accuracy, safety, bias, and fairness are tested before go-live. The assure1 Trust Mark proves it." },
  { t: "A hash-chained audit", b: "Each event hashes over the one before it, per tenant. Append-only is enforced by the database — a trigger rejects UPDATE and DELETE, even from the table owner — so the chain can be recomputed to show nothing was altered." },
  { t: "Privacy by design", b: "DPDP and consent, per-tenant declared residency with fail-closed data classification, least-privilege access across functions." },
  { t: "Ad-free", b: "We never place ads inside the product, and we do not sell your data or attention to anyone who would." },
];

const signatures = [
  ["health1", "Clinical sign-off on every clinical action; HIPAA-class privacy.", "#3fae6b"],
  ["bank1", "Model-risk governance, verified-data sourcing, human sign-off.", "#df8c64"],
  ["insure1", "Fair-decision governance; human review on every adjudication.", "#22b8c4"],
  ["gov1", "Sovereignty, data residency, transparency and explainability.", "#e0656d"],
  ["manufacture1", "Assist, never actuate; safety steps flagged; IP protected.", "#22b8c4"],
  ["edu1", "Student-data privacy (FERPA-class), age-appropriateness, educator oversight.", "#3fae6b"],
  ["energy1", "Safety-critical controls; assist, never actuate; reliability and audit.", "#b9603f"],
];

export default function Trust() {
  useSeo("Trust, safety & governance — the Trust Center | elan1", "Human-in-the-loop, grounded and cited, eval-gated Trust Marks, per-vertical governance signatures, DPDP privacy, and security. Governance is the differentiator.");
  return (
    <>
      <PageHero
        kicker="Trust · The differentiator"
        accent="#e0656d"
        title="Governance is the differentiator."
        subtitle="Trust isn't a page — it's how every agent is built and operated. This is the discipline that makes a regulated industry able to say yes: what is enforced, what is declared, and where the limits are."
        cta={{ label: "Book a demo", href: "/contact", secondary: { label: "How assure1 works", href: "/platform/assure1" } }}
        media={<BrandImage src={pageImage.trust} alt="Governance review" accent="#e0656d" ratio="card" treatment="duotone" eager className="shadow-lift" />}
      />
      <Section tone="paper">
        <SectionHead kicker="Principles" title="Six commitments, on every deployment." lede="Made legible and visual — the rose spine you'll see on every product and solution page." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.t} delay={(i % 3) * 0.06}>
              <div className="relative h-full overflow-hidden rounded-card border border-line bg-surface p-6">
                <span className="absolute inset-y-0 left-0 w-1 bg-rose/70" aria-hidden />
                <div className="pl-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose/12 text-rose"><Icon.Shield className="h-4 w-4" /></span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{p.b}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead kicker="Governance signatures" title="Different industries, different proof of trust." lede={`Each vertical leads with the governance its regulator expects. The most heavily regulated — ${byInquirySolutions.map((v) => v.name).join(", ")} — are fully built and live; they are sold by inquiry because that is what their procurement looks like, not because they are less ready.`} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signatures.map(([name, body, accent], i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <Link
                to={`/solutions/${name}`}
                className="group block h-full rounded-card border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-card"
              >
                <span className="font-mono text-base font-semibold" style={{ color: accent }}>{name}</span>
                <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <Kicker accent="#2f6df0">Security & compliance</Kicker>
            <h2 className="display mt-4 text-2xl text-ink sm:text-3xl">Enterprise-grade by default.</h2>
            <ul className="mt-7 space-y-3">
              {["SSO and least-privilege access via enterprise1", "Per-tenant declared residency; fail-closed classification (single-region today)", "DPDP-aligned privacy and consent", "Continuous evals and eval-gated model migrations (run1)", "Audit-ready evidence packs (assure1)"].map((t) => (
                <li key={t} className="flex items-start gap-3"><span className="mt-0.5 text-green"><Icon.Check className="h-5 w-5" /></span><span className="text-[15px] text-slate">{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            {/* The site had ZERO mentions of SOC 2 or ISO 27001, which reads as a gap in enterprise
                procurement. No certification is held. Stating the posture beats leaving a silence a
                buyer will fill in themselves — and the controls listed are real. */}
            {/* 🚨 The one line that must never soften: neither certification is HELD today. The
                roadmap statement below is the owner's, and is forward-looking — it must not drift
                into "audited", "in progress" or "certified" without the certificate to back it. */}
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-muted">Certification posture</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink">
                SOC 2 and ISO 27001 certification are planned ahead of general availability. Neither
                is held today, and we will not imply otherwise until a certificate exists.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                What already exists is the control set an audit looks for: row-level tenant isolation
                enforced at the database, least-privilege access with SSO and directory provisioning,
                a hash-chained audit that recomputes, single-use approvals bound to the exact payload
                a person reviewed, and evidence packs you can export. The work ahead is the audit and
                the attestation, not the controls.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                If certification is a gate in your procurement, tell us early — we will sequence it
                into the engagement and show you the control evidence in the meantime.
              </p>
            </div>
            <GovernanceSpine label="Not professional advice" text="Pricing shown across the site is illustrative; nothing here is financial, legal, medical, or compliance advice. Forward-looking figures are planning constructs, not promises." />
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <div className="grid items-center gap-6 rounded-card border border-line bg-surface p-7 sm:p-9 lg:grid-cols-[1fr_auto]">
          <div>
            <Kicker accent="#e0656d">Go deeper</Kicker>
            <h2 className="display mt-3 text-2xl text-ink sm:text-3xl">See the three layers — and why elan1 beats a builder.</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate">
              Governance here is a discipline, not a filter: business governance, AI safety, and platform security —
              all provable. And it's the reason a governed operations platform beats an agent-builder canvas.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/platform/governance" className="btn-primary">Governance, three layers <Icon.Arrow className="h-4 w-4" /></Link>
            <Link to="/platform/why-elan1" className="btn-ghost">Why elan1 vs builders</Link>
          </div>
        </div>
      </Section>
      <CTASection title="Deploy with confidence — and evidence." body="assure1 gives you the governance framework, the evals, and the Trust Mark your regulator, board, and customers need." primary={{ label: "Talk to assure1", href: "/contact" }} />
    </>
  );
}
