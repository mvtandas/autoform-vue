import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AutoformVue',
      fileName: 'autoform-vue',
    },
    rollupOptions: {
      external: ['vue', '@autoform/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@autoform/core': 'AutoformCore',
        },
      },
    },
  },
})
