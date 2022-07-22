/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        secondary: '#1a1a1a',
        accentDark: '#08204e',
        accentLight: '#38bdf8',
        textcolor: '#a1a1a1',
        bordercolor: '#2b2b2b',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')({ strategy: 'class' })],
}
