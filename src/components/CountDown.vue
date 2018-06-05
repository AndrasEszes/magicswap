<template>
  <v-layout justify-center>
    <template v-for="(digit, i) in digits">
      <v-flex d-inline :key="`digit-${i}`" :xs1="!fill">
        <v-layout align-center column>
          <v-flex>
            <strong class="title">{{digit.number}}</strong>
          </v-flex>
          <v-flex>
            <span class="caption">{{digit.title}}</span>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex class="text-xs-center" v-if="i < digits.length - 1" :key="`colon-${i}`" :xs1="!fill">
        <span>:</span>
      </v-flex>
    </template>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CountDown extends Vue {
  public now: Date = new Date()

  @Prop()
  public date!: Date

  @Prop()
  public fill!: boolean

  public mounted() {
    setInterval(() => { this.now = new Date() }, 1000)
  }

  public get digits() {
    const duration = this.duration

    return [{
      number: this.formatDigit(duration.days),
      title: 'days',
    }, {
      number: this.formatDigit(duration.hours),
      title: 'hours',
    }, {
      number: this.formatDigit(duration.minutes),
      title: 'mins',
    }, {
      number: this.formatDigit(duration.seconds),
      title: 'secs',
    }]
  }

  private get duration() {
    const now = Math.trunc(+this.now / 1000)
    const due = Math.trunc(+this.date / 1000)

    return {
      days: Math.trunc((due - now) / 60 / 60 / 24),
      hours: Math.trunc((due - now) / 60 / 60) % 24,
      minutes: Math.trunc((due - now) / 60) % 60,
      seconds: (due - now) % 60,
    }
  }

  private formatDigit(digit: number) {
    return digit < 10 ? `0${digit}` : `${digit}`
  }
}
</script>
