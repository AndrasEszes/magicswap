import firebase from 'firebase/app'

import config from '@/config'
import { isProduction } from '@/lib/environment'

export const initialize = () => {
  if (isProduction()) {
    return fetch('/__/firebase/init.json').then((response) => {
      return response.json().then(firebase.initializeApp)
    })
  } else {
    return Promise.resolve(firebase.initializeApp(config.firebase ? config.firebase : {}))
  }
}
