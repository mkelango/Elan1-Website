import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceWebinars() {
  useSeo("Webinars | elan1 Resources", "Live and recorded webinars on agentic transformation and enterprise AI.");
  return (
    <>
      <PageHero
        kicker="Webinars"
        accent="#7c6cf0"
        title="Live learning sessions."
        subtitle="Join us for live webinars and access recordings on agentic transformation, governance, and enterprise AI best practices."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">Webinars coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
