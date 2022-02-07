<template>
  <v-menu
    transition="slide-y-transition"
    nudge-bottom="8"
    bottom
    left
    rounded
    offset-y
  >
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        class="mr-3"
        style="border-radius: 4px"
        height="36"
        width="36"
        tile
        icon
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card class="pa-2" width="240">
      <v-card-title class="py-2"> Create </v-card-title>

      <v-divider />

      <v-list class="pb-0">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="`create-item-${index}`"
          @click="item.action()"
        >
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const { $dialog } = useNuxtApp()

const menuItems = [
  {
    title: 'New Strategy',
    action: () => {
      $dialog({
        attributes: {
          persistent: true,
        },
        title: 'New Strategy',
        onSubmit: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))

          return 'Successfully created new strategy'
        },
        pendingMessage: 'Initializing new strategy...',
      })
    },
  },
  {
    title: 'New Squad',
    action: () => {
      $dialog({
        attributes: {
          persistent: true,
        },
        title: 'New Squad',
        onSubmit: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000))

          return 'Successfully created new squad'
        },
        pendingMessage: 'Creating new squad...',
      })
    },
  },
]
</script>
