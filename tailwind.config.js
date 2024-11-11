/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        pc: '1368px',
      },
      animation: {
        shriggleNotebook: 'shrinkNotebook 0.2s 1, wiggleNotebook 0.75s 0.2s infinite',
        shriggle: 'shrink 0.2s 1, wiggle 0.75s 0.2s infinite',
      },
      keyframes: {
        shrinkNotebook: {
          from: { transform: 'scale(1) ' },
          to: { transform: 'scale(0.9) ' },
        },
        wiggleNotebook: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(0.9)' },
          '50%': { transform: 'rotate(3deg) scale(0.9)' },
        },
        shrink: {
          from: { transform: 'scale(1) ' },
          to: { transform: 'scale(0.8) ' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg) scale(0.8)' },
          '50%': { transform: 'rotate(3deg) scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
};
