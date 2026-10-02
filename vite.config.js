import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    allowedHosts: ['intermediate-web-udgam.onrender.com']
  },
  preview: {
    host: true,
    port: 3000,
    allowedHosts: ['intermediate-web-udgam.onrender.com']
  }
});
