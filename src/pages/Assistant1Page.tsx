// pages/Assistant1Page.tsx — assistant1, the governed central assistant.
//
// Renders entirely from content/assistant1.ts, where every claim carries a platform-code reference.
// Nothing is re-listed here.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  ASSISTANT_SPINE,
  ASSISTANT_CAPABILITIES,
  ASSISTANT_BOUNDARIES,
  ASSISTANT_SEO,
} from "../content/assistant1";

const ACCENT = "#5ad1c0";

export default function Assistant1Page() {
  useSeo(ASSISTANT_SEO.title, ASSISTANT_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "assistant1",
      applicationCategory: "BusinessApplication",
      description: ASSISTANT_SEO.description,
      url: "https://elan1.ai/platform/assistant1",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Platform · the governed central assistant"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/platform" label="Platform" />
            </div>
          </Reveal>
        }
        title={<>Ask the suite. <br />It answers — and asks before it acts.</>}
        subtitle="assistant1 is the conversational way into the 1 Suite. It answers from your own records, and when you ask for something consequential it drafts a proposal instead of doing it — because it holds no writer for a business system of record. The owning app applies its own gate to what you approve."
        cta={{
          label: "Start a Discovery Sprint",
          href: "/get-started",
          secondary: { label: "See a live agent", href: "/demo" },
        }}
        meta={<span className="font-mono text-3xl font-bold" style={{ color: ACCENT }}>assistant1</span>}
        media={
          <AbstractHero
            label="assistant1"
            sub="screen · ground · propose · act"
            accent={ACCENT}
            accent2="#2f6df0"
            ratio="card"
            className="shadow-lift"
            variant="console"
          />
        }
      />

      {/* The distinction that matters */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Kicker accent={ACCENT}>The difference</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              An assistant that cannot quietly change your data.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              assistant1 is built so that the conversation is not where authority lives. It owns its
              own conversation record and holds no writer for a business system of record. When you
              approve something, the request is handed to the app that owns that record, and the app
              applies its own approval gate before anything changes.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              The practical consequence: a conversation cannot become a side door around a control
              your finance or supply team already enforces.
            </p>
          </div>
          <Reveal>
            <div className="space-y-3">
              {ASSISTANT_SPINE.map((s) => (
                <div key={s.step} className="rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs" style={{ color: ACCENT }}>{s.step}</span>
                    <span className="font-display text-base font-bold text-paper">{s.name}</span>
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-kicker text-paper/40">
                      gated
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/65">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Capabilities */}
      <Section tone="paper">
        <SectionHead
          kicker="What it does"
          title="Grounded, screened, and answerable for itself."
          lede="Every one of these is a property of the platform underneath, not an instruction in a prompt — which is why it holds on every channel."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASSISTANT_CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.06}>
              <div className="card card-hover h-full">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}1a`, color: ACCENT }}
                  >
                    <Icon.Shield className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{c.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{c.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What it is not */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Boundaries"
              title="What it will not do."
              lede="Worth stating plainly, because this category overclaims freely."
            />
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <TickList items={ASSISTANT_BOUNDARIES} accent={ACCENT} />
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                These are limits by design. An assistant that could do any of them would be easier to
                demo and harder to put in front of an auditor.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* How it sits in the platform */}
      <Section tone="paper">
        <SectionHead
          kicker="How it fits"
          title="One control plane. One way in."
          lede="assistant1 runs on the same core, identity and audit as every app in the suite — it is not a separate product bolted alongside them."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <Link
              to="/platform/enterprise1"
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-mono text-base font-semibold text-ink">enterprise1</span>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                The control plane it answers to.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Governance, identity, audit and rollout — the same for the assistant as for every app.
              </p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                Explore enterprise1 <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Link
              to="/products"
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-mono text-base font-semibold text-ink">the 1 Suite</span>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                The apps it proposes to.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                Five categories of agentic apps. Each keeps its own approval gate — the assistant asks
                them, it does not overrule them.
              </p>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                Explore the suite <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Put a governed assistant in front of your team."
        body="Start with one fixed-scope Discovery Sprint — low-risk and fully credited. We map the highest-value conversation and ship a working, governed proof."
      />
    </>
  );
}
