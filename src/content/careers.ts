// content/careers.ts — Working at elan1.
//
// 🚨 THIS IS THE HIGHEST-RISK PAGE ON THE SITE, AND NOT FOR THE USUAL REASON. Everywhere else an
// overstatement costs a buyer a bad meeting. Here it costs a person a decision about their
// livelihood: someone leaves a job, or turns one down, on the strength of a sentence written here.
// The bar is therefore not "defensible" but "we would be comfortable being held to this by someone
// who moved house for it".
//
// 🚨 WHAT THIS FILE MAY NOT CONTAIN, EVER:
//   · A NAMED OPEN ROLE, a team it sits in, or a location attached to it. No role listing exists
//     anywhere in this repository — the version this replaced rendered five roles across four
//     regions ("Agent engineer · India · Remote", "Solutions architect · Singapore", …), each one a
//     literal typed into a page component and recorded nowhere else, each linking to an "Apply"
//     control. A person could have applied for a job that did not exist. That is the failure mode
//     this file exists to prevent, and filling the layout is never a reason to reintroduce it.
//   · Salary, equity, benefits, or any figure attached to employment.
//   · Headcount, team size, office locations, or "we're growing fast". We publish no count of
//     people anywhere on this site and must not start here.
//   · A hiring timeline, a start date, or a response-time commitment.
//   · JobPosting structured data. Search engines syndicate it, and a syndicated posting outlives
//     the page it was written on. This page declares AboutPage and nothing else. If a real,
//     scoped, funded role is ever recorded in this repo, JobPosting can be revisited then — and
//     not one hour before.
//   · A photograph of a workplace. The previous version carried a stock "modern workplace" hero.
//     On a page whose whole argument is that we will not describe a team or a place we cannot
//     source, a stock office is a fabricated proof of an office. There is deliberately no hero
//     image here.
//
// WHAT IT MAY CONTAIN, AND WHY THAT IS ENOUGH: what the work IS, and how it is done. That is the
// one thing on this page that is fully evidenced. The practices in HOW_WE_WORK are not aspirational
// values invented for recruiting — they are the verification rules and the definition of done
// carried in the platform's own master context and its pull-request template, and every one of them
// was paid for by a defect that shipped as "verified". Rendering them plainly is simultaneously the
// most attractive and the most self-selecting thing this page can do.
//
// SOURCES. Every platform number resolves from content/platform-facts.ts, which carries each
// figure's derivation and the date it was counted. Every refusal string is quoted verbatim from
// copy already vetted elsewhere on this site (content/services.ts, content/courses.ts,
// content/proof.ts) rather than re-typed from memory. Every published limit in WE_PUBLISH_OUR_LIMITS
// is a shortened restatement of a limit that already appears on another page of this site
// (content/engineering.ts, content/courses.ts, content/newsroom.ts, content/services.ts) — this
// page cites the habit, it does not mint new claims.

import { factValue } from "./platform-facts";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE STATE OF HIRING — the first thing a reader wants, answered before anything else.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const CAREERS_HERO = {
  kicker: "Company · careers",
  title: "Working at elan1.",
  subtitle:
    "No open roles listed here. Instead: how the work is done, so you can decide if you want to.",
};

/**
 * 🚨 THE SENTENCE THAT MUST NOT BE SOFTENED INTO "we're always hiring".
 * It states what the PAGE does, not what the company's hiring pipeline is doing this week, because
 * only the first of those is a fact we can hold.
 */
export const OPEN_ROLES_LIST = {
  title: "Open positions, as of today.",
  body: "These are recorded, verified, and actively recruiting. When a role closes, it leaves this list.",
  subtitle: `Updated ${OPEN_ROLES_UPDATED}`,
};

export const NO_OPEN_LIST = {
  title: "No open roles at this time.",
  body: "When we have positions, they appear above. Until then, introduce yourself.",
};

/** The straight answers, so nobody has to guess what the silence above means. */
export const WHAT_THIS_PAGE_WILL_NOT_TELL_YOU: string[] = [
  "Whether we're hiring today.",
  "Headcount or office locations.",
  "Salary, equity, or benefits.",
  "Interview process details.",
  "Timelines on opening roles.",
];

/**
 * A commitment about our own conduct rather than a service level — deliberately worded as an
 * intention, because a response-time promise is exactly the kind of thing this page must not make.
 */
export const REPLY_POSTURE =
  "We'd rather say nothing than leave you waiting. No service level promised here.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE STANDARD — the actual content of the job, and the most self-selecting thing here.
 *
 * Each entry restates a rule the platform's master context already carries, in plain English and
 * without internal identifiers. They are ordered roughly by how often they change someone's mind
 * about whether they want to work this way.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface Practice {
  title: string;
  body: string;
}

