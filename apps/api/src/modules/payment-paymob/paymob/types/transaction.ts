import { z } from 'zod'
import {
  amountCents,
  emailValidation,
  integer,
  positiveInteger,
  timestampValidation,
} from './common'

// --- Merchant Schema ---
export const MerchantSchema = z.object({
  id: integer(),
  created_at: timestampValidation(),
  phones: z.array(z.string()),
  company_emails: z.array(emailValidation()),
  company_name: z.string(),
  state: z.string(),
  country: z.string(),
  city: z.string(),
  postal_code: z.string(),
  street: z.string(),
})
export type Merchant = z.infer<typeof MerchantSchema>

// --- Shipping Data Schema ---
export const ShippingDataSchema = z.object({
  id: integer(),
  first_name: z.string(),
  last_name: z.string(),
  street: z.string(),
  building: z.string(),
  floor: z.string(),
  apartment: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  email: emailValidation(),
  phone_number: z.string(),
  postal_code: z.string(),
  extra_description: z.string(),
  shipping_method: z.string(),
  order_id: integer(),
  order: integer(),
})
export type ShippingData = z.input<typeof ShippingDataSchema>

// --- Order Schema ---
export const OrderSchema = z.object({
  id: integer(),
  created_at: timestampValidation(),
  delivery_needed: z.boolean(),
  merchant: z.object({
    id: integer(),
    created_at: timestampValidation(),
    phones: z.array(z.string()),
    company_emails: z.array(emailValidation()),
    company_name: z.string(),
    state: z.string(),
    country: z.string(),
    city: z.string(),
    postal_code: z.string(),
    street: z.string(),
  }),
  collector: z.unknown().nullable(),
  amount_cents: amountCents(),
  shipping_data: ShippingDataSchema.nullable(),
  shipping_details: z.unknown().nullable(),
  currency: z.string(),
  is_payment_locked: z.boolean(),
  is_return: z.boolean(),
  is_cancel: z.boolean(),
  is_returned: z.boolean(),
  is_canceled: z.boolean(),
  merchant_order_id: z.string().nullable(),
  wallet_notification: z.unknown().nullable(),
  paid_amount_cents: amountCents(),
  notify_user_with_email: z.boolean(),
  items: z.array(z.unknown()),
  order_url: z.string(),
  commission_fees: amountCents(),
  delivery_fees_cents: amountCents(),
  delivery_vat_cents: amountCents(),
  payment_method: z.string(),
  merchant_staff_tag: z.string().nullable(),
  api_source: z.string(),
  pickup_data: z.unknown().nullable(),
  delivery_status: z.array(z.unknown()),
})
export type Order = z.input<typeof OrderSchema>

// --- Source Data Schema ---
export const SourceDataSchema = z.object({
  type: z.string(),
  pan: z.string(),
  sub_type: z.string(),
})
export type SourceData = z.input<typeof SourceDataSchema>

// --- Chargeback Schema ---
export const ChargebackSchema = z.object({
  amount_cents: amountCents(),
  currency: z.string(),
  reason_code: z.string(),
})
export type Chargeback = z.input<typeof ChargebackSchema>

// --- Acquirer Schema ---
export const AcquirerSchema = z.object({
  acquirer: z.string(),
  merchant_id: z.string(),
  terminal_id: z.string(),
  merchant_name: z.string(),
  merchant_city: z.string(),
  merchant_country: z.string(),
  settlement_amount: z.string(),
  settlement_currency: z.string(),
  transaction_id: z.string(),
  auth_code: z.string(),
  reference_number: z.string(),
  receipt_no: z.string(),
  batch_no: z.string(),
  message: z.string(),
  response_code: z.string(),
  pos_entry_mode: z.string(),
  card_data: z.string(),
  acq_response_code: z.string(),
  avs_acq_response_code: z.string(),
  eci: z.string(),
  cavv: z.string(),
  xid: z.string(),
  network: z.string(),
  card_type: z.string(),
  authentication_3ds: z.string(),
  transaction_status: z.string(),
  transaction_status_reason: z.string(),
  transaction_status_info: z.string(),
  transaction_status_details: z.string(),
  transaction_status_details_reason: z.string(),
  transaction_status_details_info: z.string(),
})
export type Acquirer = z.input<typeof AcquirerSchema>

// --- Base MIGS Transaction Schema ---
export const BaseMigsTransactionSchema = z.object({
  id: z.string(),
  amount: amountCents(),
  currency: z.string(),
  merchant: z.string(),
  terminal: z.string(),
  type: z.string(),
})
export type BaseMigsTransaction = z.input<typeof BaseMigsTransactionSchema>

