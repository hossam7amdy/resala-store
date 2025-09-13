import {
  AbstractPaymentProvider,
  PaymentSessionStatus,
  PaymentActions,
} from '@medusajs/framework/utils'
import { Logger } from '@medusajs/medusa'
import {
  CapturePaymentInput,
  CapturePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  ProviderWebhookPayload,
  WebhookActionResult,
} from '@medusajs/types'
import {
  Paymob,
  PaymobConfig,
  PaymobConfigSchema,
  TransactionResponse,
} from './paymob'
import { randomUUID } from 'crypto'
import {
  getAmountFromSmallestUnit,
  getSmallestUnit,
} from './utils/get-smallest-unit'
import { findProperty } from './utils/find-property'

interface BillingAddress {
  id: string
  first_name: string
  last_name: string
  company: string
  address_1: string
  address_2: string
  city: string
  postal_code: string
  country_code: string
  province: string
  phone: string
}

type Options = PaymobConfig

type InjectedDependencies = {
  logger: Logger
}

class PaymobPaymentProviderService extends AbstractPaymentProvider<Options> {
  static identifier = 'paymob'

  protected _logger: Logger
  protected _options: Options
  protected _paymob: Paymob

  static validateOptions(options: Record<any, any>): void | never {
    PaymobConfigSchema.parse(options)
  }

  constructor(container: InjectedDependencies, options: Options) {
    super(container, options)
    this._logger = container.logger
    this._options = options
    this._paymob = new Paymob(options)
  }

  private _extractSessionIdFromPayload(payload: any): string | undefined {
    const potentialSessionKayNames = [
      'session_id',
      'special_reference',
      'merchant_order_id',
    ]

    return findProperty<string>(payload, potentialSessionKayNames)?.value
  }

  private _getStatus(transaction: TransactionResponse): PaymentSessionStatus {
    switch (true) {
      case transaction.error_occured:
      case transaction.success === false:
        return PaymentSessionStatus.ERROR
      case transaction.is_void:
      case transaction.is_voided:
      case transaction.is_refund:
      case transaction.is_refunded:
        return PaymentSessionStatus.CANCELED
      case transaction.is_capture:
      case transaction.is_captured:
        return PaymentSessionStatus.CAPTURED
      case transaction.is_auth:
        return PaymentSessionStatus.AUTHORIZED
      default:
        return PaymentSessionStatus.PENDING
    }
  }

  private _retrieveTransaction(
    data: Record<string, unknown>
  ): Promise<TransactionResponse> {
    const session_id = this._extractSessionIdFromPayload(data)

    if (!session_id) {
      throw new Error('No payment intent ID provided')
    }

    return this._paymob.transaction.retrieveByMerchantOrderId(session_id)
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const { amount, currency_code, context, data } = input
    const session_id = (data?.session_id || randomUUID()) as string
    const redirection_url = data?.redirection_url as string
    const billing_address = data?.billing_address as BillingAddress

    const sessionData = await this._paymob.payment.createIntent({
      amount: getSmallestUnit(amount, currency_code),
      currency: currency_code.toUpperCase(),
      payment_methods: this.config.integrationIds,
      billing_data: {
        first_name: billing_address.first_name,
        last_name: billing_address.last_name,
        phone_number: billing_address.phone,
        email: context?.customer?.email,
        city: billing_address.city,
        country: billing_address.country_code,
        state: billing_address.province,
        street: billing_address.address_1,
      },
      special_reference: session_id,
      redirection_url: redirection_url || this.config.redirectionUrl,
      notification_url: this.config.notificationUrl,
      extras: { session_id },
    })

    sessionData['checkout_url'] = this._paymob.payment.getCheckoutUrl(
      sessionData.client_secret
    )

    return {
      id: session_id,
      status: PaymentSessionStatus.PENDING,
      data: sessionData,
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    return this.getPaymentStatus(input)
  }

  async capturePayment({
    data = {},
  }: CapturePaymentInput): Promise<CapturePaymentOutput> {
    const { id, amount_cents } = await this._retrieveTransaction(data)

    const captureResponse = await this._paymob.payment.capture(id, amount_cents)

    return {
      data: captureResponse,
    }
  }

  async cancelPayment({
    data = {},
  }: CancelPaymentInput): Promise<CancelPaymentOutput> {
    const { id } = await this._retrieveTransaction(data)

    const voidResponse = await this._paymob.payment.void(id)

    return {
      data: voidResponse,
    }
  }

  async deletePayment({
    data,
  }: DeletePaymentInput): Promise<DeletePaymentOutput> {
    this._paymob.auth.clearCache()
    return Promise.resolve({ data })
  }

  async getPaymentStatus({
    data = {},
  }: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    const transaction = await this._retrieveTransaction(data)

    return {
      data: transaction,
      status: this._getStatus(transaction),
    }
  }

  async refundPayment({
    amount,
    data = {},
  }: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const { id, currency } = await this._retrieveTransaction(data)

    const currencyCode = data?.currency || currency

    const refundedResponse = await this._paymob.payment.refund(
      id,
      getSmallestUnit(amount, currencyCode as string)
    )

    return {
      data: refundedResponse,
    }
  }

  async retrievePayment({
    data = {},
  }: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    const transaction = await this._retrieveTransaction(data)

    return {
      data: transaction,
    }
  }

  updatePayment(_input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    throw new Error(
      'Paymob does not support updating payment, please call initiatePayment to start a new session'
    )
  }

  async getWebhookActionAndData({
    data,
  }: ProviderWebhookPayload['payload']): Promise<WebhookActionResult> {
    const transaction = await this._retrieveTransaction(data)

    const session_id = transaction.order.merchant_order_id!

    const amount = getAmountFromSmallestUnit(
      transaction.amount_cents,
      transaction.currency
    )

    switch (this._getStatus(transaction)) {
      case PaymentSessionStatus.AUTHORIZED:
        return {
          action: PaymentActions.AUTHORIZED,
          data: { session_id, amount },
        }
      case PaymentSessionStatus.CANCELED:
        return {
          action: PaymentActions.CANCELED,
          data: { session_id, amount },
        }
      case PaymentSessionStatus.CAPTURED:
        return {
          action: PaymentActions.SUCCESSFUL,
          data: { session_id, amount },
        }
      case PaymentSessionStatus.ERROR:
        return {
          action: PaymentActions.FAILED,
          data: { session_id, amount },
        }
      case PaymentSessionStatus.PENDING:
      case PaymentSessionStatus.REQUIRES_MORE:
        return {
          action: PaymentActions.PENDING,
          data: { session_id, amount },
        }
      default:
        return {
          action: PaymentActions.NOT_SUPPORTED,
        }
    }
  }
}

export default PaymobPaymentProviderService
