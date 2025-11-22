import { HttpTypes, MedusaContainer } from '@medusajs/framework/types'
import { refetchEntity } from '@medusajs/framework/http'
import { findPublishedTranslation } from '../utils'
import { storeOrderTranslationFields } from './query-config'

export const refetchOrder = async (
  idOrFilter: string | object,
  scope: MedusaContainer,
  fields: string[]
) => {
  return await refetchEntity({
    entity: 'order',
    idOrFilter,
    scope,
    fields,
  })
}

export const withTranslationFields = (fields: string[]) => {
  return fields.concat(storeOrderTranslationFields)
}

export const localizeOrder = (
  order: HttpTypes.StoreOrder & {},
  locale?: string
) => {
  order?.items?.forEach((item) => {
    if (item.variant?.product?.['translations']) {
      const productTranslation = findPublishedTranslation<any>(
        item.variant.product['translations'],
        locale
      )

      if (productTranslation) {
        item['title'] = productTranslation.title || item['title']
        item['product_title'] = productTranslation.title || item.product_title
        item['product_subtitle'] =
          productTranslation.subtitle || item['product_subtitle']
        item['product_description'] =
          productTranslation.description || item['product_description']
      }

      delete item?.variant?.product['translations']
    }
  })

  return order
}

export const localizeOrders = (
  orders: HttpTypes.StoreOrder[],
  locale?: string
) => {
  return orders.map((order) => localizeOrder(order, locale))
}
