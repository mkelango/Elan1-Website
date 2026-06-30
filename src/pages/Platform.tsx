// pages/Platform.tsx — the approach pages: agentic transformation model, the "1" philosophy, the flywheel, built on Claude.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { FLYWHEEL } from "../content/site";

export function Philosophy() {
  useSeo('The "1" philosophy | elan1', 'Number One, one-to-one, all-as-one. Add "1" to any capability and you get its number-one agentic version.');
  const ones = [
    { tag: "Number One", body: "Best-in-class. Add 1 to any capability and you get its number-one version — the standard others measure against.", accent: "#df8c64" },
    { tag: "One-to-one", body: "Hyper-personal. Every customer, every employee, every decision treated as if it were the only one.", accent: "#2f6df0" },
    { tag: "All-as-one", body: "Unified, end-to-end. One platform, one governance, one team — the whole business operating as one.", accent: "#7c6cf0" },
  ];
  return (
    <>
      <PageHero
        kicker="Platform · The “1” philosophy"
        accent="#df8c64"
        title={<>The “1” means three things at once.</>}
        subtitle="Every brand name inherits it. capability + “1” = the number-one, hyper-personalized, unified, agentic version of it. sales1, finance1, health1 — each is the best, most personal, most unified version of its function or field."
        cta={{ label: "Explore the suite", href: "/products", secondary: { label: "About elan1", href: "/company/about" } }}
      />
      <Section tone="paper">
        <div className="grid gap-5 md:grid-cols-3">
          {ones.map((o, i) => (
            <Reveal key={o.tag} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <span className="font-mono text-5xl font-bold" style={{ color: o.accent }}>1</span>
                <h3 className="mt-5 font-display text-xl font-bold text-ink">{o.tag}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{o.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="obsidian">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker dark>The brand grammar</Kicker>
          <p className="display mt-6 text-2xl leading-snug text-paper sm:text-3xl">
            Lowercase, one word + “1”, no space. <span className="font-mono text-clay">sales1</span> — never “Customer 1”.
            Only functions, products, and verticals get a “1” name. The master brand endorses its family: “sales1, an elan1 company.”
          </p>
        </div>
      </Section>
      <CTASection title="Add 1. Become the one." />
    </>
  );
}

export function Flywheel() {
  useSeo("The flywheel — how value compounds | elan1", "Services land, products expand, solutions deepen, trust compounds. How elan1 makes value compound across the three layers.");
  return (
    <>
      <PageHero
        kicker="Platform · The flywheel"
        accent="#e0656d"
        title="How value compounds."
        subtitle="elan1 isn't a line of one-off projects — it's a flywheel. Each turn makes the next easier, cheaper, and more certain. This is why land-and-expand beats sell-and-leave."
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "The method", href: "/services" } }}
      />
      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FLYWHEEL.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-card border border-line bg-surface p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl font-mono text-base font-bold" style={{ background: `${f.accent}1a`, color: f.accent }}>{i + 1}</span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{f.body}</p>
                {i < FLYWHEEL.length - 1 && <span className="absolute -right-2 top-1/2 hidden text-muted lg:block"><Icon.Arrow className="h-5 w-5" /></span>}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-12 rounded-card border border-line bg-mist/50 p-7 text-center font-display text-xl leading-snug text-ink">
            The result: every certified deployment makes the next sale easier and the next deployment faster.
            <span className="text-clayDeep"> Trust compounds.</span>
          </p>
        </Reveal>
      </Section>
      <CTASection title="Start the flywheel." />
    </>
  );
}

export function BuiltOnClaude() {
  useSeo("Built on Claude | elan1", "Why Claude-native depth beats multi-model generalism — the frontier foundation the 1 Suite is built on.");
  const points = [
    ["Frontier reasoning", "Opus, Sonnet, and Haiku — the right model for each step, from deep analysis to high-volume tasks."],
    ["Agent SDK & MCP", "Production agents with tool use, and a standard way to connect your systems via MCP."],
    ["Skills", "Your rules, tone, and processes encoded so agents are on-policy by default."],
    ["Safety & depth", "Claude-native engineering — depth and safety over multi-model generalism."],
  ];
  return (
    <>
      <PageHero
        kicker="Platform · Built on Claude"
        accent="#df8c64"
        title="Built on Claude. By design."
        subtitle="We go deep on one frontier platform rather than shallow across many. Claude-native depth — reasoning, the Agent SDK, MCP, and Skills — is what makes production agents safe, grounded, and reliable."
        cta={{ label: "Book a demo", href: "/contact", secondary: { label: "Trust & governance", href: "/trust" } }}
      />
      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2">
          {points.map(([t, b], i) => (
            <Reveal key={t} delay={(i % 2) * 0.06}>
              <div className="card h-full">
                <Icon.Spark className="h-5 w-5 text-clayDeep" />
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 font-mono text-xs text-muted">
            We state “Built on Claude” as a differentiator (depth, safety) — we don't overstate model specifics.
          </p>
        </Reveal>
      </Section>
      <CTASection />
    </>
  );
}
