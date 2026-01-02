import type { LoaderOptions, MedusaContainer } from '@medusajs/types'
import {
  ContainerRegistrationKeys,
  lowerCaseFirst,
  MedusaError,
} from '@medusajs/framework/utils'
import { asFunction, asValue, Lifetime } from '@medusajs/framework/awilix'
import { moduleProviderLoader } from '@medusajs/framework/modules-sdk'
import { TranslationProviderService } from '../services'
import { LOCALIZATION_MODULE } from '..'

interface ProviderConfig {
  id?: string
  resolve: string
  is_default?: boolean
  options?: Record<string, any>
}

interface ProviderLoaderOptions {
  providers?: ProviderConfig[]
}

const PROVIDER_REGISTRATION_KEY = 'translation_providers' as const

const registrationFn = async (
  aClass: any,
  container: MedusaContainer,
  providerConfig: ProviderConfig
) => {
  if (!aClass?.identifier) {
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      `Trying to register a translation provider without a provider identifier.`
    )
  }

  const key = `tr_${aClass.identifier}${
    providerConfig.id ? `_${providerConfig.id}` : ''
  }`

  container.register({
    [key]: asFunction((cradle) => new aClass(cradle, providerConfig.options), {
      lifetime: aClass.LIFE_TIME || Lifetime.SINGLETON,
    }),
  })

  container.registerAdd(PROVIDER_REGISTRATION_KEY, asValue(key))
}

export default async ({
  container,
  options,
}: LoaderOptions<ProviderLoaderOptions>): Promise<void> => {
  const providers = options?.providers || []

  const defaultProvider = providers.filter((p) => p.is_default)
  if (providers.length > 0 && defaultProvider.length !== 1) {
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      `Exactly one translation provider must be marked as 'is_default'`
    )
  }

  await moduleProviderLoader({
    container,
    providers,
    registerServiceFn: registrationFn,
  })

  await syncDatabaseProviders({
    container,
    options,
  })
}

const syncDatabaseProviders = async ({
  container,
  options,
}: LoaderOptions<ProviderLoaderOptions>) => {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER) ?? console

  let providersToEnable: string[]
  try {
    providersToEnable = container.resolve<string[]>(PROVIDER_REGISTRATION_KEY)
  } catch {
    providersToEnable = []
  }

  const providerServiceRegistrationKey = lowerCaseFirst(
    TranslationProviderService.name
  )
  const providerService = container.resolve<TranslationProviderService>(
    providerServiceRegistrationKey
  )

  const existingProviders: Array<{
    id: string
  }> = await providerService.list({}, { select: ['id'] })

  const providersToDisable = existingProviders.filter(
    (p) => !providersToEnable.includes(p.id)
  )

  const upsertData: Array<{
    id: string
    is_enabled: boolean
    is_default?: boolean
  }> = providersToDisable.map((p) => ({
    id: p.id,
    is_enabled: false,
    is_default: false,
  }))

  const defaultProviderId =
    options?.providers?.find((p) => p.is_default)?.id ?? ''

  for (const id of providersToEnable) {
    upsertData.push({
      id,
      is_enabled: true,
      is_default: id.includes(defaultProviderId),
    })
  }

  await providerService.upsert(upsertData)

  logger.info(
    `[${LOCALIZATION_MODULE}] Translations providers synced, ${providersToEnable.length} providers enabled`
  )
}
