import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],


  server: {
    host:true,
    strictPort: true,
    port:3000,
    mimeTypes: {
      // GLTF files
      'model/gltf+json': ['gltf'],
      // Binary files
      'application/octet-stream': ['bin'],
    },
  },
})
