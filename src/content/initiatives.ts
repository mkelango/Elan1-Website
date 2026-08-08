// content/initiatives.ts — cross-industry initiatives (the "By initiative" way to browse Solutions).
//
// Each frames a business need that spans verticals, the elan1 approach, what it composes, and what
// changes. An initiative page is a COMPOSITION of things described elsewhere — it must not invent a
// capability that its own component pages do not claim.
//
// 🚨 THE FAILURE MODE THIS FILE IS PRONE TO. An initiative page is one abstraction level above the
// product pages, and that distance is exactly where overstatement creeps in: "resolves the issue"
// reads fine here while service1's own page says the agent drafts and a person sends. Three rules:
//
//   1. No unbacked outcome claims. Nothing has been measured in a customer environment, so
//      "higher first-contact resolution", "lower cost-to-serve" and "faster close" are not ours to
//      claim. Use MECHANICAL outcomes: what is now structurally impossible, what is on the record,
//      what is computed rather than typed.
//   2. No timeline promises ("a certified agent in weeks"). Certification is eval-gated; how long
//      it takes depends on the workflow, and a number here is a commitment nobody sized.
//   3. Every claim must be true on the page it points at. If service1's page says the agent drafts
//      and a human sends, this file may not say it resolves.
//
// `composedOf` slugs must exist in products.ts or services.ts — ComposedOf renders them as links.

export interface Initiative {
  slug: string;
  name: string;
  tag: string;
  accent: string;
  headline: string;
  challenge: string;
  approach: { title: string; description: string }[];
  composedOf: string[];
  outcomes: string[];
  seo: { title: string; description: string };
}

