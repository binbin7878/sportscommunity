
import { nextui } from "@nextui-org/react";



/** @type {import('tailwindcss').Config} */
const config = {
  content: [ "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

export default config;
