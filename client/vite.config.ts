/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  define: {
    'process.env': {},
  },
  server: {
    host: true,
    strictPort: true,
    port:8080
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setup.js',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
