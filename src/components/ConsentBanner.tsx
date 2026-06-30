// components/ConsentBanner.tsx — privacy-first consent (DPDP-aligned). Decline is the default:
// nothing non-essential runs until the visitor explicitly accepts. The choice persists; the banner
// then disappears. Links to the Trust page for the full privacy posture.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, setConsent } from "../lib/analytics";

export function ConsentBanner() {
  const [decided, setDecided] = useState(true); // assume decided until we read storage (avoids flash)

  useEffect(() => {
    setDecided(getConsent() !== null);
  }, []);

  if (decided) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setDecided(true);
  };

  return (
    <div
      role="dialog"
      aria-label="Privacy & analytics consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink/95 text-paper backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm text-paper/80">
          We use <strong className="text-paper">privacy-respecting</strong>, first-party analytics
          (path only — no cookies, no third parties, no personal data) to improve the site. Nothing
          non-essential runs unless you accept.{" "}
          <Link to="/trust" className="underline underline-offset-2 hover:text-paper">
            How we handle data
          </Link>
          .
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-paper/80 hover:text-paper"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-ink hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
