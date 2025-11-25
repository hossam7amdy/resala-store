import { MedusaError } from '@medusajs/framework/utils'
import { v2 } from '@google-cloud/translate'
import { Logger } from '@medusajs/medusa'
import type { AutoTranslateFieldDTO } from '../../types'

type Options = {
  apiKey?: string
  projectId?: string
}

type InjectedDependencies = {
  logger: Logger
}

export default class GoogleTranslate {
  protected _logger: Logger
  protected _options: Options
  protected _client: v2.Translate

  static identifier = 'google_translate'

  static validateOptions(options: Record<string, unknown>): void | never {
    if (!options.apiKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Google Translate API key is required'
      )
    }
  }

  constructor({ logger }: InjectedDependencies, options: Options) {
    GoogleTranslate.validateOptions(options)

    this._logger = logger
    this._options = options
    this._client = new v2.Translate({
      key: options.apiKey as string,
      projectId: options.projectId as string | undefined,
    })
  }

  async translate(
    fields: AutoTranslateFieldDTO[],
    targetLanguage: string
  ): Promise<AutoTranslateFieldDTO[]> {
    const values = fields.map((field) => field.value)

    const [translations] = await this._client.translate(values, {
      to: targetLanguage,
    })

    return fields.map((field, i) => ({
      name: field.name,
      value: translations[i],
    }))
  }
}
