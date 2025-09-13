import type { PaymobClient } from '../core/client'
import { PaymobAPIError } from '../errors'
import type { PaymobConfig } from '../types/paymob-config'
import type { TransactionResponse } from '../types/transaction'
import Auth from './auth'

export class TransactionInquiry {
  constructor(
    private readonly _client: PaymobClient,
    private readonly _auth: Auth,
    _config: PaymobConfig
  ) {}

  public async retrieveByOrderId(
    orderId: string | number
  ): Promise<TransactionResponse> {
    try {
      const accessToken = await this._auth.getAccessToken()

      const { data } = await this._client.post<TransactionResponse>(
        '/api/ecommerce/orders/transaction_inquiry',
        {
          order_id: orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to retrieve transaction using order ID ${orderId}`,
        error
      )
    }
  }

  public async retrieve(transactionId: string): Promise<TransactionResponse> {
    try {
      const accessToken = await this._auth.getAccessToken()

      const { data } = await this._client.get<TransactionResponse>(
        `/api/acceptance/transactions/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to retrieve transaction using transaction ID ${transactionId}`,
        error
      )
    }
  }

  public async retrieveByMerchantOrderId(
    merchantOrderId: string
  ): Promise<TransactionResponse> {
    try {
      const accessToken = await this._auth.getAccessToken()

      const { data } = await this._client.post<TransactionResponse>(
        '/api/ecommerce/orders/transaction_inquiry',
        {
          merchant_order_id: merchantOrderId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      return data
    } catch (error) {
      throw new PaymobAPIError(
        `Failed to retrieve transaction using merchant order ID ${merchantOrderId}`,
        error
      )
    }
  }
}
