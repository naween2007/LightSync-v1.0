"use client";

import type { ChangeEvent } from "react";

const regions = [
  "Italy",
  "Germany",
  "France",
  "Spain",
  "United Kingdom",
  "United States",
  "Sri Lanka",
  "India",
  "Japan",
  "Australia",
  "Other / Custom",
];

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ShoppingRegionSelector({ value, onChange }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <label className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">🌍 Shopping Region</label>
      <select
        value={value}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 dark:border-white/10 dark:bg-[#0a1022]"
        aria-label="Shopping region"
      >
        {regions.map((region) => (
          <option key={region} value={region}>{region === "Italy" ? "Auto — Italy" : region}</option>
        ))}
      </select>
      <p className="mt-3 text-xs leading-5 text-slate-500">
        Automatic region selection uses the Windows country/region setting. The country can also be changed manually.
      </p>
    </div>
  );
}
