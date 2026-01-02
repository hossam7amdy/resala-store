/** ISO 639-1 or BCP 47 (e.g., 'en', 'pt-BR') */
export type LanguageCode = string

export type TextFormat = 'text' | 'html'

export type TranslatedMetadata = Record<string, any>

export interface TranslationItem {
  text: string
  format?: TextFormat
}

export interface TranslationInput {
  items: TranslationItem[]
  sourceLanguage?: LanguageCode
  targetLanguage: LanguageCode
  metadata?: TranslatedMetadata
}

export type TranslatedItem =
  | {
      translatedText: string
      format?: TextFormat
    }
  | {
      error: TranslationError
    }

export interface TranslationOutput {
  translatedItems: TranslatedItem[]
  detectedLanguage?: LanguageCode
  metadata?: TranslatedMetadata
}

export interface TranslationError {
  code:
    | 'UNSUPPORTED_LANGUAGE'
    | 'RATE_LIMITED'
    | 'QUOTA_EXCEEDED'
    | 'PROVIDER_ERROR'
    | (string & {})
  message: string
  retryable?: boolean
}

export interface ITranslationProvider {
  getIdentifier(): string

  translate(input: TranslationInput): Promise<TranslationOutput>

  getSupportedLanguages(): Promise<LanguageCode[]>

  isLanguageSupported(code: LanguageCode): Promise<boolean>
}
