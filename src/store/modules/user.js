import router from '@/router'
import axios from 'axios'
import {
  A_ADD_ALERT,
  GET_USER_DATA,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  SET_USER,
  SET_USER_DATA,
  CLEAR_USER_DATA,
  SET_CURRENCIES,
  CHANGE_CURRENCY,
  GET_CURRENCIES,
  CHANGE_DEFAULT_CURRENCY,
  GET_USER_ID,
  IS_LOGGED_IN,
  GET_BASE_CURRENCY,
  D_GET_DEALS
} from '@/store/mutation-types.js'
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
  [SET_USER]: (state, user) => (state.currentUser = user),
  [SET_USER_DATA]: (state, user_data) => (state.currentUserData = user_data),
  [CLEAR_USER_DATA]: state => (state.currentUser = null),
  [SET_CURRENCIES]: (state, currencies) => (state.currencies = currencies),
  [CHANGE_CURRENCY]: (state, currency) =>
    (state.currentUserData.base_currency = currency)
}
const actions = {
  [REGISTER_USER]: ({ commit, dispatch }, credentials) => {
    fb.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async user => {
        await commit(SET_USER, user)
        await dispatch(GET_USER_DATA, user.user.uid)
        await dispatch(D_GET_DEALS, {}, { root: true })
        dispatch(
          A_ADD_ALERT,
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
              A_ADD_ALERT,
              { title: 'Error', content: err.message, type: 'error' },
              { root: true }
            )
          })
        router.push('/')
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [LOGIN_USER]: ({ commit, dispatch }, credentials) => {
    fb.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(async user => {
        await commit(SET_USER, user)
        await dispatch(GET_USER_DATA, user.user.uid)
        await dispatch(D_GET_DEALS, {}, { root: true })
        dispatch(
          A_ADD_ALERT,
          { content: 'Logged in!', type: 'success' },
          { root: true }
        )
        router.push('/')
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [GET_USER_DATA]: ({ state, commit, dispatch }) => {
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
          commit(SET_USER_DATA, userObject)
          dispatch('getCurrencies')
        })
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [LOGOUT_USER]: ({ commit, dispatch }) => {
    fb.auth
      .signOut()
      .then(() => {
        commit(CLEAR_USER_DATA)
        dispatch(
          A_ADD_ALERT,
          { content: 'Logged out!', type: 'success' },
          { root: true }
        )
        router.push('/login')
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [GET_CURRENCIES]: ({ state, commit, dispatch }) => {
    axios
      .get(
        `https://api.exchangerate.host/latest?base=${state.currentUserData.base_currency}`
      )
      .then(response => {
        commit(SET_CURRENCIES, response.data.rates)
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [CHANGE_DEFAULT_CURRENCY]: ({ state, commit, dispatch }, currency) => {
    fb.db
      .collection('users')
      .doc(state.currentUserData.id)
      .set({ base_currency: currency }, { merge: true })
      .then(() => {
        commit(CHANGE_CURRENCY, currency)
        dispatch(GET_CURRENCIES)
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  }
}
const getters = {
  [GET_USER_ID]: state => state.currentUser.uid,
  [IS_LOGGED_IN]: state => !!state.currentUser,
  [GET_BASE_CURRENCY]: state => state.currentUserData.base_currency
}

export { state, mutations, actions, getters }
