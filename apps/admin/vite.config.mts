import inject from '@medusajs/admin-vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const BASE = env.VITE_RESALA_BASE || '/'
  const BACKEND_URL = env.VITE_RESALA_BACKEND_URL
  const STOREFRONT_URL = env.VITE_RESALA_STOREFRONT_URL

  /**
   * Add this to your .env file to specify the project to load admin extensions from.
   */
  const RESALA_PROJECT = env.VITE_RESALA_PROJECT || null
  const sources = RESALA_PROJECT ? [RESALA_PROJECT] : []

  return {
    plugins: [
      inspect(),
      react(),
      inject({
        sources,
      }),
    ],
    define: {
      __BASE__: JSON.stringify(BASE),
      __BACKEND_URL__: JSON.stringify(BACKEND_URL),
      __STOREFRONT_URL__: JSON.stringify(STOREFRONT_URL),
    },
    server: {
      open: true,
    },
  }
})
