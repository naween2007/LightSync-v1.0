export default function Wiring3DLoader() {
  return (
    <div className="grid h-full min-h-[460px] place-items-center bg-[#050816] text-white sm:min-h-[560px] lg:min-h-[640px]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />
        <div className="mt-4 text-sm font-semibold">Loading 3D hardware scene…</div>
        <div className="mt-1 text-xs text-slate-400">Preparing controller, cables and LED strip</div>
      </div>
    </div>
  );
}
