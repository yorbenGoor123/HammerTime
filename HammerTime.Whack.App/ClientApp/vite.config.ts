import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {host: true, strictPort: true, port: 8080 },
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    exclude: ['e2e', 'node_modules', 'dist', 'build'],
  }
})
