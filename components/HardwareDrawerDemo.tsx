"use client";

import { AlertTriangle, Menu, RefreshCcw, X } from "lucide-react";
import { useState } from "react";

export default function HardwareDrawerDemo() {
  const [open, setOpen] = useState(true);
  const [recalculated, setRecalculated] = useState(false);

  return (
    <div className="relative min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950 text-white shadow-2xl dark:border-white/10">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <button type="button" onClick={() => setOpen(!open)} className="rounded-lg border border-white/10 p-2" aria-label="Toggle hardware drawer">{open ? <X size={17}/> : <Menu size={17}/>}</button>
        <div><div className="text-sm font-semibold">Producer Studio</div><div className="text-xs text-slate-400">Hardware & Setup drawer demo</div></div>
      </div>
      <div className="grid h-[330px] place-items-center bg-[radial-gradient(circle_at_70%_30%,rgba(34,211,238,.08),transparent_30%)] text-sm text-slate-500">Live studio workspace</div>
      <aside className={`absolute bottom-0 left-0 top-[57px] w-[300px] border-r border-white/10 bg-[#090e1e]/98 p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-300">HARDWARE & SETUP</div>
        <div className="mt-4 space-y-2 text-sm">
          {[["LED Strip","WS2812B"],["Voltage","5V"],["LED Count","60"],["Recommended Power Adapter","5V / 5A / 25W"],["Controller","WLED-compatible ESP32"]].map(([k,v]) => <div key={k} className="rounded-xl border border-white/10 p-3"><div className="text-[11px] text-slate-400">{k}</div><div className="mt-1 font-medium">{v}</div></div>)}
        </div>
        <div className="mt-3 grid gap-2"><button type="button" className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-2 text-xs font-semibold">OPEN SETUP WIZARD</button><button type="button" className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold" onClick={() => setRecalculated(true)}><RefreshCcw size={13} className="mr-1 inline"/> RECALCULATE FOR CURRENT LEDS</button></div>
      </aside>
      {!recalculated && <div className="absolute bottom-4 right-4 max-w-[320px] rounded-2xl border border-amber-400/30 bg-[#2a2112]/95 p-4"><div className="flex items-center gap-2 text-xs font-semibold text-amber-200"><AlertTriangle size={15}/> HARDWARE RECOMMENDATION OUTDATED</div><p className="mt-2 text-xs leading-5 text-amber-100/80">Your hardware recommendation was calculated for 60 LEDs. You are now using 300 LEDs.</p><button type="button" onClick={() => setRecalculated(true)} className="mt-3 rounded-lg border border-amber-300/30 px-3 py-1.5 text-xs font-semibold text-amber-100">RECALCULATE FOR 300 LEDs</button></div>}
      {recalculated && <div className="absolute bottom-4 right-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-200">Power Adapter and controller guidance updated.</div>}
    </div>
  );
}
