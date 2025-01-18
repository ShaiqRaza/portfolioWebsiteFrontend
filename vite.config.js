import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.BACKEND_URL, // Your backend server URL
        changeOrigin: true, // Allows CORS
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally rewrite the path
      },
    },
  },
  plugins: [react()],
});