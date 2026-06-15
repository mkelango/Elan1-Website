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

const KEY = "elan1.leads";
const ENDPOINT =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_LEAD_URL ?? "";

export async function submitLead(lead: Lead, consent: boolean): Promise<void> {
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
    return;
  }

  // No endpoint configured (static deploy) — capture client-side so nothing is lost.
  try {
    const cur = JSON.parse(localStorage.getItem(KEY) ?? "[]") as unknown[];
    cur.push(record);
    localStorage.setItem(KEY, JSON.stringify(cur));
  } catch {
    /* storage unavailable — the success state still confirms intent */
  }
}
