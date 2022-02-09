<template>
  <div>
    <v-toolbar dense flat>
      <v-btn text @click="$emit('back')">
        <v-icon left>mdi-chevron-left</v-icon>
        Back
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string | undefined
}>()
</script>
