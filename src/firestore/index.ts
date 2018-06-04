import firebase from 'firebase/app'
import 'firebase/firestore'

import config from '@/config'
import { isProduction } from '@/lib/environment'

async function loadConfigImplicite() {
  const response = await fetch('/__/firebase/init.json')
  const options = await response.json()

  return options
}

async function loadConfigExplicite() {
  const options = config.firebase || {}

  return options
}

export async function initialize() {
  const options = isProduction()
    ? await loadConfigImplicite()
    : await loadConfigExplicite()

  return firebase.initializeApp(options)
}
