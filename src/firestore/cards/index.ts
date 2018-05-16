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
  return collection().limit(100).onSnapshot((snapshot) => {
    const cards: ICards = {}
    snapshot.docs.forEach((document) => {
      cards[document.id] = document.data() as ICard
    })
    onUpdateCallback(cards)
  }, onErrorCallback)
}

export const fetchCards = async (
  startAfter?: firebase.firestore.DocumentSnapshot,
  limit: number = 100,
) => {
  const query = collection().orderBy('name', 'asc').limit(limit)
  const snapshot = startAfter ? await query.startAfter(startAfter).get() : await query.get()

  const output: {
    cards: ICards,
    lastDocumentSnapshot?: firebase.firestore.DocumentSnapshot,
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
