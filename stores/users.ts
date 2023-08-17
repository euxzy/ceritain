import { UserResponseInterface } from '~/interfaces/response/user.interface'
import { RequestMethod } from '~/types'

export const userStore = defineStore('users', {
  state: (): UserResponseInterface => ({
    status: false,
    message: '',
    data: null,

    profile: {},
    userDetail: {},

    isLogged: false,
    isDetailLoaded: false,
  }),

  actions: {
    errorHandling(error: any) {
      const response: any = error?.data

      this.status = false
      this.message = response?.message
    },

    async getProfile() {
      const { data, error } = await httpClient('api/me', RequestMethod.GET)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.isLogged = response?.status
        this.message = response?.message
        this.profile = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },

    async getUserDetail(username: string) {
      const { data, error } = await httpClient(`api/user/${username}`, RequestMethod.GET)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.userDetail = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    }
  }
})
