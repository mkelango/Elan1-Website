// pages/ConnectorsPage.tsx — the honest connector surface (K3, the MCP connector fabric).
//
// Renders entirely from content/connectors.ts, where every claim carries a platform-code reference.
// Nothing is re-listed here — including the tier caveats, which are the whole point of the page.
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section, TickList, Crumb } from "../components/blocks";
import { SectionHead, Reveal, Icon, Kicker } from "../components/primitives";
import { AbstractHero } from "../components/BrandImage";
import { CTASection } from "../components/CTASection";
import {
  CONNECTOR_TIERS,
  CONNECTOR_GUARDS,
  CONNECTOR_SPINE,
  CONNECTOR_BOUNDARIES,
  CONNECTORS_SEO,
} from "../content/connectors";

const ACCENT = "#2f6df0";

export default function ConnectorsPage() {
  useSeo(CONNECTORS_SEO.title, CONNECTORS_SEO.description, {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: "Connectors — the governed MCP seam",
      description: CONNECTORS_SEO.description,
      url: "https://elan1.ai/platform/connectors",
      publisher: { "@type": "Organization", name: "elan1", url: "https://elan1.ai" },
    },
  });

  return (
    <>
      <PageHero
        kicker="Platform · the connector fabric"
        accent={ACCENT}
        eyebrow={
          <Reveal>
            <div className="mb-5">
              <Crumb to="/platform" label="Platform" />
            </div>
          </Reveal>
        }
        title={<>Typed, governed seams. <br />Not a logo wall.</>}
        subtitle="elan1 reaches your systems through one MCP connector fabric: a connector's declared operations are its grantable scopes, a grant is a human approval, and every call — including every denial — lands in a hash-chained audit log. This page says exactly which connectors are callable today, which are declared and waiting on credentials, and which are not switched on."
        cta={{
          label: "Start a Discovery Sprint",
          href: "/get-started",
          secondary: { label: "See the governance model", href: "/platform/governance" },
        }}
        meta={
          <span className="font-mono text-3xl font-bold" style={{ color: ACCENT }}>
            K3 · connectors
          </span>
        }
        media={
          <AbstractHero
            label="connector fabric"
            sub="register · grant · resolve · invoke"
            accent={ACCENT}
            accent2="#22b8c4"
            ratio="card"
            className="shadow-lift"
            variant="orbit"
          />
        }
      />

      {/* The four governed transitions */}
      <Section tone="obsidian">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <Kicker accent={ACCENT}>The seam</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
              Adding a system means adding a connector — never bespoke integration code.
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/70">
              One fabric, one enforcement point. An app never holds a raw connection; it receives a
              scoped handle bound to its tenant and its grant. That is what makes the same guarantees
              hold whether the caller is an agent mid-run, application code, or an external client
              reaching elan1 over MCP.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              The practical consequence: an integration cannot become a quiet path around a control
              your finance, supply or security team already enforces.
            </p>
          </div>
          <Reveal>
            <div className="space-y-3">
              {CONNECTOR_SPINE.map((s) => (
                <div key={s.step} className="rounded-card border border-paper/15 bg-paper/[0.04] p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs" style={{ color: ACCENT }}>{s.step}</span>
                    <span className="font-display text-base font-bold text-paper">{s.name}</span>
                    <span className="ml-auto font-mono text-[9px] uppercase tracking-kicker text-paper/40">
                      audited
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-paper/65">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* The three tiers */}
      <Section tone="paper">
        <SectionHead
          kicker="Three tiers, labelled"
          title="What is callable, what is declared, and what is not switched on."
          lede="Connector surfaces are usually presented as one undifferentiated list. These three tiers are genuinely different things, so we separate them — and each one carries the limit a reader would otherwise assume away."
        />
        <div className="mt-12 space-y-6">
          {CONNECTOR_TIERS.map((tier, i) => (
            <Reveal key={tier.id} delay={(i % 3) * 0.05}>
              <div className="rounded-card border border-line bg-surface p-7 shadow-card sm:p-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span
                    className="font-mono text-[10px] uppercase tracking-kicker"
                    style={{ color: ACCENT }}
                  >
                    {tier.id}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-ink">{tier.name}</h3>
                  <span className="ml-auto font-mono text-xs text-muted">{tier.status}</span>
                </div>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate">{tier.body}</p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {tier.groups.map((g) => (
                    <div key={g.label} className="rounded-card border border-line bg-mist/60 p-5">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-lg"
                          style={{ background: `${ACCENT}1a`, color: ACCENT }}
                        >
                          <Icon.Node className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-display text-sm font-bold text-ink">{g.label}</span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {g.items.map((item) => (
                          <li key={item} className="text-sm leading-relaxed text-slate">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-6 rounded-card border-l-2 bg-mist/40 px-5 py-4"
                  style={{ borderLeftColor: ACCENT }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-kicker text-muted">
                    The limit
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{tier.caveat}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The governance envelope */}
      <Section tone="mist">
        <SectionHead
          kicker="The envelope"
          title="The governance is the product. The catalog is just the surface area."
          lede="Each of these is a property of the fabric every call crosses, not a setting on an individual connector — which is why it holds for an agent, for application code, and for an external MCP client alike."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {CONNECTOR_GUARDS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 2) * 0.06}>
              <div className="card card-hover h-full">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: `${ACCENT}1a`, color: ACCENT }}
                  >
                    <Icon.Shield className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-ink">{g.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate">{g.description}</p>
                {g.quote && (
                  <p className="mt-4 overflow-x-auto rounded-lg border border-line bg-mist/70 px-3 py-2 font-mono text-xs text-ink">
                    {g.quote}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What this page does not claim */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHead
              kicker="Boundaries"
              title="What is not switched on."
              lede="Stated plainly, in the platform's own terms, because a connector page is the easiest place in this category to overclaim."
            />
            <p className="mt-6 text-[15px] leading-relaxed text-slate">
              The grant, the policy check and the audit entry are the same wherever the call comes
              from. They are approved and reviewed in{" "}
              <Link to="/platform/enterprise1" className="text-clayDeep hover:underline">
                enterprise1
              </Link>{" "}
              — the catalog, the grant matrix, the credential vault and the audit trail — and they hold
              for{" "}
              <Link to="/platform/assistant1" className="text-clayDeep hover:underline">
                assistant1
              </Link>{" "}
              too, which grounds on these connectors and holds no writer of its own, so a conversation
              cannot outrank a grant.
            </p>
          </div>
          <Reveal>
            <div className="rounded-card border border-line bg-surface p-7">
              <TickList items={CONNECTOR_BOUNDARIES} accent={ACCENT} />
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                Every line above is a real limit in the build these claims were checked against. We
                would rather you find them here than in week three of a deployment.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Bring us the system you were told could not be integrated."
        body="Start with one fixed-scope Discovery Sprint — low-risk and fully credited. We map the seam, name what is callable today and what needs credentials, and ship a working, governed proof."
      />
    </>
  );
}
