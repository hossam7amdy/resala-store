import { DashboardPlugin } from '../dashboard-app/types'
import { localeRouteModule, localesMenuItemModule } from './locales'
import {
  translationRouteModule,
  translationsMenuItemModule,
} from './translations'

import wishlistPlugin from '@plugins/wishlist/admin'
import reviewsPlugin from '@plugins/reviews/admin'

const localesPlugin: DashboardPlugin = {
  routeModule: localeRouteModule,
  menuItemModule: localesMenuItemModule,
  widgetModule: { widgets: [] },
  formModule: { customFields: { product: { forms: [], configs: [] } } },
  displayModule: { displays: { product: [] } },
}

const translationsPlugin: DashboardPlugin = {
  routeModule: translationRouteModule,
  menuItemModule: translationsMenuItemModule,
  widgetModule: { widgets: [] },
  formModule: { customFields: { product: { forms: [], configs: [] } } },
  displayModule: { displays: { product: [] } },
}

export const customPlugins: DashboardPlugin[] = [
  reviewsPlugin,
  localesPlugin,
  translationsPlugin,
  wishlistPlugin,
]
