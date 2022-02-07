<template>
  <v-row justify="center" align="center">
    <v-card class="pa-4" width="600">
      <v-card-title class="pa-0"> Stratbook </v-card-title>

      <div class="mt-6 mb-2 text-subtitle-1">Log in with</div>

      <template v-for="(item, index) in providers">
        <v-btn
          color="primary"
          :key="`provider-${index}`"
          block
          @click="$auth.login(item.name)"
        >
          <v-icon left>{{ item.icon }}</v-icon>

          {{ item.name }}
        </v-btn>
      </template>
    </v-card>
  </v-row>
</template>

<script setup lang="ts">
const providers = [
  {
    name: 'Google',
    icon: 'mdi-google',
  },
]
</script>

<script lang="ts">
export default {
  layout: 'auth',
  auth: 'guest',
}
</script>
