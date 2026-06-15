// pages/Learn.tsx — WS4.4: the public academy1 learning hub. Courses + certification levels, tied to
// platform roles (the certification economy).
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { CTASection } from "../components/CTASection";
import { COURSES, CERT_LEVELS } from "../content/courses";

export default function Learn() {
  useSeo(
    "academy1 — learning hub & certification | elan1",
    "Learn to run on agents: courses for operating the platform, certifications tied to platform roles, and a path from associate to expert.",
  );
  return (
    <>
      <PageHero
        kicker="academy1 · Learn"
        accent="#7c6cf0"
        title="Get certified to run on agents."
        subtitle="Courses for operating the platform and its apps, with certifications tied to real platform roles — from associate to expert. Enable your team; earn verifiable credentials."
        cta={{ label: "Talk to academy1", href: "/get-started", secondary: { label: "Back to Academy", href: "/academy" } }}
      />

      <Section tone="paper">
        <SectionHead kicker="Courses" title="Learn by the job you do." lede="Each course certifies a platform role. Finish a path, earn the credential." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {COURSES.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 2) * 0.06}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wide" style={{ color: c.accent }}>{c.level}</span>
                  <span className="font-mono text-[11px] text-muted">certifies · {c.role}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm text-slate">{c.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {c.modules.map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-slate">
                      <Icon.Check className="mt-0.5 h-4 w-4 shrink-0 text-clayDeep" /> {m}
                    </li>
                  ))}
                </ul>
                <Link to="/get-started" className="mt-5"><span className="link-underline">Enrol <Icon.Arrow className="h-4 w-4" /></span></Link>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead kicker="Certification" title="Three levels, mapped to platform capabilities." align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {CERT_LEVELS.map((l, i) => (
            <Reveal key={l.level} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-6 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/[0.10] px-3 py-1 font-mono text-[11px] font-medium text-green">
                  <Icon.Shield className="h-3.5 w-3.5" /> {l.level}
                </span>
                <p className="mt-3 text-sm text-slate">{l.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
          Credentials are verifiable and audited; certified practitioners can be matched to demand via the{" "}
          <Link to="/company/partners" className="text-clayDeep underline underline-offset-2">partner ecosystem</Link>.
        </p>
      </Section>

      <CTASection title="Enable your team." body="academy1 certifies your people to operate, approve, and administer the platform — confidently." />
    </>
  );
}
