import Vue from 'vue'
import Vuex from 'vuex'
import media from './modules/media'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    media,
    user
  }
})