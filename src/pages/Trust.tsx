// pages/Trust.tsx — Trust & governance / Trust Center. Make trust legible and visual.
import { useSeo } from "../lib/seo";
import { PageHero, Section, GovernanceSpine } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { CTASection } from "../components/CTASection";

const principles = [
  { t: "Human-in-the-loop", b: "Agents recommend and draft; a human approves every consequential action. We never imply autonomous, unsupervised action." },
  { t: "Grounded & cited", b: "Answers are grounded in your data and sources, with citations — not ungrounded generation." },
  { t: "Eval-gated Trust Marks", b: "Accuracy, safety, bias, and fairness are tested before go-live. The assure1 Trust Mark proves it." },
  { t: "Immutable audit trails", b: "Every agent action is logged and reviewable — regulator-, board-, and customer-ready." },
  { t: "Privacy by design", b: "DPDP and consent, data residency by region, least-privilege access across functions." },
  { t: "Ad-free", b: "Claude products are ad-free. We sell creative production, never ad placement inside the product." },
];

const signatures = [
  ["health1", "Clinical sign-off on every clinical action; HIPAA-class privacy.", "#3fae6b"],
  ["bank1", "Model-risk governance, verified-data sourcing, human sign-off.", "#df8c64"],
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
        subtitle="Trust isn't a page — it's how every agent is built and operated. This is the discipline that turns regulated industries into customers, and the page legacy firms can't write convincingly."
        cta={{ label: "Book a demo", href: "/contact", secondary: { label: "How assure1 works", href: "/services/assure1" } }}
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
        <SectionHead kicker="Governance signatures" title="Different industries, different proof of trust." lede="Each vertical leads with the governance its regulator expects. A sample:" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signatures.map(([name, body, accent], i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-base font-semibold" style={{ color: accent }}>{name}</span>
                <p className="mt-3 text-sm leading-relaxed text-slate">{body}</p>
              </div>
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
              {["SSO and least-privilege access via enterprise1", "Data residency by region (India, SG, US, ME, EU)", "DPDP-aligned privacy and consent", "Continuous evals and eval-gated model migrations (run1)", "Audit-ready evidence packs (assure1)"].map((t) => (
                <li key={t} className="flex items-start gap-3"><span className="mt-0.5 text-green"><Icon.Check className="h-5 w-5" /></span><span className="text-[15px] text-slate">{t}</span></li>
              ))}
            </ul>
          </div>
          <GovernanceSpine label="Not professional advice" text="Pricing shown across the site is illustrative; nothing here is financial, legal, medical, or compliance advice. Forward-looking figures are planning constructs, not promises." />
        </div>
      </Section>
      <CTASection title="Deploy with confidence — and evidence." body="assure1 gives you the governance framework, the evals, and the Trust Mark your regulator, board, and customers need." primary={{ label: "Talk to assure1", href: "/contact" }} />
    </>
  );
}
