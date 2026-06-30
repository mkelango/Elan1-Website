// components/Footer.tsx — full-sitemap footer with the tagline strip.
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { REGIONS, SOCIALS } from "../content/site";
import { RegionSwitcher } from "./RegionSwitcher";

const cols: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Products",
    links: [
      { label: "The 1 Suite", href: "/products" },
      { label: "sales1", href: "/products/sales1" },
      { label: "service1", href: "/products/service1" },
      { label: "finance1", href: "/products/finance1" },
      { label: "supply1", href: "/products/supply1" },
      { label: "people1", href: "/products/people1" },
      { label: "market1", href: "/products/market1" },
      { label: "insight1", href: "/products/insight1" },
      { label: "project1", href: "/products/project1" },
      { label: "commerce1", href: "/products/commerce1" },
      { label: "enterprise1", href: "/products/enterprise1" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "All industries", href: "/solutions" },
      { label: "By initiative", href: "/solutions/initiatives" },
      { label: "health1", href: "/solutions/health1" },
      { label: "bank1", href: "/solutions/bank1" },
      { label: "insure1", href: "/solutions/insure1" },
      { label: "retail1", href: "/solutions/retail1" },
      { label: "telco1", href: "/solutions/telco1" },
      { label: "gov1", href: "/solutions/gov1" },
      { label: "manufacture1", href: "/solutions/manufacture1" },
      { label: "realestate1", href: "/solutions/realestate1" },
      { label: "edu1", href: "/solutions/edu1" },
      { label: "energy1", href: "/solutions/energy1" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "All pillars", href: "/services" },
      { label: "strategy1", href: "/services/strategy1" },
      { label: "agent1", href: "/services/agent1" },
      { label: "assure1", href: "/services/assure1" },
      { label: "academy1", href: "/services/academy1" },
      { label: "run1", href: "/services/run1" },
      { label: "agency1", href: "/services/agency1" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "What is agentic transformation?", href: "/what-is-agentic-transformation" },
      { label: "The “1” philosophy", href: "/platform/the-1-philosophy" },
      { label: "The flywheel", href: "/platform/flywheel" },
      { label: "Trust & governance", href: "/trust" },
      { label: "Built on Claude", href: "/platform/built-on-claude" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Partners", href: "/company/partners" },
      { label: "Academy", href: "/academy" },
      { label: "Resources", href: "/resources" },
      { label: "Diagram library", href: "/resources/diagrams" },
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
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate">
              The agentic transformation company. From a $1M brand to a $1B enterprise — number one in its field.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <span key={r} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-slate">
                  {r}
                </span>
              ))}
            </div>
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
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="text-sm text-slate transition-colors hover:text-ink">
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
