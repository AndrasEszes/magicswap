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
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { ICard } from '@/firestore/cards'

@Component
export default class Advertisment extends Vue {
  @Prop({
    required: true,
  })
  public id!: string

  @Prop({
    required: true,
  })
  public card!: ICard

  @Prop()
  public bidStep?: number

  @Prop({
    required: true,
    validator(value) {
      return value > 0 && value <= 5
    },
  })
  public quality!: number

  @Prop({
    validator(value) {
      // If value isn't empty, then it's value must be greater than Now!
      return !value || value > new Date()
    },
  })
  public endOfBid?: Date

  @Prop({
    validator(value) {
      // If value isn't empty, then it's value must be greater than 0!
      return !value || value >= 0
    },
  })
  public currentBid?: number

  @Prop({
    required: true,
    validator(value) {
      return value.length <= 160
    },
  })
  public description!: string

  @Prop({
    required: true,
    validator(value) {
      // It wasn't in the issue, but it's clear why it's important
      return value > 0
    },
  })
  public reservePrice!: number

  @Prop()
  public lastBidIsYours!: boolean

  @Emit('onBid')
  public emitBid(id: string, bidStep: number): void {
    // noop
  }

  @Emit('onReserve')
  public reserve(id: string) {
    // noop
  }
}
</script>
