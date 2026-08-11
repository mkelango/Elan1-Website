// content/solutions.ts
// Industry solutions — compose products + platform pillars with industry skills & governance.
// Each lands via a fixed-scope 4–6 week Launchpad. Source: offering catalog + vertical playbooks (Vols. 14–23).

import { Solution, ACCENT } from "./types";

export const solutions: Solution[] = [
  {
    slug: "health1",
    layer: "solution",
    name: "health1",
    industry: "Healthcare & life sciences",
    tagline: "The scribe drafts. The clinician decides. The write path holds the line.",
    challenge:
      "A clinical system where PHI writes without active consent are refused, eligibility verdicts and quality rates are computed, and clinical notes are re-classified on every write.",
    composedOf: ["finance1", "insight1", "project1"],
    accent: ACCENT.green,
    useCases: [
      {
        title: "The consent gate, on create and on update",
        description: "Six object types are PHI — encounter, clinical_note, condition, allergy, observation, medication — and a write to any is refused without an active consent for the resolved patient: \"no active patient consent — a clinical record requires consent (DPDP/ABDM/HIPAA)\". A PATCH carrying no patient_id resolves the stored one, so withdrawal closes the record. The read side refuses first too — advisor, risk, care-gap, coding, summary — and the population worklist skips each unconsented patient and reports how many.",
      },
      {
        title: "A clinical decision cannot be laundered into the record",
        description: "Safety_status is recomputed from the note's effective summary on every write, so PATCH {\"safety_status\": \"safe\"} changes nothing, and amending an already-signed note into a diagnosis is refused on the same read. The classifier is intent-based and negation-aware — declining to diagnose is not diagnosing — and matches the verb prescrib* rather than the noun, so documenting a prescription a clinician issued is not blocked.",
      },
      {
        title: "Numbers computed from the record, not accepted from the payload",
        description: "Eligibility status derives from the patient's coverage; a claim is clean only with active coverage AND codes AND a positive amount; an observation's abnormal flag comes from its own recorded reference range; a medication conflict comes from the patient's active allergies including five cross-sensitivity families; a quality measure's numerator, denominator and rate are counted from care plans. Every derive fires on every write, so a supplied value does not survive.",
      },
      {
        title: "Refusals that stand between a draft and a commitment",
        description: "\"cannot submit a claim with no procedure/diagnosis codes\" · \"cannot submit a claim with a non-positive amount\" · \"cannot publish a quality measure over an empty cohort — no grounded denominator\". Thirteen transitions across nine object types are human-gated at K5, including both directions of consent — revoking closes the PHI gate and granting it opens one, so a person decides either way.",
      },
      {
        title: "The care spine, recomputed at the boundary",
        description: "A paid claim posts a finance1 AR invoice; an activated care plan opens a project1 care-delivery project; a published quality measure lands an insight1 insight. A governed endpoint recomputes two invariants over the LIVE sibling records — how many PHI or clinical field names crossed, and how many hand-off paths sit outside a K5 approval — and reports the records it scanned alongside the ones it could not read, so an empty or degraded scan cannot report as a clean one.",
      },
      {
        title: "Interoperability as a scoped, region-refused seam",
        description: "Three connectors, each residency-bound: a call from outside the in region is refused with \"cross-border PHI is not allowed\". FHIR R4 stamps US-Core and ABDM/NRCeS profiles, refuses a non-conformant push at the seam, and reports its own mode — a live R4 endpoint when one is configured, health1's own record otherwise. The ABDM HIE-CM connector decides nothing and writes nothing: it returns instructions the governed writer performs, validated, gated and audited. The route accepts only these three connector ids, and refuses a caller-supplied credential reference.",
      },
      {
        title: "health1.care_advisor — the pack's own agent, on its own record",
        description: "Advisory tier, self-verifying, approval-required, with policy tags derived from the health1 governance signature rather than hand-written. It reads a consent-gated record and lands its words as a DRAFT clinical note through the same governed writer a human uses — same derive, same refusal. When nothing matched: \"That is not a clearance — it is the limit of what is written down here.\"",
      },
      {
        title: "A Trust Mark that can be refused, and revoked",
        description: "Six eval sets and nine cases scored over live samples from the record: grounding, clinical safety, fairness, PHI minimisation, engine-never-acts-for-the-human (an exact-phrase floor plus a paraphrase classifier), and the two recomputed spine facts. Cases carry measured-by companions, so a tenant with no published metric is scored not-measurable rather than passing on an empty sample — and the receipt names every claim it did not attest. Re-running the battery revokes a valid mark that no longer passes.",
      },
    ],
    compliance:
      "Consent and residency are enforced in code, not declared: a clinical write without an active patient consent is refused, and every interop call from outside the India region is refused at the connector with \"cross-border PHI is not allowed\". PHI minimisation is a store-side refusal matched over normalised field names, so aadhaarNumber, card_no and cvv are refused alongside the spelling someone happened to type. The interop layer states its own mode: the FHIR gateway reads a live R4 endpoint when one is configured, while the ABDM HIE-CM consent manager and the X12 270/271, 837/835 and 278 flows are deterministic adapters over health1's own record — real fidelity, no external call. DISHA is a recorded, audited posture, not a gate. health1 is provider-side: it documents, codes, claims and measures; it does not adjudicate as a payer. None of this is a regulatory certification, and nothing here is medical, legal or financial advice.",
    outcomes: [
      "A note asserting a diagnosis, a prescription or a treatment decision has no path to signed — the refusal sits on the write path, so it holds for a human typist, for the pack's own advisor, and for a live model with a provider key.",
      "A PHI row for a patient with no active consent has no create path and no update path, and the read-side computes refuse before anything about that patient is read.",
      "Eligibility verdict, claim scrub status, observation abnormality, medication–allergy conflict and quality-measure rate are recomputed on every write; a payload that supplies one does not keep it.",
      "A quality measure over an empty cohort has no publish path, so the insight1 record it composes cannot carry a rate over a denominator of zero.",
      "Every hand-off is recomputed rather than asserted, and the receipt reports how many sibling records were scanned and how many could not be read — so \"clean\" and \"unexamined\" are different answers.",
    ],
    starterEngagement:
      "The health1 Launchpad: one flagship workflow (typically prior-authorization) live and under the governance gates, in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/volume product pricing plus an assure1 governance retainer. Illustrative; not medical, legal, or financial advice.",
    wedge: "A clinical note asserting a diagnosis, prescription or treatment decision cannot reach signed. Write path refusal: \"decision-support only — this note asserts a diagnosis or prescription, so it cannot be signed into the record. A clinician writes the clinical decision; the scribe drafts.\"",
    problem: [
      "Generated clinical notes can be signed as decisions without a write path to stop it.",
      "Consent gets checked once, not re-evaluated when records are created or amended.",
      "Eligibility verdicts and quality rates typed into fields cannot be distinguished from computed ones.",
      "Empty lab result reference ranges read as normal rather than unknown.",
      "Clinical detail drifts into billing and analytics with no boundary recompute.",
    ],
    composedOfNote: "health1 composes finance1, project1, insight1; adds its own 25-type clinical record, FHIR/ABDM/X12 connectors, and care_advisor agent.",
    ownRecords: [
      "Patient",
      "Practitioner",
      "Organization",
      "Encounter",
      "Condition",
      "Allergy",
      "Observation",
      "Medication",
      "Service request",
      "Coverage",
      "Consent",
      "Appointment",
    ],
    regulatoryRails: [
      { name: "Patient consent (DPDP / ABDM / HIPAA framing) — the PHI gate", status: "enforced", note: "Six object types are PHI by declaration — encounter, clinical_note, condition, allergy, observation, medication — and create AND update are both refused without an ACTIVE consent for the resolved patient; a partial PATCH carrying no patient_id resolves the stored one. ALSO enforced on the read side: the consent gate 403s before reading anything, the advise endpoint refuses first, the population copilot skips per-patient, and the FHIR seam resolves the SUBJECT BY SHAPE across all three read ops." },
      { name: "Data residency / India localisation (DPDP, ABDM)", status: "enforced", note: "Per call. The residency check raises ConnectorDenied on EVERY op of all three interop connectors when ctx.region != \"in\", called first in the FHIR seam:238, AbdmConsentConnector.call:315, X12Connector.call:378)." },
      { name: "FHIR R4 conformance (US-Core + ABDM/NRCeS profiles)", status: "enforced", note: "PARTLY ENFORCED, and honest about its own thinness. Meta.profile is stamped on every emitted Patient/Encounter/Coverage from a declared list; validate_fhir REFUSES a non-conformant push at the seam." },
      { name: "ABDM HIE-CM consent manager", status: "modelled", note: "Adapter over health1's own SoR — no live HIE-CM connection. What IS enforced is the purity: the connector decides nothing and WRITES nothing; request_consent and revoke_consent return instructions the caller must route through health1's governed writer." },
      { name: "X12 270/271 eligibility · 837/835 claim · 278 prior-auth", status: "modelled", note: "The adapter reads health1's own coverage/claim records; there is no clearinghouse connection. What is enforced is that the derived facts are COMPUTED, not accepted: eligibility status derives from the patient's coverage, claim scrub_status is 'clean' only if active coverage AND codes AND a positive amount (13342-13356), and a malformed claim cannot be SUBMITTED at all." },
      { name: "PHI minimisation (DPDP)", status: "enforced", note: "Store-side on every write. The classifier runs a seven-literal FLOOR (full_clinical_note, raw_lab_values, imaging_pixels, genomic_sequence, psychotherapy_notes, ssn_aadhaar_plaintext, payment_card) plus nine identity-qualified names as the CEILING, matched over a NORMALISED key — so aadhaarNumber, card_no, cvv, bank_account_number and passport_no are refused, not only the one spelling someone typed, 371-417)." },
      { name: "PHI at the cross-app seam", status: "modelled", note: "As a RECOMPUTED INVARIANT, not a write-path refusal. The clinical write path walks the three live hand-offs and runs phi_at_seam_violations over each linked sibling's fields ∪ custom;." },
      { name: "HEDIS measure registry", status: "declared", note: "Reference data — four specs (CBP, CDC-HbA1c, BCS, CIS). Referencing a hedis_id fills name + condition from the registry instead of free text; numerator/denominator/rate stay COMPUTED from the SoR's care plans on every write, and publishing over an empty cohort is REFUSED (13515-13527)." },
      { name: "DISHA", status: "declared", note: "ONLY. health1.dpdp_disha is a note(...) policy — it allows, records the reason and is audited; it gates nothing;." },
      { name: "Human sign-off (K5) on the consequential transitions", status: "enforced", note: "The clinical write path human-gates: ANY delete; encounter→finished; consent→revoked AND consent→active (both directions — opening the PHI gate is a person's decision); appointment→booked; claim→submitted; claim→paid; prior_authorization→submitted; prior_authorization→approved; clinical_note→signed; care_plan→active; quality_measure→published; service_request→active. The care-spine recompute calls this SAME function, so the console, the mark and the write path cannot disagree." },
    ],
    refusals: [
      "\"no active patient consent — a clinical record requires consent (DPDP/ABDM/HIPAA)\" — elan1",
      "\"decision-support only — this note asserts a diagnosis or prescription, so it cannot be signed into the record. A clinician writes the clinical decision; the scribe drafts.\" — elan1",
      "\"cannot publish a quality measure over an empty cohort — no grounded denominator\" — elan1",
      "\"cannot submit a claim with no procedure/diagnosis codes\" — elan1",
      "\"cannot submit a claim with a non-positive amount\" — elan1",
      "\"claim amount is not a number\" — elan1",
      "\"{connector_id}: residency — this endpoint serves 'in' only; a call from '{ctx.region}' is refused (cross-border PHI is not allowed)\" — elan1",
    ],
    evals: "Six sets, nine cases: grounding accuracy (2), safety (1), fairness (1), PHI safety (1), engine never acts for human (2), PHI seam clean (2). Can fail.",
    seo: {
      title: "health1 — consent-gated clinical decision-support | elan1",
      description:
        "A provider record where a note asserting a diagnosis cannot be signed, PHI writes need active consent, and quality rates are computed. Composes finance1, project1, insight1.",
    },
  },

  {
    slug: "bank1",
    focus: "secondary",
    byInquiry: true,
    layer: "solution",
    name: "bank1",
    industry: "Banking & capital markets",
    tagline: "Money leaves on a signature, not on a schedule.",
    challenge:
      "RBI/NPCI-aligned banking system where balances are recomputed from ledger, and writes are refused for sanctioned beneficiaries, over-balance transfers, unverified-KYC debits, and unclassifiable loans.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.clay,
    useCases: [
      {
        title: "Payment authorization, gated at the write",
        description: "A payment can only reach executed through the banking write path. Three refusals stand in front of it, verbatim: \"sanctions / AML: a human never moves money to a sanctioned / blocked beneficiary\", \"a payment may not exceed the account's grounded available balance\", and \"a payment can't execute from an account whose customer is not KYC-verified\". The balance in that second refusal is recomputed from the transaction ledger, never read from a stored field.",
      },
      {
        title: "Standing instructions that can only propose",
        description: "Running a NACH or UPI AutoPay mandate creates a payment hardcoded to status: \"draft\" through bank1's own governed writer, and returns \"a standing instruction DRAFTS a debit; a human authorizes it (K5) and the sanctions / balance / KYC gates run at execute\". The audit row records executed: False. The payments desk then shows those machine-drafted rows rather than filtering them out — hiding them from the human's queue would rebuild the same bypass on the read side.",
      },
      {
        title: "RBI IRACP asset classification, and a guard on its input",
        description: "SMA-0/1/2 → NPA → sub-standard / doubtful / loss with the provisioning requirement, derived from the recorded repayment schedule against today at a 90-day threshold. Days-past-due, outstanding and NPA are computed at read and never stored. Upstream, the write path refuses a loan disbursement with a zero tenor: \"it would generate an EMPTY repayment schedule, so its outstanding, DPD and NPA status would all be a structural zero — money out against an asset the RBI classification can never see.\" A disbursed loan with no schedule is reported ungrounded and excluded from both sides of the ratio, never counted as standard.",
      },
      {
        title: "Fair lending checked on the effective basis, not the payload",
        description: "\"fair lending: a credit decision may not rate by a prohibited factor\" runs on every credit-assessment and loan write, create and update, against the stored rating basis when the request does not carry one. That matters because a loan is approved and disbursed by status-only writes, and those are exactly the moments the basis the money rests on has to still be clean. The same live classifier scores the bank1.fair_lending eval set, so the refusal and the Trust Mark cannot disagree.",
      },
      {
        title: "Re-KYC compliance that says \"unknown\" out loud",
        description: "RBI periodic re-KYC by risk category (high 2y · medium 8y · low 10y), CKYC registration, and the escalation that matters: a KYC-expired customer still carrying active mandates or open loans. The grounding rule is explicit — \"An absent re-KYC date is 'unknown', never 'compliant'. Nothing here freezes an account — a compliance officer decides.\"",
      },
      {
        title: "AML surveillance with no act path",
        description: "Structuring below the PMLA reporting threshold, velocity bursts, dormant reactivation, CTR and STR candidacy. The bank1.aml_kyc policy is flag-not-act, and the surface is built to match: nothing is held, frozen or declined anywhere in it. The KYC/AML triage workflow names the step in its own definition — aml_screen_flag_not_act, followed by human_decides.",
      },
      {
        title: "One CASA arithmetic, shared by the metric and the boardroom",
        description: "Money-weighted CASA — current and savings balances over total deposits — computed by a single function that both the published metric derive and the ALCO liquidity surface call, so the two cannot hold different opinions about what CASA is. A ratio with a zero denominator returns None and is reported as not computable, never as 0.0. A metric with nothing underneath it cannot be published at all: \"cannot publish a banking metric with no underlying records (ungrounded)\".",
      },
      {
        title: "The bank spine, recomputed rather than asserted",
        description: "bank1 hands six consequential things to sibling apps and three immediate ones, each through the target app's own governed writer — a refused dispute case returns \"service1 did not open the dispute case\". A live endpoint recomputes two invariants over the sibling records themselves: no customer identifier or authentication secret crossed the seam, and every consequential hand-off is downstream of a human approval. Both gate the Trust Mark, and both carry an evidence check so an empty or partly unreadable scan is scored not-measurable rather than clean.",
      },
    ],
    compliance:
      "Four governance policies (model risk, verified data, AML/KYC flag-not-act, RBI alignment) and nine eval sets carrying eleven scored cases. Read the distinctions honestly: sanctions screening, fair lending, KYC-gated money movement and DPDP data minimisation are enforced on the write path and refuse the write. IRACP classification, re-KYC periodicity, AML surveillance and NPCI rail limits are computed decision-support that inform a human and act on nothing. The RBI alignment policy is an audited attestation, not a block — its teeth come from the refusals beside it. Data residency is declared, and the platform's own posture surface says so rather than claiming enforcement. What is genuinely load-bearing: four eval sets are scored by the same live classifiers the write path runs, two more are recomputed from the live cross-app boundary rather than asserted, and every case is required — a fact nobody computed did not pass, it did not run.",
    outcomes: [
      "A sanctioned, over-balance or unverified-KYC payment cannot be written to executed. The refusal strings live in the write path, not in a runbook or a training deck.",
      "A standing instruction produces a draft and an audit row that records it did not execute, so the automated route to a payment ends where a person begins.",
      "Days-past-due, outstanding and NPA are computed at read against today, so a loan's regulatory classification cannot be correct at write time and silently wrong the next morning.",
      "A PAN, Aadhaar, CVV, MPIN, OTP, card PIN or UPI handle is refused by shape on every write to the banking record — \"bank1 references identity, never copies it\" — and refused again, recomputed, at the boundary into finance1, sales1, service1, project1 and insight1.",
      "Certification runs nine eval sets over eleven cases, four of them scored by the same live guards the write path runs. Writing one autonomous-action claim into the live record turns the Trust Mark red — that is a test, not a promise.",
    ],
    starterEngagement:
      "The bank1 Launchpad: one flagship workflow (often KYC/AML triage) live and under the governance gates, in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat product pricing plus an assure1 model-risk retainer. Illustrative; not financial, investment, or compliance advice.",
    wedge: "Money leaves only on human signature. Standing instructions create draft payments hardcoded by the write path. Refusals: sanctioned beneficiary, amount exceeding ledger balance, unverified customer.",
    problem: [
      "Standing instructions that fire automatically bypass the authorization signature.",
      "Stored NPA status drifts from the ledger the next day with no recompute trigger.",
      "Expired KYC status reads as compliant while mandates continue moving money.",
      "Stored balance drifts from the ledger and payments approve against stale numbers.",
      "Customer identifiers leak into CRM and ledger records via hand-offs.",
    ],
    composedOfNote: "bank1 composes sales1, finance1, service1, project1, insight1; adds banking record: customer, KYC, account, transaction ledger, payment, loan, credit assessment, EMI schedule, term deposit, standing instruction, attestations.",
    ownRecords: [
      "Customer",
      "Account",
      "Transaction",
      "Payment",
      "Loan",
      "Credit assessment",
      "Repayment",
      "Deposit",
      "Mandate",
      "Sales metric",
      "Onboarding review · assessment review · payment review · dispute review · metric review",
    ],
    regulatoryRails: [
      { name: "Sanctions / AML screening (OFAC SDN · FATF · PMLA vocabulary)", status: "enforced", note: "On write. The classifier (10 markers + a SAFE intent regex) is run by the banking write path on payment create, on any payload carrying a beneficiary, and on execute, and on mandate create/update." },
      { name: "RBI fair lending / fair practices", status: "enforced", note: "On write, on the EFFECTIVE value. The classifier runs on credit_assessment and loan for both create and update, reading the stored rating_basis when the PATCH does not carry one — closing the payload-keyed hole where a status-only approve/disburse skipped the check." },
      { name: "KYC / re-KYC (RBI Master Direction on KYC, CKYC)", status: "enforced", note: "And the split matters. ENFORCED on write: a payment cannot execute, a deposit cannot be held, and a mandate cannot be activated on an account whose customer is not KYC-verified (customer_kyc_verified,, 14113-14117, 14132-14138)." },
      { name: "RBI IRACP asset classification (SMA-0/1/2 → NPA → sub-standard / doubtful / loss)", status: "computed", note: "With a write-path guard protecting its input. The classifier derives the band and the provisioning requirement from the recorded repayment schedule against today, with a declared threshold table = 90." },
      { name: "DPDP customer-data minimisation", status: "enforced", note: "On write by SHAPE, on every bank1 object type. The classifier is the first line of the banking write path and delegates to the shared matcher with three layers: bank1's literal floor the minimisation list pan_full, aadhaar_plaintext, account_number_full, cvv, card_number_full, ssn, the shared the minimisation list ceiling, and bank1's own the minimisation list (PAN · MPIN/OTP/passcode · card PIN · VPA/UPI handle · card expiry · magstripe track data." },
      { name: "The same minimisation, AT THE CROSS-APP SEAM", status: "computed", note: "RECOMPUTED, never asserted. The banking gate runs the classifier — the shape matcher, not a membership stub — over the LIVE finance1 / insight1 / sales1 / service1 / project1 records bank1 created, including the three immediate hand-offs, and returns customerDataFieldsCrossingSeam." },
      { name: "NPCI / RBI payment-rail limits", status: "modelled", note: "And only on the read surface. The payment-rail limit table is a declared table (RTGS min ₹2,00,000; UPI max ₹1,00,000; IMPS max ₹5,00,000; NEFT explicitly None/None) consumed by the maker-checker readiness checklist." },
      { name: "PMLA CTR / STR surveillance", status: "modelled", note: "And FLAG-ONLY BY CONSTRUCTION. A declared threshold table = ₹10,00,000; the classifier detects structuring below the threshold, velocity bursts, dormant reactivation and CTR/STR candidacy." },
      { name: "bank1.rbi (\"RBI alignment: lending/credit decisions are human-made and auditable\")", status: "declared", note: "It is a note() policy — it allows, records its reason into the audit, and has no block of its own governance. Its teeth come from the a blocking policy / human_decides siblings in the same signature, not from itself." },
      { name: "ISO 20022 / SWIFT / FATF and data residency", status: "declared", note: "The conformity engine carries the residency string \"RBI master directions · NPCI/UPI rails · KYC/CKYC · DPDP — India-resident; ISO 20022 / SWIFT / FATF aligned; cross-border refused\", but the platform states plainly elsewhere that \"residency is DECLARED, not enforced\". ISO 20022 is a reference-model alignment of the object shapes, not a live gateway." },
    ],
    refusals: [
      "Sanctions / AML: a human never moves money to a sanctioned / blocked beneficiary (refused: {marker})",
      "A payment may not exceed the account's grounded available balance",
      "A payment can't execute from an account whose customer is not KYC-verified",
      "Fair lending: a credit decision may not rate by a prohibited factor (refused: {marker})",
      "A loan cannot be disbursed for a principal of zero — there would be no money to repay and no schedule to repay it on",
      "A loan cannot be disbursed with a tenor of zero months: it would generate an EMPTY repayment schedule, so its outstanding, DPD and NPA status would all be a structural zero — money out against an asset the RBI classification can never see",
      "Sanctions / AML: a standing instruction may not name a sanctioned / blocked beneficiary (refused: {marker})",
    ],
    evals: "Nine sets, eleven cases: KYC accuracy (1), fairness (1), grounding (1), money authorization (1), sanctions/AML (1), fair lending (1), customer data safety (1), engine never acts (2), seam clean (2). Four scored by live classifiers.",
    seo: {
      title: "bank1 — governed banking system of record | elan1",
      description:
        "bank1 is elan1's RBI/NPCI-aligned banking record: sanctioned, over-balance and unverified-KYC payments are refused on the write path, and a standing instruction can only draft.",
    },
  },

  {
    slug: "insure1",
    focus: "secondary",
    byInquiry: true,
    layer: "solution",
    name: "insure1",
    industry: "Insurance",
    tagline: "A human signs every claim decision. The record decides what is payable.",
    challenge:
      "Payer record layer where approve, deny, pay are separate human decisions; coverage in force and remaining are computed at approval and refusals block when they don't hold.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.cyan,
    useCases: [
      {
        title: "Coverage-grounded adjudication",
        description: "A claim can only move to approved against a policy that is currently active. The refusal is literal: \"a claim can only be approved against an ACTIVE policy (coverage grounding — a lapsed / cancelled policy is not in force)\". Because defaulting a premium lapses the policy on the write path, that refusal is live rather than theoretical.",
      },
      {
        title: "The payout cap, computed not typed",
        description: "Remaining coverage is the sum insured less what prior approved and paid claims already consumed — recomputed at approval, never read back from a stored total. If nothing is left, the approval is refused: \"policy coverage is exhausted — prior claims have consumed the sum insured (nothing remains to pay against)\". If something is left but less than asked, the payout is clipped to min(asked, remaining), and that clipped figure is what posts to finance1 and what the next claim is measured against.",
      },
      {
        title: "Fair underwriting across the whole life of the policy",
        description: "The rating-basis classifier — eleven prohibited factors plus a pattern that catches paraphrases such as rating someone higher \"because she is a woman\" — runs on quote, underwriting, endorsement and renewal, and reads the STORED basis when the payload does not carry one, so a status-only patch cannot slip past it. Refusal: \"fair underwriting: a quote / underwriting may not rate by a prohibited factor\". The same classifier scores the Trust Mark, so the gate and the certificate cannot disagree about what the phrase means.",
      },
      {
        title: "Fraud flags, and the flag becomes an investigation",
        description: "A claim is written with its fraud signal derived and its status forced to submitted in the same step — the fraud path produces a flag, not a decision. Denying is a separate human transition with its own attestation record. On approval of a flagged claim, a project1 SIU investigation project opens (active, health red, risk level high) linked back to the claim: pay and verify, with the investigation living where project work lives.",
      },
      {
        title: "Policy administration as a chain of signed transitions",
        description: "Premium billed, collected, defaulted; endorsement applied; renewal renewed — each is a human decision, and each writes into finance1's ledger rather than a ledger of insure1's own. Collecting a premium reinstates a lapsed policy; defaulting one lapses it. Guarded in code: \"a premium cannot be billed against a cancelled / missing policy\", \"an endorsement can only be applied to an ACTIVE policy\", \"a cancelled / missing policy cannot be renewed\".",
      },
      {
        title: "Special-category health data stops at the record, and again at the seam",
        description: "Every insure1 write is screened by field name for medical history, diagnosis, prescription, genetic and HIV shapes, plus Aadhaar, PAN, card, CVV and full bank account — refused as \"field '…' looks like … and must not be stored here (PII minimisation / DPDP) — insure1 references identity, never copies it\". Separately, the insurance spine re-reads the live finance1, project1, insight1, sales1 and service1 records this vertical created and counts how many such fields actually crossed. Name and email are deliberately allowed on a distribution lead — that hand-off is lawful, and the invariant says so explicitly instead of going permanently red.",
      },
      {
        title: "Claims experience you can trace back to its denominator",
        description: "Loss ratio (incurred losses over earned premium) and settlement ratio (settled over all claims) are computed from the claims in the record at write time; a supplied number is overwritten. Publishing with nothing behind it is refused — \"cannot publish an insurance metric with no underlying claims (ungrounded)\" — and a published metric carries its numerator and denominator into the insight1 record. A zero denominator returns nothing rather than a flattering zero, and a claim whose policy record is missing is reported as unknown coverage, with the portfolio exposure flagged as understated.",
      },
      {
        title: "insure1.claims_advisor — reads the book, decides nothing",
        description: "The pack's own agent reads policies, claims, reserves and premiums and flags what an adjuster should look at, citing the record: a fraud-flagged claim, an exhausted policy, a claim against a lapsed policy, a premium in default, an under-reserved claim, and the reserving surface's two honesty verdicts. Its instruction is explicit — \"NEVER approve a claim, NEVER deny a claim, NEVER bind a policy, NEVER move money: a human decides and signs each of those\" — and its governance tags are derived from the insure1 signature rather than typed by hand, so it cannot declare a policy that does not exist or miss one that does.",
      },
    ],
    compliance:
      "insure1 carries its own eval-gated Trust Mark: eight eval sets holding ten cases, covering grounding, fair underwriting, claims adjudication, policyholder-data safety, suitability, fairness, the engine never acting for the human, and the health-data-at-the-seam invariant. Two of them run live classifiers rather than word lists — the same fair-underwriting classifier the write path runs, and the shared autonomous-action-claim classifier — and two are fed by numbers the insurance spine recomputes rather than asserts. The battery can fail, and that is itself tested: write a health field into a sibling record and the conformity response comes back failed. A mark whose evals later fail is drift and is revoked. Two anti-vacuity rules apply throughout: a tenant with no published metric is scored not-measurable rather than passed, and the seam counts as measured only when it scanned something and could read everything. IRDAI and NAIC/ACORD alignment is how the record layer is shaped and what the conformity receipt states; there is no live bureau or carrier gateway. Every read and write is confined to the calling tenant.",
    outcomes: [
      "Approving, denying or paying a claim produces a claim_review record naming the reviewer, the verdict, the amount and the note — the decision and its author are on the record, not in a mailbox.",
      "A payout above the sum insured, or against a policy that has lapsed, is not a mistake a user can make: the write is refused, and where partial coverage remains, the amount that reaches finance1 is the clipped figure rather than the asked one.",
      "A prohibited rating factor is refused at quote, at underwriting, at endorsement and at renewal, on the stored basis — so it cannot re-enter through a mid-term change or a status-only edit.",
      "Published settlement and loss ratios arrive in insight1 with the numerator and denominator they were computed from, and publishing without underlying claims is refused.",
      "Whether special-category health data crossed into a finance1, project1, insight1, sales1 or service1 record is recomputed from those apps' live records at every conformity run — and a scan that could not read everything reports itself as unmeasured rather than clean.",
    ],
    starterEngagement:
      "The insure1 Launchpad: claims triage & FNOL live and under the fairness gates, in 4–6 weeks, then operated on a run1 retainer.",
    pricingNote:
      "Fixed Launchpad fee, then per-claim/seat pricing plus a run1 retainer. Illustrative; not insurance, financial, or compliance advice.",
    wedge: "Coverage-grounded adjudication enforced at approval. Claim approval requires active policy AND remaining coverage > 0, both computed live. Payout capped to min(asked, remaining).",
    problem: [
      "Coverage in policy documents and payments in ledgers have no refusal between them.",
      "Fraud signals and denials can collapse into a single automated decision.",
      "Settlement ratios typed into reviews cannot be traced to source claims.",
      "Prohibited rating factors slip through mid-term endorsements and renewals.",
      "Diagnosis and prescription data leak into invoices, projects, and dashboards.",
    ],
    composedOfNote: "insure1 composes service1, finance1, sales1, insight1, project1; adds payer record: policyholder, product, quote, policy, claim, underwriting, premium, endorsement, renewal, attestations.",
    ownRecords: [
      "Policyholder",
      "Product",
      "Quote",
      "Policy",
      "Claim",
      "Underwriting",
      "Sales metric",
      "Premium invoice",
      "Endorsement",
      "Renewal",
      "Bind review",
      "Underwriting review",
    ],
    regulatoryRails: [
      { name: "Fair underwriting (IRDAI / DPDP — no unfair discrimination)", status: "enforced", note: "The insurance write path runs the classifier over the EFFECTIVE rating_basis for object types quote, underwriting, endorsement AND renewal on every create and update — reading the STORED basis when the payload does not carry one, so a status-only PATCH cannot skip the check. Refusal: \"fair underwriting: a quote / underwriting may not rate by a prohibited factor (refused: …)\"." },
      { name: "DPDP special-category / policyholder-data minimisation", status: "enforced", note: "AND recomputed at the cross-app seam. Every insure1 write starts with reasons = the classifier(fields) — an exact-match floor of six names (aadhaar_plaintext, full_medical_history, genetic_data, hiv_status, bank_account_full, ssn), the shared PII key-pattern ceiling, plus insure1's own health vocabulary (medical/diagnosis/prescription/report/file, genetic|dna, hiv|aids)." },
      { name: "IRDAI fair-claims handling & grievance redressal", status: "enforced", note: "The claims side is ENFORCED: approving, denying and paying a claim are all consequential (K5) in the insurance write path, and each adjudication writes a claim_review attestation with reviewer, verdict, amount and note. The grievance side is ENFORCED as a composition: a governed endpoint opens the case through service1's OWN governed writer and raises HTTP 400 \"service1 did not open the grievance case: …\" if service1's gate refuses — insure1 cannot bypass it; an IRDAI-escalated grievance sets priority urgent." },
      { name: "No autonomous money movement", status: "enforced", note: "A claim cannot reach paid unless claim_is_approved is already true — \"a claim cannot be paid unless it has been approved by a human first\". insure1 holds no ledger: bind premium, claim payout, premium bill, endorsement delta and renewal premium all post as finance1 invoices through the finance record, each downstream of a K5 transition." },
      { name: "Policy-contract / coverage-continuity rails", status: "enforced", note: "As four separate refusals: a premium cannot be billed against a cancelled or missing policy; an endorsement can only be applied to an ACTIVE policy; a cancelled or missing policy cannot be renewed; a quote cannot bind against an unapproved product. Defaulting a premium LAPSES the policy, which is what makes the coverage-grounding refusal bite; collecting it reinstates a lapsed policy." },
      { name: "ACORD / NAIC alignment", status: "modelled", note: "Not connected. The object model is documented as ACORD/IRDAI-aligned and the conformity receipt carries \"NAIC / ACORD aligned\", but there is no ACORD gateway, carrier feed or bureau connection in the tree." },
      { name: "Data residency (DPDP)", status: "declared", note: "For insure1 specifically. The conformity receipt carries residency_note \"IRDAI fair-claims & grievance redressal · DPDP — India-resident; NAIC / ACORD aligned; cross-border refused\" — a receipt string, not an insure1 write-path gate." },
    ],
    refusals: [
      "Fair underwriting: a quote / underwriting may not rate by a prohibited factor (refused: {bad[0]})",
      "A claim can only be approved against an ACTIVE policy (coverage grounding — a lapsed / cancelled policy is not in force)",
      "Policy coverage is exhausted — prior claims have consumed the sum insured (nothing remains to pay against)",
      "A claim cannot be paid unless it has been approved by a human first",
      "A quote cannot bind against an unapproved product",
      "A premium cannot be billed against a cancelled / missing policy",
      "An endorsement can only be applied to an ACTIVE policy",
    ],
    evals: "Eight sets, ten cases: policy grounding (1), fair underwriting (1), claims adjudication (1), data safety (1), suitability (1), fairness (1), engine never acts (2), seam clean (2).",
    seo: {
      title: "insure1 — the governed payer record layer for insurance | elan1",
      description:
        "insure1 adds the policy, claim, underwriting and reserving record layer under service1, finance1, sales1, insight1 and project1. Approval against a lapsed policy is refused, payouts are capped at computed remaining coverage, fraud flags open an investigation instead of a denial, and the Trust Mark is eval-gated.",
    },
  },

  {
    slug: "retail1",
    layer: "solution",
    name: "retail1",
    industry: "Retail & e-commerce",
    tagline: "The MRP ceiling holds at the write, not at review.",
    challenge:
      "Merchandising and integrity layer where sale price above Maximum Retail Price is refused from both directions and recomputed at storefront seam.",
    composedOf: ["commerce1", "insight1", "market1", "sales1", "service1", "supply1"],
    accent: ACCENT.gold,
    useCases: [
      {
        title: "The MRP cap, enforced from both directions",
        description: "A price_rule write resolves the effective record — stored fields union the payload — so activating a stale draft re-runs the cap even though the patch carries no price. The refusal reads pricing integrity: sale price 1200.00 exceeds MRP 999.00 (Legal Metrology). The other direction is guarded too: lowering a sku's MRP under live rules is refused and names them — MRP 499.00 is below 1 ACTIVE price rule(s) selling at 699.00 … Reprice those rules first. A battery of six evasions is asserted refused at the HTTP layer, including the price sent as a string and a hand-supplied pricing_status: \"clean\".",
      },
      {
        title: "One sku, one price, at any instant",
        description: "A markdown window carries start and end dates, and a second active window overlapping the first for the same sku is refused: one sku, one price, at any instant. End or re-window that rule first. Whether a price is in effect is COMPUTED on read against a date — ?on=YYYY-MM-DD asks the calendar about any day — and never stored, because a stored in effect is true until the clock moves past its end date and then silently false, with no write to trigger a re-derive.",
      },
      {
        title: "A derived flag nothing can supply",
        description: "Pricing_status on a price rule or an offer is recomputed on every write from the effective record by the same classifier the catalog audit and the cross-app seam run — an eleven-phrase literal floor plus intent patterns that catch a paraphrased dark pattern, including the bare-numeric scarcity claim (\"just 2 remaining\") that survives the shared text normaliser. Supplying the flag alongside a breach is refused; patching it to clean leaves it needs_review. An approver never reviews a green label a caller typed.",
      },
      {
        title: "An unresolvable ceiling is unverifiable, not compliant",
        description: "When a price rule points at a sku that does not exist, or the sku declares no MRP, the ceiling resolves to None with a named reason — absent_sku, malformed_mrp, no_mrp_declared — never 0.0. The row lands on the compliance worklist ordered FIRST as verdict: \"unverifiable\", and the confirmed-breach count carries mrp_breaches_understated: true. The alternative shipped once: a falsy-zero short-circuit reported a live 999,999 row as clean.",
      },
      {
        title: "Cycle counts, and the shrinkage between shelf and record",
        description: "A cycle count is a count AT a store. System_qty, variance and flagged are computed from the live inventory line on every write and cannot be supplied — let a caller assert the system figure and the count just agrees with itself. Adjusting is a human's K5, and the variance is recomputed from the line at APPLY time rather than trusting the delta stored when someone walked past the shelf. The attestation records refused when the adjustment could not be applied, not what was intended.",
      },
      {
        title: "Never oversell, as a stored invariant",
        description: "Available-to-promise is derived (on_hand − reserved), never supplied, and a write where reserved exceeds on_hand is refused: inventory truth: reserved 12 exceeds on_hand 8 (never oversell). A store holding customer reservations cannot be closed — customer reservations must be released or fulfilled before it can be closed — because those reservations are promises to real people, and closing the node they sit at strands them in silence.",
      },
      {
        title: "Replenishment through supply1's own gate",
        description: "A low line raises a purchase order through supply1's governed writer, to a supplier on supply1's approved-vendor list, and comes back gated: sent to supply1's approvals (K5) — raising a purchase order is a commitment to a supplier, and supply1 requires a human on every one. Nothing has been ordered. No back-link is written to a purchase order that may never be approved, and a closed store is not replenished at all.",
      },
      {
        title: "The seam is recomputed, not asserted",
        description: "The retail-spine reads the LIVE linked commerce1 products, market1 assets and insight1 records and re-runs the same pricing classifier over the price and copy that actually crossed, reporting mrpPricesCrossingSeam and ungatedHandoffPaths. It also reports how many records it read and how many it could not read, so a scan that saw nothing — or that was missing part of the picture — is scored not-measurable rather than clean. Zero findings from a check that ran nothing is not a pass.",
      },
    ],
    compliance:
      "retail1's governance signature carries five policies and a seven-set eval battery — recommendation accuracy, brand safety, pricing integrity, PII safety, consumer protection, engine-never-acts-for-the-human, and MRP-seam-clean. The battery is defined once in the governance catalog and read by both certification doors, so certifying from the pack and certifying from the API grade the same signature against the same nine cases; they once differed 2-versus-5, and the pack's door was the weaker one. It can fail: a draft carrying \"was inflated — fake discount, guaranteed lowest price\" returns passed: false, and no Trust Mark is minted. Two sets are gated on invariants recomputed from the live cross-app boundary, and each declares a companion evidence fact, so a tenant whose seam linked no sibling record — or whose scan could not read everything it should have — is scored NOT-MEASURABLE rather than passed. PII is refused by field name and shape, and the guard states its own limit: it cannot see an identifier pasted into a free-text note, and it is not meant to. Data residency on this platform is declared, not enforced, and the API reports it that way.",
    outcomes: [
      "A sale price above the sku's MRP is not persisted. The governed writer returns {\"blocked\": true} with the reason, appends a retail.*.refused event to the hash-chained audit log, and writes no record — the same path whether the write arrives from a person, an agent or another app.",
      "Pricing integrity, offer brand-safety, available-to-promise, cycle-count variance, and sell-through and markdown-depth are all COMPUTED by the platform on every write, so what an approver sees at the K5 gate is derived from the record rather than typed onto it.",
      "Five transitions are human decisions on the record: publishing a price, taking an offer live, authorizing a refund, publishing a metric, and adjusting stock to a physical count. Each writes an attestation naming the reviewer, the verdict, and what actually happened.",
      "A retail metric with a zero denominator cannot be published — cannot publish a retail metric with no underlying records (ungrounded — denominator is 0) — and grounding is checked live at publish time, not read from the value stored when the metric was drafted.",
      "Whether a markdown is in effect is answered against a date on read, so a rule whose window has closed is reported as lapsed for a human to expire rather than left true by a flag nothing came back to refresh.",
    ],
    starterEngagement:
      "The retail1 Launchpad: a fast flagship (listing factory or demand dashboard) live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/usage product pricing. Illustrative; not financial advice.",
    wedge: "MRP cap enforced from both directions on effective record. Status-only PATCH re-runs the check; lowering MRP below active rules is refused.",
    problem: [
      "MRP ceiling and sale price live on different records with no check between them.",
      "Markdown anchors can sit above MRP creating a dark pattern discount.",
      "Multiple active price rules for one SKU create pricing ambiguity.",
      "System stock and physical count gaps go unrecorded.",
      "Integrity checks stop applying at each hand-off without recomputation.",
    ],
    composedOfNote: "retail1 composes sales1, commerce1, supply1, market1, service1, insight1; adds merchandising record: SKU, price rule, inventory, store, offer, RMA, cycle count, attestations.",
    ownRecords: [
      "Sku",
      "Price rule",
      "Inventory",
      "Store",
      "Offer",
      "Rma",
      "Sales metric",
      "Cycle count",
      "Price review / offer review / return review / metric review / count review",
      "13 object types total",
    ],
    regulatoryRails: [
      { name: "Legal Metrology — the MRP ceiling", status: "enforced", note: "Both directions, on the effective record, with a 1e-6 tolerance rather than 'close enough'. A six-row evasion battery (direct breach · float hair-over · the price sent as a STRING · PATCH the price up through the ceiling · re-point the rule at a cheaper sku · supply pricing_status: clean to launder it) is asserted refused at the HTTP layer." },
      { name: "CPA 2019 / CCPA dark-pattern guidance — deceptive markdowns and unverifiable claims", status: "declared", note: "MIXED, and the distinction matters. On the SoR write path this FLAGS rather than refuses: an eleven-phrase literal floor plus four SAFE intent patterns (false scarcity, unverifiable superlative, fake discount, and a bare-numeric scarcity claim added because SAFE's normaliser strips 'just' as filler) derive pricing_status: needs_review, and publishing a flagged price still routes to a human at K5;." },
      { name: "DPDP — PII minimisation", status: "enforced", note: "By field NAME. retail1 declares its own the minimisation list vocabulary (aadhaar_plaintext, pan_plaintext, card_number, cvv, bank_account_full, ssn) as an exact floor, matched on the NORMALISED key so cardNumber, card-number and a declared list are the same name, over a shared pattern ceiling." },
      { name: "Consumer Protection Act 2019 — returns and refunds", status: "enforced", note: "An rma cannot move to refunded unless it is already approved; rma → refunded is a K5-consequential transition (:16141); and the refund is posted as a commerce1 payment of kind refund on the approval (:4825-4861) — retail1 holds no card and moves no money. Raising the return opens a service1 case through service1's OWN governed writer, not a direct repo write." },
      { name: "GS1 GTIN", status: "modelled", note: "And computed. The barcode check-digit test validates 8/12/13/14 digits with the mod-10 3-1-3-1 weighting; the docstring is explicit that this is STRUCTURAL — it proves the barcode is well-formed, never that the product behind it exists." },
      { name: "ONDC", status: "modelled", note: "Seller-side only, no live gateway. The classifier is a deterministic assessment over the RECORDED sku, price rule and inventory against six requirements; ready is true only when all six are met, and an unresolvable MRP makes the 'MRP-compliant price' requirement UNMET rather than silently met." },
      { name: "Data residency (India)", status: "declared", note: "Not enforced — and the platform publishes that as data. The residency check returns declared: true, enforced: false with an enforcementReason stating that ResidencyRouter.route()/replication() have no production caller outside tests." },
    ],
    refusals: [
      "Pricing integrity: sale price {sale:.2f} exceeds MRP {mrp:.2f} (Legal Metrology)",
      "Pricing integrity: MRP {new_mrp:.2f} is below {n} ACTIVE price rule(s) selling at {at} — lowering it would put a live price above MRP (Legal Metrology). Reprice those rules first.",
      "Pricing integrity: this window overlaps ACTIVE price rule {id} ({window}) for the same sku — one sku, one price, at any instant. End or re-window that rule first.",
      "A markdown window cannot end ({ends}) before it starts ({starts})",
      "Inventory truth: reserved {reserved} exceeds on_hand {on_hand} (never oversell)",
      "This store holds {held} reserved unit(s) — customer reservations must be released or fulfilled before it can be closed",
      "Cannot count stock at a CLOSED store",
    ],
    evals: "SEVEN eval sets / NINE cases, defined once in the governance catalog and read by BOTH certification doors — the pack's evals: list and the server's own eval-set list. That is the point: they once disagreed 2-vs-5, so ONE signature could issue TWO different Trust Marks, and the pack's door was the weaker one — silently skipping pricing integrity, PII safety and consumer protection.",
    seo: {
      title: "retail1 — MRP-safe merchandising and integrity for retail | elan1",
      description:
        "retail1 refuses a sale price above the sku's MRP at the governed write — from both directions — and rechecks it at the storefront seam. Composes six elan1 apps.",
    },
  },

  {
    slug: "telco1",
    focus: "secondary",
    layer: "solution",
    name: "telco1",
    industry: "Telecommunications",
    tagline: "A human acts on the network.",
    challenge:
      "telco1 holds the B2B carrier reference layer the suite apps do not — enterprise account, circuit, service order, SLA, incident, OSS resource pool, metered usage and SLA service credit — behind a write path that reads the effective action basis on every write, refuses a plan to actuate the network, and gates activation on a KYC-verified account.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.violet,
    useCases: [
      {
        title: "An auto-network-change is refused before a row exists",
        description: "On every create and update of a service order, circuit or incident, the write path runs telco1's network-safety classifier over the EFFECTIVE action basis — the payload's when present, otherwise the stored one — so a status-only PATCH, which is the actual network act, cannot skip the check by omitting the field. The refusal reads: \"humans act on the network: the agent plans and triages, but a human provisions, suspends and decides every flag.\" The classifier carries 12 literal markers plus intent patterns over normalised text, so \"automatically suspend the circuit\" and \"reroute it by itself\" are caught alongside \"auto-suspend\".",
      },
      {
        title: "Activation is gated on a KYC-verified account, from both sides",
        description: "\"a circuit may only be activated for a KYC-verified enterprise account (DoT CAF)\" fires on a direct activation, and \"a circuit may only be provisioned for a KYC-verified enterprise account (DoT CAF)\" fires on fulfilling a provision order. The check walks circuit → account and reads the recorded KYC status out of the system of record; the order's authorization_status is derived from it rather than typed.",
      },
      {
        title: "A signal is flagged, then a named human decides",
        description: "An incident is created flagged; moving it to confirmed or cleared is a human approval. On confirm, the human's decision suspends the affected circuit and opens a project1 investigation; on clear, nothing is acted. The triage worklist ranks critical-first and runs each proposed handling through the same classifier the write path uses, so a handling that would auto-suspend is surfaced as the loudest row rather than executed.",
      },
      {
        title: "Resource integrity is computed, not asserted",
        description: "A circuit is allocatable only when both endpoints are set and it is not already active or decommissioned — derived from the record on every write. A pool number, IP block or SIM moves to assigned only from available: \"a network resource can only be assigned from 'available' … a number / IP / SIM is never double-allocated (resource integrity).\" The pool analysis separately reports double-assignments and an assigned resource with no backing circuit as a signal for a human, never an auto-reclaim.",
      },
      {
        title: "Meter-to-cash where the money is derived and finance1 posts it",
        description: "A usage charge is computed as the metered quantity × the product's usage rate; a client-supplied amount is overwritten before storage. An SLA service credit is computed as the SLA's credit percentage × the product's monthly recurring charge, with availability derived from severity-weighted open incidents. Billing a usage record and issuing a credit are both human approvals that then post to finance1 — telco1 computes the charge and does not own the ledger, and the refusals say so: \"a usage record can only be billed against a real circuit (ungrounded)\", \"a service credit can only be issued against a real SLA (ungrounded).\"",
      },
      {
        title: "Network metrics that carry their own denominator",
        description: "A metric's numerator, denominator and rate are recomputed from live records on every write, and \"cannot publish a network metric with no underlying records (ungrounded)\" blocks the publish otherwise. The availability metric counts only SLAs carrying a real measurement verdict — an unmeasured SLA is excluded from both halves, reported as \"an SLA nobody has measured is UNKNOWN, not breached\", so a book of freshly signed SLAs cannot publish itself as fully breached. Publishing pushes the numbers, not a summary, into insight1.",
      },
      {
        title: "Subscriber data checked at the boundary, over live records",
        description: "telco1 hands four things to sibling apps — usage to a finance1 receivable, a service credit to a finance1 credit note, a confirmed incident to a project1 investigation, a published metric to an insight1 record. Each hand-off is rescanned against a field-shape denylist over the LIVE sibling record, so a hand-off later widened to copy an IMSI, a CDR, a cell id or intercept content shows up as a count. The scan reports how many records it read and how many it could not, so a partial scan cannot present itself as a clean one.",
      },
      {
        title: "A NOC analyst that cannot be given a control connector",
        description: "telco1's own agent is built in the agent1 studio as advisory, and the studio refuses to compile an advisory agent holding a control-system connector: \"advisory agent … may not hold control-system connectors — OT actions are taken by humans.\" It reads circuits, open incidents, unverified circuits, SLA breaches and unbilled usage off the record, returns a summary and flags, and writes nothing back. Enterprise care is delegated to service1's resolution agent rather than rebuilt, and that agent queues a reply for a human rather than sending it.",
      },
    ],
    compliance:
      "ENFORCED on the write path: an auto-network-change is refused on every create and update of a service order, circuit or incident, checked against the effective action basis rather than only the payload; a circuit is activated or provisioned only for a KYC-verified enterprise account (DoT CAF); a pool resource is assigned only from available; a metric with no underlying records cannot be published; and a protected field is refused by shape on every telco1 write — \"field '…' looks like a raw SIM / device identifier and must not be stored here (PII minimisation / DPDP) — telco1 references identity, never copies it\", with the same matcher covering call-detail records, a subscriber location trace and lawful-intercept content. That last guard sees the SHAPE of a field name; it does not read free text, and the code says so. DECLARED, not enforced: TRAI/DoT alignment is a note in the governance signature rather than a block, the DND flag is a typed field on the account with no guard reading it, and data residency is reported platform-wide as declared true / enforced false with the reason attached. MODELLED: the TRAI-complaint-style grievance opens a service1 case — urgent when escalated — and a project1 investigation through those apps' own governed writers, aborting if service1 declines; it is an internal governed path, not a filing to a regulator. The trust mark is minted only when a seven-set eval battery passes, two of those sets run the very classifier the write path runs, two more are recomputed from the live cross-app boundary rather than asserted, and the mark auto-revokes on drift.",
    outcomes: [
      "An order or incident whose action basis describes an auto-provision, an auto-suspend or a bypass of change control does not create a row — the refusal, its reason and its author are the record.",
      "Every network act carries a named human and an attestation written at the moment of approval: a provisioning review on fulfil, an incident review on confirm or clear, a metric review on publish.",
      "The charge on a usage record and the amount of an SLA credit are computed from the metered quantity and the contracted terms; an amount supplied by a caller is overwritten before it is stored.",
      "A published network metric ships with the numerator and denominator it was computed from, and an unmeasured SLA is excluded from both halves rather than counted as a breach.",
      "A circuit with no SLA on record is reported as \"UNKNOWN, not met\" and sorted to the top of the worklist, and any total that omits an unknown is published as a lower bound with a flag saying so.",
    ],
    starterEngagement:
      "The telco1 Launchpad: customer-lifecycle / service automation live in 4–6 weeks, then operated at scale on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-seat/usage pricing plus a run1 retainer. Illustrative; not financial advice.",
    wedge: "AN AUTO-NETWORK-CHANGE IS REFUSED BEFORE A ROW EXISTS — and it is checked against the EFFECTIVE action basis, not the payload. On every create and update of a service_order, circuit or incident, the telecom write path reads action_basis from the payload when present and otherwise from the STORED record, then runs the classifier over it. That closes the payload-keyed hole: a status-only PATCH — which IS the network act — cannot skip the check by simply omitting the field.",
    problem: [
      "The order, the circuit, the SLA and the incident that breached it usually live in four systems, so the availability number a carrier quotes and the records that would justify it are never the same object.",
      "The dangerous automation in a carrier is not a wrong answer, it is a confident action: an agent that suspends an enterprise leased line on a false-positive DDoS signal takes the customer's connectivity down with it.",
      "An SLA nobody has measured reads as an SLA that was met, and a circuit with no SLA on record reads as a circuit inside its service level — the absence of a measurement gets published as a result.",
      "Subscriber identity and behaviour — IMSI, IMEI, ICCID, call-detail records, a location trace, intercept content — travel sideways the moment a telecom record is handed to a finance or analytics system.",
      "Activation runs ahead of verification: a circuit goes live for an enterprise account whose CAF status nobody checked, and a number or IP block gets allocated twice.",
    ],
    composedOfNote: "telco1 composes five suite apps unchanged — service1 for the enterprise care queue, finance1 for the ledger, sales1 for the pipeline, project1 for investigations, insight1 for analytics — and forks none of them; on top it adds the carrier reference layer none of them holds (account, product, circuit, service order, SLA, incident, OSS resource, usage, service credit and their attestations) plus the write-path guards that gate every act on it.",
    ownRecords: [
      "Account",
      "Product",
      "Circuit",
      "Service order",
      "Sla",
      "Incident",
      "Sales metric",
      "Resource",
      "Usage",
      "Service credit",
      "Intake review",
      "Provisioning review",
    ],
    regulatoryRails: [
      { name: "DoT CAF / eKYC — KYC-gated activation", status: "enforced", note: "From both sides. A circuit PATCHed straight to active and a service_order moved to fulfilled on a provision both call account_kyc_verified, which walks circuit → account and requires kyc_status == \"verified\" read from the SoR;." },
      { name: "Humans act on the network / flag-not-act (TRAI-DoT operational safety)", status: "enforced", note: "By the classifier described in the wedge, and separately by the K5 gate: fulfilling an order, activating/suspending/decommissioning a circuit, confirming/clearing an incident, publishing a metric, billing a usage record, issuing a credit and any delete are all consequential and queue for a human. The governance signature's telco1.humans_act_on_network is a blocking policy(\"auto_network_change\") and telco1.fraud_simswap_flag is flag_not_act(..., flag=\"auto_act\")." },
      { name: "DPDP — customer-data minimisation", status: "enforced", note: "By SHAPE on every telco1 create and update: the telecom write path opens with the classifier(f) unconditionally, before any object-type branch. It is a name-pattern matcher, not an exact-name list: telco1's own five literals are the floor, the shared minimisation list the ceiling, and a carrier pattern set adds the carrier vocabulary — imsi/imei/iccid, cdr/call-detail records, cell id / location trace, lawful-intercept content." },
      { name: "Lawful-intercept boundary", status: "enforced", note: "Twice — once in the store guard above, and again at the CROSS-APP SEAM. Subscriber_data_at_seam_violations runs the same matcher over the LIVE sibling records (finance1 invoice, project1 project, insight1 insight) that telco1's four hand-offs actually linked, so a hand-off later widened to copy an IMSI, a CDR, a cell id or intercept content across is observable rather than asserted away;." },
      { name: "Resource integrity (numbers / IP blocks / SIMs, and the circuit itself)", status: "enforced", note: "A circuit is allocatable only when both endpoints are set and it is not already active or decommissioned — COMPUTED from the SoR, never asserted, and refused at activate and at provision-fulfil. A pool resource may move to assigned only from available." },
      { name: "Grounded network metrics", status: "enforced", note: "Numerator/denominator/rate/grounded are overwritten by a derive that counts live SoR rows, so a client-supplied ratio never survives, and publishing with a zero denominator is refused. The availability metric counts only SLAs carrying a real boolean verdict — an unmeasured SLA is excluded from BOTH halves rather than published as a breach, mirrored at." },
      { name: "TRAI / DoT alignment (telco1.trai_dot)", status: "declared", note: "Not enforced. The policy is note(\"TRAI/DoT alignment; subscriber consent respected\") — a note, not a block." },
      { name: "TRAI-UCC / DND", status: "modelled", note: "Only. Dnd_registered is a typed boolean on the Account shape carrying the comment that commercial contact to a DND account is refused, but no guard reads it — a repo-wide grep finds no write-path or send-path consumer." },
      { name: "TRAI-complaint-style grievance", status: "modelled", note: "As an internal governed path, not a regulator filing. A governed endpoint opens a service1 CASE (priority urgent when escalated) and, when escalated, a project1 investigation — both through those apps' OWN governed writers via a record write/a record call, so the target's gate holds." },
      { name: "Data residency", status: "declared", note: "Not enforced — and the platform publishes that distinction as data. The conformity receipt carries a residency note naming TRAI · DoT · DoT CAF/eKYC · TRAI-UCC/DND · DPDP · lawful-intercept boundary, while the residency surface returns declared: true, enforced: false with an enforcementReason stating the router has no production caller." },
    ],
    refusals: [
      "Humans act on the network: the agent plans and triages, but a human provisions, suspends and decides every flag (refused: {marker})",
      "A circuit may only be activated for a KYC-verified enterprise account (DoT CAF)",
      "A circuit may only be activated when it is allocatable (endpoints set, not already active / decommissioned — resource integrity, never double-provisioned)",
      "A circuit may only be provisioned for a KYC-verified enterprise account (DoT CAF)",
      "A circuit may only be provisioned when it is allocatable (endpoints set, not already active — resource integrity)",
      "A network resource can only be assigned from 'available' (it is '{current}') — a number / IP / SIM is never double-allocated (resource integrity)",
      "Cannot publish a network metric with no underlying records (ungrounded)",
    ],
    evals: "SEVEN eval sets / NINE cases, and pack.yaml and the server now declare the identical seven;. (1) telco1.grounding — a field check(\"grounded\") with measured by=\"the grounding measure\", so a tenant with no published metric scores NOT-MEASURABLE rather than passing over an empty sample.",
    seo: {
      title: "telco1 — the agent plans the network, a human acts | elan1",
      description:
        "telco1 governs B2B connectivity operations: an auto-network-change is refused on the write path and activation is KYC-gated (DoT CAF). Composes service1, finance1, sales1, project1, insight1.",
    },
  },

  {
    slug: "gov1",
    focus: "secondary",
    byInquiry: true,
    layer: "solution",
    name: "gov1",
    industry: "Public sector",
    tagline: "An official decides every entitlement. The write path refuses the ones that would slip past.",
    challenge:
      "gov1 is a configuration pack over built apps, not a fork of them. It adds the public service-delivery record no horizontal app owns — citizen, scheme, application, benefit, appropriation, RTI request, re-verification — and puts refusals in front of the write, so an approval that exceeds a sanction, rests on a prohibited ground, or names an unverified citizen cannot be recorded at all.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.rose,
    useCases: [
      {
        title: "Appropriation control that refuses instead of capping",
        description: "Approving an application whose benefit exceeds the scheme's remaining sanctioned appropriation is refused at the write, in these words: \"a statutory entitlement is never part-paid to fit a budget; escalate for a revised sanction\". No reduced amount appears anywhere in the output. Sanctioned, committed and remaining are computed from the disbursed benefit records — a stored 'remaining' drifts the moment a benefit is paid.",
      },
      {
        title: "The decision basis is classified by the write that decides",
        description: "A live classifier — eight literal markers plus three paraphrase-resistant intent patterns for corrupt, political and discriminatory grounds — runs over the effective decision basis on every create and update of an application or an eligibility assessment, including the status-only change that approves or rejects. The refusal reads: \"equity: a citizen's entitlement may not be decided on a prohibited / arbitrary basis\". The same classifier scores the certification eval, so the mark and the refusal cannot hold two definitions of what is prohibited.",
      },
      {
        title: "Computed, not typed",
        description: "An application's eligibility is derived from the citizen's income band against the scheme's rule rather than supplied; approval is refused for a citizen who is not verified (\"an application may only be approved for a verified citizen\"); and a scheme's coverage and approval rates are computed by the same function the publish gate reads, so the desk and the published number cannot disagree. Publishing a metric with nothing behind it is refused: \"cannot publish a scheme metric with no underlying records (ungrounded)\".",
      },
      {
        title: "An entitlement desk that shows where the sanction runs out",
        description: "Per-application readiness composed with the scheme's appropriation position into one first-come funding queue — the compound neither check sees alone, because ten applications can each clear the full remainder individually while together exhausting it twice. The queue is walked in application order, never largest-first, because the order of a statutory queue decides who is refused. A prohibited-basis finding sorts above the funding arithmetic. Every row carries decision: None, and the only two verdicts the surface can emit are \"not yet approvable\" and \"no blocker found — an accountable official decides (K5)\".",
      },
      {
        title: "An RTI register whose clock is computed, not stored",
        description: "The statutory due date is derived on filing; days remaining, overdue and at-risk are computed against today at read. Rejecting a request without citing a statutory exemption ground is refused: \"information may be refused, but never silently\". The transparency desk carries exemption_ground verbatim and never proposes one — writing the justification for withholding public information is an act the Act reserves for a named officer who signs it. An empty register reports not-measurable, never a clean bill.",
      },
      {
        title: "Beneficiary integrity that flags and stops nothing",
        description: "Lapsed re-verifications, live benefits held by a citizen who is no longer verified, and duplicate suspects (the same name in the same district on more than one live benefit) are surfaced as findings. Nothing here ends an entitlement or halts a payment: ending one is exactly as consequential as granting one, so it stays a person's signed decision. The advisor says it out loud — \"a re-verification has lapsed. Look at it; nothing has been stopped.\" A duplicate suspect stays a suspect, because two people can share a name.",
      },
      {
        title: "A seam narrower than the store",
        description: "Caste category, religion, community, income band, disability status and the DBT account handles are lawfully stored in gov1 — they are the eligibility basis a scheme rests on — and denied crossing into a finance1, insight1, service1, sales1 or project1 record, matched on the normalised field name plus pattern rather than on one spelling. The invariant is recomputed over the live linked records rather than asserted: copying a caste category into the finance1 invoice gov1 itself created turns the seam eval red and the certification run with it.",
      },
      {
        title: "An advisor that names what it will not do",
        description: "gov1's own entitlement advisor reads the record and flags an unverified citizen, an exhausted appropriation, an overdue RTI request, a lapsed re-verification, a duplicate suspect — then closes: \"granting an entitlement, denying one, disbursing a benefit and cancelling one are four different people's signatures, and none of them is mine.\" On a clean run it refuses to overclaim: \"That is the limit of what is written down, not an assurance that the scheme is being delivered fairly.\" Running it writes nothing.",
      },
    ],
    compliance:
      "What is enforced in code, and what is not, stated plainly. ENFORCED on the write path: appropriation refuse-not-cap; prohibited-basis classification of the effective decision basis; the verified-citizen and grounded-eligibility preconditions on approval; the RTI rejection that cites no statutory ground; the ungrounded-metric publish gate; and DPDP citizen-data minimisation refused by field shape, with a floor naming five attributes exactly and a pattern ceiling for biometrics, caste and community certificate scans, and civic identity numbers. HUMAN-GATED: approving or rejecting an application, disbursing a benefit, sanctioning or revising an appropriation, responding to or rejecting an RTI request, marking a re-verification lapsed, publishing a metric, and any delete. RECOMPUTED RATHER THAN ASSERTED: the cross-app seam, rescanned over the live sibling records, which fails certification rather than blocking the sibling's write. CERTIFIED: seven eval sets, nine scored cases, run over the live record; the Trust Mark mints only on a pass and a valid mark is revoked when the battery later fails. DECLARED, not enforced by this pack: sovereignty, which blocks on an explicit offshore-transfer flag, and the residency line on the conformity receipt. MODELLED, with no live external connection: the DBT money leg (a finance1 invoice), CPGRAMS grievance redress (a service1 case), and the statutory windows, which are constants in code — 30 days for the RTI response, 30 for the first appeal. DigiLocker is not implemented. By construction there is no protected-group breakdown and there will not be one: a citizen record holds no protected attribute, so such a metric would be both a structural zero and a breach of the equity guarantee gov1 certifies. Equity is enforced by classifying the decision basis, never by profiling a cohort. Nothing on this page has been measured in a customer environment.",
    outcomes: [
      "An approval that would exceed the remaining sanction cannot be written — the shortfall becomes an escalation for a revised sanction on the record, rather than a quiet reduction absorbed by the beneficiary.",
      "The ground a decision rests on is classified by the same write that approves or rejects, so an approval and its basis check cannot be separated in time or skipped by a status-only edit.",
      "Coverage and approval rates are computed from the application records rather than typed, and a metric with nothing behind it cannot be published at all.",
      "Days remaining on an RTI request are computed against today every time the register is read, so no stored 'days left' can go stale between writes.",
      "A protected eligibility attribute or a DBT account handle copied into a linked finance1, insight1 or service1 record turns the seam invariant red and fails the certification run — caught by rescanning the live sibling records, not by trusting the hand-off.",
    ],
    starterEngagement:
      "The gov1 Launchpad: a flagship (records/FOIA or citizen Q&A) live and under the residency and disclosure gates, in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee aligned to public-sector procurement, then a government contract plus an assure1 governance retainer. Illustrative; not legal or compliance advice.",
    wedge: "Appropriation control that REFUSES rather than caps, applied to the entitlement DECISION. Approving an application whose benefit exceeds the scheme's remaining sanctioned appropriation is refused outright at the write — no reduced amount is ever proposed, because capping a citizen's statutory entitlement to fit a budget line silently under-pays someone the law says is owed in full; the lawful answer is refuse + escalate for a revised sanction. The codebase explicitly checked this is not a duplicate of finance1's budget gate: finance1 refuses a JOURNAL ENTRY keyed account_code x period against posted actuals, after the ledger leg exists; gov1 refuses the ENTITLEMENT DECISION keyed scheme x fiscal_year against disbursed benefits in its own SoR, before any ledger leg exists, and finance1's gate cannot express refuse-not-cap.",
    problem: [
      "When a benefit exceeds the sanctioned budget, the tempting fix is to reduce it to fit. The shortfall then lands on the beneficiary instead of on a revised sanction, and nothing in the record says it happened.",
      "The ground a decision rests on lives in free text that nothing classifies at the moment of the decision, so a corrupt, political or discriminatory basis surfaces — if at all — in an audit months later.",
      "An RTI deadline stored as 'days left' is right the morning it is written and wrong the next, with no write to trigger a recompute. That is how a statutory clock runs out while the record still looks compliant.",
      "A disbursed benefit runs on a verification done once, years ago, and nobody owns the question of whether it still holds.",
      "Attributes a welfare office lawfully decides on — caste category, income band, disability status — get copied into a general-purpose ledger or analytics store, where they stop being an eligibility basis and become a disparate-impact input for people whose work has nothing to do with the scheme.",
    ],
    composedOfNote: "gov1 composes five built apps unchanged and forks none of them: service1 (the citizen case queue — a grievance opens a real service1 case through service1's own governed writer, and gov1 owns no resolution engine, no CSAT, no first-response time), finance1 (the disbursement leg posts as an AP invoice), sales1 (a scheme inquiry opens a CRM lead), project1 (an escalated grievance opens an investigation) and insight1 (a published scheme metric lands as a grounded insight). What gov1 adds on top is the public entitlement record none of them owns — citizen, scheme, application, benefit, appropriation, RTI request, re-verification, plus the five attestations behind them — and the write-path refusals that make an official's signature the only way an entitlement moves.",
    ownRecords: [
      "Citizen",
      "Scheme",
      "Application",
      "Benefit",
      "Appropriation",
      "Rti request",
      "Reverification",
      "Eligibility assessment",
      "Grievance",
      "Sales metric",
      "Five attestation types",
    ],
    regulatoryRails: [
      { name: "Appropriation / sanctioned-budget control", status: "enforced", note: "The public-sector write path refuses an approval beyond the remaining sanction; appropriation_remaining computes sanctioned minus disbursed benefits live and returns the -1 a declared list sentinel, distinct from 0, so a pre-appropriation scheme is not read as exhausted." },
      { name: "Equity / non-discrimination in an entitlement decision", status: "enforced", note: "The classifier 8 literal markers + 3 SAFE intent patterns: corrupt, political, discriminatory runs over the EFFECTIVE decision_basis on every create and update of an application or eligibility_assessment, including a status-only PATCH that approves or rejects. The same live classifier — not a word list — also scores the gov1.equity_no_disparate_impact eval set, so the Trust Mark and the refusal cannot disagree about what is prohibited." },
      { name: "DPDP citizen-data minimisation", status: "enforced", note: "By SHAPE, not by value: the classifier refuses a record carrying a biometric, a caste/community certificate scan or a civic identity number, matched on the normalised field name;. Deliberately asymmetric — caste_category stays storable because it is the lawful reservation eligibility basis." },
      { name: "RTI Act 2005 §7(1) and §19(1)", status: "enforced", note: "MIXED, and worth separating. ENFORCED: rejecting an RTI request without citing a statutory exemption ground is refused at the write." },
      { name: "DBT direct benefit transfer", status: "modelled", note: "Through the sibling's governed writer. An approved application's benefit composes a finance1 AP invoice; disbursing is human-gated." },
      { name: "CPGRAMS grievance redress", status: "modelled", note: "A grievance opens a service1 case through service1's own governed writer, and an escalated grievance also opens a project1 investigation through project1's — a composed write the target app can refuse. No live CPGRAMS connection." },
      { name: "Sovereignty / data residency", status: "declared", note: "Not enforced by this pack. gov1.sovereignty is a blocking policy(\"offshore_transfer\",...), which blocks only when a payload carries that flag truthy;." },
      { name: "DigiLocker", status: "declared", note: "NOT IMPLEMENTED. Named once in the reference-model docstring and nowhere in code." },
      { name: "Fairness by construction (no protected-group profiling)", status: "enforced", note: "Structurally by absence. The citizen record carries name, district, verification_status and income_band only, so no protected-group breakdown can be computed; protected_group_breakdown is None and the delivery surface groups by scheme and district only;." },
    ],
    refusals: [
      "Equity: a citizen's entitlement may not be decided on a prohibited / arbitrary basis (refused: {bad[0]})",
      "An application may only be approved when the citizen is eligibility-grounded (income band matches the scheme)",
      "An application may only be approved for a verified citizen",
      "Appropriation: the scheme's sanctioned budget has {remaining} remaining and this benefit needs {amount} — refused (a statutory entitlement is never part-paid to fit a budget; escalate for a revised sanction)",
      "An RTI request may not be rejected without citing a statutory exemption ground (transparency: information may be refused, but never silently)",
      "Cannot publish a scheme metric with no underlying records (ungrounded)",
      "\"field '{k}' looks like {why} and must not be stored here (PII minimisation / DPDP) — gov1 references identity, never copies it\", called with app=\"gov1\" at",
    ],
    evals: "SEVEN named eval sets, NINE scored cases, run as one battery by the shared conformity engine; the Trust Mark is mint-on-pass and auto-revoked on drift, and certify requires the admin role. The sets, mirrored by the server’s own list: gov1.grounding (1 case), gov1.official_decides (1), gov1.equity_no_disparate_impact (1), gov1.citizen_data_safety (1), gov1.transparency_rti (1), gov1.engine_never_acts_for_the_human (2 — a phrase floor plus a live autonomous-action-claim classifier), gov1.citizen_data_seam_clean (2 — the recomputed seam invariant plus handoffs_gated).",
    seo: {
      title: "gov1 — governed entitlement delivery for the public sector | elan1",
      description:
        "gov1 adds the public entitlement record — citizen, scheme, application, benefit, appropriation, RTI request, re-verification — and refuses on the write path: an approval beyond the sanctioned budget, a decision on a prohibited ground, an RTI rejection with no statutory ground. Composes service1, finance1, sales1, project1 and insight1.",
    },
  },

  {
    slug: "manufacture1",
    layer: "solution",
    name: "manufacture1",
    industry: "Manufacturing & engineering",
    tagline: "The agent advises. A person moves the machine.",
    challenge:
      "manufacture1 is the elan1 pack for process and batch manufacturing: thirty shop-floor object types — recipe, batch, lot genealogy, machine operation, inspection, NCR, certificate of analysis — under a write path that refuses to write into a control system, and a lot trace that answers the recall call. It composes supply1, finance1, project1, service1 and insight1, writing into each through that app's own governed writer.",
    composedOf: ["finance1", "insight1", "project1", "service1", "supply1"],
    accent: ACCENT.cyan,
    useCases: [
      {
        title: "An operation is an advisory, and the record says so whether or not you do",
        description: "Every create and update of an operation is classified against the EFFECTIVE command — the payload's, or the stored one if the payload does not carry it — by the classifier: 18 exact phrases plus 6 normalised intent patterns covering auto-actuation, interlock and guard and e-stop bypass, the phrasal form ('turn the interlock off'), dismissal ('no need to check safety, just run it'), commanding a locked-out unit, and a direct write to a plc, scada, dcs, hmi, historian or controller. A hit refuses the write: \"machine safety: humans control machines — the agent advises and never auto-actuates / bypasses safety (refused: {violation})\". The line is drawn at the TARGET, not the verb, so 'read the setpoint from the PLC historian' and 'Advise: hold blend at 45 rpm' stay clean. The derive then removes the caller's opinion — f[\"advisory\"] = True # always. This platform has no non-advisory operation. — and recomputes safety_status on every operation write, so neither flag survives a PATCH that mentions neither.",
      },
      {
        title: "Lock-out holds, and coming out of it is a signature",
        description: "A machine whose safety_state is locked_out refuses every command: \"machine safety: no command may be issued against a LOCKED-OUT machine (LOTO)\". Reporting a safety-critical breakdown locks the machine out immediately and opens an urgent service1 case through service1's own writer. The gate is asymmetric on purpose: LOCKING OUT stays immediate, because the safe direction is never something to slow down, while moving a machine out of lock-out routes to a human approval — which slightly over-gates idle-to-running, and that is the intended way to be wrong.",
      },
      {
        title: "Lot genealogy, and the query a recall actually needs",
        description: "A material consumption carries the lot stamped from the material record rather than typed, and is checked cumulatively against what that lot received: \"cannot consume {qty} of '{material}' lot {lot_no} — {on_hand} was received and {taken} is already recorded against it. A genealogy built on material that was never there is fiction.\" A batch cannot reach completed while any recipe SKU has no material issued against it: \"A produced unit without lot genealogy cannot be recalled — traceability is this vertical's promise, and it is kept here or nowhere.\" a governed endpoint then walks a material lot forward to every batch that consumed it, with each batch's own lot number and whether it shipped, computed live from the consumption records — an unknown lot resolves to nothing rather than to everything.",
      },
      {
        title: "A verdict, or a refusal — the platform will not read a measurement",
        description: "Criterion_verdict returns pass, fail, or a third answer: None, meaning this is not a verdict at all. A measurement, an empty, or prose is refused by name at the write: \"inspection criterion 'pH 6.5-7.5' has result '8.9', which is not a pass/fail verdict. Record the verdict a person reached ('pass' / 'fail') — this platform will not infer from a measurement whether it is in spec, and a batch of medicine is not a place to guess.\" Where a template is in play, passed is derived as the AND of every criterion's verdict on every inspection write, so it cannot be patched onto a failed inspection. Template criteria and quality-procedure steps become immutable the moment they leave draft — \"publish a new version instead\" — so an inspection always scores against a specific, auditable checklist version.",
      },
      {
        title: "A certificate of analysis that cannot outrun its evidence",
        description: "A CoA can only be created for a batch with a signed, passing inspection, and its results are populated from that inspection rather than hand-typed. Two later facts still block it: \"cannot issue a certificate of analysis for a batch with {n} OPEN non-conformance(s) — an earlier pass does not survive an unresolved NCR. Close it (a human's decision) first.\" and \"this batch's most recent signed inspection FAILED — an earlier passing inspection does not overrule a later attested failure. Remediate and re-inspect.\" It is the LATEST signed inspection that counts, not 'ever failed', so a batch that failed, was remediated and passed a re-inspection stays certifiable — a one-way trap is a thing people route around.",
      },
      {
        title: "OEE, yield and scrap computed at write time",
        description: "OEE is availability x performance x quality, derived live from job cards, downtime entries and signed inspections: availability is run time over run-plus-downtime, performance is standard over actual capped at 100% so running faster than standard cannot inflate the number, quality is passed over signed. Yield and scrap rate are computed from the batch record. A metric's numerator, denominator, rate and grounded flag are all set by the derive rather than accepted from the caller, and publishing one is refused when the denominator is zero: \"cannot publish a manufacturing metric with no underlying batches (ungrounded)\". A published metric lands a grounded insight1 record carrying its own evidence string.",
      },
      {
        title: "Finite capacity: propose freely, commit once",
        description: "A schedule_entry may be PROPOSED over a workstation's capacity — flagging the at-risk batch is the point. Confirming it is where the arithmetic bites: \"confirming this schedule would push workstation '{wid}' over capacity on {date} ({committed}m committed > {capacity}m available)\", summed from the confirmed entries already on that workstation and date against real routing standard minutes. Multi-level BOM explosion walks recipe lines recursively and reports a missing sub-recipe or a cyclic reference in an errors list rather than dropping or inventing it: \"recipe '{rid}' is its own ancestor (a cyclic BOM cannot be exploded)\". This is capacity scheduling, not demand forecasting — a material reorder still drafts through supply1.",
      },
      {
        title: "Worker data refused by shape, at the store and again at the seam",
        description: "Every manufacture write is screened first for protected worker attributes: a six-name exact floor plus manufacture1's own Factories Act and DPDP patterns for biometrics, fingerprint/iris/retina/faceprint, home or residential address, medical record or history, and caste, religion or union membership — \"field '{k}' looks like a biometric identifier and must not be stored here (PII minimisation / DPDP) — manufacture1 references identity, never copies it\". The vocabulary is deliberately this vertical's own rather than shared, because a broad address pattern would refuse a legitimate listing in the property vertical. The same denylist, widened with worker_ref and issued_by, is RECOMPUTED over the live sibling records the production spine links to, so a worker badge cannot ride a hand-off into a supply1, finance1, project1 or insight1 system of record.",
      },
    ],
    compliance:
      "What the code enforces on the write path: refusal of an auto-actuating, interlock-bypassing or control-system-targeted machine command; refusal of any command against a locked-out machine; worker-data minimisation by field shape at the store and again at the cross-app seam; batch release only against an approved recipe; batch completion only with lot genealogy; an inspection criterion recorded as a verdict rather than a measurement; a certificate of analysis grounded in a signed, passing inspection with no open NCR and no later signed failure; and capacity checked at confirm. What is declared rather than enforced, stated plainly: PLI and BIS appear as residency text on the conformity receipt, not as any computation; ISA-95, ISA-88 and ISO 9001 describe the shape of the record model, not a certification held; and the signature's own manufacture1.traceability policy is a note() that asserts nothing by itself — the enforcement is the completion gate beside it. The governance signature is scored by a nine-set, twelve-case battery before a Trust Mark issues, and a valid mark whose evals later fail is revoked as drift; the grounding and seam cases carry evidence companions, so a tenant with nothing to measure is recorded not-measurable rather than passed, and the receipt names every claim it did not attest. Four of the nine sets are still exact-phrase lists rather than live classifiers — a known limit, written down as one.",
    outcomes: [
      "A batch cannot reach completed while any recipe SKU has no material recorded against it, so a completed batch always has a genealogy to recall against — and the recall query reads that genealogy live rather than a stored roll-up that could be stale.",
      "A certificate of analysis cannot be created without a signed, passing inspection, and cannot be issued over an open non-conformance or a later signed failure. The chain that once printed '8.9 OUT OF SPEC' as its own certified result is broken at three separate points.",
      "OEE, yield and scrap rate are computed from job cards, downtime entries, signed inspections and batches at write time; the caller supplies no numerator, denominator or rate, and a metric with a zero denominator cannot be published.",
      "Twelve write transitions route to a human approval before they land — releasing a batch, completing a batch, signing an inspection, publishing a metric, confirming a schedule, loosening an active quality goal, closing an NCR, completing a safety-critical corrective action, adopting a maintenance plan, issuing a certificate of analysis, taking a machine out of lock-out, and any delete. The decision is recorded on the hash-chained audit log.",
      "The Trust Mark is scored before it issues and revoked when it drifts: nine eval sets, twelve cases, with machine safety graded by the same classifier the write path runs, so the mark and the refusal cannot disagree about what is forbidden. The pack's own test submits \"bypass interlock and auto-actuate the press\" and gets no mark.",
    ],
    starterEngagement:
      "The manufacture1 Launchpad: a maintenance/SOP assistant live at one site in 4–6 weeks, then operated on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-site/seat pricing plus agent1 builds and a run1 retainer. Illustrative; not engineering, safety, or financial advice.",
    wedge: "IT never writes to OT, enforced on the write path and not assertable by the caller. An operation — manufacture1's record of a machine command — is classified on EVERY create and update against the EFFECTIVE command (payload value, else the stored one) by the classifier: an 18-phrase floor plus 6 normalised intent patterns covering auto-actuation, interlock/guard/e-stop bypass, the phrasal form ('turn the interlock off'), dismissal ('no need to check safety, just run it'), commanding a locked-out unit, and a direct write to a plc/scada/dcs/hmi/historian/controller. A hit refuses the write: \"machine safety: humans control machines — the agent advises and never auto-actuates / bypasses safety (refused: {violation})\".",
    problem: [
      "The recall call is the test. A supplier says lot MOH-2406-A is contaminated: either you can name the batches that consumed it, or the honest recall is everything you ever shipped.",
      "A criterion written as prose ('pH 6.5-7.5') invites a result recorded as a measurement ('8.9'). Software that reads a non-empty string as truthy scores that as a pass — and the certificate it then issues prints the evidence that the batch failed.",
      "The line between the planning system and the control system is the one boundary a plant cannot get wrong, and 'write the setpoint straight to the PLC' arrives looking like an ordinary instruction.",
      "OEE, yield and scrap rate typed into a review deck are assertions. The same three numbers derived from job cards, downtime windows and signed inspections are a record you can hand to an auditor.",
      "A factory that stores a worker's fingerprint, or where they live, has taken on a DPDP and Factories Act exposure it never needed in order to run a shift.",
    ],
    composedOfNote: "manufacture1 composes five built suite apps — supply1, finance1, project1, service1 and insight1 — writing into each through that app's OWN governed writer rather than reaching across the boundary, and adds the shop-floor reference layer none of them owns: recipe and multi-level BOM, batch and lot genealogy, machine and lock-out state, advisory operation, inspection and template, NCR and corrective action, quality procedure, and certificate of analysis.",
    ownRecords: [
      "Recipe",
      "Batch",
      "Material",
      "Material consumption",
      "Machine",
      "Maintenance plan",
      "Operation",
      "Inspection",
      "Ncr",
      "Sales metric",
      "Release review",
      "Quality review",
    ],
    regulatoryRails: [
      { name: "Machine safety / lock-out-tag-out (LOTO)", status: "enforced", note: "The classifier (18 phrases + 6 SAFE intent patterns) refuses the operation write; machine_is_locked_out refuses any command against a locked-out machine. A safety-critical breakdown report sets safety_state to locked_out immediately." },
      { name: "DPDP + Factories Act worker-data minimisation", status: "enforced", note: "AND at the cross-app seam. Every manufacture write runs the classifier first: a six-name exact floor (aadhaar_plaintext, biometric, full_medical, home_address, bank_account_full, ssn) plus manufacture1's OWN pattern ceiling for biometric/fingerprint/iris/retina/faceprint, home-or-residential address, medical record/history/file, and caste/religion/union membership (sdk, 338-350)." },
      { name: "Lot/batch traceability (ISA-88; recall)", status: "enforced", note: "At completion — and this is the rail that used to be posture. The signature policy manufacture1.traceability is a note() and asserts nothing on its own." },
      { name: "GMP / quality attestation (ISO 9001-shaped)", status: "enforced", note: "Signing an inspection is K5; on a template-scored inspection passed is DERIVED as the AND of every criterion's explicit verdict on every inspection write, so it cannot be patched on. Criterion_verdict returns None for a measurement or prose and the write is then refused by name sdk;." },
      { name: "ISA-95 / ISA-88 / ISO 9001", status: "modelled", note: "Not certified. These name the shape of the reference SoR (30 object types) and appear as text on the conformity receipt 'the receipt is ISA-95 / ISO 9001 / Factories Act regulator-ready',." },
      { name: "Make in India / PLI and BIS", status: "declared", note: "Only. Both strings appear in exactly two places: the module docstring sdk and the conformity receipt's residency_note, 'Make in India / PLI · BIS · Factories Act · DPDP — India-resident; ISA-95 / ISO 9001 aligned; cross-border refused'." },
      { name: "OT/IT separation as a K7 policy", status: "declared", note: "As policy; ENFORCED by the classifier. manufacture1.ot_it_separation is a blocking policy(\"ot_write\", \"OT/control-system writes are advisory only — IT never writes to OT\") and manufacture1.humans_control_machines is a blocking policy(\"an automated machine\", \"machines are controlled by humans — agents are advisory only\")." },
    ],
    refusals: [
      "Machine safety: humans control machines — the agent advises and never auto-actuates / bypasses safety (refused: {bad[0]})",
      "Machine safety: no command may be issued against a LOCKED-OUT machine (LOTO)",
      "Cannot complete this batch: no material issued for {missing}. A produced unit without lot genealogy cannot be recalled — traceability is this vertical's promise, and it is kept here or nowhere.",
      "Inspection criterion {crit!r} has result {val!r}, which is not a pass/fail verdict. Record the verdict a person reached ('pass' / 'fail') — this platform will not infer from a measurement whether it is in spec, and a batch of medicine is not a place to guess.",
      "Cannot consume {qty} of '{material}' lot {lot_no} — {on_hand} was received and {taken} is already recorded against it. A genealogy built on material that was never there is fiction.",
      "Cannot issue a certificate of analysis for a batch with {n} OPEN non-conformance(s) — an earlier pass does not survive an unresolved NCR. Close it (a human's decision) first.",
      "Cannot issue a certificate of analysis: this batch's most recent signed inspection FAILED — an earlier passing inspection does not overrule a later attested failure. Remediate and re-inspect.",
    ],
    evals: "NINE eval sets, TWELVE cases — verified by running the governance signature('manufacture1') against the live catalog: grounding (1) · machine_safety (1) · quality_integrity (1) · worker_data_safety (1) · ot_it_separation (1) · quality_closed_loop (2) · capa_never_autonomous (1) · engine_never_acts_for_the_human (2) · worker_data_seam_clean (2). The same nine are declared in the pack and on the server, and a pack test asserts set(pack.evals) == set(signature.eval sets) so the pack's certify door and a governed endpoint cannot grade different batteries — they once did, and the pack's door silently skipped the entire safety battery (ADR-0643).",
    seo: {
      title: "manufacture1 — governed shop-floor records for manufacturing | elan1",
      description:
        "elan1's manufacturing pack: lot genealogy and the recall query, human-signed quality, and a write path that refuses an OT write. Composes five suite apps.",
    },
  },

  {
    slug: "realestate1",
    layer: "solution",
    name: "realestate1",
    industry: "Real estate & construction",
    tagline: "Money moves with the building.",
    challenge:
      "realestate1 is elan1's India-first RERA and DPDP system of record for new-project developer sales — project, unit, booking, escrow, construction stage, payment milestone, cancellation, document, possession, snag and sales metric — with the money rules recomputed at the moment of the write.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.gold,
    useCases: [
      {
        title: "Marketing gated on the RERA registration",
        description: "A unit reaches available — the status that puts it in front of buyers — only when its project record carries a rera_id, read live from the store on create and on update. The refusal is literal: \"RERA: a unit cannot be marketed unless its project is RERA-registered (has a rera_id)\". The RERA number is also a declared unique key on the project, so two projects cannot claim one registration.",
      },
      {
        title: "An escrow ceiling that is recomputed, never read",
        description: "Each withdrawal is measured against deposited x the sum of certified stage percentages, minus what is already drawn — computed inside the validator at the instant of the write. The stored certified field is a display mirror the gate does not consult. Validation runs before the approval gate and runs unchanged when an approval has already been satisfied, so a signature routes the decision; it does not raise the cap.",
      },
      {
        title: "Escrow inputs a caller cannot supply",
        description: "Deposited, withdrawn and certified are system-maintained and refused outright rather than quietly ignored: \"Certify a construction stage to raise what is drawable; use withdraw_request to draw.\" withdraw_request is the only escrow field a caller owns — it asks, it does not assert. Stage percentages are separately capped so they cannot sum past one whole building.",
      },
      {
        title: "Demands tied to certified construction",
        description: "An instalment's amount is derived as the booking amount times its percentage and cannot be supplied. A milestone linked to a construction stage cannot move to demanded until that stage is certified: \"a construction-linked demand requires the construction to be CERTIFIED first (RERA). Certify the stage, then demand.\" The same certification governs what a promoter may ask a buyer for and what they may draw.",
      },
      {
        title: "Certification with a name on it",
        description: "A stage may be certified only by an engineer, an architect or a chartered accountant, and only when the certifying professional is named — \"an anonymous certification is not an attestation, and the escrow ceiling rests on it\". Certifying writes a stage review recording who certified what percentage, so the ceiling is attributable to a person rather than to whoever typed a number.",
      },
      {
        title: "Listing copy re-derived on every unit write",
        description: "The fair-housing and RERA truthfulness flag is recomputed from the effective record — the payload merged over what is stored — by the same classifier the conformity mark scores, covering discriminatory steering and misrepresentation such as assured returns or super-built-up pricing. It is deliberately not negation-aware: in a steering claim the negation is the violation, so \"not for families\" flags. A regression test holds that decision in place.",
      },
      {
        title: "Refund arithmetic that cannot be typed",
        description: "On a cancellation, what the buyer actually paid is summed from paid milestones; forfeiture is the lesser of what the promoter asks and a conservative RERA ceiling documented in code as a platform default rather than a legal assertion; the refund is the remainder. Approving posts the finance1 AP invoice through finance1's own governed writer, cancels the booking, and returns the unit to the market.",
      },
      {
        title: "PII minimised by shape, at rest and at the seam",
        description: "Aadhaar, PAN, passport, full bank account, SSN and card-number fields are refused on the way in by pattern, so alternate spellings are caught rather than only the exact key. The same denylist, extended with the masked KYC reference, the marketing copy, the fairness flag and the requested forfeiture, is recomputed over the live finance1, project1 and insight1 records realestate1 hands to. Property addresses are deliberately excluded — they are the business.",
      },
    ],
    compliance:
      "The guarantees are refusal strings you can read. Supplying your own escrow figures returns \"escrow:... Computed from the certified construction stages and the collections in the account — not supplied. Certify a construction stage to raise what is drawable; use withdraw_request to draw.\" Billing ahead of the building returns \"a construction-linked demand requires the construction to be CERTIFIED first (RERA). Certify the stage, then demand.\" An unnamed certifier returns \"the certifying professional must be named — an anonymous certification is not an attestation, and the escrow ceiling rests on it.\" Registering an unsigned document returns \"a document must be SIGNED before it can be registered with the sub-registrar.\" Publishing a number with nothing under it returns \"cannot publish a sales metric with no underlying units (ungrounded — denominator is 0).\" Two advisory agents, realestate1.diligence_advisor and realestate1.transaction_coordinator, read those records and flag what to look at; marketing a unit, confirming a booking, demanding an instalment, certifying a stage, approving a cancellation, drawing escrow, signing, registering and handing over possession are each a person's approval. Six eval sets and eight cases score the live record for grounding, fairness, PII safety, escrow integrity, autonomous-action claims and the cross-app seam; the fairness case runs the write path's own classifier and is tested to fail on real discriminatory copy, and a tenant with nothing to score is recorded not-measurable rather than passed.",
    outcomes: [
      "A withdrawal above the construction-certified amount is refused at the system of record, and the refusal carries the arithmetic: how much is certified, how much was deposited, how much is drawable, and how much is already drawn.",
      "Instalment amounts, forfeitures, refunds and absorption rates are computed from the records, so there is no input where a promoter types the figure.",
      "Each escrow draw, stage certification, instalment demand, listing publication, signature, registration, handover and metric publication leaves a typed attestation record naming the reviewer and the verdict.",
      "Clearing a flagged listing requires changing the copy: the fairness flag is re-derived from the effective record on every unit create and update, so a payload that omits the marketing text cannot stamp it fair.",
      "The conformity mark is scored over the units the tenant actually markets and over the live cross-app records; a scan that could not read everything is reported as unmeasurable rather than counted as clean.",
    ],
    starterEngagement:
      "The realestate1 Launchpad: lease abstraction live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-lease/seat pricing plus agent1 builds. Illustrative; not legal, real-estate, or financial advice.",
    wedge: "Money is tethered to physically certified construction, and the tether is RECOMPUTED at the moment of the write rather than stored. An escrow withdrawal is measured against deposited × Σ(percent of CERTIFIED stages) − withdrawn, computed inside the validator via the escrow check,; the stored certified field is an explicitly-labelled display mirror the gate never reads. The same certification governs the buyer side: a milestone linked to a construction stage cannot move to demanded until that stage is certified, and a stage can only be certified by a NAMED engineer, architect or chartered accountant.",
    problem: [
      "A construction-linked payment plan is only as honest as the stage behind it. When the instalment figure is typed at demand time, a buyer can be billed for a slab that has not been poured, each demand individually plausible.",
      "RERA lets a promoter draw from escrow in proportion to certified completion. Hold that proportion in a stored field and the ceiling becomes editable by whoever can patch the record.",
      "A listing flagged for steering or for assured returns gets cleared by a later write that never mentions the copy, because the flag was re-asserted instead of re-derived.",
      "Aadhaar, PAN and passport numbers arrive under a dozen spellings, and a hand-off that widens by one field carries them into a billing or an analytics record.",
      "Cancellation is the moment a promoter's interest and a buyer's are most directly opposed, and it is exactly where the forfeiture number gets typed.",
    ],
    composedOfNote: "realestate1 composes five built apps unchanged — customer1, finance1, project1, service1 and insight1 — and adds its own RERA and DPDP system of record on top. An inquiry opens a sales1 CRM lead; a confirmed booking and a demanded instalment post finance1 AR invoices through finance1's own governed writer; an approved cancellation posts the AP refund; a registered document opens a project1 closing project; a snag opens a service1 case through service1's writer; a published sales metric pushes a grounded insight1 record. What realestate1 adds is the layer between them: the RERA gate on marketing, the 70% escrow ring-fence, the certified-completion ceiling, the construction-linked payment plan, and the capped refund.",
    ownRecords: [
      "Project",
      "Unit",
      "Party",
      "Lead",
      "Booking",
      "Escrow",
      "Construction stage",
      "Payment milestone",
      "Cancellation",
      "Document",
      "Possession",
      "Snag",
    ],
    regulatoryRails: [
      { name: "RERA s.3 — no marketing of an unregistered project", status: "enforced", note: "A unit cannot reach status: available unless its project record carries a rera_id, checked live against the store on create and update;. Reaching available is additionally consequential/K5." },
      { name: "RERA s.4(2)(l)(D) — 70% escrow, withdrawals in proportion to certified completion", status: "enforced", note: "In two halves. 70% of every confirmed booking's amount is rung into the project escrow automatically a declared list = 0.70, sdk:79; applied at." },
      { name: "RERA — certification by an engineer / architect / chartered accountant", status: "enforced", note: "Certified_by must be one of a declared list (sdk:87) and certifier_name must be non-blank, or the certification is refused. Certifying is consequential/K5 and writes a stage_review naming the professional, their discipline and the percentage." },
      { name: "RERA — carpet-area pricing basis, no assured/guaranteed returns; fair-housing / no discriminatory steering", status: "enforced", note: "As a RE-DERIVED FLAG, not as a hard refusal — the distinction matters. On every unit create/update fair_status is recomputed from the EFFECTIVE record (payload merged over stored) by the classifier: a 12-phrase floor plus two SAFE intent patterns over normalised text; sdk:153-214)." },
      { name: "RERA — forfeiture cap on cancellation", status: "modelled", note: "Constant, ENFORCED arithmetic. RERA fixes no national number, so a declared list = 2.0 is documented in code as 'the platform's CONSERVATIVE default ceiling, not a legal assertion' (sdk:93-98)." },
      { name: "DPDP — PII minimisation at rest and across the app seam", status: "enforced", note: "Every realestate write runs the classifier, a shared pattern matcher over the minimisation list vocabulary — aadhaar_plaintext, pan_plaintext, passport_number, bank_account_full, ssn, card_number (sdk:141-148, 217-228) — so passportNumber / passport_no / buyer_passport_number are refused too, not just the exact spelling. At the boundary, fair_housing_pii_at_seam_violations extends that floor with kyc_ref, marketing_text, fair_status, forfeit_requested and is recomputed over the LIVE finance1 / project1 / insight1 records sdk:602-624;." },
      { name: "Sub-registrar registration", status: "modelled", note: "With one enforced ordering invariant. There is no live sub-registrar connection: registered is a status a human sets under K5." },
      { name: "Data residency (RERA / DPDP)", status: "declared", note: "With tenant scoping enforced. The conformity receipt carries the string 'RERA / DPDP — India-resident; cross-border refused'." },
      { name: "Declared connectors", status: "declared", note: "And derived rather than hand-written. Connectors: [mcp.crm, mcp.erp, mcp.helpdesk, mcp.kb, mcp.email, mcp.whatsapp] is what the transitive-trust gate reads; it is derived from the composed agents' tools and verified by a launch-readiness test." },
    ],
    refusals: [
      "RERA: a unit cannot be marketed unless its project is RERA-registered (has a rera_id)",
      "Escrow: a withdrawal of {wr} exceeds the construction-certified available {available} (RERA escrow integrity) — {pct}% of construction is certified against {deposited} deposited, so {certified} is drawable and {withdrawn} is already drawn",
      "Escrow: {fields} are computed from the certified construction stages and the collections in the account — not supplied. Certify a construction stage to raise what is drawable; use withdraw_request to draw.",
      "Construction stages are shares of one project and cannot exceed 100% — this would take {project} to {total}% ({others}% is already allocated)",
      "A payment plan cannot exceed 100% of the agreed consideration — this would take the booking to {total}% ({others}% is already planned)",
      "This instalment is linked to '{stage}', which is {status} — a construction-linked demand requires the construction to be CERTIFIED first (RERA). Certify the stage, then demand.",
      "A construction stage must be certified by one of engineer, architect, chartered_accountant (RERA) — this is what unlocks buyers' money from escrow",
    ],
    evals: "SIX eval sets, EIGHT cases, with the pack's declared list kept in lock-step with the server's own eval-set list; — one signature, one Trust Mark. The sets: (1) realestate1.grounding — a field check('grounded'), required, measured by='the grounding measure'; (2) realestate1.fairness — the classifier check running the WRITE PATH's own the classifier over the listings field; (3) realestate1.pii_safety — no_terms over five raw-identifier phrasings; (4) realestate1.escrow_integrity — no_terms over four autonomous-money-move phrasings; (5) realestate1.engine_never_acts_for_the_human — TWO cases: a 7-phrase floor plus the classifier check over the shared the classifier, so a paraphrase the phrase list never anticipated still fails; (6) realestate1.fair_housing_seam_clean — TWO cases: a field check('fair_housing_seam_clean', measured by='the seam measure') and a field check('handoffs_gated').",
    seo: {
      title: "realestate1 — RERA escrow and construction-linked sales | elan1",
      description:
        "elan1's RERA and DPDP record for new-project developer sales: escrow capped by certified construction, instalments derived not typed, fair-housing listing checks.",
    },
  },

  {
    slug: "edu1",
    layer: "solution",
    name: "edu1",
    industry: "Education",
    tagline: "Guides the learner. Refuses to do the work.",
    challenge:
      "edu1 is a governed higher-education system of record — learners, terms, attendance, fee plans, grades and Academic Bank of Credits entries — and it puts its own tutoring agent's output through the same write path a human-typed one goes through. A response that does the student's work, or names another learner alongside a grade, does not persist.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1"],
    accent: ACCENT.green,
    useCases: [
      {
        title: "A learning guide whose own words face the write gate",
        description: "The tutor endpoint runs the registered edu1.learning_guide through the governed runtime, then writes the guidance it composed through the same governed writer a human-typed session uses. The refusal reads: \"academic integrity: the agent guides learning and never does the student's work.\" The classifier works on intent over normalised text, so a paraphrase is caught rather than only the literal phrase — and it is negation-aware, so a genuine decline is not scored as a violation. The agent is advisory: approval tier 1, requires approval, self-verifying, with its policy tags derived from the edu1 signature rather than hand-written.",
      },
      {
        title: "Student-data protection in both shapes — the field and the prose",
        description: "Every governed edu create and update runs the minimisation guard first, refusing a protected field name with \"field '<name>' must not be stored here (PII minimisation / DPDP).\" The vertical's own list is an exact-match floor and the shared PII key patterns are the ceiling, matched on the normalised key — so aadhaarNumber, aadhaar-number and a declared list all land the same refusal. A tutoring response gets a second, free-text guard for what a column check cannot see: \"student-data protection: the agent never discloses another learner's grade, disciplinary or health detail.\"",
      },
      {
        title: "A pass mark the record computes; a grade a human publishes",
        description: "Passed is derived from the assignment's own max score against the pass mark, so a caller cannot send it. Publishing a grade is a human approval that writes a named attestation; on approval a pass posts an Academic Bank of Credits entry grounded in the course's own credit value, and a fail opens a project1 remediation project linked back to the grade. The transcript is computed live from published grades and the credits posted against them — a draft grade is not part of the record, and nothing is stored, so a transcript cannot disagree with the ledger it summarises.",
      },
      {
        title: "Attendance computed from the marks, with \"not known yet\" as a real answer",
        description: "The attendance record carries a status per enrollment per day and no percentage; the rate is recomputed on every read against the 75% UGC/AICTE floor. An excused absence counts as attended and an unexcused one does not — the distinction keeps the signal honest in both directions. With zero marks the at-risk flag is withheld: the risk signal returns tier unknown and no score, because \"we have not looked\" must never render as \"we looked and it was fine.\"",
      },
      {
        title: "edu1 holds the fee plan; finance1 holds the rupee",
        description: "A fee structure says what is owed, in how many installments, less any concession — and each installment posts its own governed finance1 receivable through finance1's gate, with the last part carrying the rounding remainder so the parts sum to exactly the payable amount. If finance1 is not available the endpoint refuses rather than improvising: \"finance1 is not available — edu1 never invoices on its own.\" A concession larger than the fee it discounts is refused; a negative tuition is not a scholarship.",
      },
      {
        title: "Learning metrics that cannot be published ungrounded",
        description: "Pass-rate and completion are computed from the record on every write — numerator, denominator, rate and the grounded flag are derived, never supplied. Publishing is a human approval that pushes a grounded insight1 record; publishing with nothing underneath is refused: \"cannot publish a learning metric with no underlying records (ungrounded — denominator is 0).\"",
      },
      {
        title: "A learning spine whose invariants are recomputed, not asserted",
        description: "One endpoint walks the three cross-app hand-offs — enrollment to a finance1 receivable, grade to a project1 remediation plan, learning metric to an insight1 record — over the LIVE sibling records, and reports how many academic-private fields crossed the boundary and how many hand-off paths sit outside a human approval. It also reports how many records it scanned and how many it could not read, so a scan that saw nothing, or saw less than it should have, cannot be mistaken for a clean bill of health.",
      },
      {
        title: "A Trust Mark that has to survive an attack",
        description: "Certification runs seven eval sets and nine cases against live records, then an adversarial floor: the academic-integrity and student-data classifiers must block the whole red-team corpus with zero false positives on benign tutoring. edu1 is the only vertical mapped to two safety dimensions rather than one. No eval, no mark; a valid mark whose evals later fail is treated as drift and revoked on reverify. The receipt names the eval run, the residency posture and the audit-chain state.",
      },
    ],
    compliance:
      "Nothing consequential happens without a person. Enrolling a learner, publishing a grade, publishing a learning metric, closing an academic term and any delete are human approvals, and each writes an attestation record naming the reviewer and the decision. Every governed write is policy-evaluated, appended to a hash-chained audit log and metered. The edu1 Trust Mark is eval-gated across seven sets and nine cases and additionally requires the live academic-integrity and student-data classifiers to block the full red-team corpus with zero false positives; a mark whose evals later fail is revoked. Two things we are careful not to overstate: age-appropriateness and accessibility are declared in the governance signature and scored by the eval battery, not refused at the write path; and the Academic Bank of Credits is a governed internal ledger — a credit entry is posted on a human-approved passing grade, grounded in the course's own credit value, not written to an external registry.",
    outcomes: [
      "A tutoring response that does the student's work does not become a record: the governed writer returns blocked with the refusal reason and appends a refusal event to the hash-chained audit log — and that holds whether a person typed it or the agent composed it.",
      "Passed cannot be supplied by a caller — it is computed from the assignment's own max score — so an Academic Bank of Credits entry cannot be minted off a flag the client sent.",
      "No attendance percentage is stored anywhere in edu1, so a roll-up cannot disagree with the marks it summarises.",
      "Five write transitions sit behind a human approval and each writes an attestation naming the reviewer: enrolling a learner, publishing a grade, publishing a learning metric, closing an academic term, and any delete.",
      "The three cross-app hand-offs are re-checked against the live sibling records on every read, and records the scan could not read are counted and surfaced rather than quietly shrinking the denominator.",
    ],
    starterEngagement:
      "The edu1 Launchpad: curriculum/lesson generation or a learner-support agent live in 4–6 weeks.",
    pricingNote:
      "Fixed Launchpad fee, then per-teacher/subscription pricing. Illustrative; not educational or compliance advice.",
    wedge: "The AGENT'S OWN OUTPUT is refused by the system of record. The education write path runs two SAFE semantic classifiers over a tutoring_session before it persists — the classifier (does the response do the student's work / enable cheating) and the classifier (does it name another learner alongside a grade, disciplinary or health detail) — and a governed endpoint puts the live agent's composed guidance through that same governed writer. So the refusal is not a system prompt, a policy file, or a filter in front of the model: if the tutor does the student's homework, the record refuses to keep it, whoever composed the words (the deterministic dev model or a keyed Claude).",
    problem: [
      "An AI tutor's safety lives in the sentence it just produced. A system prompt, an instruction file and a policy PDF all sit upstream of that sentence, and none of them reads it.",
      "A pass mark that arrives as a field on a request is a credential nobody computed — and a credential is the thing an academic record exists to protect.",
      "An attendance percentage stored as a number can drift from the marks it claims to summarise, and every at-risk signal reading it inherits the drift.",
      "Student data leaks as prose, not as a column: naming a classmate's grade in a tutoring reply touches no protected field at all.",
      "A term everyone agrees is \"closed\" stays writable until something refuses the write.",
    ],
    composedOfNote: "Pack.yaml's composes: field reads exactly [customer1, finance1, project1, service1, insight1] — customer1 is the app id that ships as sales1 — and each is verifiable in the code: an admissions enquiry opens a sales1 CRM lead, enrolling posts a finance1 tuition invoice and each fee installment posts another, a published failing grade opens a project1 remediation plan, a support request opens a service1 case, and a published learning metric pushes an insight1 record. On top of those five, edu1 adds what they do not hold: its own higher-education record (fifteen object types, from the academic term through attendance and the fee plan to the Academic Bank of Credits entry), one native agent, and the academic-integrity and student-data refusals that run on its write path.",
    ownRecords: [
      "Learner",
      "Course",
      "Academic term",
      "Enrollment",
      "Assignment",
      "Attendance",
      "Fee structure",
      "Tutoring session",
      "Grade",
      "Credit",
      "Sales metric",
      "Enrollment review / integrity review / grade review / metric review",
    ],
    regulatoryRails: [
      { name: "Academic integrity (the tutoring wedge)", status: "enforced", note: "The education write path refuses a tutoring_session whose response trips the classifier. The classifier is intent-based over normalised text (SAFE) with a literal phrase list as its fast floor, and negation-aware so a genuine decline is not a violation." },
      { name: "DPDP / FERPA student-data minimisation", status: "enforced", note: "For every edu object type, on every governed create/update: the classifier(fields) is the first thing the education write path runs. The minimisation list (7 literals: aadhaar_plaintext, pan_plaintext, full_dob, home_address, bank_account_full, ssn, card_number) is the exact-match floor and the shared the minimisation list set is the ceiling, matched on the NORMALISED key — so aadhaarNumber, aadhaar-number and a declared list are the same refusal." },
      { name: "NEP 2020 / Academic Bank of Credits (ABC)", status: "modelled", note: "As an internal ledger, not a live connection. Credit is an edu1 object type; on a human-approved publish of a PASSING grade the approval-resolve path posts one, grounded in the course's own credits value via the course credit value;." },
      { name: "UGC / AICTE 75% attendance floor", status: "enforced", note: "As a COMPUTED signal, not as a refusal. A declared threshold table = 75.0; the percentage is computed from the marks on every read and never stored (the Attendance record carries no percentage field)." },
      { name: "Academic-term freeze", status: "enforced", note: "Closing a term is a human approval, and afterwards an attendance create/update inside it is refused by name. Without this the approval would be decorative." },
      { name: "Money separation (edu1 plans, finance1 posts)", status: "enforced", note: "Structurally. edu1 owns the fee PLAN; each installment posts its own governed finance1 AR invoice through finance1's own gate, and the endpoint refuses outright if finance1 is unavailable." },
      { name: "Grounded learning analytics", status: "enforced", note: "The education write path computes numerator/denominator/rate/grounded for sales_metric from the live SoR on every write (pass_rate = passed / published-graded; completion = completed / enrolled) — they cannot be supplied — and the education write path refuses a publish when the denominator is 0." },
      { name: "Data residency (DPDP India-resident)", status: "declared", note: "The conformity receipt reports residency: {region: ctx.region, localisation: \"NEP / NDEAR / DPDP — India-resident; FERPA-aligned; cross-border refused\"} / 21576). A residency router exists in core, but the edu1 receipt reports posture rather than itself enforcing a cross-border refusal." },
      { name: "Age-appropriate safety", status: "declared", note: "As a K7 policy (a blocking policy(\"age_inappropriate\", …), and SCORED by the edu1.age_safety eval set over the live tutoring text. There is NO age classifier on the write path — unlike integrity and student-data, nothing refuses an age-inappropriate response at write time." },
      { name: "Accessibility & equity", status: "declared", note: "Only — note(\"accessibility + equity by design\") in the signature. No code enforces or scores it." },
    ],
    refusals: [
      "Academic integrity: the agent guides learning and never does the student's work (refused: {bad[0]})",
      "Student-data protection: the agent never discloses another learner's grade, disciplinary or health detail (refused: {leak[0]})",
      "Academic term '{name}' is closed — its attendance record is final (re-open the term if it genuinely needs correcting)",
      "Cannot publish a learning metric with no underlying records (ungrounded — denominator is 0)",
      "The concession (₹{conc:,.0f}) cannot exceed the fee it discounts (₹{total:,.0f})",
      "finance1 is not available — edu1 never invoices on its own",
      "This enrollment has no fee plan — attach one in Academics & learners",
    ],
    evals: "SEVEN eval sets, NINE cases, and the pack declares exactly the seven the server runs (asserted by — an earlier version declared three of five and validated happily, which is the bug that test exists to prevent). The sets: edu1.grounding (1 case — a required a field check on the live grounding fact with measured by=the grounding measure, so a tenant with no published metric scores NOT-MEASURABLE, never a pass); edu1.integrity_safety (1 banned-phrase case); edu1.fairness (1 case, but it reuses the shared lending/underwriting vocabulary — apt for bank1/insure1, not an edu-specific fairness guard); edu1.student_data_safety (1 case); edu1.age_safety (1 case — the ONLY place age-appropriateness is checked at all); edu1.engine_never_acts_for_the_human (2 cases — an 8-phrase floor PLUS the classifier check running the live autonomous-action-claim classifier, so a paraphrase nobody listed still fails); edu1.student_data_seam_clean (2 cases — the recomputed seam invariant, required, gated on the seam measure, plus handoffs_gated).",
    seo: {
      title: "edu1 — governed higher-ed records and an integrity-safe tutor | elan1",
      description:
        "edu1 governs the higher-education record — attendance, fee plans, grades, ABC credits — and refuses a tutoring response that does the student's work or names another learner. Composes sales1, finance1, project1, service1, insight1.",
    },
  },

  {
    slug: "energy1",
    focus: "secondary",
    layer: "solution",
    name: "energy1",
    industry: "Energy & utilities",
    tagline: "Humans control the grid. The record controls the number.",
    challenge:
      "energy1 is a DER, metering and net-metering system of record for India-first renewable and distribution operations. A dispatch that auto-dispatches, overrides protection or targets an isolated asset is refused on every write. A certificate's MWh is derived from the meter reading. A settlement's money is derived from a recorded tariff. None of the three is a field anyone can type.",
    composedOf: ["finance1", "insight1", "project1", "sales1", "service1", "supply1"],
    accent: ACCENT.clayDeep,
    useCases: [
      {
        title: "A DER, metering and net-metering system of record",
        description: "Fourteen typed object types — der_asset, site, meter, meter_reading, generation, dispatch, rec, sales_metric, tariff, settlement and four attestation records — written through one governed writer. Every write runs the same sequence: status-domain check, derive, validate, K7 policy evaluate, K5 approval where the action commits something, then a hash-chained audit event.",
      },
      {
        title: "Grid dispatch that refuses to become an actuation",
        description: "Every dispatch create and update re-runs a 14-phrase, 3-intent grid-safety classifier against the EFFECTIVE command — the stored one when the payload omits it — and against the EFFECTIVE der_id. The refusal reads: \"grid safety: humans control the grid — the agent advises and never auto-dispatches / overrides protection\". A command aimed at an isolated or locked-out asset gets its own: \"grid safety: no command may be issued against an ISOLATED / locked-out DER\". Both were skippable by a PATCH that carried only der_id until ADR-0646 closed it.",
      },
      {
        title: "A green attribute that cannot outgrow its meter",
        description: "A generation record's kWh is overwritten from the meter reading it references. A certificate's MWh is derived from that generation. Issuance is refused unless the generation is grounded and uncertified — \"a REC may only be issued against grounded, not-already-certified generation (no greenwashing / double-counting)\" — and on the human's approval the source generation is stamped so it cannot ground a second certificate.",
      },
      {
        title: "Net-metering settlement computed from the register",
        description: "Export is summed from the site's metered generation. Net is import minus export. The amount and its direction come from the recorded tariff's rates. A settlement cannot reach settled without a site and an applicable tariff: \"a settlement cannot be settled without a tariff (no rate to compute the amount)\". A tariff that exists but has no populated rate refuses rather than prices — \"it cannot price anything\" — and every money figure comes back as None with a named reason.",
      },
      {
        title: "Meter validation at the point of entry",
        description: "A reading that is not a number, is negative, or exceeds nameplate capacity across the longest possible month plus 5% is refused before anything downstream can inherit it: \"meter reading … exceeds the physical maximum for a … kW DER over a month (VEE — implausible; check the register)\". Since the reading is the grounding source for generation, certificates and settlements, a fat-finger entry is stopped where it enters rather than corrected four records later.",
      },
      {
        title: "RDSS reliability computed live, and decomposed",
        description: "SAIDI, SAIFI and CAIDI are calculated from the outage history and the count of connected sites and are never stored. The deeper analysis adds a cause and feeder Pareto — where the customer-minutes went — using the same arithmetic as the headline indices, so the decomposition cannot disagree with the number it decomposes.",
      },
      {
        title: "Prosumer-data minimisation by shape, in the store and at the seam",
        description: "One matcher refuses a protected attribute by shape rather than by name: geolocation, gps_coords, consumption_profile, loadProfile, aadhaar_number and bank_account_no are all refused, while capacity_kw and peak_load_kw pass as the quantities they are. The refusal names itself: \"looks like a fine-grained prosumer consumption/load trace and must not be stored here (PII minimisation / DPDP) — energy1 references identity, never copies it\". The same vocabulary is recomputed over the live finance1 and insight1 records that energy1 hands off to.",
      },
      {
        title: "One advisory agent and three copilots that produce worklists",
        description: "energy1.grid_advisor reads DER states, generation, settlements and outages and flags — it holds mcp.inventory and nothing else, and the studio refuses to compile an advisory agent holding a control connector at all: \"advisory agent … may not hold control-system connectors … — OT actions are taken by humans\". Three copilots rank what the compute layer found: REC issuance with double-count risks first, settlements with settleable sites first, feeders by customer-minutes with a safety-checked curtailment plan. None of them is a registered agent and none of them commits anything.",
      },
    ],
    compliance:
      "Read the rails precisely, because they are not all the same kind of thing. ENFORCED on the write path: grid safety (a live classifier over the effective command and effective der_id, refusing the write), the isolated-asset rule, green-attribute grounding and the no-double-count stamp, meter plausibility, settlement-needs-a-tariff, and DPDP prosumer-data minimisation by shape. ENFORCED at build time: an advisory agent may hold no control-system connector — the studio raises rather than compile one, and none of mcp.ot, mcp.scada, mcp.plc, mcp.grid, mcp.actuator or mcp.bms is registered in the connector fabric. COMPUTED rather than filed: RDSS SAIDI, SAIFI and CAIDI, and the CUF and availability metrics, all calculated from records and never stored. MODELLED: CERC and SERC tariffs are records whose rates are the only legitimate basis for settlement money, but the compliance policy itself is recorded, not blocking, and there is no live exchange or regulator connection; IEC 61968/61970 (CIM), IEEE 2030.5 and OpenADR describe the shape of the object model — there is no protocol gateway for any of them. DECLARED: critical-infrastructure security is a policy that fires on a flag in the payload, plus a phrase-list eval. Above all of it sits a Trust Mark minted from a seven-set, nine-case battery that can fail — certifying the output \"auto-dispatch and trip the breaker\" returns passed=false and mints nothing — and where two sets carry a third state, so an empty sample scores not-measurable rather than passing.",
    outcomes: [
      "A certificate cannot claim more than the meter recorded. A 999 MWh claim against a 500 kWh reading is rewritten to 0.5 MWh before the approval gate sees it, and the finance1 receivable follows the derived figure rather than the claim.",
      "A stored, clean dispatch cannot be quietly re-pointed at an isolated asset. The check reads the effective der_id on every write, and the record is verifiably unchanged after the refusal.",
      "A settlement has no hand-typed money. Export, net, amount and direction are all derived; an active tariff with no populated rate returns a named refusal instead of a zero, and an aggregate that drops a refused row declares itself understated.",
      "The four cross-app hand-offs — settlement to finance1, certificate to finance1, DER commissioning to finance1, published metric to insight1 — are each downstream of a human approval, and the grid-spine endpoint recomputes that from the live records rather than asserting it.",
      "A check that could not see everything says so. The seam scan reports how many sibling records it read and how many it could not, and a scan with unreadable records is scored not-measurable rather than clean.",
    ],
    starterEngagement:
      "The energy1 Launchpad: a predictive asset-maintenance agent live at one site in 4–6 weeks, then operated on run1.",
    pricingNote:
      "Fixed Launchpad fee, then per-asset/site pricing plus an assure1 retainer and run1 operations. Illustrative; not engineering, safety, or financial advice.",
    wedge: "A green attribute cannot be larger than its meter reading, and cannot be minted twice. On every rec write the MWh is DERIVED as metered generation kWh / 1000 and overwrites whatever the caller sent; a rec can only move to issued when the grounding check says the generation is backed by a real reading with kWh > 0 AND carries no rec_id yet, refused at; and on the human's K5 issuance the source generation is stamped with rec_id so the same generation can never ground a second certificate.",
    problem: [
      "The question a grid operator asks about AI is not whether it can decide. It is what stops it from acting. An instruction that reads as advice and an instruction that trips a breaker are the same string until something refuses one of them — and refuses it on the write that only changes which asset the instruction points at.",
      "A green attribute is only as honest as the meter behind it. When the certified quantity is a number in a payload, a certificate can be issued against generation that was never metered, or against generation that has already been certified once.",
      "Net-metering money is arithmetic over metered export and a published tariff. In most stacks the amount arrives as a supplied figure with nothing tying it back to the register, and a tariff record that exists but carries no rates prices real energy at zero.",
      "Reliability indices get reported out of a spreadsheet that no longer agrees with the outage log, so the operating dashboard and the filing drift apart without anyone deciding that they should.",
      "Prosumer data is the easiest thing to leak, and the leak is permanent: a consumer name or a consumption trace copied once into the finance or analytics system of record.",
    ],
    composedOfNote: "energy1 composes six suite apps — supply1 for parts and fuel planning, finance1 for the ledger, sales1 for the DER inquiry pipeline, service1 for outage cases, project1 for major-outage restoration and insight1 for published metrics — and adds the layer none of them owns: the DER, meter, generation, certificate, tariff and settlement genealogy, the grid-safety write gate over it, and the derives that make a green attribute and a net-metering amount computed rather than typed.",
    ownRecords: [
      "Der asset",
      "Site",
      "Meter",
      "Meter reading",
      "Generation",
      "Dispatch",
      "Rec",
      "Sales metric",
      "Tariff",
      "Settlement",
      "Onboarding review, rec review, outage review, metric review",
      "Fourteen object types in total",
    ],
    regulatoryRails: [
      { name: "CEA grid safety / humans control the grid", status: "enforced", note: "The classifier (14 literal phrases plus 3 SAFE intent patterns over normalised text) runs on every dispatch create and update against the EFFECTIVE command — the stored command when the PATCH does not carry one — and a hit refuses the write. Separately, der_is_isolated refuses any command whose EFFECTIVE der_id points at an isolated or locked_out asset." },
      { name: "OT/IT separation", status: "enforced", note: "At build time, DECLARED at policy time. agent1's studio refuses to compile an advisory agent holding any of mcp.ot, mcp.scada, mcp.plc, mcp.grid, mcp.actuator, mcp.bms; energy1's grid_advisor is built advisory=True and holds mcp.inventory only." },
      { name: "Green-attribute integrity (REC)", status: "enforced", note: "the wedge above: grounding gate, quantity derive, and a rec_id stamp on issuance that removes the generation from the issuable pool. The scar behind it: a REC once certified 999 MWh against 0.5 MWh of real metered generation, and the finance1 receivable inflated with it." },
      { name: "CERC / SERC tariffs", status: "modelled", note: "As records, with one enforced consequence. The K7 policy energy1.cerc_serc_env is note(\"CERC/SERC + environmental compliance is recorded\") — recorded, not blocking." },
      { name: "RDSS distribution reliability", status: "computed", note: "Not filed. SAIDI, SAIFI and CAIDI are calculated live from outage_review records and connected sites and are never stored; the deeper analysis (cause and feeder Pareto) uses the SAME arithmetic so the analysis cannot disagree with the metric." },
      { name: "DPDP prosumer-data minimisation", status: "enforced", note: "BY SHAPE, and RECOMPUTED at the cross-app seam. The classifier delegates to the shared matcher: energy1's five literal names are the floor, the shared PII key patterns the ceiling, plus energy1's own patterns for geolocation and fine-grained consumption/load traces." },
      { name: "Critical-infrastructure security", status: "declared", note: "The K7 policy is a blocking policy(\"untrusted_command\", \"critical-infrastructure security: no untrusted control commands\") — it fires on that flag in the payload. It is additionally scored by a four-phrase eval set over agent output." },
      { name: "IEC 61968/61970 (CIM) / IEEE 2030.5 / OpenADR", status: "modelled", note: "an alignment claim about the shape of the object model, stated in the SDK docstring and echoed on the conformity receipt's residency line. There is no protocol adapter or gateway for any of the three anywhere in the platform; a repo-wide grep returns only docstrings and the receipt string." },
    ],
    refusals: [
      "\"grid safety: humans control the grid — the agent advises and never auto-dispatches / overrides protection (refused: {bad[0]})\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"grid safety: no command may be issued against an ISOLATED / locked-out DER\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"a REC may only be issued against grounded, not-already-certified generation (no greenwashing / double-counting)\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"cannot publish a generation metric with no underlying records (ungrounded)\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"a meter reading cannot be negative (VEE)\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"a meter reading's kwh must be a number (VEE)\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
      "\"meter reading {k:.0f} kWh exceeds the physical maximum for a {cap:.0f}kW DER over a month (VEE — implausible; check the register)\" — /Users/elango/Desktop/Nooru dot ai website/elan1",
    ],
    evals: "SEVEN eval sets, NINE cases, all declared identically in pack.yaml, the governance catalog and the server — kept identical by an assertion that the pack's battery IS the signature's, not a copy of it. The sets: grounding (are published metrics grounded), grid_safety, green_attribute_integrity, consumer_data_safety, critical_infra_security, engine_never_acts_for_the_human (2 cases), prosumer_data_seam_clean (2 cases).",
    seo: {
      title: "energy1 — agentic DER, REC and net-metering ops | elan1",
      description:
        "energy1 is a governed DER, metering and net-metering system of record. A dispatch that auto-dispatches or targets an isolated asset is refused on write; a REC's MWh and a settlement's amount are derived from the meter and the tariff. Composes supply1, finance1, sales1, service1, project1 and insight1.",
    },
  },
];

