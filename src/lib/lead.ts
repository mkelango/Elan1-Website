// lib/lead.ts — consent-respecting lead capture. No raw PII ever goes in a URL: leads are POSTed as a
// JSON body to a first-party endpoint (VITE_LEAD_URL) or, with no backend configured, persisted locally
// so the form genuinely captures. Submitting REQUIRES explicit consent.
export interface Lead {
  name: string;
  company: string;
  email: string;
  segment: string;
  interest: string;
  region: string;
  message?: string;
}

/**
 * What actually happened to the lead.
 *
 * 🚨 `delivered` is true ONLY when a configured endpoint accepted the POST. Local capture is a
 * fallback, not a delivery: with no endpoint configured the record sits in this browser and nobody
 * receives it. That was invisible to the caller, so every form on the site rendered the same green
 * tick either way — the contact page went as far as "we'll be in touch within one business day" over
 * a record that had never left the tab. An absence must not render as a confirmation. Callers that
 * do not care may keep ignoring the return value; `await submitLead(...)` still compiles unchanged.
 */
export interface LeadReceipt {
  delivered: boolean;
}

const KEY = "elan1.leads";
const ENDPOINT =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_LEAD_URL ?? "";

export async function submitLead(lead: Lead, consent: boolean): Promise<LeadReceipt> {
  if (!consent) throw new Error("Please agree to be contacted before submitting.");
  const record = { ...lead, consent: true, ts: new Date().toISOString(), source: location.pathname };
  const body = JSON.stringify(record);

  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body,
    });
    if (!res.ok) throw new Error(`Lead submit failed (${res.status})`);
    return { delivered: true };
  }

  // No endpoint configured (static deploy) — capture client-side so nothing is lost. This is NOT
  // delivery, and the receipt says so rather than letting the page imply otherwise.
  try {
    const cur = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
    cur.push(record);
    localStorage.setItem(KEY, JSON.stringify(cur));
  } catch {
    /* storage unavailable — the caller still learns this was not delivered */
  }
  return { delivered: false };
}

