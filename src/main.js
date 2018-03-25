import Vue from 'vue'
import router from './router'
import firebase from 'firebase'
import store from './store/store'
import { firebaseConfig } from './lib/constants'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// Components
import App from './App'
import Auth from './auth/Auth.vue'

Vue.use(Vuetify)

Vue.mixin({
  methods: {
    go (where, params) {
      this.$router.push({name: where, params: params})
    }
  }
})

let app
firebase.initializeApp(firebaseConfig)
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
