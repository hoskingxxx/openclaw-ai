import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 背景色 - 深空灰（非纯黑）
        background: {
          primary: "#1a1a1a",
          secondary: "#242424",
          tertiary: "#2e2e2e",
          elevated: "#383838",
        },
        // 品牌色 - OpenClaw 红
        brand: {
          primary: "#FF4500",
          hover: "#FF5722",
          muted: "rgba(255, 69, 0, 0.15)",
        },
        // 文本色
        text: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.7)",
          tertiary: "rgba(255, 255, 255, 0.5)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0, 0, 0, 0.3)",
        md: "0 8px 24px rgba(0, 0, 0, 0.4)",
        lg: "0 16px 48px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
