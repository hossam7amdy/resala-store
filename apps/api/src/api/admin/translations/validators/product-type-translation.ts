import { z } from 'zod'

export type AdminUpsertProductTypeTranslationType = z.infer<
  typeof AdminUpsertProductTypeTranslation
>
export const AdminUpsertProductTypeTranslation = z.object({
  id: z.string().optional(),
  value: z.string(),
  metadata: z.record(z.unknown()).nullish(),
})
