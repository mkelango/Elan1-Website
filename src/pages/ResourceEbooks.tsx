import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceEbooks() {
  useSeo("eBooks | elan1 Resources", "Comprehensive guides and industry resources for enterprise AI transformation.");
  return (
    <>
      <PageHero
        kicker="eBooks"
        accent="#7c6cf0"
        title="Comprehensive guides."
        subtitle="Industry guides and comprehensive resources for planning and executing agentic transformation."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">eBooks and comprehensive guides coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
