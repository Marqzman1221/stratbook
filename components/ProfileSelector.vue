<template>
  <div>
    <v-toolbar dense flat>
      <v-btn text @click="emit('back')">
        <v-icon left>mdi-chevron-left</v-icon>
        Back
      </v-btn>
    </v-toolbar>

    <avatar-picker
      v-if="props.selectMode === 'avatar'"
      :value="props.avatarValue"
      @input="emit('input', { key: 'avatar', value: $event })"
      @preview="emit('input', { key: 'avatar', value: $event }, true)"
    />
    <color-picker
      v-if="props.selectMode === 'color'"
      :value="props.colorValue"
      @input="emit('input', { key: 'color', value: $event })"
      @preview="emit('input', { key: 'color', value: $event }, true)"
    />
    <!-- <v-color-picker
      v-if="selectMode === 'color'"
      width="100%"
      :value="colorValue"
      hide-canvas
      hide-inputs
      hide-mode-switch
      hide-sliders
      show-swatches
      @input="emit('input', { key: selectMode, value: $event })"
    /> -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  avatarValue: string | undefined
  colorValue: string | undefined
  selectMode: 'avatar' | 'color' | ''
}>()

const emit = defineEmits<{
  (e: 'input', payload: { key: string; value: string }, preview?: boolean): void
  (e: 'back'): void
}>()

// function emitInput(value: string, preview?: boolean) {
//   emit('input', { key: props.selectMode, value }, preview)
// }
</script>
