<template>
  <v-snackbar v-model="notification.show" v-bind="attributes" dark>
    <div class="text-subtitle-1 font-weight-medium">
      {{ notification.text }}
    </div>

    <template v-if="notification.progress !== undefined" #action>
      <v-btn
        :disabled="notification.progress"
        depressed
        tile
        icon
        @click="close()"
      >
        <v-progress-circular
          v-if="notification.progress"
          size="24"
          width="3"
          color="white"
          indeterminate
        />
        <v-icon v-else> mdi-close </v-icon>
      </v-btn>
    </template>

    <template v-else-if="notification.clearable" #action>
      <v-btn depressed tile icon @click="notification.$reset()">
        <v-icon> mdi-close </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { useNotification } from '~/stores/notification'

const notification = useNotification()

const attributes = computed(() => notification.getAttributes)

function close() {
  if (notification.progress) return

  notification.$reset()
}
</script>
