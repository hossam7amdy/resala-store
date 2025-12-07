import {
  ITranslationProvider,
  LanguageCode,
  TranslationOutput,
  TranslationInput,
} from '../../types/providers'

abstract class AbstractTranslationProvider<TConfig extends Record<string, any>>
  implements ITranslationProvider
{
  static identifier: string

  constructor(
    container: Record<string, any>,
    protected readonly options: TConfig
  ) {}

  static validateOptions(options: Record<string, any>): void | never {}

  getIdentifier(): string {
    const ctr = this.constructor as typeof AbstractTranslationProvider
    if (!ctr.identifier) {
      throw new Error(`Missing static property "identifier".`)
    }
    return ctr.identifier
  }

  abstract translate(request: TranslationInput): Promise<TranslationOutput>

  abstract getSupportedLanguages(): Promise<LanguageCode[]>

  async isLanguageSupported(code: LanguageCode): Promise<boolean> {
    const normalizedCode = this.normalizeLanguageCode(code)
    const supportedLanguages = await this.getSupportedLanguages()
    return supportedLanguages.some(
      (langCode) => langCode.toLowerCase() === normalizedCode.toLowerCase()
    )
  }

  normalizeLanguageCode(code: LanguageCode): LanguageCode {
    return code.toLowerCase().split('-')[0]
  }
}

export default AbstractTranslationProvider
