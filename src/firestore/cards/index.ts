import firebase from 'firebase/app'
import 'firebase/firestore'

type DocumentSnapshot = firebase.firestore.DocumentSnapshot

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

export const fetchCards = async (startAfter?: DocumentSnapshot, limit: number = 100) => {
  const query = collection().orderBy('name', 'asc').limit(limit)
  const snapshot = await (startAfter ? query.startAfter(startAfter) : query).get()

  const output: {
    cards: ICards,
    lastDocumentSnapshot?: DocumentSnapshot,
  } = {
    cards: {},
  }

  snapshot.docs.forEach((document) => {
    output.cards[document.id] = document.data() as ICard
    output.lastDocumentSnapshot = document
  })

  return output
}

export const deleteCard = (cardId: string) => {
  return collection().doc(cardId).delete()
}

export const createCard = (card: ICard) => {
  return collection().add(card)
}