export const initiatives: Initiative[] = [
  {
    slug: "agentic-transformation",
    name: "Agentic transformation",
    tag: "The flagship initiative",
    accent: "#df8c64",
    headline: "Move from “we use AI” to “we run on agents.”",
    challenge:
      "Most organisations are stuck between a strategy deck that never ships and a generic AI tool that is not grounded in their records, not governed, and not theirs. What is missing is rarely the model. It is a sequence, and a mechanism that holds the sequence when the pressure is on.",
    approach: [
      {
        title: "Map and sequence it",
        description:
          "strategy1 is a planning engagement run by people — there is no strategy1 app to log into. What comes out is a current-state map and a wave order, written against the enablement gate that will actually enforce it: agents are turned on per tenant, one function at a time, and a function outside the enabled set is refused before it runs.",
      },
      {
        title: "Build the first one",
        description:
          "agent1 authors your agents as typed blueprints and compiles them into the same shape every agent on the platform has. The studio can refuse a build: an advisory blueprint holding a control-system connector raises instead of compiling.",
      },
      {
        title: "Prove it before it runs",
        description:
          "assure1 is the certification kernel: a Trust Mark is refused on an eval run that scored zero cases, one that did not pass, or one belonging to another tenant. The mark is bound to a content hash of the agent's definition, so editing the definition revokes it rather than letting it outlive what it certified.",
      },
      {
        title: "Operate it, then widen it",
        description:
          "run1 carries the production surfaces — every run with its step trace, its metered cost, and a suspend switch that overrides an enabled set immediately. Widening is the same gated move as the first enablement, which is what stops the second function from being an act of faith.",
      },
    ],
    composedOf: ["strategy1", "agent1", "assure1", "run1", "enterprise1"],
    outcomes: [
      "A rollout order the control plane enforces — “not this wave” is a refused run, not a line in a deck",
      "A first agent that reached production through a passing eval, a named approver and a Trust Mark",
      "An append-only, hash-chained record of what ran, what it changed and who approved it",
      "A written list of what the engagement did not answer, carried forward rather than implied closed",
    ],
    seo: {
      title: "Agentic transformation initiative | elan1",
      description:
        "The path from AI ambition to an agentic organisation: a sequenced roadmap, a first agent built as a typed blueprint, an eval-gated Trust Mark, and staged enablement on enterprise1.",
    },
  },
  {
    slug: "customer-experience",
    name: "Customer experience",
    tag: "Initiative",
    accent: "#2f6df0",
    headline: "Answer from the record. Let a person send it.",
    challenge:
      "Customers expect fast, accurate answers on every channel. The tempting fix is a bot that can act — and that is precisely the thing nobody is willing to switch on, because an agent that can send, refund or close is an agent that can be wrong in public. The workable shape is narrower and more useful: let agents do the reading, the triage and the drafting, and keep the moment the customer feels at a person.",
    approach: [
      {
        title: "Draft, don't dispatch",
        description:
          "service1 triages a case, scores it, and drafts a reply against your own knowledge — and the draft is stored for a person to send. A refund, an account change and a case close are refused at the data layer without a human approval, and self-service only answers above a confidence floor: below it the customer gets a human, not a guess.",
      },
      {
        title: "Sell with the record, not around it",
        description:
          "sales1 researches the account and drafts the outreach, consent-checked at the send site — a do-not-contact recipient is blocked outright, and a cadence auto-unenrols anyone who has already replied. The quote it drafts carries prices from the catalog, and an order whose lines do not tie to its quote is refused.",
      },
      {
        title: "Publish on a person's signature",
        description:
          "market1 drafts campaigns, journeys and assets, and cannot publish alone: publish, schedule-social and send-newsletter are consequential, so the runtime routes them to a person even when the agent never asked. An opt-out is honoured at the send site rather than corrected later in a report.",
      },
    ],
    composedOf: ["service1", "sales1", "market1"],
    outcomes: [
      "An answer that traces to a document, and an uncited one that is visible as uncited",
      "A refund, an account change and a close that each carry an approver's name and an audit row",
      "Outreach that is consent-checked where it is sent, not where it is planned",
      "Support figures computed from the case book at read time, each disclosing the sample it rests on",
    ],
    seo: {
      title: "Customer experience initiative | elan1",
      description:
        "Agentic CX where agents triage, score and draft, and a person owns anything the customer feels. Composes service1, sales1 and market1 with the consequential end held.",
    },
  },
  {
    slug: "cost-finops",
    name: "Cost & FinOps",
    tag: "Initiative",
    accent: "#3fae6b",
    headline: "Automate the rote work. Meter what the agents cost.",
    challenge:
      "Two costs move in opposite directions. Manual back-office work is expensive and slow, and the cost of running agents is easy to lose track of — it arrives as one line on a model-provider invoice, months after the decision that caused it. Both need to become numbers somebody owns.",
    approach: [
      {
        title: "Take the rote work, keep the gate",
        description:
          "finance1 drafts the close, captures payables, matches statements and assembles GST returns from the posted ledger. What it does not do is pay: releasing a payment is refused without a human approval, a money action without an idempotency key is blocked outright, and the drafter cannot approve their own entry.",
      },
      {
        title: "Meter the agents, per tenant and per app",
        description:
          "run1 computes run cost from the platform's own rate card rather than reconciling a provider bill — per tenant, per app, with cache reads and writes priced separately. A model with no rate-card entry is logged and counted as unpriced rather than silently valued at zero, so the gap in the number is visible in the number.",
      },
      {
        title: "Spend where a gate already exists",
        description:
          "strategy1 sequences the work so spend follows the functions you have actually enabled. The value model is assembled from your own operating assumptions and labelled illustrative, because nothing has been measured in your environment — the arithmetic is shown rather than asserted.",
      },
    ],
    composedOf: ["finance1", "run1", "strategy1"],
    outcomes: [
      "A duplicate vendor invoice refused at the write rather than discovered on the bank statement",
      "Agent run cost as a computed, per-tenant, per-app figure — with unpriced models counted as unpriced",
      "Statements that cannot disagree with the ledger, because they are computed from it at read time",
      "A cost line you can attribute to a run, a step and an approver rather than to a monthly total",
    ],
    seo: {
      title: "Cost & FinOps initiative | elan1",
      description:
        "Automate back-office work with the money gate intact, and meter what agents cost per tenant and per app from the platform's own rate card. Illustrative; not financial advice.",
    },
  },
  {
    slug: "compliance",
    name: "Compliance & governance",
    tag: "Initiative",
    accent: "#e0656d",
    headline: "Deploy with evidence — including the evidence you don't have yet.",
    challenge:
      "A regulated organisation cannot adopt AI on assurance alone. It needs to know which controls block a write and which only inform a person, because those two things survive an audit very differently — and a vendor who blurs them is the one whose claims come apart under questioning.",
    approach: [
      {
        title: "A gate in the write path, not in a policy document",
        description:
          "A consequential action routes to a named human, and an approval token is bound to both the action and a content hash of the exact payload, then consumed — so a token approved for one operation cannot be spent on another. An unregistered policy tag fails safe to a human rather than passing.",
      },
      {
        title: "A mark that can be refused and revoked",
        description:
          "A Trust Mark is refused on an eval run with zero cases, one that did not pass, or one from another tenant, and a re-verification sweep auto-revokes marks that have drifted. Read the depth honestly: the default agent certification is a structural declaration check, and a behaviour battery that probes what the model actually says currently covers a named handful of agents rather than the whole roster.",
      },
      {
        title: "An audit chain that refuses to be edited",
        description:
          "Events are hash-chained per tenant off a fixed genesis, and updates and deletes are blocked by a database trigger rather than by convention. Where damage cannot be repaired it is declared with a frozen digest instead of quietly rewritten, so a break inside the declared set reads as declared and anything else still fails hard.",
      },
    ],
    composedOf: ["assure1", "run1", "enterprise1"],
    outcomes: [
      "A per-rail answer to “does this block a write, or only inform a person” — published either way",
      "An approval bound to one action and one payload, spent on use",
      "An append-only audit you can verify and export, with declared breaks rather than silent repairs",
      "A certification that names its own coverage, including which agents have only a structural check",
    ],
    seo: {
      title: "Compliance & governance initiative | elan1",
      description:
        "Governance-first agentic deployment: payload-bound approvals, a hash-chained audit that blocks edits at the database, and Trust Marks that can be refused and revoked.",
    },
  },
  {
    slug: "legacy-modernization",
    name: "Legacy modernization",
    tag: "Initiative",
    accent: "#7c6cf0",
    headline: "Wrap the workflow. Leave the system where it is.",
    challenge:
      "The work you most want to change is trapped in systems you least want to touch. Rip-and-replace is slow and risky, and the usual alternative — a layer of scripts nobody governs — trades one kind of debt for a worse one. What is needed is a governed surface over what you already run.",
    approach: [
      {
        title: "Agents over your stack, not a re-platform",
        description:
          "agent1 builds agents and connector seams that sit alongside your existing systems. Be clear-eyed about the seams: the shared connector fabric ships as deterministic stand-ins with the real interface, and making one live means wiring a native adapter or pointing it at a real endpoint — a scoped piece of work, not a switch.",
      },
      {
        title: "Grant to the operation, not to the system",
        description:
          "A connector grant resolves against the operations a connector actually declares, and asking for one it does not expose raises rather than quietly widening the grant. That is what keeps a wrapper from becoming a second, ungoverned way into the same record.",
      },
      {
        title: "Prove it, then operate it",
        description:
          "assure1 certifies before it runs and revokes on drift; run1 carries the run trace, the metered cost and the suspend switch. Modernisation compounds one enabled function at a time, which is also the only way to roll one back.",
      },
    ],
    composedOf: ["agent1", "assure1", "run1"],
    outcomes: [
      "A governed surface over systems you did not have to replace",
      "Connector grants that fail when they are over-broad instead of widening",
      "Each modernised workflow enabled — and disabled — one function at a time",
      "An honest inventory of which seams are live and which are still stand-ins",
    ],
    seo: {
      title: "Legacy modernization initiative | elan1",
      description:
        "Modernise workflows on top of the systems you already run: governed agents, connector grants that resolve against declared operations, and staged enablement you can roll back.",
    },
  },
];
