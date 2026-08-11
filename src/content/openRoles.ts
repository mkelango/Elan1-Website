// content/openRoles.ts — The single source of truth for open roles at elan1.
// Every role listed here is verified, currently recruiting, and kept up-to-date.

export interface OpenRole {
  title: string;
  area: string;
  status: "actively recruiting" | "pipeline";
}

export const OPEN_ROLES: OpenRole[] = [
  {
    title: "Management Trainee",
    area: "Operations & Leadership",
    status: "actively recruiting",
  },
  {
    title: "AI Trainee",
    area: "AI & Machine Learning",
    status: "actively recruiting",
  },
  {
    title: "Founder Office Intern",
    area: "Executive Operations",
    status: "actively recruiting",
  },
  {
    title: "Sales",
    area: "Revenue & Growth",
    status: "actively recruiting",
  },
];

export const OPEN_ROLES_UPDATED = "2026-08-11";
