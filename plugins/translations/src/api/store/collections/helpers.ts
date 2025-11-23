import { ProductCollectionTranslationDTO } from '../../../types'
import { HttpTypes } from '@medusajs/framework/types'
import { findPublishedTranslation } from '../utils'

type StoreCollectionWithTranslations = HttpTypes.StoreCollection & {
  translations?: ProductCollectionTranslationDTO[]
}

export const localizeCollection = (
  collection: StoreCollectionWithTranslations,
  locale: string
): HttpTypes.StoreCollection => {
  const translation = findPublishedTranslation(collection?.translations, locale)

  if (!translation) {
    return collection
  }

  return {
    ...collection,
    title: translation?.title || collection?.title,
    // handle: translation?.handle || collection?.handle,
    translations: undefined,
  } as HttpTypes.StoreCollection
}

export const localizeCollections = (
  collections: HttpTypes.StoreCollection[],
  locale: string
): HttpTypes.StoreCollection[] => {
  return collections.map((collection) => localizeCollection(collection, locale))
}
