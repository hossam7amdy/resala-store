import type {
  MiddlewareRoute,
  MedusaRequestHandler,
} from '@medusajs/framework/http'
import slugify from 'slugify'

const generateHandle: MedusaRequestHandler<any> = (req, _res, next) => {
  if (req.body?.title || req.body?.name || req.body?.handle) {
    req.body['handle'] = slugify(
      req.body?.handle || req.body?.title || req.body?.name
    )
  }
  next()
}

export const handleGeneratorMiddlewares: MiddlewareRoute[] = [
  {
    matcher: '/admin/collections*',
    method: ['POST'],
    middlewares: [generateHandle],
  },
  {
    matcher: '/admin/products*',
    method: ['POST'],
    middlewares: [generateHandle],
  },
  {
    matcher: '/admin/product-categories*',
    method: ['POST'],
    middlewares: [generateHandle],
  },
]
