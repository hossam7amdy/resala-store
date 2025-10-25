import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http'
import {
  ContainerRegistrationKeys,
  remoteQueryObjectFromString,
} from '@medusajs/framework/utils'
import { TranslatableEntity } from '@repo/shared-types'
import { createTranslationQueryConfigForEntity } from '../../utils/entity-translation-query-config'
import { AdminUpsertTranslationsType } from '../../validators'
import { upsertTranslationsWorkflow } from '../../../../../workflows/translations'

export const POST = async (
  req: MedusaRequest<AdminUpsertTranslationsType>,
  res: MedusaResponse
) => {
  const { entity_id, entity_type } = req.params
  const { translations } = req.validatedBody

  const { result } = await upsertTranslationsWorkflow(req.scope).run({
    input: {
      entity_id,
      entity_type: entity_type as TranslatableEntity,
      translations,
    },
  })

  res.json(result)
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { entity_type, entity_id } = req.params
  const remoteQuery = req.scope.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const entityQueryConfig = createTranslationQueryConfigForEntity(entity_type)
  const queryConfig = remoteQueryObjectFromString({
    entryPoint: entityQueryConfig.entityName,
    variables: {
      filters: {
        ...req.filterableFields,
        [entityQueryConfig.entityIdName]: entity_id,
      },
      ...req.queryConfig.pagination,
    },
    fields: entityQueryConfig.queryDefaultFields,
  })

  const { rows: translations, metadata } = await remoteQuery(queryConfig)

  res.status(200).json({
    translations,
    ...metadata,
  })
}
