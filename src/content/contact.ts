// content/contact.ts — the Company · contact page, and the Discovery Sprint on-ramp.
//
// 🚨 WHAT THIS PAGE MAY NOT SAY, EVER:
//   · a response time — "within one business day", "we reply in 24 hours", "same day". It is the
//     single most commonly broken commitment on any website, nobody here has measured ours, and the
//     previous version of this page shipped one in its success state.
//   · an office address, a phone number, or staffed hours. None are published anywhere on this site.
//   · a regional PRESENCE. The five regions come from REGIONS in content/site.ts and say which rules
//     a prospect operates under — not offices, not data centres, not "your local team". The old
//     success state read "routed to our {region} team", which invented five of them.
//   · a date on a certification. A Trust Mark is minted only from an eval run that passed and scored
//     real cases, and it may withhold. This page carried "we deploy a working, certified agent in
//     weeks" until it was corrected, and its hero and SEO description carried "in weeks" after that.
//     No variant of either comes back.
//   · a customer, a reference, a logo, or a measured outcome. There are none.
//
// WHAT THIS PAGE IS FOR. Telling someone what will actually happen next, in what order, and what to
// bring. That is deliverable, and it is checkable. Everything below is written against mechanisms
// that already exist in content/services.ts (strategy1 · agent1 · assure1 · run1) and limits already
// stated in content/engineering.ts, content/courses.ts and content/newsroom.ts. If one of those
// files changes its mind, this page is wrong and should be re-read against it.
//
// No platform count is hand-typed here. If one is ever needed it comes from content/platform-facts.ts.

import { BRAND } from "./site";
import { BANDS } from "./bands";

export const CONTACT_SEO = {
  title: "Contact — what happens after you send this | elan1",
  description:
    "The on-ramp to a Discovery Sprint: what happens next in order, what to bring to the first conversation, and what we will not have for you — no customer references, no measured outcomes, and no date on a certification that is eval-gated.",
};

export const CONTACT_HERO = {
  kicker: "Company · contact",
  title: "Start with one workflow.",
  lede: "This is the on-ramp to a Discovery Sprint, and the most useful version of it is a single workflow described end to end. What follows on this page is what happens after you send the form, in order, what to bring to the first conversation, and what we will not have for you when you ask.",
};

/** Three things worth knowing before the form, each about how the first conversation is run. */
export const HERO_POINTS: { title: string; body: string }[] = [
  {
    title: "One workflow, not a department",
    body: "Name the flow, what triggers it, and the step where money moves or a customer sees something. That step is the one that will stop at a named human.",
  },
  {
    title: "The product open, not a deck",
    body: "We would rather show you a consequential action waiting on an approval, and a function being refused because nobody enabled it, than describe either.",
  },
  {
    title: "The limits said out loud",
    body: "What we cannot give you is on this page rather than at the end of a procurement cycle. There is a list of it below.",
  },
];

export const HERO_CHIPS = [
  "Built on Claude",
  "Human approval on consequential actions",
  "Hash-chained audit",
  "DPDP-aligned",
];

// ——— What happens next ———

export interface ContactStep {
  n: string;
  title: string;
  /** Who does this one. Explicit, because half of the sequence is people and half is the platform. */
  who: string;
  body: string;
  link?: { label: string; href: string };
}

/**
 * The order, end to end. Steps 03–06 are strategy1 / agent1 / assure1 / run1 as content/services.ts
 * describes them — including the part a sales page would rather leave out: what leaves a Discovery
 * Sprint is a document set and a rollout order, and a first working agent is a separately scoped
 * build. The previous version of this page listed "a working proof of value" as a sprint deliverable
 * and "a costed opportunity map + a working proof" as step 01, both of which its own strategy1 page
 * contradicts in writing.
 */
export const WHAT_HAPPENS_NEXT: ContactStep[] = [
  {
    n: “01”,
    title: “You send the form”,
    who: “You”,
    body: “Recorded with your consent. No response time published here.”,
  },
  {
    n: “02”,
    title: “Conversation with the product open”,
    who: “elan1 people”,
    body: “Not a pitch. See refusals, audit chains, and governed writes in real time. Bring your workflow.”,
    link: { label: “Or run a governed agent yourself”, href: “/demo” },
  },
  {
    n: “03”,
    title: “Discovery Sprint”,
    who: “elan1 — strategy1”,
    body: “Scoped engagement: workshops, system review, roadmap. Fixed scope and fee before start.”,
    link: { label: “How strategy1 works”, href: “/platform/strategy1” },
  },
  {
    n: “04”,
    title: “What leaves the engagement”,
    who: “You hold it”,
    body: “Document set, roadmap, value model (illustrative, unvalidated), operating model, and open questions.”,
  },
  {
    n: “05”,
    title: “First agent — scoped separately”,
    who: “elan1 — agent1, gated by assure1”,
    body: “Separate build from the sprint. Eval-gated. Trust Mark mints before deploy.”,
    link: { label: “Trust Mark requirements”, href: “/platform/assure1” },
  },
  {
    n: “06”,
    title: “Operate and expand”,
    who: “You, or run1 with you”,
    body: “Audit and operations logs align. Cost from platform rate card. One function at a time.”,
    link: { label: "What run1 operates, and what it does not", href: "/platform/run1" },
  },
];

