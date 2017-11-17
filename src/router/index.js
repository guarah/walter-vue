import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/auth/Auth'
import Home from '@/app/home/Home'
import Movie from '@/app/movie/Movie'
import Serie from '@/app/serie/Serie'
import Other from '@/app/other/Other'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: 'Auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/Movie',
      name: 'Movie',
      component: Movie
    },
    {
      path: '/Serie',
      name: 'Serie',
      component: Serie
    },
    {
      path: '/Other',
      name: 'Other',
      component: Other
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('auth')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
