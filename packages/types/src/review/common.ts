/** Review data transfer object containing customer review information for products */
export type ReviewDTO = {
  /** Unique identifier for the review */
  id: string
  /** Optional title for the review */
  title: string | null
  /** Rating score given by the customer (typically 1-5) */
  rating: number
  /** Main content/text of the review */
  content: string
  /** First name of the reviewer */
  first_name: string
  /** Last name of the reviewer */
  last_name: string
  /** Current status of the review in the moderation process */
  status: 'pending' | 'approved' | 'rejected'
  /** ID of the product being reviewed */
  product_id: string
  /** ID of the customer who wrote the review, null for anonymous reviews */
  customer_id: string | null
  /** Timestamp when the review was created */
  created_at: string | Date
  /** Timestamp when the review was last updated */
  updated_at: string | Date
  /** Timestamp when the review was soft deleted, null if not deleted */
  deleted_at: string | Date | null
}
