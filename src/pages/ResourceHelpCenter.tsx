import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const resources = [
  { t: "Guides", b: "Step-by-step guides for building and deploying agents.", href: "/resources/guides", accent: "#df8c64" },
  { t: "Whitepapers", b: "Deep-dive technical research on agentic architecture.", href: "/resources/whitepapers", accent: "#5ad1c0" },
  { t: "Reports", b: "Industry analysis and competitive research on AI transformation.", href: "/resources/reports", accent: "#2f6df0" },
  { t: "eBooks", b: "Comprehensive guides for planning enterprise agentic adoption.", href: "/resources/ebooks", accent: "#7c6cf0" },
  { t: "Blog", b: "Latest insights on agentic transformation, governance, and strategy.", href: "/resources/insights", accent: "#df8c64" },
  { t: "Glossary", b: "Complete agentic AI vocabulary with clear definitions.", href: "/resources/glossary", accent: "#22b8c4" },
];

export default function ResourceHelpCenter() {
  useSeo("Help Center | elan1 Resources", "Documentation, guides, and resources to help you build and deploy agents.");
  return (
    <>
      <PageHero
        kicker="Help Center"
        accent="#df8c64"
        title="Learn how to build agents."
        subtitle="Comprehensive guides, whitepapers, and documentation for understanding agentic transformation and deploying on elan1."
        cta={{ label: "Browse all", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Documentation & Resources" 
          sub="Everything you need to get started and scale your agentic systems"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {resources.map((r) => (
            <Reveal key={r.t}>
              <Link to={r.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="h-2.5 w-2.5 rounded-full mb-4" style={{ background: r.accent }} />
                <h3 className="font-display text-lg font-bold text-ink">{r.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{r.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
