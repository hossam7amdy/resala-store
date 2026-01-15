import {
  MedusaRequest,
  MedusaResponse,
  refetchEntities,
} from '@medusajs/framework'
import type { AdminProductWishlistCountResponse } from '../../../../../types'

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse<AdminProductWishlistCountResponse>
) {
  const { id } = req.params

  const { data: wishlistItems } = await refetchEntities({
    entity: 'wishlist_item',
    fields: ['id'],
    scope: req.scope,
    idOrFilter: {
      product_id: id,
    },
  })

  res.json({
    count: wishlistItems.length,
  })
}
