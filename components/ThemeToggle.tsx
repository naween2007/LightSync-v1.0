"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("lightsync-theme");
    const useDark = saved ? saved === "dark" : true;
    setDark(useDark);
    document.documentElement.classList.toggle("dark", useDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lightsync-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      onClick={toggleTheme}
      className="grid h-10 w-10 place-items-center rounded-xl border border-slate-300/80 bg-white/75 text-slate-700 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:text-white"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
