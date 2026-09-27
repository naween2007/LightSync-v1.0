const faq = [
  ["What LED strips does LightSync support?", "LightSync is designed for supported/recommended WLED-compatible addressable LED hardware such as WS2812B, WS2812B ECO, SK6812 RGBW, WS2815 and compatible custom 5V / 12V setups. Exact compatibility depends on the controller, LED strip and WLED configuration."],
  ["Do I need WLED?", "The current LightSync workflow uses an ESP32 running WLED for Wi-Fi LED control and DDP real-time LED streaming."],
  ["What ESP32 should I use?", "Use a WLED-compatible ESP32 controller appropriate for your LED voltage, signal and installation. LightSync does not claim that every ESP32 controller works with every possible setup."],
  ["Why does LightSync recommend a Power Adapter?", "Addressable LEDs need an appropriately rated low-voltage Power Adapter. LightSync provides a planning estimate based on the selected LED type, voltage and LED count."],
  ["How is the recommended Power Adapter calculated?", "LightSync uses the selected LED configuration to estimate power demand and planning headroom. The recommendation is guidance only; always verify the exact specifications of your LED strip and use properly rated, certified power hardware."],
  ["What if I already bought my LED hardware?", "Choose “I Already Bought It” in the Setup Wizard to skip shopping recommendations and continue directly to WLED configuration."],
  ["Why does LightSync use Google instead of Amazon?", "Google Search-based hardware searches can work across more countries and retailers instead of depending on one store."],
  ["How does LightSync choose my shopping region?", "Automatic region selection uses the Windows country/region setting. It does not determine your country from the Wi-Fi network."],
  ["Can I manually change the shopping country?", "Yes. The Shopping Region control can be changed manually, and the generated Google search phrases update for the selected country."],
  ["What happens if my WLED LED count is different?", "LightSync compares its configured LED count with the count reported by WLED. If they differ, it shows an LED count mismatch and can use the WLED-reported count."],
  ["Can I enter exactly 60 LEDs?", "Yes. Producer Studio supports exact LED-count editing from 1–500 LEDs. You can type a value, use +/− controls or move the slider."],
  ["Can I change my LED count after setup?", "Yes. If the count changes after hardware planning, LightSync warns that the saved Power Adapter recommendation may be outdated and offers to recalculate the hardware guidance."],
  ["Can I export my LightSync settings?", "Yes. Settings & Recovery includes Export Config and Import Config for backing up and restoring configuration through a JSON file."],
  ["Can I reset only my hardware setup?", "Yes. Reset Hardware Setup clears the saved hardware configuration and reopens the Setup Wizard without requiring a reinstall."],
  ["Does LightSync require a microphone?", "No for the normal workflow. LightSync can capture the audio playing on the Windows PC through system-output / loopback audio, so a microphone is not required."],
  ["Do I need to install .NET?", "No. The public LightSync Windows installer contains a self-contained build, so the required .NET runtime is included with LightSync."],
  ["How does real kick detection work?", "Kick flashes react only to kick events detected from the live PC audio signal. BPM and rhythm timing can guide animations and scene timing, but they do not trigger the real kick flash."],
  ["What happens if my WLED IP address changes?", "Automatic WLED discovery and reconnect can help find the device again when its IP address changes."],
  ["Can I rerun the setup wizard?", "Yes. After first-run setup, the wizard can be opened again from Hardware & Setup whenever you need to reconfigure hardware or audio."],
];

export default function FAQ(){return <div className="mt-8 grid gap-3 lg:grid-cols-2">{faq.map(([q,a])=><details key={q} className="glass group rounded-2xl p-5"><summary className="cursor-pointer list-none font-medium">{q}<span className="float-right text-slate-400 transition group-open:rotate-45">+</span></summary><p className="mt-3 pr-8 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{a}</p></details>)}</div>}
