import { useNotification } from '~/stores/notification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide(
    'notify',
    async (
      text: string,
      attributes?: NotificationModel = { color: 'primary', timeout: 4000 },
      callback?: () => string = undefined,
      clearable?: boolean = undefined
    ) => {
      const notification = useNotification(nuxtApp.$pinia)

      if (callback && typeof callback === 'function') {
        notification.progress = true
        notification.SHOW(text, attributes)

        const message = await callback()

        notification.attributes.timeout = 4000
        notification.progress = false
        notification.text = message

        return
      }

      if (clearable) notification.clearable = true

      notification.SHOW(text, attributes)
    }
  )
})
