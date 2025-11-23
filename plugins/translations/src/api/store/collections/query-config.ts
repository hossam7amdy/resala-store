export const defaultStoreCollectionFields = [
  'id',
  'title',
  'handle',
  'created_at',
  'updated_at',
]

export const storeCollectionTranslationFields = [
  'translations.*',
  'translations.locale.*',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreCollectionFields,
  isList: false,
}

export const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  defaultLimit: 10,
  isList: true,
}
