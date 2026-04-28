/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00bcd4',
        'primary-dark': '#00acc1',
      }
    },
  },
  plugins: [],
}
