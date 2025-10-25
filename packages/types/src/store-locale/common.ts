export type LocaleDTO = {
  id: string
  store_id: string
  code: string
  name: string
  native_name: string
  direction: 'ltr' | 'rtl'
  is_default: boolean
  is_published: boolean
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string | null
}
