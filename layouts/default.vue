<template>
  <v-app dark>
    <app-notification />

    <app-dialog />

    <app-nav-bar />

    <app-header-two />

    <v-main>
      <v-divider class="mx-4" />

      <Nuxt class="pa-4" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const { $auth } = useNuxtApp()

onMounted(() => {
  document.documentElement.style.setProperty(
    '--current-profile-color',
    $auth.profile.color
  )
})
</script>
