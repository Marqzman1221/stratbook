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
      <v-avatar v-on="on" size="36">
        <v-img v-if="$auth.getAvatar" :src="$auth.getAvatar" />
      </v-avatar>
    </template>

    <v-card class="pa-2" width="220">
      <v-card-title class="py-2"> Hi, {{ $auth.getFirstName }} </v-card-title>

      <v-divider />

      <v-list class="pb-0">
        <template v-for="(list, listIndex) in menuItems">
          <v-divider
            v-if="listIndex !== 0"
            :key="`divider-${listIndex}`"
            class="my-2"
          />

          <v-list-item
            v-for="(item, index) in list"
            :key="`primary-${listIndex}-${index}`"
            class="px-0"
            dense
            :to="{ name: item.route }"
          >
            <v-list-item-icon class="mx-4">
              <v-icon dense>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="subtitle-2">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const menuItems = [
  [
    {
      title: 'Account',
      icon: 'mdi-account-circle',
      route: 'account',
    },
    {
      title: 'My Library',
      icon: 'mdi-book-open-variant',
      route: 'library',
    },
  ],
  [
    {
      title: 'Help',
      icon: 'mdi-help-circle',
      route: 'help',
    },
    {
      title: 'Settings',
      icon: 'mdi-cog',
      route: 'settings',
    },
  ],
  [
    {
      title: 'Sign Out',
      icon: 'mdi-logout',
      route: 'logout',
    },
  ],
]
</script>
