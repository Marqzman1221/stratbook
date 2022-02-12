<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="8" md="9">
      <!-- <strategy-recents /> -->

      <strategy-directory />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDirectory } from '~/stores/directory'
import { useFolders } from '~/stores/folders'

const directory = useDirectory()
const folders = useFolders()

onMounted(() => {
  folders.buildBreadcrumbs()
  directory.fetch()
})
</script>
