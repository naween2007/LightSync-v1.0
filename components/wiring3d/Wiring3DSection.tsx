"use client";

import dynamic from "next/dynamic";
import { CheckCircle2, Info, MonitorUp, MousePointer2, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Wiring3DLoader from "./Wiring3DLoader";
import WiringControls from "./WiringControls";
import { STAGE_LABELS } from "./sceneConfig";

const Wiring3DScene = dynamic(() => import("./Wiring3DScene"), {
  ssr: false,
  loading: () => <Wiring3DLoader />,
});

const STAGE_COPY = [
  ["Connect your LightSync hardware", "Inspect the controller, LED strip, 3-wire cable and enclosed 5V Power Adapter before the installation sequence begins."],
  ["POWER", "The power conductor approaches the controller V terminal and locks into the quick-connect output."],
  ["GROUND", "The ground conductor connects the controller G terminal to the LED strip ground path."],
  ["DATA → DIN", "The data conductor connects D / GPIO16 to the LED strip input side — DIN, never DOUT."],
  ["STRIP CONNECTION", "The real 3-pin connector aligns with the strip input and slides into the socket with a subtle mechanical snap."],
  ["POWER ADAPTER", "The safe low-voltage DC connector plugs into the controller. The controller indicator then turns on."],
  ["WLED READY", "Wi-Fi becomes active and a cyan data pulse travels from the controller through the data cable and along the strip."],
  ["WIRING COMPLETE", "Power, ground and data are connected. The strip runs a short LightSync RGB sequence and the system is ready for WLED setup."],
] as const;

export default function Wiring3DSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [resetViewToken, setResetViewToken] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lowEnd, setLowEnd] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setNearViewport(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "360px 0px", threshold: 0.01 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) {
        setPlaying(false);
        setStage(7);
      }
    };
    update();
    motion.addEventListener?.("change", update);
    return () => motion.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const weakCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    setLowEnd(mobile || weakCpu || lowMemory);
  }, []);

  const effectivePlaying = playing && nearViewport && pageVisible && !reducedMotion && !exploded;

  useEffect(() => {
    if (!effectivePlaying) return;
    if (stage < STAGE_LABELS.length - 1) {
      const timer = window.setTimeout(() => setStage((current) => Math.min(current + 1, STAGE_LABELS.length - 1)), stage === 0 ? 4200 : 3300);
      return () => window.clearTimeout(timer);
    }
    const finishTimer = window.setTimeout(() => setPlaying(false), 4800);
    return () => window.clearTimeout(finishTimer);
  }, [effectivePlaying, stage]);

  const selectStage = useCallback((index: number) => {
    setPlaying(false);
    setExploded(false);
    setStage(index);
  }, []);

  const onPrevious = useCallback(() => {
    setPlaying(false);
    setExploded(false);
    setStage((current) => Math.max(0, current - 1));
  }, []);

  const onNext = useCallback(() => {
    setPlaying(false);
    setExploded(false);
    setStage((current) => Math.min(STAGE_LABELS.length - 1, current + 1));
  }, []);

  const onReplay = useCallback(() => {
    setExploded(false);
    setStage(0);
    setResetViewToken((token) => token + 1);
    setPlaying(!reducedMotion);
  }, [reducedMotion]);

  const onExploded = useCallback(() => {
    setPlaying(false);
    setExploded((value) => !value);
    setResetViewToken((token) => token + 1);
  }, []);

  const currentCopy = useMemo(() => STAGE_COPY[stage], [stage]);

  return (
    <div ref={rootRef} className="overflow-hidden rounded-[30px] border border-slate-200/70 bg-[#050816] shadow-[0_28px_90px_rgba(2,6,23,.24)] dark:border-white/10">
      <div className="relative h-[520px] sm:h-[600px] lg:h-[660px]">
        {nearViewport ? (
          <Wiring3DScene
            stage={stage}
            animate={effectivePlaying}
            exploded={exploded}
            resetViewToken={resetViewToken}
            reducedMotion={reducedMotion}
            lowEnd={lowEnd}
          />
        ) : (
          <div className="grid h-full place-items-center bg-[#050816] px-6 text-center text-white">
            <div>
              <MonitorUp className="mx-auto text-cyan-300" size={28} />
              <div className="mt-4 font-semibold">Interactive 3D hardware tutorial</div>
              <div className="mt-1 text-sm text-slate-400">The WebGL scene loads only when you approach this section.</div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4 sm:p-5">
          <div className="max-w-[520px] rounded-2xl border border-white/10 bg-[#050816]/85 px-4 py-3 text-white shadow-xl sm:px-5">
            <div className="text-[10px] font-semibold uppercase tracking-[.2em] text-cyan-300">{String(stage + 1).padStart(2, "0")} · {STAGE_LABELS[stage]}</div>
            <div className="mt-1 text-sm font-semibold sm:text-base">{currentCopy[0]}</div>
            <div className="mt-1 hidden text-xs leading-5 text-slate-300 sm:block">{currentCopy[1]}</div>
            {stage > 1 && (
              <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] font-semibold uppercase tracking-[.12em] text-emerald-300">
                {stage >= 2 && <span>✓ Power connected</span>}
                {stage >= 3 && <span>✓ Ground connected</span>}
                {stage >= 4 && <span>✓ Data connected</span>}
              </div>
            )}
          </div>
          <div className="hidden rounded-full border border-white/10 bg-[#050816]/80 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-300 md:block">
            Drag to rotate · Wheel to zoom
          </div>
        </div>

        {stage === 7 && !exploded && (
          <div className="pointer-events-none absolute bottom-5 right-5 z-10 hidden w-[260px] rounded-2xl border border-emerald-300/20 bg-[#07110f]/90 p-4 text-white shadow-2xl sm:block">
            <div className="text-xs font-bold uppercase tracking-[.18em] text-emerald-300">WIRING COMPLETE</div>
            <div className="mt-3 space-y-1.5 text-xs text-slate-200">
              {["POWER", "GROUND", "DATA", "WLED READY"].map((item) => <div key={item} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> {item}</div>)}
            </div>
          </div>
        )}
      </div>

      <WiringControls
        stage={stage}
        playing={playing}
        exploded={exploded}
        onStage={selectStage}
        onPrevious={onPrevious}
        onNext={onNext}
        onPlayPause={() => setPlaying((value) => !value)}
        onReplay={onReplay}
        onResetView={() => setResetViewToken((token) => token + 1)}
        onExploded={onExploded}
      />

      <div className="grid gap-3 border-t border-white/10 bg-[#080d1b] px-4 py-4 text-xs text-slate-300 sm:grid-cols-[1fr_auto] sm:items-center sm:px-5">
        <div className="space-y-2">
          <div className="flex items-start gap-2"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-cyan-300" /><span>Disconnect power before connecting or changing LED wiring.</span></div>
          <div className="flex items-start gap-2"><Info size={15} className="mt-0.5 shrink-0 text-violet-300" /><span>Follow the V / Data / Ground labels printed on your own controller and LED strip. Wire colors and connector positions can vary.</span></div>
          <div className="flex items-start gap-2"><MousePointer2 size={15} className="mt-0.5 shrink-0 text-slate-400" /><span>This tutorial demonstrates only the safe low-voltage side of the setup.</span></div>
        </div>
        {stage === 7 && (
          <a href="#setup" className="pointer-events-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-xs font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5">
            Continue to WLED Setup
          </a>
        )}
      </div>
    </div>
  );
}
