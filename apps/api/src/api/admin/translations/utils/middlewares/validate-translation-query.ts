import { z } from 'zod'
import {
  MedusaRequest,
  MedusaResponse,
  MedusaNextFunction,
  validateAndTransformQuery,
} from '@medusajs/framework/http'
import { createFindParams } from '@medusajs/medusa/api/utils/validators'

import { createTranslationQueryConfigForEntity } from '../entity-translation-query-config'

export const validateAndTransformTranslationQuery = () => {
  return (
    req: MedusaRequest,
    res: MedusaResponse,
    next: MedusaNextFunction
  ) => {
    const { entity_type } = req.params
    const entityConfig = createTranslationQueryConfigForEntity(entity_type)

    return validateAndTransformQuery(
      createFindParams().merge(
        z.object({
          locale_id: z.string().optional(),
        })
      ),
      entityConfig.listQueryConfig
    )(req, res, next)
  }
}
