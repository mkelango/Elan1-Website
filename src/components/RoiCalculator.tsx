// components/RoiCalculator.tsx — the value worksheet.
//
// It does arithmetic on the visitor's own assumptions and shows every step of it. It is not a
// forecast, not a quote, and not financial advice. All of the reasoning about what it may and may
// not say lives in content/roi.ts — read that file before changing anything here, because the
// constraints are the point and several of them exist because an earlier version broke them.
//
// Three things about this component that look like style choices and are not:
//
//   1. THE SHARE SLIDER STARTS AT ZERO AND THE RESULT STAYS BLANK UNTIL IT MOVES. This used to
//      multiply by a per-band automation rate and print "a governed agent removes ~50% of this
//      toil" — an unmeasured elan1 claim beside a currency figure. We supply the multiplication,
//      never the assumption. Do not reintroduce a default rate.
//   2. THE ARITHMETIC IS RENDERED, NOT HIDDEN. A single large number reads as a finding. The same
//      number with its four multiplications above it reads as what it is. Showing the working is
//      the honesty mechanism, so it is not an optional flourish to collapse later.
//   3. THERE IS NO CURRENCY SYMBOL AND NO ROUNDING TO "1.2M". A symbol picks a market; a rounded
//      headline makes a slider guess look like a measurement. The exact product of four inputs,
//      printed in full, is self-evidently a calculation.
//
// The panel is deliberately self-contained: the limits render inside it rather than being left for
// the host page to add. A caveat that depends on someone remembering to place it is not a caveat.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Band } from "../content/bands";
import {
  ROI_CANNOT,
  ROI_DISCLOSURE,
  ROI_FRAME,
  ROI_INPUTS,
  ROI_NOT_A_RETURN,
  ROI_STEPS,
  ROI_WOULD_MAKE_IT_REAL,
  type RoiInput,
  type RoiNote,
  type RoiStep,
} from "../content/roi";

/** Whole numbers with thousands separators. No symbol, no magnitude suffix — see note 3 above. */
const num = (n: number) => Math.round(n).toLocaleString();

/**
 * Hoisted out of the component on purpose. Declaring this inline made React remount every slider
 * on each keystroke of the drag, which drops focus and makes keyboard adjustment unusable.
 */
function Row({
  input,
  value,
  set,
}: {
  input: RoiInput;
  value: number;
  set: (n: number) => void;
}) {
  return (
    <div>
      <label className="block">
        <span className="flex items-baseline justify-between">
          <span className="text-sm text-slate">{input.label}</span>
          <span className="font-mono text-sm font-semibold text-ink">
            {value}
            <span className="text-muted"> {input.unit}</span>
          </span>
        </span>
        <input
          type="range"
          min={input.min}
          max={input.max}
          step={input.step}
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          className="mt-2 w-full accent-clayDeep"
          aria-label={input.label}
        />
      </label>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{input.yours}</p>
    </div>
  );
}

function StepLine({
  label,
  note,
  expression,
  result,
  emphasis = false,
}: {
  label: string;
  note: string;
  expression: string;
  result: string;
  emphasis?: boolean;
}) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2 last:border-0">
      <span className="min-w-0">
        <span className={`block text-sm ${emphasis ? "font-medium text-ink" : "text-slate"}`}>
          {label}
        </span>
        <span className="block font-mono text-[11px] text-muted">
          {note} · {expression}
        </span>
      </span>
      <span
        className={`shrink-0 font-mono text-sm ${emphasis ? "font-semibold text-ink" : "text-ink"}`}
      >
        {result}
      </span>
    </li>
  );
}

