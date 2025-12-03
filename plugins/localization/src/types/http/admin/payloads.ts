import type { MetadataType } from '@medusajs/types'

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
