/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wod: {
          dark: '#0f0f12',
          card: '#18181d',
          cardBorder: '#2e2e38',
          gold: '#c89b3c',
          goldLight: '#e5b857',
          goldDark: '#8e6b22',
          purple: '#9333ea',
          purpleLight: '#c084fc',
          parchment: '#f5f0e6',
          parchmentDark: '#e5ddcc',
          crimson: '#991b1b',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
