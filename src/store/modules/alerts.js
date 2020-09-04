import { uuid } from 'vue-uuid'

export const namespaced = true

const state = {
  alerts: []
}

const mutations = {
  ADD_ALERT: (state, alert) => state.alerts.push(alert),
  REMOVE_ALERT: (state, alert) =>
    (state.alerts = state.alerts.filter(a => a !== alert))
}

const actions = {
  addAlert: ({ commit }, alert) => {
    commit('ADD_ALERT', { ...alert, id: uuid.v4() })
  },
  removeAlert: ({ commit }, alert) => commit('REMOVE_ALERT', alert)
}

const getters = {}
export { state, mutations, actions, getters }
