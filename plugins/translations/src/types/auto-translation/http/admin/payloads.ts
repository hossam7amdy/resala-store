import type { AutoTranslateFieldDTO } from '../../common'

export type AdminAutoTranslateFields = {
  toLocale: string
  fromLocale?: string
  fields: AutoTranslateFieldDTO[]
}
