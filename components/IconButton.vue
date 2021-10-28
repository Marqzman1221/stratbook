<template>
  <div>
    <v-tooltip v-if="tooltip" left>
      <template #activator="{ on, attrs }">
        <v-btn
          class="icon-btn"
          v-bind="attrs"
          dark
          icon
          tile
          @click="$emit('click')"
          v-on="on"
        >
          <v-icon>
            {{ icon }}
          </v-icon>
        </v-btn>
      </template>

      {{ tooltip }}
    </v-tooltip>

    <v-btn v-else class="icon-btn" dark icon tile @click="$emit('click')">
      <v-icon>
        {{ icon }}
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      required: true,
    },
    tooltip: {
      type: String,
      default: undefined,
    }
  },
  setup() {

  },
})
</script>

<style scoped>
.icon-btn {
  border-radius: 4px !important;
}
</style>
