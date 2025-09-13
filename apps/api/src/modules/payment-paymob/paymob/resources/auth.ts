import type { PaymobClient } from '../core/client'
import type { AuthResponse } from '../types/auth'
import type { PaymobConfig } from '../types/paymob-config'
import { PaymobAPIError } from '../errors'

export default class Auth {
  private _cachedToken: string | null = null
  private _tokenExpiryTime: number | null = null

  constructor(
    private readonly _client: PaymobClient,
    private readonly _config: PaymobConfig
  ) {}

  public async getAccessToken(): Promise<string> {
    if (this._isTokenValid()) {
      return this._cachedToken!
    }

    try {
      const { data } = await this._client.post<AuthResponse>(
        '/api/auth/tokens',
        {
          api_key: this._config.apiKey,
        }
      )

      this._cachedToken = data.token
      // Cache token for 55 minutes (tokens typically expire after 1 hour)
      this._tokenExpiryTime = Date.now() + 55 * 60 * 1000

      return data.token
    } catch (error) {
      this._cachedToken = null
      this._tokenExpiryTime = null

      if (error instanceof PaymobAPIError) {
        throw error
      }
      throw new PaymobAPIError(`Authentication failed`, error)
    }
  }

  public clearCache(): void {
    this._cachedToken = null
    this._tokenExpiryTime = null
  }

  private _isTokenValid(): boolean {
    return !!(
      this._cachedToken &&
      this._tokenExpiryTime &&
      Date.now() < this._tokenExpiryTime
    )
  }
}
