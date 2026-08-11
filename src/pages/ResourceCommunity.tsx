import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";

const communityItems = [
  { t: "Events", b: "Join us at industry conferences, webinars, and exclusive networking events.", href: "/resources/events", accent: "#3fae6b" },
  { t: "Webinars", b: "Live sessions with product experts, customers, and industry leaders.", href: "/resources/webinars", accent: "#5ad1c0" },
  { t: "Slack Community", b: "Connect with 2000+ builders, share best practices, and get support.", href: "#", accent: "#df8c64" },
  { t: "GitHub", b: "Open-source connectors, examples, and community contributions.", href: "https://github.com/elan1ai", accent: "#2f6df0" },
  { t: "Forum", b: "Ask questions, share ideas, and learn from the elan1 community.", href: "#", accent: "#7c6cf0" },
  { t: "Customer Success", b: "Stories from companies transforming their operations with elan1.", href: "#", accent: "#22b8c4" },
];

export default function ResourceCommunity() {
  useSeo("Community | elan1 Resources", "Join the elan1 community: events, webinars, forum, and customer stories.");
  return (
    <>
      <PageHero
        kicker="Community"
        accent="#3fae6b"
        title="Join 2000+ agentic builders."
        subtitle="Connect with the global elan1 community. Share ideas, learn from others, and grow together."
        cta={{ label: "Join Slack", href: "#", secondary: { label: "Attend an event", href: "/resources/events" } }}
      />
      <Section tone="paper">
        <SectionHead 
          title="Community Hub" 
          sub="Events, webinars, forums, and real stories from companies scaling agentic systems"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {communityItems.map((item) => (
            <Reveal key={item.t}>
              <Link to={item.href} className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="h-2.5 w-2.5 rounded-full mb-4" style={{ background: item.accent }} />
                <h3 className="font-display text-lg font-bold text-ink">{item.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{item.b}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">Open <Icon.Arrow className="h-4 w-4" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
