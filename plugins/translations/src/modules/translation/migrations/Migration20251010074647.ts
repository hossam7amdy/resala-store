import { Migration } from '@medusajs/framework/mikro-orm/migrations'

export class Migration20251010074647 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "product_category_translation" drop constraint if exists "category_handle_unique";`
    )
    this.addSql(
      `alter table if exists "product_category_translation" drop constraint if exists "locale_product_category_unique";`
    )
    this.addSql(
      `alter table if exists "product_tag_translation" drop constraint if exists "locale_product_tag_unique";`
    )
    this.addSql(
      `alter table if exists "product_type_translation" drop constraint if exists "locale_product_type_unique";`
    )
    this.addSql(
      `create table if not exists "product_type_translation" ("id" text not null, "type_id" text not null, "value" text not null, "metadata" jsonb null, "locale_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_type_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_type_id" ON "product_type_translation" (type_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_type_translation_locale_id" ON "product_type_translation" (locale_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_type_translation_deleted_at" ON "product_type_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_type_unique" ON "product_type_translation" (locale_id, type_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "product_tag_translation" ("id" text not null, "tag_id" text not null, "value" text not null, "metadata" jsonb null, "locale_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_tag_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_tag_id" ON "product_tag_translation" (tag_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_tag_translation_locale_id" ON "product_tag_translation" (locale_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_tag_translation_deleted_at" ON "product_tag_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_tag_unique" ON "product_tag_translation" (locale_id, tag_id) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "product_category_translation" ("id" text not null, "category_id" text not null, "name" text not null, "description" text not null default '', "handle" text not null, "metadata" jsonb null, "parent_category_id" text null, "locale_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "product_category_translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_category_translation_parent_category_id" ON "product_category_translation" (parent_category_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_category_translation_locale_id" ON "product_category_translation" (locale_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_product_category_translation_deleted_at" ON "product_category_translation" (deleted_at) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_locale_product_category_unique" ON "product_category_translation" (locale_id, category_id) WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_category_handle_unique" ON "product_category_translation" (handle) WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "product_type_translation" add constraint "product_type_translation_locale_id_foreign" foreign key ("locale_id") references "store_locale" ("id") on update cascade;`
    )

    this.addSql(
      `alter table if exists "product_tag_translation" add constraint "product_tag_translation_locale_id_foreign" foreign key ("locale_id") references "store_locale" ("id") on update cascade on delete cascade;`
    )

    this.addSql(
      `alter table if exists "product_category_translation" add constraint "product_category_translation_parent_category_id_foreign" foreign key ("parent_category_id") references "product_category_translation" ("id") on update cascade on delete cascade;`
    )
    this.addSql(
      `alter table if exists "product_category_translation" add constraint "product_category_translation_locale_id_foreign" foreign key ("locale_id") references "store_locale" ("id") on update cascade on delete cascade;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "product_category_translation" drop constraint if exists "product_category_translation_parent_category_id_foreign";`
    )

    this.addSql(`drop table if exists "product_type_translation" cascade;`)

    this.addSql(`drop table if exists "product_tag_translation" cascade;`)

    this.addSql(`drop table if exists "product_category_translation" cascade;`)
  }
}
