// pages/PlatformOverview.tsx — the Platform hub.
//
// Products = the five categories you run your business on.
// Platform = what it runs on, and who governs it.
//
// Two columns, both DERIVED: "The platform" is enterprise1 (the control plane) plus the software
// pillars (`platformPillars` from services.ts); "The approach" is the narrative set that already
// lived under this menu. Nothing here re-lists a pillar by hand.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { AbstractHero } from "../components/BrandImage";
import { platformPillars, servicePath } from "../content/services";
import { products } from "../content/products";
import { APPROACH_LINKS } from "../content/site";
import { CROSS_APP_FLOWS } from "../content/crossapp";

export default function PlatformOverview() {
  useSeo(
    "The platform — the control plane your agents run on | elan1",
    "enterprise1 is the control plane: governance, identity, audit and rollout. agent1 builds the agents, assure1 proves them, run1 operates them.",
    {
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "The elan1 platform",
        description:
          "The control plane the 1 Suite runs on, and the pillars that build, prove and operate it.",
        url: "https://elan1.ai/platform",
        isPartOf: { "@type": "WebSite", name: "elan1", url: "https://elan1.ai" },
      },
    },
  );

  const enterprise1 = products.find((p) => p.slug === "enterprise1");

  return (
    <>
      <PageHero
        kicker="Platform"
        accent="#b9603f"
        title={<>What your business runs on. <br />And who governs it.</>}
        subtitle="Products are the five categories you run your business on. The platform is the layer beneath them — one control plane for identity, policy, audit and rollout, plus the pillars that build the agents, prove them, and operate them in production."
        cta={{
          label: "Talk to sales",
          href: "/contact",
          secondary: { label: "What is agentic transformation?", href: "/what-is-agentic-transformation" },
        }}
        media={
          <AbstractHero
            label="the platform"
            sub="control plane · build · prove · operate"
            accent="#b9603f"
            accent2="#2f6df0"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* The control plane */}
      <Section tone="paper">
        <SectionHead
          kicker="The control plane"
          title="One place the whole suite answers to."
          lede="Every app in the 1 Suite standardizes on enterprise1 — so governance, identity, audit and rollout are the same everywhere, not re-implemented per app. assistant1 is how you talk to it."
        />
        {enterprise1 && (
          <Reveal>
            <Link
              to="/platform/enterprise1"
              className="group mt-10 flex flex-col gap-6 rounded-card border border-transparent bg-obsidian p-8 text-paper shadow-card transition-all hover:-translate-y-1 hover:shadow-lift lg:flex-row lg:items-center"
            >
              <div className="lg:flex-1">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                  <span className="font-mono text-lg font-semibold text-paper">enterprise1</span>
                  <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-clay">
                    control plane
                  </span>
                </span>
                <p className="mt-4 font-display text-xl font-bold leading-snug text-paper">
                  {enterprise1.tagline}
                </p>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-paper/65">
                  {enterprise1.hero.subhead}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-clay group-hover:text-paper">
                Explore enterprise1 <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        )}
        <Reveal delay={0.08}>
          <Link
            to="/platform/assistant1"
            className="group mt-4 flex flex-col gap-6 rounded-card border border-line bg-surface p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift lg:flex-row lg:items-center"
          >
            <div className="lg:flex-1">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#5ad1c0" }} />
                <span className="font-mono text-lg font-semibold text-ink">assistant1</span>
                <span className="rounded-full bg-cyan/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-cyan">
                  the assistant
                </span>
              </span>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-ink">
                Ask the suite. It answers — and asks before it acts.
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate">
                The conversational way in: grounded in your records with citations, screened for
                injection, and holding no writer of its own — every consequential action goes to the
                app that owns the record, which applies its own gate.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-clayDeep group-hover:text-ink">
              Explore assistant1 <Icon.Arrow className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </Section>

      {/* The software pillars — build, prove, operate */}
      <Section tone="mist">
        <SectionHead
          kicker="The platform pillars"
          title="Plan it. Build it. Prove it. Operate it."
          lede="The engagement that plans the work, then the software that builds, proves and operates it — all on the control plane."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platformPillars.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
              <Link
                to={servicePath(s)}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.accent }} />
                  <span className="font-mono text-base font-semibold text-ink">{s.name}</span>
                </span>
                <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">{s.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.promise}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                  Explore {s.name} <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Training is people, not software — it lives in{" "}
            <Link to="/resources/academy" className="text-clayDeep hover:underline">
              Resources
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* Cross-app workflows — the strongest multi-app differentiator, and absent from the site
          until now. Framed as DECLARED, with enablement described as the wave control it is. */}
      <Section tone="obsidian">
        <SectionHead
          kicker="Across the suite"
          title="Where one app's decision becomes another app's work."
          lede="This is what a suite on one core gives you that separate products cannot: the handoff is a governed transaction inside the platform, not an integration you maintain between two vendors."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
          {CROSS_APP_FLOWS.map((f) => (
            <div key={f.id} className="bg-obsidian p-5">
              <p className="font-mono text-sm font-semibold text-clay">{f.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-paper/65">{f.handoff}</p>
            </div>
          ))}
        </div>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-paper/70">
            {CROSS_APP_FLOWS.length} of these are declared in the platform. Which of them run in your
            tenant is a rollout decision, not a licence: agents are enabled in governed waves, and the
            consequential ones stay off until you turn them on. That staging is the control, not a
            shortfall — it is how a suite this size gets adopted without a big-bang cutover.
          </p>
        </Reveal>
      </Section>

      {/* The approach — the existing narrative set */}
      <Section tone="paper">
        <SectionHead
          kicker="The approach"
          title="Why it's built this way."
          lede="The thinking behind the platform — the category, the philosophy, and how governance is made provable rather than asserted."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH_LINKS.map((l, i) => (
            <Reveal key={l.href + l.label} delay={(i % 4) * 0.05}>
              <Link
                to={l.href}
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                {l.accent && <span className="h-2 w-2 rounded-full" style={{ background: l.accent }} />}
                <p className="mt-3 font-display text-base font-bold leading-snug text-ink">{l.label}</p>
                {l.desc && <p className="mt-2 text-sm leading-relaxed text-slate">{l.desc}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker>How the layers fit</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              Products on top. Platform underneath.
            </h2>
          </div>
          <Reveal>
            <div className="space-y-3">
              {[
                { k: "Products", v: "The five categories you run your business on — revenue, service1, trade, works, compass.", to: "/products" },
                { k: "Platform", v: `What they run on and who governs them — enterprise1, plus ${platformPillars.map((p) => p.name).join(", ")}.`, to: "/platform" },
                { k: "Solutions", v: "The same suite, configured for your industry.", to: "/solutions" },
                { k: "Resources", v: "Learn it and prove it — insights, proof, and the Academy that certifies your people.", to: "/resources" },
              ].map((r) => (
                <Link
                  key={r.k}
                  to={r.to}
                  className="flex items-start gap-4 rounded-card border border-paper/15 bg-paper/[0.04] p-5 transition-colors hover:border-paper/30"
                >
                  <span className="font-mono text-sm font-semibold text-clay">{r.k}</span>
                  <span className="text-sm leading-relaxed text-paper/70">{r.v}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection title="See the platform on your data." />
    </>
  );
}
