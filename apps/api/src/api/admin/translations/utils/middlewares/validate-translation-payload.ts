import {
  MedusaRequest,
  MedusaResponse,
  MedusaNextFunction,
} from '@medusajs/framework/http'
import { zodValidator } from '@medusajs/framework'
import { AdminUpsertTranslations } from '../../validators'

export const validateTranslationPayload = () => {
  return async (
    req: MedusaRequest<any>,
    _: MedusaResponse,
    next: MedusaNextFunction
  ) => {
    // @ts-ignore
    req.validatedBody = await zodValidator(AdminUpsertTranslations, {
      ...req.params,
      translations: req.body,
    })

    return next()
  }
}
