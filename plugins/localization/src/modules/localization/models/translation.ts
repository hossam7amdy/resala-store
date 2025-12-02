import { model } from '@medusajs/framework/utils'
import Language from './language'

const Translation = model
  .define('Translation', {
    id: model.id({ prefix: 'tr' }).primaryKey(),
    resource_id: model.text(),
    resource_type: model.text(),
    key: model.text(),
    value: model.text().searchable(),
    is_outdated: model.boolean().default(false),
    metadata: model.json().nullable(),
    language: model.belongsTo(() => Language, {
      mappedBy: 'translations',
    }),
  })
  .indexes([
    {
      name: 'IDX_translation_lookup',
      unique: true,
      on: ['language_id', 'resource_type', 'resource_id', 'key'],
    },
    {
      name: 'IDX_translation_resource',
      on: ['resource_type', 'resource_id'],
    },
  ])

export default Translation
