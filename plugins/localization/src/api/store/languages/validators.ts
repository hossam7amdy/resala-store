import { z } from 'zod'
import {
  applyAndAndOrOperators,
  booleanString,
} from '@medusajs/medusa/api/utils/common-validators/common'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'

export const StoreGetLanguageParamsFields = createFindParams().extend({
  q: z.string().optional(),
  id: z.union([z.string(), z.array(z.string())]).optional(),
  code: z.union([z.string(), z.array(z.string())]).optional(),
  is_default: booleanString().optional(),
})

export type StoreGetLanguagesParamsType = z.infer<
  typeof StoreGetLanguagesParams
>
export const StoreGetLanguagesParams = createFindParams()
  .merge(StoreGetLanguageParamsFields)
  .merge(applyAndAndOrOperators(StoreGetLanguageParamsFields))
