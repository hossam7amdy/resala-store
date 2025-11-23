import { DashboardPlugin } from './types'
import { Component, config } from './routes/reviews/review-list'

const REVIEWS_PATH = '/reviews'

const reviewRouteModule = {
  routes: [
    {
      path: REVIEWS_PATH,
      Component,
    },
  ],
}

const reviewsMenuItemModule = {
  menuItems: [
    {
      label: config.label!,
      icon: config.icon,
      path: REVIEWS_PATH,
    },
  ],
}

const reviewsPlugin: DashboardPlugin = {
  routeModule: reviewRouteModule,
  menuItemModule: reviewsMenuItemModule,
  widgetModule: { widgets: [] },
  formModule: { customFields: { product: { forms: [], configs: [] } } },
  displayModule: { displays: { product: [] } },
}

export default reviewsPlugin
