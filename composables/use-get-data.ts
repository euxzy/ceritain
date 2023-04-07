export const useGetData = () => {
  const { baseApi, otakuLineApi } = useAppConfig()
  const token = localStorage.getItem('token') || ''

  const resProfile = async () => {
    return await useFetch('api/me', {
      baseURL: baseApi,
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
  }

  const resPosts = async () => (await useFetch('api/post', { baseURL: baseApi }))

  const resOtakuLine = async () => (await useFetch('wp-json/wp/v2/posts', {
    baseURL: otakuLineApi,
    params: {
      per_page: 1
    }
  }))

  return { resProfile, resPosts, resOtakuLine }
}
