import { defineMiddlewares } from '@medusajs/framework'
import { storeCustomerWishlistRoutesMiddlewares } from './store/customers/me/wishlists/middlewares'

export default defineMiddlewares({
  routes: [...storeCustomerWishlistRoutesMiddlewares],
})
