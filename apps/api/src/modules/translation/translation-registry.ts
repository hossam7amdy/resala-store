import type { TranslatableEntity } from '@repo/shared-types'

import { TranslationHandler } from './handlers/handler.interface'

export class TranslationRegistry {
  private handlers = new Map<TranslatableEntity, TranslationHandler>()

  register(entityType: TranslatableEntity, handler: TranslationHandler) {
    this.handlers.set(entityType, handler)
  }

  get(entityType: TranslatableEntity): TranslationHandler {
    const handler = this.handlers.get(entityType)
    if (!handler) {
      throw new Error(`No translation handler registered for: ${entityType}`)
    }
    return handler
  }
}
