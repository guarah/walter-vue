import {
  SET_MY_MEDIAS,
  SET_MY_MEDIAS_LOADING,
  SET_REWATCH_MEDIAS,
  ADD_TO_LIST,
  ADD_TO_LIST_LOADING,
  REMOVE_FROM_LIST,
  SELECT_MEDIA,
  UNSELECT_MEDIA,
  SET_WATCHED,
  UNSET_WATCHED,
  SET_WATCHED_LOADING
} from './../../mutation-types'
import * as mediaService from './mediaService'
import firebase from 'firebase'
import Vue from 'vue'

const state = {
  myMedias: [],
  myMediasLoading: false,
  addToListLoading: false,
  setWatchedLoading: false,
  rewatchMedias: [],
  selectedMedia: null
}

const mutations = {
  [SET_MY_MEDIAS] (state, medias) {
    state.myMedias = medias
  },

  [SET_MY_MEDIAS_LOADING] (state, value) {
    state.myMediasLoading = value
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

  [ADD_TO_LIST_LOADING] (state, value) {
    state.addToListLoading = value
  },

  [SET_WATCHED_LOADING] (state, value) {
    state.setWatchedLoading = value
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
    const _media = state.myMedias.find(x => x.id === media.id)
    if (_media) {
      if (_media.hasOwnProperty('watched')) {
        _media.watched = true
        state.myMedias.splice(state.myMedias.indexOf(_media), 1, _media)
      } else {
        Vue.set(_media, 'watched', true)
        state.myMedias.splice(state.myMedias.indexOf(_media), 1, media)
      }
    }
  },

  [UNSET_WATCHED] (state, media) {
    const _media = state.myMedias.find(x => x.id === media.id)
    if (_media) {
      if (_media.hasOwnProperty('watched')) {
        _media.watched = false
        state.myMedias.splice(state.myMedias.indexOf(_media), 1, media)
      }
      Vue.set(_media, 'watched', false)
      state.myMedias.splice(state.myMedias.indexOf(_media), 1, media)
    }
  }
}

const actions = {
  listMyMedias: ({commit, dispatch}, medias) => {
    commit(SET_MY_MEDIAS_LOADING, true)
    const user = firebase.auth().currentUser
    if (user) {
      user.getIdToken()
        .then((token) => {
          user.token = token
          dispatch('user/setUser', user, {root: true})
          mediaService.getMyMedias(user)
            .then(response => {
              if (response.statusText === 'OK') {
                let myMedias = []
                for (var i in response.data) {
                  myMedias.push(response.data[i])
                }
                commit(SET_MY_MEDIAS_LOADING, false)
                commit(SET_MY_MEDIAS, myMedias)
                dispatch('media/search/defineSuggestions', null, {root: true})
              }
            })
            .catch(error => {
              alert(error)
              console.log('Error', error)
            })
        })
        .catch(err => console.log(err))
    }
  },

  setRewatchMedias: () => {},

  addToList: ({commit, getters, rootGetters}, media) => {
    commit(ADD_TO_LIST_LOADING, true)
    media.added = true
    const user = rootGetters['user/user']
    if (user) {
      mediaService.addToList(user, media)
        .then(response => {
          commit(ADD_TO_LIST_LOADING, false)
          if (response.statusText === 'OK') commit(ADD_TO_LIST, media)
        })
        .catch(error => {
          console.log('Error', error)
          alert('error')
        })
    }
  },

  removeFromList: ({commit, getters, rootGetters}, media) => {
    commit(ADD_TO_LIST_LOADING, true)
    const user = rootGetters['user/user']
    if (user) {
      mediaService.removeFromList(user, media)
        .then(response => {
          commit(ADD_TO_LIST_LOADING, false)
          if (response.statusText === 'OK') commit('REMOVE_FROM_LIST', media)
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

  setWatched: ({commit, rootGetters}, media) => {
    commit(SET_WATCHED_LOADING, true)
    const user = rootGetters['user/user']
    if (user) {
      mediaService.setWatched(user, media)
        .then(response => {
          commit(SET_WATCHED_LOADING, false)
          if (response.statusText === 'OK') commit(SET_WATCHED, media)
        })
        .catch(error => {
          commit(SET_WATCHED_LOADING, false)
          console.log('Error', error)
          alert('error')
        })
    }
  },
  unSetWatched: ({commit, rootGetters}, media) => {
    commit(SET_WATCHED_LOADING, true)
    const user = rootGetters['user/user']
    if (user) {
      mediaService.unSetWatched(user, media)
        .then(response => {
          commit(SET_WATCHED_LOADING, false)
          if (response.statusText === 'OK') commit(UNSET_WATCHED, media)
        })
        .catch(error => {
          commit(SET_WATCHED_LOADING, false)
          console.log('Error', error)
          alert('error')
        })
    }
  }
}

const getters = {
  myMedias: state => state.myMedias,

  myMediasLoading: state => state.myMediasLoading,

  addToListLoading: state => state.addToListLoading,

  setWatchedLoading: state => state.setWatchedLoading,

  rewatchMedias: state => state.rewatchMedias,

  selectedMedia: state => state.selectedMedia
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
