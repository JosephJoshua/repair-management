/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Public Sans"', 'sans-serif'],
    },
    screens: {
      ...defaultTheme.screens,
      xs: '480px',
    },
  },
  daisyui: {
    darkTheme: 'night',
    themes: ['winter', 'night'],
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')],
};
