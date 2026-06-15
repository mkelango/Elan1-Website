// lib/analytics.ts — privacy-respecting, consent-gated analytics.
// Default = DENIED (decline-non-essential). No cookies, no third-party scripts, no PII: a pageview
// sends only the path (query stripped) and only after explicit consent, to a first-party endpoint
// (VITE_ANALYTICS_URL) via sendBeacon. If no consent or no endpoint, every call is a no-op.

export type Consent = "granted" | "denied";
const KEY = "elan1.consent";
export const CONSENT_EVENT = "elan1:consent";

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent): void {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable — treat as session-only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

const ENDPOINT =
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env
    ?.VITE_ANALYTICS_URL ?? "";

/** Record a pageview — only with consent + a configured first-party endpoint. Path only (no PII). */
export function trackPageview(path: string): void {
  if (getConsent() !== "granted" || !ENDPOINT) return;
  const payload = JSON.stringify({ p: path.split("?")[0], t: "pageview" });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, new Blob([payload], { type: "application/json" }));
    } else {
      void fetch(ENDPOINT, { method: "POST", body: payload, keepalive: true, mode: "no-cors" });
    }
  } catch {
    /* analytics must never break the page */
  }
}
