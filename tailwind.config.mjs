import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        base: {
          dark: "#0D0D0F",
          light: "#F5F5F5",
          grey: "#9CA3AF",
        },
        neon: {
          yellow: "#F8F32B",
          cyan: "#00FFF7",
          pink: "#FF00A0",
          purple: "#A020F0",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
});
