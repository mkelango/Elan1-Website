import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const templates = [
  { t: "CRM Agent", b: "Pre-built customer relationship management agent with lead scoring and pipeline automation.", category: "Sales", accent: "#df8c64" },
  { t: "Support Ticket Agent", b: "Automated support ticket routing, categorization, and resolution with escalation.", category: "Support", accent: "#5ad1c0" },
  { t: "Financial Reconciliation", b: "Bank reconciliation and financial statement matching agent with audit trails.", category: "Finance", accent: "#2f6df0" },
  { t: "Supply Chain Monitor", b: "Real-time inventory monitoring, demand forecasting, and supplier coordination agent.", category: "Operations", accent: "#7c6cf0" },
  { t: "Contract Analyzer", b: "Automatic contract review, risk identification, and compliance checking agent.", category: "Legal", accent: "#3fae6b" },
  { t: "HR Onboarding", b: "Complete employee onboarding automation with identity provisioning and training.", category: "HR", accent: "#22b8c4" },
];

export default function ResourceTemplates() {
  useSeo("Templates | elan1 Resources", "Pre-built agent templates for common enterprise workflows.");
  return (
    <>
      <PageHero
        kicker="Templates"
        accent="#df8c64"
        title="Start with proven templates."
        subtitle="Deploy production-ready agents in minutes. Choose from pre-built templates for sales, support, finance, operations, and more."
        cta={{ label: "Browse templates", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Agent Templates" 
          sub="Pre-built, tested, and ready to customize for your business"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {templates.map((t) => (
            <Reveal key={t.t}>
              <Link to="#" className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
                  <span className="rounded-full bg-blue/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-blue">{t.category}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{t.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{t.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Deploy <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
