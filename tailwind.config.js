const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'home': "url('/images/background.png')",
      }),
    },
    fontFamily: {
      body: [
        'Montserrat', 'sans-serif'
      ],
    },
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },

  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
