import { AudioLines, Cpu, Monitor, Network, Radio, Zap } from "lucide-react";

const requirements = [
  ["Operating System", "Windows 10 or Windows 11, 64-bit", Monitor],
  ["Network", "Wi-Fi or local network connection to the WLED device", Network],
  ["Lighting", "WLED-compatible ESP32 controller", Cpu],
  ["LEDs", "Compatible addressable LED strip", Zap],
  ["Audio", "Windows PC audio output", AudioLines],
  ["Current LightSync configuration", "1–500 LEDs", Radio],
] as const;

export default function SystemRequirements() {
  return (
    <section className="py-20" aria-labelledby="system-requirements-title">
      <div className="container-shell">
        <div className="section-kicker">System Requirements</div>
        <h2 id="system-requirements-title" className="section-title">Built for the current Windows release.</h2>
        <p className="section-copy">These requirements describe the current tested LightSync v1.0.0 Windows workflow without claiming support for untested operating systems or hardware.</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requirements.map(([title, value, Icon]) => (
            <div key={title} className="feature-card !p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-cyan-500">
                <Icon size={19} />
              </div>
              <div className="mt-4 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">{title}</div>
              <div className="mt-2 text-sm font-medium leading-6">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
