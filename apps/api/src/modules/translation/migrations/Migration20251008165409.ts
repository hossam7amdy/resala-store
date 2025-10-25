import { Migration } from '@mikro-orm/migrations'

export class Migration20251008165409 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "store_locale" rename column "locale" to "code";`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table if exists "store_locale" rename column "code" to "locale";`
    )
  }
}
