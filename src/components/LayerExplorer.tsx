// components/LayerExplorer.tsx — interactive Services / Products / Solutions explorer.
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "../content/products";
import { solutions } from "../content/solutions";
import { services } from "../content/services";
import { Icon } from "./primitives";

type Tab = "services" | "products" | "solutions";

const TABS: { key: Tab; label: string; tag: string; blurb: string; accent: string }[] = [
  { key: "services", label: "Services", tag: "How we deliver", blurb: "Six pillars, end to end.", accent: "#7c6cf0" },
  { key: "products", label: "Products", tag: "What we deploy", blurb: "The 1 Suite — ten agentic apps.", accent: "#2f6df0" },
  { key: "solutions", label: "Solutions", tag: "Who we serve", blurb: "Ten industry solutions.", accent: "#d39a3a" },
];

export function LayerExplorer() {
  const [tab, setTab] = useState<Tab>("products");

  const items =
    tab === "services"
      ? services.map((s) => ({ slug: s.slug, name: s.name, sub: s.tagline, href: `/services/${s.slug}`, accent: s.accent }))
      : tab === "products"
      ? products.map((p) => ({ slug: p.slug, name: p.name, sub: p.businessFunction, href: `/products/${p.slug}`, accent: p.accent }))
      : solutions.map((s) => ({ slug: s.slug, name: s.name, sub: s.industry, href: `/solutions/${s.slug}`, accent: s.accent }));

  return (
    <div className="rounded-card border border-line bg-surface p-4 shadow-card sm:p-6">
      {/* Tabs */}
      <div className="flex flex-col gap-2 sm:flex-row">
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 rounded-xl border px-4 py-3 text-left transition-all ${
                active ? "border-transparent text-paper shadow-card" : "border-line bg-paper hover:border-ink/20"
              }`}
              style={active ? { background: "#0a1320" } : undefined}
            >
              <span className="flex items-center justify-between">
                <span className={`font-display text-base font-bold ${active ? "text-paper" : "text-ink"}`}>{t.label}</span>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
              </span>
              <span className={`mt-0.5 block font-mono text-[10px] uppercase tracking-kicker ${active ? "text-clay" : "text-muted"}`}>
                {t.tag}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {items.map((it) => (
            <Link
              key={it.slug}
              to={it.href}
              className="group rounded-xl border border-line bg-paper p-4 transition-all hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
            >
              <span className="flex items-center justify-between">
                <span className="h-2 w-2 rounded-full" style={{ background: it.accent }} />
                <Icon.Arrow className="h-3.5 w-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </span>
              <span className="mt-3 block font-mono text-sm font-semibold text-ink">{it.name}</span>
              <span className="mt-1 block text-xs leading-snug text-slate">{it.sub}</span>
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>

      <p className="mt-4 px-1 font-mono text-[11px] text-muted">
        {tab === "products" && "Functional apps — horizontal, reused across every industry."}
        {tab === "solutions" && "Verticals — compose products + pillars with industry skills & governance."}
        {tab === "services" && "Pillars — wrap both. Start anywhere; we take you everywhere."}
      </p>
    </div>
  );
}
