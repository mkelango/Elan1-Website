import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceReports() {
  useSeo("Reports | elan1 Resources", "Market analysis and case studies on enterprise AI adoption and outcomes.");
  return (
    <>
      <PageHero
        kicker="Reports"
        accent="#7c6cf0"
        title="Market analysis & case studies."
        subtitle="Research reports, market analysis, and real-world case studies on agentic transformation."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">Reports and case studies coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
