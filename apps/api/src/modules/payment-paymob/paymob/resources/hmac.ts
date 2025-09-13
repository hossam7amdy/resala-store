import type { PaymobClient } from '../core/client'
import type { PaymobConfig } from '../types/paymob-config'
import {
  compareHMACWebhook,
  compareHMACPaymentRedirect,
} from '../utils/compare-hmac'
import type {
  WebhookResponse,
  PaymentRedirectResponseInput,
} from '../types/webhook-response'

export default class HMAC {
  constructor(
    private readonly _client: PaymobClient,
    private readonly _config: PaymobConfig
  ) {}

  public compareWebhook(data: WebhookResponse, hmac: string): boolean {
    return compareHMACWebhook(data, hmac, this._config.hmacSecret)
  }

  public compareRedirect(
    data: PaymentRedirectResponseInput,
    hmac: string
  ): boolean {
    return compareHMACPaymentRedirect(data, hmac, this._config.hmacSecret)
  }
}
