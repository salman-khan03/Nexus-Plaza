import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API calls to the Express server. The SPA's own routes live under
    // other paths, so they never collide with the `/api` proxy.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
