import { useDialog } from '~/stores/dialog'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('dialog', (payload: DialogPayload) => {
    const dialog = useDialog(nuxtApp.$pinia)

    dialog.SHOW(payload)
  })
})
