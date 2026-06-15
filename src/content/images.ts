// content/images.ts — curated, license-clean photography mapped to slots.
// All images render through <BrandImage>, which brand-grades them (duotone + accent) so they
// read as one system. Missing entries fall back to an on-brand gradient automatically.

export const solutionImage: Record<string, string> = {
  health1: "/img/health1.jpg", // surgical / clinical care
  bank1: "/img/bank1.jpg", // markets / trading data
  insure1: "/img/insure1.jpg", // advisor at the counter
  retail1: "/img/retail1.jpg", // store floor
  telco1: "/img/telco1.jpg", // data center / network
  gov1: "/img/gov1.jpg", // civic / city overview
  manufacture1: "/img/manufacture1.jpg", // factory floor engineer
  realestate1: "/img/realestate1.jpg", // towers / built environment
  edu1: "/img/edu1.jpg", // learning / library
  energy1: "/img/energy1.jpg", // grid / transmission
};

export const pageImage = {
  shift: "/img/shift.jpg", // code — agents do the work
  about: "/img/about.jpg", // team collaboration
  careers: "/img/careers.jpg", // modern workplace
  academy: "/img/academy.jpg", // learning
  trust: "/img/trust.jpg", // governance review
} as const;

// Human-facing service pillars only (agent1 / assure1 / run1 stay diagram-led).
export const serviceImage: Record<string, string> = {
  strategy1: "/img/strategy1.jpg", // strategy / planning wall
  academy1: "/img/academy.jpg", // learning (shared)
  agency1: "/img/agency1.jpg", // creative / design swatches
};

// Product heroes are abstract (AbstractHero) until we wire real enterprise1 console screenshots.
// Add a slug → screenshot path here later and ProductPage swaps to <BrandImage> automatically.
export const productImage: Record<string, string> = {};

export const initiativeImage: Record<string, string> = {
  "agentic-transformation": "/img/init-agentic.jpg",
  "customer-experience": "/img/init-cx.jpg",
  "cost-finops": "/img/init-finops.jpg",
  compliance: "/img/init-compliance.jpg",
  "legacy-modernization": "/img/init-legacy.jpg",
};
