import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()] as any,
  test: {
    environment: 'jsdom'
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 8000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  base: '/shopeeclone/'
})
