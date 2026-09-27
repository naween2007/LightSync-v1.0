import { Activity } from "lucide-react";

export default function KickDetectorDemo() {
  return (
    <div className="rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-cyan-400/5 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-[.18em] text-violet-600 dark:text-violet-300">REAL KICK DETECTOR</div>
        <Activity size={16} className="text-cyan-500"/>
      </div>
      <div className="mt-4 rounded-xl bg-slate-950 px-4 py-5 text-center text-white">
        <div className="text-xs uppercase tracking-[.22em] text-cyan-300">KICK DETECTED</div>
        <div className="mt-2 text-3xl font-semibold">87%</div>
        <div className="text-xs text-slate-400">Kick Confidence</div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">Kick flashes react only to kicks detected from the live PC audio signal. BPM and rhythm timing do not trigger the real kick flash.</p>
    </div>
  );
}
