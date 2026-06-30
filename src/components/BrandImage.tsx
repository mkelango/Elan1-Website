// components/BrandImage.tsx
// The brand image treatment system. Every photo across the site renders through this so it is
// consistently brand-graded (duotone / scrim / accent), responsive, and never looks like raw stock.
// Falls back to an on-brand gradient when no `src` is provided — the layout is always image-ready.
import type { CSSProperties } from "react";

type Treatment = "duotone" | "scrim" | "plain";

const RATIO: Record<string, string> = {
  hero: "16 / 9",
  wide: "21 / 9",
  portrait: "4 / 5",
  square: "1 / 1",
  card: "3 / 2",
};

export function BrandImage({
  src,
  alt = "",
  accent = "#df8c64",
  ratio = "card",
  treatment = "duotone",
  eager = false,
  rounded = true,
  className = "",
  overlay,
}: {
  src?: string;
  alt?: string;
  accent?: string;
  ratio?: keyof typeof RATIO | string;
  treatment?: Treatment;
  eager?: boolean;
  rounded?: boolean;
  className?: string;
  overlay?: React.ReactNode;
}) {
  const aspect = RATIO[ratio] ?? ratio;
  const radius = rounded ? "rounded-card" : "";

  // Branded gradient used as the fallback AND as the duotone shadow tint.
  const fallback: CSSProperties = {
    background: `radial-gradient(120% 120% at 15% 10%, ${accent}66, transparent 55%), radial-gradient(120% 120% at 90% 90%, #0a1320 20%, #13283f 80%)`,
  };

  return (
    <div
      className={`relative overflow-hidden ${radius} ${className}`}
      style={{ aspectRatio: aspect, ...(src ? {} : fallback) }}
    >
      {src && (
        <>
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ filter: treatment === "plain" ? "none" : "grayscale(1) contrast(1.05) brightness(0.95)" }}
          />
          {treatment !== "plain" && (
            <>
              {/* Duotone: shadows → obsidian, highlights → accent */}
              <div className="absolute inset-0" style={{ background: "#0a1320", mixBlendMode: "color" }} />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${accent} 0%, #13283f 60%, #0a1320 100%)`,
                  mixBlendMode: "color",
                  opacity: 0.85,
                }}
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${accent}55, transparent 55%)`, mixBlendMode: "screen" }}
              />
            </>
          )}
        </>
      )}

      {/* Blueprint dot texture */}
      <div className="bg-grid-obsidian absolute inset-0 opacity-25" aria-hidden />

      {/* Bottom scrim for legible captions/labels */}
      {(treatment === "scrim" || overlay) && (
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,19,32,.92) 0%, rgba(10,19,32,.25) 45%, transparent 70%)" }}
          aria-hidden
        />
      )}

      {/* Hairline frame */}
      <div className={`pointer-events-none absolute inset-0 ${radius} ring-1 ring-inset ring-white/10`} aria-hidden />

      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  );
}

/**
 * AbstractHero — a photo-free, on-brand hero/media panel. Renders the obsidian gradient + mesh +
 * blueprint grid + an "agent orbit" motif, with a large mono wordmark. Use as the hero `media` (or a
 * card thumbnail) wherever a product/service has no photography yet. Swap to <BrandImage src=…> later
 * with zero layout change — both honor the same `ratio`.
 */
export function AbstractHero({
  label,
  sub,
  accent = "#df8c64",
  accent2 = "#2f6df0",
  ratio = "card",
  className = "",
  compact = false,
  variant = "orbit",
}: {
  label: string;
  sub?: string;
  accent?: string;
  accent2?: string;
  ratio?: keyof typeof RATIO | string;
  className?: string;
  compact?: boolean;
  /** "orbit" — wordmark + agent-orbit rings (default). "console" — a stylized governed-app panel. */
  variant?: "orbit" | "console";
}) {
  const aspect = RATIO[ratio] ?? ratio;
  return (
    <div
      className={`relative overflow-hidden rounded-card ${className}`}
      style={{ aspectRatio: aspect, background: "linear-gradient(135deg, #0a1320 0%, #13283f 65%, #0a1320 100%)" }}
      role="img"
      aria-label={`${label}${sub ? ` — ${sub}` : ""} — governed action, human-approved`}
    >
      <MeshBg accent={accent} accent2={accent2} blueprint={false} opacity={0.85} />
      <div className="bg-grid-obsidian absolute inset-0 opacity-30" aria-hidden />

      {variant === "console" ? (
        // A stylized "governed console" shot — a record list where the consequential action is gated (K5)
        // and the whole thing is audited (K6). Photo-free, on-brand, tinted by the app's accent.
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
          <div
            className="w-full max-w-[92%] rounded-xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-sm sm:p-3.5"
            style={{ boxShadow: `0 24px 70px -24px ${accent}55` }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-mono text-xs font-bold sm:text-sm" style={{ color: accent }}>{label}</span>
              {sub && <span className="font-mono text-[8px] uppercase tracking-kicker text-paper/45 sm:text-[9px]">{sub}</span>}
            </div>
            <div className="mt-2.5 space-y-1.5">
              {[42, 58].map((w, i) => (
                <div key={i} className="flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1.5">
                  <span className="h-1.5 rounded-full bg-paper/20" style={{ width: `${w}%` }} />
                  <span className="font-mono text-[8px] uppercase tracking-kicker text-green/70">done</span>
                </div>
              ))}
              {/* the consequential action — human-gated */}
              <div
                className="flex items-center justify-between rounded-md px-2 py-1.5"
                style={{ background: `${accent}1f`, boxShadow: `inset 0 0 0 1px ${accent}44` }}
              >
                <span className="h-1.5 rounded-full" style={{ width: "50%", background: `${accent}aa` }} />
                <span
                  className="rounded-full px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase leading-none"
                  style={{ background: accent, color: "#0a1320" }}
                >
                  K5 · approve
                </span>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-green" />
              <span className="font-mono text-[8px] uppercase tracking-kicker text-paper/45">human-approved · audited (K6)</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Agent-orbit motif: concentric rings + nodes, anchored bottom-right. */}
          <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 aspect-square w-[70%]" aria-hidden>
            {[0.55, 0.78, 1].map((s, i) => (
              <span
                key={i}
                className="absolute inset-0 m-auto rounded-full"
                style={{ width: `${s * 100}%`, height: `${s * 100}%`, boxShadow: `inset 0 0 0 1px ${accent}${i === 2 ? "33" : "22"}` }}
              />
            ))}
            <span className="absolute left-[18%] top-[14%] h-2 w-2 rounded-full" style={{ background: accent }} />
            <span className="absolute right-[28%] top-[36%] h-1.5 w-1.5 rounded-full" style={{ background: accent2 }} />
            <span className="absolute bottom-[30%] left-[40%] h-1 w-1 rounded-full" style={{ background: accent }} />
          </div>

          {/* Wordmark */}
          <div className={`absolute inset-0 flex flex-col justify-center ${compact ? "px-5" : "px-8"}`}>
            <span
              className={`font-mono font-bold leading-none ${compact ? "text-2xl" : "text-4xl sm:text-5xl"}`}
              style={{ color: accent }}
            >
              {label}
            </span>
            {sub && (
              <span className={`mt-3 font-mono uppercase tracking-kicker text-paper/55 ${compact ? "text-[10px]" : "text-xs"}`}>
                {sub}
              </span>
            )}
          </div>
        </>
      )}

      {/* Hairline frame */}
      <div className="pointer-events-none absolute inset-0 rounded-card ring-1 ring-inset ring-white/10" aria-hidden />
    </div>
  );
}

/** Abstract on-brand texture for section backgrounds and CTA bands — no photo dependency. */
export function MeshBg({
  accent = "#df8c64",
  accent2 = "#2f6df0",
  blueprint = true,
  className = "",
  opacity = 1,
}: {
  accent?: string;
  accent2?: string;
  blueprint?: boolean;
  className?: string;
  opacity?: number;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden style={{ opacity }}>
      <div
        className="absolute -left-1/4 -top-1/3 h-[60rem] w-[60rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}33, transparent 60%)` }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[55rem] w-[55rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent2}26, transparent 62%)` }}
      />
      {blueprint && <div className="bg-grid-paper absolute inset-0 opacity-60" />}
    </div>
  );
}
