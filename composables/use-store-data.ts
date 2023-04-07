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

  return { resStorePost, resLogin, resRegister }
}
