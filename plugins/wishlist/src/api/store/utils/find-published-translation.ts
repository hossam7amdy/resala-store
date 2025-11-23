import { AdminStoreLocale } from '../../../types'

export const findPublishedTranslation = <T>(
  translations: (T & { locale?: Partial<AdminStoreLocale> })[] = [],
  locale?: string
) => {
  return translations.find(
    (translation) =>
      translation?.locale?.is_published && locale === translation?.locale?.code
  )
}
