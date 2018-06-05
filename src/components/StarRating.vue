<template>
  <div>
    <v-icon v-for="n in 5" :key="n" :color="color(n)">
      {{ icon(n) }}
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StarRating extends Vue {
  @Prop({ required: true, validator: (value) => value > 0 && value <= 5 })
  public rating!: number

  public color(n: number): string {
    return this.isFilled(n) ? 'amber' : 'grey'
  }

  public icon(n: number): string {
    return this.isFilled(n) ? 'star' : 'star_outline'
  }

  private isFilled(n: number): boolean {
    return n <= this.rating
  }
}
</script>

