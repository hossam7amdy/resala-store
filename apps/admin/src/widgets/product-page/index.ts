import { defineWidgetConfig } from '@medusajs/admin-sdk'

export { default, ProductWidget } from './wishlist-widget'

export const config = defineWidgetConfig({
  zone: 'product.details.before',
})
