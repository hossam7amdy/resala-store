import React from 'react'
import { TranslatableEntity } from '@repo/shared-types'
import {
  ProductSelector,
  ProductTranslationEditor,
} from './components/product-translation'
import {
  CollectionSelector,
  CollectionTranslationEditor,
} from './components/collection-translation'
import {
  ProductTypeSelector,
  ProductTypeTranslationEditor,
} from './components/product-type-translation'
import {
  ProductTagSelector,
  ProductTagTranslationEditor,
} from './components/product-tag-translation'

interface EntityConfig {
  Selector: React.ComponentType
  Editor: React.ComponentType<{ form: any }>
}

export const ENTITY_CONFIG: Record<TranslatableEntity, EntityConfig> = {
  products: {
    Selector: ProductSelector,
    Editor: ProductTranslationEditor,
  },
  product_types: {
    Selector: ProductTypeSelector,
    Editor: ProductTypeTranslationEditor,
  },
  product_tags: {
    Selector: ProductTagSelector,
    Editor: ProductTagTranslationEditor,
  },
  product_collections: {
    Selector: CollectionSelector,
    Editor: CollectionTranslationEditor,
  },
}

export const VALID_ENTITY_TYPES = Object.keys(
  ENTITY_CONFIG
) as TranslatableEntity[]

export const isValidEntityType = (
  entityType: string | undefined
): entityType is TranslatableEntity => {
  return !!entityType && entityType in ENTITY_CONFIG
}
