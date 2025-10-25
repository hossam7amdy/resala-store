import { GlobeEurope } from '@medusajs/icons'
import { defineRouteConfig } from '@medusajs/admin-sdk'

export { TranslationsPage as Component } from './page'
export const config = defineRouteConfig({
  label: 'Translations',
  icon: GlobeEurope,
})
