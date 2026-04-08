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
        brand: {
          red: '#c70304',
          'red-light': '#df4545',
          'red-dark': '#a00203',
          navy: '#1a1a1a',
          'navy-light': '#333333',
          'navy-dark': '#000000',
        },
      },
      fontFamily: {
        heading: ['Lato', 'sans-serif'],
        body: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
