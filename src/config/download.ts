export const LIGHTSYNC_RELEASE = {
  version: "1.0.0",
  platform: "Windows",
  os: "Windows 10 / Windows 11",
  architecture: "x64",
  filename: "LightSync-Setup-v1.0.0.exe",
  installerLabel: "LightSync Setup",
  downloadUrl:
    process.env.NEXT_PUBLIC_LIGHTSYNC_DOWNLOAD_URL ||
    "https://drive.google.com/file/d/1uCPCnIhXtO8DYErqG9ac5sNVMDDG1HOr/view?usp=sharing",
  sha256: process.env.NEXT_PUBLIC_LIGHTSYNC_SHA256?.trim() || undefined,
} as const;
