import { defineStore } from 'pinia'

function getTimeout(value, progress, clearable) {
  if (progress || clearable) return -1

  if (!value) return 4000

  return value
}

export const useNotification = defineStore('notification', {
  state: () => ({
    show: false,
    progress: undefined,
    clearable: false,
    attributes: {},
    text: '',
  }),

  actions: {
    SHOW(text: string, attributes: NotificationModel) {
      const timeout = getTimeout(
        attributes.timeout,
        this.progress,
        this.clearable
      )

      this.text = text
      this.attributes = {
        ...attributes,
        timeout,
      }

      this.show = true
    },
  },

  getters: {
    getAttributes: (state) => state.attributes,
  },
})
