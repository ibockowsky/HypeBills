const fb = require('@/services/firebase.js')
import { calcSumByCondition } from '@/helpers/calcHelpers.js'
import {
  ADD_DEAL,
  REMOVE_DEAL,
  UPDATE_DEAL,
  SET_DEALS
} from '@/store/mutation-types.js'
export const namespaced = true

const state = {
  deals: []
}

const mutations = {
  [SET_DEALS]: (state, deals) => (state.deals = deals),
  [ADD_DEAL]: (state, deal) => {
    state.deals.push(deal)
    state.deals.sort((a, b) => b.date - a.date)
  },
  [REMOVE_DEAL]: (state, id) => {
    state.deals = state.deals.filter(deal => deal.id !== id)
  },
  [UPDATE_DEAL]: (state, deal) => {
    state.deals = state.deals.map(item => {
      if (item.id === deal.id) {
        return deal
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
        commit(ADD_DEAL, { ...deal, id: docRef.id })
        dispatch(
          'addAlert',
          { content: 'Added!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  addDeals: ({ commit, dispatch }, deals) => {
    let batch = fb.db.batch()
    let dealsIds = []
    deals.forEach(deal => {
      const docRef = fb.db.collection('deals').doc()
      batch.set(docRef, deal)
      dealsIds.push(docRef.id)
    })
    batch
      .commit()
      .then(() => {
        deals.forEach((deal, $index) => {
          commit(ADD_DEAL, { ...deal, id: dealsIds[$index] })
        })
        dispatch(
          'addAlert',
          { content: 'Added many!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'addAlert',
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

        commit(SET_DEALS, tempArray)
      })
      .catch(err => {
        dispatch(
          'addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  removeDeal: ({ commit, dispatch }, id) => {
    fb.db
      .collection('deals')
      .doc(id)
      .delete()
      .then(() => {
        commit(REMOVE_DEAL, id)
        dispatch(
          'addAlert',
          { content: 'Removed!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'addAlert',
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
        commit(UPDATE_DEAL, deal)
        dispatch(
          'addAlert',
          { content: 'Edited!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          'addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  resetOnUserLogout: ({ commit }) => {
    commit(SET_DEALS, [])
  }
}

const getters = {
  getDeal: state => id => state.deals.find(item => item.id === id),
  getTotalOutgoings: (state, getters, rootState, rootGetters) => {
    const totalOutgoings = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    if (typeof totalOutgoings === 'object')
      return totalOutgoings.toFormat('0.00')
  },
  getTotalIncomings: (state, getters, rootState, rootGetters) => {
    const totalIncomings = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    if (typeof totalIncomings === 'object')
      return totalIncomings.toFormat('0.00')
  },
  getCurrentHold: (state, getters, rootState, rootGetters) => {
    const currentHold = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'on hold',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    const currentTransit = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'in transit',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    if (typeof currentHold === 'object' && typeof currentTransit === 'object')
      return currentHold.add(currentTransit).toFormat('0.00')
  },
  getProbableIncome: (state, getters, rootState, rootGetters) => {
    const probableIncome = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'on hold',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    if (typeof probableIncome === 'object')
      return probableIncome.toFormat('0.00')
  },
  getTotalEarnings: (state, getters, rootState, rootGetters) => {
    const totalSoldPayout = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    const totalSoldRetail = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters['user/getBaseCurrency'],
      currencies: rootState.user.currencies
    })
    if (
      typeof totalSoldPayout === 'object' &&
      typeof totalSoldRetail === 'object'
    )
      return totalSoldPayout.subtract(totalSoldRetail)
  }
}

export { state, mutations, actions, getters }
