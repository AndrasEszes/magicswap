<template>
  <v-layout row wrap>
    <v-flex class="pa-2" xs4>
      <advertisement
        :id="`the-first-one`"
        :card="{ name: 'Adanto Vanguard' }"
        :reservePrice="29900"
        :bidStep="299"
        :endOfBid="endOfBid"
        :currentBid="5980"
        :quality="2"
        :description="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nulla massa.`"
        :duedate="new Date('Mon Jun 10 2018 23:36:27')"
        @onBid="handleBid"
        @onReserve="handleReserve"
      ></advertisement>
    </v-flex>
    <v-flex class="pa-2" xs4>
      <advertisement
        :id="`the-second-one`"
        :card="{ name: 'Adanto Vanguard' }"
        :reservePrice="29900"
        :bidStep="299"
        :endOfBid="endOfBid"
        :currentBid="5980"
        :lastBidIsYours="true"
        :quality="5"
        :description="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nulla massa.`"
        :duedate="new Date('Mon Jun 09 2018 22:36:27')"
        @onBid="handleBid"
        @onReserve="handleReserve"
      ></advertisement>
    </v-flex>
    <v-flex class="pa-2" xs4>
      <advertisement
        :id="`the-third-one`"
        :card="{ name: 'Adanto Vanguard' }"
        :reservePrice="29900"
        :quality="4"
        :description="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nulla massa.`"
        :duedate="new Date('Mon Jun 08 2018 22:46:27')"
        @onBid="handleBid"
        @onReserve="handleReserve"
      ></advertisement>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Advertisement from '@/components/Advertisement.vue'

@Component({
  components: {
    Advertisement,
  },
})
export default class Home extends Vue {
  get endOfBid(): Date {
    return new Date(Date.now() + 60 * 60 * 1000)
  }

  public handleBid(id: string, bidStep: number) {
    // tslint:disable-next-line no-console
    console.log(`Someone made a $${bidStep} Bid for the "${id}" Advertisment!`)
  }

  public handleReserve(id: string) {
    // tslint:disable-next-line no-console
    console.log(`Someone bought the "${id}" Advertisment! \\o/`)
  }
}
</script>
