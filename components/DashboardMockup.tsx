import { Activity, Gauge, Radio, SlidersHorizontal, Wifi } from "lucide-react";

const bars = [36, 58, 82, 44, 74, 92, 64, 47, 78, 88, 54, 69, 98, 72, 42, 84, 60, 75, 94, 52];

export default function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-tr from-violet-600/14 via-cyan-400/8 to-blue-500/12 blur-xl" />
      <div className="glass relative overflow-hidden rounded-3xl p-4 sm:p-5">
        <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-3 dark:border-white/10">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Producer Studio</div>
            <div className="mt-1 text-sm font-semibold">Live Light Engine</div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
            <Wifi size={13} /> WLED Connected
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-4">
          {[
            ["BPM", "128", Gauge],
            ["Energy", "84%", Activity],
            ["Section", "Drop", Radio],
            ["Kick", "Detected", SlidersHorizontal],
          ].map(([label, value, Icon]: any) => (
            <div key={label} className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/[0.035]">
              <Icon size={15} className="mb-3 text-cyan-500" />
              <div className="text-[11px] uppercase tracking-[.16em] text-slate-500 dark:text-slate-400">{label}</div>
              <div className="mt-1 text-lg font-semibold">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.035]">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Live LED Preview</span><span>60 FPS</span>
          </div>
          <div className="flex h-28 items-end gap-1 rounded-xl bg-slate-950/95 p-3">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-violet-600 via-blue-500 to-cyan-300"
                style={{ height: `${h}%`, opacity: 0.78 + ((i % 3) * 0.08) }}
              />
            ))}
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Control label="Brightness" value="78%" width="78%" />
          <Control label="Music sensitivity" value="65%" width="65%" />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-xl bg-violet-500/10 px-3 py-2 font-semibold text-violet-500">Auto Mode</div>
          <div className="rounded-xl bg-cyan-500/10 px-3 py-2 font-semibold text-cyan-500">Aurora Flow</div>
          <div className="rounded-xl bg-blue-500/10 px-3 py-2 font-semibold text-blue-500">128 BPM</div>
        </div>
      </div>
      <div className="led-strip mx-auto mt-5 h-2 w-[86%] rounded-full" />
    </div>
  );
}

function Control({ label, value, width }: { label: string; value: string; width: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 p-3 dark:border-white/10">
      <div className="mb-2 flex justify-between text-xs"><span>{label}</span><span className="text-slate-500">{value}</span></div>
      <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width }} />
      </div>
    </div>
  );
}
