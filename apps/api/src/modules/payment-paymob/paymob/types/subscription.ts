import { z } from 'zod'
import {
  AddressSchema,
  BaseResourceSchema,
  CustomerSchema,
  MetadataSchema,
  amountCents,
  integer,
  nonNegativeInteger,
  positiveInteger,
  timestampValidation,
  urlValidation,
} from './common'

export const SubscriptionFrequencySchema = z
  .enum(['7', '15', '30', '90', '180', '365'])
  .transform(Number) // Assuming API expects numbers but enum needs strings
export type SubscriptionFrequency = z.input<typeof SubscriptionFrequencySchema>

export const CreateSubscriptionPlanRequestSchema = z.object({
  frequency: SubscriptionFrequencySchema,
  name: z.string(),
  reminder_days: nonNegativeInteger().nullable(),
  retrial_days: nonNegativeInteger().nullable(),
  plan_type: z.string(),
  number_of_deductions: positiveInteger().nullable(),
  amount_cents: amountCents(),
  use_transaction_amount: z.boolean(),
  is_active: z.boolean().optional(),
  integration: integer(),
  webhook_url: urlValidation().nullable().optional(),
})
export type CreateSubscriptionPlanRequest = z.input<
  typeof CreateSubscriptionPlanRequestSchema
>

export const SubscriptionPlanSchema = z.object({
  ...BaseResourceSchema.shape,
  frequency: SubscriptionFrequencySchema,
  name: z.string(),
  reminder_days: nonNegativeInteger().nullable(),
  retrial_days: nonNegativeInteger().nullable(),
  plan_type: z.string(),
  number_of_deductions: positiveInteger().nullable(),
  amount_cents: amountCents(),
  use_transaction_amount: z.boolean(),
  is_active: z.boolean(),
  integration: integer(),
  fee: z.number().nullable(),
})
export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>

export const ListSubscriptionPlansResponseSchema = z.array(
  SubscriptionPlanSchema
)
export type ListSubscriptionPlansResponse = z.input<
  typeof ListSubscriptionPlansResponseSchema
>

// --- Subscription Schemas ---
// NOTE: Postman collection didn't show full request/response for creating/getting subscriptions.
// These are inferred based on common patterns and plan details.

/**
 * Schema for creating a subscription.
 * (Partially inferred - needs verification against actual API)
 */
export const CreateSubscriptionRequestSchema = z.object({
  plan_id: integer(),
  payment_token: z.string(), // The token representing the saved card
  ...CustomerSchema.shape,
  ...AddressSchema.shape,
  return_url: urlValidation().optional(),
  charge_failure_count: nonNegativeInteger().optional(),
  description: z.string().optional(),
  metadata: MetadataSchema.optional(),
})
export type CreateSubscriptionRequest = z.input<
  typeof CreateSubscriptionRequestSchema
>

/**
 * Schema for the subscription resource (response).
 * (Highly inferred - needs verification against actual API)
 */
export const SubscriptionSchema = z.object({
  ...BaseResourceSchema.shape,
  plan: SubscriptionPlanSchema, // Assuming the plan details are nested
  customer_details: z.object({
    // Assuming customer info is grouped
    ...CustomerSchema.shape,
    // ... other address fields ...
  }),
  status: z.string(), // e.g., 'active', 'paused', 'cancelled'
  created_at: timestampValidation(),
  updated_at: timestampValidation(),
  // ... other fields like next_billing_date, card_token, etc.
})
export type Subscription = z.input<typeof SubscriptionSchema>
