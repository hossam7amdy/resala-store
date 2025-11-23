import { ComponentType } from 'react'

export interface RouteModule {
  routes: {
    path: string
    Component: ComponentType
    children?: {
      path: string
      Component: ComponentType
    }[]
  }[]
}

export interface MenuItemModule {
  menuItems: {
    label: string
    icon?: ComponentType
    path: string
  }[]
}

export interface WidgetModule {
  widgets: any[]
}

export interface FormModule {
  customFields: {
    product: {
      forms: any[]
      configs: any[]
    }
  }
}

export interface DisplayModule {
  displays: {
    product: any[]
  }
}

export interface DashboardPlugin {
  routeModule: RouteModule
  menuItemModule: MenuItemModule
  widgetModule: WidgetModule
  formModule: FormModule
  displayModule: DisplayModule
}
