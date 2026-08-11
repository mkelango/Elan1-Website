// pages/Resources.tsx — Help Center, Community, Developers
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";

const cards = [
  // Help Center
  { category: "Help Center", t: "Guides", b: "Step-by-step guides for building and deploying agents.", href: "/resources/guides", accent: "#df8c64", live: true },
  { category: "Help Center", t: "Whitepapers", b: "Technical research on agentic architecture and design.", href: "/resources/whitepapers", accent: "#5ad1c0", live: true },
  { category: "Help Center", t: "Reports", b: "Industry analysis and market research on AI transformation.", href: "/resources/reports", accent: "#2f6df0", live: true },
  { category: "Help Center", t: "eBooks", b: "Comprehensive guides for enterprise agentic adoption.", href: "/resources/ebooks", accent: "#7c6cf0", live: true },
  { category: "Help Center", t: "Blog", b: "Insights on agentic transformation, governance, and strategy.", href: "/resources/insights", accent: "#df8c64", live: true },
  { category: "Help Center", t: "Glossary", b: "Agentic AI vocabulary with clear, accessible definitions.", href: "/resources/glossary", accent: "#22b8c4", live: true },
  
  // Community
  { category: "Community", t: "Events", b: "Industry conferences, workshops, and exclusive networking events.", href: "/resources/events", accent: "#3fae6b", live: true },
  { category: "Community", t: "Webinars", b: "Live sessions with product experts, customers, and leaders.", href: "/resources/webinars", accent: "#5ad1c0", live: true },
  { category: "Community", t: "Slack Community", b: "Connect with 2000+ builders and get real-time support.", href: "/resources/community", accent: "#df8c64", live: true },
  
  // Developers
  { category: "Developers", t: "API Docs", b: "Complete API reference with code examples in 4+ languages.", href: "/platform/engineering", accent: "#2f6df0", live: true },
  { category: "Developers", t: "SDKs", b: "Official SDKs for Python, JavaScript, Go, and Java.", href: "/platform/engineering", accent: "#5ad1c0", live: true },
  { category: "Developers", t: "Connectors", b: "50+ MCP connectors to enterprise systems and APIs.", href: "/platform/connectors", accent: "#df8c64", live: true },
];

export default function Resources() {
  useSeo("Resources | elan1", "Learn, build, and connect: guides, documentation, events, APIs, and developer tools.");
  
  const helpCenter = cards.filter(c => c.category === "Help Center");
  const community = cards.filter(c => c.category === "Community");
  const developers = cards.filter(c => c.category === "Developers");
  
  return (
    <>
      <PageHero
        kicker="Resources"
        accent="#7c6cf0"
        title="Learn, build, connect."
        subtitle="Documentation, community, and developer tools — everything you need to build production-grade agents."
        cta={{ label: "Browse guides", href: "/resources/help-center", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      
      {/* Help Center */}
      <Section tone="paper">
        <SectionHead title="Help Center" sub="Guides, whitepapers, and documentation" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {helpCenter.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.06}>
              <Link to={c.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  {c.live ? <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span> : null}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{c.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      
      {/* Community */}
      <Section tone="white">
        <SectionHead title="Community" sub="Events, webinars, and connect with builders" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {community.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.06}>
              <Link to={c.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  {c.live ? <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span> : null}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{c.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      
      {/* Developers */}
      <Section tone="paper">
        <SectionHead title="Developers" sub="APIs, SDKs, and code examples" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {developers.map((c, i) => (
            <Reveal key={c.t} delay={(i % 3) * 0.06}>
              <Link to={c.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  {c.live ? <span className="rounded-full bg-green/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-green">live</span> : null}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{c.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{c.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      
      <CTASection title="Ready to build agents?" body="Start with a Discovery Sprint — a fixed-scope engagement that lands your first agent in production." />
    </>
  );
}
