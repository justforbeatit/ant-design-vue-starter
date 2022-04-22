import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from './vite.config.auto-import'
import pages from './vite.config.pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...autoImport(),
    ...pages(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://local.l8',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
