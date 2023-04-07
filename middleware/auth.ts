export default defineNuxtRouteMiddleware(async (to, from) => {
  const { resProfile } = await useGetData()
  const dataUser: any = resProfile.data.value || null
  const path = to.path

  if (path == '/login' || path == '/register') {
    if (dataUser?.status) return navigateTo('/')
    return
  }
})
