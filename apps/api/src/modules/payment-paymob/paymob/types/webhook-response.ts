import { z } from 'zod'

const TransactionObjectSchema = z.object({
  id: z.number(),
  pending: z.boolean(),
  amount_cents: z.number(),
  success: z.boolean(),
  is_auth: z.boolean(),
  is_capture: z.boolean(),
  is_standalone_payment: z.boolean(),
  is_voided: z.boolean(),
  is_refunded: z.boolean(),
  is_3d_secure: z.boolean(),
  integration_id: z.number(),
  has_parent_transaction: z.boolean(),
  created_at: z.string(),
  currency: z.string(),
  error_occured: z.boolean(),
  order: z.object({
    id: z.number(),
  }),
  owner: z.number(),
  source_data: z.object({
    pan: z.string(),
    type: z.string(),
    sub_type: z.string(),
  }),
})

const TokenObjectSchema = z.object({
  id: z.number(),
  token: z.string(),
  masked_pan: z.string(),
  merchant_id: z.number(),
  card_subtype: z.string(),
  created_at: z.string(),
  email: z.string(),
  order_id: z.string(),
  user_added: z.boolean(),
  next_payment_intention: z.string(),
})

export const TransactionWebhookResponseSchema = z.object({
  type: z.literal('TRANSACTION'),
  obj: TransactionObjectSchema,
})

export type TransactionWebhookResponse = z.infer<
  typeof TransactionWebhookResponseSchema
>

export const TokenWebhookResponseSchema = z.object({
  type: z.literal('TOKEN'),
  obj: TokenObjectSchema,
})

export type TokenWebhookResponse = z.infer<typeof TokenWebhookResponseSchema>

export const WebhookResponseSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('TRANSACTION'),
    obj: TransactionObjectSchema,
  }),
  z.object({
    type: z.literal('TOKEN'),
    obj: TokenObjectSchema,
  }),
])

export type WebhookResponse = z.infer<typeof WebhookResponseSchema>

export const PaymentRedirectResponseSchema = z.object({
  id: z.number(),
  pending: z.boolean(),
  amount_cents: z.number(),
  success: z.boolean(),
  is_auth: z.boolean(),
  is_capture: z.boolean(),
  is_standalone_payment: z.boolean(),
  is_voided: z.boolean(),
  is_refunded: z.boolean(),
  is_3d_secure: z.boolean(),
  integration_id: z.number(),
  has_parent_transaction: z.boolean(),
  order: z.number(),
  created_at: z.string(),
  currency: z.string(),
  error_occured: z.boolean(),
  owner: z.number(),
  'source_data.pan': z.string(),
  'source_data.type': z.string(),
  'source_data.sub_type': z.string(),
  txn_response_code: z.number(),
  hmac: z.string(),
})

export type PaymentRedirectResponseInput = z.input<
  typeof PaymentRedirectResponseSchema
>
export type PaymentRedirectResponseOutput = z.output<
  typeof PaymentRedirectResponseSchema
>
