export default interface UserDetailInterface {
  id?: number
  name?: string
  username?: string
  email?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  profile?: {
    bio?: string
    photo?: string
  }
  _count?: {
    posts?: number
    followers?: number
    followings?: number
  }
  followers?: Array<any>
  followings?: Array<any>
}
