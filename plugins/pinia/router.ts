import { defineNuxtPlugin } from '#app'
import { PiniaPluginContext } from 'pinia'

export default defineNuxtPlugin((nuxtApp: any) => {
  function PiniaRouter({ store }: PiniaPluginContext) {
    store.$router = nuxtApp.$router
  }

  nuxtApp.$pinia.use(PiniaRouter)
})
