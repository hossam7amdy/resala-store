export const defaultStoreLanguageFields = [
  'id',
  'code',
  'name',
  'is_rtl',
  'is_default',
  'metadata',
  'created_at',
  'updated_at',
]

export const listTransformQueryConfig = {
  defaults: defaultStoreLanguageFields,
  defaultLimit: 20,
  isList: true,
}
