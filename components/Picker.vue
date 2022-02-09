<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(item, index) in items"
        class="d-flex flex-row justify-center"
        :key="`picker-item-${index}`"
        cols="2"
      >
        <v-hover
          v-slot="{ hover }"
          close-delay="200"
          :disabled="hoverDisabled"
          @input="handleHover($event, item)"
        >
          <slot
            :item="item"
            :hover="hover"
            :disabled="hoverDisabled"
            :on="{ click: () => handleClick(item) }"
            :isSelected="isSelected"
          />
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'input', value: string): void
  (e: 'preview', value: string): void
}>()

const cache = ref(null)
const hoverCount = ref(0)
const hoverDisabled = ref(true)

onMounted(() => {
  cache.value = props.value
  hoverCount.value = 0

  setTimeout(() => {
    hoverDisabled.value = false
  }, 500)
})

function handleHover(value: boolean, item: string) {
  if (value) hoverCount.value++
  else hoverCount.value--

  if (hoverCount.value === 0) {
    emit('preview', cache.value)
    return
  }

  if (!value) return

  emit('preview', item)
}

function handleClick(value: string) {
  hoverDisabled.value = true
  cache.value = value
  emit('input', value)
}

function isSelected(value: string) {
  return cache.value === value
}
</script>
