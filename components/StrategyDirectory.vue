<template>
  <div>
    <v-list class="py-0">
      <template v-for="(folder, i) in folders">
        <v-list-item :key="folder.name" class="px-0">
          <v-list-item-icon class="mx-4">
            <v-icon>
              mdi-folder-outline
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="strategy-title">
              {{ folder.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider :key="i" />
      </template>
    </v-list>

    <v-list class="py-0" two-line>
      <template v-for="(item, i) in strategies">
        <v-list-item :key="item.title">
          <v-avatar class="mr-4 my-3" height="60" width="106" tile>
            <v-img :src="item.map.thumbnail" />
          </v-avatar>

          <v-list-item-content class="py-0">
            <v-list-item-title class="strategy-title">
              {{ item.title }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ item.map.name }} • Modified on {{ item.updated_at }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <icon-button icon="mdi-pencil-outline" />
          </v-list-item-action>
        </v-list-item>

        <v-divider v-if="i < strategies.length - 1" :key="i" dark />
      </template>
    </v-list>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const folders = [
      {
        id: 1,
        id_user: 1,
        id_squad: null,
        uuid: 'a9ce9a1f-a391-47b7-b033-97e78e81b304',
        name: 'Folder 1',
        strategies: [
          {
            title: 'Hi',
            id_map: 1,
            updated_at: '2020-12-5',
            map: {
              name: 'BANK',
              thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ilgtuzucX7hEu2MvjhRtp/e399b773b495f9249b42a82006259109/r6-maps-bank.jpg'
            }
          },
          {
            title: 'Hello',
            id_map: 1,
            updated_at: '2020-12-6',
            map: {
              name: 'BORDER',
              thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4hqsrL3cokFqedkfjiEaGf/10bee7874cecf7410b035973f0ed5da2/r6-maps-border.jpg'
            }
          },
        ]
      },
      {
        id: 1,
        id_user: 1,
        id_squad: null,
        uuid: 'ae3da2b9-a31c-4ce7-9101-25cc4cb5968f',
        name: 'Folder 2',
        strategies: [
          {
            title: 'Whats Up',
            id_map: 1,
            updated_at: '2020-12-9',
            map: {
              name: 'CHALET',
              thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Km3ZJUM7ZMVbGsi6gad5Y/c48162371342d9f15386c77a3766315b/r6-maps-chalet.jpg'
            }
          },
        ]
      }
    ]

    const strategies = [
      {
        title: 'Strat 1',
        id_map: 1,
        updated_at: '2020-12-5',
        map: {
          name: 'BANK',
          thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6ilgtuzucX7hEu2MvjhRtp/e399b773b495f9249b42a82006259109/r6-maps-bank.jpg'
        }
      },
      {
        title: 'Strat 2',
        id_map: 1,
        updated_at: '2020-12-6',
        map: {
          name: 'BORDER',
          thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/4hqsrL3cokFqedkfjiEaGf/10bee7874cecf7410b035973f0ed5da2/r6-maps-border.jpg'
        }
      },
      {
        title: 'Strat 3',
        id_map: 1,
        updated_at: '2020-12-9',
        map: {
          name: 'CHALET',
          thumbnail: 'https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/Km3ZJUM7ZMVbGsi6gad5Y/c48162371342d9f15386c77a3766315b/r6-maps-chalet.jpg'
        }
      },
    ]

    return {
      folders,
      strategies,
    }
  },
})
</script>
