import * as mediaService from '../../app/media/MediaService'
const state = {
  searchedMedias: [],
  suggestions: [],
  myMedias: [],
  rewatchMedias: []
}

const mutations = {
  'DEFINE_SUGGESTIONS' (state, suggestions) {
    state.suggestions = suggestions
  },

  'ADD_TO_LIST' (state, media) {
    const stored = state.myMedias.find(x => x.id === media.id)
    if (!stored) {
      state.myMedias.unshift(media)
    }
  },
  'REMOVE_FROM_LIST' (state, media) {
    const _media = state.myMedias.find(x => x.id === media.id)
    if (_media) {
      media.added = false
      state.myMedias.splice(state.myMedias.indexOf(_media), 1)
    }
  },
  'SET_WATCHED' (state, media) {
  },
  'UNSET_WATCHED' (state, media) {
  },

  'SET_SEARCHED_MEDIAS' (state, medias) {
    state.searchedMedias = medias
  },
  'CLEAR_SEARCHED_MEDIAS' (state) {
    state.searchedMedias = []
  },

  'SET_SUGGESTED_MEDIAS' (state, medias) {
    state.suggestions = medias
  },

  'SET_MY_MEDIAS' (state, medias) {
    state.myMedias = medias
  },

  'SET_REWATCH_MEDIAS' (state, medias) {
    state.rewatchMedias = medias
  }

}

const actions = {
  searchMedias ({commit}, searchValue) {
    mediaService.search(searchValue)
      .then(medias => commit('SET_SEARCHED_MEDIAS', medias))
  },
  clearSearchedMedias: ({commit}) => {
    commit('CLEAR_SEARCHED_MEDIAS')
  },

  defineSuggestions ({commit}) {
    mediaService.getSuggestions()
      .then(medias => commit('DEFINE_SUGGESTIONS', medias))
    // por enquanto vai sugerir só os populares, fazer um random de todas as possibilidades https://www.themoviedb.org/documentation/api/discover
  },

  setWatched: ({commit}, media) => {
    commit('SET_WATCHED', media)
  },
  unSetWatched: ({commit}, media) => {
    commit('UNSET_WATCHED', media)
  },

  addToList: ({commit, getters}, media) => {
    media.added = true
    const user = getters.user
    if (user) {
      mediaService.addToList(user, media)
        .then(response => {
          if (response.ok) commit('ADD_TO_LIST', media)
        })
        .catch(error => {
          console.log('Error', error)
          alert('error')
        })
    }
  },
  removeFromList: ({commit, getters}, media) => {
    const user = getters.user
    if (user) {
      mediaService.removeFromList(user, media)
        .then(response => {
          if (response.ok) commit('REMOVE_FROM_LIST', media)
        })
        .catch(error => {
          console.log('Error', error)
          alert('error')
        })
    }
  },

  listMyMedias: ({commit}, medias) => {
    commit('SET_MY_MEDIAS', medias)
  }
}

const getters = {
  searchedMedias: (state, getters) => {
    return state.searchedMedias.map((item) => {
      const mediaAdded = getters.myMedias.find(x => x.id === item.id)
      if (mediaAdded) {
        item.added = true
      }
      return item
    })
  },
  suggestions: (state, getters) => {
    return state.suggestions.map((item) => {
      item.added = !!getters.myMedias.find(x => x.id === item.id)
      return item
    })
  },
  myMedias: state => {
    return state.myMedias
  },
  rewatchMedias: state => {
    return state.rewatchMedias
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
