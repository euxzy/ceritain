import { BaseResponseInterface } from '~/interfaces/response/base.interface'
import { RequestMethod } from '~/types'

export const authStore = defineStore('auth', {
  state: (): BaseResponseInterface => ({
    status: false,
    message: '',
    data: null,
  }),

  actions: {
    errorHandling(error: any) {
      const response: any = error?.data

      this.status = false
      this.message = response?.message
    },

    async login(body: FormData) {
      const { data, error } = await httpClient('api/auth/login', RequestMethod.POST, body)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data

        useAuthToken().setToken(this.data?.token as string)
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async register(body: FormData) {
      const { data, error } = await httpClient('api/auth/register', RequestMethod.POST, body)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },

    async logout() {
      const { data, error } = await httpClient('api/auth/logout', RequestMethod.POST)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
      }

      if (error.value) this.errorHandling(error.value)
      useAuthToken().rmToken()
    },

    async verify(code: string) {
      const { data, error } = await httpClient(`api/auth/verify?code=${code}`, RequestMethod.POST)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
      }

      if (error.value) this.errorHandling(error.value)
    }
  }
})