/** The commercial ladder, kept short because the pricing page owns it. */
export const ON_RAMP: { n: string; name: string; body: string }[] = [
  { n: "01", name: "Discovery Sprint", body: "Fixed scope, agreed before it starts. The strategy1 engagement." },
  { n: "02", name: "Launchpad", body: "One flagship workflow into production, under the gates above." },
  { n: "03", name: "Subscription", body: "Operate it, then sequence the next function." },
];

// ——— What to bring ———

export interface BringItem {
  title: string;
  body: string;
}

/**
 * Each item is here because a specific mechanism takes it as an input. If you cannot name the
 * mechanism an item feeds, it does not belong on this list — it is a discovery questionnaire in
 * disguise, and those are the reason people dread a first meeting.
 */
export const WHAT_TO_BRING: BringItem[] = [
  {
    title: “One workflow, end to end”,
    body: “From trigger to output. Name the approval point.”,
  },
  {
    title: “Who approves it today”,
    body: “By name. Defines your governance gate.”,
  },
  {
    title: “Which systems hold the records”,
    body: “Tells us which connectors and grants you need.”,
  },
  {
    title: “What your regulator asks you to show”,
    body: “Shapes your governance signature.”,
  },
  {
    title: “What you refuse to automate”,
    body: “The “never” list. A control plane state.”,
  },
];

// ——— What we will not have for you ———

/**
 * The honest list, at the door rather than at the end of procurement. Every line restates a limit the
 * site already states elsewhere — newsroom.ts (no customers, no outcome figures), engineering.ts (no
 * SOC 2 / ISO 27001), services.ts (eval-gated marks, modelled connectors), courses.ts (an
 * unaccredited credential, and no bench of certified people to hire from).
 */
export const NOT_ON_OFFER: string[] = [
  "Reference calls. No customers to name yet.",
  "Outcome numbers. Nothing measured in production.",
  "Certification dates. Eval-gated, may withhold.",
  "SOC 2 or ISO 27001. No third-party certs held.",
  "Response-time commitments. Too often broken.",
  "Day-one live connections. Connectors are modelled until credentials are in place.",
  "Certified practitioners. Academy credential is unaccredited.",
];

// ——— Things that answer part of it without us ———

export const ANSWERS_WITHOUT_US: { label: string; href: string; body: string }[] = [
  {
    label: "Run a governed agent",
    href: "/demo",
    body: "Live sequence: research → draft → approval → audit → mark. Illustrative.",
  },
  {
    label: "Engineering & readiness",
    href: "/platform/engineering",
    body: "Mechanisms with limits named. Includes unwired features.",
  },
  {
    label: "Trust & certification posture",
    href: "/trust",
    body: "Data handling, residency, and missing certifications.",
  },
  {
    label: "Pricing",
    href: "/pricing",
    body: "Sprint, Launchpad, subscription. What's metered.",
  },
];

// ——— Other doors ———

export const OTHER_DOORS: { label: string; href: string; body: string }[] = [
  {
    label: "Press and analysts",
    href: "/company/newsroom",
    body: "Press kit: boilerplate, naming, assets, attributable facts, limits.",
  },
  {
    label: "Partnering",
    href: "/partners",
    body: "Delivery, tech, and advisory partner routes.",
  },
  {
    label: "Working here",
    href: "/company/careers",
    body: "Open roles, and how we hire for them.",
  },
];

/** Both addresses come from BRAND in content/site.ts. Nothing else about reaching us is published. */
export const EMAIL_ROUTES: { address: string; body: string }[] = [
  { address: BRAND.email, body: "the general address." },
  { address: BRAND.sales, body: "quotes, procurement, contracting." },
];

// ——— The form ———

/**
 * DERIVED from content/bands.ts. The page used to hand-type "Startup ($1M–$10M) · Scale-up
 * ($10M–$100M) · Enterprise ($100M–$1B)", which had already drifted from the band names the rest of
 * the site uses (the first band is Growth, not Startup) and re-typed three currency ranges that live
 * in bands.ts with their "illustrative planning construct" caveat attached to them.
 */
export const SEGMENT_OPTIONS: string[] = BANDS.map((b) => `${b.name} (${b.range})`);

export interface ContactInterest {
  id: string;
  label: string;
  /**
   * What a request of this kind gets a reply about — never who, never when. "A person will reply
   * about X" is the house string; content/playbooks.ts uses the same one for the same reason.
   */
  routed: string;
  /** Something that answers part of it now, so nothing here waits on us. */
  meanwhile: { label: string; href: string };
}

