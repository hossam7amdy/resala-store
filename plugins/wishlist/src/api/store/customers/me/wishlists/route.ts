import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http'
import { MedusaError } from '@medusajs/framework/utils'
import { refetchWishlist } from './helpers'
import {
  StoreCreateWishlistResponse,
  StoreGetWishlistResponse,
} from '../../../../../types'
import { createWishlistWorkflow } from '../../../../../workflows/wishlist'

/** Create wishlist for a customer */
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<StoreCreateWishlistResponse>
) {
  if (!req.publishable_key_context?.sales_channel_ids.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'At least one sales channel ID is required to be associated with the publishable API key in the request header.'
    )
  }
  const { result } = await createWishlistWorkflow(req.scope).run({
    input: {
      customer_id: req.auth_context.actor_id,
      sales_channel_id: req.publishable_key_context?.sales_channel_ids[0],
    },
  })

  const wishlist = await refetchWishlist(
    result.wishlist.customer_id,
    req.scope,
    req.queryConfig.fields
  )

  res.json({ wishlist })
}

/** Get customer's wishlist */
export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<StoreGetWishlistResponse>
) {
  const wishlist = await refetchWishlist(
    req.auth_context.actor_id,
    req.scope,
    req.queryConfig.fields
  )

  if (!wishlist) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      'No wishlist found for customer'
    )
  }

  return res.json({ wishlist })
}
