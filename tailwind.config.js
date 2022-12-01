/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'medium-orchid': '#a24fe2',
        'languid-lavender': '#e5d9f2',
        'oxford-blue': '#011936'
      }
    },
  },
  plugins: [],
}
