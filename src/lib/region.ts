// lib/region.ts — localization scaffold (WS3.5). Region selection in the elan1 geo order, persisted,
// driving localized trust/compliance notes per jurisdiction. A light i18n seam (locale per region) is
// ready for translated dictionaries; copy ships in English today.
import { useEffect, useState } from "react";

export interface RegionInfo {
  id: string;
  label: string;
  locale: string;
  compliance: string; // localized trust/residency note
}

// The elan1 geo order: India → Singapore → US → Middle East → Europe.
export const SITE_REGIONS: RegionInfo[] = [
  // ⚠️ These strings previously read "Data resident in <region>" — five per-region ENFORCEMENT
  // claims. The platform ships `declared: true, enforced: false` for residency and runs
  // single-region today (its own routing table is labelled "demonstration"). So these state the
  // regulatory ALIGNMENT, which is true, and not a residency guarantee, which is not.
  { id: "in", label: "India", locale: "en-IN", compliance: "DPDP-aligned · residency declared per tenant" },
  { id: "sg", label: "Singapore", locale: "en-SG", compliance: "PDPA-aligned · residency declared per tenant" },
  { id: "us", label: "United States", locale: "en-US", compliance: "US data handling · sector controls" },
  { id: "me", label: "Middle East", locale: "en-AE", compliance: "Local data protection · residency declared per tenant" },
  { id: "eu", label: "Europe", locale: "en-IE", compliance: "GDPR-aligned · residency declared per tenant" },
];

const KEY = "elan1.region";
const EVENT = "elan1:region";

export function getRegion(): RegionInfo {
  try {
    const id = localStorage.getItem(KEY);
    return SITE_REGIONS.find((r) => r.id === id) ?? SITE_REGIONS[0];
  } catch {
    return SITE_REGIONS[0];
  }
}

export function setRegion(id: string): void {
  try {
    localStorage.setItem(KEY, id);
  } catch {
    /* session-only */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
}

/** React hook — re-renders when the region changes anywhere on the page. */
export function useRegion(): RegionInfo {
  const [region, setR] = useState<RegionInfo>(SITE_REGIONS[0]);
  useEffect(() => {
    setR(getRegion());
    const onChange = () => setR(getRegion());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);
  return region;
}
