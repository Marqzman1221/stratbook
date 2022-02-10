<template>
  <v-navigation-drawer
    class="d-flex flex-column"
    width="64"
    color="black"
    permanent
    app
  >
    <nuxt-link :to="{ name: 'index' }">
      <v-img class="pa-2" height="64" width="64" src="" />
    </nuxt-link>

    <v-divider />

    <v-list class="d-flex flex-column flex-grow-1 py-2" width="64">
      <template v-for="nav in navItems">
        <v-tooltip
          :key="`nav-${nav.route}`"
          color="primary"
          transition="slide-x-transition"
          right
        >
          <template #activator="{ on }">
            <v-list-item
              v-on="on"
              active-class="primary--text active-nav-item"
              class="justify-center align-center"
              :to="{ name: nav.route }"
            >
              <v-icon size="24">{{ nav.icon }}</v-icon>
            </v-list-item>
          </template>

          {{ nav.name }}
        </v-tooltip>
      </template>
    </v-list>

    <template #append>
      <div
        class="d-flex justify-center align-center"
        style="height: 64px; width: 64px"
      >
        <account-menu />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const navItems = [
  {
    name: 'Discover',
    route: 'discover',
    icon: 'mdi-compass',
  },
  {
    name: 'My Library',
    route: 'library',
    icon: 'mdi-book-open-variant',
  },
  {
    name: 'Squads',
    route: 'squads',
    icon: 'mdi-account-group',
  },
  {
    name: 'Profile',
    route: 'profile',
    icon: 'mdi-account-circle',
  },
  {
    name: 'Settings',
    route: 'settings',
    icon: 'mdi-cog',
  },
]
</script>

<style>
.active-nav-item {
  border-right: 4px solid #1976d2;
  padding-right: 12px !important;
}
</style>
