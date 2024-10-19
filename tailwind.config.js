/** @type {import('tailwindcss').Config} */
import { animations } from './src/animations';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        shriggle: 'shrink 0.2s 1, wiggle 0.75s 0.2s infinite',
      },
      keyframes: {
        shrink: {
          'from': { transform: 'scale(1) '},
          'to': { transform: 'scale(0.8) ' },
        },
        wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg) scale(0.8)' },
            '50%': { transform: 'rotate(3deg) scale(0.8)' },
        }
      }
    },
  },
  plugins: [],
};