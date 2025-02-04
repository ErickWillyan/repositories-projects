import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        linkColor: "#4493f8",
        buttonColor: "#2EA043",
        buttonColorHover: "#2C974B",
      },
    },
  },
  plugins: [],
} satisfies Config;
