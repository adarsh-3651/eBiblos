import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: { 
    allowedHosts: ['bc1c-103-41-173-36.ngrok-free.app']
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [react(),tailwindcss()],
})
