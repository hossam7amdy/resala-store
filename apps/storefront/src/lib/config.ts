import Medusa from '@medusajs/js-sdk'

let BACKEND_URL = 'http://localhost:5000'

if (process.env.BACKEND_URL) {
  BACKEND_URL = process.env.BACKEND_URL
}

export const sdk = new Medusa({
  baseUrl: BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
})
