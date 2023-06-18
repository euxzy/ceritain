import PostResponseInterface from '~/interfaces/response/post.interface'

const { baseApi, otakuLineApi } = useAppConfig()
const { getToken } = useAuthToken()

export const postStore = defineStore('posts', {
  state: (): PostResponseInterface => ({
    status: false,
    message: '',
    data: null,

    isCommentLoaded: false,
    isOLPostLoaded: false,

    listPosts: [],
    detailPost: {},
    listComments: [],
    otakulinePosts: [],
    likePost: {}
  }),

  actions: {
    errorHandling(error: any) {
      const response: any = error?.data

      this.status = false
      this.message = response?.message
    },

    async getListPost(params: object) {
      const { data, error} = await useFetch('api/post', {
        baseURL: baseApi,
        method: 'GET',
        params,
        headers: {
          'Authorization': getToken()
        }
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.listPosts = response?.data
      }

      if (error.value) {
        this.errorHandling(error.value)
        this.listPosts = []
      }
    },
    
    async getDetailPost(postId: string) {
      const { data, error } = await useFetch(`api/post/${postId}`, { baseURL: baseApi })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.detailPost = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async getComments(postId: string) {
      const { data, error } = await useFetch(`api/${postId}/comment`, { baseURL: baseApi })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.listComments = response?.data
      }

      if (error.value) this.errorHandling(error.value)

      this.isCommentLoaded = true
    },
    
    async createPost(body: FormData) {
      const { data, error } = await useFetch('api/post/add', {
        baseURL: baseApi,
        method: 'POST',
        body,
        headers: {
          'Authorization': getToken()
        }
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async createComment(body: FormData) {
      const { data, error } = await useFetch('api/comment/add', {
        baseURL: baseApi,
        method: 'POST',
        body,
        headers: {
          'Authorization': getToken()
        }
      })

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async postLikes(postId: string) {
      const { data, error } = await useFetch(`api/${postId}/like`, {
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
        this.likePost = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async getOtakulinePosts() {
      const { data, error } = await useFetch('wp-json/wp/v2/posts', {
        baseURL: otakuLineApi,
        params: {
          per_page: 1
        }
      })

      if (data.value) {
        const response: any = data.value
        this.otakulinePosts = response || []
      }

      if (error.value) this.otakulinePosts = []

      this.isOLPostLoaded = true

    }
  }
})