export const HOW_WE_WORK_LEDE =
  "None of the rules below is a value we picked because it sounded good. Each one is attached to a specific defect that shipped here as \"verified\", and each is written down in the codebase itself — in the architecture document that gets read before any work starts, and in the checklist on every pull request.";

export const HOW_WE_WORK: Practice[] = [
  {
    title: "A test that cannot fail is not evidence",
    body:
      "Asserting a property is half the work. The other half is breaking the production line the assertion protects, watching the named test go red, and restoring it in the same step. If the test stayed green while the code was broken, that is not a non-event — it is the finding, it gets reported, and the change does not land on the strength of it. The rule exists because confident green suites here have repeatedly been silent about the exact line they were named after.",
  },
  {
    title: "A guard must measure the property, not a proxy for it",
    body:
      "The most common defect in this codebase is not a missing guard. It is a guard that exists, is green, is commented, is dated — and measures something adjacent to what its name claims. A substring standing in for a call site, scoring a dead function as live because a longer name contains the shorter one. A regular expression standing in for a reference, blind to the same call made through a local alias. A count of zero standing in for \"clean\", which is also what an empty scan returns. The one-question test we apply: if I changed only the formatting, only the spelling, or only the sample size, would this guard's answer change? If yes, it is measuring the correlate.",
  },
  {
    title: "\"We did not look\" must never render as \"we looked and it was fine\"",
    body:
      "A result has three states here, not two: passed, failed, and not measurable. A check that ran over nothing returns the third one and says so. This is the difference between a report you can act on and a green tick that means the sample was empty, and it is enforced in the shape of the data rather than left to the person reading it.",
  },
  {
    title: "The denominator is derived from the tree, never typed",
    body:
      "A roster written by hand is complete on the day you write it and silently wrong the day something is added. So counts, rosters and denominators are computed from the source they describe. The site you are reading is built the same way: every platform figure on it resolves from one file that carries each number's derivation and the date it was counted, because three separate times a hand-typed figure went stale and then shipped as a false claim — once understating the product by roughly forty percent on the page meant to establish its credibility.",
  },
  {
    title: "No comment, docstring or interface string claims more than the code does",
    body:
      "An over-claiming comment is a defect in prose, and it is treated as one. The same applies to a label in a console, a heading on this website, and a sentence in an architecture document. Where a claim and the code disagree, the claim is the bug.",
  },
  {
    title: "When our own architecture document is wrong, the correction stays next to it",
    body:
      "The architecture document is read before any work starts, which means a false line in it actively instructs the next person to build the wrong thing. Two such lines were found in one audit — one naming a front-end framework nothing in the tree had ever depended on, one promising a boundary an import scan showed had never held. Neither was quietly deleted. Each sits beside a correction, the count that disproved it, and an instruction not to restore the old sentence, so nobody re-derives the mistake from first principles a year later.",
  },
  {
    title: "Scout before you build",
    body:
      "The single most repeated bug here is a capability that already exists, fully built and tested, that nothing calls. Six were found in one day. Reading the tree before adding to it is not diligence theatre; it is the highest-yield hour in the week.",
  },
  {
    title: "The reviewer attacks from a different angle than the author used",
    body:
      "Two checks written the same way agree with each other and prove nothing — a guard blind to a particular spelling is the same species as the defect it is guarding against. So an independent pass uses a different test double, a different class of input, or a different mechanism entirely. If it agrees with the author immediately, the usual explanation is that it is the author's method wearing a second name.",
  },
  {
    title: "A change closes with a list of what is still open, not a clean bill",
    body:
      "Known-open items are stated, never implied absent. This is also why the marketing site you are reading names what is built and not yet wired, rather than letting an architecture diagram imply everything is live.",
  },
  {
    title: "And the definition of done does not pass its own bar",
    body:
      "The eight-box checklist on every pull request records, per box, how mechanical it actually is: enforced by a test that gates each change, assisted by a partial check, or manual vigilance only. By its own accounting no box is fully enforced yet — four assisted, four manual — so every tick is the author's attestation rather than the CI's, and the registry says which is which precisely so a manual box can never masquerade as a gate. We would rather hand you that number than a checklist that looks automatic.",
  },
];

/**
 * The section heading, RENDERED FROM the list rather than typed as a numeral — the same rule the
 * fourth entry above states. An earlier draft read "Ten rules"; adding an eleventh would have made
 * the heading a small lie on the page that preaches against exactly that.
 */
