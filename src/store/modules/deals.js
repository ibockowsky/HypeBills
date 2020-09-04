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
    state.deals = state.deals.filter(deal => deal.id !== id)
  },
  UPDATE_DEAL: (state, deal) => {
    state.deals = state.deals.map(item => {
      if (item.id === deal.id) {
        item = deal
      }
      return item
    })
  }
}

const actions = {
  addDeal: ({ commit, dispatch }, deal) => {
    fb.db
      .collection('deals')
      .add(deal)
      .then(docRef => {
        commit('ADD_DEAL', { ...deal, id: docRef.id })
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
          tempArray.push({ ...doc.data(), id: doc.id })
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
  updateDeal: ({ commit, dispatch }, deal) => {
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
  getDeal: state => id => state.deals.find(item => item.id === id)
}

export { state, mutations, actions, getters }
