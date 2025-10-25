import { RouteModule, MenuItemModule } from '../../dashboard-app'
import { Component as LocaleCreate } from '../../routes/locales/locale-create'
import {
  config,
  Component as LocaleList,
} from '../../routes/locales/locale-list'
import { withOutlet } from '../plugin-route-helpers'

export const LOCALE_SETTINGS_PATH = '/settings/languages' as const

export const localeRouteModule: RouteModule = {
  routes: [
    {
      path: LOCALE_SETTINGS_PATH,
      Component: withOutlet(LocaleList),
      children: [
        {
          path: 'create',
          Component: LocaleCreate,
        },
      ],
    },
  ],
}

export const localesMenuItemModule: MenuItemModule = {
  menuItems: [
    {
      path: LOCALE_SETTINGS_PATH,
      label: config.label || 'Languages',
      icon: config.icon,
    },
  ],
}
