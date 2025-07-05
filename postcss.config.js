import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ], // ✅ Comma was missing here

  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1f2937',
      },
    },
  },
  plugins: [typography], // ✅ Good plugin inclusion
};

export default config;
