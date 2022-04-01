const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'src/**/*.tsx',
    'index.html',
  ],
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
  plugins: [],
}
