<template>
  <v-menu transition="slide-x-transition" nudge-right="16" right top offset-x>
    <template #activator="{ on }">
      <v-btn
        v-if="$auth.profile"
        v-on="on"
        style="border-radius: 50%"
        :ripple="false"
        tile
        icon
      >
        <v-avatar :color="$auth.profile.color" size="36">
          <v-icon> {{ $auth.profile.avatar }}</v-icon>
          <!-- <v-img v-if="$auth.getAvatar" :src="$auth.getAvatar" /> -->
        </v-avatar>
      </v-btn>
    </template>

    <v-card class="pa-2" color="black" width="300">
      <v-card-title
        v-if="$auth.profile"
        class="d-flex flex-row mb-2 pa-2 font-weight-bold"
      >
        <v-avatar class="mr-4" :color="$auth.profile.color" size="48">
          <v-icon size="36"> {{ $auth.profile.avatar }}</v-icon>
          <!-- <v-img v-if="$auth.getAvatar" :src="$auth.getAvatar" /> -->
        </v-avatar>

        {{ $auth.profile.username }}
      </v-card-title>

      <v-divider />

      <v-list class="pb-0" color="black">
        <template v-for="(item, index) in menuItems">
          <!-- <v-divider
            v-if="listIndex !== 0"
            :key="`divider-${listIndex}`"
            class="my-2"
          /> -->

          <v-list-item
            :key="`menu-item-${index}`"
            class="px-0"
            dense
            @click="item.action()"
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

        <!-- <v-divider class="my-2" />

        <v-list-item class="px-0" dense @click="$auth.logout()">
          <v-list-item-icon class="mx-4">
            <v-icon dense> mdi-logout </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-2"> Sign Out </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
const { $auth: auth, $dialog } = useNuxtApp()

const menuItems: { title: string; icon: string; action: () => void }[] = [
  // [
  {
    title: 'Update profile',
    icon: 'mdi-pencil',
    action: () =>
      $dialog({
        attributes: {
          persistent: true,
        },
        title: 'Profile Update',
        message: 'Update your profile here',
      }),
  },
  {
    title: 'Logout',
    icon: 'mdi-logout',
    action: auth.logout,
  },
  //   {
  //     title: 'My Library',
  //     icon: 'mdi-book-open-variant',
  //     route: 'library',
  //   },
  // ],
  // [
  //   {
  //     title: 'Help',
  //     icon: 'mdi-help-circle',
  //     route: 'help',
  //   },
  //   {
  //     title: 'Settings',
  //     icon: 'mdi-cog',
  //     route: 'settings',
  //   },
  // ],
]
</script>
