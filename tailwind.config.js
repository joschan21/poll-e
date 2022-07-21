/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#1a1a1a',
        accentDark: '#08204e',
        accentLight: '#08204e',
        textcolor: '#aebcd1',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
}