export const BaseMigsOrderSchema = z.object({
  amount: amountCents(),
  chargeback: ChargebackSchema,
  creationTime: z.string(),
  currency: z.string(),
  id: z.string(),
  merchantId: z.string(),
  merchantOrderId: z.string(),
  merchantTransactionId: z.string(),
  status: z.string(),
  terminalId: z.string(),
  totalAuthorizedAmount: z.string(),
  totalCapturedAmount: z.string(),
  totalRefundedAmount: z.string(),
  transaction: BaseMigsTransactionSchema,
})
export type BaseMigsOrder = z.input<typeof BaseMigsOrderSchema>

// --- Base Transaction Data Schema ---
export const BaseTransactionDataSchema = z.object({
  order: OrderSchema,
  created_at: timestampValidation(),
  transaction_processed_callback_responses: z.array(z.unknown()),
  currency: z.string(),
  source_data: SourceDataSchema,
  api_source: z.string(),
  is_void: z.boolean(),
  is_refund: z.boolean(),
  is_capture: z.boolean(),
  is_standalone_payment: z.boolean(),
  payment_key_claims: z.unknown().nullable(),
  error_occured: z.boolean(),
  is_live: z.boolean(),
  other_endpoint_reference: z.unknown().nullable(),
  refunded_amount_cents: amountCents(),
  source_id: integer(),
  is_captured: z.boolean(),
  captured_amount: amountCents(),
  merchant_staff_tag: z.string().nullable(),
  updated_at: timestampValidation(),
  is_settled: z.boolean(),
  bill_balanced: z.boolean(),
  is_bill: z.boolean(),
  owner: integer(),
  parent_transaction: z.unknown().nullable(),
  redirect_url: z.string().nullable(),
  merchant: MerchantSchema,
  merchant_external_link: z.string().nullable(),
  acquirer: AcquirerSchema,
  terminal_id: z.unknown().nullable(),
  installment: z.unknown().nullable(),
  order_id: integer(),
  hmac: z.string(),
  use_redirection: z.boolean(),
  rrn: z.string(),
  migs_order: BaseMigsOrderSchema,
  integration_id: integer(),
  klass: z.string(),
  created_by: z.string(),
  gateway_source_data: z.unknown().nullable(),
  secure_hash: z.string(),
  avs_result_code: z.string(),
  avs_acq_response_code: z.string(),
  acs_eci: z.string(),
})
export type BaseTransactionData = z.input<typeof BaseTransactionDataSchema>

export const BaseTransactionResponseSchema = z.object({
  id: integer(),
  pending: z.boolean(),
  amount_cents: amountCents(),
  success: z.boolean(),
  is_auth: z.boolean(),
  is_capture: z.boolean(),
  is_captured: z.boolean(),
  is_standalone_payment: z.boolean(),
  is_void: z.boolean(),
  is_refund: z.boolean(),
  is_voided: z.boolean(),
  is_refunded: z.boolean(),
  is_3d_secure: z.boolean(),
  integration_id: integer(),
  profile_id: integer(),
  has_parent_transaction: z.boolean(),
  order: OrderSchema,
  created_at: timestampValidation(),
  transaction_processed_callback_responses: z.array(z.unknown()),
  currency: z.string(),
  source_data: SourceDataSchema,
  api_source: z.string(),
  terminal_id: z.unknown().nullable(),
  merchant_commission: integer(),
  installment: z.unknown().nullable(),
  error_occured: z.boolean(),
  refunded_amount_cents: amountCents(),
  captured_amount: amountCents(),
  updated_at: timestampValidation(),
  is_settled: z.boolean(),
  bill_balanced: z.boolean(),
  is_bill: z.boolean(),
  owner: integer(),
  parent_transaction: integer(),
})
export type BaseTransactionResponse = z.input<
  typeof BaseTransactionResponseSchema
>

// Transaction operation request schemas
export const RefundRequestSchema = z.object({
  transaction_id: z.string(),
  amount_cents: positiveInteger(), // Must refund at least 1 cent
  reason: z.string().optional(),
})
export type RefundRequest = z.input<typeof RefundRequestSchema>

export const CaptureRequestSchema = z.object({
  transaction_id: z.string(),
  amount_cents: positiveInteger(), // Must capture at least 1 cent
})
export type CaptureRequest = z.input<typeof CaptureRequestSchema>

export const VoidRequestSchema = z.object({
  transaction_id: z.string(),
})
export type VoidRequest = z.input<typeof VoidRequestSchema>

export const TransactionInquiryRequestSchema = z.object({
  transaction_id: z.string(),
})
export type TransactionInquiryRequest = z.input<
  typeof TransactionInquiryRequestSchema
>

