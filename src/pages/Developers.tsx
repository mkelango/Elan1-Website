// pages/Developers.tsx — route /developers. The developer surface, and the honest state of each part.
//
// Renders entirely from content/developers.ts. Two rules this page exists to hold:
//
//   1. A LINK IS NEVER READ FROM `surface.href`. It comes from `devHref(surface)`, which returns
//      undefined unless the row is `available` AND its route is in the module's allowlist. A row
//      without a link renders as plain text with a status chip and its note — deliberately, because
//      a developer who lands on a 404 or a dead docs domain does not come back. If you find yourself
//      writing `to={s.href}` here, that is the regression this file was written to prevent.
//   2. The connector catalog and the enterprise-readiness answers are NOT restated here. They have
//      their own pages — /platform/connectors and /platform/engineering — and this page links to
//      them rather than growing a second, drifting copy.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  CORE_SURFACES,
  BUILD_SURFACES,
  DEV_STATS,
  DEV_STATUS_LABEL,
  DEV_STATUS_MEANING,
  DEV_BOUNDARIES,
  DEV_STATUS_NOTE,
  DEVELOPERS_SEO,
  MCP_STORY,
  devHref,
  type DevSurface,
  type DevStatus,
} from "../content/developers";

const ACCENT = "#7c6cf0";

/** Chip colours per status. `planned` is muted on purpose — it must never read as a feature. */
const CHIP: Record<DevStatus, { fg: string; bg: string; border: string }> = {
  available: { fg: ACCENT, bg: `${ACCENT}14`, border: `${ACCENT}45` },
  preview: { fg: "#b9603f", bg: "#df8c6414", border: "#df8c6440" },
  planned: { fg: "#6b7280", bg: "#6b728012", border: "#6b728033" },
};

function StatusChip({ status }: { status: DevStatus }) {
  const c = CHIP[status];
  return (
    <span
      title={DEV_STATUS_MEANING[status]}
      className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium"
      style={{ color: c.fg, background: c.bg, borderColor: c.border }}
    >
      {DEV_STATUS_LABEL[status]}
    </span>
  );
}

/**
 * One surface row. The ONLY place a link is produced, and it is produced by devHref() — never by
 * reading `s.href`. An unavailable row renders its name as text, which is the intended outcome.
 */
function SurfaceRow({ s }: { s: DevSurface }) {
  const href = devHref(s);
  return (
    <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-7">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        {href ? (
          <Link
            to={href}
            className="group inline-flex items-center gap-1.5 font-mono text-base font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-clayDeep hover:decoration-clayDeep"
          >
            {s.name}
            <Icon.Arrow className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ) : (
          <span className="font-mono text-base font-semibold text-ink">{s.name}</span>
        )}
        <span className="ml-auto">
          <StatusChip status={s.status} />
        </span>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-slate">{s.what}</p>
      {s.note && (
        <p
          className="mt-4 border-l-2 pl-4 text-sm leading-relaxed text-muted"
          style={{ borderLeftColor: `${ACCENT}55` }}
        >
          {s.note}
        </p>
      )}
    </div>
  );
}

