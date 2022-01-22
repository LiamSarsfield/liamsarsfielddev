// https://github.com/michael-ciniawsky/postcss-load-config

const path = require('path');
module.exports = {
  plugins: [
    // to edit target browsers: use "browserslist" field in package.json
    require('autoprefixer'),
    require('tailwindcss')(path.resolve(__dirname, 'tailwind.config.js')),
  ],
};
