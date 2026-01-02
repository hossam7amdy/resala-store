import { model } from '@medusajs/framework/utils'
import Translation from './translation'

const Language = model
  .define('Language', {
    id: model.id({ prefix: 'lang' }).primaryKey(),
    code: model.text().searchable(),
    name: model.text().searchable(),
    /**
     * The region id of the language
     * @default '*' for global language
     */
    region_id: model.text().default('*'),
    is_rtl: model.boolean().default(false),
    is_default: model.boolean().default(false),
    is_published: model.boolean().default(false),
    metadata: model.json().nullable(),
    translations: model.hasMany(() => Translation, {
      mappedBy: 'language',
    }),
  })
  .indexes([
    {
      name: 'IDX_unique_code_region_id',
      unique: true,
      on: ['code', 'region_id'],
    },
  ])
  .cascades({
    delete: ['translations'],
  })

export default Language
