import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      disabledForLogged: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      disabledForLogged: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const disabledForLogged = to.matched.some(x => x.meta.disabledForLogged)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else if (disabledForLogged && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
