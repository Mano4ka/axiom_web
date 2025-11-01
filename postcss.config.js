/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},  // Изменил на новый плагин
    autoprefixer: {},  // Оставь, если хочешь (опционально для v4)
  },
}