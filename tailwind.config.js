/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'pc': '1366px',
    },
    extend: {
      animation: {
        shriggle: 'shrink 0.2s 1, wiggle 0.75s 0.2s infinite',
      },
      keyframes: {
        shrink: {
          from: { transform: 'scale(1) ' },
          to: { transform: 'scale(0.9) ' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(0.9)' },
          '50%': { transform: 'rotate(3deg) scale(0.9)' },
        },
      },
    },
  },
  plugins: [],
};
