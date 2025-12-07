import { Migration } from '@mikro-orm/migrations'

export class Migration20251207195925 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table if not exists "translation_provider" ("id" text not null, "is_enabled" boolean not null default true, "is_default" boolean not null default false, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "translation_provider_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_provider_deleted_at" ON "translation_provider" ("deleted_at") WHERE deleted_at IS NULL;`
    )

    this.addSql(`drop index if exists "IDX_language_code_unique";`)

    this.addSql(
      `alter table if exists "language" add column if not exists "region_id" text not null default '*', add column if not exists "is_rtl" boolean not null default false;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_unique_code_region_id" ON "language" ("code", "region_id") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "translation" add column if not exists "provider_id" text null;`
    )
    this.addSql(
      `alter table if exists "translation" add constraint "translation_provider_id_foreign" foreign key ("provider_id") references "translation_provider" ("id") on update cascade on delete set null;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_provider_id" ON "translation" ("provider_id") WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "translation" drop constraint if exists "translation_provider_id_foreign";`
    )

    this.addSql(`drop table if exists "translation_provider" cascade;`)

    this.addSql(`drop index if exists "IDX_unique_code_region_id";`)
    this.addSql(
      `alter table if exists "language" drop column if exists "region_id", drop column if exists "is_rtl";`
    )

    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_language_code_unique" ON "language" ("code") WHERE deleted_at IS NULL;`
    )

    this.addSql(`drop index if exists "IDX_translation_provider_id";`)
    this.addSql(
      `alter table if exists "translation" drop column if exists "provider_id";`
    )
  }
}
