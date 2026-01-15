import { refetchEntity } from '@medusajs/framework'
import type { MedusaContainer } from '@medusajs/framework/types'
import { WishlistDTO } from '../../../../../types'
import { applyTranslations } from '@medusajs/framework/utils'

export const refetchWishlist = async (
  customer_id: string,
  scope: MedusaContainer,
  fields: string[],
  locale?: string
): Promise<WishlistDTO> => {
  const wishlist: WishlistDTO = await refetchEntity({
    entity: 'wishlist',
    idOrFilter: { customer_id },
    scope,
    fields,
  })

  await applyTranslations({
    localeCode: locale,
    objects: [wishlist],
    container: scope,
  })

  return wishlist
}
