import { z } from 'zod'
import { booleanString } from '@medusajs/medusa/api/utils/common-validators/common'
import {
  createFindParams,
  createSelectParams,
} from '@medusajs/medusa/api/utils/validators'

export const AdminCreateLanguage = z.object({
  code: z.string().min(2).max(3),
  name: z.string().min(2).max(50),
  metadata: z.record(z.unknown()).optional(),
})

export const AdminUpdateLanguage = z.object({
  is_default: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
})

export const AdminGetLanguage = createSelectParams()

export const AdminGetLanguageListParams = createFindParams().merge(
  z.object({
    q: z.string().optional(),
    is_published: booleanString().optional(),
    is_default: booleanString().optional(),
  })
)
