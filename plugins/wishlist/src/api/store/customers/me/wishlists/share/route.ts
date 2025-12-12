import { AuthenticatedMedusaRequest, MedusaResponse } from '@medusajs/framework'
import { MedusaError } from '@medusajs/framework/utils'
import jwt from 'jsonwebtoken'
import { refetchWishlist } from '../helpers'
import { StoreShareWishlistResponse } from '../../../../../../types'

/** Share wishlist for a customer */
export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse<StoreShareWishlistResponse>
) {
  if (!req.publishable_key_context?.sales_channel_ids.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'At least one sales channel ID is required to be associated with the publishable API key in the request header.'
    )
  }

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

  if (
    wishlist.sales_channel_id !==
    req.publishable_key_context.sales_channel_ids[0]
  ) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'Wishlist does not belong to the specified sales channel'
    )
  }

  const { http } = req.scope.resolve('configModule').projectConfig

  const wishlistToken = jwt.sign(
    {
      wishlist_id: wishlist.id,
    },
    http.jwtSecret!,
    {
      expiresIn: http.jwtExpiresIn,
    }
  )

  return res.json({
    token: wishlistToken,
  })
}
