import Medusa from '@medusajs/js-sdk'

declare const __BACKEND_URL__: string | undefined

export const backendUrl =
  (typeof __BACKEND_URL__ !== 'undefined' ? __BACKEND_URL__ : undefined) ?? '/'

export const sdk = new Medusa({
  baseUrl: backendUrl,
  auth: {
    type: 'session',
  },
})
