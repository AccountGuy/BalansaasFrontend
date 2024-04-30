import { defineConfig, loadEnv } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import viteReact from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 3001
  },
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
})