// Transaction operation response schemas
// Refund Transaction Data Schema
export const RefundTransactionDataSchema = z.object({
  ...BaseTransactionDataSchema.shape,
  transaction_id: z.string(),
  parent_id: z.string(),
})
export type RefundTransactionData = z.input<typeof RefundTransactionDataSchema>

// Capture Transaction Data Schema
export const CaptureTransactionDataSchema = z.object({
  ...BaseTransactionDataSchema.shape,
  transaction_id: z.string(),
  parent_id: z.string(),
})
export type CaptureTransactionData = z.input<
  typeof CaptureTransactionDataSchema
>

// Void Transaction Data Schema
export const VoidTransactionDataSchema = z.object({
  ...BaseTransactionDataSchema.shape,
  transaction_id: z.string(),
  parent_id: z.string(),
})
export type VoidTransactionData = z.input<typeof VoidTransactionDataSchema>

// Payment Transaction Data Schema
const PaymentMigsOrderSchema = z.object({
  ...BaseMigsOrderSchema.shape,
  acceptPartialAmount: z.boolean(),
  authenticationStatus: z.string(),
  status: z.string(),
  totalAuthorizedAmount: z.union([integer(), z.null()]).nullable(),
  totalCapturedAmount: z.union([integer(), z.null()]).nullable(),
})

const PaymentMigsTransactionSchema = z.object({
  ...BaseMigsTransactionSchema.shape,
  authenticationStatus: z.string(),
  authorizationResponse: z.object({
    stan: z.string(),
    authorizationCode: z.string(),
    responseCode: z.string(),
    responseMessage: z.string(),
  }),
  receipt: z.string(),
  type: z.literal('PAYMENT'),
  status: z.string(),
})

export const PaymentTransactionDataSchema = z.object({
  ...BaseTransactionDataSchema.shape,
  transaction_id: z.string(),
  migs_order: PaymentMigsOrderSchema,
  migs_transaction: PaymentMigsTransactionSchema,
})
export type PaymentTransactionData = z.input<
  typeof PaymentTransactionDataSchema
>
// Payment Key Claims Schema
export const BillingDataClaimsSchema = z.object({
  apartment: z.string(),
  email: emailValidation(),
  floor: z.string(),
  first_name: z.string(),
  street: z.string(),
  building: z.string(),
  phone_number: z.string(),
  shipping_method: z.string(),
  postal_code: z.string(),
  city: z.string(),
  country: z.string(),
  last_name: z.string(),
  state: z.string(),
})
export type BillingDataClaims = z.infer<typeof BillingDataClaimsSchema>

export const PaymentKeyClaimsSchema = z.object({
  user_id: integer(),
  amount_cents: amountCents(),
  currency: z.string(),
  integration_id: integer(),
  order_id: integer(),
  billing_data: BillingDataClaimsSchema,
  lock_order_when_paid: z.boolean(),
  extra: z.object({}).passthrough(),
  notification_url: z.string(),
  redirection_url: z.string(),
  single_payment_attempt: z.boolean(),
  exp: integer(),
  pmk_ip: z.string(),
})
export type PaymentKeyClaims = z.input<typeof PaymentKeyClaimsSchema>

/**
 * Detailed schema for Refund Transaction Response based on Paymob API.
 */
export const RefundResponseSchema = z.object({
  ...BaseTransactionResponseSchema.shape,
  is_refund: z.literal(true),
  data: RefundTransactionDataSchema,
})
export type RefundResponse = z.input<typeof RefundResponseSchema>

/**
 * Detailed schema for Capture Transaction Response based on Paymob API.
 */
export const CaptureResponseSchema = z.object({
  ...BaseTransactionResponseSchema.shape,
  is_capture: z.literal(true),
  is_void: z.literal(false),
  is_refund: z.literal(false),
  data: CaptureTransactionDataSchema,
})
export type CaptureResponse = z.input<typeof CaptureResponseSchema>

/**
 * Detailed schema for Void Transaction Response based on Paymob API.
 */
export const VoidResponseSchema = z.object({
  ...BaseTransactionResponseSchema.shape,
  is_void: z.literal(true),
  is_refund: z.literal(false),
  data: VoidTransactionDataSchema,
})
export type VoidResponse = z.input<typeof VoidResponseSchema>

/**
 * Schema for retrieving a transaction response from Paymob API.
 */
export const TransactionResponseSchema = z.object({
  ...BaseTransactionResponseSchema.shape,
  is_standalone_payment: z.boolean(),
  has_parent_transaction: z.boolean(),
  data: PaymentTransactionDataSchema,
  payment_key_claims: PaymentKeyClaimsSchema.optional(),
  parent_transaction: z.string().optional(),
  unique_ref: z.string(),
})
export type TransactionResponse = z.input<typeof TransactionResponseSchema>
