import { MedusaError } from '@medusajs/framework/utils'
import { MedusaRequest, MedusaResponse } from '@medusajs/framework'
import type { AdminProductWishlistCountResponse } from '@repo/shared-types'
import WishlistModuleService from '../../../../../modules/wishlist/service'
import { WISHLIST_MODULE } from '../../../../../modules/wishlist'

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse<AdminProductWishlistCountResponse>
) {
  const { id } = req.params

  const query = req.scope.resolve('query')
  const wishlistModuleService =
    req.scope.resolve<WishlistModuleService>(WISHLIST_MODULE)

  const {
    data: [product],
  } = await query.graph({
    entity: 'product',
    fields: ['variants.*'],
    filters: {
      id,
    },
  })

  if (!product) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Product with id: ${id} was not found`
    )
  }

  const count = await wishlistModuleService.getWishlistsOfVariants(
    product.variants.map((v) => v.id)
  )

  res.json({
    count,
  })
}
