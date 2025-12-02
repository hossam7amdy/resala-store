import { LoaderOptions, ModulesSdkTypes } from '@medusajs/framework/types'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import { Language } from '../models'

export default async ({ container }: LoaderOptions): Promise<void> => {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const languageService: ModulesSdkTypes.IMedusaInternalService<
    typeof Language
  > = container.resolve('languageService')

  try {
    const languages = await languageService.list(
      {},
      {
        select: ['code'],
        filters: {
          is_default: true,
        },
      }
    )
    if (languages.length > 0) {
      logger.info(
        `[LOCALIZATION] default language already exist (${languages[0].code})`
      )
      return
    }

    logger.info('[LOCALIZATION] Loading initial default language (en)')

    await languageService.create({
      code: 'en',
      name: 'English',
      is_rtl: false,
      is_default: true,
      is_published: true,
    })
  } catch (error) {
    logger.warn(
      `[LOCALIZATION] Failed to seed initial languages: ${error.message}`
    )
  }
}
