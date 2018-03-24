import {
  SET_MY_MEDIAS,
  SET_REWATCH_MEDIAS,
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  SELECT_MEDIA,
  UNSELECT_MEDIA,
  SET_WATCHED,
  UNSET_WATCHED
} from './../../mutation-types'
import * as mediaService from './mediaService'

const state = {
  myMedias: [],
  rewatchMedias: [],
  selectedMedia: null
}

const mutations = {
  [SET_MY_MEDIAS] (state, medias) {
    state.myMedias = medias
  },

  [SET_REWATCH_MEDIAS] (state, medias) {
    state.rewatchMedias = medias
  },

  [ADD_TO_LIST] (state, media) {
    const stored = state.myMedias.find(x => x.id === media.id)
    if (!stored) {
      state.myMedias.unshift(media)
    }
  },

  [REMOVE_FROM_LIST] (state, media) {
    const _media = state.myMedias.find(x => x.id === media.id)
    if (_media) {
      media.added = false
      state.myMedias.splice(state.myMedias.indexOf(_media), 1)
    }
  },

  [SELECT_MEDIA] (state, media) {
    state.selectedMedia = media
  },

  [UNSELECT_MEDIA] (state) {
    state.selectedMedia = null
  },

  [SET_WATCHED] (state, media) {
  },

  [UNSET_WATCHED] (state, media) {
  }
}

const actions = {
  listMyMedias: ({commit}, medias) => {
    commit(SET_MY_MEDIAS, medias)
  },

  setRewatchMedias: () => {},

  addToList: ({commit, getters}, media) => {
    media.added = true
    const user = getters.user
    if (user) {
      mediaService.addToList(user, media)
        .then(response => {
          if (response.ok) commit(ADD_TO_LIST, media)
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

  selectMedia: ({commit}, media) => {
    commit(SELECT_MEDIA, media)
  },
  unSelectMedia: ({commit}) => {
    commit(UNSELECT_MEDIA)
  },

  setWatched: ({commit}, media) => {
    commit(SET_WATCHED, media)
  },
  unSetWatched: ({commit}, media) => {
    commit(UNSET_WATCHED, media)
  }
}

const getters = {
  myMedias: state => {
    return state.myMedias
  },

  rewatchMedias: state => {
    return state.rewatchMedias
  },

  selectedMedia: state => state.selectedMedia
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
