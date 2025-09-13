import { z } from 'zod'
import type { PaymobClient } from '../core/client'
import { PaymobAPIError, ValidationError } from '../errors'
import { CreateIntentionRequestSchema } from '../types/intention'
import type {
  CreateIntentionRequest,
  CreateIntentionResponse,
} from '../types/intention'
import type { PaymobConfig } from '../types/paymob-config'
import type {
  CaptureResponse,
  RefundResponse,
  VoidResponse,
} from '../types/transaction'
import { getFormattedUnifiedCheckoutUrl } from '../utils/format-checkout-url'

export class Payment {
  constructor(
    private readonly _client: PaymobClient,
    private readonly _config: PaymobConfig
  ) {}

  public getCheckoutUrl(clientSecret: string): string {
    return getFormattedUnifiedCheckoutUrl(clientSecret, this._config.publicKey)
  }

  public async createIntent(
    createIntentionRequest: CreateIntentionRequest
  ): Promise<CreateIntentionResponse> {
    try {
      const validatedCreateIntentionRequest =
        CreateIntentionRequestSchema.parse(createIntentionRequest)

      const { data } = await this._client.post<CreateIntentionResponse>(
        '/v1/intention',
        validatedCreateIntentionRequest
      )
      return data
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          `Invalid intention request: ${error.message}`,
          error
        )
      }
      throw new PaymobAPIError(`Failed to create intention`, error)
    }
  }

  public async void(transactionId: string | number): Promise<VoidResponse> {
    try {
      const { data } = await this._client.post<VoidResponse>(
        '/api/acceptance/void_refund/void',
        { transaction_id: transactionId }
      )
      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to void transaction ${transactionId}`,
        error
      )
    }
  }

  public async refund(
    transactionId: string | number,
    amountCents: number
  ): Promise<RefundResponse> {
    try {
      const { data } = await this._client.post<RefundResponse>(
        '/api/acceptance/void_refund/refund',
        {
          transaction_id: transactionId,
          amount_cents: amountCents,
        }
      )
      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to refund transaction ${transactionId}`,
        error
      )
    }
  }

  public async capture(
    transactionId: string | number,
    amountCents: number
  ): Promise<CaptureResponse> {
    try {
      const { data } = await this._client.post<CaptureResponse>(
        '/api/acceptance/capture',
        {
          transaction_id: transactionId,
          amount_cents: amountCents,
        }
      )
      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to capture transaction ${transactionId}`,
        error
      )
    }
  }
}
