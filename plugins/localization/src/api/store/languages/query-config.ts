export const defaultStoreLocaleFields = [
  'code',
  'name',
  'is_default',
  'metadata',
  'created_at',
  'updated_at',
]

export const listTransformQueryConfig = {
  defaults: defaultStoreLocaleFields,
  defaultLimit: 20,
  isList: true,
}
