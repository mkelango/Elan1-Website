// pages/DiagramLibrary.tsx — the diagram register.
//
// This page used to be a gallery whose promise was "most firms show you a logo wall, we show you
// the architecture". The promise is still the right one; the delivery was not. An audit of the
// artwork against the platform's own source found assets asserting things that are not true — a
// delivery motion drawn as a runtime, a count that derives from nothing, a service level with no
// machinery behind it, a vendor name in an integration layer where the seam is a modelled adapter.
//
// So the page now shows the register: every blueprint, what it depicts, what actually ships behind
// it, what was corrected in the artwork, and — where it is withheld — the specific line that fails
// and what a redraw has to change. That is a stranger page than a gallery and a more useful one.
//
// 🚨 A PUBLISHED DIAGRAM IS NOT A CLEAN ONE, AND THIS PAGE MUST KEEP SAYING SO. Every published
// entry renders its own open defects directly under the frame. A register that only listed what it
// refused would imply everything else was spotless, which is the same failure in the other
// direction. If someone ever collapses the open-defect list behind a link, this page is a gallery
// again.
//
// 🚨 EVERY COUNT ON THIS PAGE IS DERIVED FROM THE REGISTER. Nothing here is typed. A literal count
// or a literal group list produced a dead chip twice before; a filter over what is actually present
// makes a zero-result state structurally impossible.
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/seo";
import { PageHero, Section } from "../components/blocks";
import { SectionHead, Reveal, Icon, MonoTag } from "../components/primitives";
import { DiagramEmbed } from "../components/DiagramEmbed";
import { CTASection } from "../components/CTASection";
import {
  DIAGRAM_REGISTER,
  DIAGRAM_LIBRARY,
  DIAGRAM_WITHHELD,
  DIAGRAM_AUDITED_ON,
  type DiagramFinding,
  type DiagramGroup,
} from "../lib/diagrams";

// Preferred reading order, filtered by what the register actually holds. The order is editorial;
// the membership is not.
const GROUP_ORDER: DiagramGroup[] = [
  "System",
  "Architecture",
  "Platform",
  "Products",
  "Solutions",
  "Resources",
];
const PRESENT = new Set(DIAGRAM_REGISTER.map((d) => d.group));
const GROUPS = ["All", ...GROUP_ORDER.filter((g) => PRESENT.has(g))] as const;
type GroupFilter = (typeof GROUPS)[number];

const accentFor: Record<DiagramGroup, string> = {
  System: "#df8c64",
  Architecture: "#2f6df0",
  Platform: "#b9603f",
  Resources: "#7c6cf0",
  Products: "#22b8c4",
  Solutions: "#d39a3a",
};

/** Entries whose artwork was edited on the audit date rather than captioned around. */
const CORRECTED = DIAGRAM_REGISTER.filter((d) => d.corrected);

/**
 * The test a drawing is held to, written out so a second reader can re-run it and disagree.
 * Kept here rather than in the data file because it is the page's argument, not a property of any
 * one diagram.
 */
const WITHHOLDING_TEST = [
  {
    q: "Does the thing it draws actually run?",
    body:
      "A layered drawing with surfaces, an agent workforce and a data layer is read as a picture of a running system. When the subject is a retired offering, or a delivery motion — work performed by people, each role pinned to a model tier — that layout is the claim, and relabelling does not undo it. This is what pulled the planning pillar, and it is what pulls the other four delivery pillars now.",
    icon: <Icon.Layers className="h-4 w-4" />,
  },
  {
    q: "Does it promise a duration, a service level or a result?",
    body:
      "Nothing has been timed or measured in a customer environment, and elan1 is held to no service level — not a target defined, not one reported against. Worth separating: service1 does run real SLA machinery, and those are the CUSTOMER's service-desk targets, started and breached inside their own desk. What no drawing may show is a commitment BY US, because none exists. A drawn outcome strip and a drawn SLA are the two lines a buyer will act on, and they are the two we cannot support.",
    icon: <Icon.Shield className="h-4 w-4" />,
  },
  {
    q: "Or is the fault only a label?",
    body:
      "A stale name, a count with no derivation, a vendor logo where the seam is a modelled adapter, a principle written more absolutely than the guard behind it — these stay on the shelf with the defect named underneath. Taking them down removes more truth than it removes error. The register carries the correction where the artwork cannot.",
    icon: <Icon.Node className="h-4 w-4" />,
  },
];

function Finding({ asserts, butActually }: DiagramFinding) {
  return (
    <li className="border-l-2 border-line pl-4">
      <p className="text-sm text-ink">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
          The artwork says
        </span>
        <br />
        {asserts}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        <span className="font-mono text-[10px] uppercase tracking-wide text-clayDeep">
          What is true
        </span>
        <br />
        {butActually}
      </p>
    </li>
  );
}