/**
 * GTM-focus ordering, not a product ranking — every solution here is equally built.
 *
 * FIVE lead this year's go-to-market (health1 · retail1 · manufacture1 · realestate1 · edu1); the
 * other FIVE sit behind "More industries" — still live at their own URL, indexed and fully
 * described. Of those five, three are additionally sold by inquiry (`byInquiry`), which is a
 * SEPARATE property: a vertical can sit in the secondary group and still be sold normally.
 *
 * Never used to hide, noindex, or delete a route — see the `focus` doc comment in types.ts.
 * Derive the membership below; do NOT restate it in prose. This comment named a 7/3 split and
 * listed telco1 and energy1 as leading, while the code beneath it had already moved them.
 */
/** The five verticals this year's go-to-market leads with. Presentation only. */
export const primarySolutions = solutions.filter((s) => s.focus !== "secondary");
/** The five shown behind "More industries" — fully built, live and indexed, just not the lead five. */
export const secondarySolutions = solutions.filter((s) => s.focus === "secondary");
/** Sold by inquiry. A STRICT SUBSET of secondary — never assume the two are the same set. */
export const byInquirySolutions = solutions.filter((s) => s.byInquiry);
/** Active first, parked last — the ordering every listing surface (nav, footer, homepage, index) should use. */
export const solutionsByFocus = [...primarySolutions, ...secondarySolutions];

/**
 * The industry packs that compose a given app, DERIVED from each solution's own `composedOf`.
 *
 * 🚨 Any copy claiming "N of the ten industry packs use <app>" MUST come from here. A hand-written
 * count contradicted the site's own /solutions pages within one click: it claimed nine packs opened
 * a service1 case and named health1 as the sole exception, when health1 is one of the packs that
 * DOES compose service1 — and three of the packs named as examples don't compose it at all.
 */
export function solutionsComposing(appSlug: string): Solution[] {
  return solutions.filter((s) => s.composedOf.includes(appSlug));
}

export default solutions;
