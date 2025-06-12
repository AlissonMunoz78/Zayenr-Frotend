import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Carga variables del .env
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT) || 5173,
    host: '0.0.0.0' // importante si estás desplegando en Render
  }
});
