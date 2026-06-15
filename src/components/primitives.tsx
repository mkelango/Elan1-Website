// components/primitives.tsx — shared UI atoms used across the site.
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Reveal-on-scroll wrapper. Restrained, purposeful motion. */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export function Kicker({
  children,
  dark = false,
  accent,
}: {
  children: ReactNode;
  dark?: boolean;
  accent?: string;
}) {
  return (
    <span className={dark ? "kicker-light" : "kicker"} style={accent ? { color: accent } : undefined}>
      <span aria-hidden className="font-mono">//</span>
      {children}
    </span>
  );
}

/** Section heading block: kicker + title + optional lede. */
export function SectionHead({
  kicker,
  title,
  lede,
  dark = false,
  accent,
  align = "left",
  className = "",
}: {
  kicker?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  accent?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}>
      {kicker && (
        <Reveal>
          <Kicker dark={dark} accent={accent}>
            {kicker}
          </Kicker>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className={`display mt-4 text-3xl sm:text-4xl lg:text-[2.7rem] ${dark ? "text-paper" : "text-ink"}`}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className={`lede mt-5 ${dark ? "text-paper/70" : "text-slate"}`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** A small mono one-word brand tag like `customer1`. */
export function MonoTag({ children, accent, className = "" }: { children: ReactNode; accent?: string; className?: string }) {
  return (
    <span className={`font-mono text-sm font-semibold ${className}`} style={accent ? { color: accent } : undefined}>
      {children}
    </span>
  );
}

/* ——— Icon set (inline, stroke-based, currentColor) ——— */
type IconProps = { className?: string };
const base = "h-5 w-5";

export const Icon = {
  Arrow: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Check: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Shield: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Spark: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Bolt: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  Node: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 7.6L11 16M16.5 7.6L13 16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  ),
  Layers: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 3l9 5-9 5-9-5 9-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  Globe: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  Play: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5l5 3.5-5 3.5v-7z" fill="currentColor" />
    </svg>
  ),
  Plus: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  External: ({ className = base }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
