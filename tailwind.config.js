const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        /** variables taken from quasar.variables.scss */
        primary: "#001427",
        secondary: "#34405d",
        accent: "#BF0603",
        tertiary: "#F4D58D",
        quaternary: "#8D0801",
        dark: "#1d1d1d",
      },
      transitionProperty: {
        "bg-width": "background-color, width",
      },
    },
    screens: {
      sm: "1024px",
      md: "1440px",
      lg: "1920px",
      xl: "2560px",
    },
  },
  prefix: "tw-",
  variants: {},
  plugins: [],
};
