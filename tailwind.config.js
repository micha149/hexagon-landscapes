const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    'src/**/*.tsx',
    'index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
        white: '#fff',
        black: '#000',
        transparent: 'transparent',
        current: 'currentColor',
        gray: colors.warmGray,
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['focus-visible'],
    },
  },
  plugins: [],
}
