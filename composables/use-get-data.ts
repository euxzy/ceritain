export const useGetData = () => {
  const { baseApi } = useAppConfig()
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

  return { resProfile, resPosts }
}
