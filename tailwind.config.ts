import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}', // 👈 Important for Markdown utils
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1f2937',
      },
    },
  },
  plugins: [typography], // 👈 Added the plugin here
};

export default config;
