export default defineNuxtRouteMiddleware(async (to, from) => {
  const { getProfile } = userStore()
  const { isLogged } = storeToRefs(userStore())

  await getProfile()
  const path = to.path

  if (path == '/login' || path == '/register') {
    if (isLogged.value) return navigateTo('/')
    return
  }
})
