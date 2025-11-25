import type { LocaleDTO } from '../../common'

export type StoreLocale = Omit<LocaleDTO, 'is_published' | 'deleted_at'>
