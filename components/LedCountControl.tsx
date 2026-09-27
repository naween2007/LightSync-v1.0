"use client";

import type { ChangeEvent } from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function LedCountControl({ value, onChange }: Props) {
  const clamp = (next: number) => onChange(Math.max(1, Math.min(500, Math.round(next || 1))));

  return (
    <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
      <div className="text-[11px] font-semibold uppercase tracking-[.16em] text-slate-500">LED COUNT</div>
      <div className="mt-3 grid grid-cols-[42px_1fr_42px] gap-2">
        <button type="button" onClick={() => clamp(value - 1)} className="rounded-xl border border-slate-300 py-2 font-semibold transition hover:border-cyan-400 dark:border-white/10">−</button>
        <input
          type="number"
          min={1}
          max={500}
          value={value}
          onChange={(event: ChangeEvent<HTMLInputElement>) => clamp(Number(event.target.value))}
          className="min-w-0 rounded-xl border border-slate-300 bg-transparent px-3 text-center font-semibold outline-none focus:border-cyan-400 dark:border-white/10"
          aria-label="Exact LED count"
        />
        <button type="button" onClick={() => clamp(value + 1)} className="rounded-xl border border-slate-300 py-2 font-semibold transition hover:border-cyan-400 dark:border-white/10">+</button>
      </div>
      <input
        type="range"
        min={1}
        max={500}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => clamp(Number(event.target.value))}
        className="mt-4 w-full accent-cyan-500"
        aria-label="LED count slider"
      />
      <div className="mt-2 text-xs text-slate-500">1–500 LEDs • exact value</div>
    </div>
  );
}
