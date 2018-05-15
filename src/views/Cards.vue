<template>
  <span>{{env}}</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Cards extends Vue {
  get env(): string {
    return process.env.NODE_ENV as string
  }
}
</script>
