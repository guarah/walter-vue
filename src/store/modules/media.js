import * as mediaService from '../../app/media/MediaService'
const state = {
  allMedias: [],
  addedMedias: []
}

const mutations = {
  'ADD_TO_LIST' (state, media) {
    const _media = state.allMedias.find(x => x.id === media.id)
    if (_media) {
      state.addedMedias.push(_media)
    }
  },
  'REMOVE_FROM_LIST' (state, media) {
    const _media = state.addedMedias.find(x => x.id === media.id)
    if (_media) {
      media.added = false
      state.addedMedias.splice(state.addedMedias.indexOf(_media), 1)
    }
  },
  'SET_WATCHED' (state, media) {

  },
  'UNSET_WATCHED' (state, media) {

  },
  'SET_ALL_MEDIAS' (state, medias) {
    state.allMedias = medias
  },
  'SET_ADDED_MEDIAS' (state, medias) {
    state.addedMedias = medias
  }
}

const actions = {
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
  listAddedMedias: ({commit}, medias) => {
    commit('SET_ADDED_MEDIAS', medias)
  },
  searchedMedias: ({commit, getters}, searchedMedias) => {
    const medias = searchedMedias.map((item) => {
      const mediaAdded = getters.addedMedias.find(x => x.id === item.id)
      if (mediaAdded) {
        item.added = true
      }
      return item
    })
    commit('SET_ALL_MEDIAS', medias)
  }
}

const getters = {
  allMedias: state => {
    return state.allMedias
  },
  addedMedias: state => {
    // return state.allMedias.filter(x => x.added)
    return state.addedMedias
  },
  addedMovies: state => {
    return state.addedMedias.filter(x => x.media_type === 'movie')
  },
  addedSeries: state => {
    return state.addedMedias.filter(x => x.media_type === 'serie')
  },
  addedOthers: state => {
    return state.addedMedias.filter(x => x.media_type === 'other')
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
