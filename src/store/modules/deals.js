const fb = require('@/services/firebase.js')
import { calcSumByCondition } from '@/mixins/calcHelper.js'
import {
  A_ADD_ALERT,
  GET_DEALS,
  ADD_DEAL,
  REMOVE_DEAL,
  UPDATE_DEAL,
  SET_DEALS,
  GET_DEAL,
  GET_TOTAL_OUTGOINGS,
  GET_TOTAL_INCOMINGS,
  GET_CURRENT_HOLD,
  GET_PROBABLE_INCOME,
  GET_TOTAL_EARNINGS,
  U_GET_USER_ID,
  U_GET_BASE_CURRENCY
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
  [ADD_DEAL]: ({ commit, dispatch }, deal) => {
    fb.db
      .collection('deals')
      .add(deal)
      .then(docRef => {
        commit(ADD_DEAL, { ...deal, id: docRef.id })
        dispatch(
          A_ADD_ALERT,
          { content: 'Added!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [GET_DEALS]: ({ commit, dispatch, rootGetters }) => {
    let tempArray = []
    const uid = rootGetters[U_GET_USER_ID]
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
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [REMOVE_DEAL]: ({ commit, dispatch }, id) => {
    fb.db
      .collection('deals')
      .doc(id)
      .delete()
      .then(() => {
        commit(REMOVE_DEAL, id)
        dispatch(
          A_ADD_ALERT,
          { content: 'Removed!', type: 'success' },
          { root: true }
        )
      })
      .catch(err => {
        dispatch(
          A_ADD_ALERT,
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  [UPDATE_DEAL]: ({ commit, dispatch }, deal) => {
    fb.db
      .collection('deals')
      .doc(deal.id)
      .set(deal, { merge: true })
      .then(() => {
        commit(UPDATE_DEAL, deal)
        dispatch(
          A_ADD_ALERT,
          { content: 'Edited!', type: 'success' },
          { root: true }
        )
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
  [GET_DEAL]: state => id => state.deals.find(item => item.id === id),
  [GET_TOTAL_OUTGOINGS]: (state, getters, rootState, rootGetters) => {
    const totalOutgoings = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    return totalOutgoings
  },
  [GET_TOTAL_INCOMINGS]: (state, getters, rootState, rootGetters) => {
    const totalIncomings = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    return totalIncomings
  },
  [GET_CURRENT_HOLD]: (state, getters, rootState, rootGetters) => {
    const currentHold = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'on hold',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    const currentTransit = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'in transit',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    return currentHold + currentTransit
  },
  [GET_PROBABLE_INCOME]: (state, getters, rootState, rootGetters) => {
    const probableIncome = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'on hold',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    return probableIncome
  },
  [GET_TOTAL_EARNINGS]: (state, getters, rootState, rootGetters) => {
    const totalSoldPayout = calcSumByCondition({
      array: state.deals,
      to_sum: 'payout',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    const totalSoldRetail = calcSumByCondition({
      array: state.deals,
      to_sum: 'retail',
      to_condition: 'status',
      condition: 'sold',
      currency: rootGetters[U_GET_BASE_CURRENCY],
      currencies: rootState.user.currencies
    })
    return totalSoldPayout - totalSoldRetail
  }
}

export { state, mutations, actions, getters }
