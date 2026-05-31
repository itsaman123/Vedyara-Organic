import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssMinify: true,
  },
  optimizeDeps: {
    include: [
      '@tanstack/react-query',
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'framer-motion',
      'react-icons',
    ],
  },
})
