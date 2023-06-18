import ProfileInterface from '~/interfaces/user/profile.interface'
import UserDetailInterface from '~/interfaces/user/detail.interface'

export interface UserResponseInterface {
  status: boolean
  message: string
  data: any

  profile: ProfileInterface
  userDetail: UserDetailInterface

  isLogged: boolean
  isDetailLoaded: boolean
}
