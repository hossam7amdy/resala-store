import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from '@medusajs/framework/http'
import { StoreProductReviewsListResponse } from '../../../../../types'
import type ProductReviewModuleService from '../../../../../modules/product-review/service'
import { PRODUCT_REVIEW_MODULE } from '../../../../../modules/product-review'

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse<StoreProductReviewsListResponse>
) => {
  const { id } = req.params

  const reviewModuleService = req.scope.resolve<ProductReviewModuleService>(
    PRODUCT_REVIEW_MODULE
  )

  const { data, metadata } = await refetchEntities({
    entity: 'reviews',
    scope: req.scope,
    fields: req.queryConfig.fields,
    pagination: req.queryConfig.pagination,
    idOrFilter: {
      product_id: id,
      status: 'approved',
    },
  })

  res.json({
    reviews: data,
    average_rating: await reviewModuleService.getAverageRating(id),
    count: metadata.count,
    offset: metadata.skip,
    limit: metadata.take,
  })
}
