export type NotificationModel = {
  color?: string
  timeout?: number
  clearable?: boolean
}

export type DialogModel = {
  fullscreen?: boolean
  persistent?: boolean
}

export type DialogPayload = {
  attributes: DialogModel
  title: string
  component?: string
  onSubmit?: () => void
}
