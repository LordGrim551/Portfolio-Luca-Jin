/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',    // Móvil
        'md': '641px',    // Tablet (inicio)
        'lg': '1025px',   // Ordenador (inicio)
      },
    },
  },
  plugins: [],
};