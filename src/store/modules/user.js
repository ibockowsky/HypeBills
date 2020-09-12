import router from '@/router'
import axios from 'axios'
const fb = require('@/services/firebase.js')

export const namespaced = true

const state = {
  currentUser: null,
  currentUserData: {
    id: 0,
    name: '',
    base_currency: 'PLN'
  },
  currencies: []
}
const mutations = {
  SET_USER: (state, user) => (state.currentUser = user),
  SET_USER_DATA: (state, user_data) => (state.currentUserData = user_data),
  CLEAR_USER_DATA: state => (state.currentUser = null),
  SET_CURRENCIES: (state, currencies) => (state.currencies = currencies),
  CHANGE_CURRENCY: (state, currency) =>
    (state.currentUserData.base_currency = currency)
}
const actions = {
  registerUser: ({ commit, dispatch }, credentials) => {
    fb.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async user => {
        await commit('SET_USER', user)
        await dispatch('getUserData', user.user.uid)
        await dispatch('deals/getDeals', {}, { root: true })
        dispatch(
          'alerts/addAlert',
          { content: 'Registered!', type: 'success' },
          { root: true }
        )
        fb.db
          .collection('users')
          .add({
            name: credentials.username,
            base_currency: 'PLN',
            uid: user.user.uid
          })
          .catch(err => {
            dispatch(
              'alerts/addAlert',
              { title: 'Error', content: err.message, type: 'error' },
              { root: true }
            )
          })
        router.push('/')
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  loginUser: ({ commit, dispatch }, credentials) => {
    fb.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async user => {
        await commit('SET_USER', user)
        await dispatch('getUserData', user.user.uid)
        await dispatch('deals/getDeals', {}, { root: true })
        dispatch(
          'alerts/addAlert',
          { content: 'Logged in!', type: 'success' },
          { root: true }
        )
        router.push('/')
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  getUserData: ({ state, commit, dispatch }) => {
    fb.db
      .collection('users')
      .where('uid', '==', state.currentUser.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const userObject = {
            id: doc.id,
            username: doc.data().name,
            base_currency: doc.data().base_currency
          }
          commit('SET_USER_DATA', userObject)
          dispatch('getCurrencies')
        })
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  logoutUser: ({ commit, dispatch }) => {
    fb.auth
      .signOut()
      .then(() => {
        commit('CLEAR_USER_DATA')
        dispatch(
          'alerts/addAlert',
          { content: 'Logged out!', type: 'success' },
          { root: true }
        )
        router.push('/login')
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  getCurrencies: ({ state, commit, dispatch }) => {
    axios
      .get(
        `https://api.exchangerate.host/latest?base=${state.currentUserData.base_currency}`
      )
      .then(response => {
        commit('SET_CURRENCIES', response.data.rates)
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  changeDefaultCurrency: ({ state, commit, dispatch }, currency) => {
    fb.db
      .collection('users')
      .doc(state.currentUserData.id)
      .set({ base_currency: currency }, { merge: true })
      .then(() => {
        commit('CHANGE_CURRENCY', currency)
        dispatch('getCurrencies')
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  }
}
const getters = {
  getUserId: state => state.currentUser.uid,
  isLoggedIn: state => !!state.currentUser,
  getBaseCurrency: state => state.currentUserData.base_currency
}

export { state, mutations, actions, getters }
