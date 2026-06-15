// lib/i18n.ts — i18n SCAFFOLD (WS3.5). The seam for localized copy: a string table keyed by locale,
// resolved from the selected region's locale (lib/region.ts). English ships today; add locale tables
// here as markets open — no page changes needed (pages call `t(key)`).
import { useRegion } from "./region";

type Dict = Record<string, string>;

const en: Dict = {
  "cta.discovery": "Start a Discovery Sprint",
  "cta.demo": "See a live agent",
  "nav.login": "Log in",
};

// Locale tables (base language code → dict). Only English today; the structure is ready for more.
const DICTS: Record<string, Dict> = { en };

export function useT(): (key: string) => string {
  const region = useRegion();
  const base = region.locale.split("-")[0];
  const dict = DICTS[base] ?? en;
  return (key: string) => dict[key] ?? en[key] ?? key;
}
