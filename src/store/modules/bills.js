import { uuid } from 'vue-uuid'
import * as _ from 'lodash'

const fb = require('@/services/firebase.js')

export const namespaced = true

const state = {
  bills: []
}

const mutations = {
  SET_BILLS: (state, bills) => (state.bills = bills),
  ADD_BILL: (state, bill) => {
    state.bills.push(bill)
    state.bills.sort((a, b) => b.date - a.date)
  },
  UPDATE_BILL: (state, updated_bill) => {
    state.bills = state.bills.map(item => {
      if (item.id === updated_bill.id) {
        return updated_bill
      }
      return item
    })
  }
}

const actions = {
  getBills: ({ commit, dispatch, rootGetters }) => {
    let tempArray = []
    const uid = rootGetters['user/getUserId']
    fb.db
      .collection('bills')
      .where('uid', '==', uid)
      .orderBy('date', 'desc')
      .get()
      .then(querySnappshot => {
        querySnappshot.forEach(doc => {
          tempArray.push({ ...doc.data(), id: doc.id })
        })
        commit('SET_BILLS', tempArray)
      })
      .catch(err => {
        dispatch(
          'alerts/addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  addBill({ commit, dispatch }, bill) {
    fb.db
      .collection('bills')
      .add(bill)
      .then(docRef => {
        commit('ADD_BILL', { ...bill, id: docRef.id })
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
  addItemToBill: ({ commit, dispatch }, payload) => {
    const { bill, item } = payload
    const updated_bill = _.cloneDeep(bill)
    updated_bill.items.push({ ...item, id: uuid.v4() })
    fb.db
      .collection('bills')
      .doc(updated_bill.id)
      .set(updated_bill, { merge: true })
      .then(() => {
        commit('UPDATE_BILL', updated_bill)
        dispatch(
          'alerts/addAlert',
          { content: 'Item added!', type: 'success' },
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

const getters = {}

export { state, mutations, actions, getters }
