import { ArrowDown, Check, CheckCircle2, Cpu, Headphones, Lightbulb, PackageSearch, SlidersHorizontal, Sparkles } from "lucide-react";
import AudioSetupDemo from "./AudioSetupDemo";
import WledDeviceCard from "./WledDeviceCard";

const steps = [
  { n: 1, title: "Welcome to LightSync", icon: Sparkles, body: "Start the guided first-run setup for your lighting system." },
  { n: 2, title: "Buy your LED strip, power adapter and WLED ESP32", icon: Lightbulb, body: "Choose a lighting setup and LightSync will help calculate the LED count, power requirements, controller compatibility and shopping searches." },
  { n: 3, title: "Hardware Shopping", icon: PackageSearch, body: "Use region-aware Google searches for an LED strip, Power Adapter and WLED-compatible ESP32 controller. Shopping is optional." },
  { n: 4, title: "Configure WLED", icon: Cpu, body: "Find WLED, inspect the device information and compare the LED count saved in LightSync with the count reported by WLED." },
  { n: 5, title: "Device Test", icon: SlidersHorizontal, body: "Verify the connection and confirm that the LEDs respond to simple test frames before continuing." },
  { n: 6, title: "Audio Setup", icon: Headphones, body: "Capture Windows system output, verify the live frequency meters and confirm that the real-kick detector is ready." },
  { n: 7, title: "Your LightSync setup is ready.", icon: Check, body: "Open Producer Studio. Setup values are saved into the main interface and remain editable later." },
];

export default function SetupWizard() {
  return (
    <div className="mt-10 grid gap-4">
      {steps.map((step, i) => (
        <div key={step.n} className="grid gap-4 sm:grid-cols-[64px_1fr]">
          <div className="relative flex justify-center">
            <div className="z-10 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/20">
              <step.icon size={19} />
            </div>
            {i !== steps.length - 1 && <div className="absolute top-12 h-[calc(100%+1rem)] w-px bg-gradient-to-b from-cyan-400/70 to-violet-500/20" />}
          </div>
          <div className="feature-card">
            <div className="text-xs font-semibold uppercase tracking-[.2em] text-slate-500 dark:text-slate-400">Step {step.n}</div>
            <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{step.body}</p>

            {step.n === 2 && (
              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_.72fr]">
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {["LED Type · WS2812B", "Length · 5 m", "LED Density · 60 LEDs/m", "Total · 300 LEDs", "Voltage · 5V", "Shopping Region · Auto — Italy"].map((x) => <div key={x} className="rounded-xl border border-slate-200/70 px-3 py-2.5 text-xs font-medium dark:border-white/10">{x}</div>)}
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-xs font-medium text-cyan-700 dark:text-cyan-200">Recommended Power Adapter · Calculated automatically</div>
                  <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-xs font-medium text-cyan-700 dark:text-cyan-200">Recommended Controller · WLED-compatible ESP32</div>
                </div>
                <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
                  <button type="button" className="btn-secondary w-full !border-cyan-400/30 !bg-cyan-400/10 !py-2.5 text-xs">I ALREADY BOUGHT IT</button>
                  <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300/80">Already have your LED strip, Power Adapter and WLED controller? Skip the buying recommendations and continue directly to WLED configuration.</p>
                </div>
              </div>
            )}

            {step.n === 3 && (
              <div className="mt-5 grid gap-4 lg:grid-cols-[.45fr_1fr]">
                <div className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                  <div className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Optional shopping flow</div>
                  <FlowItem label="Buy Hardware"/><ArrowDown className="mx-auto my-1 text-cyan-500" size={15}/>
                  <FlowItem label="I Already Bought It"/><ArrowDown className="mx-auto my-1 text-cyan-500" size={15}/>
                  <FlowItem label="Configure WLED"/><ArrowDown className="mx-auto my-1 text-cyan-500" size={15}/>
                  <FlowItem label="Device Test"/><ArrowDown className="mx-auto my-1 text-cyan-500" size={15}/>
                  <FlowItem label="Audio Setup"/><ArrowDown className="mx-auto my-1 text-cyan-500" size={15}/>
                  <FlowItem label="Ready"/>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["LED STRIP", "WS2812B 5V 5m 300 LEDs Italy"],
                    ["POWER ADAPTER", "5V 20A LED power adapter Italy"],
                    ["WLED ESP32 CONTROLLER", "ESP32 WLED addressable LED controller Italy"],
                  ].map(([label, search]) => <div key={label} className="rounded-2xl border border-slate-200/70 p-4 dark:border-white/10"><div className="text-[11px] font-semibold tracking-[.16em] text-cyan-600 dark:text-cyan-300">{label}</div><div className="mt-3 text-xs leading-5 text-slate-500">“{search}”</div><div className="mt-3 flex gap-2"><span className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] dark:border-white/10">Search Google</span><span className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] dark:border-white/10">Copy Search</span></div></div>)}
                  <div className="sm:col-span-3 rounded-xl bg-slate-950/[0.04] px-3 py-2 text-xs text-slate-500 dark:bg-white/[0.04]">🌍 Shopping Region: Auto — Italy · Automatic selection uses the Windows country/region setting.</div>
                </div>
              </div>
            )}

            {step.n === 4 && <div className="mt-5"><WledDeviceCard /></div>}

            {step.n === 5 && (
              <div className="mt-5 rounded-2xl border border-slate-200/70 p-4 dark:border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-3"><button className="btn-secondary !px-3 !py-2 text-xs">FIND WLED</button><div className="flex flex-wrap gap-2 text-xs text-emerald-500"><span>✓ WLED Connected</span><span>✓ LEDs Responding</span></div></div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"><button className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2.5 text-xs font-semibold text-red-500">TEST RED</button><button className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2.5 text-xs font-semibold text-emerald-500">TEST GREEN</button><button className="rounded-xl border border-blue-400/30 bg-blue-500/10 px-3 py-2.5 text-xs font-semibold text-blue-500">TEST BLUE</button><button className="rounded-xl border border-slate-300 px-3 py-2.5 text-xs font-semibold dark:border-white/10">TEST OFF</button></div>
              </div>
            )}

            {step.n === 6 && <div className="mt-5"><AudioSetupDemo /></div>}
            {step.n === 7 && <button className="btn-primary mt-4">Open Producer Studio</button>}
          </div>
        </div>
      ))}
    </div>
  );
}

function FlowItem({ label }: { label: string }) {
  return <div className="rounded-xl border border-slate-200/70 bg-white/50 px-3 py-2 text-center text-xs font-semibold dark:border-white/10 dark:bg-white/[0.03]">{label}</div>;
}
