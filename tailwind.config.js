/** @type {import('tailwindcss').Config} */
export default {
  // Enables class-based dark mode (e.g., <html class="dark">)
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jade: "#00A36C",
        pistachio: "#D5E6D5",
        "deep-forest": "#1a3c34",
        cream: "#f8f9fa",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // ✅ adds prose classes for rich text
  ],
};