export default function() {
  const setToken = (val: string) => localStorage.setItem('_at', val)
  const getToken = (): string => localStorage.getItem('_at') || ''
  const rmToken = () => localStorage.removeItem('_at')

  return { setToken, getToken, rmToken }
}
