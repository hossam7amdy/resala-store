import { z } from 'zod'

export type AdminUpsertProductOptionValueTranslationType = z.infer<
  typeof AdminUpsertProductOptionValueTranslation
>
export const AdminUpsertProductOptionValueTranslation = z.object({
  option_value_id: z.string(),
  id: z.string().optional(),
  value: z.string(),
  metadata: z.string().nullish(),
})

export type AdminUpsertProductOptionTranslationType = z.infer<
  typeof AdminUpsertProductOptionTranslation
>
export const AdminUpsertProductOptionTranslation = z.object({
  id: z.string().optional(),
  option_id: z.string(),
  title: z.string(),
  metadata: z.record(z.unknown()).nullish(),
  values: z.array(AdminUpsertProductOptionValueTranslation).min(1),
})

export type AdminUpsertProductTranslationType = z.infer<
  typeof AdminUpsertProductTranslation
>
export const AdminUpsertProductTranslation = z.object({
  id: z.string().optional(),
  title: z.string(),
  handle: z.string(),
  subtitle: z.string().nullish(),
  description: z.string().nullish(),
  metadata: z.record(z.unknown()).nullish(),
  options: z.array(AdminUpsertProductOptionTranslation).default([]),
})
