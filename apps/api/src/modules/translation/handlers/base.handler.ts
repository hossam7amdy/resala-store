import { Context } from '@medusajs/types'
import { EntityManager } from '@mikro-orm/core'

import TranslationModuleService from '../service'
import type { TranslationDTO } from '@repo/shared-types'
import type { TranslationHandler } from './handler.interface'

export abstract class BaseTranslationHandler<
  TInput extends { id?: string },
  TOutput,
  TTranslation = any,
> implements TranslationHandler<TInput, TOutput, TTranslation>
{
  constructor(protected service: TranslationModuleService) {}

  async upsert(
    data: TInput[],
    context?: Context<EntityManager>
  ): Promise<TOutput[]> {
    const forCreate = data.filter((item) => !item.id)
    const forUpdate = data.filter((item) => !!item.id)

    let created: TOutput[] = []
    let updated: TOutput[] = []

    if (forCreate.length > 0) {
      created = await this.create(forCreate, context)
    }
    if (forUpdate.length > 0) {
      updated = await this.update(forUpdate, context)
    }

    return created.concat(updated)
  }

  abstract create(
    data: TInput[],
    context?: Context<EntityManager>
  ): Promise<TOutput[]>

  abstract update(
    data: TInput[],
    context?: Context<EntityManager>
  ): Promise<TOutput[]>

  abstract delete(
    ids: string[],
    context?: Context<EntityManager>
  ): Promise<void>

  abstract transformToDatabaseEntities(
    input: TranslationDTO<TTranslation>
  ): TInput[]
}
