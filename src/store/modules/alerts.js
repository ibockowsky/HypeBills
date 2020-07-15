export const namespaced = true

const state = {
  alerts: []
}

const mutations = {
  ADD_ALERT(state, alert) {
    state.alerts.push(alert)
  }
}

const actions = {
  addAlert({ commit }, alert) {
    commit(alert)
    console.log(alert)
  }
}

export { state, mutations, actions }
