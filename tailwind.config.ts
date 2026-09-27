import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 40px rgba(89, 136, 255, .18)",
        card: "0 18px 60px rgba(8, 10, 30, .18)",
      },
    },
  },
  plugins: [],
};

export default config;
