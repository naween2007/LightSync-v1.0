"use client";

import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const nav = [
  ["Home", "#home"],
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
  ["Hardware", "#hardware"],
  ["Setup", "#setup"],
  ["Screenshots", "#screenshots"],
  ["FAQ", "#faq"],
  ["Download", "#download"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 shadow-sm dark:border-white/5 dark:bg-[#050816]/95">
      <div className="container-shell flex h-16 items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/20">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="text-lg">LightSync</span>
        </a>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-slate-600 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <a href="#download" className="btn-primary">Download</a>
        </div>

        <button className="rounded-lg p-2 lg:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="container-shell border-t border-slate-200/70 py-4 dark:border-white/5 lg:hidden">
          <nav className="grid gap-2">
            {nav.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-900/5 dark:hover:bg-white/5">
                {label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 sm:hidden">
              <ThemeToggle />
              <a href="#download" className="btn-primary flex-1">Download</a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
