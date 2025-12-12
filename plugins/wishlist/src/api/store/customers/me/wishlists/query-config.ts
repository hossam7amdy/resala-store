const defaultStoreCustomerWishlistFields = [
  'id',
  'customer_id',
  'sales_channel_id',
  'created_at',
  'updated_at',
  'deleted_at',
  'items.*',
  'items.product.*',
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreCustomerWishlistFields,
  isList: false,
}
