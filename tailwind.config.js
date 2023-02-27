/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#1B1A17',
        secondaryColor: '#A35709',
        yellowColor: '#F0E3CA',
        orangeColor: '#FF8303',
        grayColor: '#9ca3af',
      },
      fontFamily: {
        logoFont: ['Pacifico', 'cursive'],
        dancingScript: ['Dancing Script', 'cursive'],
      },
      keyframes: {
        floatLeft: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      // animation: {
      //   floatLeft: 'floatLeft 1s ease-in-out 1',
      // },
    },
  },
  // plugins: [],
}
