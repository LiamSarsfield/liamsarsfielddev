module.exports = {
  presets: [
    '@quasar/babel-preset-app',
  ],
  plugins: [
    [
      '@vue/babel-plugin-jsx', {
      'transformOn': true,
      'optimize': true,
    }]],
};
