<template>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FilterPanel extends Vue {
  @Prop({ required: true, validator: (value) => value > 0 && value <= 5 })
  public rating!: number

}
</script>

