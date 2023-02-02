/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        'code-theme': {
          primary: '#0A1128',
          secondary: '#001F54',
          accent: '#034078',
          neutral: '#00ADDD',
          'base-100': '#FEFCFB',
        },
      },
    ],
  }
}
