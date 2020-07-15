import router from '@/router'
const fb = require('@/services/firebase.js')

export const namespaced = true

const state = {
  currentUser: null,
  currentUserData: null
}
const mutations = {
  SET_USER(state, user) {
    state.currentUser = user
  },
  SET_USER_DATA(state, user_data) {
    state.currentUserData = user_data
  },
  CLEAR_USER_DATA(state) {
    state.currentUser = null
  }
}
const actions = {
  registerUser({ commit, dispatch }, credentials) {
    fb.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        commit('SET_USER', user)
        fb.db
          .collection('users')
          .add({
            name: credentials.username,
            uid: user.user.uid
          })
          .then(docRef => {
            commit('SET_USER_DATA', {
              name: docRef.username
            })
          })
          .catch(err => {
            dispatch('alerts/addError', err, { root: true })
          })
        router.push('/')
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  },
  loginUser({ commit, dispatch }, credentials) {
    fb.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        commit('SET_USER', user)
        dispatch('getUserData', user.user.uid)
        router.push('/')
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  },
  getUserData({ commit }, uid) {
    fb.db
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          commit('SET_USER_DATA', {
            username: doc.data().name
          })
        })
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  },
  logoutUser({ commit }) {
    fb.auth
      .signOut()
      .then(() => {
        commit('CLEAR_USER_DATA')
        router.push('/login')
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  }
}
const getters = {
  getUserId(state) {
    return state.currentUser.uid
  },
  isLoggedIn(state) {
    return !!state.currentUser
  }
}

export { state, mutations, actions, getters }
