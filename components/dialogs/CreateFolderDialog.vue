<template>
  <v-form v-model="valid" @submit.prevent="submit()">
    <v-text-field
      v-model="form.name"
      class="mt-4"
      label="Name"
      :rules="rules.name"
      persistent-placeholder
      autofocus
      outlined
      required
    />

    <v-btn
      class="mt-4"
      color="primary"
      type="submit"
      :disabled="!valid"
      depressed
      block
    >
      Create
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useDialog } from '~/stores/dialog'
import { useDirectory } from '~/stores/directory'

const directory = useDirectory()
const dialog = useDialog()

const valid = ref(false)
const form = reactive({
  name: '',
})

const rules = {
  name: [
    (v: string) => !!v || 'Folder name is required',
    (v: string) => /^[\w\(\)\[\] -.]+$/g.test(v) || 'Invalid folder name',
  ],
}

function submit() {
  dialog.submit(async () => directory.createFolder(form.name))
}
</script>
