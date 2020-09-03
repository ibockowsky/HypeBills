const fb = require('@/services/firebase.js')
export const namespaced = true

const state = {
  deals: []
}

const mutations = {
  ADD_DEALS: (state, deals) => (state.deals = deals),
  ADD_DEAL: (state, deal) => {
    state.deals.push(deal)
    state.deals.sort((a, b) => b.date - a.date)
  },
  REMOVE_DEAL: (state, id) => {
    const index = state.deals.findIndex(item => item.id == id)
    if (index >= 0) {
      state.deals.splice(index, 1)
    }
  },
  UPDATE_DEAL: (state, deal) => {
    const index = state.deals.findIndex(item => item.id == deal.id)
    state.deals.splice(index, 1, deal)
  }
}

const actions = {
  addDeal: ({ commit, dispatch, rootGetters }, deal) => {
    const uid = rootGetters['user/getUserId']
    deal = { ...deal, ...{ uid: uid } }
    fb.db
      .collection('deals')
      .add(deal)
      .then(docRef => {
        deal = { ...deal, ...{ id: docRef.id } }
        commit('ADD_DEAL', deal)
        dispatch(
          'alerts/addAlert',
          { content: 'Added!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  getDeals: ({ commit, dispatch, rootGetters }) => {
    let tempArray = []
    const uid = rootGetters['user/getUserId']
    fb.db
      .collection('deals')
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {
            title,
            size,
            retail,
            payout,
            currency,
            date,
            where,
            status
          } = doc.data()
          let tempObject = {
            id: doc.id,
            title,
            size,
            retail,
            payout,
            currency,
            date: date.toDate(),
            where,
            status
          }
          tempArray.push(tempObject)
        })
        commit('ADD_DEALS', tempArray)
      })
      .catch(err => {
        dispatch('alerts/addError', err, { root: true })
      })
  },
  removeDeal: ({ commit, dispatch }, id) => {
    fb.db
      .collection('deals')
      .doc(id)
      .delete()
      .then(() => {
        commit('REMOVE_DEAL', id)
        dispatch(
          'alerts/addAlert',
          { content: 'Removed!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  editDeal: ({ commit, dispatch }, deal) => {
    fb.db
      .collection('deals')
      .doc(deal.id)
      .set(deal, { merge: true })
      .then(() => {
        commit('UPDATE_DEAL', deal)
        dispatch(
          'alerts/addAlert',
          { content: 'Edited!', type: 'success' },
          { root: true }
        )
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
  getDeal: state => id => state.deals.filter(item => item.id === id)[0]
}

export { state, mutations, actions, getters }
