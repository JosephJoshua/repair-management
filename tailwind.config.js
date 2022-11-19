/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
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
