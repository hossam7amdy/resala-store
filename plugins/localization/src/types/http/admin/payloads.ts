import type { MetadataType } from '@medusajs/types'
import { TranslatableResourceIdentifier } from '../../common'

export interface AdminCreateLanguage {
  code: string
  name: string
  metadata?: MetadataType
}

export interface AdminUpdateLanguage {
  is_default?: boolean
  is_published?: boolean
  metadata?: MetadataType
}

export interface AdminRegisterTranslations extends TranslatableResourceIdentifier {
  translations: {
    locale: string
    field: string
    value: string
    is_outdated?: boolean
  }[]
}

export interface AdminRemoveTranslations extends TranslatableResourceIdentifier {
  locale: string
}
