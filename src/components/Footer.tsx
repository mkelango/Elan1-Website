// components/Footer.tsx — full-sitemap footer with the tagline strip.
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { primarySolutions, secondarySolutions } from "../content/solutions";
import { BRAND, SOCIALS, navColumnLinks } from "../content/site";
import { RegionSwitcher } from "./RegionSwitcher";
import { categories, appsOf } from "../content/categories";

// Products are DERIVED from categories.ts for the same reason — the previously hardcoded list had
// silently lost goal1. Category link first, then its apps indented beneath.
const productLinks = categories.flatMap((c) => [
  // A category heading is differentiated by COLOUR, CASE AND WEIGHT — clayDeep, uppercase mono —
  // and deliberately carries NO bullet. Dots in this site's grammar mark a thing you run (an app, a
  // pillar); a category is a grouping, so a dot beside it flattens exactly the hierarchy the colour
  // is drawing. The category's own accent is not used for the label either: those are light tints
  // (gold #e3b25c, green #7fd58f) that fail contrast on the paper ground at 11px.
  { label: c.name, href: `/products/category/${c.slug}`, group: true },
  ...appsOf(c).map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
]);

const cols: {
  heading: string;
  links: { label: string; href: string; group?: boolean; accent?: string }[];
}[] = [
  {
    heading: "Products",
    links: [
      { label: "The 1 Suite", href: "/products" },
      ...productLinks,
    ],
  },
  {
    // DERIVED, like Platform and Resources. The hand-written version listed the five focus verticals
    // and a bare "By initiative" link — so the five initiative pages (agentic transformation,
    // customer experience, cost & FinOps, compliance & governance, legacy modernization) had no
    // footer entry at all, while the header gave each its own row. Same defect as Resources: a short
    // array is not a type error, so nothing caught it.
    heading: "Solutions",
    links: [
      { label: "All industries", href: "/solutions", group: true },
      // Mirrors the header's "By industry" column: the five featured verticals, then the roll-up.
      // Both DERIVED from `focus` in solutions.ts — never a second hardcoded roster, which is how the
      // old nav split had already drifted from the field it was supposed to mirror.
      ...primarySolutions.map((x) => ({ label: x.slug, href: `/solutions/${x.slug}` })),
      {
        label: `More industries (${secondarySolutions.length})`,
        href: "/solutions",
      },
      { label: "By initiative", href: "/solutions/initiatives", group: true },
      ...navColumnLinks("Solutions").filter((l) => l.href.startsWith("/solutions/initiatives/")),
    ],
  },
  {
    // DERIVED from the header's own mega-menu, so the footer cannot drift from it in order OR in
    // completeness. Both used to be hand-listed and both had drifted: Platform ran in a different
    // order than the header (overview first, the four pillars buried after the engineering links),
    // and Resources showed 7 of its 9 destinations — "ROI calculator" and "Certified talent" were
    // missing, invisibly, because a short array is not a type error.
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform", group: true },
      ...navColumnLinks("Platform").filter((l) => l.href !== "/platform"),
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "All resources", href: "/resources", group: true },
      ...navColumnLinks("Resources").filter((l) => l.href !== "/resources"),
    ],
  },
  {
    // DERIVED from the Proof mega, like Platform and Resources. Proof is the menu that replaced a
    // Customers column, and the footer is the surface where a missing entry is least visible — so
    // it is derived rather than re-listed, for exactly the reason the other three are.
    heading: "Proof",
    links: [
      { label: "See it refuse", href: "/resources/proof", group: true },
      ...navColumnLinks("Proof").filter((l) => l.href !== "/resources/proof"),
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Partners", href: "/company/partners" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Pricing", href: "/pricing" },
      { label: "Developers", href: "/developers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3.6fr]">
          <div>
            <Logo />
            {/*
              🚨 TWO CLAIMS WERE REMOVED FROM THIS BLOCK, AND THEY WERE ON EVERY PAGE.
              The footer renders sitewide, which is what made them expensive:

              1. "From a $1M brand to a $1B enterprise" — a customer-scale claim. There are no
                 customers to characterise, and the site says so on its own press-kit page.
              2. A row of region chips built from REGIONS. That constant is the compliance-language
                 selector and a form dropdown — a locale picker, not a set of offices. Rendered as
                 bare pills under the wordmark it reads as presence, which is a headcount-and-offices
                 claim made without a sentence anyone could fact-check.

              The descriptor that replaces them is BRAND.promise, so the footer cannot describe the
              company differently from the rest of the site. If you want the regions back, label them
              for what they are — see the region switcher, which does exactly that.
            */}
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              {BRAND.promise} Governance on the write path — a person approves what matters, and the
              record says who.
            </p>
            <div className="mt-6 flex gap-3 text-slate">
              {SOCIALS.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-xs font-mono uppercase hover:border-ink/40 hover:text-ink">
                  {s.key}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {cols.map((c) => (
              <div key={c.heading}>
                <p className="font-mono text-[10px] uppercase tracking-kicker text-muted">{c.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {/* Composite key: three hrefs legitimately appear twice (a section link plus its
                      entry in another column), and href alone collided into a React duplicate-key
                      error on every page of the site. */}
                  {c.links.map((l) => (
                    <li key={`${c.heading}:${l.label}:${l.href}`} className={l.group ? "pt-3 first:pt-0" : ""}>
                      <Link
                        to={l.href}
                        className={
                          l.group
                            ? "font-mono text-[11px] font-semibold uppercase tracking-kicker text-clayDeep transition-colors hover:text-ink"
                            : "text-sm text-slate transition-colors hover:text-ink"
                        }
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            <span>© {new Date().getFullYear()} elan1</span>
            <Link to="/trust" className="hover:text-ink">Privacy (DPDP)</Link>
            <Link to="/trust" className="hover:text-ink">Terms</Link>
            <Link to="/trust" className="hover:text-ink">Security</Link>
            <Link to="/trust" className="hover:text-ink">Trust Center</Link>
            <Link to="/trust" className="hover:text-ink">Responsible AI</Link>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <RegionSwitcher />
            <div className="flex items-center gap-2 font-mono text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-clay" />
              Built on Claude · Ad-free · India-rooted, global
            </div>
          </div>
        </div>
      </div>

      {/* Tagline strip */}
      <div className="border-t border-line bg-obsidian">
        <div className="shell flex items-center justify-between py-5">
          <span className="font-display text-base font-bold text-paper sm:text-lg">Add 1. Become the one.</span>
          <span className="font-mono text-[11px] uppercase tracking-kicker text-clay">an elan1 company</span>
        </div>
      </div>
    </footer>
  );
}
