import { refetchEntity } from '@medusajs/framework'
import type { MedusaContainer } from '@medusajs/framework/types'

export const refetchWishlist = async (
  customer_id: string,
  scope: MedusaContainer,
  fields: string[]
) => {
  return await refetchEntity({
    entity: 'wishlist',
    idOrFilter: { customer_id },
    scope,
    fields,
  })
}
