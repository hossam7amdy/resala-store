import { z } from 'zod'
import { booleanString } from '@medusajs/medusa/api/utils/common-validators/common'
import {
  createFindParams,
  createSelectParams,
} from '@medusajs/medusa/api/utils/validators'

export const AdminGetStoreLocaleParams = createSelectParams()

export const AdminGetStoreLocalesParams = createFindParams().merge(
  z.object({
    code: z.string().optional(),
    is_default: booleanString().optional(),
  })
)

export type AdminCreateStoreLocaleType = z.infer<typeof AdminCreateStoreLocale>
export const AdminCreateStoreLocale = z.object({
  store_id: z.string(),
  code: z.string().min(2).max(5),
  name: z.string(),
  native_name: z.string(),
  direction: z.enum(['ltr', 'rtl']),
  is_default: z.boolean().default(false),
  is_published: z.boolean().default(false),
})

export type AdminUpdateStoreLocaleType = z.infer<typeof AdminUpdateStoreLocale>
export const AdminUpdateStoreLocale = AdminCreateStoreLocale.partial()
  .pick({
    is_default: true,
    is_published: true,
  })
  .extend({
    store_id: z.string(),
  })
