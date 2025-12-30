import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
    './public/**/*.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair-display)', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;