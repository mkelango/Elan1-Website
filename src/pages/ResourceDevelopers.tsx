import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const devResources = [
  { t: "API Documentation", b: "Complete API reference with code examples in Python, JavaScript, and Go.", href: "/platform/engineering", accent: "#2f6df0" },
  { t: "SDK & Libraries", b: "Official SDKs for Python, JavaScript/TypeScript, Go, and Java.", href: "/platform/engineering", accent: "#5ad1c0" },
  { t: "MCP Connectors", b: "Model Context Protocol connectors to 50+ enterprise systems.", href: "/platform/connectors", accent: "#df8c64" },
  { t: "Code Examples", b: "Real-world examples: CRM agents, support automation, workflow orchestration.", href: "/platform/engineering", accent: "#7c6cf0" },
  { t: "CLI Tools", b: "Command-line tools for local development, testing, and deployment.", href: "/platform/engineering", accent: "#3fae6b" },
  { t: "Architecture", b: "Deep dive into elan1's architecture: control plane, record model, security.", href: "/platform", accent: "#22b8c4" },
];

export default function ResourceDevelopers() {
  useSeo("Developers | elan1 Resources", "APIs, SDKs, connectors, and code examples for building agents on elan1.");
  return (
    <>
      <PageHero
        kicker="Developers"
        accent="#2f6df0"
        title="Build production agents."
        subtitle="APIs, SDKs, connectors, and examples. Deploy agents that act on your data with full governance and audit trails."
        cta={{ label: "View API docs", href: "/platform/engineering", secondary: { label: "Join Slack", href: "#" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Developer Resources" 
          sub="Everything you need to build, test, and deploy governed agents on elan1"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {devResources.map((resource) => (
            <Reveal key={resource.t}>
              <Link to={resource.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="h-2.5 w-2.5 rounded-full mb-4" style={{ background: resource.accent }} />
                <h3 className="font-display text-lg font-bold text-ink">{resource.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{resource.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
