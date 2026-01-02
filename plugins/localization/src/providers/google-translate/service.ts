import { Logger } from '@medusajs/framework/types'
import { MedusaError } from '@medusajs/framework/utils'
import { v2 } from '@google-cloud/translate'
import { AbstractTranslationProvider } from '../../utils/providers'
import type {
  LanguageCode,
  TranslationOutput,
  TranslationInput,
  TextFormat,
} from '../../types/providers'
import type { GoogleTranslateOptions } from './types'

type InjectedDependencies = {
  logger: Logger
}

export class GoogleTranslateProviderService extends AbstractTranslationProvider<GoogleTranslateOptions> {
  static override identifier = 'google'

  readonly supportedLanguages: LanguageCode[]

  protected _client: v2.Translate
  protected _options: GoogleTranslateOptions
  protected _logger: Logger

  static override validateOptions(options: Record<string, any>): void | never {
    if (!options.projectId) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Google Translate provider requires `projectId` in options'
      )
    }

    if (!options.apiKey && !options.keyFilename) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Google Translate provider requires either `apiKey` or `keyFilename` in options'
      )
    }
  }

  constructor(
    { logger }: InjectedDependencies,
    options: GoogleTranslateOptions
  ) {
    super({ logger }, options)

    this._logger = logger
    this._options = options

    this._client = new v2.Translate({
      projectId: options.projectId,
      apiKey: options.apiKey,
      keyFilename: options.keyFilename,
    })

    this.supportedLanguages = []

    this.getSupportedLanguages().then(
      (languages) => {
        this.supportedLanguages.push(...languages)
      },
      (error) => {
        this._logger.error(
          `Failed to load supported languages ${error.message}`
        )
      }
    )
  }

  async getSupportedLanguages(): Promise<LanguageCode[]> {
    if (this.supportedLanguages.length > 0) {
      return this.supportedLanguages
    }
    const [languages] = await this._client.getLanguages()
    return languages.map((lang) => lang.code)
  }

  async translate(input: TranslationInput): Promise<TranslationOutput> {
    if (
      input.sourceLanguage &&
      !(await this.isLanguageSupported(input.sourceLanguage))
    ) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Google provider does not support "${input.sourceLanguage}" language`
      )
    }

    try {
      const texts = input.items.map((item) => item.text)
      const format = this._determineFormat(input.items)

      const [translations, metadata] = await this._client.translate(texts, {
        from: input.sourceLanguage,
        to: input.targetLanguage,
        format,
        model: this._options.model,
      })

      return {
        translatedItems: translations.map((translation, i) => ({
          translatedText: translation,
          format: input.items[i]?.format,
        })),
        metadata,
      }
    } catch (error: any) {
      this._logger.error(`Google Translate error: ${error.message}`)
      throw error
    }
  }

  protected _determineFormat(items: TranslationInput['items']): TextFormat {
    const hasHtml = items.some((item) => item?.format === 'html')
    return hasHtml ? 'html' : 'text'
  }
}

export default GoogleTranslateProviderService
