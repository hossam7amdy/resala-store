export const defaultStoreLocaleFields = [
  'id',
  'store_id',
  'code',
  'name',
  'native_name',
  'direction',
  'is_default',
  'created_at',
  'updated_at',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreLocaleFields,
  isList: false,
}

export const listTransformQueryConfig = {
  defaults: defaultStoreLocaleFields,
  defaultLimit: 20,
  isList: true,
}
