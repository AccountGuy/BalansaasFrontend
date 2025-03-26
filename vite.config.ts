import { defineConfig, loadEnv } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    server: {
      port: Number(process.env.VITE_PORT) || 3001,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react(), TanStackRouterVite()],
    base: "/",
  }

  if (command !== "serve") {
    config.base = "/BalansaasFrontend/"
  }

  return config
})