export const CONTACT_INTERESTS: ContactInterest[] = [
  {
    id: "product",
    label: "A product in the 1 Suite",
    routed:
      "A person will reply about that app. Expect the first question back to be which workflow you would put on it, and who signs off the step where it commits something.",
    meanwhile: { label: "Browse the 1 Suite", href: "/products" },
  },
  {
    id: "industry",
    label: "An industry solution",
    routed:
      "A person will reply about that industry’s pack. The packs are configuration over one core rather than forked application code, so the useful part of the conversation is your regulator’s evidence request, not the shape of our software.",
    meanwhile: { label: "See the industry solutions", href: "/solutions" },
  },
  {
    id: "platform",
    label: "The platform and how it is governed",
    routed:
      "A person will reply about the platform. If you would rather read the mechanisms and the limits before you talk to anyone, the engineering page states both in the same place.",
    meanwhile: { label: "Engineering & readiness", href: "/platform/engineering" },
  },
  {
    id: "procurement",
    label: "Security, compliance or procurement",
    routed:
      "A person will reply, and the headline is on the record already: no SOC 2 and no ISO 27001 certification is held today, and residency is declared per tenant rather than enforced. Send the questionnaire — answering it against the control evidence is more use to you than a call about it.",
    meanwhile: { label: "Trust & certification posture", href: "/trust" },
  },
  {
    id: "academy",
    label: "Academy — training and certification",
    routed:
      "A person will reply about training. One thing to know first: the syllabi are authored rather than delivered, no cohort has run, and the credential is elan1’s own — it is not accredited by any external body, and it is a different object from the Trust Mark the platform issues to an agent.",
    meanwhile: { label: "The learning hub", href: "/resources/academy/learn" },
  },
  {
    id: "partner",
    label: "Partnering with elan1",
    routed:
      "A person will reply. The partner page is the more direct door, and it asks the questions we would ask anyway.",
    meanwhile: { label: "The partner programme", href: "/partners" },
  },
  {
    id: "press",
    label: "Press or an analyst enquiry",
    routed:
      "A person will reply. Tell us the angle and the deadline. The press kit is public already, and it names what we cannot give you — there are no customers to quote and no measured outcomes.",
    meanwhile: { label: "The press kit", href: "/company/newsroom" },
  },
  {
    id: "unsure",
    label: "Not sure yet",
    routed:
      "A person will reply. Bring one workflow anyway, even a rough one — it is what turns a general conversation into a specific one.",
    meanwhile: { label: "Run a governed agent first", href: "/demo" },
  },
];

export const interestById = (id: string): ContactInterest =>
  CONTACT_INTERESTS.find((i) => i.id === id) ?? CONTACT_INTERESTS[0];

export const FORM_COPY = {
  heading: "Tell us the workflow.",
  intro:
    "The last field is the one that matters. The rest is only so that a reply has somewhere to go.",
  labels: {
    name: "Full name",
    company: "Company",
    email: "Work email",
    segment: "Company size",
    interest: "This is about",
    region: "Where you operate",
    message: "The workflow, in your words",
  },
  messagePlaceholder:
    "What triggers it, what it changes, and who approves the step where it commits something…",
  /**
   * The region field is INFORMATION, not routing. The roster is REGIONS in content/site.ts; the note
   * is the honest posture from lib/region.ts and the Trust page — declared, single-region, not
   * enforced. It exists so a five-region dropdown cannot read as five offices.
   */
  regionNote:
    "Which rules your data lives under. It does not pick a data centre or an office: residency is declared per tenant, and the platform runs single-region today.",
  consent: "I agree to be contacted about this enquiry, and accept how the site handles data.",
  privacyFootnote:
    "These details are used to reply to this request and follow up on it. The site’s analytics are consent-gated, first-party and path-only — no cookies, no third-party scripts, and a pageview carries the path and nothing else.",
  submitLabel: "Send this",
  busyLabel: "Sending…",
  consentError: "Please agree to be contacted before sending.",
  genericError: "Something went wrong — please try again.",
  /** Sits under the button AND in the success state. It is the promise this page refuses to make. */
  noTiming:
    "No response time is published here, on purpose: we have not measured ours, and a number nobody has measured is a promise waiting to break.",
};

export const CONFIRMATION = {
  heading: (firstName: string) => `Logged${firstName ? `, ${firstName}` : ""}.`,
  another: "Send another",
  /**
   * 🚨 THE POINT OF THIS BRANCH. With no delivery address configured for a deployment, a lead is kept
   * in the browser and nobody receives it — while the old success state said "we'll be in touch
   * within one business day" over the top of that. An absence must never render as a tick. This
   * states what happened and gives a route that does not depend on the form working.
   */
  undeliveredHeading: "Nothing was sent.",
  undelivered: `This deployment has no delivery address wired to the form, so your details stayed in this browser and no one has received them. Please write to ${BRAND.email} instead — we would rather tell you that than show you a tick.`,
};

