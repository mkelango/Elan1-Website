// content/courses.ts — academy1 public learning hub (WS4.4). Courses + certification levels, mirroring
// the platform's academy1 (paths tied to platform roles; certification economy).
export interface Course {
  slug: string;
  title: string;
  role: string; // the platform role it certifies
  level: "Associate" | "Professional" | "Expert";
  summary: string;
  modules: string[];
  accent: string;
}

export const COURSES: Course[] = [
  { slug: "operate", title: "Operate the platform", role: "operator", level: "Associate", summary: "Run agents day-to-day: the run1/enterprise1 consoles, runs, traces, FinOps, reliability.", modules: ["The shared core (8 surfaces)", "Observe runs & traces", "FinOps basics"], accent: "#22b8c4" },
  { slug: "approve", title: "Approve with confidence", role: "approver", level: "Professional", summary: "Human-in-the-loop: review approval gates, governance decisions, and the audit trail.", modules: ["Why HITL", "Reading governance & Trust Marks", "Verifying the audit chain"], accent: "#e0656d" },
  { slug: "administer", title: "Administer the platform", role: "admin", level: "Expert", summary: "The enterprise1 control plane: identity/access, wave rollout, one governance pane.", modules: ["Identity & access (K1)", "Wave rollout (X2)", "The governance pane"], accent: "#b9603f" },
  { slug: "run-customer1", title: "Run customer1", role: "sales", level: "Associate", summary: "Operate the sales app: account research, grounded outreach, human-approved commitments.", modules: ["Account research", "Grounded outreach", "Approvals"], accent: "#df8c64" },
];

export const CERT_LEVELS = [
  { level: "Associate", body: "Operate a certified app function." },
  { level: "Professional", body: "Operate + approve across apps." },
  { level: "Expert", body: "Operate + approve + administer the platform (control plane)." },
];
