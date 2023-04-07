export const useGetData = async () => {
  const { baseApi } = useAppConfig()
  const token = localStorage.getItem('token') || ''

  const resProfile = await useFetch('api/me', {
    baseURL: baseApi,
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })

  const resPosts = await useFetch('api/post', { baseURL: baseApi })

  return { resProfile, resPosts }
}
