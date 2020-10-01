import { uuid } from 'vue-uuid'
import {
  SET_BILLS,
  ADD_BILL,
  REMOVE_BILL,
  UPDATE_BILL
} from '@/store/mutation-types.js'
import * as _ from 'lodash'

const fb = require('@/services/firebase.js')

export const namespaced = true

const state = {
  bills: []
}

const mutations = {
  [SET_BILLS]: (state, bills) => (state.bills = bills),
  [ADD_BILL]: (state, bill) => {
    state.bills.push(bill)
    state.bills.sort((a, b) => b.date - a.date)
  },
  [REMOVE_BILL]: (state, id) => {
    state.bills = state.bills.filter(bill => bill.id !== id)
  },
  [UPDATE_BILL]: (state, updated_bill) => {
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
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tempArray.push({ ...doc.data(), id: doc.id })
        })
        commit(SET_BILLS, tempArray)
      })
      .catch(err => {
        dispatch(
          'addAlert',
          { title: 'Error', content: err.message, type: 'error' },
          { root: true }
        )
      })
  },
  addBill: ({ commit, dispatch }, bill) => {
    fb.db
      .collection('bills')
      .add(bill)
      .then(docRef => {
        commit(ADD_BILL, { ...bill, id: docRef.id })
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
  removeBill: ({ commit, dispatch }, id) => {
    fb.db
      .collection('bills')
      .doc(id)
      .delete()
      .then(() => {
        commit(REMOVE_BILL, id)
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
  addItemToBill: ({ commit, dispatch }, payload) => {
    const { bill, item } = payload
    const updated_bill = _.cloneDeep(bill)
    updated_bill.items.push({ ...item, id: uuid.v4() })
    fb.db
      .collection('bills')
      .doc(updated_bill.id)
      .set(updated_bill, { merge: true })
      .then(() => {
        commit(UPDATE_BILL, updated_bill)
        dispatch(
          'addAlert',
          { content: 'Item added!', type: 'success' },
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
    commit(SET_BILLS, [])
  }
}

const getters = {}

export { state, mutations, actions, getters }
