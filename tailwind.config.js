/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030201',          // Background utama (Gallery Deep)
        surface: '#13100C',      // Kartu (Gallery Panel)
        line: '#2A231A',         // Border gelap keemasan
        accent: '#DAAD46',       // Gilt (Emas Utama)
        
        // TRIK SULAP: Menimpa warna emerald agar semua teks & bg otomatis jadi emas
        emerald: {
          400: '#F4CC64', // Gilt Bright (Teks & Ikon)
          500: '#DAAD46', // Gilt (Background Tombol)
          600: '#C99B33', // Dark Gold (Hover & Border)
          900: '#2A231A', // Deep Gold (Background tipis)
        }
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['"Rajdhani"', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};