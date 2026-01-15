const defaultStoreReviewFields = [
  'id',
  'title',
  'content',
  'rating',
  'first_name',
  'last_name',
  'status',
  'product_id',
  'customer_id',
  'created_at',
  'updated_at',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreReviewFields,
  isList: false,
}

export const listTransformQueryConfig = {
  ...retrieveTransformQueryConfig,
  isList: true,
}
