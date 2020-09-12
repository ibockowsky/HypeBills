import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

import Deals from '@/views/Deals.vue'
import EditDealModal from '@/components/EditDealModal.vue'

import Bills from '@/views/Bills.vue'

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
  },
  {
    path: '/deals',
    name: 'Deals',
    component: Deals,
    meta: { requiresAuth: true },
    children: [
      {
        path: ':dealID',
        component: EditDealModal,
        props: true,
        meta: {
          disabledOutside: true
        }
      }
    ]
  },
  {
    path: '/bills',
    name: 'Bills',
    component: Bills,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const disabledForLogged = to.matched.some(x => x.meta.disabledForLogged)
  const disabledOutside = to.matched.some(x => x.meta.disabledOutside)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (disabledOutside) {
    if (from.name === null) {
      next('/')
    } else {
      next()
    }
  } else if (requiresAuth && currentUser) {
    next()
  } else if (disabledForLogged && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
