"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { LIGHTSYNC_RELEASE } from "@/src/config/download";

type DownloadButtonProps = {
  label?: string;
  hoverLabel?: string;
  className?: string;
  showIcon?: boolean;
};

export default function DownloadButton({
  label = "Download LightSync",
  hoverLabel = "Download for Windows",
  className = "btn-primary",
  showIcon = true,
}: DownloadButtonProps) {
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    if (!starting) return;
    const timer = window.setTimeout(() => setStarting(false), 2200);
    return () => window.clearTimeout(timer);
  }, [starting]);

  return (
    <a
      href={LIGHTSYNC_RELEASE.downloadUrl}
      onClick={() => setStarting(true)}
      className={`${className} group relative min-w-[190px]`}
      aria-label={`Download LightSync ${LIGHTSYNC_RELEASE.version} for Windows ${LIGHTSYNC_RELEASE.architecture}`}
    >
      {showIcon && <Download size={17} className="mr-2 shrink-0" aria-hidden="true" />}
      <span aria-live="polite">
        {starting ? (
          "Starting Download…"
        ) : (
          <>
            <span className="group-hover:hidden">{label}</span>
            <span className="hidden group-hover:inline">{hoverLabel}</span>
          </>
        )}
      </span>
    </a>
  );
}
