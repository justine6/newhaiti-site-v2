import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1f2937', // 👈 Add this line
      },
    },
  },
  plugins: [],
};

export default config;
