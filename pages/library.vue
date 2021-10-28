<template>
  <div>
    <h2>Library</h2>

    <v-row dense>
      <v-col cols="12">
        <div class="subtitle-1">Recently Modified</div>
      </v-col>

      <v-col v-for="item in strategies" :key="item.title" cols="4">
        <strategy-card :item="item" />
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <v-row dense>
      <v-col cols="12">
        <div class="subtitle-1">Strategies</div>
      </v-col>

      <v-col cols="12">
        <strategy-directory />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
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
      strategies,
    }
  },
})
</script>
