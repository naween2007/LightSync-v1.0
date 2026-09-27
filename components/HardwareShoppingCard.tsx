"use client";

import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  search: string;
};

export default function HardwareShoppingCard({ title, search }: Props) {
  const [copied, setCopied] = useState(false);

  async function copySearch() {
    try {
      await navigator.clipboard.writeText(search);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="text-[11px] font-semibold uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300">{title}</div>
      <div className="mt-3 min-h-14 rounded-xl bg-slate-950/[0.045] p-3 text-sm leading-5 dark:bg-white/[0.045]">“{search}”</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(search)}`}
          target="_blank"
          rel="noreferrer"
          className="btn-secondary !px-3 !py-2 text-xs"
        >
          <ExternalLink size={13} className="mr-1.5" /> Search Google
        </a>
        <button type="button" onClick={copySearch} className="btn-secondary !px-3 !py-2 text-xs">
          {copied ? <Check size={13} className="mr-1.5" /> : <Copy size={13} className="mr-1.5" />}
          {copied ? "Copied" : "Copy Search"}
        </button>
      </div>
    </div>
  );
}
