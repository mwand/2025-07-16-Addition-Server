import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
server: {
    proxy: {
      '/health': `http://localhost:3000`,
      '/sum': `http://localhost:3000`,
    },
  },

  })