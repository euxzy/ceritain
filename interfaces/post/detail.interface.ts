export default interface DetailPostInterface {
  id?: string
  content?: string
  image?: string
  views?: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  tags?: Array<{ tagName?: string }>
  user?: {
    id?: number
    name?: string
    username?: string
    profile?: {
      bio?: string
      photo?: string
    }
  }
  _count?: {
    comments?: number
    userLikes?: number
  }
  userLikes?: Array<{
    id?: number
    name?: string
    username?: string
  }>
}
