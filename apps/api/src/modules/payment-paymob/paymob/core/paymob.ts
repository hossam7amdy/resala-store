import { Payment } from '../resources/payment'
import { TransactionInquiry } from '../resources/transaction'
import type { PaymobConfig } from '../types/paymob-config'
import { PaymobClient } from './client'
import HMAC from '../resources/hmac'
import Auth from '../resources/auth'

export class Paymob {
  readonly hmac: HMAC
  readonly auth: Auth
  readonly payment: Payment
  readonly transaction: TransactionInquiry

  constructor(config: PaymobConfig) {
    const client = PaymobClient(config.secretKey)
    this.auth = new Auth(client, config)
    this.hmac = new HMAC(client, config)
    this.payment = new Payment(client, config)
    this.transaction = new TransactionInquiry(client, this.auth, config)
  }
}
