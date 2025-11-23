export const defaultAdminStoreLocaleFields = [
  'id',
  'store_id',
  'code',
  'name',
  'native_name',
  'direction',
  'is_default',
  'is_published',
  'created_at',
  'updated_at',
  'deleted_at',
]

export const retrieveStoreLocaleQueryConfig = {
  defaults: defaultAdminStoreLocaleFields,
  isList: false,
}

export const listStoreLocalesQueryConfig = {
  ...retrieveStoreLocaleQueryConfig,
  isList: true,
}
