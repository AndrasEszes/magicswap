<template>
  <v-layout v-scroll="handleScroll" fill-height wrap>
    <v-flex v-for="(card, id) in cards" :key="id" class="pa-1" xs12 sm6 md4 lg3>
      <v-card>
        <v-card-title>{{card.name}}</v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { firestore } from 'firebase/app'
import { Component, Vue } from 'vue-property-decorator'
import { ICards, fetchCards } from '@/firestore/cards'

@Component
export default class Cards extends Vue {
  public cards: ICards = {}
  public card: string = ''

  private lastDocumentSnapshot?: firestore.DocumentSnapshot

  public async mounted() {
    const { cards, lastDocumentSnapshot } = await fetchCards()
    this.cards = cards
    this.lastDocumentSnapshot = lastDocumentSnapshot
  }

  public async handleScroll(e: Event) {
    const { scrollingElement } = document

    if (scrollingElement) {
      const padding = 64 + 32
      const offsetHeight = this.$el.offsetHeight
      const scrollHeight = scrollingElement.scrollTop
      const windowHeight = scrollingElement.clientHeight - padding

      if (offsetHeight - 500 <= scrollHeight + windowHeight) {
        const { cards, lastDocumentSnapshot } = await fetchCards(this.lastDocumentSnapshot)
        this.cards = { ...this.cards, ...cards }
        this.lastDocumentSnapshot = lastDocumentSnapshot
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin-bottom: 5px;
}
</style>
