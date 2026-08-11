import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceWhitepapers() {
  useSeo("Whitepapers | elan1 Resources", "Technical whitepapers and research on enterprise AI and agentic transformation.");
  return (
    <>
      <PageHero
        kicker="Whitepapers"
        accent="#7c6cf0"
        title="Technical research."
        subtitle="In-depth whitepapers on enterprise AI architecture, governance, and integration patterns."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">Whitepapers and technical research coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
