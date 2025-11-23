export const defaultStoreProductFields = [
  'id',
  'title',
  'subtitle',
  'description',
  'handle',
  'is_giftcard',
  'discountable',
  'thumbnail',
  'collection_id',
  'type_id',
  'weight',
  'length',
  'height',
  'width',
  'hs_code',
  'origin_country',
  'mid_code',
  'material',
  'created_at',
  'updated_at',
  '*type',
  '*collection',
  '*options',
  '*options.values',
  '*tags',
  '*images',
  '*variants',
  '*variants.options',
]

export const storeProductTranslationFields = [
  'translations.*',
  'translations.locale.*',
  'translations.options.*',
  'translations.options.values.*',
]

export const retrieveProductQueryConfig = {
  defaults: defaultStoreProductFields,
  isList: false,
}

export const listProductQueryConfig = {
  ...retrieveProductQueryConfig,
  defaultLimit: 50,
  isList: true,
}

export const defaultStoreReviewFields = [
  'id',
  'title',
  'content',
  'rating',
  'product_id',
  'customer_id',
  'first_name',
  'last_name',
  'status',
  'created_at',
  'updated_at',
]

export const listProductReviewsQueryConfig = {
  defaults: defaultStoreReviewFields,
  isList: true,
}
