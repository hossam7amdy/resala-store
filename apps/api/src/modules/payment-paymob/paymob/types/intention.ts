import { z } from 'zod'
import {
  BillingDataSchema,
  ItemSchema,
  MetadataSchema,
  PaymentMethodsSchema,
  amountCents,
  timestampValidation,
} from './common'

/**
 * Schema for creating a Payment Intention request.
 */
export const CreateIntentionRequestSchema = z.object({
  amount: amountCents(), // Amount in lowest currency unit (e.g., cents, piastres)
  currency: z.string(), // e.g., 'EGP', 'USD'
  payment_methods: PaymentMethodsSchema,
  items: z.array(ItemSchema).optional(),
  billing_data: BillingDataSchema,
  extras: z.record(z.any()).optional(), // You can include any additional parameters
  special_reference: z.string().optional(), // Pass a unique special reference number
  expiration: z.number().int().positive().optional(), // The intention duration in seconds
  notification_url: z.string().url().optional(), // URL for transaction-processed callback
  redirection_url: z.string().url().optional(), // URL for customer redirection
})
export type CreateIntentionRequest = z.infer<
  typeof CreateIntentionRequestSchema
>

export const CreateIntentionResponseSchema = z.object({
  payment_keys: z.array(z.record(z.string(), z.any())),
  intention_order_id: z.number(),
  id: z.string(), // Intention ID
  intention_detail: z.record(z.string(), z.any()),
  client_secret: z.string(),
  payment_methods: z.array(z.record(z.string(), z.any())),
  special_reference: z.string().optional(),
  confirmed: z.boolean(),
  status: z.string(),
  created: timestampValidation(),
  card_detail: z.string().optional().nullable(),
  card_tokens: z.array(z.any()),
  object: z.string(),
})
export type CreateIntentionResponse = z.input<
  typeof CreateIntentionResponseSchema
>

export const IntentionSchema = z.object({
  id: z.string(),
  client_secret: z.string(),
  amount: amountCents(),
  currency: z.string(),
  status: z.string(),
  payment_method_options: z.object({
    card: z.object({
      request_three_d_secure: z.string(),
    }),
  }),
  created_at: timestampValidation(),
  metadata: MetadataSchema.optional(),
})
export type Intention = z.input<typeof IntentionSchema>
