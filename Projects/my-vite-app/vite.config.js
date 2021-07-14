import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import { viteMockServe } from "vite-plugin-mock"
import i18n from "./plugins/vite-plugin-i18n"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [vue(), viteMockServe(), i18n],
  resolve: {
    alias: {
      "@": resolve("./src"),
      comps: resolve("./src/components")
    }
  }
})
