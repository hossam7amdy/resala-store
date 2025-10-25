import { Migration } from '@mikro-orm/migrations'

export class Migration20250925124943 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "product_translation" drop constraint if exists "product_translation_handle_unique";`
    )
    this.addSql(
      `alter table if exists "product_translation" drop constraint if exists "translation_locale_product_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "product_translation_handle_unique";`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "translation_locale_collection_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_value_translation" drop constraint if exists "option_locale_option_value_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_translation" drop constraint if exists "translation_locale_option_id_unique";`
    )
    this.addSql(
      `create table if not exists "product_option_translation" ("id" text not null, "option_id" text not null, "locale" text not null, "title" text not null, "metadata" jsonb null, "product_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_option_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_option_id" ON "product_option_translation" (option_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_option_translation_product_id" ON "product_option_translation" (product_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_option_translation_deleted_at" ON "product_option_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_option_id_unique" ON "product_option_translation" (locale, option_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "product_option_value_translation" ("id" text not null, "option_value_id" text not null, "locale" text not null, "value" text not null, "metadata" jsonb null, "option_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_option_value_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_option_value_id" ON "product_option_value_translation" (option_value_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_option_value_translation_option_id" ON "product_option_value_translation" (option_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_option_value_translation_deleted_at" ON "product_option_value_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_option_locale_option_value_id_unique" ON "product_option_value_translation" (locale, option_value_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_option_translation" add constraint "product_option_translation_product_id_foreign" foreign key ("product_id") references "product_translation" ("id") on update cascade;`
    )

    this.addSql(
      `alter table if exists "product_option_value_translation" add constraint "product_option_value_translation_option_id_foreign" foreign key ("option_id") references "product_option_translation" ("id") on update cascade on delete cascade;`
    )

    this.addSql(
      `drop index if exists "IDX_translation_language_collection_id_unique";`
    )

    this.addSql(
      `alter table if exists "product_collection_translation" add column if not exists "handle" text not null, add column if not exists "metadata" jsonb null;`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" rename column "language" to "locale";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_collection_id_unique" ON "product_collection_translation" (locale, collection_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_translation_handle_unique" ON "product_collection_translation" (handle) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `drop index if exists "IDX_translation_language_product_id_unique";`
    )

    this.addSql(
      `alter table if exists "product_translation" add column if not exists "handle" text not null, add column if not exists "metadata" jsonb null;`
    )
    this.addSql(
      `alter table if exists "product_translation" rename column "language" to "locale";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_product_id_unique" ON "product_translation" (locale, product_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_translation_handle_unique" ON "product_translation" (handle) WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "product_option_value_translation" drop constraint if exists "product_option_value_translation_option_id_foreign";`
    )

    this.addSql(`drop table if exists "product_option_translation" cascade;`)

    this.addSql(
      `drop table if exists "product_option_value_translation" cascade;`
    )

    this.addSql(
      `drop index if exists "IDX_translation_locale_collection_id_unique";`
    )
    this.addSql(`drop index if exists "IDX_product_translation_handle_unique";`)
    this.addSql(
      `alter table if exists "product_collection_translation" drop column if exists "handle", drop column if exists "metadata";`
    )

    this.addSql(
      `alter table if exists "product_collection_translation" rename column "locale" to "language";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_language_collection_id_unique" ON "product_collection_translation" (language, collection_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `drop index if exists "IDX_translation_locale_product_id_unique";`
    )
    this.addSql(`drop index if exists "IDX_product_translation_handle_unique";`)
    this.addSql(
      `alter table if exists "product_translation" drop column if exists "handle", drop column if exists "metadata";`
    )

    this.addSql(
      `alter table if exists "product_translation" rename column "locale" to "language";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_language_product_id_unique" ON "product_translation" (language, product_id) WHERE deleted_at IS NULL;`
    )
  }
}
