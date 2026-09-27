import { ArrowDown, CheckCircle2, MonitorCog } from "lucide-react";

const firstRun = ["LightSync Launch", "Setup Wizard", "Configure hardware", "Configure WLED", "Test LEDs", "Configure Audio", "Ready", "Producer Studio"];

export default function FirstRunFlow() {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <div className="feature-card">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300"><MonitorCog size={16}/> New computer / first install</div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {firstRun.map((step, index) => (
            <div key={step} className="relative rounded-xl border border-slate-200/70 p-3 text-sm font-medium dark:border-white/10">
              <div className="text-[10px] uppercase tracking-[.15em] text-slate-500">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-1">{step}</div>
              {index < firstRun.length - 1 && <ArrowDown size={13} className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 text-cyan-500 sm:hidden"/>}
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-300/80">The Setup Wizard appears automatically on the first launch of a new LightSync installation. Once setup is completed, future launches open Producer Studio directly.</p>
      </div>
      <div className="feature-card bg-gradient-to-br from-emerald-500/10 to-cyan-400/10">
        <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-300"><CheckCircle2 size={18}/> Future LightSync Launch</div>
        <div className="mt-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-5 text-center">
          <div className="text-xs uppercase tracking-[.18em] text-slate-500">Launch</div>
          <ArrowDown size={18} className="mx-auto my-3 text-cyan-500"/>
          <div className="text-xl font-semibold">Producer Studio</div>
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">Users can rerun the Setup Wizard later from Hardware & Setup.</p>
      </div>
    </div>
  );
}
