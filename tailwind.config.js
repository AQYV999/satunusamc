/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#09090b',
        surface: '#111113',
        line: '#1f1f23',
        accent: '#10b981',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Rajdhani"', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};