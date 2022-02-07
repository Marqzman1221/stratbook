import { defineStore } from 'pinia'

export const useDialog = defineStore('dialog', {
  state: () => ({
    show: false,
    attributes: {},
    title: '',
    component: undefined,
    message: '',
    onSubmit: undefined,
    pendingMessage: '',
  }),

  actions: {
    SHOW(payload) {
      this.attributes = payload.attributes
      this.title = payload.title
      this.component = payload.component
      this.message = payload.message
      this.onSubmit = payload.onSubmit
      this.pendingMessage = payload.pendingMessage

      this.show = true
    },
    async submit() {
      if (this.submit === undefined) return

      this.show = false

      await this.$nuxt.$notify(
        this.pendingMessage,
        { color: 'primary' },
        this.onSubmit
      )

      this.$reset()
    },
    close() {
      this.show = false

      setTimeout(() => {
        this.$reset()
      }, 400)
    },
  },

  getters: {
    getAttributes: (state) => state.attributes,
  },
})
