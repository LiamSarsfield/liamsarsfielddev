// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
    mode: 'jit',
    purge: [
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                teal: colors.teal
            },
            transitionProperty: {
                'bg-width': 'background-color, width'
            }
        },
    },

    prefix: 'tw-',

    variants: {},
    plugins: []
}
