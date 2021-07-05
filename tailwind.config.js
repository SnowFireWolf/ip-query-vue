module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Roboto', 'system-ui', 'sans-serif'],
      body: ['Roboto', 'system-ui', 'sans-serif'],
    },
    container: {
      padding: '2rem',
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
