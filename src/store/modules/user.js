const state = {
  user: null
}

const mutations = {
  'SET_USER' (state, user) {
    state.user = user
  },
  'UNSET_USER' (state) {
    state.user = null
  }
}

const actions = {
  setUser: ({commit}, user) => {
    commit('SET_USER', user)
  },
  unsetUser: ({commit}) => {
    commit('UNSET_USER')
  }
}

const getters = {
  user: state => {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
