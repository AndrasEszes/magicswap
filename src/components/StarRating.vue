<template>
<div>
  <span v-for="n in qrating" :key="n"> 
      <v-icon>fas fa-star</v-icon>
  </span>
  <span v-for="m in 5-qrating" :key="m"> 
      <v-icon>far fa-star</v-icon>
  </span>
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
}
</script>
