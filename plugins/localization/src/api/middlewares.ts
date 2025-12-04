import { defineMiddlewares } from '@medusajs/framework'
import { storeLanguageMiddlewares } from './store/languages/middlewares'
import { adminLanguageMiddlewares } from './admin/languages/middlewares'
import { adminTranslationMiddlewares } from './admin/translations/middlewares'

export default defineMiddlewares({
  routes: [
    ...storeLanguageMiddlewares,
    ...adminLanguageMiddlewares,
    ...adminTranslationMiddlewares,
  ],
})
