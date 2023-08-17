export default function() {
  const setToken = (val: string) => {
    const oneYear = new Date()
    oneYear.setFullYear(oneYear.getFullYear() + 1)
    const token = useCookie('_at', {
      path: '/',
      expires: oneYear,
    })
    token.value = val
  }

  const getToken = (): string => useCookie('_at').value as string

  const rmToken = () => useCookie('_at').value = null

  return { setToken, getToken, rmToken }
}
