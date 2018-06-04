<template>
  <v-layout v-scroll="handleScroll" fill-height wrap>
    <v-flex v-for="(card, id) in cards" :key="id" class="pa-1" xs12 sm6 md4 lg3>
      <Card></Card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { firestore } from 'firebase/app'
import { Component, Vue } from 'vue-property-decorator'
import { ICards, watchCards, IPagedCards } from '@/firestore/cards'
import Card from '@/components/card.vue'

@Component({
  components: {
    Card,
  },
})
export default class Cards extends Vue {
  public cards: ICards = {}
  public isLoading: boolean = false

  private subscriptions: Array<() => void> = []
  private lastDocumentSnapshot?: firestore.DocumentSnapshot

  public mounted() {
    this.isLoading = true
    this.subscriptions.push(
      watchCards(this.handleOnWatchCards),
    )
  }

  public beforeDestroy() {
    this.subscriptions.forEach((unsubscribe) => unsubscribe())
  }

  public handleScroll(e: Event) {
    if (this.shouldLoadNextPage(500)) {
      this.isLoading = true
      this.subscriptions.push(
        watchCards(this.handleOnWatchCards, undefined, this.lastDocumentSnapshot),
      )
    }
  }

  private handleOnWatchCards(pagedCards: IPagedCards) {
    this.isLoading = false,
    this.cards = { ...this.cards, ...pagedCards.cards }
    this.lastDocumentSnapshot = pagedCards.lastDocumentSnapshot
  }

  private shouldLoadNextPage(triggerHeight: number): boolean {
    if (this.isLoading) { return false }

    const { scrollingElement } = document

    if (scrollingElement) {
      const padding = 64 + 32
      const offsetHeight = this.$el.offsetHeight
      const scrollHeight = scrollingElement.scrollTop
      const windowHeight = scrollingElement.clientHeight - padding

      if (offsetHeight - triggerHeight <= scrollHeight + windowHeight) {
        return true
      }
    }

    return false
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin-bottom: 5px;
}
</style>
