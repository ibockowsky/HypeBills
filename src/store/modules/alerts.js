import { uuid } from 'vue-uuid'

export const namespaced = true

const state = {
  alerts: []
}

const mutations = {
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  },
  REMOVE_ALERT(state, alert) {
    state.alerts.splice(state.alerts.indexOf(alert), 1)
  }
}

const actions = {
  addAlert({ commit }, alert) {
    alert.id = uuid.v4()
    commit('ADD_ALERT', alert)
  },
  removeAlert({ commit }, alert) {
    commit('REMOVE_ALERT', alert)
  }
}

const getters = {
  getAlerts: state => state.alerts
}
export { state, mutations, actions, getters }