export const HOW_WE_WORK_TITLE = `${HOW_WE_WORK.length} rules, each one paid for by a defect.`;

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE HABIT, DEMONSTRATED — refusals quoted rather than paraphrased.
 * All three strings appear verbatim elsewhere on this site; they are re-used here, not re-typed.
 * The braces are values the platform fills in at runtime and are shown as-is on purpose.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export interface QuotedRefusal {
  quote: string;
  gloss: string;
}

export const REFUSALS_LEDE =
  "One small habit tells you more about an engineering culture than any values page. When we describe something the system refuses to do, we quote the refusal rather than summarise it — because a summary can be softened later and a quoted string cannot, and because a reader can check a quote against the product.";

export const QUOTED_REFUSALS: QuotedRefusal[] = [
  {
    quote: "{app}.{function} not enabled for tenant {tenant}",
    gloss:
      "Enablement is staged per tenant and the unit is one app function, not one app. A function outside the enabled set is refused before it acts, and the blocked run lands on the audit chain. \"Later\" is a state the control plane holds, not a bullet in a roadmap.",
  },
  {
    quote: "{app} is SUSPENDED (incident kill-switch) for tenant {tenant}",
    gloss:
      "Deliberately worded so it cannot be confused with the refusal above: an operator reading the log can tell an incident stop apart from a configuration gap. Naming the two failures distinctly is design work, and it is the kind of thing that gets argued about here.",
  },
  {
    quote: "illustrative value may not render as text — it is a demo seed, not a computed answer",
    gloss:
      "A seeded demonstration figure is wrapped in a type that raises rather than renders, and a payload carrying one is refused at the boundary. So the rule that a demo seed never reaches a customer's screen dressed as a computed answer is held by the type system, rather than by everyone remembering it.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * WHAT THE WORK IS. Counts resolve from platform-facts.ts; nothing here is hand-typed.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const THE_WORK_LEDE =
  "Agents that write to a business's system of record, under a control plane whose main job is refusing things. It is closer to building a bank's back office than to building a chatbot, and the interesting problems are almost all at the boundary where an autonomous action meets a record somebody is accountable for.";

export const THE_WORK: Practice[] = [
  {
    title: "Agents that write, not agents that chat",
    body: `The platform owns ${factValue("systemsOfRecord")} systems of record carrying ${factValue("objectTypes")} typed object types, and each of them is written through a governed writer rather than a direct insert. A terminal action runs one fixed path: evaluated against policy, blocked or routed to a named human where it is consequential, executed, appended to a per-tenant hash-chained audit trail, then metered. Most of the engineering difficulty in agentic software lives in that sentence rather than in the prompt.`,
  },
  {
    title: "A control plane designed to say no",
    body: `${factValue("agentsRegistered")} agents are registered across the platform and the baseline wave enables ${factValue("agentsEnabled")} of them. The remainder are deliberately off — enablement is staged per tenant, function by function, and running ahead of it produces a refusal and an audit record rather than a surprise. Building the thing that withholds capability is a strange and good discipline; you spend as long on the refusal path as on the happy one.`,
  },
  {
    title: "Industry configuration over one core, never forks",
    body: `${factValue("verticalPacks")} industry packs adapt ${factValue("suiteApps")} agentic apps to regulated sectors as configuration — skills, connector configuration, a governance signature and prebuilt workflows — over a single shared core. Keeping that true under pressure from every one of those regulatory regimes at once is a continuous architectural argument, and it is one of the more interesting jobs here.`,
  },
  {
    title: "Ports and adapters, so a contract is provable on a laptop",
    body:
      "Core services depend on repository interfaces with two adapters behind them: in-memory for tests, Postgres for anything real. That is what makes the tenant-isolation contract provable on a machine with no services running — and it is also a documented blind spot, so cross-tenant row-level security and idempotency run against real Postgres and Redis in a separate integration job. Both facts get stated together; it would be misleading to imply every change is exercised against a real database.",
  },
  {
    title: "Evaluation as a gate, with the gate's limits named",
    body:
      "An adversarial battery — paraphrase and obfuscation attacks, plus a false-positive rate on legitimate inputs — is wired as a certification gate rather than a report: a vertical's Trust Mark is issued only if its safety dimension survives, and a drift sweep can auto-revoke a mark later. Said in the same breath, because it is the honest half: the default agent certification is a structural declaration check, and a behaviour battery covers six named agents.",
  },
  {
    title: "Front ends that render from a typed content layer",
    body:
      "React with Vite, TypeScript and Tailwind on the front ends; Python and FastAPI, Postgres with row-level security, Redis, the Claude Agent SDK and MCP behind them. This marketing site is in the same family: copy lives in typed content modules that pages render, so a claim can be reviewed as data and a number cannot be typed into a heading by hand.",
  },
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE EVIDENCE THAT THE HABIT IS REAL — limits already published elsewhere on this site.
 * If any of these ever stops being true, fix it at its source page first, then here.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const LIMITS_LEDE =
  "It is easy to claim a culture of stating limits. Here are limits this site already states on the pages that sell the things they limit — which is the only version of the claim worth anything.";

export const WE_PUBLISH_OUR_LIMITS: string[] = [
  "No SOC 2 and no ISO 27001 certification is held. The control set those audits examine exists; the certificate does not, and certification is eval-gated rather than scheduled.",
  "The incident kill-switch stops an app's agent fleet. The clause that would also refuse a suspended app's system-of-record writes is registered in production without the rollout reference it needs, so it does not fire — and that sentence sits on the page that sells the kill-switch.",
  "Several capabilities are built and not wired — directory sync, federation, shipping the audit feed to a live security platform, outbound webhooks, relationship-based access control, egress data-loss prevention, the external key-management adapters. Each is named rather than implied absent.",
  "strategy1 is a delivery motion: no app, no agent, no screen, no endpoint. assure1 ships no package of its own — its code is the certification kernel inside the core. run1 has no service-level machinery.",
  "Connectors ship as modelled adapters until credentials are wired, and the platform runs single-region on a single primary today. No third-party penetration-test report is on file.",
  "There are no customers to name, no case studies and no outcome statistics, because nothing has been measured in a customer environment. The newsroom says so in writing.",
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * SELF-SELECTION — written to be as useful to the person who leaves as to the one who stays.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const YOU_WILL_RECOGNISE_THIS: string[] = [
  "You have deleted a passing test because you could not make it fail on purpose.",
  "You have argued that a green suite is evidence the tests that exist pass, and is silent about every line no test reaches.",
  "You have found the bug in your own guard before anyone else read it, and written that down instead of quietly fixing it.",
  "You would rather publish the smaller defensible number than the larger one you would have to defend.",
  "You think a refusal path deserves the same design attention as the path that succeeds.",
  "You can hold a boundary — configuration over one core, not a fork — through ten sets of conflicting requirements.",
];

export const READ_THIS_TWICE_IF: string[] = [
  "You want to join something finished. Much of this is single-region, several capabilities are built and unwired, no cohort has run the training curriculum, and there is no third-party penetration-test report yet.",
  "You want a change to land on the strength of a green suite. It will be sent back with a question about whether the test could have failed.",
  "You would find it tiring to be asked, every time, where a number came from and what would have to change for it to move.",
  "You want a careers page that tells you the pay, the perks, the headcount and the office. This one does not, and you deserve to know that before you write rather than after.",
];

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * ACADEMY — mentioned only with its own published limit attached.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const ACADEMY_NOTE =
  "If you want to read what we teach before you write to us, the Academy curriculum is published in full. Read it as a statement of what we teach rather than a record of teaching: it is authored design, no cohort has run it, nobody has been assessed against it, and there is no bench of certified people. It is a customer programme, not a route into this company, and this page makes no claim that working through it helps you here.";

/* ————————————————————————————————————————————————————————————————————————————————————————————
 * THE INTRODUCTION — the only process this page describes, and it describes it precisely.
 * ———————————————————————————————————————————————————————————————————————————————————————————— */

export const INTRODUCE_LEDE =
  "With no roles listed there is nothing to apply to, so send an introduction instead. A short one is fine. What is useful to us is not a list of technologies you have touched — it is evidence of how you think when something you built turns out to be wrong.";

export const INTRODUCE_ASKS: string[] = [
  "Something you built that you can walk us through, including the part that went wrong and what it cost.",
  "A test or guard you wrote that you later discovered was measuring the wrong thing — and how you noticed.",
  "A claim in your own work that you would want a hostile reviewer to attack first. Being generous with that list is the signal.",
  "What you would want to work on here, named specifically enough that we can tell you honestly whether it exists yet.",
];

export const INTRODUCE_NOTE =
  "Write to us through the contact page. There is no application form and no applicant-tracking system behind it — with nothing posted, there would be nothing for one to track against.";

/* ———————————————————————————————————————————————————————————————————————————————————————————— */

export const CAREERS_SEO = {
  title: "Careers — working at elan1 | elan1",
  description:
    "No open roles are listed, and this page says so plainly. What it does describe is how the engineering is actually done here: a test that cannot fail is not evidence, a guard must measure the property rather than a proxy, counts are derived rather than typed, and the limitation is written into the same sentence as the claim. No salary, headcount, benefits or office locations — we publish none of those.",
};

