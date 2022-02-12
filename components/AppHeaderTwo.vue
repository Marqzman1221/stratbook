<template>
  <v-app-bar color="#121212" app dark outlined flat>
    <!-- <v-toolbar-title class="font-weight-bold">
      {{ pageName }}
    </v-toolbar-title> -->
    <v-breadcrumbs class="px-0" :items="breadcrumbs" dark>
      <template v-for="(item, index) in breadcrumbs">
        <li
          v-if="index !== 0"
          :key="`breadcrumb-divider-${index}`"
          class="v-breadcrumbs__divider"
        >
          /
        </li>

        <v-breadcrumbs-item>
          <v-chip
            :key="`breadcrumb-${index}`"
            active-class="transparent"
            exact-active-class="transparent"
            color="transparent"
            :disabled="index === breadcrumbs.length - 1"
            label
            exact
            nuxt
            @click="
              folders.select(
                index - 1,
                index > 0 ? item.route.params.uuid : undefined
              )
            "
          >
            <span class="title"> {{ item.name }} </span>
          </v-chip>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>

    <v-spacer />

    <div>
      <v-btn
        class="mr-2"
        style="border-radius: 4px"
        height="36"
        width="36"
        tile
        icon
        @click="
          $dialog({
            title: 'New Folder',
            component: 'create-folder-dialog',
            attributes: {
              persistent: false,
            },
            pendingMessage: 'Creating folder...',
          })
        "
      >
        <v-icon>mdi-folder-plus-outline</v-icon>
      </v-btn>

      <v-btn
        style="border-radius: 4px"
        height="36"
        width="36"
        tile
        icon
        @click="
          $dialog({
            title: 'New Strategy',
            component: 'create-strategy-dialog',
            attributes: {
              persistent: false,
            },
            pendingMessage: 'Creating strategy...',
          })
        "
      >
        <v-icon>mdi-note-plus</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { reactive, computed, useRoute } from '#imports'
import { useFolders } from '~/stores/folders'

const route = useRoute()

const folders = useFolders()

const stores = reactive({
  folders: useFolders(),
})

const breadcrumbs = computed(() => {
  const routeSplit = route.name.split('-')

  console.log(routeSplit)

  const routeSplitCapped = routeSplit.map(
    (word: string) => word[0].toUpperCase() + word.substring(1)
  )

  if (routeSplit.includes('uuid')) {
    const storeName = routeSplit[routeSplit.length - 2]

    const items = []

    items.push({
      name: routeSplitCapped[0],
      route: {
        name: routeSplit[0],
      },
    })

    return items.concat(
      stores[storeName].getList.map((item: any) => ({
        name: item.name,
        route: {
          name: route.name,
          params: { uuid: item.id },
        },
      }))
    )

    // return parsedSplit.map((name: string, index: number) => {
    //   console.log(parsedSplit.slice(0, index + 1).join('-'))

    //   const result = {
    //     name: parsedSplitNames[index],
    //     route: {
    //       name: parsedSplit.slice(0, index + 1).join('-'),
    //     },
    //   }

    //   if (index === parsedSplit.length - 1) {
    //     result.route.params = { uuid: stores[storeName].getItem.id }
    //   }

    //   return result
    // })
  }

  return routeSplit.map((name: string, index: number) => ({
    name: routeSplitCapped[index],
    route: {
      name: routeSplit.slice(0, index + 1).join('-'),
    },
  }))
})
</script>

<style scoped>
/deep/.v-chip--disabled {
  opacity: 1 !important;
  pointer-events: none !important;
  user-select: none !important;
}
</style>

<style>
.active-chip {
  background-color: transparent !important;
}
</style>
