<template>
  <picker
    :value="value"
    :items="colorItems"
    @input="emit('input', $event)"
    @preview="emit('preview', $event)"
  >
    <template v-slot="{ item, hover, on, isSelected }">
      <v-avatar
        v-on="on"
        size="64"
        :class="hover ? 'color-highlight' : ''"
        :color="item"
      >
        <v-icon v-if="isSelected(item)"> mdi-check-circle </v-icon>
      </v-avatar>
    </template>
  </picker>
</template>

<script setup lang="ts">
import colors from 'vuetify/es5/util/colors'

defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'preview', value: string): void
}>()

const colorItems = [
  colors.red.darken3,
  colors.red.darken2,
  colors.red.darken1,
  colors.red.lighten1,
  colors.red.lighten2,
  colors.red.lighten3,

  colors.blue.darken3,
  colors.blue.darken2,
  colors.blue.darken1,
  colors.blue.lighten1,
  colors.blue.lighten2,
  colors.blue.lighten3,

  colors.green.darken3,
  colors.green.darken2,
  colors.green.darken1,
  colors.green.lighten1,
  colors.green.lighten2,
  colors.green.lighten3,

  colors.yellow.darken3,
  colors.yellow.darken2,
  colors.yellow.darken1,
  colors.yellow.lighten1,
  colors.yellow.lighten2,
  colors.yellow.lighten3,

  colors.purple.darken3,
  colors.purple.darken2,
  colors.purple.darken1,
  colors.purple.lighten1,
  colors.purple.lighten2,
  colors.purple.lighten3,
]
</script>

<style>
.color-highlight {
  border: 2px solid #e8e8e8;
  padding: 2px;
  /* border-radius: 50%; */
}
</style>
