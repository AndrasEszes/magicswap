<template>
  <div class="ni-countdown">
    <div class="ni-kvs">
      <div class="ni-kv">
        <div class="ni-kv-value">{{ digitals(days()) }}</div>
        <div class="ni-kv-key">
          <template v-if="units === 'short'">D</template>
          <template v-else>Days</template>
        </div>
      </div>
      <div class="ni-kv">
        <div class="ni-kv-value">{{ digitals(hours()) }}</div>
        <div class="ni-kv-key">
          <template v-if="units === 'short'">H</template>
          <template v-else>Hours</template>
        </div>
      </div>
      <div class="ni-kv">
        <div class="ni-kv-value">{{ digitals(minutes()) }}</div>
        <div class="ni-kv-key">
          <template v-if="units === 'short'">M</template>
          <template v-else>Minutes</template>
        </div>
      </div>
      <div class="ni-kv">
        <div class="ni-kv-value">{{ digitals(seconds()) }}</div>
        <div class="ni-kv-key">
          <template v-if="units === 'short'">S</template>
          <template v-else>Seconds</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CountDown extends Vue {

  @Prop()
  public units?: boolean
  @Prop()
  public date!: Date

  public now: number = Math.trunc((new Date()).getTime() / 1000)
  public usableDate: number = Math.trunc(this.date.getTime() / 1000)

  public seconds(): number { return (this.usableDate - this.now) % 60 }
  public minutes(): number { return Math.trunc((this.usableDate - this.now) / 60) % 60 }
  public hours(): number { return Math.trunc((this.usableDate - this.now) / 60 / 60) % 24 }
  public days(): number {  return Math.trunc((this.usableDate - this.now) / 60 / 60 / 24) }


  public mounted() {
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    }, 1000)
  }

  public data() {
    return {now: Math.trunc((new Date()).getTime() / 1000)}
  }

  public digitals(digit: number) {
      if (digit < 10) {
        return 0 + digit
      } else {
        return digit
      }
  }
}
</script>
