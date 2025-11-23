import { z } from 'zod'

export type AdminUpsertProductCollectionTranslationType = z.infer<
  typeof AdminUpsertProductCollectionTranslation
>
export const AdminUpsertProductCollectionTranslation = z.object({
  id: z.string().optional(),
  title: z.string(),
  handle: z.string(),
  metadata: z.record(z.unknown()).nullish(),
})
