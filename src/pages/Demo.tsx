// pages/Demo.tsx — WS1.6 + WS3.3: live, governed agent demos across offerings. Proof beats promises.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon } from "../components/primitives";
import { LiveAgentDemo } from "../components/LiveAgentDemo";
import { CTASection } from "../components/CTASection";
import { DEMOS } from "../content/demos";

const GOVERNED = [
  { k: "Grounded (K3)", body: "The agent reads the system of record via an MCP connector — it acts on facts, not guesses." },
  { k: "Human-in-the-loop (K5)", body: "The send is gated. Nothing consequential happens until a person approves it." },
  { k: "Immutable audit (K6)", body: "Every step — run, tool, skill, decision, approval, send — is hash-chained and verifiable." },
  { k: "Trust Mark (assure1)", body: "The output is evaluated; the workflow earns a Trust Mark only on a pass. No eval, no mark." },
];

export default function Demo() {
  const [active, setActive] = useState(DEMOS[0]);
  useSeo(
    "See a live, governed agent | elan1",
    "Run a real agentic workflow in your browser: it researches an account, drafts an on-brand renewal note, and stops for your approval before sending — grounded, audited, Trust-Marked. Illustrative, no real data.",
    { type: "article" },
  );

  return (
    <>
      <PageHero
        kicker="See it work"
        accent="#df8c64"
        title="A governed agent, live. You hold the approval."
        subtitle="This is the real workflow, not a video: research → grounded draft → human approval → send → audit → Trust Mark. It's illustrative and uses no real data — but the governance is exactly how the platform runs."
        cta={{ label: "Start a Discovery Sprint", href: "/contact", secondary: { label: "Why governance wins", href: "/trust" } }}
      />

      <Section tone="paper">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[11px] uppercase tracking-wide text-muted">Pick an agent:</span>
          {DEMOS.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                d.id === active.id ? "border-clayDeep bg-clay/10 text-clayDeep" : "border-line bg-surface text-slate hover:text-ink"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <LiveAgentDemo scenario={active} />
          </Reveal>
          <div>
            <SectionHead
              kicker="What you're watching"
              title="The agent acts — but never unsupervised."
              lede="Legacy tools either do nothing (a chatbot) or do too much (an ungoverned script). This is the third way: an agent that completes real work behind real gates."
            />
            <div className="mt-8 space-y-3">
              {GOVERNED.map((g, i) => (
                <Reveal key={g.k} delay={i * 0.05}>
                  <div className="flex items-start gap-3 rounded-card border border-line bg-surface p-5">
                    <Icon.Shield className="mt-0.5 h-5 w-5 shrink-0 text-clayDeep" />
                    <div>
                      <h3 className="font-display text-base font-bold text-ink">{g.k}</h3>
                      <p className="mt-1 text-sm text-slate">{g.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted">
              Want it on your data, in your stack?{" "}
              <Link to="/contact" className="font-medium text-clayDeep underline underline-offset-2">
                Start a Discovery Sprint
              </Link>{" "}
              — a working, certified agent in weeks.
            </p>
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
