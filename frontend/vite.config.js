import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    cssMinify: false
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://belgaum-homes-2.onrender.com',
        changeOrigin: true,
        secure: true
      }
    }
  }
})