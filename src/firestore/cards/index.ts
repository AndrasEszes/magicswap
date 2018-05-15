import firebase from 'firebase'

export interface ICard {
  name: string
}

export interface ICards {
  [cardId: string]: ICard
}

export const CARDS_COLLECTION = 'cards'

export const collection = () => firebase.firestore().collection(CARDS_COLLECTION)

export const watchCards = (
  onUpdateCallback: (cards: ICards) => void,
  onErrorCallback?: (error: Error) => void,
) => {
  return collection().onSnapshot((snapshot) => {
    const cards: ICards = {}
    snapshot.docs.forEach((document) => {
      cards[document.id] = document.data() as ICard
    })
    onUpdateCallback(cards)
  }, onErrorCallback)
}

export const deleteCard = (cardId: string) => {
  return collection().doc(cardId).delete()
}

export const createCard = (card: ICard) => {
  return collection().add(card)
}
