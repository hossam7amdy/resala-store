import { LoaderOptions, ModulesSdkTypes } from '@medusajs/framework/types'
import { ContainerRegistrationKeys } from '@medusajs/framework/utils'
import { Language } from '../models'
import { LOCALIZATION_MODULE } from '..'

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
        `[${LOCALIZATION_MODULE}] Default language already exist (${languages[0]?.code})`
      )
      return
    }

    const language = await languageService.create({
      code: 'en',
      name: 'English',
      is_rtl: false,
      is_default: true,
      is_published: true,
    })

    logger.info(
      `[${LOCALIZATION_MODULE}] Default language (${language.code}) loaded successfully`
    )
  } catch (error: any) {
    logger.warn(
      `[${LOCALIZATION_MODULE}] Failed to load default language: ${error.message}`
    )
  }
}
