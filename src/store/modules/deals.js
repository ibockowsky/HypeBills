const fb = require('@/services/firebase.js')
export const namespaced = true

const state = {
  deals: []
}

const mutations = {
  ADD_DEALS(state, deals) {
    state.deals = deals
  }
}

const actions = {
  addDeal({ commit, dispatch, rootGetters }) {
    const uid = rootGetters.user.getUserId()
  },
  getDeals({ commit, dispatch, rootGetters }) {
    let tempArray = []
    const uid = rootGetters['user/getUserId']
    fb.db
      .collection('deals')
      .where('uid', '==', uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          let tempObject = {
            id: doc.id,
            title: doc.data().title,
            size: doc.data().size,
            retail: doc.data().retail,
            payout: doc.data().payout,
            currency: doc.data().currency,
            date: doc.data().date.toDate(),
            shop: doc.data().shop,
            sold: doc.data().sold
          }
          tempArray.push(tempObject)
        })
        commit('ADD_DEALS', tempArray)
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  }
}

const getters = {
  getterValue: state => {
    return state.value
  }
}

export { state, mutations, actions, getters }
