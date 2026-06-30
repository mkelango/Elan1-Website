/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // — Daylight base —
        paper: "#fbfaf7", // warm white canvas
        surface: "#ffffff",
        mist: "#f4f1ec", // warm-white alt section
        // — Obsidian (black rows; mirrors the diagram library) —
        obsidian: "#0a1320",
        obsidian2: "#0f1d30",
        obsidian3: "#13283f",
        // — Ink type scale —
        ink: "#0b1220",
        slate: "#41506a",
        muted: "#8a93a6",
        line: "#e7e2d9", // hairline on paper
        lineDark: "#21344f", // hairline on obsidian
        // — Brand accent system (per-layer wayfinding) —
        clay: "#df8c64",
        clayDeep: "#b9603f",
        blueprint: "#2f6df0", // enterprise blue secondary (customer1 lineage)
        cyan: "#22b8c4",
        gold: "#d39a3a",
        violet: "#7c6cf0",
        green: "#3fae6b",
        rose: "#e0656d",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Outfit"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        kicker: "0.22em",
      },
      maxWidth: {
        shell: "1240px",
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,18,32,.04), 0 12px 32px -18px rgba(11,18,32,.18)",
        lift: "0 1px 2px rgba(11,18,32,.05), 0 28px 60px -26px rgba(11,18,32,.32)",
        glow: "0 0 0 1px rgba(223,140,100,.35), 0 20px 50px -20px rgba(223,140,100,.45)",
      },
      backgroundImage: {
        "dot-paper":
          "radial-gradient(rgba(11,18,32,.06) 1px, transparent 1px)",
        "dot-obsidian":
          "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        dot: "22px 22px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.2,.7,.2,1) both",
        marquee: "marquee 38s linear infinite",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  plugins: [],
};
