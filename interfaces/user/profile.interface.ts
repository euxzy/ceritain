export default interface ProfileInterface {
  id?: number
  name?: string
  username?: string
  email?: string
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  isVerified?: number
  profile?: {
    bio?: string
    photo?: string
  }
}
