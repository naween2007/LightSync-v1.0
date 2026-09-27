import { Download, RotateCcw, Upload } from "lucide-react";

const actions = [
  ["EXPORT CONFIG", "Back up your LightSync configuration to a JSON file.", Download],
  ["IMPORT CONFIG", "Restore a previously exported configuration.", Upload],
  ["RESET UI SETTINGS", "Reset Producer Studio controls and theme while keeping the hardware configuration.", RotateCcw],
  ["RESET HARDWARE SETUP", "Clear the saved hardware configuration and reopen the Setup Wizard.", RotateCcw],
  ["RESET ALL SETTINGS", "Return LightSync to a fresh setup state.", RotateCcw],
] as const;

export default function SettingsRecoveryDemo() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {actions.map(([title, copy, Icon]) => (
        <div key={title} className="rounded-2xl border border-slate-200/70 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <Icon size={18} className="text-cyan-500"/>
          <div className="mt-4 text-xs font-semibold tracking-[.08em]">{title}</div>
          <p className="mt-2 text-xs leading-5 text-slate-500">{copy}</p>
        </div>
      ))}
    </div>
  );
}
