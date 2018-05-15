import firebase from 'firebase'
import 'firebase/firestore'

import config from '@/config'
import { isProduction } from '@/lib/environment'

export const initialize = () => {
  if (isProduction()) {
    return fetch('/__/firebase/init.json').then((response) => {
      return firebase.initializeApp(response.json())
    })
  } else {
    return Promise.resolve(firebase.initializeApp(config.firebase ? config.firebase : {}))
  }
}
