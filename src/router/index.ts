import Vue from 'vue'
import Router, { NavigationGuard } from 'vue-router'
import firebase from 'firebase'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Cards from '@/views/Cards.vue'

Vue.use(Router)

const guarded: NavigationGuard = (to, from, next) => {
  const isLoggedIn: boolean = true || !!firebase.auth().currentUser

  if (isLoggedIn) {
    next()
  } else {
    next({ name: 'login' })
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/cards',
      name: 'cards',
      component: Cards,
      beforeEnter: guarded,
    },
  ],
})
