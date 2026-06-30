// lib/diagrams.ts
// Maps offering slugs to their SVG diagram in /public/diagrams, plus the curated library index.

export const productDiagram: Record<string, string> = {
  // sales1, insight1, project1, commerce1 and goal1 show a native "runs on the suite" panel, not a diagram.
  service1: "/diagrams/service1_architecture.svg",
  finance1: "/diagrams/finance1_architecture.svg",
  supply1: "/diagrams/supply1_architecture.svg",
  people1: "/diagrams/people1_architecture.svg",
  market1: "/diagrams/market1_architecture.svg",
  enterprise1: "/diagrams/enterprise1_architecture.svg",
};

export const solutionDiagram: Record<string, string> = {
  health1: "/diagrams/health1_solution_map.svg",
  bank1: "/diagrams/bank1_solution_map.svg",
  insure1: "/diagrams/insure1_solution_map.svg",
  retail1: "/diagrams/retail1_solution_map.svg",
  telco1: "/diagrams/telco1_solution_map.svg",
  gov1: "/diagrams/gov1_solution_map.svg",
  manufacture1: "/diagrams/manufacture1_solution_map.svg",
  realestate1: "/diagrams/realestate1_solution_map.svg",
  edu1: "/diagrams/edu1_solution_map.svg",
  energy1: "/diagrams/energy1_solution_map.svg",
};

export const serviceDiagram: Record<string, string> = {
  strategy1: "/diagrams/strategy1_architecture.svg",
  agent1: "/diagrams/agent1_architecture.svg",
  assure1: "/diagrams/assure1_architecture.svg",
  academy1: "/diagrams/academy1_architecture.svg",
  run1: "/diagrams/run1_architecture.svg",
  agency1: "/diagrams/agency1_architecture.svg",
};

export interface DiagramEntry {
  src: string;
  title: string;
  group: "System" | "Services" | "Products" | "Solutions" | "Architecture";
  blurb: string;
}

export const DIAGRAM_LIBRARY: DiagramEntry[] = [
  { src: "/diagrams/elan1_system_map.svg", title: "The elan1 system map", group: "System", blurb: "The whole company on one page — services, products, and solutions as one flywheel." },
  { src: "/diagrams/elan1_diagram_index.svg", title: "Diagram index", group: "System", blurb: "An index of the full visual system." },
  { src: "/diagrams/claude_360_architecture.svg", title: "Claude 360° architecture", group: "Architecture", blurb: "The Claude-native foundation the suite is built on." },
  { src: "/diagrams/enterprise1_architecture.svg", title: "enterprise1 — platform backbone", group: "Products", blurb: "The control plane that unifies the suite." },
  { src: "/diagrams/service1_architecture.svg", title: "service1 architecture", group: "Products", blurb: "Agentic customer service that resolves." },
  { src: "/diagrams/finance1_architecture.svg", title: "finance1 architecture", group: "Products", blurb: "The finance function, accelerated." },
  { src: "/diagrams/supply1_architecture.svg", title: "supply1 architecture", group: "Products", blurb: "A supply chain that thinks." },
  { src: "/diagrams/people1_architecture.svg", title: "people1 architecture", group: "Products", blurb: "From hire to high-performance." },
  { src: "/diagrams/market1_architecture.svg", title: "market1 architecture", group: "Products", blurb: "Campaigns at agent speed." },
  { src: "/diagrams/strategy1_architecture.svg", title: "strategy1 operating architecture", group: "Services", blurb: "Agentic strategy that ships." },
  { src: "/diagrams/agent1_architecture.svg", title: "agent1 build studio", group: "Services", blurb: "How we build production agents." },
  { src: "/diagrams/assure1_architecture.svg", title: "assure1 governance", group: "Services", blurb: "Governance, evals, and the Trust Mark." },
  { src: "/diagrams/academy1_architecture.svg", title: "academy1 enablement", group: "Services", blurb: "Making your people agentic." },
  { src: "/diagrams/run1_architecture.svg", title: "run1 AgentOps", group: "Services", blurb: "Your agents, operated for you." },
  { src: "/diagrams/agency1_architecture.svg", title: "agency1 creative studio", group: "Services", blurb: "Creative at agent speed." },
  { src: "/diagrams/health1_solution_map.svg", title: "health1 solution map", group: "Solutions", blurb: "Less paperwork, more care." },
  { src: "/diagrams/bank1_solution_map.svg", title: "bank1 solution map", group: "Solutions", blurb: "Speed with the controls your regulator expects." },
  { src: "/diagrams/insure1_solution_map.svg", title: "insure1 solution map", group: "Solutions", blurb: "Faster claims, fairer decisions." },
  { src: "/diagrams/retail1_solution_map.svg", title: "retail1 solution map", group: "Solutions", blurb: "More conversion, fewer stockouts." },
  { src: "/diagrams/telco1_solution_map.svg", title: "telco1 solution map", group: "Solutions", blurb: "Lower churn, lower cost-to-serve." },
  { src: "/diagrams/gov1_solution_map.svg", title: "gov1 solution map", group: "Solutions", blurb: "Faster public service, full accountability." },
  { src: "/diagrams/manufacture1_solution_map.svg", title: "manufacture1 solution map", group: "Solutions", blurb: "Less downtime, faster R&D." },
  { src: "/diagrams/realestate1_solution_map.svg", title: "realestate1 solution map", group: "Solutions", blurb: "Faster deals, cleaner data." },
  { src: "/diagrams/edu1_solution_map.svg", title: "edu1 solution map", group: "Solutions", blurb: "More teaching time, better personalization." },
  { src: "/diagrams/energy1_solution_map.svg", title: "energy1 solution map", group: "Solutions", blurb: "Fewer outages, tighter compliance." },
];
