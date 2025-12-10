import { Logger } from '@medusajs/medusa'
import { MedusaService } from '@medusajs/framework/utils'
import { DAL, InferTypeOf, ModulesSdkTypes } from '@medusajs/types'
import { Language, Translation, TranslationProvider } from '../models'
import TranslationProviderService from './translation-provider-service'

type LanguageDTO = InferTypeOf<typeof Language>
type TranslationDTO = InferTypeOf<typeof Translation>
type TranslationProviderDTO = InferTypeOf<typeof TranslationProvider>

type InjectedDependencies = {
  logger?: Logger
  baseRepository: DAL.RepositoryService
  languageService: ModulesSdkTypes.IMedusaInternalService<any>
  translationService: ModulesSdkTypes.IMedusaInternalService<any>
  translationProviderService: TranslationProviderService
}

class LocalizationModuleService extends MedusaService<{
  Language: { dto: LanguageDTO }
  Translation: { dto: TranslationDTO }
  TranslationProvider: { dto: TranslationProviderDTO }
}>({
  Language,
  Translation,
  TranslationProvider,
}) {
  protected baseRepository_: DAL.RepositoryService
  protected languageService_: ModulesSdkTypes.IMedusaInternalService<
    typeof Language
  >
  protected translationService_: ModulesSdkTypes.IMedusaInternalService<
    typeof Translation
  >
  protected translationProviderService_: TranslationProviderService

  constructor({
    baseRepository,
    languageService,
    translationService,
    translationProviderService,
  }: InjectedDependencies) {
    super(...arguments)
    this.baseRepository_ = baseRepository
    this.languageService_ = languageService
    this.translationService_ = translationService
    this.translationProviderService_ = translationProviderService
  }
}

export default LocalizationModuleService
