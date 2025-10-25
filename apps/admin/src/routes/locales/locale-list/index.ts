import { defineRouteConfig } from '@medusajs/admin-sdk'
import { GlobeEurope } from '@medusajs/icons'

export { LocaleList as Component } from './locale-list'
export const config = defineRouteConfig({
  label: 'Languages',
  icon: GlobeEurope,
})
