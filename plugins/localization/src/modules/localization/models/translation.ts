import { model } from '@medusajs/framework/utils'
import Language from './language'
import TranslationProvider from './translation-provider'

const Translation = model
  .define('Translation', {
    id: model.id({ prefix: 'trans' }).primaryKey(),
    resource_id: model.text(),
    resource_type: model.text(),
    field: model.text(),
    value: model.text().searchable(),
    is_outdated: model.boolean().default(false),
    language: model.belongsTo(() => Language, {
      mappedBy: 'translations',
    }),
    provider: model
      .belongsTo(() => TranslationProvider, {
        mappedBy: 'translations',
      })
      .nullable(),
  })
  .indexes([
    {
      name: 'IDX_translation_lookup',
      unique: true,
      on: ['language_id', 'resource_type', 'resource_id', 'field'],
    },
    {
      name: 'IDX_translation_resource',
      on: ['resource_type', 'resource_id'],
    },
  ])

export default Translation
