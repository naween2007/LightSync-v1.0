"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ScreenshotItem = {
  title: string;
  description: string;
  src: string;
  alt: string;
};

type ImageStatus = "loading" | "loaded" | "error";

const screenshots: ScreenshotItem[] = [
  {
    title: "Producer Studio",
    description:
      "Control your live WLED light show, audio analysis and effects from one workspace.",
    src: "/screenshots/producer-studio.png",
    alt: "LightSync Producer Studio Windows interface",
  },
  {
    title: "Hardware & Setup",
    description:
      "View your LED configuration, Power Adapter recommendation and WLED device settings.",
    src: "/screenshots/hardware-drawer.png",
    alt: "LightSync Hardware and Setup side drawer",
  },
  {
    title: "Setup Wizard",
    description: "Configure LightSync step by step on the first launch.",
    src: "/screenshots/setup-welcome.png",
    alt: "LightSync first-run Setup Wizard welcome screen",
  },
  {
    title: "Hardware Configurator",
    description:
      "Set LED type, strip length, density, voltage and exact LED count for your setup.",
    src: "/screenshots/hardware-configurator.png",
    alt: "LightSync Smart Hardware Configurator",
  },
  {
    title: "Hardware Shopping",
    description:
      "Create region-aware searches for your LED strip, Power Adapter and WLED controller.",
    src: "/screenshots/hardware-shopping.png",
    alt: "LightSync regional hardware shopping interface",
  },
  {
    title: "WLED Setup",
    description:
      "Discover your WLED controller and verify LED-count synchronization.",
    src: "/screenshots/wled-setup.png",
    alt: "LightSync WLED device setup screen",
  },
  {
    title: "Device Test",
    description:
      "Verify the WLED connection and test red, green, blue and off states before continuing.",
    src: "/screenshots/device-test.png",
    alt: "LightSync WLED device test screen",
  },
  {
    title: "Audio Setup",
    description:
      "Monitor live PC audio, bass, mids, treble and real detected kicks.",
    src: "/screenshots/audio-setup.png",
    alt: "LightSync PC audio setup and live audio meters",
  },
  {
    title: "Real Kick Detector",
    description:
      "Kick events are triggered only from actual detected kick transients.",
    src: "/screenshots/real-kick-detector.png",
    alt: "LightSync real kick detector interface",
  },
  {
    title: "Settings & Recovery",
    description: "Export, import and reset LightSync configuration.",
    src: "/screenshots/settings-recovery.png",
    alt: "LightSync Settings and Recovery interface",
  },
  {
    title: "Dark Theme",
    description:
      "Use LightSync with the premium dark interface designed for studio and lighting environments.",
    src: "/screenshots/dark-theme.png",
    alt: "LightSync Windows application in dark theme",
  },
  {
    title: "Light Theme",
    description:
      "Switch to LightSync's polished light interface while keeping the same controls and workflow.",
    src: "/screenshots/light-theme.png",
    alt: "LightSync Windows application in light theme",
  },
];

