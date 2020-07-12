import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user.js'

const fb = require('@/services/firebase.js')

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { user }
})

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('users/SET_USER', user)
  }
})
