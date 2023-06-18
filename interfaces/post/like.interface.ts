export default interface LikeInterface {
  id?: string
  content?: string
  image?: string
  views?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  user?: {
    name?: string
    username?: string
  }
  userLikes?: Array<{
    name?: string
    username?: string
  }>
  _count?: {
    userLikes?: number
    comments?: number
  }
}