export default function ScreenshotCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [imageStatus, setImageStatus] = useState<ImageStatus[]>(() =>
    screenshots.map(() => "loading"),
  );

  const updateImageStatus = useCallback((index: number, status: ImageStatus) => {
    setImageStatus((current) => {
      if (current[index] === status) return current;
      const next = [...current];
      next[index] = status;
      return next;
    });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const card = scroller.children[index] as HTMLElement | undefined;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
    setActiveIndex(index);
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const nextIndex = Math.min(
      screenshots.length - 1,
      Math.max(0, activeIndex + direction),
    );
    scrollToIndex(nextIndex);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof IntersectionObserver === "undefined") return;

    const cards = Array.from(scroller.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.index);
        if (Number.isFinite(index)) setActiveIndex(index);
      },
      { root: scroller, threshold: [0.55, 0.7, 0.9] },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const findAvailableImage = useCallback(
    (startIndex: number, direction: -1 | 1) => {
      for (let step = 1; step <= screenshots.length; step += 1) {
        const candidate =
          (startIndex + direction * step + screenshots.length) % screenshots.length;
        if (imageStatus[candidate] === "loaded") return candidate;
      }
      return startIndex;
    },
    [imageStatus],
  );

  const moveLightbox = useCallback(
    (direction: -1 | 1) => {
      setLightboxIndex((current) => {
        if (current === null) return null;
        return findAvailableImage(current, direction);
      });
    },
    [findAvailableImage],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, moveLightbox]);

  return (
    <>
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={activeIndex === 0}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:-translate-y-0.5 hover:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous LightSync screenshot"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={activeIndex === screenshots.length - 1}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full transition hover:-translate-y-0.5 hover:border-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next LightSync screenshot"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="soft-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
          aria-label="Real LightSync application screenshots"
        >
          {screenshots.map((item, index) => {
            const status = imageStatus[index];
            const canOpen = status === "loaded";

            return (
              <article
                key={item.src}
                data-index={index}
                className="glass group min-w-[88vw] max-w-[560px] snap-start overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_20px_70px_rgba(34,211,238,0.10),0_10px_40px_rgba(139,92,246,0.10)] sm:min-w-[460px] lg:min-w-[540px]"
              >
                <button
                  type="button"
                  onClick={() => canOpen && setLightboxIndex(index)}
                  disabled={!canOpen}
                  className={`relative block aspect-video w-full overflow-hidden border-b border-slate-200/70 bg-slate-100 text-left dark:border-white/10 dark:bg-[#080d1d] ${
                    canOpen ? "cursor-zoom-in" : "cursor-default"
                  }`}
                  aria-label={canOpen ? `Open ${item.title} screenshot` : `${item.title} screenshot coming soon`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 460px, 540px"
                    className={`object-cover object-top transition duration-500 group-hover:scale-[1.01] ${
                      status === "loaded" ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => updateImageStatus(index, "loaded")}
                    onError={() => updateImageStatus(index, "error")}
                  />

                  {status !== "loaded" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(34,211,238,.08),transparent_45%),linear-gradient(135deg,rgba(139,92,246,.06),rgba(6,182,212,.04))] p-6">
                      <div className="rounded-2xl border border-slate-300/60 bg-white/70 px-5 py-4 text-center shadow-sm dark:border-white/10 dark:bg-[#0b1022]/95">
                        <div className="text-sm font-semibold">Screenshot coming soon</div>
                        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.title}
                        </div>
                      </div>
                    </div>
                  )}
                </button>

                <div className="p-5 sm:p-6">
                  <div className="font-semibold tracking-tight sm:text-lg">{item.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2" aria-label="Screenshot pagination">
          {screenshots.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-[width,background-color] duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${
                activeIndex === index
                  ? "w-6 bg-gradient-to-r from-violet-500 to-cyan-400"
                  : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20 dark:hover:bg-white/35"
              }`}
              aria-label={`Go to screenshot ${index + 1}: ${item.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && imageStatus[lightboxIndex] === "loaded" && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${screenshots[lightboxIndex].title} screenshot viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-white/10 sm:right-6 sm:top-6"
            aria-label="Close screenshot"
          >
            <X size={21} />
          </button>

          <button
            type="button"
            onClick={() => moveLightbox(-1)}
            className="absolute left-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition hover:bg-white/10 sm:left-6"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex max-h-[92vh] w-full max-w-[1500px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b16] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="relative min-h-0 flex-1 bg-black/40" style={{ height: "min(78vh, 900px)" }}>
              <Image
                src={screenshots[lightboxIndex].src}
                alt={screenshots[lightboxIndex].alt}
                fill
                sizes="96vw"
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="border-t border-white/10 px-5 py-4 text-white sm:px-6">
              <div className="font-semibold">{screenshots[lightboxIndex].title}</div>
              <p className="mt-1 text-sm text-slate-300">
                {screenshots[lightboxIndex].description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => moveLightbox(1)}
            className="absolute right-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition hover:bg-white/10 sm:right-6"
            aria-label="Next screenshot"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
