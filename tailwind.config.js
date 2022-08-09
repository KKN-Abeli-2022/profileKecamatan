/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{ejs,js,html}'],
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
