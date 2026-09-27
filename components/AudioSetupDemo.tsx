"use client";

import { CheckCircle2, Headphones, Square } from "lucide-react";
import { useState } from "react";
import KickDetectorDemo from "./KickDetectorDemo";

const meters = [
  ["Volume", 72],
  ["Bass", 64],
  ["Mids", 45],
  ["Treble", 51],
] as const;

export default function AudioSetupDemo() {
  const [running, setRunning] = useState(true);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_.78fr]">
      <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">PC AUDIO CAPTURE</div>
            <div className="mt-1 flex items-center gap-2 font-semibold"><Headphones size={16} className="text-cyan-500"/> {running ? "Capturing PC audio" : "PC audio stopped"}</div>
            <div className="mt-1 text-xs text-slate-500">System output / loopback</div>
          </div>
          <button type="button" onClick={() => setRunning(!running)} className={running ? "btn-secondary !px-3 !py-2 text-xs" : "btn-primary !px-3 !py-2 text-xs"}>
            {running ? <><Square size={13} className="mr-1.5"/> Stop PC Audio</> : "Start PC Audio"}
          </button>
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300/80">LightSync listens to the audio playing on the Windows PC. A microphone is not required for normal system-audio capture.</p>
        <div className="mt-4 space-y-3">
          {meters.map(([label, value]) => (
            <div key={label}>
              <div className="mb-1.5 flex justify-between text-xs"><span>{label}</span><span className="text-slate-500">{running ? value : 0}%</span></div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-[width] duration-200" style={{ width: `${running ? value : 0}%` }}/></div>
            </div>
          ))}
        </div>
        <div className={`mt-4 rounded-xl border p-3 text-sm ${running ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300" : "border-slate-300/50 text-slate-500 dark:border-white/10"}`}>
          <div className="flex items-center gap-2 font-semibold">{running && <CheckCircle2 size={16}/>} {running ? "AUDIO READY" : "WAITING FOR AUDIO"}</div>
          <div className="mt-1 text-xs leading-5">{running ? "LightSync is receiving PC audio and the real-kick detector is ready." : "Start PC Audio to begin system-output capture."}</div>
        </div>
      </div>
      <KickDetectorDemo />
    </div>
  );
}
