// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0'
  },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      // These will be automatically overridden by NUXT_PUBLIC_API_URL and NUXT_PUBLIC_WS_URL from .env
      apiUrl: '',
      wsUrl: ''
    }
  }
})
