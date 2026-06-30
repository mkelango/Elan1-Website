// pages/Academy.tsx — academy1 learning hub.
import { useSeo } from "../lib/seo";
import { PageHero, Section, FeatureCard } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { CTASection } from "../components/CTASection";

const offerings = [
  { title: "Courses & bootcamps", description: "“Claude for [role]” cohorts — sales, finance, legal, marketing, ops, and developers." },
  { title: "Certification", description: "Credentialed paths that validate real, Claude-native capability." },
  { title: "For enterprises", description: "Org-wide enablement and change programs with adoption analytics." },
  { title: "For individuals", description: "Self-serve courses and subscriptions to become an agent builder." },
  { title: "Talent marketplace", description: "Hire elan1-certified agent architects and engineers when you need them." },
];

export default function Academy() {
  useSeo("academy1 — agentic training, certification & talent | elan1", "Become the one who builds the agents. Training, certification, enterprise enablement, and a certified-talent marketplace.");
  return (
    <>
      <PageHero
        kicker="Academy · academy1"
        accent="#7c6cf0"
        title="Become the one who builds the agents."
        subtitle="Training, certification, and talent that turn your workforce into confident users and builders of agentic systems. We teach what we build — practical and Claude-native, grounded in real delivery, not theory."
        cta={{ label: "Browse the learning hub", href: "/academy/learn", secondary: { label: "Hire certified talent", href: "/get-started" } }}
        media={<BrandImage src={pageImage.academy} alt="academy1 — agentic learning" accent="#7c6cf0" ratio="card" treatment="duotone" eager className="shadow-lift" />}
      />
      <Section tone="paper">
        <SectionHead kicker="What's inside" title="From first cohort to certified talent." lede="A path for teams and individuals — and a marketplace when you need to hire." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 0.06}>
              <FeatureCard title={o.title} description={o.description} accent="#7c6cf0" icon={<Icon.Layers className="h-4 w-4" />} />
            </Reveal>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <SectionHead kicker="Why academy1" title="Adoption is the real ROI." lede="The best agents fail without confident people. academy1 drives adoption for every product and solution, pairs with people1, and powers the edu1 vertical." />
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {[["Role-based", "Practical skills per function"], ["Certified", "Credentials that mean something"], ["Enterprise", "Change & adoption at scale"], ["Pipeline", "Certified talent on demand"]].map(([t, b]) => (
                <div key={t} className="rounded-card border border-line bg-surface p-5">
                  <p className="font-display text-base font-bold text-ink">{t}</p>
                  <p className="mt-1 text-xs text-slate">{b}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>
      <CTASection title="Make your people agentic." primary={{ label: "Talk to academy1", href: "/contact" }} />
    </>
  );
}
