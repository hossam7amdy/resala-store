import { InjectionZone } from '@medusajs/admin-shared'
import { WidgetModule } from '../../dashboard-app'
import { config, ProductWidget } from '../../widgets/product-page'

export const wishlistWidgetModule: WidgetModule = {
  widgets: [
    {
      Component: ProductWidget as React.ComponentType<any>,
      zone: [config.zone as InjectionZone],
    },
  ],
}
