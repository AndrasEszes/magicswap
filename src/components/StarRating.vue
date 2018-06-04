<template>
  <div>
    <v-icon v-for="n in 5" :key="n" :color="isFilled(n) ? 'amber' : 'gray'">
      {{ isFilled(n) ? 'star' : 'star_outline' }}
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

  public isFilled(n: number): boolean {
    return n <= this.qrating
  }
}
</script>
