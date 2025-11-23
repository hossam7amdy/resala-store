import { z } from 'zod'
import { applyAndAndOrOperators } from '@medusajs/medusa/api/utils/common-validators/common'
import {
  createFindParams,
  createSelectParams,
} from '@medusajs/medusa/api/utils/validators'

export type StoreGetLocaleParamsType = z.infer<typeof StoreGetLocaleParams>
export const StoreGetLocaleParams = createSelectParams()

export const StoreGetLocalesParamsFields = z.object({
  q: z.string().optional(),
  is_default: z.union([z.string(), z.array(z.string())]).optional(),
})

export type StoreGetLocalesParamsType = z.infer<typeof StoreGetLocalesParams>
export const StoreGetLocalesParams = createFindParams({
  limit: 50,
  offset: 0,
})
  .merge(StoreGetLocalesParamsFields)
  .merge(applyAndAndOrOperators(StoreGetLocalesParamsFields))
