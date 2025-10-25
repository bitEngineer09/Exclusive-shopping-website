import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  base: '/', // ensure root path, change if subfolder pe host kar rahe ho
  build: {
    rollupOptions: {
      input: '/index.html' // SPA routing ke liye fallback
    }
  }
});
