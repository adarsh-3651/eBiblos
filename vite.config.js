import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: { 
    allowedHosts: ['7c06-203-9-210-8.ngrok-free.app']
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react(),tailwindcss()],
})
