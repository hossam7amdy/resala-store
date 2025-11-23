import { Module } from '@medusajs/framework/utils'
import AutoTranslateModuleService from './service'

export const AUTO_TRANSLATE_MODULE = AutoTranslateModuleService.identifier

export default Module(AUTO_TRANSLATE_MODULE, {
  service: AutoTranslateModuleService,
})