export default function Developers() {
  useSeo(DEVELOPERS_SEO.title, DEVELOPERS_SEO.description, {
    type: "article",
    breadcrumbs: [{ name: "Resources", href: "/resources" }],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Developers — MCP-native, contract-first",
      description: DEVELOPERS_SEO.description,
      url: "https://elan1.ai/developers",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Resources · developers"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/resources" label="Resources" />
            </div>
          </Reveal>
        }
        title={
          <>
            MCP-native, <br />
            contract-first.
          </>
        }
        subtitle="elan1 consumes external MCP servers through one governed fabric, and publishes its own governed operations back out as MCP tools. Underneath both sits a single typed contract: eight core surfaces, versioned, with a human gate that arrives as a value in your response rather than an exception to catch. This page also says exactly which parts you can reach today and which ship with the developer preview — and it links to nothing that does not exist."
        cta={{
          label: "Ask for developer preview access",
          href: "/get-started",
          secondary: { label: "See the connector fabric", href: "/platform/connectors" },
        }}
        meta={
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {DEV_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl font-bold" style={{ color: ACCENT }}>
                  {s.value}
                </div>
                <div className="mt-1 max-w-[11rem] text-xs leading-snug text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        }
        media={
          <AbstractHero
            label="tools/list · tools/call"
            sub="scoped · approved · audited"
            accent={ACCENT}
            accent2="#5ad1c0"
            ratio="card"
            className="shadow-lift"
            variant="orbit"
          />
        }
      />

      {/* The honest state, first — before anyone spends an hour looking for a package. */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Kicker accent={ACCENT}>Read this first</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              What you can do today, and what ships with the preview.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              Most developer pages are written as if everything on them were installable this
              afternoon. This one is not. The mechanisms below are real and documented; the
              self-serve path around them is not open yet, and saying so costs us less than you
              finding out later.
            </p>
          </div>
          <Reveal>
            <div className="rounded-card border border-paper/15 bg-paper/[0.04] p-7">
              <span className="font-mono text-[9px] uppercase tracking-kicker text-paper/45">
                Status, stated plainly
              </span>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/75">{DEV_STATUS_NOTE}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* MCP — the differentiator the site has never claimed. */}
      <Section tone="paper">
        <SectionHead
          kicker={MCP_STORY.kicker}
          title={MCP_STORY.headline}
          lede={MCP_STORY.lede}
          accent={ACCENT}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {MCP_STORY.points.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.06}>
              <div className="card card-hover h-full">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}1a`, color: ACCENT }}
                  >
                    <Icon.Node className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold leading-snug text-ink">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{p.body}</p>
                {p.quote && (
                  <p className="mt-4 overflow-x-auto rounded-lg border border-line bg-mist/70 px-3 py-2 font-mono text-xs text-ink">
                    {p.quote}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div
            className="mt-8 rounded-card border-l-2 bg-mist/50 px-6 py-5"
            style={{ borderLeftColor: ACCENT }}
          >
            <span className="font-mono text-[9px] uppercase tracking-kicker text-muted">
              The limit
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate">{MCP_STORY.limit}</p>
          </div>
        </Reveal>
      </Section>

      {/* The eight core surfaces. */}
      <Section tone="mist">
        <SectionHead
          kicker="The contract"
          title="Eight surfaces. One coupling point. A version number that means something."
          lede="Every app in the suite, every industry pack and every agent reaches the platform through the same typed contract — and so would you. It is implementation-free by design: pure types and protocols, with no runtime dependencies of its own. Breaking a signature is a major version bump with a recorded decision and a migration note, not a quiet change on a Tuesday."
          accent={ACCENT}
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {CORE_SURFACES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 2) * 0.05}>
              <SurfaceRow s={s} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            A linked surface goes to the page on this site that documents its mechanism. A surface
            without a link has no published reference yet — the chip says so, and we would rather
            leave it unclickable than send you to a page that is not there.
          </p>
        </Reveal>
      </Section>

      {/* What you build with. */}
      <Section tone="paper">
        <SectionHead
          kicker="What you build with"
          title="The client, the fabric, the front door — and what is not open yet."
          lede="Each row states the mechanism first and its status second, because the mechanism is the part that is true regardless. Nothing here is described as available in order to earn a link."
          accent={ACCENT}
        />
        <div className="mt-12 space-y-4">
          {BUILD_SURFACES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.04}>
              <SurfaceRow s={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Boundaries. */}
      <Section tone="mist">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Boundaries"
              title="What this page does not claim."
              lede="A developer page is the easiest place on a site to overclaim, because the reader cannot check any of it until they have already invested a week."
              accent={ACCENT}
            />
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <TickList items={DEV_BOUNDARIES} accent={ACCENT} />
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                Every line above is a real limit in the build these claims were checked against.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Where to go next — existing routes only. */}
      <Section tone="paper">
        <SectionHead
          kicker="Go deeper"
          title="The two pages that carry the detail."
          lede="This page deliberately does not restate the connector catalog or the enterprise-readiness answers. Both have their own page, with sources and limits named claim by claim."
          accent={ACCENT}
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal>
            <Link
              to="/platform/connectors"
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-mono text-base font-semibold text-ink">/platform/connectors</span>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                The connector fabric, tier by tier.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                What is registered and callable, what is a credential-gated seam waiting on an
                account, and what is not switched on — with the limit stated under each tier rather
                than omitted from it.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                See the fabric <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <Link
              to="/platform/engineering"
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="font-mono text-base font-semibold text-ink">
                /platform/engineering
              </span>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-ink">
                The procurement checklist, answered honestly.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                SSO, tenant isolation, audit immutability, residency, retention, key management and
                the API contract — each entry carrying a state and a source, including the ones that
                are built but not yet wired.
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                See enterprise readiness <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Want early access to the developer preview?"
        body="Tell us what you would build against — the contract, the MCP seam, or the event stream — and we will tell you honestly where that sits today. Keys, a sandbox, an installable client and the reference docs go out with the preview."
      />
    </>
  );
}
