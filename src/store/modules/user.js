import router from '@/router'
const fb = require('@/services/firebase.js')

export const namespaced = true

const state = {
  currentUser: null,
  currentUserData: null
}
const mutations = {
  SET_USER: (state, user) => (state.currentUser = user),
  SET_USER_DATA: (state, user_data) => (state.currentUserData = user_data),
  CLEAR_USER_DATA: state => (state.currentUser = null)
}
const actions = {
  registerUser: ({ commit, dispatch }, credentials) => {
    fb.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(user => {
        commit('SET_USER', user)
        dispatch(
          'alerts/addAlert',
          { content: 'Registered!', type: 'success' },
          { root: true }
        )
        fb.db
          .collection('users')
          .add({
            name: credentials.username,
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
      .then(user => {
        commit('SET_USER', user)
        dispatch('getUserData', user.user.uid)
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
  getUserData: ({ commit, dispatch }, uid) => {
    if (localStorage.getItem('userData')) {
      commit('SET_USER_DATA', JSON.parse(localStorage.getItem('userData')))
    } else {
      fb.db
        .collection('users')
        .where('uid', '==', uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let tempObject = {
              username: doc.data().name
            }
            commit('SET_USER_DATA', tempObject)
            localStorage.setItem('userData', JSON.stringify(tempObject))
          })
        })
        .catch(err => {
          dispatch(
            'alerts/addAlert',
            { title: 'Error', content: err.message, type: 'error' },
            { root: true }
          )
        })
    }
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
        localStorage.removeItem('userData')
        router.push('/login')
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
  isLoggedIn: state => !!state.currentUser
}

export { state, mutations, actions, getters }
