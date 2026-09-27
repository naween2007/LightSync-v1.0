"use client";

import { AlertTriangle, Menu, Play, Square, Wifi } from "lucide-react";
import { useState } from "react";
import LedCountControl from "./LedCountControl";

export default function ProducerStudio() {
  const meters = [58, 84, 42, 96, 73, 62, 88, 45, 77, 91, 54, 68, 82, 49, 94, 64];
  const [ledCount, setLedCount] = useState(60);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const recommendationOutdated = ledCount !== 60;

  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 dark:border-white/10">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setDrawerOpen(!drawerOpen)} className="rounded-lg border border-slate-200/70 p-2 transition hover:border-cyan-400 dark:border-white/10" aria-label="Toggle Hardware & Setup drawer"><Menu size={18}/></button>
          <div><div className="text-sm font-semibold">Producer Studio</div><div className="text-xs text-slate-500">LightSync Control Surface</div></div>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-500"><Wifi size={13}/> WLED Connected</div>
      </div>
      <div className={`grid ${drawerOpen ? "lg:grid-cols-[255px_1fr]" : "grid-cols-1"}`}>
        {drawerOpen && (
          <aside className="border-b border-slate-200/70 p-4 dark:border-white/10 lg:border-b-0 lg:border-r">
            <div className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Hardware & Controls</div>
            <div className="mt-4"><LedCountControl value={ledCount} onChange={setLedCount}/></div>
            <div className="mt-3 space-y-2 text-sm">
              <PanelRow k="Brightness" v="78%" />
              <PanelRow k="Music sensitivity" v="65%" />
              <PanelRow k="Kick sensitivity" v="72%" />
              <PanelRow k="Effect speed" v="Auto" />
              <PanelRow k="Color palette" v="Neon Flux" />
              <PanelRow k="Frame rate" v="30 / 60 FPS" />
              <PanelRow k="Mode" v="Auto / Manual" />
            </div>
            <div className="mt-5 grid gap-2"><button className="btn-primary !py-2.5"><Play size={15} className="mr-2"/>Start Audio</button><button className="btn-secondary !py-2.5">Start Light Show</button><button className="btn-secondary !py-2.5"><Square size={14} className="mr-2"/>Stop</button></div>
          </aside>
        )}
        <div className="p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[["BPM","128"],["Energy","84%"],["Song Section","Drop"],["Current Effect","Aurora Flow"],["Kick","Detected"]].map(([k,v])=><div key={k} className="rounded-2xl border border-slate-200/70 p-3 dark:border-white/10"><div className="text-[11px] uppercase tracking-[.15em] text-slate-500">{k}</div><div className="mt-1 text-lg font-semibold">{v}</div></div>)}
          </div>
          <div className="mt-3 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
            <div className="mb-3 flex justify-between text-xs text-slate-500"><span>RGB LED Preview</span><span>Live output frame · 60 FPS</span></div>
            <div className="flex h-56 items-end gap-1 rounded-xl bg-[#050814] p-4 sm:gap-2">{meters.map((h,i)=><span key={i} className="flex-1 rounded-full bg-gradient-to-t from-violet-600 via-blue-500 to-cyan-300" style={{height:`${h}%`}} />)}</div>
          </div>
          {recommendationOutdated ? (
            <div className="mt-3 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-700 dark:text-amber-200">
              <div className="flex items-center gap-2 font-semibold"><AlertTriangle size={16}/> HARDWARE RECOMMENDATION OUTDATED</div>
              <p className="mt-1 text-xs leading-5">Your hardware recommendation was calculated for 60 LEDs. You are now using {ledCount} LEDs. Recalculate to update the recommended Power Adapter and controller guidance.</p>
              <button type="button" className="mt-3 rounded-lg border border-amber-400/30 px-3 py-1.5 text-xs font-semibold">RECALCULATE FOR {ledCount} LEDS</button>
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-slate-500">Setup Wizard values are saved into Producer Studio. Users can type the exact LED count, use +/− controls, or use the slider, with every value from 1–500 available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function PanelRow({k,v}:{k:string;v:string}){return <div className="flex items-center justify-between rounded-xl border border-slate-200/70 px-3 py-2 dark:border-white/10"><span className="text-slate-500">{k}</span><span className="font-medium">{v}</span></div>}
