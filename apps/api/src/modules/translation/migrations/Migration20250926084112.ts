import { Migration } from '@mikro-orm/migrations'

export class Migration20250926084112 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "product_collection_translation_handle_unique";`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "locale_collection_unique";`
    )
    this.addSql(
      `alter table if exists "product_translation" drop constraint if exists "locale_product_unique";`
    )
    this.addSql(
      `alter table if exists "store_locale" drop constraint if exists "store_locale_unique";`
    )
    this.addSql(
      `create table if not exists "store_locale" ("id" text not null, "store_id" text not null, "locale" text not null, "name" text not null, "native_name" text not null, "direction" text check ("direction" in ('ltr', 'rtl')) not null, "is_default" boolean not null, "is_published" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "store_locale_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_store_locale_deleted_at" ON "store_locale" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_store_locale_unique" ON "store_locale" (store_id, locale) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_option_translation" drop constraint if exists "product_option_translation_product_id_foreign";`
    )

    this.addSql(
      `drop index if exists "IDX_translation_locale_product_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_translation" drop column if exists "locale";`
    )

    this.addSql(
      `alter table if exists "product_translation" add column if not exists "locale_id" text not null;`
    )
    this.addSql(
      `alter table if exists "product_translation" add constraint "product_translation_locale_id_foreign" foreign key ("locale_id") references "store_locale" ("id") on update cascade on delete cascade;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_translation_locale_id" ON "product_translation" (locale_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_unique" ON "product_translation" (locale_id, product_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `drop index if exists "IDX_translation_locale_option_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_translation" drop column if exists "locale";`
    )

    this.addSql(
      `alter table if exists "product_option_translation" add constraint "product_option_translation_product_id_foreign" foreign key ("product_id") references "product_translation" ("id") on update cascade on delete cascade;`
    )

    this.addSql(
      `drop index if exists "IDX_option_locale_option_value_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_option_value_translation" drop column if exists "locale";`
    )

    this.addSql(
      `drop index if exists "IDX_translation_locale_collection_id_unique";`
    )
    this.addSql(`drop index if exists "IDX_product_translation_handle_unique";`)
    this.addSql(
      `alter table if exists "product_collection_translation" drop column if exists "locale";`
    )

    this.addSql(
      `alter table if exists "product_collection_translation" add column if not exists "locale_id" text not null;`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" add constraint "product_collection_translation_locale_id_foreign" foreign key ("locale_id") references "store_locale" ("id") on update cascade on delete cascade;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_collection_translation_locale_id" ON "product_collection_translation" (locale_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_collection_unique" ON "product_collection_translation" (locale_id, collection_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_collection_translation_handle_unique" ON "product_collection_translation" (handle) WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "product_translation" drop constraint if exists "product_translation_locale_id_foreign";`
    )

    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "product_collection_translation_locale_id_foreign";`
    )

    this.addSql(`drop table if exists "store_locale" cascade;`)

    this.addSql(
      `alter table if exists "product_option_translation" drop constraint if exists "product_option_translation_product_id_foreign";`
    )

    this.addSql(
      `drop index if exists "IDX_product_collection_translation_locale_id";`
    )
    this.addSql(`drop index if exists "IDX_locale_collection_unique";`)
    this.addSql(
      `drop index if exists "IDX_product_collection_translation_handle_unique";`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" drop column if exists "locale_id";`
    )

    this.addSql(
      `alter table if exists "product_collection_translation" add column if not exists "locale" text not null;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_collection_id_unique" ON "product_collection_translation" (locale, collection_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_product_translation_handle_unique" ON "product_collection_translation" (handle) WHERE deleted_at IS NULL;`
    )

    this.addSql(`drop index if exists "IDX_product_translation_locale_id";`)
    this.addSql(`drop index if exists "IDX_locale_product_unique";`)
    this.addSql(
      `alter table if exists "product_translation" drop column if exists "locale_id";`
    )

    this.addSql(
      `alter table if exists "product_translation" add column if not exists "locale" text not null;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_product_id_unique" ON "product_translation" (locale, product_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_option_translation" add column if not exists "locale" text not null;`
    )
    this.addSql(
      `alter table if exists "product_option_translation" add constraint "product_option_translation_product_id_foreign" foreign key ("product_id") references "product_translation" ("id") on update cascade;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_locale_option_id_unique" ON "product_option_translation" (locale, option_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_option_value_translation" add column if not exists "locale" text not null;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_option_locale_option_value_id_unique" ON "product_option_value_translation" (locale, option_value_id) WHERE deleted_at IS NULL;`
    )
  }
}
