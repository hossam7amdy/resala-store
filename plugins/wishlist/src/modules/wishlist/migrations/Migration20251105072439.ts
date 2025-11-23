import { Migration } from '@medusajs/framework/mikro-orm/migrations'

export class Migration20251105072439 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table if exists "wishlist_item" drop constraint if exists "wishlist_item_product_id_wishlist_id_unique";`
    )
    this.addSql(
      `drop index if exists "IDX_wishlist_item_variant_id_wishlist_id_unique";`
    )

    this.addSql(
      `alter table if exists "wishlist_item" rename column "variant_id" to "product_id";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_wishlist_item_product_id_wishlist_id_unique" ON "wishlist_item" (product_id, wishlist_id) WHERE deleted_at IS NULL;`
    )
  }

  override async down(): Promise<void> {
    this.addSql(
      `drop index if exists "IDX_wishlist_item_product_id_wishlist_id_unique";`
    )

    this.addSql(
      `alter table if exists "wishlist_item" rename column "product_id" to "variant_id";`
    )
    this.addSql(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_wishlist_item_variant_id_wishlist_id_unique" ON "wishlist_item" (variant_id, wishlist_id) WHERE deleted_at IS NULL;`
    )
  }
}
