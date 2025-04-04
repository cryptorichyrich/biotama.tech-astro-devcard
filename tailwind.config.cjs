const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      primary: {
        50: '#fef9f3',
        100: '#fdf2e7',
        200: '#fae5d0',
        300: '#f7d1b0',
        400: '#f4bc8f',
        500: '#c69863',
        600: '#c69863',
        700: '#a27851',
        800: '#916848',
        900: '#80593f',
        950: '#604330',
      },
      gray: colors.gray,
    },
    extend: {
      spacing: {
        18: '4.5rem',
      },
      keyframes: {
        show: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        show: 'show 225ms ease-in-out',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
