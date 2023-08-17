import { UseFetchOptions } from "nuxt/app"
import { RequestMethod } from "~/types"

export default async function(endpoint: string, method: RequestMethod, payload?: any) {
  const httpClient = async () => {
    const { baseApi } = useAppConfig()
    const { getToken } = useAuthToken()
    const token = getToken()

    const fetchOpt: UseFetchOptions<unknown> = {
      method,
      baseURL: baseApi,
    }

    if (token) fetchOpt.headers = { 'Authorization': token }
    if (payload) fetchOpt.body = payload

    return await useFetch(endpoint, fetchOpt)
  }

  return await httpClient()
}
