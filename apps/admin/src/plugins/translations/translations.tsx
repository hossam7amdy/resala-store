import { RouteModule, MenuItemModule } from '../../dashboard-app'
import { Component as TranslationEntity } from '../../routes/translations/[entity_type]'
import {
  config,
  Component as TranslationEntityList,
} from '../../routes/translations'
import { withOutlet } from '../plugin-route-helpers'

export const TRANSLATIONS_PATH = '/translations' as const

export const translationRouteModule: RouteModule = {
  routes: [
    {
      path: TRANSLATIONS_PATH,
      Component: withOutlet(TranslationEntityList),
      children: [
        {
          path: ':entity_type',
          Component: TranslationEntity,
        },
      ],
    },
  ],
}

export const translationsMenuItemModule: MenuItemModule = {
  menuItems: [
    {
      path: TRANSLATIONS_PATH,
      label: config.label || 'Translations',
      icon: config.icon,
    },
  ],
}
