import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: "#2A5FFF",
        lightblue: "#5E85FF",
        lighterblue: "#AFC3FF",
        darkgray: "#333333",
        lightgray: "#666666",
        lightergray:"#F1F1F1",
        darkblue: "#1C3FAA",
        red: "#E63946",
        lightred: "#FDEDED",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Arial", "sans-serif"],
        montserrat: "var(--font-montserrat)",
      },
    },
  },
  plugins: [],
} satisfies Config;
