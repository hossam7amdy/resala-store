/**
 * Google Translate provider configuration options
 */
export interface GoogleTranslateOptions {
  /**
   * Google Cloud project ID (required)
   */
  projectId: string

  /**
   * Google Cloud API key (required if keyFilename is not provided)
   */
  apiKey?: string

  /**
   * Path to service account key file (required if apiKey is not provided)
   */
  keyFilename?: string

  /**
   * Google Cloud region/location
   */
  location?: string

  /**
   * Translation model to use
   * - nmt: Neural Machine Translation (default, higher quality)
   * - base: Phrase-Based Machine Translation (faster, lower cost)
   */
  model?: 'nmt' | 'base'
}
