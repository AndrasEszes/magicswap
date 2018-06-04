import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'

import { initialize as initializeFirebase } from './firestore'

Vue.config.productionTip = false

Vue.use(Vuetify)

initializeFirebase().then((firebase) => {
  firebase.firestore().settings({ timestampsInSnapshots: true })
  return firebase.firestore().enablePersistence()
}).then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
})
