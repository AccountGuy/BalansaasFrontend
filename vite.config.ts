import { defineConfig, loadEnv } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react'
import viteReact from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
        server: {
      port: Number(process.env.VITE_PORT) || 3001
    },
    plugins: [
      react(),
      TanStackRouterVite(),
    ],
  });
}