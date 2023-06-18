import DetailPostInterface from '~/interfaces/post/detail.interface'
import CommentInterface from '~/interfaces/post/comment.interface'
import LikeInterface from '~/interfaces/post/like.interface'

export default interface PostResponseInterface {
  status: boolean
  message: string
  data: any

  isCommentLoaded: boolean
  isOLPostLoaded: boolean

  listPosts: Array<DetailPostInterface>
  detailPost: DetailPostInterface
  listComments: Array<CommentInterface>
  otakulinePosts: Array<any>
  likePost: LikeInterface
}
