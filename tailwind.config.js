/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.{ejs,js,html}', './views/**/*.{ejs,js,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sansita: ['Sansita Swashed', 'cursive'],
        arima: ['Arima', 'cursive'],
      },
      boxShadow: {
        under: '0 20px 10px -15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
