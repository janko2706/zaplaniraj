import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#363aed",
        secondary: "#37d279",
        tertiary: "#ffbe46",
        bg1: "#f9f9fe",
        bg2: "#f5f5fe",
        bgBtn: "#efeffd",
        border: "#c2c7d0",
        neutral700: "#243757",
        primaryLight: "#ececfd",
        secondaryLight: "#eafbf1",
        secondary500: "#22804a",
        dark: "#091e42",
      },
      fontFamily: {
        "Alex-Brush": ["Alex Brush, cursive"],
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
