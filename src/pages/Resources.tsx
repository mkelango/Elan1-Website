// pages/Resources.tsx — Guides, Whitepapers, Reports, eBooks, Tools, Academy.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";

const cards = [
  // Browse by type
  { category: "Browse by type", t: "Guides", b: "Deep-dive how-tos and best practices for agentic transformation.", href: "/resources/guides", accent: "#df8c64", live: true },
  { category: "Browse by type", t: "Whitepapers", b: "Technical insights and research on enterprise AI architecture and governance.", href: "/resources/whitepapers", accent: "#5ad1c0", live: true },
  { category: "Browse by type", t: "Reports", b: "Market analysis, case studies, and research on agentic adoption.", href: "/resources/reports", accent: "#2f6df0", live: true },
  { category: "Browse by type", t: "eBooks", b: "Comprehensive industry guides for planning agentic transformation.", href: "/resources/ebooks", accent: "#7c6cf0", live: true },
  
  // Tools & References
  { category: "Tools & References", t: "Blog", b: "Agentic transformation, thought through — on-brand, ad-free insights on strategy and governance.", href: "/resources/insights", accent: "#df8c64", live: true },
  { category: "Tools & References", t: "Webinars", b: "Live and recorded sessions on agentic transformation and enterprise AI.", href: "/resources/webinars", accent: "#5ad1c0", live: true },
  { category: "Tools & References", t: "Events", b: "Join us at industry conferences and exclusive events.", href: "/resources/events", accent: "#3fae6b", live: true },
  { category: "Tools & References", t: "ROI calculator", b: "Size the value, lite — a band-aware, illustrative estimate.", href: "/for/scaleup", accent: "#d39a3a", live: true },
  { category: "Tools & References", t: "Glossary", b: "The agentic vocabulary, defined plainly. Searchable.", href: "/resources/glossary", accent: "#22b8c4", live: true },
  
  // Academy
  { category: "Academy", t: "Academy", b: "Training and learning for building and running agents at scale.", href: "/resources/academy", accent: "#7c6cf0", live: true },
];

export default function Resources() {
  useSeo("Resources | elan1", "Guides, whitepapers, reports, tools, and training for agentic transformation.");
  return (
    <>
      <PageHero
        kicker="Resources"
        accent="#7c6cf0"
        title="Build with confidence."
        subtitle="Guides, research, tools, and training — everything you need to understand, build, and deploy agents at scale."
        cta={{ label: "Browse guides", href: "/resources/guides", secondary: { label: "Book a demo", href: "/contact" } }}
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
