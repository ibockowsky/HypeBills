import { ADD_ALERT, REMOVE_ALERT } from '@/store/mutation-types.js'
import { uuid } from 'vue-uuid'

const state = {
  alerts: []
}

const mutations = {
  [ADD_ALERT]: (state, alert) => state.alerts.push({ ...alert, id: uuid.v4() }),
  [REMOVE_ALERT]: (state, alert) =>
    (state.alerts = state.alerts.filter(a => a !== alert))
}

const actions = {
  addAlert: ({ commit }, alert) => {
    commit(ADD_ALERT, alert)
  },
  removeAlert: ({ commit }, alert) => commit(REMOVE_ALERT, alert)
}

const getters = {}
export { state, mutations, actions, getters }
