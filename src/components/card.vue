<template>
    <v-card>
        <v-card-media src="assets/lol.jpg" height="200px">
        </v-card-media>
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{ card.name }}</h3>
                </div>
            </v-card-title>
            <v-card-text>{{ description }}</v-card-text>
        <v-card-actions>
            <v-btn @click="reserve" block color="orange">Buy Now!</v-btn>
            <v-btn @click="bid" v-if="bidStep > 0" block color="orange">Bid!</v-btn>
            <v-btn v-if="lastBidIsYours && bidStep == 0" block color="gray" disabled="true">last bid is yours!</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ICard } from '@/firestore/cards'

@Component
export default class Card extends Vue {
  @Prop({
    validator: (value) => value.length <= 160,
  })
  public description?: string

  public id!: string
  public card!: ICard

  @Prop({
    validator: (value) => value > 0 && value <= 5,
  })
  public quality?: number

  public reservePrice?: number
  public currentBid: number = 0
  public bidStep?: number

  @Prop({
    validator: (value) => value === 0 && value > Date.now,
  })
  public endOfBid?: Date
  public lastBidIsYours?: boolean

  public bid(id: string, bidStep: number): void {
    this.currentBid += bidStep
  }

  public reserve(id: string) {
      return 'Hello'
  }
}
</script>