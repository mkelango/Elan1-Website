import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const caseStudies = [
  { t: "Global Bank: 60% Cost Reduction", b: "Fortune 500 bank automated 500K transactions/month with compliance verification. Reduced processing costs by 60%.", industry: "Finance", accent: "#2f6df0" },
  { t: "Healthcare Provider: 40% Faster Service", b: "Regional hospital network deployed patient intake agents across 12 facilities. Reduced wait times by 40%.", industry: "Healthcare", accent: "#3fae6b" },
  { t: "SaaS Company: 3x Support Capacity", b: "B2B SaaS tripled support capacity by deploying tier-1 support agents. CSAT improved from 82% to 94%.", industry: "Technology", accent: "#5ad1c0" },
  { t: "Manufacturing: Real-time Inventory", b: "Industrial manufacturer deployed supply chain agent. Inventory shrinkage reduced from 8% to 2%.", industry: "Operations", accent: "#7c6cf0" },
  { t: "Insurance Firm: 5x Claims Processing", b: "Nationwide insurer processes 50K claims/month with agents. Settlement time cut from 21 days to 4 days.", industry: "Insurance", accent: "#df8c64" },
  { t: "Legal Firm: Contract Review Automation", b: " 100-lawyer firm deployed contract analysis agents. Review time dropped from 8 hours to 30 minutes per contract.", industry: "Legal", accent: "#22b8c4" },
];

export default function ResourceCaseStudies() {
  useSeo("Case Studies | elan1 Resources", "Real customer success stories and measurable business outcomes.");
  return (
    <>
      <PageHero
        kicker="Case Studies"
        accent="#3fae6b"
        title="See real results."
        subtitle="How enterprises transformed operations with agentic automation. Measurable outcomes, verifiable results."
        cta={{ label: "View all cases", href: "/resources", secondary: { label: "Schedule a call", href: "/contact" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Customer Success Stories" 
          sub="Real outcomes from Fortune 500 companies, mid-market enterprises, and innovative startups"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {caseStudies.map((cs) => (
            <Reveal key={cs.t}>
              <Link to="#" className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: cs.accent }} />
                  <span className="rounded-full bg-blue/15 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-blue">{cs.industry}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{cs.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{cs.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">Read story <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
