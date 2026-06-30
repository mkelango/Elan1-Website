// pages/Resources.tsx — insights, diagram library, playbooks, proof, glossary hub.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";

const cards = [
  { t: "Diagram library", b: "See the systems we build — the full visual language, browsable.", href: "/resources/diagrams", accent: "#df8c64", live: true },
  { t: "Insights", b: "Agentic transformation, per layer and per vertical. Reviewed before publish, ad-free.", href: "/resources/insights", accent: "#7c6cf0", live: true },
  { t: "Use cases", b: "Agentic, by industry × job-to-be-done — generated from the platform's packs.", href: "/agentic", accent: "#2f6df0", live: true },
  { t: "Playbooks", b: "Gated guides — the Roadmap, governance, vertical & FinOps playbooks.", href: "/resources/playbooks", accent: "#2f6df0", live: true },
  { t: "Proof & case studies", b: "Before / after, with Trust Marks. Filterable by industry.", href: "/resources/proof", accent: "#3fae6b", live: true },
  { t: "ROI calculator", b: "Size the value, lite — a band-aware, illustrative estimate.", href: "/for/scaleup", accent: "#d39a3a", live: true },
  { t: "Glossary", b: "The agentic vocabulary, defined plainly. Searchable.", href: "/resources/glossary", accent: "#22b8c4", live: true },
];

export default function Resources() {
  useSeo("Resources — insights, diagrams, playbooks & proof | elan1", "The elan1 resources hub: the diagram library, insights, gated playbooks, proof and case studies, an ROI calculator, and a glossary.");
  return (
    <>
      <PageHero
        kicker="Resources"
        accent="#7c6cf0"
        title="Learn the agentic playbook."
        subtitle="Authority content, the diagram library, gated playbooks, proof, and tools — everything you need to understand agentic transformation and size it for your business."
        cta={{ label: "Browse the diagram library", href: "/resources/diagrams", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.06}>
              <Link to={c.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  {c.live ? <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span> : <span className="font-mono text-[10px] text-muted">soon</span>}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{c.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CTASection title="Prefer a working proof to a white paper?" body="A Discovery Sprint ships a real agent against your data — the best resource is one that runs." />
    </>
  );
}
