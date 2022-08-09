/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{html,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sansita: ['Sansita Swashed', 'cursive'],
        arima: ['Arima', 'cursive'],
      },
    },
  },
  plugins: [],
};
