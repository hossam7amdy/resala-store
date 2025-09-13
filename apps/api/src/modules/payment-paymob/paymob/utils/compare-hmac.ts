import { createHmac } from 'node:crypto'

import {
  type PaymentRedirectResponseInput,
  type WebhookResponse,
  WebhookResponseSchema,
  PaymentRedirectResponseSchema,
} from '../types/webhook-response'

export const compareHMACWebhook = (
  data: WebhookResponse,
  hmac: string,
  hmacSecret: string
): boolean => {
  const parsedData = WebhookResponseSchema.parse(data)

  const hmacHasher = createHmac('sha512', hmacSecret)

  if (parsedData.type === 'TRANSACTION') {
    const concatenatedString =
      `${parsedData.obj.amount_cents}` +
      `${parsedData.obj.created_at}` +
      `${parsedData.obj.currency}` +
      `${parsedData.obj.error_occured}` +
      `${parsedData.obj.has_parent_transaction}` +
      `${parsedData.obj.id}` +
      `${parsedData.obj.integration_id}` +
      `${parsedData.obj.is_3d_secure}` +
      `${parsedData.obj.is_auth}` +
      `${parsedData.obj.is_capture}` +
      `${parsedData.obj.is_refunded}` +
      `${parsedData.obj.is_standalone_payment}` +
      `${parsedData.obj.is_voided}` +
      `${parsedData.obj.order.id}` +
      `${parsedData.obj.owner}` +
      `${parsedData.obj.pending}` +
      `${parsedData.obj.source_data.pan}` +
      `${parsedData.obj.source_data.sub_type}` +
      `${parsedData.obj.source_data.type}` +
      `${parsedData.obj.success}`

    const hash = hmacHasher.update(concatenatedString).digest('hex')

    return hash === hmac
  }
  if (parsedData.type === 'TOKEN') {
    const concatenatedString =
      `${parsedData.obj.card_subtype}` +
      `${parsedData.obj.created_at}` +
      `${parsedData.obj.email}` +
      `${parsedData.obj.id}` +
      `${parsedData.obj.masked_pan}` +
      `${parsedData.obj.merchant_id}` +
      `${parsedData.obj.order_id}` +
      `${parsedData.obj.token}`

    const hash = hmacHasher.update(concatenatedString).digest('hex')

    return hash === hmac
  }

  return false
}

export const compareHMACPaymentRedirect = (
  data: PaymentRedirectResponseInput,
  hmac: string,
  hmacSecret: string
): boolean => {
  const parsedData = PaymentRedirectResponseSchema.parse(data)

  const hmacHasher = createHmac('sha512', hmacSecret)

  const concatenatedString =
    `${parsedData.amount_cents}` +
    `${parsedData.created_at}` +
    `${parsedData.currency}` +
    `${parsedData.error_occured}` +
    `${parsedData.has_parent_transaction}` +
    `${parsedData.id}` +
    `${parsedData.integration_id}` +
    `${parsedData.is_3d_secure}` +
    `${parsedData.is_auth}` +
    `${parsedData.is_capture}` +
    `${parsedData.is_refunded}` +
    `${parsedData.is_standalone_payment}` +
    `${parsedData.is_voided}` +
    `${parsedData.order}` +
    `${parsedData.owner}` +
    `${parsedData.pending}` +
    `${parsedData['source_data.pan']}` +
    `${parsedData['source_data.sub_type']}` +
    `${parsedData['source_data.type']}` +
    `${parsedData.success}`

  const hash = hmacHasher.update(concatenatedString).digest('hex')

  return hash === hmac
}
