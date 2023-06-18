import { BaseResponseInterface } from '~/interfaces/response/base.interface'

const { baseApi } = useAppConfig()
const { getToken } = useAuthToken()

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
      const { data, error } = await useFetch('api/auth/login', {
        baseURL: baseApi,
        method: 'POST',
        body
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async register(body: FormData) {
      const { data, error } = await useFetch('api/auth/register', {
        baseURL: baseApi,
        method: 'POST',
        body
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },

    async logout() {
      const { data, error } = await useFetch('api/auth/logout', {
        baseURL: baseApi,
        method: 'POST',
        headers: {
          'Authorization': getToken()
        }
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
      }

      if (error.value) this.errorHandling(error.value)
    },

    async verify(code: string) {
      const { data, error } = await useFetch('api/auth/verify', {
        baseURL: baseApi,
        method: 'POST',
        params: {
          code
        }
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
      }

      if (error.value) this.errorHandling(error.value)
    }
  }
})
