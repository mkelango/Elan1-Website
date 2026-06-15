// components/blocks.tsx — page-level building blocks reused across templates.
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal, Icon, Kicker } from "./primitives";

/** Inner-page hero with a tinted accent wash and blueprint grid. */
export function PageHero({
  kicker,
  title,
  subtitle,
  accent = "#df8c64",
  eyebrow,
  cta,
  meta,
  media,
}: {
  kicker: string;
  title: ReactNode;
  subtitle: ReactNode;
  accent?: string;
  eyebrow?: ReactNode;
  cta?: { label: string; href: string; secondary?: { label: string; href: string; external?: boolean } };
  meta?: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="absolute inset-0 bg-grid-paper opacity-60" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}33, transparent 65%)` }}
      />
      <div className={`shell relative py-16 sm:py-24 ${media ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
        <div className={media ? "" : "max-w-3xl"}>
          {eyebrow}
          <Reveal><Kicker accent={accent}>{kicker}</Kicker></Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">{title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede mt-6 max-w-2xl">{subtitle}</p>
          </Reveal>
          {cta && (
            <Reveal delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to={cta.href} className="btn-primary">
                  {cta.label} <Icon.Arrow className="h-4 w-4" />
                </Link>
                {cta.secondary &&
                  (cta.secondary.external ? (
                    <a href={cta.secondary.href} target="_blank" rel="noreferrer" className="btn-ghost">
                      {cta.secondary.label} <Icon.External className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link to={cta.secondary.href} className="btn-ghost">
                      {cta.secondary.label}
                    </Link>
                  ))}
              </div>
            </Reveal>
          )}
          {meta && <Reveal delay={0.2}><div className="mt-8">{meta}</div></Reveal>}
        </div>
        {media && (
          <Reveal delay={0.15} className="relative">
            {media}
          </Reveal>
        )}
      </div>
    </section>
  );
}

/** A titled card with an accent dot — the universal feature/capability card. */
export function FeatureCard({
  title,
  description,
  accent,
  index,
  icon,
}: {
  title: string;
  description: string;
  accent?: string;
  index?: number;
  icon?: ReactNode;
}) {
  return (
    <div className="card card-hover h-full">
      <div className="flex items-center gap-3">
        {icon ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${accent ?? "#df8c64"}1a`, color: accent ?? "#b9603f" }}>
            {icon}
          </span>
        ) : (
          <span className="font-mono text-xs text-muted">{index !== undefined ? String(index + 1).padStart(2, "0") : null}</span>
        )}
        <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-slate">{description}</p>
    </div>
  );
}

/** Bullet list with accent ticks. */
export function TickList({ items, accent = "#3fae6b", columns = 1 }: { items: string[]; accent?: string; columns?: 1 | 2 }) {
  return (
    <ul className={`grid gap-3 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((it, i) => (
        <Reveal as="li" key={i} delay={i * 0.04} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${accent}1f`, color: accent }}>
            <Icon.Check className="h-3.5 w-3.5" />
          </span>
          <span className="text-[15px] leading-relaxed text-slate">{it}</span>
        </Reveal>
      ))}
    </ul>
  );
}

/** The governance-spine panel — the brand's signature differentiator made visual (rose). */
export function GovernanceSpine({ text, label = "Governance signature" }: { text: string; label?: string }) {
  return (
    <div className="relative overflow-hidden rounded-card border border-rose/30 bg-rose/[0.05] p-6 sm:p-7">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-rose" aria-hidden />
      <div className="flex items-center gap-2 pl-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-rose/15 text-rose">
          <Icon.Shield className="h-4 w-4" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-kicker text-rose">{label}</span>
      </div>
      <p className="mt-3 pl-2 text-[15px] leading-relaxed text-ink/85">{text}</p>
    </div>
  );
}

/** Section wrapper with consistent vertical rhythm. */
export function Section({
  children,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "paper" | "mist" | "obsidian";
  className?: string;
  id?: string;
}) {
  const toneClass =
    tone === "obsidian" ? "bg-obsidian text-paper" : tone === "mist" ? "bg-mist" : "bg-paper";
  return (
    <section id={id} className={`${toneClass} ${className}`}>
      <div className="shell py-20 sm:py-28">{children}</div>
    </section>
  );
}

/** Composed-of pills linking to the offerings a solution/service connects to. */
export function ComposedOf({ slugs }: { slugs: string[] }) {
  const route = (slug: string) => {
    const products = ["customer1", "service1", "finance1", "supply1", "people1", "market1", "enterprise1"];
    const services = ["strategy1", "agent1", "assure1", "academy1", "run1", "agency1"];
    if (products.includes(slug)) return `/products/${slug}`;
    if (services.includes(slug)) return `/services/${slug}`;
    return `/solutions/${slug}`;
  };
  return (
    <div className="flex flex-wrap gap-2">
      {slugs.map((s) => (
        <Link key={s} to={route(s)} className="chip transition-colors hover:border-ink/30 hover:text-ink">
          <Icon.Node className="h-3.5 w-3.5" /> {s}
        </Link>
      ))}
    </div>
  );
}

/** A back-link breadcrumb for inner pages. */
export function Crumb({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-ink">
      <span className="rotate-180"><Icon.Arrow className="h-3.5 w-3.5" /></span> {label}
    </Link>
  );
}