export default function DiagramLibrary() {
  useSeo(
    "Diagram register — every blueprint, and what it is allowed to claim | elan1",
    "The elan1 diagram register: each architecture blueprint, what it depicts, what actually ships behind it, the defects still on the artwork we publish, and — where a drawing is withheld — the assertion that failed the audit.",
    { breadcrumbs: [{ name: "Resources", href: "/resources" }] },
  );
  const [group, setGroup] = useState<GroupFilter>("All");
  const inGroup = <T extends { group: DiagramGroup }>(d: T) => group === "All" || d.group === group;
  const published = DIAGRAM_LIBRARY.filter(inGroup);
  const withheld = DIAGRAM_WITHHELD.filter(inGroup);

  return (
    <>
      <PageHero
        kicker="Resources · Diagram register"
        accent="#df8c64"
        title="Every blueprint we draw, and what it is allowed to claim."
        subtitle={
          <>
            An architecture diagram is the most load-bearing thing on a page — a buyer reads it as a
            picture of something that runs. So each one is checked against the platform's source
            before it goes up, and the result is published here rather than kept in a review thread.
            Today {DIAGRAM_LIBRARY.length} of {DIAGRAM_REGISTER.length} assets are on the shelf, each
            listing the defects still on it, and {DIAGRAM_WITHHELD.length} are withheld pending
            redraw with the failing line named in its own words.
          </>
        }
        cta={{
          label: "See the platform in text instead",
          href: "/platform",
          secondary: { label: "Book a demo", href: "/contact" },
        }}
        meta={
          <MonoTag accent="#df8c64">
            Audited {DIAGRAM_AUDITED_ON} · {DIAGRAM_REGISTER.length} assets ·{" "}
            {DIAGRAM_LIBRARY.length} published · {DIAGRAM_WITHHELD.length} withheld
          </MonoTag>
        }
      />

      {/* ——— The standard ——— */}
      <Section tone="mist">
        <SectionHead
          kicker="The test"
          title="A drawing comes down when its subject does not exist. Otherwise it stays up with the defect named."
          lede="A caption sits outside the drawing; the assertion is inside it. That asymmetry is why a fabrication is answered by withholding — and why a stale label is answered by publishing the correction beside the artwork instead of hiding the artwork."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {WITHHOLDING_TEST.map((s, i) => (
            <Reveal key={s.q} delay={i * 0.06}>
              <div className="h-full rounded-card border border-line bg-surface p-7 shadow-card">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clay/15 text-clayDeep">
                  {s.icon}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                How this was audited
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                These diagrams were audited by one reviewer, on {DIAGRAM_AUDITED_ON}, by reading the
                text in each SVG against the platform source, and re-read the same day after{" "}
                {CORRECTED.length} of them were corrected in place. That pass found claims that no
                longer hold — offerings we retired, a consulting engagement drawn as a running
                system, a service level with nothing behind it, and an assure1 Trust Mark that is our
                own internal gate rather than an accreditation. The files whose subject does not
                exist were pulled rather than relabelled. It was mostly a reading of words; where a
                finding is about what the boxes and arrows imply, that is one reviewer's reading of a
                layout, which has no text to quote. It has had no second reader, and anything added
                since has not been through it.
              </p>
            </div>
            <div className="rounded-card border border-line bg-surface p-6">
              <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                Why the counts stay in text
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                A number inside artwork is an ordinary editable text node — several were edited on the
                audit date, which is the honest correction and the one this register prefers. What an
                SVG cannot do is import the file where the site keeps its platform counts, each with
                the derivation that produced it. So a number baked into a drawing cannot be derived at
                build time, and nothing catches it going stale the way something catches a number
                typed into a page. That is the whole argument for keeping counts in prose, and it is
                why the stale-count backlog on the published set below is open and unscheduled rather
                than quietly closed.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ——— The shelf ——— */}
      <Section tone="paper">
        {GROUPS.length > 2 && (
          <div className="flex flex-wrap gap-2">
            {GROUPS.map((g) => (
              <button
                key={g}
                onClick={() => setGroup(g)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  group === g
                    ? "border-transparent bg-ink text-paper"
                    : "border-line bg-surface text-slate hover:border-ink/30"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        )}

        {published.length > 0 && (
          <>
            <SectionHead
              className="mt-10"
              kicker="On the shelf"
              title={`${published.length} published — and what is still wrong with each one.`}
              lede="Published means the fault is a label rather than a fabrication. It does not mean the drawing is clean, so the open defects sit under the frame rather than in a review thread. They are what one pass found, not a proof that nothing else is on there."
            />
            <div className="mt-10 space-y-12">
              {published.map((d, i) => (
                <Reveal key={d.src} delay={(i % 2) * 0.06}>
                  <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
                    <DiagramEmbed
                      src={d.src}
                      title={d.title}
                      accent={accentFor[d.group]}
                      caption={d.blurb}
                    />
                    <div>
                      <p className="text-sm leading-relaxed text-slate">
                        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                          What ships behind it
                        </span>
                        <br />
                        {d.ships}
                      </p>

                      {d.corrected && (
                        <div className="mt-5 rounded-card border border-line bg-mist/60 p-4">
                          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide text-muted">
                            <Icon.Check className="h-3.5 w-3.5" /> Corrected in the artwork
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-ink">{d.corrected}</p>
                        </div>
                      )}

                      {d.openDefects.length > 0 && (
                        <div className="mt-5">
                          <p className="font-mono text-[10px] uppercase tracking-wide text-clayDeep">
                            Still wrong on this drawing · {d.openDefects.length}
                          </p>
                          <ul className="mt-3 space-y-4">
                            {d.openDefects.map((f, k) => (
                              <Finding key={k} asserts={f.asserts} butActually={f.butActually} />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 font-mono text-xs text-muted">
              {published.length} published · self-contained SVG · checked against the platform tree
              on {DIAGRAM_AUDITED_ON}
            </p>
          </>
        )}

        {published.length === 0 && (
          <Reveal>
            <div className="mt-10 rounded-card border border-dashed border-line bg-surface p-8">
              <p className="font-mono text-[11px] uppercase tracking-kicker text-clayDeep">
                Nothing on the shelf {group === "All" ? "today" : `under ${group}`}
              </p>
              <h3 className="display mt-3 text-2xl text-ink">
                This part of the visual system is being re-cut against the platform it describes.
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate">
                The honest thing to do with a drawing that asserts something untrue is to take it
                down, not to caption it. Every asset stays listed below with its reason, so the
                decision is auditable and a redraw is one field away. Meanwhile the same material
                exists in text — where a claim can be qualified, a count can be imported from the one
                file that holds it, and a seam can say whether it is live, modelled or merely
                declared.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/platform" className="btn-primary">
                  The platform, in text <Icon.Arrow className="h-4 w-4" />
                </Link>
                <Link to="/platform/connectors" className="btn-ghost">
                  Every seam, labelled <Icon.Arrow className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ——— The audit ——— */}
      <Section tone="mist">
        {withheld.length === 0 ? (
          <SectionHead
            kicker="Withheld, and why"
            title={`Nothing is withheld under ${group}.`}
            lede="Every asset in this group is on the shelf above, with the defects still on its artwork named underneath it. Switch the filter to see what is not."
          />
        ) : (
          <SectionHead
            kicker="Withheld, and why"
            title={`${withheld.length} asset${withheld.length === 1 ? "" : "s"}, each with the line that failed.`}
            lede="Quoted from the drawing wherever a phrase exists to quote — the same discipline the product pages use for refusal strings. A quoted assertion can be checked by anyone with the file open; a paraphrase asks you to trust the auditor."
          />
        )}
        <div className="mt-10 space-y-4">
          {withheld.map((d) => (
            <Reveal key={d.src}>
              <details className="group rounded-card border border-line bg-surface shadow-card">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6">
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ background: accentFor[d.group] }}
                      />
                      <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                        {d.group}
                      </span>
                    </span>
                    <span className="mt-2 block font-display text-lg font-bold text-ink">
                      {d.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate">{d.depicts}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="rounded-full bg-clay/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase text-clayDeep">
                      {d.findings.length} finding{d.findings.length === 1 ? "" : "s"}
                    </span>
                    <span className="text-muted transition-transform group-open:rotate-45">
                      <Icon.Plus className="h-4 w-4" />
                    </span>
                  </span>
                </summary>

                <div className="border-t border-line px-6 pb-6 pt-5">
                  <p className="text-sm leading-relaxed text-slate">
                    <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                      What ships behind it
                    </span>
                    <br />
                    {d.ships}
                  </p>
                  <ul className="mt-6 space-y-5">
                    {d.findings.map((f, i) => (
                      <Finding key={i} asserts={f.asserts} butActually={f.butActually} />
                    ))}
                  </ul>
                  <div className="mt-6 rounded-card border border-line bg-mist/60 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
                      What a redraw has to change
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">{d.redraw}</p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        {withheld.length > 0 && (
        <Reveal>
          <div className="mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-slate">
            <p>
              Several of these are one mistake copied, not many mistakes made — the same pillar band
              was drawn on all ten industry maps, and one header of three numbers went out on five
              product architectures at once. That is worth saying out loud, because it is also the
              reason the verdict now lives in one typed list instead of in a comment beside one file:
              a rule written next to a single asset does not travel to its copies. Every map above
              still carries its own quoted line as well, so nothing here is withheld on a template
              alone.
            </p>
            <p>
              The cost of that decision is concrete and worth naming. Ten solution pages and five
              pillar pages currently render without an architecture diagram, because their artwork
              draws outcome strips, durations and service levels rather than mechanisms. Each entry
              above says exactly what a redraw has to change, and most of it is subtraction.
            </p>
          </div>
        </Reveal>
        )}
      </Section>

      <CTASection
        kicker="Get started"
        title="The blueprint worth having is the one drawn against your systems."
        body="A Discovery Sprint maps your workflows, your data and your governance, and the diagram it produces is checked the same way this register is — nothing on it that cannot be pointed at."
      />
    </>
  );
}


