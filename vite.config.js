import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: { 
    allowedHosts: ['577c-103-163-182-157.ngrok-free.app']
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react(),tailwindcss()],
})
