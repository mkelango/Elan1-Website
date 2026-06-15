// pages/DiagramLibrary.tsx — the visual system, browsable. A core differentiator: let buyers SEE the systems.
import { useState } from "react";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { Reveal } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { CTASection } from "../components/CTASection";
import { DIAGRAM_LIBRARY } from "../lib/diagrams";

const GROUPS = ["All", "System", "Architecture", "Services", "Products", "Solutions"] as const;
const accentFor: Record<string, string> = { System: "#df8c64", Architecture: "#2f6df0", Services: "#7c6cf0", Products: "#22b8c4", Solutions: "#d39a3a" };

export default function DiagramLibrary() {
  useSeo("Diagram library — the elan1 visual system | elan1", "Browse the elan1 diagram library: system map, product architectures, service operating models, and industry solution maps.");
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const items = DIAGRAM_LIBRARY.filter((d) => group === "All" || d.group === group);

  return (
    <>
      <PageHero
        kicker="Resources · Diagram library"
        accent="#df8c64"
        title="See the systems we build."
        subtitle="Most firms show you a logo wall. We show you the architecture. Every offering ships with a blueprint — explore the full visual system, the same one our diagrams and this website are built from."
        cta={{ label: "Book a demo", href: "/contact", secondary: { label: "Read the strategy", href: "/what-is-agentic-transformation" } }}
      />
      <Section tone="paper">
        <div className="flex flex-wrap gap-2">
          {GROUPS.map((g) => (
            <button
              key={g}
              onClick={() => setGroup(g)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                group === g ? "border-transparent bg-ink text-paper" : "border-line bg-surface text-slate hover:border-ink/30"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((d, i) => (
            <Reveal key={d.src} delay={(i % 2) * 0.06}>
              <div>
                <DiagramEmbed src={d.src} title={d.title} accent={accentFor[d.group] ?? "#df8c64"} caption={d.blurb} />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 font-mono text-xs text-muted">
          {items.length} diagram{items.length === 1 ? "" : "s"} · self-contained SVG · part of the elan1 visual system
        </p>
      </Section>
      <CTASection title="Want a blueprint for your business?" body="A Discovery Sprint produces a diagram like these — mapped to your systems, your data, and your governance." />
    </>
  );
}
