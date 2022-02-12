<template>
  <div class="d-flex flex-column">
    <div class="subtitle-1">Strategies</div>

    <!-- <v-card outlined> -->
    <v-card
      v-if="isEmpty"
      class="d-flex justify-center align-center"
      style="background-color: #121212"
      height="60vh"
      outlined
    >
      <div class="error--text">You dont have any strategies yet!</div>
    </v-card>

    <v-card
      v-else-if="directory.isLoading"
      style="background-color: #121212"
      outlined
    >
      <v-list
        class="pa-0"
        color="transparent"
        style="
          background-color: #121212;
          border-top-left-radius: 4px !important;
          border-top-right-radius: 4px !important;
        "
      >
        <template v-for="(number, index) in 3">
          <v-divider
            v-if="index !== 0"
            :key="`folder-loader-divider-${index}`"
          />

          <v-list-item :key="`folder-loader-${index}`">
            <v-list-item-icon class="mr-4">
              <v-icon disabled> mdi-folder-outline </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <v-skeleton-loader class="mb-0" type="text" width="30%" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <v-list
        class="pa-0"
        color="transparent"
        style="
          border-top: 0px;
          border-bottom-left-radius: 4px !important;
          border-bottom-right-radius: 4px !important;
        "
        two-line
      >
        <template v-for="(number, index) in 7">
          <v-divider :key="`strategy-loader-divider-${index}`" />

          <v-list-item :key="`strategy-loader-${number}`">
            <v-skeleton-loader
              class="mr-4 my-2"
              type="image"
              height="60"
              width="106"
            />

            <v-list-item-content>
              <v-list-item-title>
                <v-skeleton-loader type="list-item-two-line" width="30%" />
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <v-card v-else style="background-color: #121212" outlined>
      <v-list
        v-if="directory.getList.folders.length > 0"
        class="pa-0"
        color="transparent"
        style="
          border-top-left-radius: 4px !important;
          border-top-right-radius: 4px !important;
        "
      >
        <template v-for="(folder, index) in directory.getList.folders">
          <v-divider v-if="index !== 0" :key="`folder-divider-${index}`" />

          <v-list-item
            :key="`folder-${index}`"
            :class="index === 0 ? 'rounded-select' : ''"
            @dblclick="folders.open(folder)"
          >
            <v-list-item-icon class="mr-4">
              <v-icon> mdi-folder-outline </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="strategy-title">
                {{ folder.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>

      <template v-if="directory.getList.strategies.length > 0">
        <v-divider />

        <v-list
          class="pa-0"
          color="transparent"
          style="
            border-top: 0px;
            border-bottom-left-radius: 4px !important;
            border-bottom-right-radius: 4px !important;
          "
          two-line
        >
          <template v-for="(strategy, index) in directory.getList.strategies">
            <v-divider v-if="index !== 0" :key="`strategy-divider-${index}`" />

            <v-list-item :key="`strategy-${index}`">
              <v-avatar class="mr-4 my-4" height="60" width="106" tile>
                <v-img :src="strategy.map.thumbnail" />
              </v-avatar>

              <v-list-item-content class="py-0">
                <v-list-item-title class="strategy-title">
                  {{ strategy.name }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ strategy.map.name }} • Modified on
                  {{ strategy.updated_at }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action> </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </v-card>
    <!-- </v-card> -->
  </div>
</template>

<script setup lang="ts">
import { useDirectory } from '~/stores/directory'
import { useFolders } from '~/stores/folders'

const directory = useDirectory()
const folders = useFolders()

const isEmpty = computed(() => {
  if (directory.isLoading) return false

  return (
    directory.getList.folders.length === 0 &&
    directory.getList.strategies.length === 0
  )
})
</script>

<style scoped>
.strategy-title {
  font-weight: 600;
  font-size: 1.1rem !important;
}

.rounded-select::before {
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
}
</style>
