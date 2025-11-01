/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
      extend: {
        screens: {
          '1400': '1400px',
          'max-1860': { raw: '(max-width: 1860px)' },
        },
      },
    },
  plugins: [],
}