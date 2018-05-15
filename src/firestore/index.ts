import firebase from 'firebase'
import 'firebase/firestore'

export const initialize = () => {
  return fetch('/__/firebase/init.json').then((response) => {
    firebase.initializeApp(response.json())
  })
}
