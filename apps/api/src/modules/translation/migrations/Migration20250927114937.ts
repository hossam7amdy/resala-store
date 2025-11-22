import { Migration } from '@medusajs/framework/mikro-orm/migrations'

export class Migration20250927114937 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "product_option_value_translation" drop constraint if exists "locale_product_option_value_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_translation" drop constraint if exists "locale_product_option_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_translation" add column if not exists "locale_id" text not null;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_option_unique" ON "product_option_translation" (locale_id, option_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_option_value_translation" add column if not exists "locale_id" text not null;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_option_value_unique" ON "product_option_value_translation" (locale_id, option_value_id) WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(`drop index if exists "IDX_locale_product_option_unique";`)
    this.addSql(
      `alter table if exists "product_option_translation" drop column if exists "locale_id";`
    )

    this.addSql(
      `drop index if exists "IDX_locale_product_option_value_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_value_translation" drop column if exists "locale_id";`
    )
  }
}
