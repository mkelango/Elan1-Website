# elan1.in — the agentic transformation company

A world-class, multi-page corporate marketing website for **elan1** — *"Add 1. Become the one."*
Built from the `elan1web.zip` source pack (typed content layer, the 25-SVG diagram library, the
website blueprint, and CLAUDE.md handoff).

## Stack
- **Vite + React + TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.js` + `src/index.css`)
- **Framer Motion** (restrained reveal-on-scroll + mega-menus)
- **react-router-dom** (client-side multi-page routing)

## Design direction — "Obsidian Daylight"
White/warm-paper base with black **obsidian** feature rows (so the dark blueprint diagrams sit
natively). Clay/coral primary accent + an enterprise-blue secondary + the full per-layer accent
system (cyan/gold/violet/green/rose) for wayfinding. Type mirrors the diagram library exactly:
**Bricolage Grotesque** (display) · **Outfit** (body) · **JetBrains Mono** (tags) — so the site and
the SVGs read as one system. The **rose governance spine** is the recurring trust motif.

## Run
```bash
npm install
npm run dev      # http://localhost:5183
npm run build    # typecheck + production build → dist/
```

## Architecture
- `src/content/` — the **typed content layer** from the source pack (`products.ts`, `solutions.ts`,
  `services.ts`, `types.ts`) plus `site.ts` (nav, home copy, method/flywheel). **All 23 offering
  pages render from this data** — adding an offering is data-only.
- `src/components/` — shared shell (`Nav` mega-menus, `Footer`, `CTASection`, `Layout`), primitives,
  `DiagramEmbed` (zoomable SVG frame), `LayerExplorer` (interactive 3-layer model), and page blocks.
- `src/pages/` — `Home`, the three templates (`ProductPage` / `SolutionPage` / `ServicePage`),
  overviews, Platform (approach · "1" philosophy · flywheel · built-on-Claude), Trust, Academy,
  Pricing, Resources, Diagram library, About, Careers, Partners, Contact, 404.
- `public/diagrams/` — the 25 source SVGs, embedded across offering pages and the diagram library.
- `src/lib/` — slug→diagram mapping and a small SEO hook.

## Notes / honest flags
- **customer1** has no architecture SVG in the source zip (only a PDF exists), so its page shows a
  "see it live at customer1.in" callout instead of substituting a wrong diagram.
- The **Book a demo / Discovery Sprint** form is wired to a client-side success state with a `TODO`
  to connect a real provider endpoint — no secrets in the client.
- Pricing and forward-looking figures are flagged **illustrative**; the site never implies
  autonomous, unsupervised agent action (human-in-the-loop throughout).

*Built on Claude · Ad-free · India-rooted, global.*
