<template>
  <v-row justify="center" align="center">
    <v-col cols="12" lg="8" md="9">
      <strategy-directory />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDirectory } from '~/stores/directory'
import { useFolders } from '~/stores/folders'

const route = useRoute()

const directory = useDirectory()
const folders = useFolders()

onMounted(() => {
  const id = route.params.uuid

  if (folders.getList.length === 0) folders.buildBreadcrumbs(id)
  directory.fetch(id)
})
</script>
