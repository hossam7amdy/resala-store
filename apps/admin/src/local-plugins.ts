import displayModule from 'virtual:medusa/displays'
import formModule from 'virtual:medusa/forms'
import i18nModule from 'virtual:medusa/i18n'
import menuItemModule from 'virtual:medusa/menu-items'
import routeModule from 'virtual:medusa/routes'
import widgetModule from 'virtual:medusa/widgets'

import { DashboardPlugin } from './dashboard-app/types'

import reviewsPlugin from '@plugins/reviews/admin'
import wishlistPlugin from '@plugins/wishlist/admin'
import translationsPlugin from '@plugins/translations/admin'
import draftOrderPlugin from '@medusajs/draft-order/admin'

const localPlugin = {
  widgetModule,
  routeModule,
  displayModule,
  formModule,
  menuItemModule,
  i18nModule,
}

export const localPlugins: DashboardPlugin[] = [
  localPlugin,
  reviewsPlugin,
  translationsPlugin,
  wishlistPlugin,
  draftOrderPlugin,
]
