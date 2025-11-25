import { z } from 'zod'

export type AdminUpsertProductTagTranslationType = z.infer<
  typeof AdminUpsertProductTagTranslation
>
export const AdminUpsertProductTagTranslation = z.object({
  id: z.string().optional(),
  value: z.string(),
  metadata: z.record(z.unknown()).nullish(),
})
