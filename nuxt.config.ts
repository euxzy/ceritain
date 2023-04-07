// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ceritain | Otakuline.id'
    }
  },
  routeRules: {
    '/*': { ssr: false }
  },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/config/tailwind.ts',
    viewer: false
  },
  appConfig: {
    baseApi: process.env.APP_API
  }
})
