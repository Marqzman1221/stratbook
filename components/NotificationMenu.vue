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
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </template>

    <v-card class="pa-2" width="360">
      <v-card-title class="py-2 font-weight-bold"> Notifications </v-card-title>

      <v-divider />

      <v-list class="pb-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="subtitle-2">
              No new notifications
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>
