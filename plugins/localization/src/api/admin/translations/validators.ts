import { z } from 'zod'
import { booleanString } from '@medusajs/medusa/api/utils/common-validators/common'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'
import {
  isValidField,
  TranslatableResource,
} from '../../../utils/translation-config'

export const AdminRegisterTranslations = z
  .object({
    resource_id: z.string(),
    resource_type: z.nativeEnum(TranslatableResource),
    translations: z
      .array(
        z.object({
          field: z.string().min(1),
          value: z.string().min(1),
          locale: z.string().min(2).max(5),
          is_outdated: z.boolean().optional(),
        })
      )
      .min(1)
      .max(100),
  })
  .refine(
    (data) => {
      return data.translations.every((t) =>
        isValidField(data.resource_type, t.field)
      )
    },
    (data) => {
      const invalidFields = data.translations.filter(
        (t) => !isValidField(data.resource_type, t.field)
      )
      return {
        message: `Field(s) [${invalidFields.map((t) => t.field).join(', ')}] is not translatable for resource '${data.resource_type}'`,
      }
    }
  )

export const AdminRemoveTranslations = z.object({
  resource_id: z.string(),
  resource_type: z.nativeEnum(TranslatableResource),
  locale: z.string().min(2).max(5),
})

export const AdminGetTranslationListParams = createFindParams().merge(
  z.object({
    q: z.string().max(100).optional(),
    resource_id: z.string().optional(),
    resource_type: z.nativeEnum(TranslatableResource).optional(),
    locale: z.string().min(2).max(5).optional(),
    is_outdated: booleanString().optional(),
  })
)
