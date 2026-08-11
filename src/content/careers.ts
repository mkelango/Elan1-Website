// content/careers.ts — Working at elan1.
// No invented roles. No service-level promises. Just open positions and how we work.

import { OPEN_ROLES, OPEN_ROLES_UPDATED } from "./openRoles";

export const CAREERS_HERO = {
  kicker: "Company · careers",
  title: "Working at elan1.",
  subtitle: "Open roles, how we work, and what we won't tell you.",
};

export const CAREERS_SEO = {
  title: "Working at elan1",
  description: "Open positions and the practices that guide the work.",
};

// ——— Open Roles ———

export { OPEN_ROLES, OPEN_ROLES_UPDATED };

export const OPEN_ROLES_SECTION = {
  title: "We're hiring for these roles.",
  subtitle: `Updated ${OPEN_ROLES_UPDATED}. When a role closes, it leaves this list.`,
};

export const NO_OPEN_LIST = {
  title: "No open roles.",
  body: "When positions open, they appear above.",
};

// ——— How We Work ———

export const HOW_WE_WORK_LEDE =
  "Each rule came from a defect that shipped as verified. Each is in the codebase.";

export interface Practice {
  title: string;
  body: string;
}

export const HOW_WE_WORK: Practice[] = [
  {
    title: "Tests that cannot fail are not evidence",
    body: "If a test stays green while the code breaks, that is the finding.",
  },
  {
    title: "Guards measure the property, not a proxy",
    body: "A substring, regex, or count standing in for a reference is the same defect it guards against.",
  },
  {
    title: '"We did not look" never renders as "we looked and it was fine"',
    body: "Three states: passed, failed, not measurable. Empty scans return the third.",
  },
  {
    title: "Denominators are derived, never typed",
    body: "Hand-typed rosters are complete on the day you write them and stale the next day.",
  },
  {
    title: "No claim exceeds what the code does",
    body: "An over-claiming comment is a defect in prose.",
  },
];

export const HOW_WE_WORK_TITLE = "Five practices, from five shipped defects.";

// ——— What We Won't Tell You ———

export const WHAT_THIS_PAGE_WILL_NOT_TELL_YOU: string[] = [
  "Whether we're hiring today.",
  "Headcount or office locations.",
  "Salary, equity, or benefits.",
  "Interview process details.",
  "Timelines on opening roles.",
];

export const REPLY_POSTURE =
  "We'd rather say nothing than leave you waiting.";
