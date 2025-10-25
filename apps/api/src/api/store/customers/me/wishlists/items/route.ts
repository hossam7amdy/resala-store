import { MedusaError } from '@medusajs/framework/utils'
import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { StoreCreateWishlistItemType } from '../validators'
import { refetchWishlist } from '../helpers'
import { StoreCreateWishlistItemResponse } from '@repo/shared-types'
import { createWishlistItemWorkflow } from '../../../../../../workflows/wishlist'

/** Create wishlist item for a customer */
export async function POST(
  req: AuthenticatedMedusaRequest<StoreCreateWishlistItemType>,
  res: MedusaResponse<StoreCreateWishlistItemResponse>
) {
  if (!req.publishable_key_context?.sales_channel_ids.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'At least one sales channel ID is required to be associated with the publishable API key in the request header.'
    )
  }
  const { result } = await createWishlistItemWorkflow(req.scope).run({
    input: {
      variant_id: req.validatedBody.variant_id,
      customer_id: req.auth_context.actor_id,
      sales_channel_id: req.publishable_key_context?.sales_channel_ids[0],
    },
  })

  const wishlist = await refetchWishlist(
    result.wishlist.customer_id,
    req.scope,
    req.queryConfig.fields,
    req.context?.locale
  )

  res.json({ wishlist })
}
