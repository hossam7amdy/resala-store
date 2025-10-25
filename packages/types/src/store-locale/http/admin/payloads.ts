export interface AdminCreateStoreLocale {
  store_id: string
  code: string
  name: string
  native_name: string
  direction: 'ltr' | 'rtl'
  is_default: boolean
  is_published: boolean
}

export interface AdminUpdateStoreLocale
  extends Partial<AdminCreateStoreLocale> {
  store_id: string
}
