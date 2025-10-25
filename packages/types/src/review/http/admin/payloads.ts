export interface AdminUpdateReviewsStatus {
  ids: string[]
  status: 'pending' | 'approved' | 'rejected'
}
