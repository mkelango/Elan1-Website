// components/RegionSwitcher.tsx — WS3.5: pick a region; shows the localized trust/compliance note.
import { SITE_REGIONS, setRegion, useRegion } from "../lib/region";

export function RegionSwitcher() {
  const region = useRegion();
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">Region</span>
        <select
          value={region.id}
          onChange={(e) => setRegion(e.target.value)}
          aria-label="Select your region"
          className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink outline-none focus:border-clayDeep"
        >
          {SITE_REGIONS.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>
      </label>
      <span className="font-mono text-[11px] text-muted">{region.compliance}</span>
    </div>
  );
}
