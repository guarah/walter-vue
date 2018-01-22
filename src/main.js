import Vue from 'vue'
import router from './router'
import firebase from 'firebase'
import store from './store/store'
import { firebaseConfig } from './constants.js'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'

// Components
import App from './App'
import Auth from './auth/Auth.vue'

Vue.use(VueResource)
Vue.use(Vuetify)

import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.http.options.root = firebaseConfig.databaseURL

// Initialize Firebase
let app
export const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App, Auth }
    })
  }
})
