const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    options: {
      safelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        /** variables taken from quasar.variables.scss */
        primary: '#001427',
        secondary: '#708D81',
        accent: '#BF0603',
        tertiary: '#F4D58D',
        quaternary: '#8D0801',
      },
      transitionProperty: {
        'bg-width': 'background-color, width',
      },
    },
  },

  prefix: 'tw-',

  variants: {},
  plugins: [],
};
