import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': '60px 1fr'
      },
      fontFamily: {
        lato: ['var(--font-lato)'],
        open: ['var(--font-open)'],
      }
      ,
      colors: {
        dark: {
          25: "#1d1b2255",
          50: "#1d1b22aa",
          75: "#1d1b22dd",
          100: "#1d1b22ff"
        },
        bean: {
          25: "#45414155",
          50: "#454141aa",
          75: "#454141dd",
          100: "#454141ff"
        },
        cream: {
          25: "#d5d0d055",
          50: "#d5d0d0aa",
          75: "#d5d0d0dd",
          100: "#d5d0d0ff"
        },
        salt: {
          25: "#f7fbfc55",
          50: "#f7fbfcaa",
          75: "#f7fbfcdd",
          100: "#f7fbfcff"
        },
      }
    },
  },
  plugins: [],
};
export default config;
