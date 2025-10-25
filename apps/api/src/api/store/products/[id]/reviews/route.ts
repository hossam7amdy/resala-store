import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { StoreProductReviewsListResponse } from '@repo/shared-types'
import type ProductReviewModuleService from '../../../../../modules/product-review/service'
import { PRODUCT_REVIEW_MODULE } from '../../../../../modules/product-review'

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<StoreProductReviewsListResponse>
) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)
  const reviewModuleService = req.scope.resolve<ProductReviewModuleService>(
    PRODUCT_REVIEW_MODULE
  )

  const queryConfig = remoteQueryObjectFromString({
    entryPoint: 'review',
    variables: {
      filters: {
        product_id: id,
        status: 'approved',
      },
      ...req.queryConfig.pagination,
    },
    fields: req.queryConfig.fields,
  })
  const { rows: reviews, metadata } = await remoteQuery(queryConfig)

  res.json({
    reviews,
    average_rating: await reviewModuleService.getAverageRating(id),
    ...metadata,
  })
}
