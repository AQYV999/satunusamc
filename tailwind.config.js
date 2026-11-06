/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030201',
        surface: '#13100C',
        line: '#090705',
        accent: '#DAAD46',
        'accent-bright': '#F4CC64',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Rajdhani"', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};