import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const playbooks = [
  { t: "Agents to Production", b: "Step-by-step guide: from discovery to production deployment. Timeline, governance, scaling.", section: "Getting Started", accent: "#df8c64" },
  { t: "Building Your First Agent", b: "Complete walkthrough: define goals, build workflow, add intelligence, deploy safely.", section: "Getting Started", accent: "#5ad1c0" },
  { t: "Governance Framework", b: "Implementing policy engines, approval gates, audit trails. Compliance-ready from day one.", section: "Governance", accent: "#2f6df0" },
  { t: "AI Operations (AIOps)", b: "Monitoring, metrics, incident response for agentic systems. Operational playbooks.", section: "Operations", accent: "#7c6cf0" },
  { t: "Agents x Your Data", b: "Safely connecting agents to databases, APIs, and knowledge bases without exposing data.", section: "Security", accent: "#3fae6b" },
  { t: "Scaling Beyond One Agent", b: "Multi-agent orchestration, cross-team deployment, shared governance infrastructure.", section: "Advanced", accent: "#22b8c4" },
];

export default function ResourcePlaybooks() {
  useSeo("Playbooks | elan1 Resources", "Step-by-step guides for implementing agents in your organization.");
  return (
    <>
      <PageHero
        kicker="Playbooks"
        accent="#df8c64"
        title="Implementation roadmaps."
        subtitle="Proven playbooks from deploying 500+ agents. From discovery to production-scale operations."
        cta={{ label: "Browse playbooks", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Deployment Playbooks" 
          sub="Step-by-step guides for implementing agents at scale, from day one to enterprise operations"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {playbooks.map((p) => (
            <Reveal key={p.t}>
              <Link to="#" className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.accent }} />
                  <span className="rounded-full bg-blue/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-blue">{p.section}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{p.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{p.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Read <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
