import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/testsSetup.js',
    silent: true, // Disable console.log output
    coverage: {
      reporter: ['text', 'html', 'text-summary'],
      include: ['src/*/*.{js,jsx}'],
      exclude: ['src/*/*.test.{js,jsx}', 'src/*.{js,jsx}', 'src/contexts/*'],
    },
  },
});
