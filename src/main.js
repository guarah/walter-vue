import Vue from 'vue'
import router from './router'
import firebase from 'firebase'
import store from './store/store'

// Components
import App from './App'
import Auth from './auth/Auth.vue'

// Vue.config.productionTip = false

// change to constants
// Initialize Firebase
let app
const config = {
  apiKey: 'AIzaSyDxLYWHkM0pTp0EMXqvPd_dXfT0hzyCB1E',
  authDomain: 'walter-vue.firebaseapp.com',
  databaseURL: 'https://walter-vue.firebaseio.com',
  projectId: 'walter-vue',
  storageBucket: '',
  messagingSenderId: '8128515222'
}

firebase.initializeApp(config)

Vue.component('Auth', Auth)

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
