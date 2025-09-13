/**
 * Common schemas and validation patterns for the Paymob SDK
 * Contains reusable validation patterns and common schema structures
 */
import { z } from 'zod'

// --- Common Validation Patterns ---

/**
 * Integer validation pipe
 * @param min Optional minimum value
 */
export const integer = (min?: number) => {
  const schema = z.number().int()
  return min !== undefined ? schema.min(min) : schema
}

/**
 * Positive integer validation (value >= 1)
 */
export const positiveInteger = () => z.number().int().positive()

/**
 * Non-negative integer validation (value >= 0)
 */
export const nonNegativeInteger = () => z.number().int().nonnegative()

/**
 * Amount in cents validation (non-negative integer)
 */
export const amountCents = () => {
  return z.number().int().nonnegative()
}

/**
 * URL validation pipe
 */
export const urlValidation = () => z.string().url()

/**
 * Email validation pipe
 */
export const emailValidation = () => z.string().email()

/**
 * Timestamp validation pipe
 */
export const timestampValidation = () => z.string().datetime()

// --- Common Base Schemas ---

/**
 * Schema for billing data
 */
export const BillingDataSchema = z.object({
  apartment: z.string().optional(),
  first_name: z.string(),
  last_name: z.string(),
  street: z.string().optional(),
  building: z.string().optional(),
  phone_number: z.string().min(1, 'Phone number is required'),
  city: z.string().optional(),
  country: z.string().optional(),
  email: emailValidation().optional(),
  floor: z.string().optional(),
  state: z.string().optional(),
})
export type BillingData = z.infer<typeof BillingDataSchema>

/**
 * Schema for order items
 */
export const ItemSchema = z.object({
  name: z.string(),
  amount: amountCents(),
  description: z.string(),
  quantity: positiveInteger(),
})
export type Item = z.infer<typeof ItemSchema>

/**
 * Schema for payment methods
 */
export const PaymentMethodsSchema = z.array(z.coerce.number()).min(1, {
  message: 'At least one payment method ID is required.',
})
export type PaymentMethods = z.infer<typeof PaymentMethodsSchema>

/**
 * Base schema for API responses with ID and timestamps
 */
export const BaseResourceSchema = z.object({
  id: z.union([z.string(), integer()]),
  created_at: timestampValidation(),
  updated_at: timestampValidation().optional(),
})
export type BaseResource = z.infer<typeof BaseResourceSchema>

/**
 * Schema for customer information
 */
export const CustomerSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: emailValidation().optional(),
  phone_number: z.string().optional(),
})
export type Customer = z.infer<typeof CustomerSchema>

/**
 * Schema for address information
 */
export const AddressSchema = z.object({
  street: z.string().optional(),
  building: z.string().optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
})
export type Address = z.infer<typeof AddressSchema>

/**
 * Schema for metadata
 */
export const MetadataSchema = z.record(z.string(), z.unknown())
export type Metadata = z.infer<typeof MetadataSchema>
