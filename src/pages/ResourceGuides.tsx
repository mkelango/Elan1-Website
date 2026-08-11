import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceGuides() {
  useSeo("Guides | elan1 Resources", "Deep-dive guides and best practices for building and running agents.");
  return (
    <>
      <PageHero
        kicker="Guides"
        accent="#7c6cf0"
        title="Deep-dive guides."
        subtitle="How-to guides and best practices for agentic transformation, governance, and operations."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">Guides and best practices coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
