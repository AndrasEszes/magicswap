<template>
  <div class="star-container">
    <v-icon v-for="n in 5" :key="n" :color="color(n)">
      {{ icon(n) }}
    </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class StarRating extends Vue {
  @Prop({
    required: true,
    validator(value) {
      return value > 0 && value <= 5
    },
  })
  public qrating!: number

  public color(n: number): string {
    return this.isFilled(n) ? 'amber' : 'grey'
  }

  public icon(n: number): string {
    return this.isFilled(n) ? 'star' : 'star_outline'
  }

  private isFilled(n: number): boolean {
    return n <= this.qrating
  }
}
</script>
<style lang="scss" scoped>
  .star-container {
    width: 120px;
    margin: auto;
  }
</style>

