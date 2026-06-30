// pages/Concept.tsx — WS1.2 the cornerstone authority page: "What is agentic transformation?"
// Defines the category, makes the shift legible, answers "why now", frames "Add 1", and anchors the
// internal-link cluster (products / solutions / services / approach / trust). Rich Article + FAQ JSON-LD.
import { Link } from "react-router-dom";
import { useSeo, SITE_URL } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { SHIFT, VS_LEGACY } from "../content/site";

const PATH = "/what-is-agentic-transformation";

// copilot vs agent — the definition, made concrete
const CONTRAST = [
  {
    k: "A copilot",
    body: "Suggests. It waits for a prompt, drafts something, and hands it back. A human still does the work.",
    tone: "muted" as const,
  },
  {
    k: "An agent",
    body: "Acts. It reasons over a goal, uses tools and connectors, completes multi-step work, and stops at a human only where it should.",
    tone: "ink" as const,
  },
];

const PILLARS_OF_DEF = [
  { t: "Goal, not prompt", body: "You give an outcome; the agent plans the steps." },
  { t: "Tools + grounding", body: "It reads the systems of record (via MCP connectors) and acts on them — grounded, not guessing." },
  { t: "Governed autonomy", body: "Human-in-the-loop on every consequential action; everything logged, evaluated, and certified." },
  { t: "A new operating layer", body: "Not a feature inside an app — a layer the whole business runs on." },
];

// The maturity curve — five stages from AI-curious to agentic organization.
const STAGES = [
  { n: "00", name: "AI-curious", body: "Experiments and chatbots. No production agents, no governance." },
  { n: "01", name: "Copilots", body: "Assistants that suggest. Humans still do all the work." },
  { n: "02", name: "Agents", body: "Systems that act — reason, use tools, complete tasks, under human control." },
  { n: "03", name: "Agentic function", body: "A whole function runs on agents, governed and observable." },
  { n: "04", name: "Agentic organization", body: "The 1 Suite on enterprise1 — every function, one control plane." },
];

const ROLE = [
  { label: "Services — how we deliver", href: "/services", desc: "Six pillars that take you from strategy to scale.", accent: "#7c6cf0" },
  { label: "Products — what we deploy", href: "/products", desc: "The 1 Suite: ten agentic apps on one core.", accent: "#2f6df0" },
  { label: "Solutions — who we serve", href: "/solutions", desc: "Ten industry solutions with the governance your regulator expects.", accent: "#d39a3a" },
];

