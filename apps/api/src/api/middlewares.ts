import { defineMiddlewares } from '@medusajs/framework/http'
import { handleGeneratorMiddlewares } from './admin/middlewares'

export default defineMiddlewares([...handleGeneratorMiddlewares])
