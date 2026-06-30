// components/RoiCalculator.tsx — WS3.1: a band-aware, interactive ROI estimator. Produces an
// ILLUSTRATIVE annual value of removing manual toil with a governed agent. Not financial advice; no PII.
// Routes the visitor to the Discovery Sprint to validate the number for real.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Band } from "../content/bands";

const fmt = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n / 1000)}k`;

export function RoiCalculator({ band }: { band: Band }) {
  const [people, setPeople] = useState(band.defaults.people);
  const [hours, setHours] = useState(band.defaults.hoursPerWeek);
  const [cost, setCost] = useState(band.defaults.hourlyCost);

  const { annual, hoursBack } = useMemo(() => {
    const weeklyHoursAutomated = people * hours * band.automation;
    return {
      annual: Math.max(0, weeklyHoursAutomated * 52 * cost),
      hoursBack: Math.round(weeklyHoursAutomated * 52),
    };
  }, [people, hours, cost, band.automation]);

  const Row = ({ label, value, set, min, max, step, suffix }: {
    label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; suffix: string;
  }) => (
    <label className="block">
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-slate">{label}</span>
        <span className="font-mono text-sm font-semibold text-ink">
          {value}
          <span className="text-muted"> {suffix}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => set(Number(e.target.value))}
        className="mt-2 w-full accent-clayDeep"
        aria-label={label}
      />
    </label>
  );

  return (
    <div className="rounded-card border border-line bg-surface p-7 shadow-card">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-kicker" style={{ color: band.accent }}>
          ROI estimator · {band.name}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">illustrative · not advice</span>
      </div>

      <div className="mt-6 grid gap-5">
        <Row label="People doing the task" value={people} set={setPeople} min={1} max={200} step={1} suffix="people" />
        <Row label="Hours each / week on it" value={hours} set={setHours} min={1} max={40} step={1} suffix="hrs" />
        <Row label="Loaded hourly cost" value={cost} set={setCost} min={5} max={120} step={1} suffix="$/hr" />
      </div>

      <div className="mt-7 grid grid-cols-2 gap-4 rounded-card border border-line bg-paper/60 p-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Annual value (illustrative)</p>
          <p className="display mt-1 text-3xl" style={{ color: band.accent }}>{fmt(annual)}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">Hours returned / year</p>
          <p className="display mt-1 text-3xl text-ink">{hoursBack.toLocaleString()}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">
        A governed agent removes ~{Math.round(band.automation * 100)}% of this toil (humans still decide).
        Figures are illustrative planning constructs, not a guarantee or financial advice.
      </p>

      <Link to="/get-started" className="btn-primary mt-5 w-full">
        Validate this in a Discovery Sprint
      </Link>
    </div>
  );
}
