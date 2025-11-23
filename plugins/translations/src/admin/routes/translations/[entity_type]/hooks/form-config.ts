import { UseFormProps } from 'react-hook-form'
import { TranslatableEntity } from '../../../../../types'
import {
  productFormProps,
  collectionFormProps,
  ProductTypeFormProps,
  ProductTagFormProps,
} from './form-props'

export const FORM_CONFIG: Record<TranslatableEntity, UseFormProps> = {
  products: productFormProps,
  product_collections: collectionFormProps,
  product_types: ProductTypeFormProps,
  product_tags: ProductTagFormProps,
}
