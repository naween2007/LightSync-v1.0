import { CheckCircle2, Download, FileCheck2, Monitor, ShieldAlert } from "lucide-react";
import DownloadButton from "./DownloadButton";
import { LIGHTSYNC_RELEASE } from "@/src/config/download";

const installSteps = [
  "Download",
  "Run LightSync Setup",
  "Install LightSync",
  "Open LightSync",
  "Setup Wizard",
  "Producer Studio",
];

const firstLaunch = ["LightSync", "Setup Wizard", "Hardware setup", "WLED setup", "LED test", "Audio setup", "Producer Studio"];
const laterLaunch = ["LightSync", "Producer Studio"];

export default function ReleaseDownload() {
  return (
    <section id="download" className="py-20 scroll-mt-20">
      <div className="container-shell">
        <div className="grid gap-6 xl:grid-cols-[.86fr_1.14fr]">
          <div className="glass rounded-3xl p-7 sm:p-9">
            <div className="section-kicker">Official Windows Release</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your light show starts here.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300/80">Download LightSync for Windows and connect your music to WLED-powered addressable LEDs.</p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
              LIGHTSYNC v{LIGHTSYNC_RELEASE.version} · Windows Release
            </div>

            <div className="mt-6">
              <DownloadButton label="DOWNLOAD LIGHTSYNC FOR WINDOWS" hoverLabel="DOWNLOAD FOR WINDOWS" />
              <div className="mt-2 text-xs font-medium text-slate-500">LightSync v{LIGHTSYNC_RELEASE.version} • Windows {LIGHTSYNC_RELEASE.architecture}</div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/45 p-5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex items-center gap-2 text-sm font-semibold"><FileCheck2 size={18} className="text-cyan-500" /> Download information</div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <Info label="Filename" value={LIGHTSYNC_RELEASE.filename} />
                <Info label="Version" value={LIGHTSYNC_RELEASE.version} />
                <Info label="Platform" value={`${LIGHTSYNC_RELEASE.platform} ${LIGHTSYNC_RELEASE.architecture}`} />
                <Info label="Installer" value={LIGHTSYNC_RELEASE.installerLabel} />
                {LIGHTSYNC_RELEASE.sha256 && <Info label="SHA-256" value={LIGHTSYNC_RELEASE.sha256} wide />}
              </dl>
            </div>

            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
              <div className="flex gap-3"><ShieldAlert size={19} className="mt-0.5 shrink-0 text-amber-500" /><p>Windows may display a security warning for newly distributed applications that are not yet code-signed. Always download LightSync from the official LightSync website.</p></div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-600 p-7 text-white shadow-2xl shadow-indigo-500/20 sm:p-9">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/[0.08] blur-xl" />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.22em] text-cyan-100"><Monitor size={15}/> LIGHTSYNC FOR WINDOWS</div>
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <ReleaseField label="Version" value={LIGHTSYNC_RELEASE.version} />
                <ReleaseField label="Platform" value={LIGHTSYNC_RELEASE.platform} />
                <ReleaseField label="Architecture" value="64-bit" />
                <ReleaseField label="Installer" value={LIGHTSYNC_RELEASE.installerLabel} />
              </div>

              <div className="mt-8">
                <DownloadButton
                  label="DOWNLOAD LIGHTSYNC"
                  hoverLabel="DOWNLOAD FOR WINDOWS"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-white/80"
                />
                <div className="mt-3 text-sm text-white/80">LightSync v{LIGHTSYNC_RELEASE.version} • Windows {LIGHTSYNC_RELEASE.architecture}</div>
                <p className="mt-4 text-sm leading-6 text-white/80">Run the installer and follow the setup wizard.</p>
                <p className="mt-2 text-xs leading-5 text-white/65">LightSync is distributed as a self-contained Windows application. Users do not need to install the .NET runtime separately.</p>
              </div>

              <div className="mt-8 border-t border-white/15 pt-7">
                <div className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-100">Installation flow</div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                  {installSteps.map((step, index) => (
                    <div key={step} className="contents">
                      <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 font-medium">{step}</span>
                      {index < installSteps.length - 1 && <span className="text-cyan-200">→</span>}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-white/80">On the first launch, LightSync guides you through LED hardware, WLED configuration, device testing, and PC-audio setup.</p>
              </div>

              <a href="#setup" className="mt-6 inline-flex text-sm font-semibold text-cyan-100 underline decoration-cyan-200/40 underline-offset-4 transition hover:text-white">View Setup Guide</a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="feature-card">
            <div className="flex items-center gap-2 font-semibold"><Download size={18} className="text-cyan-500" /> First launch</div>
            <Flow steps={firstLaunch} />
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300/80">The Setup Wizard can still be opened again later from Hardware & Setup.</p>
          </div>
          <div className="feature-card">
            <div className="flex items-center gap-2 font-semibold"><CheckCircle2 size={18} className="text-emerald-500" /> After setup</div>
            <Flow steps={laterLaunch} />
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300/80">Once the initial setup is complete, future LightSync launches open Producer Studio directly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ label, value, wide = false }: { label: string; value: string; wide?: boolean }) {
  return <div className={wide ? "sm:col-span-2" : ""}><dt className="text-xs uppercase tracking-[.14em] text-slate-500">{label}</dt><dd className="mt-1 break-all font-medium">{value}</dd></div>;
}

function ReleaseField({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl border border-white/15 bg-white/10 p-3"><div className="text-[10px] uppercase tracking-[.16em] text-white/60">{label}</div><div className="mt-1 text-sm font-semibold">{value}</div></div>;
}

function Flow({ steps }: { steps: readonly string[] }) {
  return <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">{steps.map((step, index) => <div key={step} className="contents"><span className="rounded-lg border border-slate-200/70 bg-white/50 px-3 py-2 font-medium dark:border-white/10 dark:bg-white/[0.03]">{step}</span>{index < steps.length - 1 && <span className="text-cyan-500">→</span>}</div>)}</div>;
}
