import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050', // Replace with your backend server URL
        changeOrigin: true, // Change the origin header to match the backend server
        secure: false, // Allow for non-HTTPS connections (if applicable)
      },
    },
  },
  plugins: [react()],
})
