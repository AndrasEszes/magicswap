<template>
  <ul class="vuejs-countdown">
        <li v-if="days() > 0">
            <p class="digit">{{ digitals(days()) }}</p>
            <p class="text">{{ days() > 1 ? 'days' : 'day' }}</p>
        </li>
        <li>
            <p class="digit">{{ digitals(hours()) }}</p>
            <p class="text">{{ hours() > 1 ? 'hours' : 'hour' }}</p>
        </li>
        <li>
            <p class="digit">{{ digitals(minutes()) }}</p>
            <p class="text">min</p>
        </li>
        <li>
            <p class="digit">{{ digitals(seconds()) }}</p>
            <p class="text">Sec</p>
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CountDown extends Vue {
  @Prop() public date!: Date

  public now: number = Math.trunc(new Date().getTime() / 1000)
  public usableDate: number = Math.trunc(this.date.getTime() / 1000)

  public seconds(): number {
    return (this.usableDate - this.now) % 60
  }
  public minutes(): number {
    return Math.trunc((this.usableDate - this.now) / 60) % 60
  }
  public hours(): number {
    return Math.trunc((this.usableDate - this.now) / 60 / 60) % 24
  }
  public days(): number {
    return Math.trunc((this.usableDate - this.now) / 60 / 60 / 24)
  }

  public mounted() {
    window.setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
    }, 1000)
  }

  public data() {
    return { now: Math.trunc(new Date().getTime() / 1000) }
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
<style lang="scss" scoped>
.vuejs-countdown {
  padding: 0;
  width: 155px;
  margin: auto;
}
.vuejs-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}
.vuejs-countdown li p {
  margin: 0;
}
.vuejs-countdown li:after {
  content: ":";
  position: absolute;
  top: -2px;
  right: -13px;
  font-size: 20px;
}
.vuejs-countdown li:first-of-type {
  margin-left: 0;
}
.vuejs-countdown li:last-of-type {
  margin-right: 0;
}
.vuejs-countdown li:last-of-type:after {
  content: "";
}
.vuejs-countdown .digit {
  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
}
.vuejs-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 10px;
}
</style>
