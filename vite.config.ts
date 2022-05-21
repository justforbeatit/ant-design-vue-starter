import { fileURLToPath, URL } from 'url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from './vite.config.auto-import'
import pages from './vite.config.pages'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const base = mode !== 'production' ? '/' : '/admin/'
  return {
    base,
    build: {
      chunkSizeWarningLimit: 1500
    },
    rollupOptions: {
      output: {
      }
    },
    plugins: [
      vue(),
      ...autoImport(),
      ...pages(),
      viteCompression(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
          },
          javascriptEnabled: true
        },
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APP_PROXY_URL || '',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
