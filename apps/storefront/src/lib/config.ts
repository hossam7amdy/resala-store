import Medusa from '@medusajs/js-sdk'

// Defaults to standard port for Medusa server
let RESALA_BACKEND_URL = 'http://localhost:5000'

if (process.env.RESALA_BACKEND_URL) {
  RESALA_BACKEND_URL = process.env.RESALA_BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: RESALA_BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_RESALA_PUBLISHABLE_KEY,
})
