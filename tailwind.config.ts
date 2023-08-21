import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#203C6E",
        customBrown: "#6E5520",
        darkYellow: "#BA8411",
        lightBlue: "#4972BA",
        normalBlue: "#035BBA",
      },
    },
  },
  plugins: [],
} satisfies Config;
