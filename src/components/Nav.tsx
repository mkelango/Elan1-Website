// components/Nav.tsx — sticky header with mega-menus, region selector, and mobile drawer.
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, REGIONS, APP_URL, type NavItem } from "../content/site";
import { Logo } from "./Logo";
import { Icon } from "./primitives";

function MegaPanel({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: NavItem;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  if (!item.mega) return null;
  return (
    <AnimatePresence>
      {open && (
        // The wrapper spans the trigger → card gap (pt-3) so the cursor never crosses a dead zone;
        // onMouseEnter cancels the close timer, keeping the panel live across the gap.
        <div
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          className="absolute left-1/2 top-full z-50 -translate-x-1/2 px-4 pt-3"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="w-[min(92vw,920px)] overflow-hidden rounded-2xl border border-line bg-surface/95 shadow-lift backdrop-blur"
          >
        <div className={`grid ${item.featured ? "grid-cols-[1fr_1fr_0.9fr]" : "grid-cols-2"} divide-x divide-line`}>
          {item.mega.map((col, i) => (
            <div key={i} className="p-6">
              {col.heading.trim() && (
                <p className="mb-3 font-mono text-[10px] uppercase tracking-kicker text-muted">{col.heading}</p>
              )}
              <ul className="space-y-1">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      to={l.href}
                      className="group/link flex items-start gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-mist"
                    >
                      {l.accent && (
                        <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full" style={{ background: l.accent }} />
                      )}
                      <span>
                        <span className="flex items-center gap-2">
                          <span className={`font-mono text-sm font-semibold text-ink ${l.accent ? "" : "ml-0"}`}>{l.label}</span>
                          {l.tag === "live" && (
                            <span className="rounded-full bg-green/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-green">live</span>
                          )}
                        </span>
                        {l.desc && <span className="mt-0.5 block text-xs text-slate">{l.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {item.featured && (
            <div className="flex flex-col justify-between bg-obsidian p-6 text-paper">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-kicker text-clay">Featured</p>
                <p className="display mt-3 text-lg text-paper">{item.featured.title}</p>
                <p className="mt-2 text-sm text-paper/65">{item.featured.body}</p>
              </div>
              <Link to={item.featured.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay hover:text-paper">
                {item.featured.cta} <Icon.Arrow className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openMega = (label: string) => {
    cancelClose();
    setOpenMenu(label);
  };
  // Close after a short grace period so moving the cursor across the gap (or briefly off) keeps it open.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };
  const [region, setRegion] = useState(REGIONS[0]);
  const [regionOpen, setRegionOpen] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [loc.pathname]);

  useEffect(() => () => cancelClose(), []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-line bg-paper/85 backdrop-blur-xl" : "border-b border-transparent bg-paper/0"
      }`}
    >
      <div className="shell relative flex h-16 items-center justify-between gap-4">
        <Link to="/" aria-label="elan1 home" className="shrink-0">
          <Logo />
        </Link>

        {/* Primary nav */}
        <nav className="hidden items-center lg:flex">
          {NAV.map((item) => (
            <div
              key={item.label}
              onMouseEnter={() => item.mega && openMega(item.label)}
              onMouseLeave={() => item.mega && scheduleClose()}
            >
              <Link
                to={item.href}
                onClick={() => setOpenMenu(null)}
                className="flex items-center gap-1 px-3.5 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:text-ink"
              >
                {item.label}
                {item.mega && (
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-3.5 w-3.5 text-muted transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                )}
              </Link>
              <MegaPanel
                item={item}
                open={openMenu === item.label}
                onEnter={() => openMega(item.label)}
                onLeave={scheduleClose}
              />
            </div>
          ))}
        </nav>

        {/* Utility */}
        <div className="flex items-center gap-2">
          <div className="relative hidden xl:block">
            <button
              onClick={() => setRegionOpen((v) => !v)}
              onBlur={() => setTimeout(() => setRegionOpen(false), 150)}
              className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-slate hover:border-ink/30"
            >
              <Icon.Globe className="h-4 w-4" />
              {region}
              <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
            </button>
            <AnimatePresence>
              {regionOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-line bg-surface py-1 shadow-lift"
                >
                  {REGIONS.map((r) => (
                    <li key={r}>
                      <button
                        onMouseDown={() => setRegion(r)}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-mist ${r === region ? "text-clayDeep" : "text-slate"}`}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <a href={APP_URL} className="hidden text-sm font-medium text-ink/70 hover:text-ink sm:inline-flex sm:px-3 sm:py-2">
            Log in
          </a>
          <Link to="/get-started" className="btn-primary hidden sm:inline-flex">
            Book a demo
          </Link>

          {/* Mobile toggle */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
          >
            <div className="shell max-h-[75vh] space-y-1 overflow-y-auto py-4">
              {NAV.map((item) => (
                <details key={item.label} className="group border-b border-line/70 py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-base font-semibold text-ink">
                    <Link to={item.href}>{item.label}</Link>
                    {item.mega && <Icon.Plus className="h-4 w-4 text-muted group-open:rotate-45 transition-transform" />}
                  </summary>
                  {item.mega && (
                    <div className="pb-2 pl-1">
                      {item.mega.flatMap((c) => c.links).map((l) => (
                        <Link key={l.label + l.href} to={l.href} className="flex items-center gap-2 py-1.5 text-sm text-slate">
                          {l.accent && <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.accent }} />}
                          <span className="font-mono">{l.label}</span>
                          {l.desc && <span className="text-xs text-muted">— {l.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </details>
              ))}
              <div className="flex gap-3 pt-4">
                <Link to="/get-started" className="btn-primary flex-1">Book a demo</Link>
                <a href={APP_URL} className="btn-ghost flex-1 text-center">Log in</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
