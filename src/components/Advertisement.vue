<template>
    <v-card>
      <v-card-text class="pa-2">
        <v-layout>
          <v-flex xs6>
            <img width="100%" src="https://media.wizards.com/2017/xln/en_yIHG7SYDro.png" />
          </v-flex>
          <v-flex class="pl-2" xs6>
            <v-layout fill-height column>
              <v-flex>
                <p class="headline">{{card.name}}</p>
                <span>{{description}}</span>
              </v-flex>
              <v-flex class="text-xs-center">
                <span>Quality:</span>
                <star-rating :rating="quality"></star-rating>
              </v-flex>
              <v-flex class="text-xs-center" v-if="shouldShowBidButton">
                <span>End of Bid:</span>
                <count-down :date="endOfBid"></count-down>
              </v-flex>
              <v-flex class="text-xs-center" v-if="shouldShowBidButton">
                <span>Current price: <strong>{{currentBid}}Ft</strong></span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="emitReserve(id)" block large>
          <v-layout column>
            <v-flex>Buy Now!</v-flex>
            <v-flex class="caption">+ {{reservePrice}}Ft</v-flex>
          </v-layout>
        </v-btn>
        <v-btn v-if="shouldShowBidButton" @click="emitBid(id, bidStep)" :disabled="lastBidIsYours" block large>
          <v-layout column>
            <v-flex>{{bidButtonLabel}}</v-flex>
            <v-flex v-if="!lastBidIsYours" class="caption">+ {{bidStep}}Ft</v-flex>
          </v-layout>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import { ICard } from '@/firestore/cards'

import StarRating from '@/components/StarRating.vue'
import CountDown from '@/components/CountDown.vue'

@Component({
  components: {
    StarRating,
    CountDown,
  },
})
export default class Advertisement extends Vue {
  @Prop({ required: true })
  public id!: string

  @Prop({ required: true })
  public card!: ICard

  @Prop()
  public bidStep?: number

  @Prop({ required: true, validator: (value) => value > 0 && value <= 5 })
  public quality!: number

  @Prop({ validator: (value) => !value || value > new Date() })
  public endOfBid?: Date

  @Prop({ default: 0, validator: (value) => !value || value >= 0 })
  public currentBid?: number

  @Prop({ required: true, validator: (value) => value.length <= 160 })
  public description!: string

  @Prop({ required: true, validator: (value) => value > 0 })
  public reservePrice!: number

  @Prop()
  public lastBidIsYours!: boolean

  @Emit('onBid')
  public emitBid(id: string, bidStep: number): void {
    // noop
  }

  @Emit('onReserve')
  public emitReserve(id: string) {
    // noop
  }

  get shouldShowBidButton(): boolean {
    return !!this.bidStep && this.bidStep > 0
  }

  get bidButtonLabel(): string {
    return this.lastBidIsYours ? 'My bid is winning!' : 'Bid'
  }
}
</script>

