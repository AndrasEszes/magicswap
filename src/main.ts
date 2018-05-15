import Vue from 'vue'
import dotenv from 'dotenv'

import App from './App.vue'
import router from './router'
import store from './store'

import { initialize as initializeFirebase } from './firestore'

Vue.config.productionTip = false

dotenv.load()

initializeFirebase().then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
})
