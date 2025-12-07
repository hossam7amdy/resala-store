import { ModuleProvider } from '@medusajs/framework/utils'
import GoogleTranslateProviderService from './service'
import { LOCALIZATION_MODULE } from '../../modules/localization'

export default ModuleProvider(LOCALIZATION_MODULE, {
  services: [GoogleTranslateProviderService],
})
