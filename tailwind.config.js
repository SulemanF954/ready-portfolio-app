/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(37, 99, 235, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        glow: 'glow 0.8s ease-out',
        pulse: 'pulse 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
}