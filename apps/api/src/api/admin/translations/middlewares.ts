import { type MiddlewareRoute } from '@medusajs/framework'

import {
  validateTranslationPayload,
  validateAndTransformTranslationQuery,
} from './utils/middlewares'

export const adminTranslationsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/admin/translations/:entity_type/:entity_id',
    method: ['GET'],
    middlewares: [validateAndTransformTranslationQuery()],
  },
  {
    matcher: '/admin/translations/:entity_type/:entity_id',
    method: ['POST'],
    middlewares: [validateTranslationPayload()],
  },
]
