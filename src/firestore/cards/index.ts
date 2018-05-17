import firebase from 'firebase/app'
import { QuerySnapshot, DocumentSnapshot, Query } from '@firebase/firestore-types'
import 'firebase/firestore'

export interface ICard {
  name: string
}

export interface ICards {
  [cardId: string]: ICard
}

export interface IPagedCards {
  cards: ICards,
  lastDocumentSnapshot?: DocumentSnapshot,
}

export const CARDS_COLLECTION = 'cards'

export const collection = () => firebase.firestore().collection(CARDS_COLLECTION)

function snapshotToPagedCards(snapshot: QuerySnapshot): IPagedCards {
  return snapshot.docs.reduce<IPagedCards>((pagedCards, document) => {
    return {
      // Add new key-value pair to an Object
      cards: { ...pagedCards.cards, [document.id]: document.data() as ICard },
      lastDocumentSnapshot: document,
    }
  }, {cards: {}})
}

function withOffset(query: Query, offset?: DocumentSnapshot): Query {
  return offset ? query.startAfter(offset) : query
}

export function watchCards(
  onUpdateCallback: (pagedCards: IPagedCards) => void,
  onErrorCallback?: (error: Error) => void,
  offset?: DocumentSnapshot,
  limit: number = 100,
) {
  return withOffset(collection().orderBy('name').limit(limit), offset).onSnapshot((snapshot) => {
    onUpdateCallback(snapshotToPagedCards(snapshot))
  }, onErrorCallback)
}

export function fetchCards(
  offset?: DocumentSnapshot,
  limit: number = 100,
): Promise<IPagedCards> {
  return withOffset(collection().orderBy('name').limit(limit), offset).get().then(snapshotToPagedCards)
}

export function deleteCard(cardId: string) {
  return collection().doc(cardId).delete()
}

export function createCard(card: ICard) {
  return collection().add(card)
}
