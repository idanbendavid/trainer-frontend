/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

export default defineConfig(() => {
  return {
    server: {
      port: 3000
    },
    build: {
      outDir: 'build',
    },
    plugins: [viteCommonjs(), react()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['react-s3'])],
      },
    }
  }
})

