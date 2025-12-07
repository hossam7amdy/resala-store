import type { DAL, Logger } from '@medusajs/types'
import { ModulesSdkUtils } from '@medusajs/framework/utils'
import { TranslationProvider } from '../models'
import { ITranslationProvider } from '../../../types'

type InjectedDependencies = {
  logger?: Logger
  translationProviderRepository: DAL.RepositoryService
  [key: `tr_${string}`]: ITranslationProvider
}

class TranslationProviderService extends ModulesSdkUtils.MedusaInternalService<InjectedDependencies>(
  TranslationProvider
) {
  #logger: Logger

  constructor(container: InjectedDependencies) {
    super(container)
    this.#logger = container['logger'] ?? (console as unknown as Logger)
  }

  retrieveProvider(providerId: string): ITranslationProvider {
    try {
      return this.__container__[providerId] as ITranslationProvider
    } catch (err) {
      if (err.name === 'AwilixResolutionError') {
        const errMessage = `
  Unable to retrieve the translation provider with id: ${providerId}
  Please make sure that the provider is registered in the container and it is configured correctly in your project configuration file.`

        // Log full error for debugging
        this.#logger.error(`AwilixResolutionError: ${err.message}`, err)

        throw new Error(errMessage)
      }

      const errMessage = `Unable to retrieve the translation provider with id: ${providerId}, the following error occurred: ${err.message}`
      this.#logger.error(errMessage)

      throw new Error(errMessage)
    }
  }
}

export default TranslationProviderService
