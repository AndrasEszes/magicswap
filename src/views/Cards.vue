<template>
  <div>
    <form @submit.prevent="createCard({ name: card })">
      <input v-model="card" type="text" />
      <button type="submit">Mentés</button>
    </form>
    <hr />
    <div v-for="(card, cardId) in cards" :key="cardId">
      <button class="button" @click="deleteCard(cardId)">"{{card.name}}" kártya eltávolítása...</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { watchCards, ICards, deleteCard, ICard, createCard } from '@/firestore/cards'

@Component
export default class Cards extends Vue {
  public cards: ICards = {}
  public card: string = ''

  private unsubscribeFromCards!: () => void

  public mounted() {
    this.unsubscribeFromCards = watchCards((cards) => { this.cards = cards })
  }

  public beforeDestroy() {
    this.unsubscribeFromCards()
  }

  public deleteCard(cardId: string) {
    deleteCard(cardId)
  }

  public createCard(card: ICard) {
    createCard(card)
    this.card = ''
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  margin-bottom: 5px;
}
</style>
