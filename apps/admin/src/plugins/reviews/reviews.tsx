import { RouteModule, MenuItemModule } from '../../dashboard-app'
import { Component, config } from '../../routes/reviews/review-list'

const REVIEWS_PATH = '/reviews'

export const reviewRouteModule: RouteModule = {
  routes: [
    {
      path: REVIEWS_PATH,
      Component,
    },
  ],
}

export const reviewsMenuItemModule: MenuItemModule = {
  menuItems: [
    {
      label: config.label!,
      icon: config.icon,
      path: REVIEWS_PATH,
    },
  ],
}
