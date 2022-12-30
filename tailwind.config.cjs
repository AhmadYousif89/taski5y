/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    debugScreens: {
      style: {
        color: '#ffa',
      },
    },

    screens: {
      xs: '540px',
      md: '640px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        'Roboto Mono': ['Roboto Mono', ...defaultTheme.fontFamily.sans],
      },
      ringColor: {
        color: {
          base: 'rgb(var(--ring-color-base) / <alpha-value>)',
          highlight: 'rgb(var(--ring-color-highlight) / <alpha-value>)',
          valid: 'rgb(var(--ring-input-color-valid) / <alpha-value>)',
          validating: 'rgb(var(--ring-input-color-validating) / <alpha-value>)',
          invalid: 'rgb(var(--ring-input-color-invalid) / <alpha-value>)',
        },
      },
      stroke: {
        color: {
          base: 'rgb(var(--icon-stroke-color) / <alpha-value>)',
        },
      },
      textColor: {
        color: {
          base: 'rgb(var(--text-color-base) / <alpha-value>)',
          highlight: 'rgb(var(--text-color-highlight) / <alpha-value>)',
          valid: 'rgb(var(--text-color-valid) / <alpha-value>)',
          invalid: 'rgb(var(--text-color-invalid) / <alpha-value>)',
          link: 'rgb(var(--text-color-link) / <alpha-value>)',
        },
      },
      backgroundColor: {
        color: {
          base: 'rgb(var(--bg-color-base) / <alpha-value>)',
          card: 'rgb(var(--bg-color-card) / <alpha-value>)',
        },
        btn: {
          color: {
            base: 'rgb(var(--btn-bg-color-base) / <alpha-value>)',
            highlight: 'rgb(var(--btn-bg-color-highlight) / <alpha-value>)',
          },
        },
        user: {
          image: 'rgb(var(--user-img-bg-color) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [require('tailwindcss-debug-screens')],
};
