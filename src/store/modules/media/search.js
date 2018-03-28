import {
  SET_SEARCHED_MEDIAS,
  CLEAR_SEARCHED_MEDIAS,
  DEFINE_SUGGESTIONS,
  SET_SUGGESTIONS_LOADING,
  SET_SEARCHING
} from './../../mutation-types'
import * as mediaService from './mediaService'
const state = {
  searchedMedias: [],
  suggestions: [],
  suggestionsLoading: false,
  searching: false
}

const mutations = {
  [SET_SEARCHED_MEDIAS] (state, medias) {
    state.searchedMedias = medias
  },

  [CLEAR_SEARCHED_MEDIAS] (state) {
    state.searchedMedias = []
  },

  [DEFINE_SUGGESTIONS] (state, suggestions) {
    state.suggestions = suggestions
  },

  [SET_SUGGESTIONS_LOADING] (state, value) {
    state.suggestionsLoading = value
  },

  [SET_SEARCHING] (state, value) {
    state.searching = value
  }
}

const actions = {
  searchMedias ({commit, rootGetters, dispatch}, searchValue) {
    commit(SET_SEARCHING, true)
    mediaService.search(searchValue).then(medias => {
      medias = medias && medias.map(m => {
        m.added = !!rootGetters['media/myMedias'].find(x => x.id === m.id)
        return m
      })
      commit(SET_SEARCHING, false)
      commit(SET_SEARCHED_MEDIAS, medias)
    })
  },

  clearSearchedMedias: ({commit}) => {
    commit(CLEAR_SEARCHED_MEDIAS)
  },

  defineSuggestions ({commit, rootGetters, dispatch}) {
    commit(SET_SUGGESTIONS_LOADING, true)
    mediaService.getSuggestions().then(medias => {
      medias = medias.map(m => {
        m.added = !!rootGetters['media/myMedias'].find(x => x.id === m.id)
        return m
      })
      commit(SET_SUGGESTIONS_LOADING, false)
      commit(DEFINE_SUGGESTIONS, medias)
    })
  }
}

const getters = {
  searchedMedias: (state, getters, rootGetters) => {
    return state.searchedMedias && state.searchedMedias.map((item) => {
      item.added = !!rootGetters.media.myMedias.find(x => x.id === item.id)
      return item
    })
  },

  suggestions: (state, getters, rootGetters) => state.suggestions,

  suggestionsLoading: (state) => state.suggestionsLoading,

  searching: (state) => state.searching
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
