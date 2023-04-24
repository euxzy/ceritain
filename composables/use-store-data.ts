import StoreInterface from "~~/interfaces/store.interface"

export const useStoreData = (data: StoreInterface) => {
  const { baseApi } = useAppConfig()
  const token: string = localStorage.getItem('token') || ''

  const resStorePost = async () => {
    return await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: data?.formData
    })
  }

  const resLogin = async () => {
    return await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      body: data?.formData
    })
  }

  const resRegister = async () => {
    return await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      body: data?.formData
    })
  }

  const resVerifyEmail = async () => {
    return await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      params: data?.params
    })
  }

  const resComment = async () => (
    await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body: data?.formData
    })
  )
    
  const resLikePost = async () => {
    return await useFetch(data.path, {
      baseURL: baseApi,
      method: 'POST',
      headers: {
        'Authorization': token
      }
    })
  }

  return { resStorePost, resLogin, resRegister, resVerifyEmail, resComment, resLikePost }
}
