import { z } from 'zod'
import {
  PaymentMethodsSchema,
  amountCents,
  emailValidation,
  timestampValidation,
  urlValidation,
} from './common'

export const CreateQuickLinkRequestSchema = z.object({
  amount_cents: amountCents(),
  payment_methods: PaymentMethodsSchema,
  email: emailValidation(),
  full_name: z.string(),
  phone_number: z.string(),
  description: z.string(),
  is_live: z.boolean().optional(),
  expires_at: timestampValidation().optional(),
  reference_id: z.string().optional(),
  notification_url: urlValidation().optional(),
  redirection_url: urlValidation().optional(),
})
export type CreateQuickLinkRequest = z.input<
  typeof CreateQuickLinkRequestSchema
>

export const CreateQuickLinkResponseSchema = z.object({
  client_url: urlValidation(),
})
export type CreateQuickLinkResponse = z.input<
  typeof CreateQuickLinkResponseSchema
>
