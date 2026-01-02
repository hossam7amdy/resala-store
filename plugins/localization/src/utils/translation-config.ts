export enum TranslatableResource {
  PRODUCT = 'product',
  PRODUCT_COLLECTION = 'product_collection',
  PRODUCT_CATEGORY = 'product_category',
  PRODUCT_OPTION = 'product_option',
  PRODUCT_OPTION_VALUE = 'product_option_value',
  PRODUCT_TAG = 'product_tag',
  PRODUCT_TYPE = 'product_type',
  PRODUCT_VARIANT = 'product_variant',
}

export const TRANSLATABLE_FIELDS = {
  [TranslatableResource.PRODUCT]: ['title', 'subtitle', 'description'],
  [TranslatableResource.PRODUCT_COLLECTION]: ['title'],
  [TranslatableResource.PRODUCT_CATEGORY]: ['name', 'description'],
  [TranslatableResource.PRODUCT_OPTION]: ['title'],
  [TranslatableResource.PRODUCT_OPTION_VALUE]: ['value'],
  [TranslatableResource.PRODUCT_TAG]: ['value'],
  [TranslatableResource.PRODUCT_TYPE]: ['value'],
  [TranslatableResource.PRODUCT_VARIANT]: ['title', 'subtitle'],
} as const

export type TranslatableFields<T extends TranslatableResource> =
  (typeof TRANSLATABLE_FIELDS)[T][number]

export type AllTranslatableFields = TranslatableFields<TranslatableResource>

type ExtractFields<T extends TranslatableResource> =
  (typeof TRANSLATABLE_FIELDS)[T][number]

export type FieldsByResource = {
  [K in TranslatableResource]: ExtractFields<K>
}

export function getTranslatableFields<T extends TranslatableResource>(
  resource: T
): readonly TranslatableFields<T>[] {
  return TRANSLATABLE_FIELDS[resource]
}

export function isValidField<T extends TranslatableResource>(
  resource: T,
  field: string
): field is TranslatableFields<T> {
  return (getTranslatableFields(resource) as readonly string[]).includes(field)
}
