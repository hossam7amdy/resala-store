import { model } from '@medusajs/framework/utils'

const Review = model.define('review', {
  id: model.id({ prefix: 'rev' }).primaryKey(),
  title: model.text().nullable(),
  content: model.text(),
  rating: model.float(),
  first_name: model.text(),
  last_name: model.text(),
  status: model.enum(['pending', 'approved', 'rejected']).default('pending'),
  product_id: model.text().index('IDX_review_product_id'),
  customer_id: model.text().nullable(),
})

export default Review
