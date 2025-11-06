const defaultStoreCustomerWishlistFields = [
  'id',
  'customer_id',
  'sales_channel_id',
  'created_at',
  'updated_at',
  'deleted_at',
  'items.*',
  'items.product.*',
  'items.product.translations.*',
  'items.product.translations.locale.*',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreCustomerWishlistFields,
  isList: false,
}
