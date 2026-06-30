// components/CTASection.tsx — the closing CTA band (obsidian). Ends every page.
import { Link } from "react-router-dom";
import { Reveal, Icon, Kicker } from "./primitives";

export function CTASection({
  kicker = "Get started",
  title = "Ready to run on agents?",
  body = "Start with one fixed-scope Discovery Sprint — low-risk, fully credited. We deploy a working, certified agent, then sequence the roadmap to scale it across your business.",
  primary = { label: "Start a Discovery Sprint", href: "/get-started" },
  secondary = { label: "Talk to sales", href: "/contact" },
}: {
  kicker?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="relative overflow-hidden bg-obsidian text-paper">
      <div className="absolute inset-0 bg-grid-obsidian opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(223,140,100,.35), transparent 65%)" }}
      />
      <div className="shell relative py-20 sm:py-28">
        <div className="max-w-2xl">
          <Reveal><Kicker dark>{kicker}</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-4 text-3xl text-paper sm:text-5xl">{title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-paper/70">{body}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to={primary.href} className="btn-accent">
                {primary.label} <Icon.Arrow className="h-4 w-4" />
              </Link>
              <Link to={secondary.href} className="btn-ghost-dark">
                {secondary.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-mono text-xs text-paper/40">
              Built on Claude · Governed by assure1 · Human-in-the-loop by design
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
