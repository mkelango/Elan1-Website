// pages/About.tsx — the company story, vision/mission/values, leadership.
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Kicker, Icon } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { CTASection } from "../components/CTASection";

const values = [
  ["One standard", "Trust first, always."],
  ["One-to-one", "Hyper-personal in everything."],
  ["Number one", "Excellence as the baseline."],
  ["One speed", "Lightning — weeks, not quarters."],
  ["One team", "India-rooted, global."],
  ["Built to last", "Longevity over hype."],
];

export default function About() {
  useSeo("About elan1 — the agentic transformation company", "Born in India to lead the agentic era. The three-layer model, the vision, the values, and the team building the IBM/Microsoft of agentic transformation.");
  return (
    <>
      <PageHero
        kicker="Company · About"
        accent="#df8c64"
        title="Born in India to lead the agentic era."
        subtitle="elan1 is the agentic transformation company — a Claude-native platform of agentic apps, industry solutions, and end-to-end services that takes any organization from “we use AI” to “we run on agents.” Think the IBM/Microsoft of agentic transformation, built from India for the world."
        cta={{ label: "Join the team", href: "/company/careers", secondary: { label: "Partner with us", href: "/company/partners" } }}
        media={<BrandImage src={pageImage.about} alt="The elan1 team" accent="#df8c64" ratio="card" treatment="duotone" eager className="shadow-lift" />}
      />
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Kicker>Vision</Kicker>
            <p className="display mt-5 text-2xl leading-snug text-ink sm:text-3xl">
              A world where every organization operates with the intelligence, speed, and care of one — agentic,
              hyper-personal, and number one in its field.
            </p>
          </div>
          <div>
            <Kicker accent="#2f6df0">Mission</Kicker>
            <p className="display mt-5 text-2xl leading-snug text-ink sm:text-3xl">
              To be the world's #1 Claude-based agentic transformation partner across India, Singapore, the US, the
              Middle East, and Europe.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead kicker="Values · the “1” code" title="Six values. One standard." align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map(([t, b], i) => (
            <Reveal key={t} delay={(i % 3) * 0.05}>
              <div className="h-full rounded-card border border-line bg-surface p-6">
                <span className="font-mono text-2xl font-bold text-clayDeep">1</span>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{t}</h3>
                <p className="mt-1.5 text-sm text-slate">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHead kicker="The model" title="One company, three layers." lede="Services deliver, products deploy, solutions serve — wrapped in governance, built on Claude." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            ["Services", "Six pillars — how we deliver, end to end.", "#7c6cf0", "/services"],
            ["Products", "The 1 Suite — ten agentic apps, one per function.", "#2f6df0", "/products"],
            ["Solutions", "Ten verticals — the suite, tuned to your industry.", "#d39a3a", "/solutions"],
          ].map(([t, b, a, href], i) => (
            <Reveal key={t} delay={i * 0.06}>
              <a href={href} className="group block h-full rounded-card border border-line bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-card">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: a, display: "block" }} />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{t}</h3>
                <p className="mt-2 text-sm text-slate">{b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Explore <Icon.Arrow className="h-4 w-4" /></span>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="obsidian">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="flex h-40 w-40 items-center justify-center rounded-full border border-lineDark bg-white/[0.03]">
              <span className="display text-5xl text-clay">E</span>
            </div>
          </Reveal>
          <div>
            <Kicker dark>Leadership</Kicker>
            <h2 className="display mt-4 text-2xl text-paper sm:text-3xl">Elango — Founder & CEO</h2>
            <p className="mt-4 max-w-2xl text-paper/70">
              elan1 is led by Elango, with pillar and product leads across regions. We teach what we build and we
              build what we sell — practice precedes the pitch.
            </p>
          </div>
        </div>
      </Section>
      <CTASection title="Build the agentic era with us." primary={{ label: "See open roles", href: "/company/careers" }} secondary={{ label: "Contact us", href: "/contact" }} />
    </>
  );
}
