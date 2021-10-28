<template>
  <v-card outlined>
    <v-img :src="item.map.thumbnail" height="120" />

    <v-card-title class="py-0">
      <v-list-item class="px-0">
        <v-list-item-content class="py-0">
          <v-list-item-title class="strategy-title">
            {{ item.title }}
          </v-list-item-title>

          <v-list-item-subtitle>
            Modified on {{ item.updated_at }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <icon-button icon="mdi-dots-vertical" />
        </v-list-item-action>
      </v-list-item>
    </v-card-title>
  </v-card>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup() {

  },
})
</script>
