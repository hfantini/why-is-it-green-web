import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_NUMBER__: JSON.stringify(process.env.BUILD_NUMBER),
    __GIT_SHA__: JSON.stringify(process.env.GIT_SHA),
  },
})
