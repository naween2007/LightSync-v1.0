"use client";

import { AlertTriangle, CheckCircle2, Radio } from "lucide-react";
import { useState } from "react";

export default function WledDeviceCard() {
  const [mismatchCount, setMismatchCount] = useState(60);
  const wledMismatchCount = 300;
  const mismatchResolved = mismatchCount === wledMismatchCount;

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Configure WLED</div>
          <div className="mt-1 flex items-center gap-2 font-semibold text-emerald-500"><CheckCircle2 size={16}/> WLED Device Found ✓</div>
        </div>
        <button type="button" className="btn-secondary !px-3 !py-2 text-xs"><Radio size={13} className="mr-1.5"/> Find WLED</button>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {[["Device", "WLED ESP32"],["IP", "192.168.1.xxx"],["WLED Version", "0.xx.x"]].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200/70 p-3 dark:border-white/10">
            <div className="text-[11px] text-slate-500">{label}</div>
            <div className="mt-1 text-sm font-medium">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[.15em] text-slate-500">Matched example</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Value label="LightSync LEDs" value="60" />
            <Value label="WLED LEDs" value="60" />
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-300"><CheckCircle2 size={16}/> LED counts match</div>
        </div>

        <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[.15em] text-slate-500">Mismatch example</div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Value label="LightSync LEDs" value={String(mismatchCount)} />
            <Value label="WLED LEDs" value={String(wledMismatchCount)} />
          </div>
          {mismatchResolved ? (
            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-300"><CheckCircle2 size={16}/> LED counts match</div>
          ) : (
            <div className="mt-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-200"><AlertTriangle size={16}/> LED COUNT MISMATCH</div>
              <button type="button" onClick={() => setMismatchCount(wledMismatchCount)} className="mt-3 rounded-lg border border-amber-400/40 px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-100">USE WLED LED COUNT</button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">LightSync compares the configured LED count with the LED count reported by WLED. The current LightSync configuration system supports up to 500 LEDs.</p>
    </div>
  );
}

function Value({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200/70 bg-white/45 p-3 dark:border-white/10 dark:bg-white/[0.03]"><div className="text-[10px] text-slate-500">{label}</div><div className="mt-1 text-sm font-semibold">{value}</div></div>;
}
