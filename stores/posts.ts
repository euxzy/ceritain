import PostResponseInterface from '~/interfaces/response/post.interface'
import { RequestMethod } from '~/types'

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

    async getListPost(params: {
      page?: number,
      order_by?: string,
      data?: number,
      posts_by?: string,
    }) {
      let endpoint = 'api/post?'
      if (params?.page) endpoint += `&page=${params.page}`
      if (params?.order_by) endpoint += `&order_by=${params.order_by}`
      if (params?.data) endpoint += `&data=${params.data}`
      if (params?.posts_by) endpoint += `&posts_by=${params.posts_by}`

      const { data, error} = await httpClient(endpoint, RequestMethod.GET)

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
      const { data, error } = await httpClient(`api/post/${postId}`, RequestMethod.GET)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.detailPost = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async getComments(postId: string) {
      const { data, error } = await httpClient(`api/${postId}/comment`, RequestMethod.GET)

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
      const { data, error } = await httpClient('api/post/add', RequestMethod.POST, body)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async createComment(body: FormData) {
      const { data, error } = await httpClient('api/comment/add', RequestMethod.POST, body)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.data = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async postLikes(postId: string) {
      const { data, error } = await httpClient(`api/${postId}/like`, RequestMethod.POST)

      if (data.value) {
        const response: any = data.value

        this.status = response?.status
        this.message = response?.message
        this.likePost = response?.data
      }

      if (error.value) this.errorHandling(error.value)
    },
    
    async getOtakulinePosts() {
      const { otakuLineApi } = useAppConfig()

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
