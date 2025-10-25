import {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from '@medusajs/framework'

export const parseRequestLocale = (
  req: MedusaRequest,
  _res: MedusaResponse,
  next: MedusaNextFunction
) => {
  const languages = req.acceptsLanguages()
  req['context'] = {
    ...req.context,
    locale: languages?.[0]?.split('-')[0],
  }
  next()
}
