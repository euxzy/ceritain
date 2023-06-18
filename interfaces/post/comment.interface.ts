export default interface CommentInterface {
  id?: string
  postId?: string
  content?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  user?: {
    name?: string
    username?: string
  }
}
