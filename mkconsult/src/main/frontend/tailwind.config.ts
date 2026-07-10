import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#25221d",
        moss: "#8f806f",
        olive: "#6e6254",
        cream: "#f8f3eb",
        paper: "#fcf8f2",
        line: "#ded3c5",
        copper: "#EC5E2A",
        tan: "#f0a06f",
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"],
      },
      boxShadow: {
        panel: "0 18px 55px rgba(37, 34, 29, 0.1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
