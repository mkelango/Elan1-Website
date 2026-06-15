// components/LiveAgentDemo.tsx — WS1.6 + WS3.3: a real, interactive, GOVERNED agent run, in the browser.
// Scenario-driven (see content/demos.ts) so any offering can show "see it work". It faithfully mirrors
// the platform's run path (K2 → K3 grounding → K4 skill → K7 governance → K5 human approval → act →
// K6 audit → assure1 Trust Mark) — deterministic, illustrative, no backend, no real data.
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "./primitives";
import { DEFAULT_SCENARIO, type DemoStep, type Scenario, type Tone } from "../content/demos";

const TONE_CLASS: Record<Tone, string> = {
  dim: "text-paper/50",
  tool: "text-cyan",
  skill: "text-violet",
  out: "text-paper/85",
  govern: "text-clay",
  ok: "text-green",
  mark: "text-green",
};

type Phase = "idle" | "pre" | "awaiting" | "post" | "done";

export function LiveAgentDemo({ scenario = DEFAULT_SCENARIO }: { scenario?: Scenario }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [shown, setShown] = useState<DemoStep[]>([]);
  const [cost, setCost] = useState(0);
  const timer = useRef<number | null>(null);

  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };

  const stream = useCallback((steps: DemoStep[], i: number, done: () => void) => {
    if (i >= steps.length) {
      done();
      return;
    }
    const s = steps[i];
    setShown((prev) => [...prev, s]);
    setCost((c) => c + (s.cost ?? 0));
    timer.current = window.setTimeout(() => stream(steps, i + 1, done), 620);
  }, []);

  const start = () => {
    clear();
    setShown([]);
    setCost(0);
    setPhase("pre");
    stream(scenario.pre, 0, () => setPhase("awaiting"));
  };

  const approve = () => {
    setShown((prev) => [...prev, { surface: "K5", text: "✓ approved (human-in-the-loop)", tone: "ok" }]);
    setPhase("post");
    stream(scenario.post, 0, () => setPhase("done"));
  };

  const reject = () => {
    clear();
    setShown((prev) => [...prev, { surface: "K5", text: "✗ rejected — nothing acted (gate held)", tone: "govern" }]);
    setPhase("done");
  };

  const reset = () => {
    clear();
    setShown([]);
    setCost(0);
    setPhase("idle");
  };

  // reset when the scenario changes
  useEffect(() => {
    reset();
    return () => clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  return (
    <div className="overflow-hidden rounded-card border border-lineDark bg-obsidian shadow-lift">
      <div className="flex items-center gap-2 border-b border-lineDark px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
        <span className="ml-2 font-mono text-[11px] text-paper/50">{scenario.title}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wide text-paper/40">illustrative · no real data</span>
      </div>

      <div className="min-h-[260px] space-y-2 p-5 font-mono text-[12.5px]">
        {phase === "idle" && (
          <div className="flex h-[220px] flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-sm text-paper/70">{scenario.intro}</p>
            <button onClick={start} className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-ink hover:opacity-90">
              ▶ Run the agent
            </button>
          </div>
        )}

        <AnimatePresence initial={false}>
          {shown.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-2.5 rounded-lg bg-white/[0.04] px-3 py-2"
            >
              <span className="mt-0.5 shrink-0 font-mono text-[10px] font-bold text-paper/35">{s.surface}</span>
              <span className={TONE_CLASS[s.tone]}>{s.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {phase === "awaiting" && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 rounded-lg border border-clay/40 bg-clay/[0.10] p-3">
            <div className="flex items-center gap-2 text-paper">
              <Icon.Shield className="h-4 w-4 text-clay" />
              <span className="font-sans text-sm font-semibold">{scenario.gate.title}</span>
            </div>
            <p className="mt-1 font-sans text-xs text-paper/70">{scenario.gate.body}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={approve} className="rounded-full bg-green px-4 py-1.5 text-xs font-semibold text-ink hover:opacity-90">
                {scenario.gate.approve}
              </button>
              <button onClick={reject} className="rounded-full border border-paper/25 px-4 py-1.5 text-xs font-medium text-paper/80 hover:text-paper">
                Reject
              </button>
            </div>
          </motion.div>
        )}

        {phase === "done" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 flex flex-wrap items-center gap-3 border-t border-lineDark pt-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/[0.12] px-3 py-1 font-mono text-[11px] font-medium text-green">
              <Icon.Shield className="h-3.5 w-3.5" /> Trust Mark · eval passed
            </span>
            <button onClick={reset} className="font-sans text-xs text-paper/70 underline underline-offset-2 hover:text-paper">
              Run again
            </button>
          </motion.div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-lineDark px-4 py-2.5 font-mono text-[10px] uppercase tracking-wide text-paper/40">
        <span>human-in-the-loop · grounded · audited</span>
        <span>~{cost.toLocaleString()} tokens (illustrative)</span>
      </div>
    </div>
  );
}
