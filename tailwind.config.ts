import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f7fb",
        panel: "#ffffff",
        ink: "#17223b",
        accent: "#1f7a8c",
        warn: "#d7263d",
      },
    },
  },
  plugins: [],
};

export default config;
