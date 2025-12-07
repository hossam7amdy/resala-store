import { model } from '@medusajs/framework/utils'
import Translation from './translation'

const TranslationProvider = model.define('TranslationProvider', {
  id: model.id().primaryKey(),
  is_enabled: model.boolean().default(true),
  is_default: model.boolean().default(false),
  metadata: model.json().nullable(),
  translations: model.hasMany(() => Translation, {
    mappedBy: 'provider',
  }),
})

export default TranslationProvider
