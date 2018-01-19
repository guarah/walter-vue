import { medias } from '../../mock/mock'
const state = {
  allMedias: [],
  addedMedias: []
}

const mutations = {
  'ADD_TO_LIST' (state, media) {
    const _media = state.allMedias.find(x => x.id === media.id)
    if (_media) {
      _media.added = true
      state.addedMedias.push(_media)
    }
  },
  'REMOVE_FROM_LIST' (state, media) {
    const _media = state.allMedias.find(x => x.id === media.id)
    if (_media) {
      _media.added = false
      state.addedMedias.splice(state.addedMedias.indexOf(_media))
    }
  },
  'SET_WATCHED' (state, media) {

  },
  'UNSET_WATCHED' (state, media) {

  },
  'SET_ALL_MEDIAS' (state, medias) {
    state.allMedias = medias
  }
}

const actions = {
  setWatched: ({commit}, media) => {
    commit('SET_WATCHED', media)
  },
  unSetWatched: ({commit}, media) => {
    commit('UNSET_WATCHED', media)
  },
  addToList: ({commit}, media) => {
    commit('ADD_TO_LIST', media)
  },
  removeFromList: ({commit}, media) => {
    commit('REMOVE_FROM_LIST', media)
  },
  // temp
  listAllMedias: ({commit}) => {
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
