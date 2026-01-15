import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { refetchWishlist } from '../../helpers'
import { StoreDeleteWishlistItemResponse } from '../../../../../../../types'
import { deleteWishlistItemWorkflow } from '../../../../../../../workflows/wishlist'

/** Delete wishlist item for a customer */
export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<StoreDeleteWishlistItemResponse>
) {
  const { result } = await deleteWishlistItemWorkflow(req.scope).run({
    input: {
      wishlist_item_id: req.params.id,
      customer_id: req.auth_context.actor_id,
    },
  })

  const wishlist = await refetchWishlist(
    result.wishlist.customer_id,
    req.scope,
    req.queryConfig.fields,
    req.locale
  )

  res.json({ wishlist })
}
