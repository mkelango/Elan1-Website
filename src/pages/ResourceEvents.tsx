import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";

export default function ResourceEvents() {
  useSeo("Events | elan1 Resources", "Upcoming events and conferences on agentic AI and enterprise transformation.");
  return (
    <>
      <PageHero
        kicker="Events"
        accent="#7c6cf0"
        title="Join us at events."
        subtitle="Meet the team at industry conferences, workshops, and exclusive events focused on agentic transformation."
        cta={{ label: "Explore resources", href: "/resources", secondary: { label: "Book a demo", href: "/contact" } }}
      />
      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center py-12">
          <p className="text-lg text-muted mb-8">Events coming soon.</p>
          <Link to="/resources" className="inline-flex items-center justify-center rounded-button bg-blue px-6 py-3 font-medium text-white transition-all hover:bg-blue/90">
            Back to Resources
          </Link>
        </div>
      </Section>
    </>
  );
}
