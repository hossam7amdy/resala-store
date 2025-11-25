import { z } from 'zod'

const AdminTranslateField = z.object({
  name: z.string(),
  value: z.string(),
  metadata: z.record(z.unknown()).optional(),
})

export type AdminTranslateFieldsType = z.infer<typeof AdminTranslateFields>
export const AdminTranslateFields = z.object({
  fromLocale: z.string().max(5).optional(),
  toLocale: z.string().max(5),
  fields: z.array(AdminTranslateField).min(1),
})
