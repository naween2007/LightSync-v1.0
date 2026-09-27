"use client";

import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw, Scan, SplitSquareVertical } from "lucide-react";
import { STAGE_LABELS } from "./sceneConfig";

type Props = {
  stage: number;
  playing: boolean;
  exploded: boolean;
  onStage: (stage: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  onReplay: () => void;
  onResetView: () => void;
  onExploded: () => void;
};

export default function WiringControls({
  stage,
  playing,
  exploded,
  onStage,
  onPrevious,
  onNext,
  onPlayPause,
  onReplay,
  onResetView,
  onExploded,
}: Props) {
  return (
    <div className="border-t border-white/10 bg-[#070b16]/95 px-4 py-4 sm:px-5">
      <div className="flex gap-2 overflow-x-auto pb-2 soft-scrollbar" aria-label="3D wiring tutorial steps">
        {STAGE_LABELS.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => onStage(index)}
            className={`shrink-0 rounded-xl border px-3 py-2 text-left transition ${stage === index ? "border-cyan-300/35 bg-cyan-300/10 text-white" : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/20 hover:text-white"}`}
            aria-current={stage === index ? "step" : undefined}
          >
            <div className="text-[10px] font-semibold uppercase tracking-[.16em] text-cyan-300/80">{String(index + 1).padStart(2, "0")}</div>
            <div className="mt-0.5 text-xs font-semibold">{label}</div>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button type="button" className="wiring-control" onClick={onPrevious} disabled={stage === 0} aria-label="Previous wiring step"><ChevronLeft size={16} /> Previous</button>
          <button type="button" className="wiring-control wiring-control-primary" onClick={onPlayPause}>{playing ? <Pause size={16} /> : <Play size={16} />}{playing ? "Pause" : "Play"}</button>
          <button type="button" className="wiring-control" onClick={onNext} disabled={stage === STAGE_LABELS.length - 1}>Next <ChevronRight size={16} /></button>
          <button type="button" className="wiring-control" onClick={onReplay}><RotateCcw size={15} /> Replay</button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="wiring-control" onClick={onResetView}><Scan size={15} /> Reset View</button>
          <button type="button" className={`wiring-control ${exploded ? "border-violet-300/35 bg-violet-300/10 text-white" : ""}`} onClick={onExploded}><SplitSquareVertical size={15} /> {exploded ? "Assemble" : "Exploded View"}</button>
        </div>
      </div>
    </div>
  );
}
