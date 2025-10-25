import { MiddlewareRoute } from '@medusajs/framework/http'
import { validateAndTransformBody } from '@medusajs/framework'
import { AdminTranslateFields } from './validators'

export const adminAutoTranslateRoutesMiddlewares: MiddlewareRoute[] = [
  {
    method: ['GET'],
    matcher: '/admin/auto-translate',
  },
  {
    method: ['POST'],
    matcher: '/admin/auto-translate',
    middlewares: [validateAndTransformBody(AdminTranslateFields)],
  },
]
