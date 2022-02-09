<template>
  <picker
    :value="value"
    :items="avatarItems"
    @input="emit('input', $event)"
    @preview="emit('preview', $event)"
  >
    <template v-slot="{ item, hover, disabled, on, isSelected }">
      <v-avatar
        v-on="on"
        size="64"
        :class="isSelected(item) ? 'avatar-highlight' : ''"
        :color="hover && !disabled ? '#363636' : ''"
      >
        <v-icon large>{{ item }}</v-icon>
      </v-avatar>
    </template>
  </picker>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'preview', value: string): void
}>()

const avatarItems = [
  'mdi-flower-tulip',
  'mdi-bird',
  'mdi-ghost',
  'mdi-run',
  'mdi-boxing-glove',
  'mdi-pine-tree',
  'mdi-car',
  'mdi-fire',
  'mdi-leaf',
  'mdi-water',
  'mdi-white-balance-sunny',
  'mdi-moon-waning-crescent',
]
</script>

<style>
.avatar-highlight {
  border: 1px solid white;
  /* border-radius: 50%; */
}
</style>
