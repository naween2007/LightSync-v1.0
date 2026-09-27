import {
  Activity,
  AudioLines,
  Cpu,
  Eye,
  Gauge,
  Layers3,
  Menu,
  PackageSearch,
  Radio,
  RefreshCcw,
  Save,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Wifi,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import DashboardMockup from "@/components/DashboardMockup";
import SetupWizard from "@/components/SetupWizard";
import ProducerStudio from "@/components/ProducerStudio";
import HardwareConfigurator from "@/components/HardwareConfigurator";
import ScreenshotCarousel from "@/components/ScreenshotCarousel";
import FAQ from "@/components/FAQ";
import FirstRunFlow from "@/components/FirstRunFlow";
import HardwareDrawerDemo from "@/components/HardwareDrawerDemo";
import SettingsRecoveryDemo from "@/components/SettingsRecoveryDemo";
import DownloadButton from "@/components/DownloadButton";
import SystemRequirements from "@/components/SystemRequirements";
import ReleaseDownload from "@/components/ReleaseDownload";
import { LIGHTSYNC_RELEASE } from "@/src/config/download";

const featureGroups = [
  {
    title: "MUSIC",
    items: [
      ["Real Kick Detection", "LED flashes respond to real detected kick drums from the live PC audio signal.", Zap],
      ["Live PC Audio Analysis", "Analyze bass, mids, treble, energy and rhythm directly from Windows system audio.", AudioLines],
      ["Automatic Light Shows", "Automatically select effects, speeds, intensity and transitions based on the music.", Sparkles],
    ],
  },
  {
    title: "HARDWARE",
    items: [
      ["WLED + ESP32", "Connect over Wi-Fi to supported/recommended WLED-compatible ESP32 controllers.", Wifi],
      ["Automatic WLED Discovery", "Find WLED devices without depending on a permanently fixed IP address.", Radio],
      ["Automatic WLED Reconnect", "Reconnect when a known WLED device becomes available again.", RefreshCcw],
      ["Smart Hardware Configurator", "Plan LED type, count, voltage, region and Power Adapter requirements up to 500 LEDs.", Settings2],
      ["Regional Hardware Shopping", "Generate worldwide Google hardware searches using the selected Windows shopping region.", PackageSearch],
      ["Power Adapter Recommendation", "Estimate a suitable low-voltage Power Adapter rating for planning.", Gauge],
      ["LED Count Synchronization", "Compare LightSync and WLED LED counts and surface mismatches before a show.", Activity],
    ],
  },
  {
    title: "CONTROL",
    items: [
      ["Exact RGB Preview", "Preview the RGB frame LightSync is preparing or sending to the LED system.", Eye],
      ["Producer Controls", "Use Auto / Manual mode, brightness, sensitivity, effect speed, palettes and frame-rate controls.", SlidersHorizontal],
      ["Hardware Setup Drawer", "Open Hardware & Setup from the three-line control without leaving Producer Studio.", Menu],
    ],
  },
  {
    title: "SYSTEM",
    items: [
      ["Settings Backup & Recovery", "Export, import or selectively reset LightSync configuration without reinstalling.", Save],
      ["Dark / Light Themes", "Use a polished interface in either dark or light mode.", Layers3],
    ],
  },
];

export default function Home(){
  return <main>
    <Navbar />

    <section id="home" className="relative overflow-hidden pb-24 pt-20 sm:pt-24 lg:pb-28 lg:pt-28">
      <div className="grid-fade" />
      <div className="container-shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-700 dark:text-cyan-300"><Activity size={14}/> Professional music-reactive lighting for Windows</div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]"/> LIGHTSYNC v{LIGHTSYNC_RELEASE.version} · Windows Release</div>
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-.045em] sm:text-6xl lg:text-7xl">Turn Your Music Into <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Light.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300/80">LightSync analyzes your PC audio in real time and synchronizes WLED-powered addressable LEDs with real detected kicks, bass, energy, BPM and song sections.</p>
          <div className="mt-8 flex flex-wrap items-start gap-3">
            <div>
              <DownloadButton label="Download for Windows" hoverLabel="Download for Windows" />
              <div className="mt-2 text-xs font-medium text-slate-500">LightSync v{LIGHTSYNC_RELEASE.version}<br/>Windows 10 / 11 • 64-bit</div>
            </div>
            <a href="#how-it-works" className="btn-secondary">See How It Works</a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500"><span>Windows PC → Wi-Fi → ESP32 running WLED → Addressable LED Strip</span><span className="hidden h-4 w-px bg-slate-300 dark:bg-white/10 sm:block"/><span>Real detected kicks only</span></div>
        </div>
        <DashboardMockup />
      </div>
    </section>

    <section id="features" className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Features</div>
        <h2 className="section-title">Built like a lighting studio, not a toy.</h2>
        <p className="section-copy">The latest LightSync workflow combines real-time audio analysis, WLED hardware management, producer controls and configuration recovery without turning the interface into an overcrowded dashboard.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {featureGroups.map((group) => <div key={group.title} className="feature-card">
            <div className="text-xs font-semibold uppercase tracking-[.22em] text-cyan-600 dark:text-cyan-300">{group.title}</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.items.map(([title,copy,Icon]: any)=><div key={title} className="rounded-2xl border border-slate-200/70 bg-white/40 p-4 dark:border-white/10 dark:bg-white/[0.025]"><div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/15 to-cyan-400/15 text-cyan-500"><Icon size={18}/></div><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-1.5 text-xs leading-5 text-slate-600 dark:text-slate-300/75">{copy}</p></div>)}
            </div>
          </div>)}
        </div>
      </div>
    </section>

    <section id="setup" className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Smart Setup Wizard</div>
        <h2 className="section-title">From hardware planning to ready-to-run.</h2>
        <p className="section-copy">Hardware shopping is optional. New installations are guided through hardware, WLED testing and Windows audio setup, while users who already own the equipment can skip buying recommendations.</p>
        <SetupWizard />
      </div>
    </section>

    <section className="py-20">
      <div className="container-shell">
        <div className="section-kicker">First-run experience</div>
        <h2 className="section-title">Setup once. Launch straight into the studio afterward.</h2>
        <p className="section-copy">The Setup Wizard appears automatically on the first launch of a new LightSync installation. Once setup is completed, future launches open Producer Studio directly.</p>
        <div className="mt-10"><FirstRunFlow /></div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Producer Studio</div>
        <h2 className="section-title">Your live control surface.</h2>
        <p className="section-copy">Manage WLED status, exact LED count, brightness, music sensitivity, kick sensitivity, effect speed, palette, 30 / 60 FPS, Auto / Manual mode and the live RGB output from one workspace.</p>
        <div className="mt-10"><ProducerStudio /></div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Main UI / setup synchronization</div>
        <h2 className="section-title">Setup values follow you into Producer Studio.</h2>
        <p className="section-copy">Hardware values selected in the Setup Wizard are saved into Producer Studio but remain editable. If an LED-count change makes the saved hardware recommendation stale, LightSync can warn and recalculate the Power Adapter and controller guidance.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-[.65fr_1.35fr]">
          <div className="feature-card">
            <div className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Saved configuration example</div>
            <div className="mt-5 rounded-2xl border border-slate-200/70 p-4 text-center dark:border-white/10"><div className="text-xs text-slate-500">Setup Wizard</div><div className="mt-1 text-3xl font-semibold">300 LEDs</div></div>
            <div className="my-3 text-center text-cyan-500">↓</div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-center"><div className="text-xs text-slate-500">Producer Studio</div><div className="mt-1 text-3xl font-semibold">LED Count: 300</div></div>
          </div>
          <HardwareDrawerDemo />
        </div>
      </div>
    </section>

    <section id="hardware" className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Hardware configuration</div>
        <h2 className="section-title">Plan a supported WLED setup.</h2>
        <p className="section-copy">Supported/recommended options include WLED-compatible ESP32 controllers, WS2812B, WS2812B ECO, SK6812 RGBW, WS2815 and compatible 5V / 12V addressable LED systems. Not every ESP32 or LED strip is guaranteed compatible.</p>
        <div className="mt-10"><HardwareConfigurator /></div>

        <div className="mt-8 feature-card">
          <div className="section-kicker">Current configuration support</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Windows desktop application","WLED-compatible ESP32 controller","Wi-Fi connection","DDP real-time LED streaming","Up to 500 LEDs in the current LightSync configuration system","Supported/recommended addressable LED types vary by voltage and controller"].map((item)=><div key={item} className="rounded-xl border border-slate-200/70 px-4 py-3 text-sm dark:border-white/10">{item}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" className="py-20">
      <div className="container-shell">
        <div className="section-kicker">How it works</div>
        <h2 className="section-title">A clean signal path from Windows audio to pixels.</h2>
        <p className="section-copy">LightSync captures the audio playing on the PC, extracts musical features, turns them into lighting behavior and streams the resulting LED frames over Wi-Fi using DDP to WLED.</p>
        <div className="mt-10 grid gap-3 md:grid-cols-4 xl:grid-cols-8 xl:items-center">
          {[
            ["Windows PC",Cpu],
            ["Live PC Audio",AudioLines],
            ["LightSync Analyzer",Gauge],
            ["Real Kick / Bass / Mids / Treble / BPM / Energy / Song Sections",Activity],
            ["LightSync Effect Engine",Sparkles],
            ["Wi-Fi / DDP",Radio],
            ["ESP32 running WLED",Wifi],
            ["Addressable LED Strip",Zap],
          ].map(([label,Icon]:any)=><div key={label} className="feature-card !p-4 text-center"><Icon size={20} className="mx-auto text-cyan-500"/><div className="mt-3 text-xs font-medium leading-5">{label}</div></div>)}
        </div>
        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">BPM and rhythm timing can guide animations and transitions. Kick flashes remain tied to real detected kick events.</div>
      </div>
    </section>

    <section className="py-20">
      <div className="container-shell"><div className="glass overflow-hidden rounded-3xl p-7 sm:p-10 lg:p-12"><div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]"><div><div className="section-kicker">Auto Show</div><h2 className="section-title">Let LightSync Direct the Show.</h2><p className="section-copy">Auto mode analyzes the music and changes patterns, animation speed, intensity, transitions and drop effects. BPM and rhythm can control effect movement and scene timing. Kick flashes only trigger from detected kicks in the live audio signal.</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{["Patterns","Animation speed","Intensity","Transitions","Drop effects","Scene timing"].map((x,i)=><div key={x} className="rounded-2xl border border-slate-200/70 bg-white/50 p-4 dark:border-white/10 dark:bg-white/[0.035]"><div className="text-xs uppercase tracking-[.18em] text-slate-500">0{i+1}</div><div className="mt-2 font-medium">{x}</div></div>)}</div></div></div></div>
    </section>

    <section className="py-20">
      <div className="container-shell">
        <div className="section-kicker">Settings & Recovery</div>
        <h2 className="section-title">Manage configuration without reinstalling.</h2>
        <p className="section-copy">Back up, restore or reset only the part of LightSync you want to change. Hardware setup, UI settings and the full app state can be managed separately.</p>
        <div className="mt-10"><SettingsRecoveryDemo /></div>
      </div>
    </section>

    <section id="screenshots" className="py-20"><div className="container-shell"><div className="section-kicker">Screenshots</div><h2 className="section-title">See LightSync in action.</h2><p className="section-copy">Explore the real LightSync interface — from first-time setup to live music-reactive lighting control.</p><ScreenshotCarousel /></div></section>

    <section className="py-20">
      <div className="container-shell">
        <div className="section-kicker">What’s included in v{LIGHTSYNC_RELEASE.version}</div>
        <h2 className="section-title">The first official Windows release.</h2>
        <p className="section-copy">LightSync v{LIGHTSYNC_RELEASE.version} brings the complete music-reactive lighting workflow together in one Windows application.</p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Real detected kick lighting",
            "Live PC audio analysis",
            "Automatic lighting mode",
            "Manual Producer controls",
            "WLED discovery and reconnect",
            "DDP real-time RGB streaming",
            "Smart hardware Setup Wizard",
            "I Already Bought It flow",
            "Regional hardware shopping",
            "Smart Power Adapter recommendations",
            "WLED device testing",
            "Exact 1–500 LED control",
            "Hardware recommendation recalculation",
            "Settings backup / import",
            "Dark and Light themes",
          ].map((item) => <div key={item} className="rounded-2xl border border-slate-200/70 bg-white/45 px-4 py-3 text-sm font-medium dark:border-white/10 dark:bg-white/[0.03]"><span className="mr-2 text-emerald-500">✓</span>{item}</div>)}
        </div>
      </div>
    </section>

    <SystemRequirements />

    <section id="faq" className="py-20"><div className="container-shell"><div className="section-kicker">FAQ</div><h2 className="section-title">Common questions.</h2><FAQ /></div></section>

    <ReleaseDownload />

    <footer className="border-t border-slate-200/70 py-10 dark:border-white/5">
      <div className="container-shell grid gap-8 lg:grid-cols-[1fr_auto]"><div><div className="text-lg font-semibold">LightSync</div><div className="mt-1 text-sm text-slate-500">Music-Reactive Lighting for WLED</div><p className="mt-4 max-w-2xl text-xs leading-5 text-slate-500">LightSync is an independent project and is not affiliated with the WLED project or LED hardware manufacturers.</p></div><div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500">{[["Home","#home"],["Features","#features"],["Hardware","#hardware"],["Setup","#setup"],["FAQ","#faq"],["Download","#download"]].map(([l,h])=><a key={l} href={h} className="transition hover:text-slate-950 dark:hover:text-white">{l}</a>)}<span title="Project GitHub URL not configured">GitHub</span><span title="Privacy page not configured">Privacy</span></div></div>
    </footer>
  </main>
}
