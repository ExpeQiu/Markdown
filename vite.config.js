import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 根据要求设置端口为3000
    open: true,
  },
  // 正确设置路径
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 设置构建选项
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
}) 