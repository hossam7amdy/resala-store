import { model } from '@medusajs/framework/utils'
import Translation from './translation'

const Language = model
  .define('Language', {
    id: model.id({ prefix: 'ln' }).primaryKey(),
    code: model.text().searchable().unique(),
    name: model.text().searchable(),
    is_default: model.boolean().default(false),
    is_published: model.boolean().default(false),
    metadata: model.json().nullable(),
    translations: model.hasMany(() => Translation, {
      mappedBy: 'language',
    }),
  })
  .cascades({
    delete: ['translations'],
  })

export default Language
