import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        border: "var(--border)",
        muted: "var(--muted)",
        surface: "var(--surface)",
      },
      boxShadow: {
        card: "0 20px 45px -30px rgba(15, 23, 42, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        display: ["var(--font-display)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
