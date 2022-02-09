<template>
  <v-dialog
    v-model="dialog.show"
    v-bind="attributes"
    :width="attributes.width || 600"
    :transition="
      dialog.transition ||
      (attributes.fullscreen ? 'dialog-bottom-transition' : undefined)
    "
  >
    <v-card class="pa-4" flat>
      <v-card-title v-if="!dialog.hideToolbar" class="pa-0">
        {{ dialog.title }}

        <v-spacer />

        <v-btn tile icon @click="dialog.close()">
          <v-icon> mdi-close </v-icon>
        </v-btn>
      </v-card-title>

      <component :is="dialog.component" v-if="dialog.component" />
      <div v-else-if="dialog.message" class="px-4 py-6">
        {{ dialog.message }}
      </div>

      <v-card-actions v-if="dialog.onSubmit" class="pa-0">
        <v-btn color="primary" block @click="dialog.submit()"> Submit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDialog } from '~/stores/dialog'

const dialog = useDialog()

const attributes = computed(() => dialog.getAttributes)
</script>
