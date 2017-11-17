// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Auth from './auth/Auth.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

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
      template: '<App/>',
      components: { App, Auth }
    })
  }
})
