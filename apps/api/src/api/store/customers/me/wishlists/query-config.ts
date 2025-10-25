const defaultStoreCustomerWishlistFields = [
  'id',
  'customer_id',
  'sales_channel_id',
  'created_at',
  'updated_at',
  'deleted_at',
  'items.*',
  'items.product_variant.*',
  'items.product_variant.product.*',
  'items.product_variant.product.translations.*',
  'items.product_variant.product.translations.locale.*',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreCustomerWishlistFields,
  isList: false,
}
