// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ceritain | Otakuline.id',
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16x', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ]
    }
  },

  // ssr: false,

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
  ],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/config/tailwind.ts',
    viewer: false
  },

  pinia: {
    autoImports: [
      'storeToRefs',
      'defineStore'
    ]
  },

  appConfig: {
    baseApi: process.env.APP_API,
    otakuLineApi: process.env.OTAKULINE_API
  },

  devtools: {
    enabled: true
  },

  imports: {
    dirs: ['stores']
  },
})
