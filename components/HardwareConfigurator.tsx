"use client";

import { Check, Copy, Cpu, Gauge, Lightbulb, PlugZap } from "lucide-react";
import { useMemo, useState, type ChangeEvent } from "react";
import HardwareShoppingCard from "./HardwareShoppingCard";
import ShoppingRegionSelector from "./ShoppingRegionSelector";

const ledTypes = [
  "WS2812B",
  "WS2812B ECO",
  "SK6812 RGBW",
  "WS2815",
  "Custom compatible 5V setup",
  "Custom compatible 12V setup",
];

const planningWattsPerLed: Record<string, number> = {
  "WS2812B": 0.30,
  "WS2812B ECO": 0.25,
  "SK6812 RGBW": 0.35,
  "WS2815": 0.24,
  "Custom compatible 5V setup": 0.30,
  "Custom compatible 12V setup": 0.24,
};

export default function HardwareConfigurator() {
  const [ledType, setLedType] = useState("WS2812B");
  const [length, setLength] = useState(5);
  const [density, setDensity] = useState(60);
  const [total, setTotal] = useState(300);
  const [voltage, setVoltage] = useState(5);
  const [region, setRegion] = useState("Italy");
  const [copied, setCopied] = useState(false);

  const power = useMemo(() => {
    const perLed = planningWattsPerLed[ledType] ?? (voltage === 5 ? 0.30 : 0.24);
    const targetWatts = Math.ceil(total * perLed * 1.2);
    const amps = Math.max(1, Math.ceil(targetWatts / voltage));
    return { watts: targetWatts, amps, ratedWatts: amps * voltage };
  }, [ledType, total, voltage]);

  const searches = useMemo(() => [
    `${ledType.replace("Custom compatible 5V setup", "addressable LED strip 5V").replace("Custom compatible 12V setup", "addressable LED strip 12V")} ${voltage}V ${length}m ${total} LEDs ${region}`,
    `${voltage}V ${power.amps}A LED power adapter ${region}`,
    `ESP32 WLED addressable LED controller ${region}`,
  ], [ledType, voltage, length, total, region, power.amps]);

  function updateGeometry(nextLength: number, nextDensity: number) {
    setLength(nextLength);
    setDensity(nextDensity);
    setTotal(Math.max(1, Math.min(500, Math.round(nextLength * nextDensity))));
  }

  function changeLedType(value: string) {
    setLedType(value);
    if (value.includes("12V") || value === "WS2815") setVoltage(12);
    if (value.includes("5V") || ["WS2812B", "WS2812B ECO", "SK6812 RGBW"].includes(value)) setVoltage(5);
  }

  async function copyShoppingList() {
    try {
      await navigator.clipboard.writeText(searches.map((search, index) => `${index + 1}. ${search}`).join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
        <div className="feature-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300">Smart Hardware Configurator</div>
              <h3 className="mt-2 text-xl font-semibold">Build a 1–500 LED configuration</h3>
            </div>
            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300">Up to 500 LEDs</span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">LED Type
              <select value={ledType} onChange={(event: ChangeEvent<HTMLSelectElement>) => changeLedType(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-[#0a1022]">
                {ledTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="text-sm">Voltage
              <select value={voltage} onChange={(event: ChangeEvent<HTMLSelectElement>) => setVoltage(Number(event.target.value))} className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400 dark:border-white/10 dark:bg-[#0a1022]">
                <option value={5}>5V</option><option value={12}>12V</option>
              </select>
            </label>
            <label className="text-sm">Strip length: <strong>{length} m</strong>
              <input className="mt-3 w-full accent-violet-600" type="range" min="1" max="10" step="1" value={length} onChange={(event: ChangeEvent<HTMLInputElement>) => updateGeometry(Number(event.target.value), density)} />
            </label>
            <label className="text-sm">LED density: <strong>{density} LEDs/m</strong>
              <input className="mt-3 w-full accent-cyan-500" type="range" min="30" max="144" step="1" value={density} onChange={(event: ChangeEvent<HTMLInputElement>) => updateGeometry(length, Number(event.target.value))} />
            </label>
            <label className="text-sm sm:col-span-2">Total LED count
              <div className="mt-2 flex gap-2">
                <input type="number" min={1} max={500} value={total} onChange={(event: ChangeEvent<HTMLInputElement>) => setTotal(Math.max(1, Math.min(500, Number(event.target.value) || 1)))} className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent px-3 py-2.5 outline-none focus:border-cyan-400 dark:border-white/10" />
                <button type="button" onClick={() => setTotal(Math.max(1, Math.min(500, Math.round(length * density))))} className="btn-secondary !px-3 !py-2 text-xs">Use length × density</button>
              </div>
            </label>
          </div>
        </div>

        <div className="feature-card bg-gradient-to-br from-violet-500/10 to-cyan-400/10">
          <div className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300">Configuration summary</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Summary icon={Lightbulb} label="LED Type" value={ledType}/>
            <Summary icon={Gauge} label="Total" value={`${total} LEDs`}/>
            <Summary icon={PlugZap} label="Recommended Power Adapter" value={`${voltage}V / ${power.amps}A / ${power.ratedWatts}W+`}/>
            <Summary icon={Cpu} label="Recommended Controller" value="WLED-compatible ESP32"/>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300/80">LightSync calculates an estimated power requirement and recommends an appropriately rated LED Power Adapter. Controller guidance remains configuration-dependent; one controller is not claimed to work with every possible setup.</p>
          <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-700 dark:text-amber-200">Power recommendations are estimates for planning. Verify the specifications of your exact LED strip and use properly rated, certified power hardware. Large installations may require additional low-voltage power distribution.</div>
        </div>
      </div>

      <div className="feature-card">
        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-600 dark:text-cyan-300">Hardware Shopping</div>
            <h3 className="mt-2 text-xl font-semibold">Worldwide Google-based searches</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">LightSync does not depend on Amazon. Changing the shopping region automatically updates the search phrases so users can find suitable hardware through Google in their country.</p>
            <div className="mt-4"><ShoppingRegionSelector value={region} onChange={setRegion}/></div>
            <button type="button" onClick={copyShoppingList} className="btn-primary mt-3 w-full !py-2.5 text-xs"><Copy size={14} className="mr-2"/>{copied ? <><Check size={14} className="mr-1"/> COPIED</> : "COPY SHOPPING LIST"}</button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <HardwareShoppingCard title="LED STRIP" search={searches[0]}/>
            <HardwareShoppingCard title="POWER ADAPTER" search={searches[1]}/>
            <HardwareShoppingCard title="WLED ESP32 CONTROLLER" search={searches[2]}/>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ icon: Icon, label, value }: { icon: typeof Gauge; label: string; value: string }) {
  return <div className="rounded-xl border border-slate-200/70 p-3 dark:border-white/10"><Icon size={15} className="text-cyan-500"/><div className="mt-3 text-[11px] text-slate-500">{label}</div><div className="mt-1 text-sm font-medium leading-5">{value}</div></div>;
}
