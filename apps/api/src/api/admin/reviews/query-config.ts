export const defaultAdminReviewFields = [
  'id',
  'title',
  'content',
  'rating',
  'product_id',
  'customer_id',
  'status',
  'created_at',
  'updated_at',
  'product.*',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultAdminReviewFields,
  isList: false,
}

export const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  isList: true,
}
