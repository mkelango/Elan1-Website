// content/assistant1.ts — the governed central assistant.
//
// assistant1 is a first-class platform citizen, not one of the ten suite apps and not a delivery
// pillar: the platform's app catalog is 10 apps + assistant1 + enterprise1. So it sits under
// Platform beside enterprise1 — the control plane, and the way you talk to it.
//
// 🚨 EVERY CLAIM BELOW IS TRACEABLE TO PLATFORM CODE. Sources, so a future edit can re-check
// rather than guess:
//   · the four gated transitions (screen → ground → propose → act) ....... ADR-0724 (AS-W3b spine)
//   · holds NO writer; actions route to the owning app's K5 approval ...... ADR-0724 `ungatedActionPaths`
//   · cite-or-refuse on every answer ..................................... ADR-0724 `unscreenedAnswerPaths`
//   · prompt-injection classifier on the SAFE engine, real-time refusal ... ADR-0449 `find_prompt_injection`
//   · 6-set eval battery incl. injection_resistance + scope_respect ....... ADR-0449 `_ASSISTANT1`
//   · two agents: `router` answers, `advisor` watches the answering ....... ADR-0724 (AS-W3a)
//   · channels: console · Slack · Teams · WhatsApp ....................... core/elan1_core/assistant_channels.py
//   · voice & meetings .................................................. ADR-0448 (A5)
//   · cross-app topics + pinned facts ................................... ADR-0446 (A3)
//   · per-conversation metering (K8) .................................... ADR-0449 (A6)
// Do NOT add a capability here without a comparable reference.

export interface AssistantCapability {
  title: string;
  description: string;
}

/** The govern-first sequence every request passes through. Each transition is gated. */
export const ASSISTANT_SPINE: { step: string; name: string; body: string }[] = [
  {
    step: "01",
    name: "Screen",
    body: "Every message screened for prompt injection; detected overrides refused in real time.",
  },
  {
    step: "02",
    name: "Ground",
    body: "Answers grounded in your systems; cite-or-refuse, never hallucinate.",
  },
  {
    step: "03",
    name: "Propose",
    body: "Consequential requests drafted as read-only proposals; nothing written yet.",
  },
  {
    step: "04",
    name: "Act",
    body: "Approval routes through app's own gate; sales1, people1, finance1 only. Everything else read-only.",
  },
];

export const ASSISTANT_CAPABILITIES: AssistantCapability[] = [
  {
    title: "It holds no business writer",
    description:
      "Owns only conversation record; routes writes through app's own approval gate.",
  },
  {
    title: "Grounded in your records, and it says when it isn't",
    description:
      "Answers computed from your systems; refuses what it cannot ground. No web access, no cross-tenant reads.",
  },
  {
    title: "Injection-screened by construction",
    description:
      "Real classifier screens every message; tested against adversarial corpus.",
  },
  {
    title: "It watches itself",
    description:
      "Two agents: router answers, advisor reviews for fabrication or drift.",
  },
  {
    title: "One thread across the suite",
    description:
      "Topics span apps; pinned facts stay pinned across conversations.",
  },
  {
    title: "Built for the channels, live in the console",
    description:
      "Console live now; Slack, Teams, WhatsApp built on same governed spine. Gates in platform, not chat window.",
  },
  {
    title: "A Trust Mark it can fail",
    description:
      "Eval-gated mark across 7 sets; fires a canonical jailbreak on each read.",
  },
];

/** What it is NOT — stated plainly, because the category is full of overclaiming. */
export const ASSISTANT_BOUNDARIES: string[] = [
  "No business-system writer; proposes only. Owns conversation record, pinned facts stored as requested.",
  "No web access; no cross-tenant reads.",
  "Does not replace an approver. Consequential actions need human sign-off.",
  "Model-backed NL is opt-in. Default: named-intent matching, never freeform conversation.",
  "Not a chatbot bolted on; runs on platform core with identity and audit.",
];

export const ASSISTANT_SEO = {
  title: "assistant1 — the governed central assistant | elan1",
  description:
    "assistant1 is the conversational way into the whole 1 Suite: grounded in your data with citations, screened for prompt injection, and holding no writer of its own — every consequential action goes through the owning app's approval gate.",
};
