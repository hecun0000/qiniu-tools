const state = {
  autoCopy: false
}

const mutations = {
  TOGGLE_AUTO_COPY (state, data) {
    state.autoCopy = data
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
