import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  safelist: [
    'text-blue-500',
    'bg-red-600',
    'hover:scale-105',
    'text-green-600',
    'bg-blue-50',
    'text-blue-900',
    'text-blue-800',
  ],

  darkMode: 'class', // 🌙 Optional dark mode using class-based toggling

  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1f2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '475px', // extra small screen support
      },
    },
  },

  plugins: [typography],
};

export default config;
