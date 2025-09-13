export type PaymobRawError = {
  readonly type?: string
  readonly code?: string
  readonly statusCode?: number
  readonly detail?: string | Error
  readonly raw?: unknown
  [key: string]: any
}

abstract class PaymobError extends Error {
  readonly message: string
  readonly raw: unknown
  readonly type?: string
  readonly code?: string
  readonly statusCode?: number
  readonly detail?: string | Error

  constructor(message: string, raw = {} as PaymobRawError) {
    super(message)
    this.type = raw.type || this.constructor.name
    this.raw = raw
    this.code = raw.code
    this.detail = raw.detail
    this.statusCode = raw.statusCode
  }
}

export class PaymobAPIError extends PaymobError {}

export class ConfigurationError extends PaymobError {}

export class ValidationError extends PaymobError {}