function NoteList({ label, notes }: { label: string; notes: RoiNote[] }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-muted">{label}</p>
      <ul className="mt-3 space-y-3">
        {notes.map((n) => (
          <li key={n.title}>
            <p className="text-sm font-medium text-ink">{n.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-slate">{n.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RoiCalculator({ band }: { band: Band }) {
  const [people, setPeople] = useState(band.defaults.people);
  const [hours, setHours] = useState(band.defaults.hoursPerWeek);
  const [cost, setCost] = useState(band.defaults.hourlyCost);
  // Starts at 0 on purpose: until the visitor states an assumption, there is no number to show.
  const [share, setShare] = useState(0);

  // Keyed by the input union, so adding an id in content/roi.ts without wiring state here is a
  // type error rather than a slider that silently does nothing.
  const value: Record<RoiInput["id"], number> = { people, hours, cost, share };
  const setter: Record<RoiInput["id"], (n: number) => void> = {
    people: setPeople,
    hours: setHours,
    cost: setCost,
    share: setShare,
  };

  const step = useMemo(() => {
    const weekly = people * hours;
    const weeklyShare = weekly * (share / 100);
    const annualHours = weeklyShare * 52;
    return {
      weekly,
      weeklyShare,
      annualHours,
      annualValue: Math.max(0, annualHours * cost),
    };
  }, [people, hours, cost, share]);

  const isSet = share > 0;

  // The rendered expression and result for each declared step. Built here rather than in content
  // so the working shown is literally the working done — there is no second copy of the formula to
  // drift from the one that computes.
  const shown: Record<RoiStep["id"], { expression: string; result: string }> = {
    weekly: { expression: `${people} × ${hours}`, result: `${num(step.weekly)} hrs` },
    share: {
      expression: `${num(step.weekly)} × ${share}%`,
      result: isSet ? `${num(step.weeklyShare)} hrs` : "—",
    },
    annual: {
      expression: `${isSet ? num(step.weeklyShare) : "—"} × 52`,
      result: isSet ? `${num(step.annualHours)} hrs` : "—",
    },
    value: {
      expression: `${isSet ? num(step.annualHours) : "—"} × ${cost}`,
      result: isSet ? num(step.annualValue) : "—",
    },
  };

  return (
    <div className="rounded-card border border-line bg-surface p-7 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          className="font-mono text-[11px] uppercase tracking-kicker"
          style={{ color: band.accent }}
        >
          {ROI_FRAME.panelLabel} · {band.name}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
          {ROI_FRAME.standingTag}
        </span>
      </div>

      <h3 className="display mt-4 text-2xl text-ink">{ROI_FRAME.heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{ROI_FRAME.lede}</p>

      {/* ——— The inputs ——— */}
      <div className="mt-7 grid gap-6">
        {ROI_INPUTS.map((input) => (
          <Row key={input.id} input={input} value={value[input.id]} set={setter[input.id]} />
        ))}
      </div>

      {/* ——— The working, shown ——— */}
      <div className="mt-8 rounded-card border border-line bg-paper/60 p-5">
        <p className="font-mono text-[10px] uppercase tracking-wide text-muted">The arithmetic</p>
        <ul className="mt-2">
          {ROI_STEPS.map((s) => (
            <StepLine
              key={s.id}
              label={s.label}
              note={s.note}
              expression={shown[s.id].expression}
              result={shown[s.id].result}
              emphasis={s.id === "value"}
            />
          ))}
        </ul>
      </div>

      {/* ——— The figure ——— */}
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-card border border-line bg-paper/60 p-5 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
            {ROI_FRAME.outputLabel}
          </p>
          <p className="display mt-1 text-3xl" style={{ color: band.accent }}>
            {isSet ? num(step.annualValue) : "—"}
          </p>
          <p className="mt-1 text-[11px] text-muted">{ROI_FRAME.outputUnitNote}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-muted">
            {ROI_FRAME.hoursLabel}
          </p>
          <p className="display mt-1 text-3xl text-ink">{isSet ? num(step.annualHours) : "—"}</p>
          <p className="mt-1 text-[11px] text-muted">on your share, before anything is scoped</p>
        </div>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-muted">
        {isSet ? ROI_FRAME.computedState : ROI_FRAME.blankState}
      </p>

      {/* ——— The caveat that stops this being a claim ——— */}
      <div className="mt-6 rounded-card border border-clay/40 bg-clay/10 p-5">
        <p className="text-sm font-semibold text-ink">{ROI_NOT_A_RETURN.title}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate">{ROI_NOT_A_RETURN.body}</p>
      </div>

      {/* ——— The limits, in full and never collapsed ——— */}
      <div className="mt-7 space-y-7 border-t border-line pt-7">
        <NoteList label="What this cannot tell you" notes={ROI_CANNOT} />
        <NoteList label="What a real number would take" notes={ROI_WOULD_MAKE_IT_REAL} />
      </div>

      <p className="mt-7 border-t border-line pt-4 font-mono text-[10px] leading-relaxed text-muted">
        {ROI_DISCLOSURE}
      </p>

      <Link to="/get-started" className="btn-primary mt-5 w-full">
        Put a baseline behind this in a Discovery Sprint
      </Link>
    </div>
  );
}