import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http'
import type { AdminAutoTranslateFieldResponse } from '@repo/shared-types'

import type { AdminTranslateFieldsType } from './validators'
import { AUTO_TRANSLATE_MODULE } from '../../../modules/auto-translation'
import { autoTranslateFieldsWorkflow } from '../../../workflows/auto-translate'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  let statusCode = 200
  const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)

  try {
    req.scope.resolve(AUTO_TRANSLATE_MODULE)
  } catch (e) {
    logger.warn(`Cannot load ${AUTO_TRANSLATE_MODULE} module ${e.message}`)
    statusCode = 404
  }

  res.status(statusCode).send({})
}

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminTranslateFieldsType>,
  res: MedusaResponse<AdminAutoTranslateFieldResponse>
) => {
  const { result } = await autoTranslateFieldsWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.status(200).json({ translations: result })
}
