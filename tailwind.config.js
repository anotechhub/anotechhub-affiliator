/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
     "./public/index.html",
  ],
  darkMode: 'class', // Enable dark mode based on class
  theme: {
    extend: {
      colors: {
        'custom-teal': '#01a1a8',
        'custom-teal-dark': '#018a90',
        'custom-teal-light': '#5dd4d9',
      }
    },
  },
  plugins: [],
}