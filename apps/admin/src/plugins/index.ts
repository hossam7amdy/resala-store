import { DashboardPlugin } from '../dashboard-app/types'
import { localeRouteModule, localesMenuItemModule } from './locales'
import { reviewRouteModule, reviewsMenuItemModule } from './reviews'
import { wishlistWidgetModule } from './wishlist'
import {
  translationRouteModule,
  translationsMenuItemModule,
} from './translations'

const reviewsPlugin: DashboardPlugin = {
  routeModule: reviewRouteModule,
  menuItemModule: reviewsMenuItemModule,
  widgetModule: { widgets: [] },
  formModule: { customFields: { product: { forms: [], configs: [] } } },
  displayModule: { displays: { product: [] } },
}

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

const wishlistWidgetPlugin: DashboardPlugin = {
  routeModule: { routes: [] },
  menuItemModule: { menuItems: [] },
  widgetModule: wishlistWidgetModule,
  formModule: { customFields: { product: { forms: [], configs: [] } } },
  displayModule: { displays: { product: [] } },
}

export const customPlugins: DashboardPlugin[] = [
  reviewsPlugin,
  localesPlugin,
  translationsPlugin,
  wishlistWidgetPlugin,
]
