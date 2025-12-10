export const defaultAdminLanguageFields = [
  'id',
  'code',
  'name',
  'is_rtl',
  'is_default',
  'is_published',
  'metadata',
  'created_at',
  'updated_at',
  'deleted_at',
  '*translations',
]

export const retrieveLanguageQueryConfig = {
  defaults: defaultAdminLanguageFields,
  isList: false,
}

export const listLanguageQueryConfig = {
  ...retrieveLanguageQueryConfig,
  isList: true,
}
