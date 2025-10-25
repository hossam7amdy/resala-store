import { TranslatableEntity } from '@repo/shared-types'

export abstract class BaseTranslationQueryConfig {
  abstract get entityType(): TranslatableEntity
  abstract get entityName(): string
  abstract get entityIdName(): string
  abstract get queryDefaultFields(): string[]

  get listQueryConfig(): { default: string[]; isList: true } {
    return {
      default: this.queryDefaultFields,
      isList: true,
    }
  }

  get retrieveQueryConfig(): { default: string[]; isList: false } {
    return {
      default: this.queryDefaultFields,
      isList: false,
    }
  }
}
