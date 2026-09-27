import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LightSync — Music Reactive WLED Lighting for Windows",
  description:
    "LightSync is a Windows music-reactive LED controller for WLED-compatible ESP32 devices, featuring real kick detection, live PC audio analysis, automatic light shows and professional lighting controls.",
  keywords: [
    "LightSync",
    "WLED",
    "ESP32",
    "WS2812B",
    "music reactive LEDs",
    "Windows LED controller",
    "addressable LED software",
    "real kick detection",
  ],
  openGraph: {
    title: "LightSync — Music Reactive WLED Lighting for Windows",
    description:
      "Windows music-reactive lighting for WLED-compatible ESP32 devices with real detected kicks, live PC audio analysis, automatic light shows and Producer controls.",
    type: "website",
    siteName: "LightSync",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
