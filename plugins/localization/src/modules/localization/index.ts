import { Module } from '@medusajs/framework/utils'
import defaultsLoader from './loaders/defaults'
import providersLoader from './loaders/providers'
import { LocalizationModuleService } from './services'

export const LOCALIZATION_MODULE = 'localization'

export default Module(LOCALIZATION_MODULE, {
  service: LocalizationModuleService,
  loaders: [defaultsLoader, providersLoader],
})

export type { LocalizationModuleOptions } from './types'
