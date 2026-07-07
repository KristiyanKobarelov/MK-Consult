import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#182116",
        moss: "#243023",
        olive: "#35432f",
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
        panel: "0 18px 55px rgba(24, 33, 22, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
