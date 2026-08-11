// pages/Home.tsx — the company on one page: the spine of the whole site.
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "../lib/seo";
import { Reveal, Kicker, SectionHead, Icon } from "../components/primitives";
import { Section } from "../components/blocks";
import { CTASection } from "../components/CTASection";
import { BrandImage } from "../components/BrandImage";
import { pageImage } from "../content/images";
import { products } from "../content/products";
import { categories, appsOf, categorizedAppSlugs, numberWord } from "../content/categories";
import { solutions, primarySolutions, secondarySolutions } from "../content/solutions";
import { services, platformPillars, resourcePillars, servicePath } from "../content/services";
import { SHIFT, METHOD, FLYWHEEL, WHY_WIN, HOW_WE_WORK, REGIONS } from "../content/site";
import { PROOF, proofBadge, GOVERNED_PATH_SCOPE } from "../content/proof";

const ALL_TAGS = [
  ...services.map((s) => s.name),
  ...products.map((p) => p.name),
  ...solutions.map((s) => s.name),
];

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="absolute inset-0 bg-grid-paper opacity-70" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[34rem] w-[34rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(223,140,100,.28), transparent 62%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,109,240,.14), transparent 65%)" }}
      />
      <div className="shell relative grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] text-slate backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-green" /> The agentic transformation company · Built on Claude
            </span>
          </Reveal>
          {/*
            🚨 THE HERO LEADS WITH A REFUSAL, AND THAT IS THE POINT.
            Every comparable platform's homepage shows an agent DOING something. An agent doing
            something is table stakes and proves nothing — the reader has seen a demo before. An
            agent being STOPPED is the thing a platform can only show if it owns the record the
            write lands in, which is the whole architectural wedge. It is also the most
            differentiated thirty seconds available to this company.

            🚨 WHAT THIS HEADLINE DELIBERATELY DOES NOT SAY. The brief for this rewrite proposed
            "Everyone else audits the call. elan1 audits the record." The second half is true and
            provable. The first half is an unsourced absolute about every competitor on the market,
            which is the exact class of claim the rest of this site forbids — and it would be the
            single most prominent sentence on the property. So the contrast is carried by SPECIFICITY
            instead: a concrete refusal nobody else can stage beats a generalisation about others.
            If you are tempted to put the competitor clause back, note that VS_LEGACY was removed
            from this same page for the same reason. See HOW_WE_WORK in content/site.ts.
          */}
          <Reveal delay={0.06}>
            <h1 className="display mt-6 text-4xl text-ink sm:text-5xl lg:text-[3.9rem]">
              An agent tried to move money it{" "}
              <span className="relative whitespace-nowrap text-clayDeep">wasn't allowed
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 7C40 2 160 2 198 7" stroke="#df8c64" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}
              to move.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lede mt-7 max-w-xl">
              Here is the policy that stopped it, the person who was asked, and the receipt. elan1
              owns the system of record your agents write into — so the audit is not a log saying we
              called an API. It is the row before, the rule that fired, and a hash chain showing
              nothing was edited after.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/get-started" className="btn-primary">
                Start a Discovery Sprint <Icon.Arrow className="h-4 w-4" />
              </Link>
              <Link to="/demo" className="btn-ghost">
                <Icon.Play className="h-4 w-4" /> See a live agent
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-7">
              {[
                [String(categorizedAppSlugs.length), "agentic apps"],
                ["5", "product categories"],
                [String(solutions.length), "industry solutions"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="display text-3xl text-ink">{n}</dt>
                  <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Live-agent teaser card */}
        <Reveal delay={0.2}>
          <div className="relative">
            <div className="overflow-hidden rounded-card border border-lineDark bg-obsidian shadow-lift">
              <div className="flex items-center gap-2 border-b border-lineDark px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
                <span className="ml-2 font-mono text-[11px] text-paper/50">agent · finance1.ap · governed write</span>
                <Link
                  to="/resources/proof"
                  className="ml-auto font-mono text-[11px] text-clay underline-offset-2 hover:underline"
                >
                  See it refuse →
                </Link>
              </div>
              {/*
                🚨 THE REFUSAL STRING BELOW IS VERBATIM FROM THE PLATFORM'S APPROVAL GATE.
                It is quoted in content/proof.ts under the `money-release` pattern, read out of the
                platform tree with its lowercase first letter and its {placeholders} intact. Do NOT
                paraphrase it, tidy its grammar, or strengthen it for rhythm — the entire persuasive
                value is that a regulated buyer can ask to see this exact string raised, and a
                paraphrase is a refusal we invented. If it changes upstream, change it in proof.ts
                first and copy from there.
              */}
              <div className="space-y-3 p-5 font-mono text-[13px]">
                <p className="text-paper/50">{"// accounts-payable agent · release a supplier payment"}</p>
                <div className="rounded-lg bg-white/[0.04] p-3 text-paper/80">
                  → Matched invoice <span className="text-clay">INV-40817</span> to PO and receipt
                </div>
                <div className="rounded-lg bg-white/[0.04] p-3 text-paper/80">
                  → Drafted the release, requested approval
                </div>
                <div className="rounded-lg border border-rose/40 bg-rose/[0.10] p-3">
                  <span className="flex items-center gap-2 text-rose">
                    <Icon.Shield className="h-4 w-4" />
                    <span className="font-semibold">refused at the write</span>
                  </span>
                  <span className="mt-1.5 block leading-relaxed text-paper/80">
                    segregation of duties — {"{principal}"} requested approval '{"{id}"}' and cannot
                    also approve it; a different approver is required
                  </span>
                </div>
                <motion.div
                  className="flex items-center gap-2 text-green"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-green" /> routed to a second human · on the audit chain
                </motion.div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl border border-line bg-surface px-4 py-3 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Not a setting</p>
              <p className="display text-xl text-ink">A refusal</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Offering marquee */}
      <div className="relative border-t border-line py-4">
        <div className="fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-3">
            {[...ALL_TAGS, ...ALL_TAGS].map((t, i) => (
              <span key={i} className="rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-xs text-slate">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Shift() {
  return (
    <section className="relative overflow-hidden bg-obsidian text-paper">
      <div className="absolute inset-0" aria-hidden>
        <img src={pageImage.shift} alt="" className="h-full w-full object-cover opacity-[0.14]" style={{ filter: "grayscale(1)" }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-obsidian/60" />
      </div>
      <div className="absolute inset-0 bg-grid-obsidian opacity-40" aria-hidden />
      <div className="shell relative py-20 sm:py-28">
        <SectionHead kicker={SHIFT.kicker} title={SHIFT.headline} lede={SHIFT.body} dark />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {SHIFT.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-card border border-lineDark bg-white/[0.03] p-6">
                <span className="font-mono text-xs text-clay">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-paper">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SuiteGrid() {
  return (
    <Section tone="paper">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead
          kicker="The 1 Suite"
          title="One platform. Every business function."
          lede={`${numberWord(categorizedAppSlugs.length)} agentic apps in five categories, each reusable across every industry — grouped by what the approval gate protects, and unified on the enterprise1 backbone.`}
        />
        <Reveal delay={0.1}>
          <Link to="/products" className="btn-ghost shrink-0">Explore the suite <Icon.Arrow className="h-4 w-4" /></Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.06}>
            <Link
              to={`/products/category/${c.slug}`}
              className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.accent }} />
                  <span className="font-mono text-base font-semibold text-ink">{c.name}</span>
                </span>
                <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">
                  {c.apps.length} {c.apps.length === 1 ? "app" : "apps"}
                </span>
              </div>
              <p className="mt-4 font-display text-lg font-bold leading-snug text-ink">{c.positioning}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {appsOf(c).map((p) => (
                  <span key={p.slug} className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-slate">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                    {p.name}
                  </span>
                ))}
              </div>
              <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                Explore {c.name} <Icon.Arrow className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={0.18}>
          <Link
            to="/platform/enterprise1"
            className="group flex h-full flex-col rounded-card border border-transparent bg-obsidian p-6 text-paper shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-clay" />
                <span className="font-mono text-base font-semibold text-paper">enterprise1</span>
              </span>
              <span className="rounded-full bg-clay/20 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-clay">backbone</span>
            </div>
            <p className="mt-4 font-display text-lg font-bold leading-snug text-paper">
              The control plane the five categories stand on.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-paper/60">
              Identity, policy, audit and wave rollout for every app — not a sixth category.
            </p>
            <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clay opacity-0 transition-opacity group-hover:opacity-100">
              Explore enterprise1 <Icon.Arrow className="h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

function SolutionsRow() {
  return (
    <Section tone="paper">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead kicker="Solutions by industry" title="Agentic transformation, tuned to your world." lede="Each vertical leads with the governance signature your sector demands." />
        <Reveal delay={0.1}><Link to="/solutions" className="btn-ghost shrink-0">Find your industry <Icon.Arrow className="h-4 w-4" /></Link></Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {/* The five focus verticals lead; the other five are one click away. GTM placement only —
            every vertical is fully built, live and indexed. */}
        {primarySolutions.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 5) * 0.04}>
            <Link to={`/solutions/${s.slug}`} className="group block h-full rounded-card border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-card">
              <span className="h-2 w-2 rounded-full" style={{ background: s.accent, display: "block" }} />
              <p className="mt-3 font-mono text-sm font-semibold text-ink">{s.name}</p>
              <p className="mt-1 text-xs leading-snug text-slate">{s.industry}</p>
            </Link>
          </Reveal>
        ))}
        <Reveal delay={primarySolutions.length % 5 * 0.04}>
          <Link to="/solutions" className="group flex h-full flex-col justify-center rounded-card border border-dashed border-line bg-mist/60 p-5 text-center transition-all hover:-translate-y-1 hover:shadow-card">
            <p className="font-mono text-sm font-semibold text-ink">More industries</p>
            <p className="mt-1 text-xs leading-snug text-slate">{secondarySolutions.map((s) => s.name).join(", ")}</p>
          </Link>
        </Reveal>
      </div>
    </Section>
  );
}

// Was "the six pillars are a journey and a flywheel". There is no Services section any more, and
// the pillars are no longer one homogeneous set — so this renders the actual split: software under
// Platform, people under Academy. Both groups DERIVED from services.ts.
function PillarsSection() {
  const groups = [
    { key: "platform", kicker: "The platform", title: "Plan it. Build it. Prove it. Operate it.", items: platformPillars, href: "/platform", cta: "Explore the platform" },
    { key: "resources", kicker: "Academy", title: "And get your people ready.", items: resourcePillars, href: "/resources", cta: "Go to Resources" },
  ];
  return (
    <Section tone="mist">
      <SectionHead
        kicker="Beneath the products"
        title="What it runs on, and who gets you there."
        lede="Products are what you run your business on. These are the pillars underneath — the engagement that plans the work, the software that builds, proves and operates it, and the training that makes your people capable."
      />
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {groups.map((g) => (
          <div key={g.key}>
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-kicker text-muted">{g.kicker}</p>
              <Link to={g.href} className="text-sm font-medium text-clayDeep hover:underline">
                {g.cta} →
              </Link>
            </div>
            <p className="mt-2 font-display text-xl font-bold text-ink">{g.title}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {g.items.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <Link
                    to={servicePath(s)}
                    className="group flex h-full flex-col rounded-card border border-line bg-surface p-5 transition-all hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
                      <span className="font-mono text-sm font-semibold text-ink">{s.name}</span>
                    </span>
                    <span className="mt-2 text-xs leading-snug text-slate">{s.tagline}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/**
 * The proof band — three governed patterns, DERIVED from content/proof.ts.
 *
 * 🚨 NEVER HAND-WRITE A PATTERN HERE. proof.ts is the single source, and its header explains at
 * length why: an earlier draft of that file asserted ten Trust Marks that did not exist, and the
 * fix was to make `trustMark` optional and label the weaker fact differently. A pattern retyped
 * into this component would sit outside that discipline entirely and could not be corrected by
 * fixing the source. `proofBadge()` is exported precisely so a surface cannot invent its own badge.
 *
 * The slice is the first three horizontal patterns — the ones that hold whatever the industry is,
 * which is the argument for one core. Taking them by index rather than by id keeps this working
 * when the roster changes; taking three keeps the row from wrapping on a laptop.
 */
function ProofBand() {
  const featured = PROOF.slice(0, 3);
  return (
    <Section tone="mist">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHead
          kicker="Proof, not promises"
          title="What it refuses is the product."
          lede="A platform that sits on top of your system of record can log that it called an API. Owning the record is what makes a refusal possible — here are three, each quoting the string the write path actually raises."
        />
        <Reveal delay={0.1}>
          <Link to="/resources/proof" className="btn-ghost shrink-0">
            All {PROOF.length} patterns <Icon.Arrow className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {featured.map((c, i) => {
          const badge = proofBadge(c);
          return (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link
                to="/resources/proof"
                className="group flex h-full flex-col rounded-card border border-line bg-surface p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-kicker text-muted">{c.domain}</span>
                  {/* Badge label comes from proofBadge() — a Trust Mark and a registered agent are
                      different facts, and this row must never flatten them into one green pill. */}
                  {badge && (
                    <span className="rounded-full border border-line bg-mist px-2 py-0.5 font-mono text-[9px] font-medium text-muted">
                      {badge.label}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-ink">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{c.before}</p>
                <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-clayDeep opacity-0 transition-opacity group-hover:opacity-100">
                  See what stops it <Icon.Arrow className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-muted">
          {GOVERNED_PATH_SCOPE}
        </p>
      </Reveal>
    </Section>
  );
}




function TrustGlobal() {
  return (
    <Section tone="mist">
      <div className="grid gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
            <Kicker accent="#e0656d">Trust</Kicker>
            <h3 className="display mt-4 text-2xl text-ink">Built on Claude. Governed by assure1.</h3>
            <p className="mt-3 text-slate">Human-in-the-loop, grounded and cited, eval-gated Trust Marks, and per-vertical governance signatures. Trust isn't a page — it's how the work is built.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {["Human-in-the-loop", "Audit trails", "DPDP-aligned", "Eval-gated", "Ad-free", "Responsible AI"].map((t) => (
                <li key={t} className="chip">{t}</li>
              ))}
            </ul>
            <Link to="/trust" className="mt-auto pt-7"><span className="link-underline">Visit the Trust Center <Icon.Arrow className="h-4 w-4" /></span></Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-card border border-line bg-surface p-8">
            <Kicker accent="#2f6df0">Global</Kicker>
            <h3 className="display mt-4 text-2xl text-ink">Region-aware, and honest about which part.</h3>
            <p className="mt-3 text-slate">
              Pick a region and the compliance language follows it. Residency itself is declared per
              tenant and classified fail-closed — declared, not enforced, and the platform's own
              posture surface says so rather than claiming otherwise.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2.5">
              {REGIONS.map((r) => (
                <div key={r} className="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-3">
                  <Icon.Globe className="h-4 w-4 text-blueprint" />
                  <span className="text-sm font-medium text-ink">{r}</span>
                </div>
              ))}
            </div>
            <p className="mt-auto pt-7 font-mono text-xs text-muted">India · Singapore · United States · Middle East · Europe</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default function Home() {
  useSeo("elan1 — The Agentic Transformation Company | Built on Claude", "elan1 turns startups, scaleups, and enterprises into agentic organizations — number one in their field. Add 1. Become the one.");
  return (
    /*
      SECTION ORDER IS THE ARGUMENT, IN THE ORDER A BUYER ASKS IT.
        Hero        — an agent gets stopped. The one thing a platform on top of someone else's
                      record cannot stage.
        Shift       — why agentic at all.
        Pillars     — what it runs on. Moved ABOVE the suite deliberately: leading with ten apps
                      invites "so it's another CRM", and the architecture is the wedge.
        Suite       — the apps, now read as consequences of the architecture rather than a catalog.
        Solutions   — and tuned to your regulator.
        Proof       — the refusals, from proof.ts.
        Method      — how an engagement runs.
        Flywheel    — how it compounds.
        WhyWin      — how we work, stated about us only.
        VsBuilders  — and against the build-it-yourself option.
        Trust       — the posture, honestly scoped.
    */
    <>
      <Hero />
      <Shift />
      <PillarsSection />
      <SuiteGrid />
      <SolutionsRow />
      <ProofBand />
      <TrustGlobal />
      <CTASection />
    </>
  );
}
