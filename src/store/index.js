import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store/index.js'
import * as user from '@/store/modules/user.js'

const fb = require('@/services/firebase.js')

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('user/SET_USER', user)
    store.dispatch('user/getUserData', user.uid)
  }
})
