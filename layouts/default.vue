<template>
  <v-app dark>
    <app-notification />

    <app-dialog />

    <app-nav-bar />

    <v-main>
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
