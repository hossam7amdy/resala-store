export const defaultAdminTranslationFields = [
  'id',
  'resource_id',
  'resource_type',
  'field',
  'value',
  'is_outdated',
  'created_at',
  'updated_at',
  '*language',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultAdminTranslationFields,
  isList: false,
}

export const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  isList: true,
}
