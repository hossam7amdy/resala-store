import {
  Logger,
  ModuleProviderExports,
  ModuleServiceInitializeOptions,
} from '@medusajs/framework/types'

export type InitializeModuleInjectableDependencies = {
  logger?: Logger
}

export type LocalizationModuleOptions =
  Partial<ModuleServiceInitializeOptions> & {
    /**
     * Providers to be registered
     */
    providers?: {
      /**
       * The module provider to be registered
       */
      resolve: string | ModuleProviderExports
      /**
       * The id of the provider
       */
      id: string
      /**
       * Whether the provider is the default provider
       */
      is_default?: boolean
      /**
       * key value pair of the configuration to be passed to the provider constructor
       */
      options?: Record<string, unknown>
    }[]
  }
