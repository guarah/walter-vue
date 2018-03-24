import {
  SET_SEARCHED_MEDIAS,
  CLEAR_SEARCHED_MEDIAS,
  DEFINE_SUGGESTIONS
} from './../../mutation-types'
import * as mediaService from './mediaService'
const state = {
  searchedMedias: [],
  suggestions: []
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
  }
}

const actions = {
  searchMedias ({commit}, searchValue) {
    mediaService.search(searchValue).then(medias => commit(SET_SEARCHED_MEDIAS, medias))
  },

  clearSearchedMedias: ({commit}) => {
    commit(CLEAR_SEARCHED_MEDIAS)
  },

  defineSuggestions ({commit}) {
    mediaService.getSuggestions().then(medias => commit(DEFINE_SUGGESTIONS, medias))
    // por enquanto vai sugerir só os populares, fazer um random de todas as possibilidades https://www.themoviedb.org/documentation/api/discover
  }
}

const getters = {
  searchedMedias: (state, getters, rootGetters) => {
    return state.searchedMedias.map((item) => {
      const mediaAdded = rootGetters.media.myMedias.find(x => x.id === item.id)
      if (mediaAdded) {
        item.added = true
      }
      return item
    })
  },

  suggestions: (state, getters, rootGetters) => {
    return state.suggestions.map((item) => {
      item.added = !!rootGetters.media.myMedias.find(x => x.id === item.id)
      return item
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
