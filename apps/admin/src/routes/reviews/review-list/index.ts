import { defineRouteConfig } from '@medusajs/admin-sdk'
import { ChatBubbleLeftRight } from '@medusajs/icons'

export { default as Component } from './review-list'

export const config = defineRouteConfig({
  label: 'Reviews',
  icon: ChatBubbleLeftRight,
})