const FAQ = [
  {
    q: "What is agentic transformation?",
    a: "Agentic transformation is adopting AI agents — software that reasons, uses tools, and completes work end to end under human control — as a new operating layer for the business, not as a feature bolted onto existing apps.",
  },
  {
    q: "How is an agent different from a copilot or chatbot?",
    a: "A copilot suggests and waits; a human does the work. An agent acts: it plans toward a goal, calls tools and connectors, completes multi-step tasks, and routes to a human only for consequential decisions — every step grounded, governed, and audited.",
  },
  {
    q: "Why now?",
    a: "Frontier models, the Agent SDK, MCP connectors, and Skills have made production agents real and reliable. The window to lead is open, and legacy consulting is structurally too slow and expensive to follow.",
  },
  {
    q: "Is it safe? What about governance?",
    a: "Governance is the differentiator: human-in-the-loop on every consequential action, grounded and cited outputs, eval-gated Trust Marks, per-vertical governance signatures, immutable audit, and data residency (DPDP/GDPR).",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is agentic transformation?",
    description:
      "Agentic transformation is a new operating layer for the enterprise: AI agents that reason, use tools, and complete work end to end under human control. The shift, why now, and how to adopt it.",
    author: { "@type": "Organization", name: "elan1" },
    publisher: { "@type": "Organization", name: "elan1", logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` } },
    mainEntityOfPage: `${SITE_URL}${PATH}`,
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Concept() {
  useSeo(
    "What is agentic transformation? | elan1",
    "Agentic transformation is a new operating layer for the enterprise — AI agents that reason, use tools, and complete work end to end under human control. The shift, why now, and how to adopt it.",
    { type: "article", jsonLd },
  );

  return (
    <>
      <PageHero
        kicker="The concept"
        accent="#2f6df0"
        title="What is agentic transformation?"
        subtitle="Software waited for instructions for forty years. Agents do the work. Agentic transformation is adopting them as a new operating layer for the business — governed, grounded, and owned."
        cta={{
          label: "Start a Discovery Sprint",
          href: "/contact",
          secondary: { label: "See the maturity curve", href: "#maturity" },
        }}
      />

      {/* The shift */}
      <Section tone="paper">
        <SectionHead kicker={SHIFT.kicker} title={SHIFT.headline} lede={SHIFT.body} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SHIFT.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <h3 className="font-display text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Define it: copilot vs agent */}
      <Section tone="mist">
        <SectionHead
          kicker="The definition"
          title="A copilot suggests. An agent acts."
          lede="The difference is not how smart the model is — it's whether the system does the work."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {CONTRAST.map((c) => (
            <Reveal key={c.k}>
              <div
                className={`h-full rounded-card border p-6 ${c.tone === "ink" ? "border-ink/15 bg-surface" : "border-line bg-surface/60"}`}
              >
                <Kicker accent={c.tone === "ink" ? "#2f6df0" : undefined}>{c.k}</Kicker>
                <p className={`mt-3 ${c.tone === "ink" ? "text-ink" : "text-muted"}`}>{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS_OF_DEF.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.05}>
              <div className="h-full rounded-card border border-line bg-surface p-5">
                <h4 className="font-mono text-sm font-semibold text-ink">{p.t}</h4>
                <p className="mt-1.5 text-sm text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The maturity curve (merged from the former /platform/approach page) */}
      <Section tone="paper">
        <div id="maturity" className="scroll-mt-28" />
        <SectionHead
          kicker="The maturity curve"
          title="Five stages from AI-curious to agentic organization."
          lede="Most organizations are stuck between slow strategy decks and generic AI tools. We move you, stage by stage, on shipped proof — this is where you are, and where you're going."
        />
        <ol className="mt-12 space-y-3">
          {STAGES.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.05}>
              <div className="flex items-start gap-5 rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-sm text-blueprint">{s.n}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-ink">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate">{s.body}</p>
                </div>
                <div
                  className="hidden h-2 rounded-full bg-mist sm:block sm:w-40"
                  style={{ background: `linear-gradient(90deg, #2f6df0 ${(i + 1) * 20}%, #f4f1ec ${(i + 1) * 20}%)` }}
                />
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Why now — vs legacy (merged from the former /platform/approach page) */}
      <Section tone="mist">
        <SectionHead
          kicker="Why now"
          title="The window to lead is open."
          lede="Frontier models, the Agent SDK, MCP connectors, and Skills have made production agents real. Legacy consulting is structurally too slow and too expensive to follow."
          align="center"
        />
        <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-card border border-line bg-surface">
          <div className="grid grid-cols-3 border-b border-line bg-mist/60 px-6 py-3 font-mono text-[11px] uppercase tracking-wide text-muted">
            <span></span>
            <span>Legacy consulting</span>
            <span className="text-clayDeep">elan1</span>
          </div>
          {VS_LEGACY.map((r) => (
            <div key={r.dim} className="grid grid-cols-3 gap-3 border-b border-line px-6 py-4 text-sm last:border-0">
              <span className="font-medium text-ink">{r.dim}</span>
              <span className="text-muted">{r.legacy}</span>
              <span className="flex items-start gap-1.5 font-medium text-ink">
                <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-green" />
                {r.elan1}
              </span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-slate">
          The "1" idea behind every brand name —{" "}
          <Link to="/platform/the-1-philosophy" className="underline underline-offset-2 hover:text-ink">
            number one · one-to-one · all-as-one
          </Link>
          .
        </p>
      </Section>

      {/* elan1's role — the internal-link cluster */}
      <Section tone="obsidian">
        <SectionHead
          dark
          kicker="elan1's role"
          title="One core. Many apps. Every vertical."
          lede="elan1 is the trusted, fastest way to adopt the agentic operating layer — services that deliver it, products that run it, solutions that fit your industry."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {ROLE.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.05}>
              <Link
                to={r.href}
                className="group block h-full rounded-card border border-paper/15 bg-paper/[0.04] p-6 transition hover:bg-paper/[0.08]"
              >
                <span className="font-mono text-sm font-semibold" style={{ color: r.accent }}>
                  {r.label}
                </span>
                <p className="mt-2 text-sm text-paper/70">{r.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-paper/80 group-hover:text-paper">
                  Explore <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-paper/60">
          Governance is the difference — see{" "}
          <Link to="/trust" className="underline underline-offset-2 hover:text-paper">
            trust, safety &amp; governance
          </Link>
          , or{" "}
          <a href="#maturity" className="underline underline-offset-2 hover:text-paper">
            the maturity curve
          </a>
          .
        </p>
      </Section>

      {/* FAQ (mirrors the FAQ JSON-LD) */}
      <Section tone="paper">
        <SectionHead kicker="Questions" title="Agentic transformation, answered." align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-card border border-line bg-surface">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-ink">
                {f.q}
                <Icon.Arrow className="h-4 w-4 shrink-0 text-slate transition group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm text-slate">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTASection />
    </>
  );
}
