import { Migration } from '@mikro-orm/migrations'

export class Migration20250919122537 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "product_translation" drop constraint if exists "translation_language_product_id_unique";`
    )
    this.addSql(
      `alter table if exists "product_collection_translation" drop constraint if exists "translation_language_collection_id_unique";`
    )
    this.addSql(
      `create table if not exists "product_collection_translation" ("id" text not null, "collection_id" text not null, "language" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_collection_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_collection_id" ON "product_collection_translation" (collection_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_collection_translation_deleted_at" ON "product_collection_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_language_collection_id_unique" ON "product_collection_translation" (language, collection_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "product_translation" ("id" text not null, "product_id" text not null, "language" text not null, "title" text not null, "subtitle" text null, "description" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_product_id" ON "product_translation" (product_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_translation_deleted_at" ON "product_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_language_product_id_unique" ON "product_translation" (language, product_id) WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `drop table if exists "product_collection_translation" cascade;`
    )

    this.addSql(`drop table if exists "product_translation" cascade;`)
  }
}
