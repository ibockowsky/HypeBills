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
  GET_PROBABLE_INCOME
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
    const totalOutgoings = calcSumByCondition(
      state.deals,
      'retail',
      null,
      null,
      rootGetters['user/getBaseCurrency'],
      rootState.user.currencies
    )
    return totalOutgoings
  },
  [GET_TOTAL_INCOMINGS]: (state, getters, rootState, rootGetters) => {
    const totalIncomings = calcSumByCondition(
      state.deals,
      'payout',
      'status',
      'sold',
      rootGetters['user/getBaseCurrency'],
      rootState.user.currencies
    )
    return totalIncomings
  },
  [GET_CURRENT_HOLD]: (state, getters, rootState, rootGetters) => {
    const currentHold = calcSumByCondition(
      state.deals,
      'retail',
      'status',
      'on hold',
      rootGetters['user/getBaseCurrency'],
      rootState.user.currencies
    )
    return currentHold
  },
  [GET_PROBABLE_INCOME]: (state, getters, rootState, rootGetters) => {
    const probableIncome = calcSumByCondition(
      state.deals,
      'payout',
      'status',
      'on hold',
      rootGetters['user/getBaseCurrency'],
      rootState.user.currencies
    )
    return probableIncome
  }
}

export { state, mutations, actions, getters }
