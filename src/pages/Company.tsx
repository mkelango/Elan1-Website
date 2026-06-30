// pages/Company.tsx — Careers and Partners.
import { useSeo } from "../lib/seo";
import { PageHero, Section, FeatureCard } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { CTASection } from "../components/CTASection";

export function Careers() {
  useSeo("Careers — join the #1 team | elan1", "Build at the frontier of agentic transformation. Open roles across the six pillars and five regions, with an academy1 pathway for talent.");
  const roles = [
    ["Agent engineer", "agent1 · Build studio", "India · Remote"],
    ["Solutions architect", "Solutions · Verticals", "Singapore"],
    ["Governance lead", "assure1 · Trust", "India"],
    ["AgentOps engineer", "run1 · Operations", "Remote"],
    ["Strategy consultant", "strategy1", "US · ME"],
    ["Brand & content", "agency1 · Creative", "India · Remote"],
  ];
  return (
    <>
      <PageHero
        kicker="Company · Careers"
        accent="#3fae6b"
        title="Join the #1 team."
        subtitle="This is the frontier. We build production agents, govern them, and scale them for organizations from $1M to $1B — from India, for the world. If you want to ship real agentic systems, not slideware, you'll fit."
        cta={{ label: "See open roles", href: "#roles", secondary: { label: "Get certified first", href: "/academy" } }}
        media={<BrandImage src={pageImage.careers} alt="Working at elan1" accent="#3fae6b" ratio="card" treatment="duotone" eager className="shadow-lift" />}
      />
      <Section tone="paper">
        <div id="roles" />
        <SectionHead kicker="Open roles" title="Build what others only advise on." lede="Roles across the six pillars and five regions. Don't see your role? Tell us anyway." />
        <div className="mt-12 grid gap-3">
          {roles.map(([t, team, loc], i) => (
            <Reveal key={t} delay={i * 0.04}>
              <a href="/contact" className="group flex flex-col gap-2 rounded-card border border-line bg-surface p-6 transition-all hover:border-ink/20 hover:shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">{t}</h3>
                  <p className="font-mono text-xs text-muted">{team}</p>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-sm text-slate">{loc}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep">Apply <Icon.Arrow className="h-4 w-4" /></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead kicker="Why elan1" title="Why builders choose us." align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[["Frontier work", "Production agents on Claude — the real thing, in production."], ["Trust-first", "Governance is the craft, not an afterthought."], ["Global from India", "One team, five regions, world-class standard."]].map(([t, b], i) => (
            <Reveal key={t} delay={i * 0.06}><FeatureCard title={t} description={b} accent="#3fae6b" icon={<Icon.Spark className="h-4 w-4" />} /></Reveal>
          ))}
        </div>
      </Section>
      <CTASection title="Become the one who builds the agents." primary={{ label: "Apply / introduce yourself", href: "/contact" }} secondary={{ label: "Explore academy1", href: "/academy" }} />
    </>
  );
}

export function Partners() {
  useSeo("Partners — plug in and win together | elan1", "Join the elan1 partner ecosystem: systems integrators, technology partners, and capital. Build, refer, and scale agentic transformation together.");
  const kinds = [
    { t: "Systems integrators", b: "Co-deliver Launchpads and scaled rollouts; extend your agentic practice on enterprise1." },
    { t: "Technology partners", b: "Connect your platform via MCP and become part of the 1 Suite's integration fabric." },
    { t: "Capital & ecosystem", b: "Back the agentic transformation category from India for the world." },
  ];
  return (
    <>
      <PageHero
        kicker="Company · Partners"
        accent="#2f6df0"
        title="Plug in and win together."
        subtitle="elan1 grows through an ecosystem. Whether you integrate, deliver, or invest, there's a way to plug into the agentic transformation flywheel and win together."
        cta={{ label: "Become a partner", href: "/contact", secondary: { label: "Talk to us", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead kicker="Partner types" title="Three ways to plug in." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {kinds.map((k, i) => (
            <Reveal key={k.t} delay={i * 0.06}><FeatureCard title={k.t} description={k.b} accent="#2f6df0" icon={<Icon.Node className="h-4 w-4" />} /></Reveal>
          ))}
        </div>
      </Section>
      <Section tone="obsidian">
        <div className="mx-auto max-w-3xl text-center">
          <Kicker dark accent="#2f6df0">The ecosystem</Kicker>
          <p className="display mt-6 text-2xl leading-snug text-paper sm:text-3xl">
            Built on Claude, delivered with partners, governed by assure1. The category is new — the best time to
            help build it is now.
          </p>
        </div>
      </Section>
      <CTASection title="Let's build the category together." primary={{ label: "Become an elan1 partner", href: "/contact" }} />
    </>
  );
}
