import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index.js'
import * as user from '@/store/modules/user.js'
import * as alerts from '@/store/modules/alerts.js'

const fb = require('@/services/firebase.js')

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user, alerts }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('user/SET_USER', user)
    store.dispatch('user/getUserData', user.uid)
  }
})
