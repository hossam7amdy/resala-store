import { MiddlewareRoute } from '@medusajs/framework'
import { parseRequestLocale } from './parse-customer-locale'

export const storeGlobalRoutesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/store*',
    middlewares: [parseRequestLocale],
  },
]
