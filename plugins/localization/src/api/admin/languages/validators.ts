import { z } from 'zod'
import {
  booleanString,
  applyAndAndOrOperators,
} from '@medusajs/medusa/api/utils/common-validators/common'
import {
  createFindParams,
  createSelectParams,
} from '@medusajs/medusa/api/utils/validators'

export const AdminCreateLanguage = z.object({
  code: z.string().min(2).max(3),
  name: z.string().min(2).max(50),
  is_rtl: z.boolean().default(false),
  metadata: z.record(z.unknown()).nullish(),
})

export const AdminUpdateLanguage = z.object({
  name: z.string().min(2).max(50).optional(),
  is_rtl: z.boolean().optional(),
  is_default: z.boolean().optional(),
  is_published: z.boolean().optional(),
  metadata: z.record(z.unknown()).nullish(),
})

export const AdminGetLanguageParams = createSelectParams()

export const AdminGetLanguagesParamsFields = z.object({
  q: z.string().optional(),
  id: z.union([z.string(), z.array(z.string())]).optional(),
  code: z.union([z.string(), z.array(z.string())]).optional(),
  is_published: booleanString().optional(),
  is_default: booleanString().optional(),
})

export const AdminGetLanguageListParams = createFindParams()
  .merge(AdminGetLanguagesParamsFields)
  .merge(applyAndAndOrOperators(AdminGetLanguagesParamsFields))
