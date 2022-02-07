<template>
  <div>
    <v-toolbar flat>
      <v-btn color="primary" @click="openBasic()"> Basic </v-btn>

      <v-btn class="ml-2" color="success" @click="openClearable()">
        Clearable
      </v-btn>

      <v-btn class="ml-2" color="error" @click="openProgress()">
        Progress
      </v-btn>
    </v-toolbar>

    <v-toolbar class="mt-2" flat>
      <v-btn color="primary" @click="openDialog()"> Open Dialog </v-btn>

      <v-btn class="ml-2" color="primary" @click="openFullscreen()">
        Open Fullscreen
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
const { $notify, $dialog } = useNuxtApp()

function openBasic() {
  $notify('Basic message!')
}

function openClearable() {
  $notify('Clearable message', { color: 'success' }, null, true)
}

function openProgress() {
  $notify('Awaiting response...', { color: 'error' }, async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return 'Success!'
  })
}

function openDialog() {
  $dialog({
    attributes: {
      persistent: true,
    },
    title: 'Delete 1 record',
    message: 'Are you sure you want to delete this record?',
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      return 'Successfully deleted 1 record'
    },
    pendingMessage: 'Deleting 1 record...',
  })
}

function openFullscreen() {
  $dialog({
    attributes: {
      persistent: true,
      fullscreen: true,
    },
    title: 'Big Form',
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      return 'Successfully created 1 record'
    },
    pendingMessage: 'Submitting form...',
  })
}
</script>

<script lang="ts">
export default {
  auth: false,
}
</script>
