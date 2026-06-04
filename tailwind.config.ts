import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#E6F1FB",
          100: "#B5D4F4",
          200: "#85B7EB",
          400: "#378ADD",
          600: "#185FA5",
          800: "#0C447C",
          900: "#042C53",
        },
        sand: {
          50: "#F1EFE8",
          100: "#E5E1D5",
          200: "#D3D1C7",
        },
        accent: {
          400: "#EF9F27",
          500: "#BA7517",
          600: "#854F0B",
        },
        muted: "#5F6B7A",
        ink: "#1A2434",
        success: "#0F6E56",
        warning: "#BA7517",
        danger: "#A32D2D",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        cardHover: "0 10px 25px -3px rgb(4 44 83 / 0.12), 0 4px 10px -2px rgb(4 44 83 / 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
