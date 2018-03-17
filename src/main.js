import Vue from 'vue'
import router from './router'
import firebase from 'firebase'
import store from './store/store'
import { firebaseConfig } from './lib/constants'
import VueResource from 'vue-resource'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

// Components
import App from './App'
import Auth from './auth/Auth.vue'

Vue.use(VueResource)
Vue.use(Vuetify)

Vue.mixin({
  methods: {
    go (where) {
      this.$router.push({name: where})
    }
  }
})

Vue.http.options.root = firebaseConfig.databaseURL

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
