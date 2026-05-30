import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bosch_red: "#E00420",
        charcoal: "#1F2933",
        text_dark: "#2E3033",
        text_medium: "#6B7280",
        page_bg: "#F5F6F7",
        card_bg: "#FFFFFF",
        border_grey: "#E5E7EB",
        bosch_blue: "#005691",
        process_cyan: "#00A8E1",
        success_green: "#00884A",
        warning_yellow: "#FFCF00",
        master_purple: "#7A1FA2"
      },
      boxShadow: {
        card: "0 1px 2px rgba(0, 0, 0, 0.05)"
      }
    }
  },
  plugins: []
};

export default config;
