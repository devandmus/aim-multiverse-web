/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // Colores base
        'base-dark': "#0D0D0F",
        'base-light': "#F5F5F5",
        'base-grey': "#9CA3AF",
        
        // Colores neón
        'neon-yellow': "#F8F32B",
        'neon-cyan': "#00FFF7",
        'neon-pink': "#FF00A0",
        'neon-purple': "#A020F0",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        // Gradientes individuales
        'gradient-primary': 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.1) 20%, transparent 40%)',
        'gradient-secondary': 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 30%, transparent 60%)',
        'gradient-accent': 'linear-gradient(45deg, transparent 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
        'gradient-diagonal-1': 'linear-gradient(135deg, rgba(168, 85, 247, 0.03) 0%, transparent 25%)',
        'gradient-diagonal-2': 'linear-gradient(225deg, rgba(59, 130, 246, 0.03) 0%, transparent 25%)',
        'gradient-diagonal-3': 'linear-gradient(315deg, rgba(236, 72, 153, 0.02) 0%, transparent 25%)',
        // Gradientes combinados para el fondo
        'multiverseBg': 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.1) 20%, transparent 40%), linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.1) 30%, transparent 60%), linear-gradient(45deg, transparent 0%, rgba(236, 72, 153, 0.05) 50%, transparent 70%)',
        'multiverseOverlay': 'linear-gradient(135deg, rgba(168, 85, 247, 0.03) 0%, transparent 25%), linear-gradient(225deg, rgba(59, 130, 246, 0.03) 0%, transparent 25%), linear-gradient(315deg, rgba(236, 72, 153, 0.02) 0%, transparent 25%)'
      },
      boxShadow: {
        // resplandores suaves neón
        'neon-cyan':  "0 0 0 1px rgba(0,255,247,0.35), 0 0 20px rgba(0,255,247,0.20)",
        'neon-pink':  "0 0 0 1px rgba(255,0,160,0.30), 0 0 18px rgba(255,0,160,0.18)",
        'neon-yel':   "0 2px 0 rgba(0,0,0,0.65), 0 0 22px rgba(248,243,43,0.35)",
        'panel':      "inset 0 0 0 1px rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.04)",
      },
    },
  },
  plugins: [],
}
