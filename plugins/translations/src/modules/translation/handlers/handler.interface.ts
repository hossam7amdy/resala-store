import type { TranslationDTO } from '../../../types'
import type { Context } from '@medusajs/types'
import type { EntityManager } from '@medusajs/framework/mikro-orm/core'

export interface TranslationHandler<
  TInput = any,
  TOutput = any,
  TTranslation = any,
> {
  upsert(data: TInput[], context?: Context<EntityManager>): Promise<TOutput[]>
  delete(ids: string[], context?: Context<EntityManager>): Promise<void>
  transformToDatabaseEntities(input: TranslationDTO<TTranslation>): TInput[]
}
