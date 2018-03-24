import Vue from 'vue'
import Vuex from 'vuex'
import media from './modules/media/media'
import search from './modules/media/search'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    media,
    'media/search': search,
    user
  }
})
