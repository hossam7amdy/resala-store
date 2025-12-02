import { MedusaService } from '@medusajs/framework/utils'

import { Language, Translation } from '../models'

class LocalizationModuleService extends MedusaService({
  Language,
  Translation,
}) {}

export default LocalizationModuleService
