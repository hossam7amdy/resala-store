import { Migration } from '@mikro-orm/migrations'

export class Migration20251202073851 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "language" drop constraint if exists "language_code_unique";`
    )
    this.addSql(
      `create table if not exists "language" ("id" text not null, "code" text not null, "name" text not null, "is_default" boolean not null default false, "is_published" boolean not null default false, "metadata" jsonb null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "language_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_language_code_unique" ON "language" ("code") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_language_deleted_at" ON "language" ("deleted_at") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `create table if not exists "translation" ("id" text not null, "resource_id" text not null, "resource_type" text not null, "key" text not null, "value" text not null, "is_outdated" boolean not null default false, "metadata" jsonb null, "language_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "translation_pkey" primary key ("id"));`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_language_id" ON "translation" ("language_id") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_deleted_at" ON "translation" ("deleted_at") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_translation_lookup" ON "translation" ("language_id", "resource_type", "resource_id", "key") WHERE deleted_at IS NULL;`
    )
    this.addSql(
      `CREATE INDEX IF NOT EXISTS "IDX_translation_resource" ON "translation" ("resource_type", "resource_id") WHERE deleted_at IS NULL;`
    )

    this.addSql(
      `alter table if exists "translation" add constraint "translation_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade on delete cascade;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "translation" drop constraint if exists "translation_language_id_foreign";`
    )

    this.addSql(`drop table if exists "language" cascade;`)

    this.addSql(`drop table if exists "translation" cascade;`)
  }
}
