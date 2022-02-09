<template>
  <div>
    <v-toolbar dense flat>
      <v-btn text @click="$emit('back')">
        <v-icon left>mdi-chevron-left</v-icon>
        Back
      </v-btn>
    </v-toolbar>

    <v-color-picker
      width="100%"
      :value="props.value"
      hide-canvas
      hide-inputs
      hide-mode-switch
      hide-sliders
      show-swatches
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string | undefined
}>()
</script>
